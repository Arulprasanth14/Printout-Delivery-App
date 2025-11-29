const paymentModel = require('../models/paymentModel');
const invoiceModel = require('../models/invoiceModel');
const orderModel = require('../models/orderModel');

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const { paymentMode, upiId } = req.body;
    const userId = req.user.userId;

    // Get invoice details
    const invoice = await invoiceModel.getInvoiceById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    if (invoice.user_id !== userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Validate payment mode
    const validPaymentModes = ['upi', 'google_pay', 'paytm'];
    if (!validPaymentModes.includes(paymentMode)) {
      return res.status(400).json({ message: 'Invalid payment mode' });
    }

    // Create payment
    const payment = await paymentModel.createPayment(
      invoiceId,
      userId,
      invoice.total_amount,
      paymentMode,
      'pending',
      upiId
    );

    res.status(201).json({
      message: 'Payment created successfully',
      payment: {
        id: payment.id,
        invoiceId: payment.invoice_id,
        amount: payment.amount,
        paymentMode: payment.payment_mode,
        status: payment.payment_status,
        upiId: payment.upi_id,
        createdAt: payment.created_at
      }
    });
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get payment by ID
const getPaymentById = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const userId = req.user.userId;

    const payment = await paymentModel.getPaymentById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (payment.user_id !== userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.json({
      payment: {
        id: payment.id,
        invoiceId: payment.invoice_id,
        amount: payment.amount,
        paymentMode: payment.payment_mode,
        status: payment.payment_status,
        upiId: payment.upi_id,
        createdAt: payment.created_at
      }
    });
  } catch (error) {
    console.error('Get payment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all payments for a user
const getPayments = async (req, res) => {
  try {
    const userId = req.user.userId;
    const payments = await paymentModel.getPaymentsByUserId(userId);

    res.json({
      payments: payments.map(payment => ({
        id: payment.id,
        invoiceId: payment.invoice_id,
        amount: payment.amount,
        paymentMode: payment.payment_mode,
        status: payment.payment_status,
        upiId: payment.upi_id,
        createdAt: payment.created_at
      }))
    });
  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get payment by invoice ID
const getPaymentByInvoiceId = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const userId = req.user.userId;

    const invoice = await invoiceModel.getInvoiceById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    if (invoice.user_id !== userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const payment = await paymentModel.getPaymentByInvoiceId(invoiceId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({
      payment: {
        id: payment.id,
        invoiceId: payment.invoice_id,
        amount: payment.amount,
        paymentMode: payment.payment_mode,
        status: payment.payment_status,
        upiId: payment.upi_id,
        createdAt: payment.created_at
      }
    });
  } catch (error) {
    console.error('Get payment by invoice error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update payment status
const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status } = req.body;
    const userId = req.user.userId;

    // Validate status
    const validStatuses = ['pending', 'completed', 'failed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid payment status' });
    }

    const payment = await paymentModel.getPaymentById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (payment.user_id !== userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const updatedPayment = await paymentModel.updatePaymentStatus(paymentId, status);

    // If payment is completed, update order status
    if (status === 'completed') {
      const invoice = await invoiceModel.getInvoiceById(payment.invoice_id);
      if (invoice) {
        await orderModel.updateOrderStatus(invoice.order_id, 'completed');
      }
    }

    res.json({
      message: 'Payment status updated successfully',
      payment: {
        id: updatedPayment.id,
        invoiceId: updatedPayment.invoice_id,
        amount: updatedPayment.amount,
        paymentMode: updatedPayment.payment_mode,
        status: updatedPayment.payment_status,
        upiId: updatedPayment.upi_id,
        createdAt: updatedPayment.created_at
      }
    });
  } catch (error) {
    console.error('Update payment status error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createPayment,
  getPaymentById,
  getPayments,
  getPaymentByInvoiceId,
  updatePaymentStatus
}; 
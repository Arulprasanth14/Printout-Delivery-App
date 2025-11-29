const invoiceModel = require('../models/invoiceModel');
const orderModel = require('../models/orderModel');

// Create a new invoice
const createInvoice = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.userId;

    // Get order details
    const order = await orderModel.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user_id !== userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Calculate charges (this would be based on your pricing logic)
    const charges = order.total_amount;
    const gstTax = charges * 0.18; // 18% GST
    const deliveryFee = 50; // Fixed delivery fee
    const totalAmount = charges + gstTax + deliveryFee;

    // Create invoice
    const invoice = await invoiceModel.createInvoice(
      orderId,
      userId,
      charges,
      gstTax,
      deliveryFee,
      totalAmount
    );

    res.status(201).json({
      message: 'Invoice created successfully',
      invoice: {
        id: invoice.id,
        orderId: invoice.order_id,
        charges: invoice.charges,
        gstTax: invoice.gst_tax,
        deliveryFee: invoice.delivery_fee,
        totalAmount: invoice.total_amount,
        createdAt: invoice.created_at
      }
    });
  } catch (error) {
    console.error('Create invoice error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get invoice by ID
const getInvoiceById = async (req, res) => {
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

    res.json({
      invoice: {
        id: invoice.id,
        orderId: invoice.order_id,
        charges: invoice.charges,
        gstTax: invoice.gst_tax,
        deliveryFee: invoice.delivery_fee,
        totalAmount: invoice.total_amount,
        createdAt: invoice.created_at
      }
    });
  } catch (error) {
    console.error('Get invoice error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all invoices for a user
const getInvoices = async (req, res) => {
  try {
    const userId = req.user.userId;
    const invoices = await invoiceModel.getInvoicesByUserId(userId);

    res.json({
      invoices: invoices.map(invoice => ({
        id: invoice.id,
        orderId: invoice.order_id,
        charges: invoice.charges,
        gstTax: invoice.gst_tax,
        deliveryFee: invoice.delivery_fee,
        totalAmount: invoice.total_amount,
        createdAt: invoice.created_at
      }))
    });
  } catch (error) {
    console.error('Get invoices error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get invoice by order ID
const getInvoiceByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.userId;

    const order = await orderModel.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user_id !== userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const invoice = await invoiceModel.getInvoiceByOrderId(orderId);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.json({
      invoice: {
        id: invoice.id,
        orderId: invoice.order_id,
        charges: invoice.charges,
        gstTax: invoice.gst_tax,
        deliveryFee: invoice.delivery_fee,
        totalAmount: invoice.total_amount,
        createdAt: invoice.created_at
      }
    });
  } catch (error) {
    console.error('Get invoice by order error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createInvoice,
  getInvoiceById,
  getInvoices,
  getInvoiceByOrderId
}; 
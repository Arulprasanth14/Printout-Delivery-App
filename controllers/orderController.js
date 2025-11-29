const orderModel = require('../models/orderModel');
const printoutModel = require('../models/printoutModel');
const invoiceModel = require('../models/invoiceModel');
const paymentModel = require('../models/paymentModel');

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
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

    let details;
    switch (order.orderType) {
      case 'printout':
        details = await printoutModel.getPrintoutByOrderId(order.id);
        break;
      case 'spiral_binding':
        details = await printoutModel.getSpiralBindingByOrderId(order.id);
        break;
      case 'lamination':
        details = await printoutModel.getLaminationByOrderId(order.id);
        break;
      case 'photo_copies':
        details = await printoutModel.getPhotoCopiesByOrderId(order.id);
        break;
    }

    res.json({
      order: {
        ...order,
        details
      }
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all orders by Customer (User ID)
const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await orderModel.getOrdersByUserId(userId);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all orders by Shopkeeper (Shopkeeper ID)
const getOrdersByShopkeeper = async (req, res) => {
  try {
    const { shopkeeperId } = req.params;
    const orders = await orderModel.getOrdersByShopkeeperId(shopkeeperId);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching shopkeeper orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    // const userId = req.user.userId;
    const {userId, orderType, details } = req.body;

    // Validate input
    if (!orderType || !details) {
      return res.status(400).json({ message: 'Order type and details are required' });
    }

    // Create order
    // const order = await orderModel.createOrder(
    //   userId,
    //   orderType,
    //   'pending',
    //   0, // Initial total amount
    //   1  // Initial number of items
    // );

    // Create specific order type details
    let orderDetails;
    switch (orderType) {
      case 'printout':
        orderDetails = await printoutModel.getPrintoutByAttributes(
          details.size,
          details.colorType,
          details.paperType,
          details.sideType,
        );
        break;
      case 'spiral_binding':
        orderDetails = await printoutModel.createSpiralBinding(
          order.id,
          details.size,
          details.colorType,
          details.bindingType,
          details.sideType,
          details.frontPageColor,
          details.filePath
        );
        break;
      case 'lamination':
        orderDetails = await printoutModel.createLamination(
          order.id,
          details.size,
          details.colorType,
          details.laminationType,
          details.sideType,
          details.thickness,
          details.specialFeatures,
          details.copies,
          details.filePath
        );
        break;
      case 'photo_copies':
        orderDetails = await printoutModel.createPhotoCopies(
          order.id,
          details.size,
          details.paperType,
          details.sideType,
          details.copies,
          details.filePath
        );
        break;
      default:
        return res.status(400).json({ message: 'Invalid order type' });
    }

    // Calculate total amount (this would be based on your pricing logic)

    // const totalAmount = calculateTotalAmount(orderType, details);
    const totalAmount = orderDetails.price_per_page * details.copies
    const order = await orderModel.createOrder(
      userId,
      orderType,
      'pending',
      totalAmount,
      details.copies, // Number of items (copies)
      details.filePath, // URL file path
      orderDetails.id // Printout pricing ID (if applicable)
    );


    // Update order with total amount
    // await orderModel.updateOrderTotalAmount(order.id, totalAmount);

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: order.id,
        type: order.orderType,
        status: order.status,
        totalAmount: totalAmount,
        details: orderDetails
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Assign a shopkeeper to an order
const assignShopkeeper = async (req, res) => {
  try {
    const { orderId, shopkeeperId } = req.body;
    const updatedOrder = await orderModel.assignShopkeeper(orderId, shopkeeperId);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error assigning shopkeeper:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getPending = async (req, res) => {
  try {
    // const { orderId } = req.params.orderId;
    console.log('hekki')
    const pendingOrders = await orderModel.getPendingOrders();
    console.log('Pending orders:', pendingOrders);
    res.status(200).json(pendingOrders);
  } catch (error) {
    console.error('Error fetching pending order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const updatedOrder = await orderModel.updateOrderStatus(orderId, status);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all orders for a user
const getOrders = async (req, res) => {
  try {
    // const userId = req.user.userId;
    // const orders = await orderModel.getOrdersByUserId(userId);
    const orders = await orderModel.getAllOrders(); // For testing, get all orders
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    // Get details for each order
    const ordersWithDetails = await Promise.all(
      orders.map(async (order) => {
        let details;
        switch (order.orderType) {
          case 'printout':
            details = await printoutModel.getPrintoutByOrderId(order.id);
            break;
          case 'spiral_binding':
            details = await printoutModel.getSpiralBindingByOrderId(order.id);
            break;
          case 'lamination':
            details = await printoutModel.getLaminationByOrderId(order.id);
            break;
          case 'photo_copies':
            details = await printoutModel.getPhotoCopiesByOrderId(order.id);
            break;
        }

        return {
          ...order,
          details
        };
      })
    );

    res.json({ orders: ordersWithDetails });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get order statistics
const getOrderStatistics = async (req, res) => {
  try {
    const userId = req.user.userId;
    const statistics = await orderModel.getOrderStatistics(userId);
    res.json({ statistics });
  } catch (error) {
    console.error('Get order statistics error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Helper function to calculate total amount
const calculateTotalAmount = (orderType, details) => {
  // This is a placeholder for your pricing logic
  // You should implement your actual pricing calculation here
  let basePrice = 0;

  switch (orderType) {
    case 'printout':
      basePrice = calculatePrintoutPrice(details);
      break;
    case 'spiral_binding':
      basePrice = calculateSpiralBindingPrice(details);
      break;
    case 'lamination':
      basePrice = calculateLaminationPrice(details);
      break;
    case 'photo_copies':
      basePrice = calculatePhotoCopiesPrice(details);
      break;
  }

  // Add GST and delivery fee
  const gst = basePrice * 0.18; // 18% GST
  const deliveryFee = 50; // Fixed delivery fee

  return basePrice + gst + deliveryFee;
};

// Helper functions for price calculation
const calculatePrintoutPrice = (details) => {
  let price = 0;
  // Implement your printout pricing logic here
  return price;
};

const calculateSpiralBindingPrice = (details) => {
  let price = 0;
  // Implement your spiral binding pricing logic here
  return price;
};

const calculateLaminationPrice = (details) => {
  let price = 0;
  // Implement your lamination pricing logic here
  return price;
};

const calculatePhotoCopiesPrice = (details) => {
  let price = 0;
  // Implement your photo copies pricing logic here
  return price;
};

module.exports = {
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  getOrdersByShopkeeper,
  createOrder,
  assignShopkeeper,
  updateOrderStatus,
  getOrders,
  getOrderStatistics,
  getPending
};

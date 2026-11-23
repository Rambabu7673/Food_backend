import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const { userId, products, amount, address, paymentMethod } = req.body;

  try {
    const newOrder = new Order({
      userId,
      products,
      amount,
      address,
      paymentMethod,
    });
    console.log("New Order Created", newOrder);
    await newOrder.save();
    console.log("Order saved successfully", newOrder);
    return res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ userId }).populate("products.productId");
    return res.status(200).json({
      message: "Orders fetched successfully",
      orders,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

// Update order status
export const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { userId, products, amount, address, status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        userId,
        products,
        amount,
        address,
        status,
      },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Order updated successfully",
      order,
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

// Delete Add to cart from checehckout page
export const deleteOrder = async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await Order.findByIdAndDelete(orderId);
    return res.status(200).json({
      message: "Order deleted successfully",
      order,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

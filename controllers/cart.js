import { Cart } from "../models/Cart.js";

export const addToCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    // Cart nahi hai → naya cart create karo
    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [
          {
            productId,
            quantity: 1,
          },
        ],
      });
    } else {
      // Cart hai → check karo product already hai ya nahi
      const item = cart.items.find(
        (item) => item.productId.toString() === productId,
      );

      if (item) {
        // Product already hai → quantity increase
        item.quantity += 1;
      } else {
        // Product nahi hai → new item add
        cart.items.push({
          productId,
          quantity: 1,
        });
      }

      await cart.save();
    }
    await cart.populate("items.productId");
    return res.status(200).json({
      message: "Product added to cart successfully",
      cart,
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

// Delete items from cart
export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
        success: false,
      });
    }

    const updatedItems = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );

    if (updatedItems.length === cart.items.length) {
      return res.status(404).json({
        message: "Product not found in cart",
        success: false,
      });
    }

    cart.items = updatedItems;
    await cart.save();

    return res.status(200).json({
      message: "Product removed from cart successfully",
      cart,
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

// Update item quantity in cart
export const updateCartItemQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
        success: false,
      });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId,
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not found in cart",
        success: false,
      });
    }

    item.quantity = quantity;
    await cart.save();

    return res.status(200).json({
      message: "Product quantity updated in cart successfully",
      cart,
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

// get cart by userId
export const getCartByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    return res.status(200).json({
      message: "Cart fetched successfully",
      cart,
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

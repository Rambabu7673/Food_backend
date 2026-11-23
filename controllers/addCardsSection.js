import { AddCard } from "../models/AddCard.js";

// Add card
export const addCard = async (req, res) => {
  const { itemName, itemPrice, itemImage, itemDescription, itemCategory } =
    req.body;
  try {
    if (
      !itemName ||
      !itemPrice ||
      !itemImage ||
      !itemDescription ||
      !itemCategory
    ) {
      return res.json({
        message: "Please fill all the fields",
        success: false,
      });
    }
    const newCard = await AddCard.create({
      itemName,
      itemPrice,
      itemImage,
      itemDescription,
      itemCategory,
    });
    console.log("New Card Created", newCard);
    return res.status(201).json({
      message: "Card added successfully",
      card: newCard,
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

// Get all cards
export const getAllCards = async (req, res) => {
  const id = req.body;
  try {
    const cards = await AddCard.find({ id });
    return res.status(200).json({
      message: "Cards fetched successfully",
      cards,
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

// Update card
export const updateCard = async (req, res) => {
  const { id } = req.params;
  const { itemName, itemPrice, itemImage, itemDescription, itemCategory } =
    req.body;
  try {
    const updatedCard = await AddCard.findByIdAndUpdate(
      id,
      {
        itemName,
        itemPrice,
        itemImage,
        itemDescription,
        itemCategory,
      },
      { new: true },
    );
    return res.status(200).json({
      message: "Card updated successfully",
      card: updatedCard,
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

// Delete card
export const deleteCard = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCard = await AddCard.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Card deleted successfully",
      card: deletedCard,
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

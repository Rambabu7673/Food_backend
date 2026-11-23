import Address from "../models/AddressSection.js";
// Add address
export const addAddress = async (req, res) => {
  const { address, city, state, pincode } = req.body;
  try {
    if (!address || !city || !state || !pincode) {
      return res.json({
        message: "Please fill all the fields",
        success: false,
      });
    }
    const newAddress = await Address.create({
      address,
      city,
      state,
      pincode,
    });
    console.log("New Address Created", newAddress);
    return res.status(201).json({
      message: "Address added successfully",
      address: newAddress,
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
// Get all address
export const getAllAddress = async (req, res) => {
  try {
    const address = await Address.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Address fetched successfully",
      address,
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
// Update address
export const updateAddress = async (req, res) => {
  const { id } = req.params;
  const { address, city, state, pincode } = req.body;
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      { address, city, state, pincode },
      { new: true },
    );
    return res.status(200).json({
      message: "Address updated successfully",
      address: updatedAddress,
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
// Delete address
export const deleteAddress = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAddress = await Address.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Address deleted successfully",
      address: deletedAddress,
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

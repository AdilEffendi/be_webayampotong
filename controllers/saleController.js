import Sale from "../models/saleModel.js";

export const getSales = async (req, res) => {
  try {
    const result = await Sale.findAll();
    res.json(result);
  } catch (error) {
    console.error("Error saat GET sales:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createSale = async (req, res) => {
  try {
    const {
      transaction_id,
      livestock_id,
      quantity,
      price_per_unit,
      total_amount,
      payment_method,
      customer_id,
    } = req.body;

    const newSale = await Sale.create({
      transaction_id,
      livestock_id,
      quantity,
      price_per_unit,
      total_amount,
      payment_method,
      customer_id,
    });

    res.status(201).json(newSale);
  } catch (error) {
    console.error("Error saat POST sale:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

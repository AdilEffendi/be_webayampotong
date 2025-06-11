import ProfitPrediction from "../models/profitPredictionModel.js";

export const getProfitPredictions = async (req, res) => {
  try {
    const result = await ProfitPrediction.findAll();
    res.json(result);
  } catch (error) {
    console.error("Error saat GET profit predictions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createProfitPrediction = async (req, res) => {
  try {
    const { date, predicted_profit, actual_profit, user_id, transaction_id } =
      req.body;
    const newProfitPrediction = await ProfitPrediction.create({
      date,
      predicted_profit,
      actual_profit,
      user_id,
      transaction_id,
    });
    res.status(201).json(newProfitPrediction);
  } catch (error) {
    console.error("Error saat POST profit prediction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProfitPrediction = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ProfitPrediction.destroy({
      where: { profit_prediction_id: id },
    });

    if (deleted === 0) {
      return res
        .status(404)
        .json({ message: "Profit prediction tidak ditemukan" });
    }

    res.json({ message: "Profit prediction berhasil dihapus" });
  } catch (error) {
    console.error("Error saat DELETE profit prediction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfitPrediction = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, predicted_profit, actual_profit, user_id, transaction_id } =
      req.body;

    const updated = await ProfitPrediction.update(
      { date, predicted_profit, actual_profit, user_id, transaction_id },
      { where: { profit_prediction_id: id } }
    );

    if (updated[0] === 0) {
      return res.status(404).json({
        message: "Profit prediction tidak ditemukan atau tidak ada perubahan",
      });
    }

    res.json({ message: "Profit prediction berhasil diupdate" });
  } catch (error) {
    console.error("Error saat UPDATE profit prediction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

import Account from "../models/accountModel.js";

export const getAccounts = async (req, res) => {
  try {
    const result = await Account.findAll();
    res.json(result);
  } catch (error) {
    console.error("Error saat GET accounts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createAccount = async (req, res) => {
  try {
    const { account_code, account_name, account_type } = req.body;
    const newAccount = await Account.create({
      account_code,
      account_name,
      account_type,
    });
    res.status(201).json(newAccount);
  } catch (error) {
    console.error("Error saat POST account:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Tambahkan fungsi updateAccount
export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { account_code, account_name, account_type } = req.body;
    const updated = await Account.update(
      { account_code, account_name, account_type },
      { where: { account_id: id } }
    );
    if (updated[0] === 0) {
      return res.status(404).json({ message: "Account tidak ditemukan atau tidak ada perubahan" });
    }
    res.json({ message: "Account berhasil diupdate" });
  } catch (error) {
    console.error("Error saat UPDATE account:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Tambahkan fungsi deleteAccount
export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Account.destroy({
      where: { account_id: id },
    });
    if (deleted === 0) {
      return res.status(404).json({ message: "Account tidak ditemukan" });
    }
    res.json({ message: "Account berhasil dihapus" });
  } catch (error) {
    console.error("Error saat DELETE account:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
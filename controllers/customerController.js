import Customer from "../models/customerModel.js";

export const getCustomers = async (req, res) => {
  try {
    const result = await Customer.findAll();
    res.json(result);
  } catch (error) {
    console.error("Error saat GET customers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const { name, contact, address } = req.body;
    const newCustomer = await Customer.create({
      name,
      contact,
      address,
    });
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Error saat POST customer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE: Hapus customer berdasarkan ID
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Customer.destroy({
      where: { customer_id: id },
    });

    if (deleted === 0) {
      return res.status(404).json({ message: "Customer tidak ditemukan" });
    }

    res.json({ message: "Customer berhasil dihapus" });
  } catch (error) {
    console.error("Error saat DELETE customer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contact, address } = req.body;

    const updated = await Customer.update(
      { name, contact, address },
      { where: { customer_id: id } }
    );

    if (updated[0] === 0) {
      return res
        .status(404)
        .json({ message: "Customer tidak ditemukan atau tidak ada perubahan" });
    }

    res.json({ message: "Customer berhasil diupdate" });
  } catch (error) {
    console.error("Error saat UPDATE customer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

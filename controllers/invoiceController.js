import Invoice from "../models/invoiceModel.js";

export const getInvoices = async (req, res) => {
  try {
    const result = await Invoice.findAll();
    res.json(result);
  } catch (error) {
    console.error("Error saat GET invoices:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const { sale_id, customer_id, due_date, status } = req.body;
    const newInvoice = await Invoice.create({
      sale_id,
      customer_id,
      due_date,
      status,
    });
    res.status(201).json(newInvoice);
  } catch (error) {
    console.error("Error saat POST invoice:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE: Hapus invoice berdasarkan ID
export const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Invoice.destroy({
      where: { invoice_id: id },
    });

    if (deleted === 0) {
      return res.status(404).json({ message: "Invoice tidak ditemukan" });
    }

    res.json({ message: "Invoice berhasil dihapus" });
  } catch (error) {
    console.error("Error saat DELETE invoice:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// UPDATE: Update invoice berdasarkan ID
export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { sale_id, customer_id, due_date, status } = req.body;

    const updated = await Invoice.update(
      { sale_id, customer_id, due_date, status },
      { where: { invoice_id: id } }
    );

    if (updated[0] === 0) {
      return res
        .status(404)
        .json({ message: "Invoice tidak ditemukan atau tidak ada perubahan" });
    }

    res.json({ message: "Invoice berhasil diupdate" });
  } catch (error) {
    console.error("Error saat UPDATE invoice:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

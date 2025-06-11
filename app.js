import dotenv from "dotenv";
dotenv.config(); // ✅ tetap harus di paling atas

import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

// Router
import router from "./routes/userRoute.js";
import transactionRouter from "./routes/transactionRoute.js";
import incomeRouter from "./routes/incomeRoute.js";
import expenseRouter from "./routes/expenseRoute.js";
import accountRouter from "./routes/accountRoute.js";
import customerRouter from "./routes/customerRoute.js";
import saleRouter from "./routes/saleRoute.js";
import livestockRouter from "./routes/livestockRoute.js";
import invoiceRouter from "./routes/invoiceRoute.js";
import debtReceivablesRouter from "./routes/debtreceivablesRoute.js";
import profitPredictionRouter from "./routes/profitpredictionRoute.js";
import livestockTransactionRouter from "./routes/livestocktransactionRoute.js";
import balanceRouter from "./routes/balanceRoute.js";
import authRoutes from "./routes/auth.routes.js"; // ✅ route auth

// Models
import Transaction from "./models/transactionModel.js";
import Income from "./models/incomeModel.js";
import Expense from "./models/expenseModel.js";
import Account from "./models/accountModel.js";
import Customer from "./models/customerModel.js";
import Sale from "./models/saleModel.js";
import Livestock from "./models/livestockModel.js";
import Invoice from "./models/invoiceModel.js";
import DebtReceivables from "./models/debtReceivablesModel.js";
import ProfitPrediction from "./models/profitPredictionModel.js";
import LivestockTransaction from "./models/livestockTransactionModel.js";
import User from "./models/userModel.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));

// Routes
app.use("/api/auth", authRoutes); // ✅ Auth JWT
app.use(router);
app.use(transactionRouter);
app.use(incomeRouter);
app.use(expenseRouter);
app.use(accountRouter);
app.use(customerRouter);
app.use(saleRouter);
app.use(livestockRouter);
app.use(invoiceRouter);
app.use(debtReceivablesRouter);
app.use(profitPredictionRouter);
app.use(livestockTransactionRouter);
app.use(balanceRouter);

const syncModel = (model, name) =>
  model
    .sync({ alter: true })
    .then(() => console.log(`✅ Tabel ${name} sudah sinkron.`))
    .catch((err) => console.error(`❌ Error sinkronisasi tabel ${name}:`, err));

syncModel(User, "users");
syncModel(Transaction, "transactions");
syncModel(Income, "income");
syncModel(Expense, "expense");
syncModel(Account, "accounts");
syncModel(Customer, "customers");
syncModel(Sale, "sales");
syncModel(Livestock, "livestock");
syncModel(Invoice, "invoices");
syncModel(DebtReceivables, "debt_receivables");
syncModel(LivestockTransaction, "livestock_transactions");
syncModel(ProfitPrediction, "profit_prediction");

app.listen(3000, () => {
  console.log("✅ Server Berhasil Berjalan di http://localhost:3000");
});

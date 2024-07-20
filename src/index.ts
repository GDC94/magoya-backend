import express from "express";
import createAccountRoute from "./routes/account.route";
import getBalanceRoute from "./routes/balances.route";
import postTransactionsRoute from "./routes/transactions.route";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());
app.use("/api", createAccountRoute);
app.use("/api", getBalanceRoute);
app.use("/api", postTransactionsRoute);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

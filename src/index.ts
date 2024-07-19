import express from "express";
import createAccountRoute from "./routes/account.route";
import getBalanceRoute from "./routes/balances.route";
import postTransactionsRoute from "./routes/balances.route";

const app = express();
const PORT = 8080;

app.use(express.json());

app.use("/api", createAccountRoute);
app.use("/api", getBalanceRoute);
app.use("/api", postTransactionsRoute);

app.listen(PORT);
console.log("Server on port", PORT);

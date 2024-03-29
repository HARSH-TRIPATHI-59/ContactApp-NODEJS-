const express = require("express");
const http = require("http");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const { connect } = require("http2");
const connectDb = require("./config/dbConnection");

connectDb();
const app = express();
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
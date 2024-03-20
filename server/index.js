const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./config/db");
const schema = require("./Schema/schema");
const app = express();

connectDB(process.env.MONGO_URL);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log(`Server is running on PORT ${port}`));

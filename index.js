import express from "express";
import { dbConnection } from "./src/DB/db.connection.js";
import { createHandler } from "graphql-http/lib/use/express";

import { schema } from "./src/app.grapgql.schema.js";

const app = express();
const port = process.env.PORT;

await dbConnection();
app.use(express.json());

app.use("/graphql", createHandler({ schema }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

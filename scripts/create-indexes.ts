import { connect, ensureIndexes } from "./lib";

const { client, db } = await connect();
try {
  await ensureIndexes(db);
  console.log("Indexes are up to date.");
} finally {
  await client.close();
}

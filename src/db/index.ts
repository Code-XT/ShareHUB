import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

config({ path: ".env" });

const client = createClient({
  url: "libsql://sharehub-db-reading-steiner.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjAxNjIyNDYsImlkIjoiMjRlZTQyZWEtNGFjMi00NjVlLTk5OGYtYTk5Y2RiNDg1ZDE1In0.tanchgWoh8uNA34LQE7QtYOegkQJ7y5duSye8WUg3KZFlSouSpCU9eXnuuj5nbdq-c8Mnq8JQrmj27JX0QvACA",
});

export const db = drizzle(client);

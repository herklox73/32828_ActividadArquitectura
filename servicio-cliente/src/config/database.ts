import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// El .env está dentro de src/, así que hay que indicar la ruta
dotenv.config({ path: "./src/.env" });

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: false,
  }
);

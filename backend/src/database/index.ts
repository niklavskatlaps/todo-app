import "dotenv/config";
import { DataSource } from "typeorm";
import * as path from "path";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, "./entities/**.entity{.ts,.js}")],
});

export async function createDatabaseConnection(): Promise<void> {
  await dataSource.initialize();
  console.log("Database connection established");
}

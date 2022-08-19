import { join } from "path";
import { ConnectionOptions } from "typeorm";

const ORMConfig: ConnectionOptions = {
	name: "default",
	type: "postgres",
	host: process.env.DB_HOST || "pg_db",
	port: Number(process.env.DB_PORT) || 5432,
	username: process.env.DB_USERNAME || "root",
	password: process.env.DB_PASSWORD || "root",
	database: process.env.DB_DATABASE || "location",
	synchronize: false,
	logging: false,
	migrations: [join(__dirname, "../migrations/**", "*.{ts,js}")],
	entities: [join(__dirname, "../models/**", "*.{ts,js}")],
};
export { ORMConfig };

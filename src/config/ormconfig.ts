import {DataSource} from 'typeorm';

// eslint-disable-next-line import/no-unused-modules
export const connectionSource = new DataSource({
	name: 'default',
	type: 'postgres',
	host: process.env.DB_HOST || 'pg_db',
	port: Number(process.env.DB_PORT) || 5432,
	username: process.env.DB_USERNAME || 'root',
	password: process.env.DB_PASSWORD || 'root',
	database: process.env.DB_DATABASE || 'location',
	logging: false,
	synchronize: false,
	entities: ['src/models/**/*.ts'],
	migrations: ['src/migrations/**/*.ts'],
	subscribers: ['src/subscriber/**/*.ts'],
	migrationsTableName: 'migrations'
});
// eslint-disable-next-line @typescript-eslint/no-floating-promises
connectionSource.initialize();

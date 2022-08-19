import { MigrationInterface, QueryRunner } from "typeorm";

export class createClientsTable1660691008664 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "clients" (
            "id" SERIAL NOT NULL,
            "name" character varying(255) NOT NULL,
			"created_at" TIMESTAMP NOT NULL DEFAULT now(),
			CONSTRAINT clients_pkey PRIMARY KEY (id)
            )`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query("DROP TABLE clients");
	}
}

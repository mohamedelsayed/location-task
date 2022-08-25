import {MigrationInterface, QueryRunner} from 'typeorm';

// eslint-disable-next-line import/no-unused-modules
export class createSitesTable1660695128519 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "sites" (
            "id" SERIAL NOT NULL,
			"name" character varying(255) NOT NULL,
			"client_id" integer NOT NULL,
			"timezone" character varying(255),
			"starting_hour" character varying(255),
			"ending_hour" character varying(255),
			"late_threshold" character varying(255),
			"created_at" TIMESTAMP NOT NULL DEFAULT now(),
			CONSTRAINT sites_pkey PRIMARY KEY (id),
			CONSTRAINT client_id FOREIGN KEY (client_id)
			REFERENCES clients (id) MATCH SIMPLE
			ON UPDATE NO ACTION
			ON DELETE NO ACTION
            )`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE sites');
	}

}

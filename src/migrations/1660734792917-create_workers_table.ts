import {MigrationInterface, QueryRunner} from 'typeorm';

export class createWorkersTable1660734792917 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "workers" (
            "id" SERIAL NOT NULL,
			"name" character varying(255) NOT NULL,
			"site_id" integer NOT NULL,
			"created_at" TIMESTAMP NOT NULL DEFAULT now(),
			CONSTRAINT workers_pkey PRIMARY KEY (id),
			CONSTRAINT site_id FOREIGN KEY (site_id)
			REFERENCES sites (id) MATCH SIMPLE
			ON UPDATE NO ACTION
			ON DELETE NO ACTION
            )`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE workers');
	}

}

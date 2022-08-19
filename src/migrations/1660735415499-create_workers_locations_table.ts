import { MigrationInterface, QueryRunner } from "typeorm";

export class createWorkersLocationsTable1660735415499
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "workers_locations" (
            "id" SERIAL NOT NULL,
			"worker_id" integer NOT NULL,
    		"coordinates" point NOT NULL,
    		"is_active" boolean NOT NULL DEFAULT false,
    		"duration" integer NOT NULL,
  			"generated_at" TIMESTAMP NOT NULL,
			"created_at" TIMESTAMP NOT NULL DEFAULT now(),
			CONSTRAINT workers_locations_pkey PRIMARY KEY (id),
			CONSTRAINT worker_id FOREIGN KEY (worker_id)
			REFERENCES workers (id) MATCH SIMPLE
			ON UPDATE NO ACTION
			ON DELETE NO ACTION
            )`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query("DROP TABLE workers_locations");
	}
}

import {MigrationInterface, QueryRunner} from 'typeorm';

// eslint-disable-next-line import/no-unused-modules
export class addDummySiteTable1660902604925 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		INSERT INTO sites (name, client_id, timezone, starting_hour, ending_hour, late_threshold)
		VALUES ('site1', 1, 'UTC', '09:00', '17:00', '1');`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        DELETE FROM sites
		WHERE name= 'site1');`);
	}

}

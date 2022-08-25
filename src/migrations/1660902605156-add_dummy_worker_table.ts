import {MigrationInterface, QueryRunner} from 'typeorm';

// eslint-disable-next-line import/no-unused-modules
export class addDummyWorkerTable1660902605156 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		INSERT INTO workers (name, site_id)
		VALUES ( 'worker1', 1);`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        DELETE FROM workers
		WHERE name= 'worker1');`);
	}

}

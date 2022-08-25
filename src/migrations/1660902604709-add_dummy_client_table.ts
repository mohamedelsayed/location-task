import {MigrationInterface, QueryRunner} from 'typeorm';

export class addDummyClientTable1660902604709 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        INSERT INTO clients (name)
		VALUES ('client1');`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        DELETE FROM clients
		WHERE name= 'client1');`);
	}

}

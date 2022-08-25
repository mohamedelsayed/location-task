import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn
} from 'typeorm';

@Entity('clients')
// eslint-disable-next-line import/no-unused-modules
export class Client {

	@PrimaryGeneratedColumn()
		id: number;

	@Column({type: 'varchar'})
		name: string;

	@CreateDateColumn()
		created_at: Date;

}

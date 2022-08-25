import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	BaseEntity
} from 'typeorm';

@Entity('workers')
export class Worker extends BaseEntity {

	@PrimaryGeneratedColumn()
		id: number;

	@Column({type: 'varchar'})
		name: string;

	// TODO: add relation of site_id to sites table
	@Column({type: 'int'})
		site_id: number;

	@CreateDateColumn()
		created_at: Date;

}

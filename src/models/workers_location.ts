import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn
} from 'typeorm';

@Entity('workers_locations')
export class WorkerLocation {

	@PrimaryGeneratedColumn()
		id: number;

	// TODO: add relation of worker_id to workers table
	@Column({type: 'int'})
		worker_id: number;

	@Column({type: 'varchar'})
		coordinates: string;

	@Column()
		is_active: boolean;

	@Column({type: 'int'})
		duration: number;

	@Column({type: 'timestamp'})
		generated_at!: Date;

	@CreateDateColumn()
		created_at: Date;

}

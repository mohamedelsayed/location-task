import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn
} from 'typeorm';
import {Geometry} from 'geojson';

@Entity('workers_locations')
// eslint-disable-next-line import/no-unused-modules
export class WorkerLocation {

	@PrimaryGeneratedColumn()
		id: number;

	// TODO: add relation of worker_id to workers table
	@Column({type: 'int'})
		worker_id: number;

	@Column({type: 'point'})
		coordinates: Geometry;

	@Column()
		is_active: boolean;

	@Column({type: 'int'})
		duration: number;

	@Column({type: 'timestamp'})
		generated_at!: Date;

	@CreateDateColumn()
		created_at: Date;

}

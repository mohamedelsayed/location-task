// import {
// 	Entity,
// 	PrimaryGeneratedColumn,
// 	Column,
// 	CreateDateColumn
// } from 'typeorm';

// @Entity('sites')
// export class Site {

// 	@PrimaryGeneratedColumn()
// 		id: number;

// 	@Column({type: 'varchar'})
// 		name: string;

// 	// TODO: add relation of client_id to clients table
// 	@Column({type: 'int'})
// 		client_id: number;

// 	@Column({type: 'varchar', nullable: true})
// 		timezone: string | null;

// 	@Column({type: 'varchar', nullable: true})
// 		starting_hour: string | null;

// 	@Column({type: 'varchar', nullable: true})
// 		ending_hour: string | null;

// 	@Column({type: 'varchar', nullable: true})
// 		late_threshold: string | null;

// 	@CreateDateColumn()
// 		created_at: Date;

// }

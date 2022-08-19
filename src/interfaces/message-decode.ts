export interface MessageDecode {
	coordinates: [number, number];
	worker_id: number;
	duration: number;
	generated_at: number | any;
	is_active: boolean;
}

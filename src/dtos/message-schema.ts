import * as joi from 'joi';

export const MessageSchema = joi
	.object()
	.keys({
		is_active: joi.boolean().required(),
		duration: joi.number().required(),
		worker_id: joi.number().required(),
		generated_at: joi.date().required(),
		coordinates: joi.array().ordered(
			joi.number().min(-90).max(90).required(),
			joi.number().min(-180).max(180).required()
		).required()
	});

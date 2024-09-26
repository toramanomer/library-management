import { z } from 'zod'

export const positiveInt = z
	.number({ coerce: true })
	.int()
	.positive()

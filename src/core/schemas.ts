import { z } from 'zod'

export const positiveInt = z
	.number({ coerce: true })
	.int()
	.positive()

export const nonEmptyString = z
	.string({
		errorMap: (issue, ctx) => {
			console.log({ issue, ctx })
			return { message: 'This field is required' }
		}
	})
	.trim()
	.min(1)
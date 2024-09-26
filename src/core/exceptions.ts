export class AppException extends Error {
	constructor(message: string, public statusCode: number) {
		super(message)
		this.name = 'AppException'
		this.statusCode = statusCode

		Object.setPrototypeOf(this, AppException.prototype)
	}
}

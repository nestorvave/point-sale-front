type ValidationResult = {
	isValid: boolean;
	errors: string[];
};

class StringSchema {
	private required: boolean = false;
	private minLengthValue: number | null = null;
	private maxLengthValue: number | null = null;
	private email: boolean = false;
	private rfcFisica: boolean = false;
	private rfcMoral: boolean = false;
	private curp: boolean = false;
	private messages: { [key: string]: string } = {};

	isRequired(message: string = 'Este campo es obligatorio.') {
		this.required = true;
		this.messages['required'] = message;
		return this;
	}

	minLength(
		length: number,
		message: string = `La longitud mínima es de ${length} caracteres.`
	) {
		this.minLengthValue = length;
		this.messages['minLength'] = message;
		return this;
	}

	maxLength(
		length: number,
		message: string = `La longitud máxima es de ${length} caracteres.`
	) {
		this.maxLengthValue = length;
		this.messages['maxLength'] = message;
		return this;
	}

	isEmail(message: string = 'El formato del correo electrónico es incorrecto.') {
		this.email = true;
		this.messages['email'] = message;
		return this;
	}

	isRFC(message: string = 'El formato del RFC es incorrecto.') {
		this.email = true;
		this.messages['rfc'] = message;
	}

	isRFCFisica(
		message: string = 'El formato del RFC para personas físicas es incorrecto.'
	) {
		this.rfcFisica = true;
		this.messages['rfcFisica'] = message;
		return this;
	}

	isRFCMoral(
		message: string = 'El formato del RFC para personas morales es incorrecto.'
	) {
		this.rfcMoral = true;
		this.messages['rfcMoral'] = message;
		return this;
	}

	isCURP(message: string = 'El formato de la CURP es incorrecto.') {
		this.curp = true;
		this.messages['curp'] = message;
		return this;
	}

	validate(value: string | undefined): ValidationResult {
		const errors: string[] = [];

		if (this.required && !value) {
			errors.push(this.messages['required']);
		}

		if (!this.required && (value === undefined || value === '')) {
			return { isValid: true, errors };
		}

		if (value !== undefined) {
			if (this.minLengthValue !== null && value.length < this.minLengthValue) {
				errors.push(this.messages['minLength']);
			}
			if (this.maxLengthValue !== null && value.length > this.maxLengthValue) {
				errors.push(this.messages['maxLength']);
			}
			if (this.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
				errors.push(this.messages['email']);
			}
			if (this.rfcFisica && !/^([A-ZÑ&]{4})(\d{6})([A-Z0-9]{3})$/.test(value)) {
				errors.push(this.messages['rfcFisica']);
			}
			if (this.rfcMoral && !/^([A-ZÑ&]{3})(\d{6})([A-Z0-9]{3})$/.test(value)) {
				errors.push(this.messages['rfcMoral']);
			}
			if (this.curp && !/^([A-ZÑ&]{4})(\d{6})([A-Z0-9]{8})$/.test(value)) {
				errors.push(this.messages['curp']);
			}
		}

		return { isValid: errors.length === 0, errors };
	}
}

export default StringSchema;

type ValidationResult = {
	isValid: boolean;
	errors: string[];
};

class NumberSchema {
	private required: boolean = false;
	private minValue: number | null = null;
	private maxValue: number | null = null;
	private positive: boolean = false;
	private negative: boolean = false;
	private lessThanValue: number | null = null;
	private moreThanValue: number | null = null;
	private integer: boolean = false;
	private decimal: boolean = false;
	private messages: { [key: string]: string } = {};

	isRequired(message: string = 'Este campo es obligatorio.') {
		this.required = true;
		this.messages['required'] = message;
		return this;
	}

	min(value: number, message: string = `El valor mínimo es ${value}.`) {
		this.minValue = value;
		this.messages['min'] = message;
		return this;
	}

	max(value: number, message: string = `El valor máximo es ${value}.`) {
		this.maxValue = value;
		this.messages['max'] = message;
		return this;
	}

	isInteger(message: string = 'El valor debe ser un número entero.') {
		this.integer = true;
		this.messages['integer'] = message;
		return this;
	}

	isDecimal(message: string = 'El valor debe ser un número decimal.') {
		this.decimal = true;
		this.messages['decimal'] = message;
		return this;
	}

	isPositive(message: string = 'El valor debe ser positivo.') {
		this.positive = true;
		this.messages['positive'] = message;
		return this;
	}

	isNegative(message: string = 'El valor debe ser negativo.') {
		this.negative = true;
		this.messages['negative'] = message;
		return this;
	}

	lessThan(value: number, message: string = `El valor debe ser menor que ${value}.`) {
		this.lessThanValue = value;
		this.messages['lessThan'] = message;
		return this;
	}

	moreThan(value: number, message: string = `El valor debe ser mayor que ${value}.`) {
		this.moreThanValue = value;
		this.messages['moreThan'] = message;
		return this;
	}

	validate(value: number | string): ValidationResult {
		const errors: string[] = [];

		if (value === '' || value === undefined || value === null) {
			if (this.required) {
				errors.push(this.messages['required']);
			}
			return { isValid: errors.length === 0, errors };
		}

		const numValue = Number(value);

		if (isNaN(numValue)) {
			errors.push('El valor debe ser un número.');
		} else {
			if (this.minValue !== null && numValue < this.minValue) {
				errors.push(this.messages['min']);
			}

			if (this.maxValue !== null && numValue > this.maxValue) {
				errors.push(this.messages['max']);
			}

			if (this.integer && !Number.isInteger(numValue)) {
				errors.push(this.messages['integer']);
			}

			if (this.decimal && Number.isInteger(numValue)) {
				errors.push(this.messages['decimal']);
			}

			if (this.positive && numValue <= 0) {
				errors.push(this.messages['positive']);
			}

			if (this.negative && numValue >= 0) {
				errors.push(this.messages['negative']);
			}

			if (this.lessThanValue !== null && numValue >= this.lessThanValue) {
				errors.push(this.messages['lessThan']);
			}

			if (this.moreThanValue !== null && numValue <= this.moreThanValue) {
				errors.push(this.messages['moreThan']);
			}
		}

		return { isValid: errors.length === 0, errors };
	}
}

export default NumberSchema;

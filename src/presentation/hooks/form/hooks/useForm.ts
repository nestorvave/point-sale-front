import { useState, useEffect, type ChangeEvent, type FocusEvent, type FormEvent } from 'react';

interface ValidationResult {
	isValid: boolean;
	errors: string[];
}

type Validator<T> = (value: T | undefined) => ValidationResult;

type Schema<T> = {
	[K in keyof T]?: {
		validator: {
			validate: Validator<T[K]>;
		};
		allowedCharacters?: RegExp;
	};
};

interface UseFormProps<T> {
	initialValues: T;
	onSubmit?: (values: T) => Promise<void>;
	validationSchema?: Schema<T>;
	validateOnMount?: boolean;
	onChange?: (values: T) => void;
	onClick?: (values: T) => Promise<void>;
}

//eslint-disable-next-line
export const useForm = <T extends Record<string, any>>({
	initialValues,
	onSubmit,
	validationSchema,
	validateOnMount = false,
	onChange,
	onClick,
}: UseFormProps<T>) => {
	const [values, setValues] = useState<T>(initialValues);
	const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
	const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
	const [isValid, setIsValid] = useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	// Actualiza valores si initialValues cambia
	useEffect(() => {
		setValues(initialValues);
	}, [initialValues]);

	useEffect(() => {
		if (validateOnMount && validationSchema) {
			validateForm();
		}
	}, [validationSchema]);

	useEffect(() => {
		if (onChange) {
			onChange(values);
		}
	}, [values]);

	useEffect(() => {
		setIsValid(Object.keys(errors).every((key) => !errors[key as keyof T]));
	}, [errors]);

	//eslint-disable-next-line
	const validateField = (name: keyof T, value: any) => {
		if (validationSchema && validationSchema[name]) {
			const validation = validationSchema[name]!.validator.validate(value);
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: validation.errors.length > 0 ? validation.errors[0] : undefined,
			}));
			setTouched((prevTouched) => ({
				...prevTouched,
				[name]: true,
			}));
		}
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, type, value } = e.target;

		if (type === 'checkbox') {
			const { checked } = e.target as HTMLInputElement;
			setValues((prevValues) => ({
				...prevValues,
				[name]: checked,
			}));
			validateField(name as keyof T, checked);
		} else {
			if (
				validationSchema &&
				validationSchema[name as keyof T]?.allowedCharacters
			) {
				const regex = validationSchema[name as keyof T]!.allowedCharacters!;
				if (!regex.test(value)) {
					return;
				}
			}
			setValues((prevValues) => ({
				...prevValues,
				[name]: value,
			}));
			validateField(name as keyof T, value);
		}
	};

	const handleBlur = (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setTouched((prevTouched) => ({
			...prevTouched,
			[name]: true,
		}));
		validateField(name as keyof T, value);
	};

	const validateForm = () => {
		if (!validationSchema) return true;
		const newErrors: Partial<Record<keyof T, string>> = {};
		let isValid = true;

		for (const key in values) {
			if (validationSchema[key as keyof T]) {
				const validation = validationSchema[key as keyof T]!.validator.validate(
					values[key as keyof T]
				);
				if (!validation.isValid) {
					isValid = false;
					newErrors[key as keyof T] =
						validation.errors.length > 0 ? validation.errors[0] : undefined;
				}
			}
		}

		setErrors(newErrors);
		setIsValid(isValid);
		return isValid;
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const isValid = validateForm();
		if (!isValid) {
			const allTouched: Partial<Record<keyof T, boolean>> = {};
			for (const key in values) {
				allTouched[key as keyof T] = true;
			}
			setTouched(allTouched);
		}
		if (isValid && onSubmit) {
			setIsSubmitting(true);
			try {
				await onSubmit(values);
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	const handleClick = async () => {
		const isValid = validateForm();
		if (!isValid) {
			const allTouched: Partial<Record<keyof T, boolean>> = {};
			for (const key in values) {
				allTouched[key as keyof T] = true;
			}
			setTouched(allTouched);
		}
		if (isValid && onClick) {
			setIsSubmitting(true);
			try {
				await onClick(values);
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	const getFieldProps = (name: keyof T) => {
		//eslint-disable-next-line
		const fieldProps: any = {
			name,
			onChange: handleChange,
			onBlur: handleBlur,
			error: touched[name] ? errors[name] : undefined,
		};

		if (typeof values[name] === 'boolean') {
			fieldProps.checked = values[name];
		} else {
			fieldProps.value = values[name];
		}

		return fieldProps;
	};

	const resetErrors = () => {
		setErrors({});
		setTouched({});
	};

	const resetForm = () => {
		setValues(initialValues);
		setIsValid(false);
		setTouched({});
	};

	return {
		values,
		errors,
		touched,
		isValid,
		isSubmitting,
		handleChange,
		handleBlur,
		handleSubmit,
		handleClick,
		getFieldProps,
		resetErrors,
		resetForm,
	};
};

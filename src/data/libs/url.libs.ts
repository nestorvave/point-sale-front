export const URL = {
	PAYROLL: {
		GET_PERIODS: 'nomina/periodos-nomina',
		GET_PERIOD: 'nomina/periodo-nomina',
		CALCULATE: 'motor-nomina/procesa-nomina',
		DELETE_CALCULATE: 'nomina/calculo',
		DISMISS_CALCULATE: 'nomina/calculo-bajas',
		EMPLOYEES: 'nomina/empleados',
		DOWNLOAD: 'nomina/descargar-excel',
		SINGLE_PAYROLL: 'nomina/periodo-nomina-individual',
		CALCULATE_SINGLE_PAYROLL: 'nomina/calculo-nomina-individual',
		SINGLE_PAYROLL_INCIDENTS: 'nomina/incidencias',
		SINGLE_PAYROLL_CONCEPTS: 'nomina/individual/conceptos',
		EDIT_CONCEPT: 'nomina/individual/conceptos',
		SETTLEMENT_EMPLOYEES_SELECTED: 'nomina/finiquitos',
		SETTLEMENT_EMPLOYEES: 'nomina/finiquitos/empleados',
	},
	CLASSIFICATIONS: {
		BASE: 'clasificaciones',
		SUBCLASSIFICATIONS: 'clasificaciones/subclasificaciones',
	},
	BASES_TOTALIZERS: {
		BASE: 'bases-totalizadores',
	},
	VALUES_PARAMS: {
		BASE: 'valores-parametros',
		GET_LEVEL_ORG: 'valores-parametros/nivel-organizacional',
	},
	CATALOG: {
		BASE_TOTALIZER_NOMINA: 'bases-totalizadores/conceptos-nomina',
		CONCEPTS: 'conceptos',
		PERIODS: 'periodos',
		CFDI_PERIODS: 'cfdi/periodos',
	},
	CALCULATION_RULES: {
		BASE: 'reglas-calculo',
	},
	PAYROLL_TEMPLATE: {
		BASE: 'plantillas-nomina',
	},
	PAYROLL_TEMPLATE_LEVEL_ORG: {
		BASE: 'plantillas-niveles-organizacionales',
	},
	LEVELS_ORG: {
		BASE: 'niveles-organizacionales',
	},
	CONCEPTS: {
		BASE: 'conceptos',
	},
	PAYROLL_TYPE: {
		BASE: 'tipos-nomina',
	},
	PAYROLL_FREQUENCY: {
		BASE: 'frecuencias-nomina',
	},
	CALCULATION_ORDERS: {
		BASE: 'orders',
		GENERIC: 'orders/generic',
	},
	GROUP_KEY: {
		BASE: 'claves-agrupadora',
	},
	SAT_KEY: {
		BASE: 'claves-sat/tipo',
	},
	IMSS_MOVEMENT: {
		SENDING_MOVEMENT: {
			GET_MOVEMENTS: 'MovimientosIMSS/GetMovimientosEnviar',
			SEND_MOVEMENTS_EMPLOYEE: 'MovimientosIMSS/SenMovimientosRegPatronal',
			SEND_ALL_MOVEMENTS: 'MovimientosIMSS/SendAllMovimientos',
			SEND_BY_DATE: 'MovimientosIMSS/SendMovimientosFecha',
		},
		LOTS: {
			GET_LOTS: 'MovimientosIMSS/GetComparativaLotes',
			GET_DETAIL: 'MovimientosIMSS/GetComparativaMovimientos',
			ADD_MOVEMENT: 'MovimientosIMSS/AddMovimiento',
		},
		EMPLOYER_RECORDS: {
			GET: 'MovimientosIMSS/GetRegistrosPatronales',
			UPDATE_CERTIFICATE: 'RegistrosPatronales/CargarCertificado',
		},
	},
	LOGS: {
		BASE: 'logs/calculo/periodo-nomina',
	},
	UPLOAD_CERTIFICATIONS: {
		BASE: 'registro-patronal',
		DOWNLOAD_STAMPS: 'registro-patronal/DescargarSellos',
		UPLOAD_LETTER: 'registro-patronal/CargarCartaConsentimiento',
		CERTIFICATE: 'registro-patronal/certificados',
	},
	LETTERHEAD: {
		EXECUTE: 'timbrado/ejecutar',
		ERRORS: 'timbrado/errores',
		CANCEL: 'timbrado/cancelacion',
		CANCEL_ERRORS: 'timbrado/errores/cancelacion',
		CFDI_CANCEL: 'timbrado/cancelacion/cfdi',
	},
	XML: {
		DOWNLOAD: 'cfdi/descargarXml',
		COUNTER: 'cfdi/contadores',
		GENERATE: 'cfdi/generar',
		DELETE: 'cfdi/eliminar',
		DOWNLOAD_CFDI: 'cfdi/descargarCFDIPrevio',
	},
};

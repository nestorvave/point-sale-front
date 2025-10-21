import StringSchema from './string-schema.utils';
import NumberSchema from './number-schema.utils';

const string = () => new StringSchema();
const number = () => new NumberSchema();

export { string, number };

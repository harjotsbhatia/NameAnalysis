var Validator = require('jsonschema').Validator;
var v = new Validator();

// Schema Definitions
const getDataSchema = {
	id: '/getdata',
	type: 'object',
	properties: {
		name: { type: 'string', minLength: 1 },
		dob: { type: 'number', minLength: 1 },
	},
	anyOf: [{ required: ['name'] }, { required: ['dob'] }],
};



// Add schema definition to the validator
v.addSchema(getDataSchema, '/getdata');

//called from lambda to validate schema 
// Validate function
exports.validate = async (data, schema) => {
	const validationResult = v.validate(data, schema);
	const status = {};
	if (validationResult.errors.length > 0) {
		(status.result = 'invalid'), (status.errors = validationResult.errors.map((e) => e.stack.replace('instance.', 'payload.')));
	} else {
		(status.result = 'valid'), (status.errors = []);
	}
	return status;//valid or invalid
	
};
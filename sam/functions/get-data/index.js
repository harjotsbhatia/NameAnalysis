const log = require('/opt/helpers/logger').logger;
const validator = require('/opt/helpers/validator');

var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });
function extractMiddle(str) {
		
		        var position;
		        var length;
		
		        if(str.length % 2 == 1) {
		            position = str.length / 2;
		            length = 1;
		        } else {
		            position = str.length / 2 - 1;
		            length = 1;
		        }
		
		        return str.substring(position, position + length)
		    }
exports.lambdaHandler = async (event, context) => {
	try {
		// Checking event
		log.info('Checking event');
		if (!event) throw new Error('Event not found');

		// Validating Payload
		log.info('Validating payload');
		const getDataSchema = {
			id: '/getdata',
			type: 'object',
			properties: {
				name: { type: 'string', minLength: 1 },
				dob: { type: 'number', minLength: 1 },
			},
			anyOf: [{ required: ['name'] }, { required: ['dob'] }],
		};
		const validation = await validator.validate(event, getDataSchema);

		if (validation.result === 'invalid') {
			// Invalid Payload
			log.error(JSON.stringify(validation.errors));
			return { status: 'Error', message: validation.errors };
		} else {
			// Valid payload
			log.info('Payload valid');
			var str = event.name;
		
			// DDb Query parameters
			const getDataParams = {
				TableName: process.env.EMPLOYEES_DDB_TABLE,
			};
			const getDataParamsLast = {
				TableName: process.env.EMPLOYEES_DDB_TABLE,
			};
			const getDataParamsMiddle = {
				TableName: process.env.EMPLOYEES_DDB_TABLE,
			};
			const first = str.charAt(0);
			
			let result = extractMiddle(str).charCodeAt(0) - 97;
			let result1 = String.fromCharCode(97 + result+2)
			const midd =  result1.toLowerCase();
			
			let result3 = str.charAt(str.length - 1).charCodeAt(0) - 97;
			let result4 = String.fromCharCode(97 + result3+4)
			const last = result4.toLowerCase();
			
			
				getDataParams.KeyConditions = {
					name: {
						ComparisonOperator: 'EQ',
						AttributeValueList: [first],
					},
				
				};
			

			// Query Dynamo DB
			log.info('Querying Dynamo DB');
			const getDataRes = await docClient.query(getDataParams).promise();
			
			
			
				getDataParamsLast.KeyConditions = {
					name: {
						ComparisonOperator: 'EQ',
						AttributeValueList: [last],
					},
				
				};
			
			const getDataResLast = await docClient.query(getDataParamsLast).promise();
			
			
				getDataParamsMiddle.KeyConditions = {
					name: {
						ComparisonOperator: 'EQ',
						AttributeValueList: [midd],
					},
				
				};
			

			// Query Dynamo DB
			log.info('Querying Dynamo DB');
			const getDataResMid = await docClient.query(getDataParamsMiddle).promise();
			
			const f = getDataRes.Items;
			
			const m = getDataResMid.Items;
			const l = getDataResLast.Items;
			const d = event.dob
			
			 var Final =  m[0].mean[0] + event.name+" "+ m[0].mean[1] + f[0].mean[d%2+2] +m[0].mean[d%2+2]+l[0].mean[d%2+2];
			
			// Return Data
			 
			return {
				status: 'Success',
				data: Final,
				
			};
		}
	} catch (error) {
		console.trace(error);
		log.error(error.message ? error.message : error);
		return { status: 'error', message: error.message ? error.message : error };
	}
};
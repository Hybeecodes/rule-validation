const express = require('express');
const router = express.Router();

const Conditions = require('../constants/conditions');

const {Response} = require('../dtos/response.formatter.dto');

const validateRule = require('../validators/rule-validator');

/* GET home page. */
router.get('/', (req, res) => {
  const data = {
    name: 'Ibiniyi Obikoya',
    github: '@Hybeecodes',
    email: 'obikoya11@gmail.com',
    mobile: '09032559681',
    twitter: '@hybeecodes'
  };
  const message = 'My Rule-Validation API';
  const status = 'success';
  res.status(200).send(Response(message, status, data));
});

router.post('/validate-rule', (req, res) => {
  try {
    const validated = validateRule(req.body);
    if (validated.error) {
      return res.status(400).send(Response(validated.message, 'error'));
    }
      const {rule, data} = req.body;
      const { field, condition, condition_value } = rule;
    const fieldArray = field.split('.');
    const firstLevelField = data[fieldArray[0]];
    const secondLevelField = fieldArray[1];
    const fieldValue = secondLevelField? firstLevelField[secondLevelField]: firstLevelField;
     const resData = {
       validation: {
         error: true,
         field,
         field_value: fieldValue,
         condition,
         condition_value
       }
     };
     let isValid = true;

     switch (condition) {
       case Conditions.EQ:
         isValid = fieldValue === condition_value;
          break;
       case Conditions.GT:
         isValid = fieldValue > condition_value;
         break;
       case Conditions.GTE:
         isValid = fieldValue >= condition_value;
         break;
       case Conditions.NEQ:
         isValid = fieldValue !== condition_value;
         break;
       case Conditions.CONTAINS:
         isValid = fieldValue.contains(condition_value);
         break;
     }
    const message = isValid? `field${field} successfully validated.`: `field ${field} failed validation.`;
    const status = isValid? 'success': 'error';
    resData.validation.error = !isValid;
    const statusCode = isValid? 200: 400;
    return res.status(statusCode).send(Response(message, status, resData));
  } catch (e) {
    console.log(e);
    return res.status(500).send(Response('An Error Occurred.', 'error'));
  }
})

module.exports = router;

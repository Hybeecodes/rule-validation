module.exports = (body) => {
    const response = {message: '', error: false};
    const { rule, data } = body;
    const { field, condition } = rule;
    if (!rule) {
        response.message = 'rule is required.';
        response.error = true;
        return response;
    }

    if (typeof rule !== 'object') {
        response.message = 'rule should be an object.';
        response.error = true;
        return response;
    }

    if (typeof condition !== 'string') {
        response.message = 'condition should be a string.';
        response.error = true;
        return response;
    }

    // validate field
    const fieldArray = field.split('.');
    const firstLevelField = data[fieldArray[0]];
    const secondLevelField = fieldArray[1];
    if (!firstLevelField) {
        response.message = `field ${fieldArray[0]} is missing from data.`;
        response.error = true;
        return response;
    }
    if (secondLevelField && !firstLevelField[secondLevelField]) {
        console.log('here');
        response.message = `field ${fieldArray[0]}.${fieldArray[1]}  is missing from data.`;
        response.error = true;
        return response;
    }

    return response;
}
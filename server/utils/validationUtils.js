const checkMissingFields = (fields, body) => {
    const missingFields = [];
    fields.forEach(field => {
      if (!body[field]) {
        missingFields.push(field);
      }
    });
    return missingFields;
  };
  
  module.exports = { checkMissingFields };
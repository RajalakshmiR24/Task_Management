// utils/parseDueDate.js

const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const utc = require('dayjs/plugin/utc');

dayjs.extend(customParseFormat);
dayjs.extend(utc);

const parseDueDate = (dueDateString) => {
  try {
    const parsedDate = dayjs.utc(dueDateString, 'MM/DD/YYYY hh:mm A');
    if (!parsedDate.isValid()) {
      return null;
    }
    return parsedDate.toDate();
  } catch (error) {
    return null;
  }
};

// Export the function for CommonJS
module.exports = parseDueDate;

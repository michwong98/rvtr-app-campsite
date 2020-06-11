/**
 * Gets the date set to the amount of months specified to jump ahead
 * @param numMonths number of months to jump ahead
 * @param numDays number of days to jump ahead
 * @returns New date set from numMonths months from now and numDays days
 * @see https://stackoverflow.com/questions/499838/javascript-date-next-month
 */
const getNewDateFromNowBy = (numMonths: number, numDays: number = 7): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + numMonths, now.getDate() + numDays);
};

/**
 * Formats the provided date to be used in the date input
 * @param date The `Date` to format
 * @see https://stackoverflow.com/questions/57198151/how-to-set-the-date-in-angular-reactive-forms-using-patchvalue
 */
const formatDate = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [year, month, day].join('-');
};

export { formatDate, getNewDateFromNowBy };

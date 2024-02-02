function getSpendingId() {
  const dateObject = new Date();

  const day = dateObject.getDay();
  const mon = dateObject.getMonth();
  const year = dateObject.getFullYear();
  const hour = dateObject.getHours().toString();
  const minute = dateObject.getMinutes().toString();
  const second = dateObject.getSeconds().toString();

  const newDate = year + "-" + mon + "-" + day;
  const newTime = hour + minute + second;

  const spendingIdObject = {
    newDate,
    newTime,
  };

  return spendingIdObject;
}

export default getSpendingId;

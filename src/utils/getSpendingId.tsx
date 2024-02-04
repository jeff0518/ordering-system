function getSpendingId() {
  const dateObject = new Date();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const hour = dateObject.getHours().toString();
  const minute = dateObject.getMinutes().toString();
  const second = dateObject.getSeconds().toString();

  const newTime = hour + minute + second;
  const newDate = dateObject.toLocaleDateString("zh-TW", options);
  const spendingIdObject = {
    newDate,
    newTime,
  };

  return spendingIdObject;
}

export default getSpendingId;

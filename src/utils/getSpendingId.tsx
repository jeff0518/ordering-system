function getSpendingId() {
  const dateObject = new Date();

  const hour = dateObject.getHours().toString();
  const minute = dateObject.getMinutes().toString();
  const second = dateObject.getSeconds().toString();

  const newTime = hour + minute + second;
  const newDate = dateObject.toLocaleDateString();
  const spendingIdObject = {
    newDate,
    newTime,
  };

  return spendingIdObject;
}

export default getSpendingId;

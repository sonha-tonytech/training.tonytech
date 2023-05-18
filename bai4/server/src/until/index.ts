const getHourAndMinute = (date: Date) => {    
  const time: Date = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  );

  return time.getHours() + ":" + time.getMinutes();
};

export { getHourAndMinute };
export default { getHourAndMinute };

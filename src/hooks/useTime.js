const useTime = (time) => {
  var seconds = Math.floor((new Date() - time) / 1000);

  let interval = seconds / 3600;
  if (interval > 24) {
    return time.toISOString().slice(0, 10);
  }
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  if (seconds < 60) {
    return Math.floor(seconds + 1) + " seconds";
  }
};

export default useTime;

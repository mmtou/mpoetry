function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function formatCount(count) {
  let finalCount = '';
  if (count) {
    if (count < 1000) {
      finalCount = count;
    } else if (count < 10000) {
      finalCount = parseInt(count/1000) + 'k';
    } else if (count < 1000000) {
      finalCount = parseInt(count/10000) + 'w';
    } else {
      finalCount = '99w';
    }
  }
  return finalCount;
}

export default {
  formatNumber,
  formatTime
}

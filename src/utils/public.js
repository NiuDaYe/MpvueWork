function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
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

export function LeftMenuFun(array) {
    let temp = []
    let grouplength = array.length
    for (let k = 0; k < grouplength; k++) {
        if (k == 0) {
            temp[k] = array[k].materialList.length * 66 + 30
            continue
        }
        temp[k] = (array[k].materialList.length * 66 + 30) + temp[k - 1]
    }
    return temp
}

export default {
  formatNumber,
  formatTime,
  LeftMenuFun
}

let gl = {};

gl.formatDate = (date, fmt)=> {
  date = date == undefined ? new Date() : date;
  date = typeof date == 'number' ? new Date(date) : date;
  fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
  let obj =
    {
      'y': date.getFullYear(), // 年份，
      'M': date.getMonth() + 1, // 月份，
      'd': date.getDate(), // 日期
      'q': Math.floor((date.getMonth() + 3) / 3), // 季度
      'w': date.getDay(), // 星期，
      'H': date.getHours(), // 24小时制
      'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
      'm': date.getMinutes(), // 分钟
      's': date.getSeconds(), // 秒
      'S': date.getMilliseconds() // 毫秒
    };
  let week = ['日', '一', '二', '三', '四', '五', '六'];
  for (let i in obj) {
    fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
      let val = obj[i] + '';
      if (i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
      for (let j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
      return m.length == 1 ? val : val.substring(val.length - m.length);
    });
  }
  return fmt;
},

module.exports = gl;

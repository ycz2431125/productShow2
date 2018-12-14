const {
  mysql
} = require('../config');

const {
  formatDate
} = require('../js/common');

module.exports = async (ctx) => {
  let {
    title,
    page,
    size
  } = ctx.request.query;

  page = parseInt(page) - 1;
  size = parseInt(size);

  let note = [];

  if (title) {
    note = await mysql('notelist')
      .select('*')
      .where('title', 'like', `%${title}%`) // 搜索title 里 包含 title的值的数据
      .limit(size)
      .offset(Number(page) * size)
      .orderBy('notelist.id', 'desc');
  }
  else {
    note = await mysql('notelist')
      .select('*')
      .limit(size)
      .offset(Number(page) * size)
      .orderBy('notelist.id', 'desc');     //'desc' id 从大到小排序（倒序） 默认是从小到大排序
  }


  let arr = [];

  if (note.length) {

    for (let iterator of note) {
      // books 数组中 openid 等于 users表中的 id 新建对象放入user 信息
      const writerInfo = await mysql('users').where("id", iterator.userId);
      iterator.writerInfo = writerInfo[0];
      iterator.createTime = formatDate(new Date(iterator.createTime.toString()), "yyyy-MM-dd");
      arr.push(iterator);
    }
  }
  ctx.state.data = arr;
};


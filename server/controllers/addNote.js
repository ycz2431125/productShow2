const {
  mysql
} = require('../config');

module.exports = async (ctx) => {

  const {
    title,
    content,
    userId,
  } = ctx.request.body;

  if (!userId) {
    ctx.state.data = {
      code: -1,
      msg: 'userId不能为空'
    };
    return false;
  }

  const user = await mysql('users').select().where('id', userId);

  if (!user) {
    ctx.state.data = {
      code: -1,
      msg: '用户不存在'
    };
    return false;
  }

  // 插入数据可能报错 捕捉错误
  //mysql('books').insert 数据库添加数据

  try {
    await mysql('notelist').insert({
      content,
      title,
      userId
    });
  }
  catch (e) {
    ctx.state = {
      code: -1,
      data: {
        msg: '新增失败:' + e.sqlMessage
      }
    };
    return false;
  }

  ctx.state.data = {
    code: 1,
    msg: 'success'
  };

};

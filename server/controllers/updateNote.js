const {
  mysql
} = require('../config');

module.exports = async (ctx) => {

  const {
    title,
    content,
    id,
  } = ctx.request.body;


  if (id) {

    try {

      await mysql('notelist')
        .where('id', id).first()
        .update({
          title,
          content,
        });

      ctx.state.data = {
        msg: 'success'
      }

    } catch (e) {
      // 捕捉错误
      ctx.state = {
        code: -1,
        data: {
          msg: e.sqlMessage
        }
      }
    }
  }
};

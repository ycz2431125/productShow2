const {
  mysql
} = require('../config');

module.exports = async (ctx) => {

  const {
    id,
  } = ctx.request.query;


  if (id) {

    try {

      await mysql('notelist')
        .where('id', id)
        .del();

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

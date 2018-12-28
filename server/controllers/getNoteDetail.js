const {
  mysql
} = require('../config');

const {
  formatDate
} = require('../js/common');

module.exports = async (ctx) => {
  let {
    id,
  } = ctx.request.query;

  if (!id) {
    ctx.state.data = {
      code: -1,
      msg: "id不能为空"
    };
    return false;
  }

  let detail = await mysql('notelist').where('id', id).first();
  detail.writerInfo = await mysql('users').where("id", detail.userId).first();
  detail.createTime = formatDate(new Date(detail.createTime.toString()), "yyyy-MM-dd");
  ctx.state.data = detail;
};


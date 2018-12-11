const {
  mysql
} = require('../config');

module.exports = async (ctx)=>{

  const test = await mysql('test1')
    .select('*');

  ctx.state.data = {
    msg:test
  }
};

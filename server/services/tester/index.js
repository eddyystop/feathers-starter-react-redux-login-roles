
const errors = require('feathers-errors');

module.exports = function () {
  console.log('configure tester'); // eslint-disable-line no-console

  return function () {
    const app = this;
    app.use('/tester', {
      create(data, param, cb) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (data.a === 'x') {
              const err = new errors.BadRequest('boo', { errors: { email: 'Bad email' }, data });
              reject(err);
              if (cb) { cb(err); }
            } else {
              const res = { niceData: true };
              resolve(res);
              if (cb) { cb(null, res); }
            }

            data.a === 'x' // eslint-disable-line no-unused-expressions
              ? reject(new errors.BadRequest('boo', { errors: { email: 'Bad email' }, data }))
              : resolve({ niceData: true });
          }, 100);
        });
      },
    });
  };
};

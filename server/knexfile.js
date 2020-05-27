// const credentials = require("./config/dbcredentials");
const knexSnakeCaseMapper = require("objection").knexSnakeCaseMappers;

// module.exports = {
//   development: {
//     client: "mysql",
//     connection: {
//       host: "pqxt96p7ysz6rn1f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
//       database: "jwfpzfz7zbu3zy2b",
//       user: "c1rsbutdqmetw7zx",
//       password: "mv880478nmm1tgks",
//     },
//   },
//   ...knexSnakeCaseMapper(),
// };

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "ekaterinagp.dk.mysql",
      database: "ekaterinagp_dkchemicals",
      user: "ekaterinagp_dkchemicals",
      password: "123456",
    },
  },
  ...knexSnakeCaseMapper(),
};

const bcrypt = require('bcryptjs');

const encrypt = async (textPplain) => {
  const hash = await bcrypt.hash(textPplain, 10);
  return hash;
};

const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPasswordash);
};

module.exports = { encrypt, compare };

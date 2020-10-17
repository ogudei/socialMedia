const schemas = require("./schemas");

async function findOneBySchema(schema, key, value) {
  if (Object.keys(schemas).includes(schema)) {
    return await schemas[schema].findOne({ [key]: value }).exec();
  } else return;
}

async function findBySchema(schema, key, value) {
  if (Object.keys(schemas).includes(schema)) {
    return await schemas[schema].find({ [key]: value }).exec();
  } else return;
}

async function findOneAndUpdateBySchema(schema, filter, update) {
  if (Object.keys(schemas).includes(schema)) {
    return await schemas[schema].findOneAndUpdate(filter, update).exec();
  } else return;
}

async function createBySchema(schema, element) {
  if (Object.keys(schemas).includes(schema)) {
    return await schemas[schema]
      .create(element)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  } else return;
}

module.exports = {
  findOneBySchema,
  findOneAndUpdateBySchema,
  createBySchema,
  findBySchema,
};

const defaultSchemaPlugin = (schema) => {
  schema.options.toJSON = {
    virtuals: true,
    getters: true,
    versionKey: false,
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  };
};

module.exports = defaultSchemaPlugin;

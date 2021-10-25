const slugify = require('slugify');

module.exports = (schema) => {
  schema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
  });
};

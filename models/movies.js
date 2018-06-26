let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myMovies');

let MovieSchema = new mongoose.Schema({
  derector: String,
  title: String,
  poster: String,
  rating: String,
  country: String,
  year: Number,
  description: String,
  flash: String,
  // meta: {
  //   createAt: {
  //     type: Date,
  //     default: Date.now()
  //   },
  //   updateAt: {
  //     type: Date,
  //     default: Date.now()
  //   }
  // }
});
// MovieSchema.pre('save', function (next) {
//   if (this.isNew) {
//     this.meta.createAt = this.meta.updateAt = Date.now();
//   } else {
//     this.meta.updateAt = Date.now();
//   }
// });
MovieSchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb);
  },
  findById: function (id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb);
  }
};

module.exports = mongoose.model('Movie', MovieSchema);
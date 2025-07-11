"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPlayMovie = undefined;
const FbMovieBackgroundFadeData_1 = require("./FbMovieBackgroundFadeData");
class FbPlayMovie {
  constructor(t) {
    this.FbDataInternal = t;
    this.qdh = false;
    this.kdh = undefined;
    this.Gdh = false;
    this.Odh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPlayMovie(t);
    }
  }
  get VideoName() {
    if (!this.qdh) {
      this.qdh = true;
      this.kdh = this.FbDataInternal.videoName();
    }
    return this.kdh;
  }
  get BackgroundFade() {
    if (!this.Gdh) {
      this.Gdh = true;
      this.Odh = FbMovieBackgroundFadeData_1.FbMovieBackgroundFadeData.Create(this.FbDataInternal.backgroundFade());
    }
    return this.Odh;
  }
}
exports.FbPlayMovie = FbPlayMovie;
//# sourceMappingURL=FbPlayMovie.js.map
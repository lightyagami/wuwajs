"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovieBackgroundFadeData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MovieBackgroundFadeData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(a, t) {
    this.bb_pos = a;
    this.bb = t;
    return this;
  }
  static getRootAsMovieBackgroundFadeData(a, t) {
    return (t || new MovieBackgroundFadeData()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  static getSizePrefixedRootAsMovieBackgroundFadeData(a, t) {
    a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new MovieBackgroundFadeData()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  fadeInBackgroundType(a) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, a);
    } else {
      return undefined;
    }
  }
  fadeOutBackgroundType(a) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, a);
    } else {
      return undefined;
    }
  }
  static startMovieBackgroundFadeData(a) {
    a.startObject(2);
  }
  static addFadeInBackgroundType(a, t) {
    a.addFieldOffset(0, t, 0);
  }
  static addFadeOutBackgroundType(a, t) {
    a.addFieldOffset(1, t, 0);
  }
  static endMovieBackgroundFadeData(a) {
    return a.endObject();
  }
  static createMovieBackgroundFadeData(a, t, e) {
    MovieBackgroundFadeData.startMovieBackgroundFadeData(a);
    MovieBackgroundFadeData.addFadeInBackgroundType(a, t);
    MovieBackgroundFadeData.addFadeOutBackgroundType(a, e);
    return MovieBackgroundFadeData.endMovieBackgroundFadeData(a);
  }
}
exports.MovieBackgroundFadeData = MovieBackgroundFadeData;
//# sourceMappingURL=movie-background-fade-data.js.map
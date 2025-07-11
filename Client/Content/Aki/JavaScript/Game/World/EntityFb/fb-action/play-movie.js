"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayMovie = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const movie_background_fade_data_js_1 = require("../fb-action/movie-background-fade-data.js");
class PlayMovie {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPlayMovie(t, e) {
    return (e || new PlayMovie()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPlayMovie(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PlayMovie()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  videoName(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  backgroundFade(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new movie_background_fade_data_js_1.MovieBackgroundFadeData()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startPlayMovie(t) {
    t.startObject(2);
  }
  static addVideoName(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addBackgroundFade(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endPlayMovie(t) {
    return t.endObject();
  }
}
exports.PlayMovie = PlayMovie;
//# sourceMappingURL=play-movie.js.map
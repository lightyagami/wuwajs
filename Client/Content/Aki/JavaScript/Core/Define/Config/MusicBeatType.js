"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MusicBeatType = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MusicBeatType {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get BeatType() {
    return this.beattype();
  }
  get MusicType() {
    return this.musictype();
  }
  get BeatConfigType() {
    return this.beatconfigtype();
  }
  get BeatConfig() {
    return GameUtils_1.GameUtils.ConvertToArray(this.beatconfigLength(), this.beatconfig, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMusicBeatType(t, i) {
    return (i || new MusicBeatType()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  beattype(t) {
    var i = this.J7.__offset(this.z7, 4);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  musictype(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  beatconfigtype(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetBeatconfigAt(t) {
    return this.beatconfig(t);
  }
  beatconfig(t) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  beatconfigLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  beatconfigArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.MusicBeatType = MusicBeatType;
//# sourceMappingURL=MusicBeatType.js.map
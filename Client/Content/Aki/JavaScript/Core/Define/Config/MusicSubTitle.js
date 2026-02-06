"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MusicSubTitle = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MusicSubTitle {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get SubtitleGroupTag() {
    return this.subtitlegrouptag();
  }
  get AppearTime() {
    return this.appeartime();
  }
  get EndTime() {
    return this.endtime();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMusicSubTitle(t, i) {
    return (i || new MusicSubTitle()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  subtitlegrouptag(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  appeartime() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  endtime() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MusicSubTitle = MusicSubTitle;
//# sourceMappingURL=MusicSubTitle.js.map
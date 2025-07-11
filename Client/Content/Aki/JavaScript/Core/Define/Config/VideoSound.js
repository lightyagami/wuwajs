"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoSound = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class VideoSound {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get CaptionId() {
    return this.captionid();
  }
  get CgName() {
    return this.cgname();
  }
  get GirlOrBoy() {
    return this.girlorboy();
  }
  get EventPath() {
    return this.eventpath();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsVideoSound(t, i) {
    return (i || new VideoSound()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  captionid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cgname(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  girlorboy() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 2;
    }
  }
  eventpath(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.VideoSound = VideoSound;
//# sourceMappingURL=VideoSound.js.map
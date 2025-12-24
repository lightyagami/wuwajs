"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorLoadProject = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MotorLoadProject {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Show() {
    return this.show();
  }
  get SortIndex() {
    return this.sortindex();
  }
  get Name() {
    return this.name();
  }
  get Icon() {
    return this.icon();
  }
  get Sticker() {
    return GameUtils_1.GameUtils.ConvertToArray(this.stickerLength(), this.sticker, this);
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsMotorLoadProject(t, s) {
    return (s || new MotorLoadProject()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  show() {
    var t = this.J7.__offset(this.z7, 6);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  sortindex() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  icon(t) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetStickerAt(t) {
    return this.sticker(t);
  }
  sticker(t) {
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  stickerLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  stickerArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.MotorLoadProject = MotorLoadProject;
//# sourceMappingURL=MotorLoadProject.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideTips = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class GuideTips {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get GuideId() {
    return this.guideid();
  }
  get Content() {
    return this.content();
  }
  get Button() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buttonLength(), this.button, this);
  }
  get InputEnums() {
    return GameUtils_1.GameUtils.ConvertToArray(this.inputenumsLength(), this.inputenums, this);
  }
  get LimitInputEnums() {
    return GameUtils_1.GameUtils.ConvertToArray(this.limitinputenumsLength(), this.limitinputenums, this);
  }
  get UseLoopAnim() {
    return this.useloopanim();
  }
  get UseMask() {
    return this.usemask();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsGuideTips(t, i) {
    return (i || new GuideTips()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  guideid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  content(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetButtonAt(t) {
    return this.button(t);
  }
  button(t, i) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  buttonLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetInputenumsAt(t) {
    return this.inputenums(t);
  }
  inputenums(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  inputenumsLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLimitinputenumsAt(t) {
    return this.limitinputenums(t);
  }
  limitinputenums(t, i) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  limitinputenumsLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  useloopanim() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  usemask() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.GuideTips = GuideTips;
//# sourceMappingURL=GuideTips.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DigitalScreenText = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class DigitalScreenText {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get TextContentId() {
    return this.textcontentid();
  }
  get Alignment() {
    return this.alignment();
  }
  get FontSize() {
    return this.fontsize();
  }
  get ShowStartFrame() {
    return this.showstartframe();
  }
  get ShowEndFrame() {
    return this.showendframe();
  }
  get HideFrame() {
    return this.hideframe();
  }
  get Effect() {
    return this.effect();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsDigitalScreenText(t, e) {
    return (e || new DigitalScreenText()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  textcontentid(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  alignment() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  fontsize() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showstartframe() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showendframe() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  hideframe() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  effect() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.DigitalScreenText = DigitalScreenText;
//# sourceMappingURL=DigitalScreenText.js.map
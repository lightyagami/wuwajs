"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeBtnStyle = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class HomeBtnStyle {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ResourceId() {
    return this.resourceid();
  }
  get SPNormal() {
    return this.spnormal();
  }
  get SPHighLighted() {
    return this.sphighlighted();
  }
  get SPPressed() {
    return this.sppressed();
  }
  get SPDisable() {
    return this.spdisable();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsHomeBtnStyle(t, s) {
    return (s || new HomeBtnStyle()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  resourceid(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  spnormal(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  sphighlighted(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  sppressed(t) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  spdisable(t) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.HomeBtnStyle = HomeBtnStyle;
//# sourceMappingURL=HomeBtnStyle.js.map
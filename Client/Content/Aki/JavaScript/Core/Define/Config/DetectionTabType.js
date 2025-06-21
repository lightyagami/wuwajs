"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DetectionTabType = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class DetectionTabType {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get Type() {
    return this.type()
  }
  get Icon() {
    return this.icon()
  }
  get Text() {
    return this.text()
  }
  get Order() {
    return this.order()
  }
  __init(t, e) {
    return this.z7 = t, this.J7 = e, this
  }
  static getRootAsDetectionTabType(t, e) {
    return (e || new DetectionTabType).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  type() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  icon(t) {
    var e = this.J7.__offset(this.z7, 8),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  text(t) {
    var e = this.J7.__offset(this.z7, 10),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  order() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
}
exports.DetectionTabType = DetectionTabType;
//# sourceMappingURL=DetectionTabType.js.map
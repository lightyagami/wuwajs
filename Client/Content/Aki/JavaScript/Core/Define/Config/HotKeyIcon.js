"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HotKeyIcon = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class HotKeyIcon {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get KeyName() {
    return this.keyname();
  }
  get Icon() {
    return this.icon();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsHotKeyIcon(t, e) {
    return (e || new HotKeyIcon()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  keyname(t) {
    var e = this.J7.__offset(this.z7, 4);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  icon(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.HotKeyIcon = HotKeyIcon;
//# sourceMappingURL=HotKeyIcon.js.map
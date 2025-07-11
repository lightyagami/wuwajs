"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HotKeyText = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class HotKeyText {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get TextId() {
    return this.textid();
  }
  get Name() {
    return this.name();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsHotKeyText(t, e) {
    return (e || new HotKeyText()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  textid(t) {
    var e = this.J7.__offset(this.z7, 4);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.HotKeyText = HotKeyText;
//# sourceMappingURL=HotKeyText.js.map
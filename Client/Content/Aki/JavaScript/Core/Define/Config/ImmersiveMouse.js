"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImmersiveMouse = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class ImmersiveMouse {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ViewName() {
    return this.viewname();
  }
  get AutoHideTime() {
    return this.autohidetime();
  }
  get DeadZone() {
    return this.deadzone();
  }
  __init(e, t) {
    this.z7 = e;
    this.J7 = t;
    return this;
  }
  static getRootAsImmersiveMouse(e, t) {
    return (t || new ImmersiveMouse()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  viewname(e) {
    var t = this.J7.__offset(this.z7, 4);
    var t = t ? this.J7.__string(this.z7 + t, e) : null;
    if (typeof t == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(t);
    }
    return t;
  }
  autohidetime() {
    var e = this.J7.__offset(this.z7, 6);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 3000;
    }
  }
  deadzone() {
    var e = this.J7.__offset(this.z7, 8);
    if (e) {
      return this.J7.readFloat32(this.z7 + e);
    } else {
      return 0.1;
    }
  }
}
exports.ImmersiveMouse = ImmersiveMouse;
//# sourceMappingURL=ImmersiveMouse.js.map
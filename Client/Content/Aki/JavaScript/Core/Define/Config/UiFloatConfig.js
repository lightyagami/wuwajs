"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiFloatConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class UiFloatConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ViewName() {
    return this.viewname();
  }
  get Area() {
    return this.area();
  }
  get Priority() {
    return this.priority();
  }
  get OnlyShowInMain() {
    return this.onlyshowinmain();
  }
  get RootItemIndex() {
    return this.rootitemindex();
  }
  get IsWaitNormal() {
    return this.iswaitnormal();
  }
  get HideInPureMode() {
    return this.hideinpuremode();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsUiFloatConfig(t, i) {
    return (i || new UiFloatConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  viewname(t) {
    var i = this.J7.__offset(this.z7, 4);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  area(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  priority() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  onlyshowinmain() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  rootitemindex() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  iswaitnormal() {
    var t = this.J7.__offset(this.z7, 14);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  hideinpuremode() {
    var t = this.J7.__offset(this.z7, 16);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.UiFloatConfig = UiFloatConfig;
//# sourceMappingURL=UiFloatConfig.js.map
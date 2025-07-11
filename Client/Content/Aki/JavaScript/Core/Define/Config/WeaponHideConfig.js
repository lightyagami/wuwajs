"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponHideConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class WeaponHideConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get HideWeaponTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.hideweapontagsLength(), this.hideweapontags, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsWeaponHideConfig(t, i) {
    return (i || new WeaponHideConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetHideweapontagsAt(t) {
    return this.hideweapontags(t);
  }
  hideweapontags(t, i) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, i) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  hideweapontagsLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.WeaponHideConfig = WeaponHideConfig;
//# sourceMappingURL=WeaponHideConfig.js.map
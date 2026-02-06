"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpRoleViewConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class TotalTopUpRoleViewConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ItemId() {
    return this.itemid();
  }
  get SpinePrefabResource() {
    return this.spineprefabresource();
  }
  get TexturePath() {
    return this.texturepath();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsTotalTopUpRoleViewConfig(t, e) {
    return (e || new TotalTopUpRoleViewConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  spineprefabresource(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  texturepath(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.TotalTopUpRoleViewConfig = TotalTopUpRoleViewConfig;
//# sourceMappingURL=TotalTopUpRoleViewConfig.js.map
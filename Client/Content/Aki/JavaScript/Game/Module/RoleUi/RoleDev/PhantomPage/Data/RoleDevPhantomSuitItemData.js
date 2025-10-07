"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomSuitItemData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
class RoleDevPhantomSuitItemData {
  constructor() {
    this.K0d = 0;
    this.JGi = 0;
    this.CXd = undefined;
  }
  Init(t, e, r) {
    this.K0d = t;
    this.JGi = e;
    this.CXd = r;
  }
  get SuitId() {
    return this.K0d;
  }
  get RoleId() {
    return this.JGi;
  }
  get UseRate() {
    return this.CXd?.GetUsage() ?? 0;
  }
  get UseRateText() {
    return this.CXd?.GetUsageText() ?? "";
  }
  get FetterGroupConfig() {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetFetterGroupById(this.K0d);
  }
  get SuitName() {
    return this.FetterGroupConfig?.FetterGroupName ?? "";
  }
  get HasElementIcon() {
    return !!this.FetterGroupConfig?.FetterElementPath;
  }
  get ElementColor() {
    return this.FetterGroupConfig?.FetterElementColor;
  }
  get ElementIconPath() {
    return this.FetterGroupConfig?.FetterElementPath;
  }
  get DungeonIdList() {
    var t = ConfigManager_1.ConfigManager.RoleDevConfig?.GetPhantomJumpGroupConfig(this.K0d);
    if (t) {
      return t.PhantomJumpId;
    } else {
      return [];
    }
  }
}
exports.RoleDevPhantomSuitItemData = RoleDevPhantomSuitItemData;
//# sourceMappingURL=RoleDevPhantomSuitItemData.js.map
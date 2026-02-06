"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomSuitItemData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
class RoleDevPhantomSuitItemData {
  constructor() {
    this.fvd = 0;
    this.JGi = 0;
    this.MMm = undefined;
  }
  Init(t, e, r) {
    this.fvd = t;
    this.JGi = e;
    this.MMm = r;
  }
  get SuitId() {
    return this.fvd;
  }
  get RoleId() {
    return this.JGi;
  }
  get UseRate() {
    return this.MMm?.GetUsage() ?? 0;
  }
  get UseRateText() {
    return this.MMm?.GetUsageText() ?? "";
  }
  get FetterGroupConfig() {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetFetterGroupById(this.fvd);
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
    var t = ConfigManager_1.ConfigManager.RoleDevConfig?.GetPhantomJumpGroupConfig(this.fvd);
    if (t) {
      return t.PhantomJumpId;
    } else {
      return [];
    }
  }
}
exports.RoleDevPhantomSuitItemData = RoleDevPhantomSuitItemData;
//# sourceMappingURL=RoleDevPhantomSuitItemData.js.map
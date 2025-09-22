"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomViewItemData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleDevPhantomSuitItemData_1 = require("./RoleDevPhantomSuitItemData");
class RoleDevPhantomViewItemData {
  constructor() {
    this.JGi = 0;
    this.tCd = [];
  }
  get RoleId() {
    return this.JGi;
  }
  get SuitDataList() {
    return this.tCd;
  }
  InitByRoleId(e) {
    this.JGi = e;
    this.iCd();
  }
  InitByForecastRoleId(e) {
    this.JGi = e;
  }
  RefreshByFetterGroupId(e) {
    this.ISd(e);
  }
  iCd() {
    this.tCd = [];
    var e;
    var t;
    var a = ModelManager_1.ModelManager.VisionRecommendModel?.GetRoleFetterRecommendInfo(this.RoleId);
    if (a && a.length !== 0 && (a.sort((e, t) => t.GetUsage() - e.GetUsage()), e = (a = a[0]).GetRecommendFetterGroupId(), ConfigManager_1.ConfigManager.RoleDevConfig?.GetPhantomJumpGroupConfig(e)) && ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetFetterGroupById(e)) {
      (t = new RoleDevPhantomSuitItemData_1.RoleDevPhantomSuitItemData()).Init(e, this.RoleId, Math.round(a.GetUsage()));
      this.tCd.push(t);
    }
  }
  ISd(e) {
    var t;
    this.tCd = [];
    if (ConfigManager_1.ConfigManager.RoleDevConfig?.GetPhantomJumpGroupConfig(e) && ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetFetterGroupById(e)) {
      (t = new RoleDevPhantomSuitItemData_1.RoleDevPhantomSuitItemData()).Init(e, this.RoleId, 0);
      this.tCd.push(t);
    }
  }
}
exports.RoleDevPhantomViewItemData = RoleDevPhantomViewItemData;
//# sourceMappingURL=RoleDevPhantomViewItemData.js.map
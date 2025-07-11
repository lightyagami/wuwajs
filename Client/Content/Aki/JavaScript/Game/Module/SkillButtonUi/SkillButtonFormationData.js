"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillButtonFormationData = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const SkillButtonTypeFormationData_1 = require("./SkillButtonTypeFormationData");
const FOLLOWER_ID = 658700001;
class SkillButtonFormationData {
  constructor() {
    this.CEa = new Map();
    this.VRn = false;
    this.QRn = undefined;
  }
  Init() {}
  Clear() {
    for (const t of this.CEa.values()) {
      t.Clear();
    }
  }
  GetSkillButtonTypeFormationData(t) {
    let a = this.CEa.get(t);
    if (!a) {
      a = new SkillButtonTypeFormationData_1.SkillButtonTypeFormationData();
      this.CEa.set(t, a);
    }
    return a;
  }
  RefreshOnFollowerAimStateChange(t) {
    if (t !== this.VRn) {
      if ((this.VRn = t) && ModelManager_1.ModelManager.BattleUiModel?.FormationData?.GetFollowerEntityHandle()?.PbDataId === FOLLOWER_ID) {
        this.QRn ||= this.XRn("SP_IconT35");
        this.gEa(7, this.QRn, 210020);
      } else {
        this.gEa(7, undefined, 0);
      }
      ModelManager_1.ModelManager.SkillButtonUiModel?.GetCurSkillButtonFollowerEntityData()?.SetEnable(t);
    }
  }
  gEa(t, a, e = 0) {
    var o = this.GetSkillButtonTypeFormationData(t);
    if ((o.SkillIconPath !== a || o.EnableSkillId !== e) && (o.SkillIconPath = a, o.EnableSkillId = e, a = ModelManager_1.ModelManager.SkillButtonUiModel?.GetCurSkillButtonEntityData())) {
      a.RefreshSkillTexturePath(t);
    }
  }
  XRn(t) {
    return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
  }
}
exports.SkillButtonFormationData = SkillButtonFormationData;
//# sourceMappingURL=SkillButtonFormationData.js.map
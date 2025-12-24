"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrialRoleGroupData = undefined;
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
class TrialRoleGroupData {
  constructor(t) {
    this.yBf = undefined;
    this.SBf = undefined;
    this.h0i = 0;
    this.TDf = undefined;
    this.MBf = undefined;
    this.yBf = ConfigManager_1.ConfigManager.TrialRoleConfig?.GetTrialRoleConfig(t);
    t = ConfigManager_1.ConfigManager.TrialRoleConfig?.GetTrialRoleConfigsByGroupId(this.yBf.GroupId);
    this.TDf = ConfigCommon_1.ConfigCommon.ToList(t);
    this.TDf?.sort((t, e) => t.WorldLevel - e.WorldLevel);
  }
  get RealRoleId() {
    return this.yBf?.ParentId ?? 0;
  }
  get TrialRoleId() {
    return this.yBf?.Id ?? 0;
  }
  get TrialRoleGroupId() {
    return this.yBf?.GroupId ?? 0;
  }
  get Status() {
    return this.h0i;
  }
  get TrialRoleConfig() {
    return this.yBf;
  }
  get TrialRoleData() {
    return this.SBf;
  }
  get TrialRoleType() {
    return this.yBf.Type;
  }
  SetIsUnlocked(t) {
    this.h0i = t ? 1 : 0;
    if (t && !this.SBf) {
      this.SBf = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(this.TrialRoleId);
      this.SBf.SetIsVisibleInFormation(false);
      this.SBf.SetIsVisibleInRoleSystem(false);
    }
    this.SBf?.SetIsUnlock(t);
    if (this.MBf !== undefined) {
      this.SBf?.SetIsVisibleInFormation(this.MBf);
      this.MBf = undefined;
    }
  }
  SetIsVisibleInFormation(t) {
    if (this.SBf) {
      this.SBf.SetIsVisibleInFormation(t);
    } else {
      this.MBf = t;
    }
  }
  SetIsVisibleInRoleSystem(t) {
    this.SBf?.SetIsVisibleInRoleSystem(t);
  }
  SetActivatedTrialRoleId(t) {
    var e = this.SBf;
    this.yBf = ConfigManager_1.ConfigManager.TrialRoleConfig?.GetTrialRoleConfig(t);
    this.SBf = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(t);
    if (e && e !== this.SBf) {
      e.SetIsVisibleInFormation(false);
      e.SetIsVisibleInRoleSystem(false);
    }
  }
  IsLocked() {
    return this.h0i === 0;
  }
  IsUnlocked() {
    return this.h0i === 1;
  }
  CanUpgrade() {
    return !!this.IsUnlocked() && this.IsReachUpgradeCondition();
  }
  GetCurWorldLevel() {
    return this.yBf?.WorldLevel ?? 0;
  }
  GetNextWorldLevel() {
    if (!this.TDf) {
      return -1;
    }
    let t = this.TDf.findIndex(t => t.Id === this.TrialRoleId) ?? -1;
    if (t >= 0 && t + 1 < this.TDf.length) {
      return t = this.TDf[t + 1].WorldLevel;
    } else {
      return -1;
    }
  }
  IsMaxLevel() {
    return this.GetNextWorldLevel() < 0;
  }
  IsReachUpgradeCondition() {
    var t;
    return !this.IsMaxLevel() && !((t = this.GetNextWorldLevel()) < 0) && t <= ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel;
  }
  GetPreviewTrialRoleId() {
    if (this.IsUnlocked()) {
      return this.TrialRoleId;
    }
    var t = ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel;
    let e = this.TrialRoleId;
    for (const i of this.TDf) {
      if (i.WorldLevel > t) {
        break;
      }
      e = i.Id;
    }
    return e;
  }
  SetActivatedRoleAttr(t, e) {
    if (this.SBf) {
      var i = this.SBf.GetAttributeData();
      i.ClearRoleBaseAttr();
      for (const r of t) {
        i.SetRoleBaseAttr(r.Z4n, r.e5n);
      }
      i.ClearRoleAddAttr();
      for (const s of e) {
        i.SetRoleAddAttr(s.Z4n, s.e5n);
      }
    }
  }
}
exports.TrialRoleGroupData = TrialRoleGroupData;
//# sourceMappingURL=TrialRoleGroupData.js.map
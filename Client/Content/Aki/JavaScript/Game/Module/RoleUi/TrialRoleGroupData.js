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
    this.mNf = undefined;
    this.fNf = undefined;
    this.h0i = 0;
    this.oOf = undefined;
    this.gNf = undefined;
    this.mNf = ConfigManager_1.ConfigManager.TrialRoleConfig?.GetTrialRoleConfig(t);
    t = ConfigManager_1.ConfigManager.TrialRoleConfig?.GetTrialRoleConfigsByGroupId(this.mNf.GroupId);
    this.oOf = ConfigCommon_1.ConfigCommon.ToList(t);
    this.oOf?.sort((t, e) => t.WorldLevel - e.WorldLevel);
  }
  get RealRoleId() {
    return this.mNf?.ParentId ?? 0;
  }
  get TrialRoleId() {
    return this.mNf?.Id ?? 0;
  }
  get TrialRoleGroupId() {
    return this.mNf?.GroupId ?? 0;
  }
  get Status() {
    return this.h0i;
  }
  get TrialRoleConfig() {
    return this.mNf;
  }
  get TrialRoleData() {
    return this.fNf;
  }
  get TrialRoleType() {
    return this.mNf.Type;
  }
  SetIsUnlocked(t) {
    this.h0i = t ? 1 : 0;
    if (t && !this.fNf) {
      this.fNf = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(this.TrialRoleId);
      this.fNf.SetIsVisibleInFormation(false);
      this.fNf.SetIsVisibleInRoleSystem(false);
    }
    this.fNf?.SetIsUnlock(t);
    if (this.gNf !== undefined) {
      this.fNf?.SetIsVisibleInFormation(this.gNf);
      this.gNf = undefined;
    }
  }
  SetIsVisibleInFormation(t) {
    if (this.fNf) {
      this.fNf.SetIsVisibleInFormation(t);
    } else {
      this.gNf = t;
    }
  }
  SetIsVisibleInRoleSystem(t) {
    this.fNf?.SetIsVisibleInRoleSystem(t);
  }
  SetActivatedTrialRoleId(t) {
    var e = this.fNf;
    this.mNf = ConfigManager_1.ConfigManager.TrialRoleConfig?.GetTrialRoleConfig(t);
    this.fNf = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(t);
    if (e && e !== this.fNf) {
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
    return this.mNf?.WorldLevel ?? 0;
  }
  GetNextWorldLevel() {
    if (!this.oOf) {
      return -1;
    }
    let t = this.oOf.findIndex(t => t.Id === this.TrialRoleId) ?? -1;
    if (t >= 0 && t + 1 < this.oOf.length) {
      return t = this.oOf[t + 1].WorldLevel;
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
    for (const i of this.oOf) {
      if (i.WorldLevel > t) {
        break;
      }
      e = i.Id;
    }
    return e;
  }
  SetActivatedRoleAttr(t, e) {
    if (this.fNf) {
      var i = this.fNf.GetAttributeData();
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
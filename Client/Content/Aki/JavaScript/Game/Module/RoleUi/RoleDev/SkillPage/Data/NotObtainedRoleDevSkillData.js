"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotObtainedRoleDevSkillData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const RoleDevUtils_1 = require("../../RoleDevUtils");
const RoleDevSkillViewItemDataBase_1 = require("./RoleDevSkillViewItemDataBase");
class NotObtainedRoleDevSkillData extends RoleDevSkillViewItemDataBase_1.RoleDevSkillViewItemDataBase {
  constructor() {
    super(...arguments);
    this.H1d = [];
    this.G1d = [];
    this.C1d = [];
    this.N1d = [];
    this.j1d = [];
    this.B9d = undefined;
  }
  InitByRoleType(e, t) {
    this.B9d = t;
    this.n3d(e);
  }
  n3d(t) {
    var e = RoleDevUtils_1.RoleDevUtils.GetCultivateProject(t);
    var i = e.NormalSkillLevel || [];
    var r = e.PrefectSkillLevel || [];
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
    var e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeListByGroupId(e.SkillTreeGroupId);
    var s = this.Qhd(e ?? []);
    var l = [];
    var a = [];
    for (const u of s) {
      var n = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillMaxLevelBySkillNodeId(u.Id);
      l.push(1);
      a.push(n);
    }
    var o = [];
    for (let e = 0; e < s.length; e++) {
      var h = s[e];
      var h = {
        RoleId: t,
        SkillNodeId: h.Id,
        IconId: h.Id,
        CurrentLevel: l[e],
        MaxLevel: a[e],
        NormalTargetLevel: i[e],
        PerfectTargetLevel: r[e],
        SkillType: e + 1,
        IsReached: l[e] >= (this.GetIsPerfectPlan() ? r : i)[e],
        NodeIndex: e
      };
      o.push(h);
    }
    var e = this.$1d(s, l, i, t);
    var v = this.$1d(s, l, r, t);
    this.H1d = o;
    this.G1d = i;
    this.N1d = r;
    this.C1d = e;
    this.j1d = v;
  }
  GetIsRoleOwned() {
    return false;
  }
  GetIsPerfectPlan() {
    return this.B9d?.GetCurrentRoleSkillPlanState(this.RoleId) ?? false;
  }
  GetIsNormalPlanFinished() {
    return this.kCd(this.H1d.map(e => e.CurrentLevel), this.G1d);
  }
  GetIsPerfectPlanFinished() {
    return this.kCd(this.H1d.map(e => e.CurrentLevel), this.N1d);
  }
  GetSkillSlots() {
    return this.H1d;
  }
  GetSkillGoalUpgradeLevel() {
    return this.G1d;
  }
  GetDetailItems() {
    return this.C1d;
  }
  GetIsAllMaterialEnough() {
    return RoleDevUtils_1.RoleDevUtils.CheckAllItemsUp(this.C1d);
  }
  GetIsUnlockedPerfect() {
    return this.N1d.length > 0;
  }
  GetPerfectGoalUpgradeLevel() {
    return this.N1d;
  }
  GetPerfectDetailItems() {
    return this.j1d;
  }
  GetIsPerfectMaterialEnough() {
    return RoleDevUtils_1.RoleDevUtils.CheckAllItemsUp(this.j1d);
  }
  GetIsBreakthroughLevelLow() {
    return false;
  }
  GetIsHideMaterialList() {
    return false;
  }
  GetIsForecast() {
    return false;
  }
  GetShouldForcePerfectPlan() {
    return false;
  }
  SwitchPlan() {
    var e = this.GetIsPerfectPlan();
    this.B9d?.SetCurrentRoleSkillPlanState(this.RoleId, !e);
    this.OCd();
  }
  OCd() {
    for (const i of this.H1d) {
      var e = this.G1d[i.NodeIndex];
      var t = this.N1d[i.NodeIndex];
      i.NormalTargetLevel = e;
      i.PerfectTargetLevel = t;
      i.IsReached = i.CurrentLevel >= (this.GetIsPerfectPlan() ? t : e);
    }
  }
  kCd(e, i) {
    return i.length !== 0 && e.length === i.length && e.every((e, t) => e >= i[t]);
  }
  Qhd(e) {
    var t = [];
    var i = e.filter(e => e.NodeType === 2).sort((e, t) => e.Coordinate - t.Coordinate);
    for (let e = 0; e < Math.min(4, i.length); e++) {
      t.push(i[e]);
    }
    var r = e.find(e => e.NodeType === 1);
    if (r) {
      t.push(r);
    }
    var r = e.filter(e => e.NodeType === 3);
    t.push(...r);
    var r = e.filter(e => e.NodeType === 4);
    t.push(...r);
    return t;
  }
  $1d(e, t, i, r) {
    return RoleDevUtils_1.RoleDevUtils.CreateSkillDetailItemsData(e, t, i, r);
  }
}
exports.NotObtainedRoleDevSkillData = NotObtainedRoleDevSkillData;
//# sourceMappingURL=NotObtainedRoleDevSkillData.js.map
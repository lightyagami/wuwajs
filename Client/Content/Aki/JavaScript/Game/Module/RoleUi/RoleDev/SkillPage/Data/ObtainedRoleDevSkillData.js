"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObtainedRoleDevSkillData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleDevUtils_1 = require("../../RoleDevUtils");
const RoleDevSkillViewItemDataBase_1 = require("./RoleDevSkillViewItemDataBase");
class ObtainedRoleDevSkillData extends RoleDevSkillViewItemDataBase_1.RoleDevSkillViewItemDataBase {
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
    var r = e.NormalSkillLevel || [];
    var i = e.PrefectSkillLevel || [];
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
    var e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeListByGroupId(e.SkillTreeGroupId);
    var a = this.Qhd(e ?? []);
    var s = [];
    var l = [];
    for (const d of a) {
      var n = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(t, d.Id);
      var o = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillMaxLevelBySkillNodeId(d.Id);
      s.push(n);
      l.push(o);
    }
    var h = [];
    for (let e = 0; e < a.length; e++) {
      var v = a[e];
      var v = {
        RoleId: t,
        SkillNodeId: v.Id,
        IconId: v.Id,
        CurrentLevel: s[e],
        MaxLevel: l[e],
        NormalTargetLevel: r[e],
        PerfectTargetLevel: i[e],
        SkillType: e + 1,
        IsReached: s[e] >= (this.GetIsPerfectPlan() ? i : r)[e],
        NodeIndex: e
      };
      h.push(v);
    }
    var e = this.$1d(a, s, r, t);
    var u = this.$1d(a, s, i, t);
    this.H1d = h;
    this.G1d = r;
    this.N1d = i;
    this.C1d = e;
    this.j1d = u;
    this.HPd();
  }
  GetIsRoleOwned() {
    return true;
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
    var e = ModelManager_1.ModelManager.FunctionModel?.GetPlayerLevel();
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.RoleId).MaxLevel;
    return this.N1d.length > 0 && e !== undefined && t !== undefined && t <= e;
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
    const r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.RoleId).GetLevelData().GetBreachLevel();
    return this.H1d.some((e, t) => e.CurrentLevel >= this.G1d[t] && r < 6);
  }
  GetIsHideMaterialList() {
    return false;
  }
  GetIsForecast() {
    return false;
  }
  GetShouldForcePerfectPlan() {
    if (this.H1d.length === 0) {
      return false;
    }
    for (const e of this.H1d) {
      if (e.CurrentLevel <= e.NormalTargetLevel) {
        return false;
      }
    }
    return true;
  }
  SwitchPlan() {
    var e = this.GetIsPerfectPlan();
    this.B9d?.SetCurrentRoleSkillPlanState(this.RoleId, !e);
    this.OCd();
  }
  OCd() {
    for (const r of this.H1d) {
      var e = this.G1d[r.NodeIndex];
      var t = this.N1d[r.NodeIndex];
      r.NormalTargetLevel = e;
      r.PerfectTargetLevel = t;
      r.IsReached = r.CurrentLevel >= (this.GetIsPerfectPlan() ? t : e);
    }
  }
  HPd() {}
  kCd(e, r) {
    return r.length !== 0 && e.length === r.length && e.every((e, t) => e >= r[t]);
  }
  Qhd(e) {
    var t = [];
    var r = e.filter(e => e.NodeType === 2).sort((e, t) => e.Coordinate - t.Coordinate);
    for (let e = 0; e < Math.min(4, r.length); e++) {
      t.push(r[e]);
    }
    var i = e.find(e => e.NodeType === 1);
    if (i) {
      t.push(i);
    }
    var i = e.filter(e => e.NodeType === 3);
    t.push(...i);
    var i = e.filter(e => e.NodeType === 4);
    t.push(...i);
    return t;
  }
  $1d(e, t, r, i) {
    return RoleDevUtils_1.RoleDevUtils.CreateSkillDetailItemsData(e, t, r, i);
  }
}
exports.ObtainedRoleDevSkillData = ObtainedRoleDevSkillData;
//# sourceMappingURL=ObtainedRoleDevSkillData.js.map
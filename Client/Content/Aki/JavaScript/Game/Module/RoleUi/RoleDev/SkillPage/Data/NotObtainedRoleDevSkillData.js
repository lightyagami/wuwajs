"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotObtainedRoleDevSkillData = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
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
    var r = e.NormalSkillLevel || [];
    var i = e.PrefectSkillLevel || [];
    var l = ConfigManager_1.ConfigManager.RoleDevConfig.GetCanLevelUpSkillNodeIndexList();
    if (l.length !== r.length || l.length !== i.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 43, "LevelUpSkillNodeIndexList长度与NormalSkillLevel或PrefectSkillLevel长度不一致");
      }
    } else {
      var a = [];
      var s = [];
      var o = [];
      var n = [];
      var h = [];
      var v = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
      for (let e = 0; e < l.length; e++) {
        var u = l[e];
        var u = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeByGroupIdAndIndex(v.SkillTreeGroupId, u).Id;
        h.push(u);
        n.push(u);
        a.push(1);
        s.push(r[e]);
        o.push(i[e]);
      }
      e = e?.SkillTreeConfigArray;
      if (e) {
        for (const _ of e) {
          var g = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeByGroupIdAndIndex(v.SkillTreeGroupId, _).Id;
          n.push(g);
          a.push(0);
          s.push(1);
          o.push(1);
        }
      }
      var I = [];
      for (let e = 0; e < h.length; e++) {
        var d = {
          RoleId: t,
          SkillNodeId: h[e],
          IconId: h[e],
          CurrentLevel: a[e],
          NormalTargetLevel: s[e],
          PerfectTargetLevel: o[e],
          SkillType: e + 1,
          NodeIndex: e
        };
        I.push(d);
      }
      var e = this.$1d(n, a, s, t);
      var f = this.$1d(n, a, o, t);
      this.H1d = I;
      this.G1d = s;
      this.N1d = o;
      this.C1d = e;
      this.j1d = f;
    }
  }
  GetIsRoleOwned() {
    return false;
  }
  GetIsPerfectPlan() {
    return this.B9d?.GetRoleSkillPlanState(this.RoleId) ?? false;
  }
  GetIsNormalPlanFinished() {
    return false;
  }
  GetIsPerfectPlanFinished() {
    return false;
  }
  GetSkillSlots() {
    return this.H1d;
  }
  GetSkillGoalUpgradeLevel() {
    return this.G1d;
  }
  GetNormalDetailItems() {
    return this.C1d;
  }
  GetIsNormalAllMaterialEnough() {
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
    this.B9d?.SetRoleSkillPlanState(this.RoleId, !e);
    this.OCd();
  }
  OCd() {
    for (const r of this.H1d) {
      var e = this.G1d[r.NodeIndex];
      var t = this.N1d[r.NodeIndex];
      r.NormalTargetLevel = e;
      r.PerfectTargetLevel = t;
    }
  }
  $1d(e, t, r, i) {
    return RoleDevUtils_1.RoleDevUtils.CreateSkillDetailItemsData(e, t, r, i);
  }
}
exports.NotObtainedRoleDevSkillData = NotObtainedRoleDevSkillData;
//# sourceMappingURL=NotObtainedRoleDevSkillData.js.map
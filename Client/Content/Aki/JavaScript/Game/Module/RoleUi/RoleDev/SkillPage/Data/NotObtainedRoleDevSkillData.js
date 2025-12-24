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
    this.Y1d = [];
    this.$1d = [];
    this.E1d = [];
    this.Q1d = [];
    this.X1d = [];
    this.him = undefined;
  }
  InitByRoleType(e, t) {
    this.him = t;
    this.l9d(e);
  }
  l9d(t) {
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
      var e = this.z1d(n, a, s, t);
      var f = this.z1d(n, a, o, t);
      this.Y1d = I;
      this.$1d = s;
      this.Q1d = o;
      this.E1d = e;
      this.X1d = f;
    }
  }
  GetIsRoleOwned() {
    return false;
  }
  GetIsPerfectPlan() {
    return this.him?.GetRoleSkillPlanState(this.RoleId) ?? false;
  }
  GetIsNormalPlanFinished() {
    return false;
  }
  GetIsPerfectPlanFinished() {
    return false;
  }
  GetSkillSlots() {
    return this.Y1d;
  }
  GetSkillGoalUpgradeLevel() {
    return this.$1d;
  }
  GetNormalDetailItems() {
    return this.E1d;
  }
  GetIsNormalAllMaterialEnough() {
    return RoleDevUtils_1.RoleDevUtils.CheckAllItemsUp(this.E1d);
  }
  GetIsUnlockedPerfect() {
    return this.Q1d.length > 0;
  }
  GetPerfectGoalUpgradeLevel() {
    return this.Q1d;
  }
  GetPerfectDetailItems() {
    return this.X1d;
  }
  GetIsPerfectMaterialEnough() {
    return RoleDevUtils_1.RoleDevUtils.CheckAllItemsUp(this.X1d);
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
    this.him?.SetRoleSkillPlanState(this.RoleId, !e);
    this.oyd();
  }
  oyd() {
    for (const r of this.Y1d) {
      var e = this.$1d[r.NodeIndex];
      var t = this.Q1d[r.NodeIndex];
      r.NormalTargetLevel = e;
      r.PerfectTargetLevel = t;
    }
  }
  z1d(e, t, r, i) {
    return RoleDevUtils_1.RoleDevUtils.CreateSkillDetailItemsData(e, t, r, i);
  }
}
exports.NotObtainedRoleDevSkillData = NotObtainedRoleDevSkillData;
//# sourceMappingURL=NotObtainedRoleDevSkillData.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObtainedRoleDevSkillData = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleDevUtils_1 = require("../../RoleDevUtils");
const RoleDevSkillViewItemDataBase_1 = require("./RoleDevSkillViewItemDataBase");
class ObtainedRoleDevSkillData extends RoleDevSkillViewItemDataBase_1.RoleDevSkillViewItemDataBase {
  constructor() {
    super(...arguments);
    this.Y1d = [];
    this.Mgm = [];
    this.Egm = [];
    this.E1d = [];
    this.Igm = [];
    this.X1d = [];
    this.PZd = undefined;
  }
  InitByRoleType(e, t) {
    this.PZd = t;
    this.l9d(e);
  }
  l9d(t) {
    var e = RoleDevUtils_1.RoleDevUtils.GetCultivateProject(t);
    var r = e.NormalSkillLevel || [];
    var i = e.PrefectSkillLevel || [];
    var a = ConfigManager_1.ConfigManager.RoleDevConfig.GetCanLevelUpSkillNodeIndexList();
    if (a.length !== r.length || a.length !== i.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 43, "LevelUpSkillNodeIndexList长度与NormalSkillLevel或PrefectSkillLevel长度不一致");
      }
    } else {
      var l = [];
      var s = [];
      var o = [];
      var n = [];
      var h = [];
      var v = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
      for (let e = 0; e < a.length; e++) {
        var g = a[e];
        var g = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeByGroupIdAndIndex(v.SkillTreeGroupId, g).Id;
        h.push(g);
        n.push(g);
        l.push(ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(t, g));
        s.push(r[e]);
        o.push(i[e]);
      }
      e = e?.SkillTreeConfigArray;
      if (e) {
        for (const c of e) {
          var d = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeByGroupIdAndIndex(v.SkillTreeGroupId, c).Id;
          n.push(d);
          l.push(ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(t, d));
          s.push(1);
          o.push(1);
        }
      }
      var u = [];
      for (let e = 0; e < h.length; e++) {
        var _ = {
          RoleId: t,
          SkillNodeId: h[e],
          IconId: h[e],
          CurrentLevel: l[e],
          NormalTargetLevel: s[e],
          PerfectTargetLevel: o[e],
          SkillType: e + 1,
          NodeIndex: e
        };
        u.push(_);
      }
      var e = this.z1d(n, l, s, t);
      var M = this.z1d(n, l, o, t);
      this.Y1d = u;
      this.Egm = s;
      this.Igm = o;
      this.E1d = e;
      this.X1d = M;
      this.Mgm = n;
      if (!this.PZd?.CheckRoleIdIsCreated(t)) {
        this.PZd?.SetRoleSkillPlanState(t, this.IsNormalPlanFinished);
      }
    }
  }
  GetIsRoleOwned() {
    return true;
  }
  GetIsPerfectPlan() {
    return this.PZd?.GetRoleSkillPlanState(this.RoleId) ?? false;
  }
  GetIsNormalPlanFinished() {
    return this.ryd(this.Mgm.map(e => ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(this.RoleId, e)), this.Egm);
  }
  GetIsPerfectPlanFinished() {
    return this.ryd(this.Mgm.map(e => ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(this.RoleId, e)), this.Igm);
  }
  GetSkillSlots() {
    return this.Y1d;
  }
  GetSkillGoalUpgradeLevel() {
    return this.Egm;
  }
  GetNormalDetailItems() {
    return this.E1d;
  }
  GetIsNormalAllMaterialEnough() {
    return RoleDevUtils_1.RoleDevUtils.CheckAllItemsUp(this.E1d);
  }
  GetIsUnlockedPerfect() {
    var e = ModelManager_1.ModelManager.FunctionModel?.GetPlayerLevel();
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.RoleId).MaxLevel;
    return this.Igm.length > 0 && e !== undefined && t !== undefined && t <= e;
  }
  GetPerfectGoalUpgradeLevel() {
    return this.Igm;
  }
  GetPerfectDetailItems() {
    return this.X1d;
  }
  GetIsPerfectMaterialEnough() {
    return RoleDevUtils_1.RoleDevUtils.CheckAllItemsUp(this.X1d);
  }
  GetIsBreakthroughLevelLow() {
    const r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.RoleId).GetLevelData().GetBreachLevel();
    return this.Y1d.some((e, t) => e.CurrentLevel >= this.Egm[t] && r < 6);
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
    this.PZd?.SetRoleSkillPlanState(this.RoleId, !e);
    this.oyd();
  }
  oyd() {
    for (const r of this.Y1d) {
      var e = this.Egm[r.NodeIndex];
      var t = this.Igm[r.NodeIndex];
      r.NormalTargetLevel = e;
      r.PerfectTargetLevel = t;
    }
  }
  ryd(e, r) {
    return r.length !== 0 && e.length === r.length && e.every((e, t) => e >= r[t]);
  }
  z1d(e, t, r, i) {
    return RoleDevUtils_1.RoleDevUtils.CreateSkillDetailItemsData(e, t, r, i);
  }
}
exports.ObtainedRoleDevSkillData = ObtainedRoleDevSkillData;
//# sourceMappingURL=ObtainedRoleDevSkillData.js.map
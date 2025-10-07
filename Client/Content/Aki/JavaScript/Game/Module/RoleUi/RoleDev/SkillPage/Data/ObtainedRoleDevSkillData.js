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
    this.H1d = [];
    this.nXd = [];
    this.sXd = [];
    this.C1d = [];
    this.aXd = [];
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
      var e = this.$1d(n, l, s, t);
      var M = this.$1d(n, l, o, t);
      this.H1d = u;
      this.sXd = s;
      this.aXd = o;
      this.C1d = e;
      this.j1d = M;
      this.nXd = n;
      if (!this.B9d?.CheckRoleIdIsCreated(t)) {
        this.B9d?.SetRoleSkillPlanState(t, this.IsNormalPlanFinished);
      }
    }
  }
  GetIsRoleOwned() {
    return true;
  }
  GetIsPerfectPlan() {
    return this.B9d?.GetRoleSkillPlanState(this.RoleId) ?? false;
  }
  GetIsNormalPlanFinished() {
    return this.kCd(this.nXd.map(e => ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(this.RoleId, e)), this.sXd);
  }
  GetIsPerfectPlanFinished() {
    return this.kCd(this.nXd.map(e => ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(this.RoleId, e)), this.aXd);
  }
  GetSkillSlots() {
    return this.H1d;
  }
  GetSkillGoalUpgradeLevel() {
    return this.sXd;
  }
  GetNormalDetailItems() {
    return this.C1d;
  }
  GetIsNormalAllMaterialEnough() {
    return RoleDevUtils_1.RoleDevUtils.CheckAllItemsUp(this.C1d);
  }
  GetIsUnlockedPerfect() {
    var e = ModelManager_1.ModelManager.FunctionModel?.GetPlayerLevel();
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.RoleId).MaxLevel;
    return this.aXd.length > 0 && e !== undefined && t !== undefined && t <= e;
  }
  GetPerfectGoalUpgradeLevel() {
    return this.aXd;
  }
  GetPerfectDetailItems() {
    return this.j1d;
  }
  GetIsPerfectMaterialEnough() {
    return RoleDevUtils_1.RoleDevUtils.CheckAllItemsUp(this.j1d);
  }
  GetIsBreakthroughLevelLow() {
    const r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.RoleId).GetLevelData().GetBreachLevel();
    return this.H1d.some((e, t) => e.CurrentLevel >= this.sXd[t] && r < 6);
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
      var e = this.sXd[r.NodeIndex];
      var t = this.aXd[r.NodeIndex];
      r.NormalTargetLevel = e;
      r.PerfectTargetLevel = t;
    }
  }
  kCd(e, r) {
    return r.length !== 0 && e.length === r.length && e.every((e, t) => e >= r[t]);
  }
  $1d(e, t, r, i) {
    return RoleDevUtils_1.RoleDevUtils.CreateSkillDetailItemsData(e, t, r, i);
  }
}
exports.ObtainedRoleDevSkillData = ObtainedRoleDevSkillData;
//# sourceMappingURL=ObtainedRoleDevSkillData.js.map
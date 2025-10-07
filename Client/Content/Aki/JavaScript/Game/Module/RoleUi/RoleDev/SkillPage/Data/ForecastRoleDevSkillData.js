"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForecastRoleDevSkillData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const RoleDevUtils_1 = require("../../RoleDevUtils");
const RoleDevSkillViewItemDataBase_1 = require("./RoleDevSkillViewItemDataBase");
class ForecastRoleDevSkillData extends RoleDevSkillViewItemDataBase_1.RoleDevSkillViewItemDataBase {
  constructor() {
    super(...arguments);
    this.H1d = [];
    this.C1d = [];
    this.j1d = [];
    this.B9d = undefined;
  }
  InitByRoleType(e, t) {
    this.B9d = t;
    this.n3d(e);
  }
  n3d(t) {
    var e = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(t);
    if (e) {
      var r = [];
      for (let e = 0; e < 5; e++) {
        r.push({
          RoleId: t,
          SkillNodeId: 0,
          IconId: 0,
          CurrentLevel: 1,
          NormalTargetLevel: 10,
          PerfectTargetLevel: 10,
          SkillType: e + 1,
          NodeIndex: e
        });
      }
      var l = [];
      var e = e.SkillItemGroup;
      if (e && Array.isArray(e) && e.length > 0) {
        for (const v of e) {
          var a = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsRoleItemConfig(v);
          if (a && Array.isArray(a.ItemGroup)) {
            var i = [];
            for (const c of a.ItemGroup) {
              var s = c.Item1;
              var o = c.Item2;
              i.push({
                ItemId: s,
                RequiredCount: o
              });
            }
            if (i.length > 0) {
              var n = [];
              var u = [];
              for (const h of i) {
                u.push(h);
              }
              n.push({
                Type: a.ItemTypeId,
                Materials: u
              });
              a = RoleDevUtils_1.RoleDevUtils.BuildDetailItemData(t, n, 4);
              l.push(...a);
            }
          }
        }
      }
      this.H1d = r;
      this.C1d = l;
      this.j1d = l;
    }
  }
  GetIsRoleOwned() {
    return false;
  }
  GetIsPerfectPlan() {
    return this.B9d?.GetRoleSkillPlanState(this.RoleId) ?? true;
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
    return new Array(5).fill(10);
  }
  GetNormalDetailItems() {
    return this.C1d;
  }
  GetIsNormalAllMaterialEnough() {
    return RoleDevUtils_1.RoleDevUtils.CheckAllItemsUp(this.C1d);
  }
  GetIsUnlockedPerfect() {
    return true;
  }
  GetPerfectGoalUpgradeLevel() {
    return new Array(5).fill(10);
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
    return true;
  }
  GetShouldForcePerfectPlan() {
    return true;
  }
  SwitchPlan() {}
}
exports.ForecastRoleDevSkillData = ForecastRoleDevSkillData;
//# sourceMappingURL=ForecastRoleDevSkillData.js.map
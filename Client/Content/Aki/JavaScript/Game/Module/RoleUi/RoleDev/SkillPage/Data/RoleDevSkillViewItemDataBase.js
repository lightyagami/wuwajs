"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevSkillViewItemDataBase = undefined;
class RoleDevSkillViewItemDataBase {
  constructor() {
    this.RoleIdInternal = 0;
    this.RoleTypeInternal = 0;
  }
  InitByRoleId(t, e, r) {
    this.RoleIdInternal = t;
    this.RoleTypeInternal = e;
    this.InitByRoleType(t, r);
  }
  get RoleId() {
    return this.RoleIdInternal;
  }
  get RoleType() {
    return this.RoleTypeInternal;
  }
  get IsRoleOwned() {
    return this.GetIsRoleOwned();
  }
  get IsPerfectPlan() {
    return this.GetIsPerfectPlan();
  }
  get IsNormalPlanFinished() {
    return this.GetIsNormalPlanFinished();
  }
  get IsPerfectPlanFinished() {
    return this.GetIsPerfectPlanFinished();
  }
  get SkillSlots() {
    return this.GetSkillSlots();
  }
  get SkillGoalUpgradeLevel() {
    return this.GetSkillGoalUpgradeLevel();
  }
  get DetailItems() {
    return this.GetDetailItems();
  }
  get IsAllMaterialEnough() {
    return this.GetIsAllMaterialEnough();
  }
  get IsUnlockedPerfect() {
    return this.GetIsUnlockedPerfect();
  }
  get PerfectGoalUpgradeLevel() {
    return this.GetPerfectGoalUpgradeLevel();
  }
  get PerfectDetailItems() {
    return this.GetPerfectDetailItems();
  }
  get IsPerfectMaterialEnough() {
    return this.GetIsPerfectMaterialEnough();
  }
  get IsBreakthroughLevelLow() {
    return this.GetIsBreakthroughLevelLow();
  }
  get IsHideMaterialList() {
    return this.GetIsHideMaterialList();
  }
  get IsForecast() {
    return this.GetIsForecast();
  }
  get ShouldForcePerfectPlan() {
    return this.GetShouldForcePerfectPlan();
  }
  get CurrentPlanMaterialEnough() {
    if (this.IsPerfectPlan) {
      return this.IsPerfectMaterialEnough;
    } else {
      return this.IsAllMaterialEnough;
    }
  }
  get IsRoleObtained() {
    return this.RoleType === 0;
  }
  GetJumpTarget() {
    if (this.IsRoleOwned) {
      return 1;
    } else {
      return 2;
    }
  }
  GetButtonState() {
    return {
      Text: this.IsRoleOwned ? "RoleProject_Button01" : "RoleProject_Button02",
      IsHighlight: this.IsRoleOwned && (this.IsPerfectPlan ? this.IsPerfectMaterialEnough : this.IsAllMaterialEnough)
    };
  }
  GetPlanSwitchButtonState() {
    return {
      IsShow: this.PerfectGoalUpgradeLevel.length > 0,
      Text: this.IsPerfectPlan ? "RoleProject_Button_SkillUpgradeBasic" : "RoleProject_Button_SkillUpgradePrefect",
      IsHighlight: !this.IsPerfectPlan && this.IsNormalPlanFinished && !this.IsPerfectPlanFinished
    };
  }
  SwitchPlan() {
    throw new Error("SwitchPlan must be implemented by subclass");
  }
}
exports.RoleDevSkillViewItemDataBase = RoleDevSkillViewItemDataBase;
//# sourceMappingURL=RoleDevSkillViewItemDataBase.js.map
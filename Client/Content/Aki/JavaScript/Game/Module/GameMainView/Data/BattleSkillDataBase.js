"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSkillDataBase = undefined;
const InputEnums_1 = require("../../../Input/InputEnums");
class BattleSkillDataBase {
  constructor() {
    this.ZMe = "";
    this.npo = false;
    this.IsExploreAsFight = false;
    this.AttributeId = 0;
    this.MaxAttributeId = 0;
    this.IsShowLongPressInternal = false;
    this.LongPressDuration = 0;
    this.IsConfigShowLongPress = false;
    this.IsVisibleInternal = true;
    this.IsLimitCountCustom = false;
    this.RemainingCountCustom = 0;
    this.TotalCoolDownCustom = 0;
    this.HideCoolDownTextCustom = false;
    this.IsLimitCountVehicleSkill = false;
    this.RemainingCountVehicleSkill = 0;
  }
  InitData(t) {
    this.ZMe = t;
    this.OnInitData();
  }
  OnInitData() {}
  GetActionType() {
    return InputEnums_1.EInputAction.None;
  }
  GetInputAction() {
    return this.GetActionName();
  }
  IsEnableInput() {
    return true;
  }
  GetLongPressTime() {
    return 0;
  }
  RefreshLongPressTime() {}
  GetIsLongPressControlCamera() {
    return false;
  }
  GetActionName() {
    return this.ZMe;
  }
  IsMultiStageSkill() {
    return false;
  }
  GetMultiSkillTexturePath() {
    return "";
  }
  GetSkillTexturePath() {
    return "";
  }
  GetSkillId() {
    return 0;
  }
  GetSkillIconName() {
    return "";
  }
  GetMultiSkillInfo() {}
  GetGroupSkillCdInfo() {}
  HasCdComponent() {
    return false;
  }
  GetSkillRemainingCoolDown() {
    return 0;
  }
  IsCdVisible() {
    return false;
  }
  RefreshIsEnable() {}
  IsVehicleSkillInCd() {
    return false;
  }
  GetRemainingCoolDownCustom() {
    return 0;
  }
  GetAttribute() {
    return 0;
  }
  GetMaxAttribute() {
    return 0;
  }
  GetButtonType() {
    return 0;
  }
  IsSkillInItemUseCd() {
    return false;
  }
  IsEquippedItemBanReqUse() {
    return false;
  }
  IsSkillInItemUseBuffCd() {
    return false;
  }
  GetEquippedItemUsingBuffCd() {
    return [0, 0];
  }
  IsSkillInItemUseSkillCd() {
    return false;
  }
  GetEquippedItemUsingSkillCd() {
    return [0, 0];
  }
  GetVehicleSkillCd() {
    return [0, 0];
  }
  GetExploreSkillChange() {
    return this.npo;
  }
  SetExploreSkillChange(t) {
    this.npo = t;
  }
  GetMaxAttributeEffectPath() {
    return "";
  }
  GetMaxAttributeColor() {}
  GetDynamicEffectConfig() {}
  GetCdCompletedEffectId() {
    return 0;
  }
  GetCdCompletedEffectConfig() {}
  HasConfigFollower() {
    return false;
  }
  GetFrameSpriteColor() {}
  HasAttribute() {
    return this.AttributeId !== 0 && this.MaxAttributeId !== 0;
  }
  IsEnable() {
    return true;
  }
  InitVehicleHandle() {}
  IsShowLongPress() {
    return this.IsShowLongPressInternal;
  }
  RefreshIsShowLongPress() {}
  RefreshLongPressDuration() {}
  GetLongPressDuration() {
    return this.LongPressDuration;
  }
  GetIsLongPressing() {
    return false;
  }
  GetIsConfigShowLongPress() {
    return this.IsConfigShowLongPress;
  }
  SetIsConfigShowLongPress(t) {
    this.IsConfigShowLongPress = t;
  }
  IsVisible() {
    return this.IsVisibleInternal;
  }
  GetMaxAttributeBurstEffectId() {
    return 0;
  }
  GetMaxAttributeBurstEffectConfig() {}
  IsEnableLongPress() {
    return false;
  }
  GetFormationData() {}
  IsSkillIdChangeByTag() {
    return false;
  }
}
exports.BattleSkillDataBase = BattleSkillDataBase;
//# sourceMappingURL=BattleSkillDataBase.js.map
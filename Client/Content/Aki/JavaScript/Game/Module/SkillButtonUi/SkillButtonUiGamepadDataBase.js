"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillButtonUiGamepadDataBase = undefined;
const GamepadSwitchInteractData_1 = require("./GamepadSwitchInteractData");
class SkillButtonUiGamepadDataBase {
  constructor() {
    this.GamepadDataType = 0;
    this.ButtonKeyList = [];
    this.NoneIcon = "";
    this.CurButtonTypeList = [];
    this.LastButtonTypeList = [];
    this.CombineButtonKey = "";
    this.MainSkillButtonTypeList = [];
    this.MainSkillCombineButtonTypeList = [];
    this.DpadSkillButtonTypeList = [];
    this.DpadSkillCombineButtonTypeList = [];
    this.SubSkillButtonTypeList = [];
    this.SubSkillCombineButtonTypeList = [];
    this.SubAimSkillButtonTypeList = [];
    this.ControlCameraByMoveAxis = false;
    this.RouletteKey = undefined;
    this.RouletteMainKey = undefined;
    this.RouletteSecondKey = undefined;
    this.SwitchInteractData = new GamepadSwitchInteractData_1.GamepadSwitchInteractData();
  }
  Init() {}
  Clear() {}
  GetAllActionNameList() {
    return [];
  }
  GetAllAxisNameList() {
    return [];
  }
  RefreshBaseConfigByUserSetting() {}
  RefreshSwitchInteractOpen(t = false) {
    this.SwitchInteractData.RefreshSwitchInteractOpen(t);
  }
  RefreshButtonData() {
    return false;
  }
  GetButtonTypeByActionName(t) {
    return 0;
  }
  GetButtonTypeByAxisName(t, e) {
    return 0;
  }
  IsAim() {
    return false;
  }
  SetIsPressCombineButton(t) {}
  GetIsPressCombineButton() {
    return false;
  }
  RefreshSkillButtonData(t) {}
  RefreshAimState() {
    return false;
  }
  RefreshInteractBehaviorData() {}
  OnActionKeyChanged(t) {}
  AddChangeKeyReason(t) {}
  RemoveChangeKeyReason(t) {}
  AddAllowChangeKeyReason(t) {}
  RemoveAllowChangeKeyReason(t) {}
  CacheInputAxis(t, e) {}
  GetInputAxis(t) {
    return 0;
  }
  ClearInputAxis() {}
}
exports.SkillButtonUiGamepadDataBase = SkillButtonUiGamepadDataBase;
//# sourceMappingURL=SkillButtonUiGamepadDataBase.js.map
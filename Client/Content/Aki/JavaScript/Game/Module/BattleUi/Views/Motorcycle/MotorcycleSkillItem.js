"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleSkillItem = undefined;
const InputController_1 = require("../../../../Input/InputController");
const InputEnums_1 = require("../../../../Input/InputEnums");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const BattleSkillItem_1 = require("../BattleSkillItem");
class MotorcycleSkillItem extends BattleSkillItem_1.BattleSkillItem {
  constructor() {
    super(...arguments);
    this.wut = false;
    this.jce = 0;
  }
  Refresh(t) {
    if (t) {
      if (t.GetButtonType() === 201) {
        this.jce = 1;
      } else if (t.GetButtonType() === 202) {
        this.jce = -1;
      } else {
        this.jce = 0;
      }
    } else {
      this.jce = 0;
    }
    super.Refresh(t);
  }
  RefreshSkillIconByResId(t) {
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetSkillIcon(t);
  }
  OnSkillButtonPressed() {
    if (this.jce === 0) {
      super.OnSkillButtonPressed();
    } else {
      this.wut = true;
      this.ClickEffect?.Play();
      InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, this.jce);
    }
  }
  OnSkillButtonReleased() {
    if (this.jce === 0) {
      super.OnSkillButtonReleased();
    } else {
      this.wut = false;
      InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, 0);
    }
  }
  Tick(t) {
    super.Tick(t);
    if (this.wut) {
      InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, this.jce);
    }
  }
  OnBeforeHide() {
    super.OnBeforeHide();
    this.wut = false;
  }
  OnInputAction() {
    if (this.jce === 0) {
      super.OnInputAction();
    } else {
      this.ClickEffect?.Play();
    }
  }
}
exports.MotorcycleSkillItem = MotorcycleSkillItem;
//# sourceMappingURL=MotorcycleSkillItem.js.map
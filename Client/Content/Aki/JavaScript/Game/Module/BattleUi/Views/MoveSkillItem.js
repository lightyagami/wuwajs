"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveSkillItem = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const InputController_1 = require("../../../Input/InputController");
const InputEnums_1 = require("../../../Input/InputEnums");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const BattleSkillItem_1 = require("./BattleSkillItem");
class MoveSkillItem extends BattleSkillItem_1.BattleSkillItem {
  constructor() {
    super(...arguments);
    this.wut = false;
    this.$ct = InputEnums_1.EInputAxis.None;
    this.jce = 0;
    this.hgu = 0;
    this.KGu = true;
  }
  RefreshByMoveType(t, e, i = true) {
    this.$ct = t;
    this.jce = e;
    this.KGu = i;
    if (!this.IsShowOrShowing) {
      this.Show();
    }
  }
  RefreshKeyByActionName(t) {
    var e = Info_1.Info.OperationType;
    if (e === 2 && (this.KeyActionName !== t || this.KeyOperationType !== e)) {
      if (this.KeyItem) {
        this.KeyItem.RefreshByActionOrAxis({
          ActionOrAxisName: t
        });
        this.KeyItem.SetActive(true);
      }
      this.KeyOperationType = e;
      this.KeyActionName = t;
    }
  }
  RefreshSkillIconByResId(t) {
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetSkillIcon(t);
  }
  OnSkillButtonPressed() {
    this.wut = true;
    this.ClickEffect?.Play();
    InputController_1.InputController.InputAxis(this.$ct, this.jce, this.KGu);
  }
  OnSkillButtonReleased() {
    this.wut = false;
    InputController_1.InputController.InputAxis(this.$ct, 0, this.KGu);
  }
  Tick(t) {
    super.Tick(t);
    if (this.wut && this.KGu) {
      InputController_1.InputController.InputAxis(this.$ct, this.jce);
    }
  }
  OnBeforeHide() {
    this.wut = false;
  }
  OnInputAction() {
    this.ClickEffect?.Play();
  }
  SetCustomDynamicEffectId(t) {
    this.hgu = t;
    this.RefreshDynamicEffect();
  }
  GetDynamicEffectConfig() {
    if (this.hgu !== 0) {
      return ConfigManager_1.ConfigManager.SkillButtonConfig.GetSkillButtonEffectConfig(this.hgu);
    }
  }
  SetCustomSkillItemEnable(t) {
    this.SetSkillItemEnable(t, true);
  }
}
exports.MoveSkillItem = MoveSkillItem;
//# sourceMappingURL=MoveSkillItem.js.map
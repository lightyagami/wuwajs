"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoveSkillItem = void 0;
const Info_1 = require("../../../../Core/Common/Info"),
  InputController_1 = require("../../../Input/InputController"),
  InputEnums_1 = require("../../../Input/InputEnums"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  BattleSkillItem_1 = require("./BattleSkillItem");
class MoveSkillItem extends BattleSkillItem_1.BattleSkillItem {
  constructor() {
    super(...arguments), this.wut = !1, this.$ct = InputEnums_1.EInputAxis.None, this.jce = 0, this.Rhu = 0, this.zfu = !0
  }
  RefreshByMoveType(t, e, i = !0) {
    this.$ct = t, this.jce = e, this.zfu = i, this.IsShowOrShowing || this.Show()
  }
  RefreshKeyByActionName(t) {
    var e = Info_1.Info.OperationType;
    2 !== e || this.KeyActionName === t && this.KeyOperationType === e || (this.KeyItem && (this.KeyItem.RefreshByActionOrAxis({
      ActionOrAxisName: t
    }), this.KeyItem.SetActive(!0)), this.KeyOperationType = e, this.KeyActionName = t)
  }
  RefreshSkillIconByResId(t) {
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetSkillIcon(t)
  }
  OnSkillButtonPressed() {
    this.wut = !0, this.ClickEffect?.Play(), InputController_1.InputController.InputAxis(this.$ct, this.jce, this.zfu)
  }
  OnSkillButtonReleased() {
    this.wut = !1, InputController_1.InputController.InputAxis(this.$ct, 0, this.zfu)
  }
  Tick(t) {
    super.Tick(t), this.wut && this.zfu && InputController_1.InputController.InputAxis(this.$ct, this.jce)
  }
  OnBeforeHide() {
    this.wut = !1
  }
  OnInputAction() {
    this.ClickEffect?.Play()
  }
  SetCustomDynamicEffectId(t) {
    this.Rhu = t, this.RefreshDynamicEffect()
  }
  GetDynamicEffectConfig() {
    if (0 !== this.Rhu) return ConfigManager_1.ConfigManager.SkillButtonConfig.GetSkillButtonEffectConfig(this.Rhu)
  }
}
exports.MoveSkillItem = MoveSkillItem;
//# sourceMappingURL=MoveSkillItem.js.map
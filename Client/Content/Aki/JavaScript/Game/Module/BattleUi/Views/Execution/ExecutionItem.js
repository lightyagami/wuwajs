"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExecutionItem = undefined;
const Info_1 = require("../../../../../Core/Common/Info");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const BattleSkillItem_1 = require("../BattleSkillItem");
class ExecutionItem extends BattleSkillItem_1.BattleSkillItem {
  constructor() {
    super(...arguments);
    this.B7 = undefined;
  }
  Init(t) {
    this.B7 = t;
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
    this.B7?.();
  }
  OnInputAction() {
    this.ClickEffect?.Play();
  }
}
exports.ExecutionItem = ExecutionItem;
//# sourceMappingURL=ExecutionItem.js.map
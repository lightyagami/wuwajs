"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSkillSwitchInteractItem = undefined;
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class BattleSkillSwitchInteractItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.IsEnable = false;
  }
  Init(e) {
    this.CreateThenShowByResourceIdAsync("UiItem_HandleSkillSwitchIcon", e).then(() => {
      this.RefreshVisible();
    }).catch(() => {});
  }
  RefreshEnable(e) {
    this.IsEnable = e;
    this.RefreshVisible();
  }
  RefreshVisible() {
    this.SetActive(this.IsEnable);
  }
}
exports.BattleSkillSwitchInteractItem = BattleSkillSwitchInteractItem;
//# sourceMappingURL=BattleSkillSwitchInteractItem.js.map
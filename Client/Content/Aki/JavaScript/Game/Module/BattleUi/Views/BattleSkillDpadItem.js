"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSkillDpadItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class BattleSkillDpadItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.x5e = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnStart() {
    this.x5e.push(this.GetItem(1));
    this.x5e.push(this.GetItem(2));
    this.x5e.push(this.GetItem(3));
    this.x5e.push(this.GetItem(4));
  }
  SetVisible(t) {
    if (t) {
      if (!this.IsShowOrShowing) {
        this.Show();
      }
    } else if (this.IsShowOrShowing) {
      this.Hide();
    }
  }
  SetArrowVisible(t, e) {
    this.x5e[t].SetUIActive(e);
  }
  SetBgVisible(t) {
    this.GetItem(0).SetUIActive(t);
  }
}
exports.BattleSkillDpadItem = BattleSkillDpadItem;
//# sourceMappingURL=BattleSkillDpadItem.js.map
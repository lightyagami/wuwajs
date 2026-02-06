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
    this.ANf = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnStart() {
    this.x5e.push(this.GetItem(1));
    this.x5e.push(this.GetItem(2));
    this.x5e.push(this.GetItem(3));
    this.x5e.push(this.GetItem(4));
    for (let t = 0; t < 4; t++) {
      this.ANf.push(true);
    }
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
  SetArrowVisible(t, s) {
    this.x5e[t].SetUIActive(s);
  }
  SetBgVisible(t) {
    this.GetItem(0).SetUIActive(t);
  }
  SetArrowEnable(t, s, e = false) {
    if (this.ANf[t] !== s || !!e) {
      if (s) {
        this.x5e[t].SetAlpha(1);
      } else {
        this.x5e[t].SetAlpha(0.2);
      }
      this.ANf[t] = s;
    }
  }
}
exports.BattleSkillDpadItem = BattleSkillDpadItem;
//# sourceMappingURL=BattleSkillDpadItem.js.map
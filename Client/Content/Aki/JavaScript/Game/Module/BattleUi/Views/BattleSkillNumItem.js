"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSkillNumItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class BattleSkillNumItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.pot = -1;
    this.TargetActive = false;
    this.vot = new Map();
    this.CreateByResourceIdAsync("UiItem_BattleSkillNumItem", t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText]];
  }
  OnStart() {
    for (const t of this.vot.values()) {
      t();
    }
  }
  SetComponentActive(t) {
    this.TargetActive = t;
    var e = () => {
      this.SetActive(t);
    };
    if (this.InAsyncLoading()) {
      this.vot.set("SetActive", e);
    } else {
      e();
    }
  }
  SetTotalCount(t) {}
  SetRemainingCount(t) {
    var e = () => {
      if (this.pot !== t) {
        this.GetText(1).SetText(t.toString());
        this.pot = t;
      }
    };
    if (this.InAsyncLoading()) {
      this.vot.set("SetRemainingCount", e);
    } else {
      e();
    }
  }
  RefreshCountType(t) {}
  RefreshTotalCount(t) {}
}
exports.BattleSkillNumItem = BattleSkillNumItem;
//# sourceMappingURL=BattleSkillNumItem.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GreatSwordGoalItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class GreatSwordGoalItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite], [2, UE.UISprite]];
  }
  Refresh(e, t, s) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Config.GoalText);
    this.GetSprite(1).SetUIActive(!e.Completed);
    this.GetSprite(2).SetUIActive(e.Completed);
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return e.Config.Id;
  }
}
exports.GreatSwordGoalItem = GreatSwordGoalItem;
//# sourceMappingURL=GreatSwordGoalItem.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsLegMatchTabItem = undefined;
const UE = require("ue");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class RacingBetsLegMatchTabItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  RefreshUi(e) {
    if (e === undefined) {
      this.SetUiActive(false);
    } else {
      this.GetText(0).ShowTextNew(e.Name);
      e = new Date(e.MatchStartTime);
      this.GetText(1).SetText(TimeUtil_1.TimeUtil.DateFormat3(e));
    }
  }
}
exports.RacingBetsLegMatchTabItem = RacingBetsLegMatchTabItem;
//# sourceMappingURL=RacingBetsLegMatchTabItem.js.map
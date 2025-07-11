"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityInstanceEntranceScoreItem = undefined;
const UE = require("ue");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class ActivityInstanceEntranceScoreItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.C0t = undefined;
    this.hih = () => {
      var t = this.C0t.GetPointRewardBtnClickCallBack();
      if (t) {
        t();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.hih]];
  }
  RefreshView(t) {
    if (this.C0t && this.C0t.GetRedDotName()) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.C0t.GetRedDotName(), this.GetItem(2), this.C0t.GetRedDotId());
    }
    this.C0t = t;
    if (this.C0t && this.C0t.GetRedDotName()) {
      RedDotController_1.RedDotController.BindRedDot(this.C0t.GetRedDotName(), this.GetItem(2), undefined, this.C0t.GetRedDotId());
    }
    t = t.GetRewardData();
    this.GetButton(0)?.RootUIComp.SetUIActive(t !== undefined);
    this.l3e();
  }
  l3e() {
    var t = this.C0t.GetScoreDesc();
    this.GetText(1)?.SetText(t);
  }
}
exports.ActivityInstanceEntranceScoreItem = ActivityInstanceEntranceScoreItem;
//# sourceMappingURL=ActivityInstanceEntranceScoreItem.js.map
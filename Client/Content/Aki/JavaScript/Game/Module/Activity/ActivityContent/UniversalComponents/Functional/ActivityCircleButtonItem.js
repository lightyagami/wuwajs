"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityCircleButtonItem = undefined;
const UE = require("ue");
const RedDotController_1 = require("../../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class ActivityCircleButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.QUc = () => {};
    this.l4e = undefined;
    this.eTt = () => {
      this.QUc();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  SetOnClick(t) {
    this.QUc = t;
  }
  SetSubText(t) {
    this.GetText(1).SetText(t);
  }
  SetRedDotVisible(t) {
    this.GetItem(2).SetUIActive(t);
  }
  BindRedDot(t, e) {
    var i = this.GetItem(2);
    if (i && (this.UnBindRedDot(), this.l4e = t, this.l4e)) {
      RedDotController_1.RedDotController.BindRedDot(t, i, undefined, e);
    }
  }
  BindGivenUid(t, e) {
    var i = this.GetItem(2);
    if (i && (this.l4e = t, this.l4e)) {
      RedDotController_1.RedDotController.BindRedDot(t, i, undefined, e);
    }
  }
  UnBindGivenUid(t) {
    if (this.l4e) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, this.GetItem(2), t);
    }
  }
  UnBindRedDot() {
    if (this.l4e) {
      RedDotController_1.RedDotController.UnBindRedDot(this.l4e);
      this.l4e = undefined;
    }
  }
}
exports.ActivityCircleButtonItem = ActivityCircleButtonItem;
//# sourceMappingURL=ActivityCircleButtonItem.js.map
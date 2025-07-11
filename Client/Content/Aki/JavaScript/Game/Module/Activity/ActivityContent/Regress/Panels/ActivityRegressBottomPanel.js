"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressBottomPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const ButtonItem_1 = require("../../../../Common/Button/ButtonItem");
class ActivityRegressBottomPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Zqe = undefined;
    this.p4e = undefined;
    this.tWt = () => {
      this.Zqe?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnStart() {
    var t = this.GetItem(2);
    this.p4e = new ButtonItem_1.ButtonItem(t);
    this.p4e.SetFunction(this.tWt);
  }
  OnBeforeShow() {
    this.p4e.BindRedDot("ActivityRecallTask");
  }
  OnAfterHide() {
    this.p4e.UnBindRedDot();
  }
  BindCallback(t) {
    this.Zqe = t;
  }
  UnBindCallBack() {
    this.Zqe = undefined;
  }
}
exports.ActivityRegressBottomPanel = ActivityRegressBottomPanel;
//# sourceMappingURL=ActivityRegressBottomPanel.js.map
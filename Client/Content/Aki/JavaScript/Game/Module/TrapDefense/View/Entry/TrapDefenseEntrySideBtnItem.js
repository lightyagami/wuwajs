"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseEntrySideBtnItem = undefined;
const UE = require("ue");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class TrapDefenseEntrySideBtnItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.l4e = undefined;
    this.Gke = undefined;
    this.ije = () => {
      if (this.Gke) {
        this.Gke();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.ije]];
  }
  OnBeforeDestroy() {
    this.UnBindRedDot();
  }
  SetText(t) {
    var e = this.GetText(1);
    if (e) {
      e.SetText(t);
    }
  }
  SetProgressText(t) {
    var e = this.GetText(3);
    if (e) {
      e.SetText(t);
    }
  }
  SetProgressTextWithLabel(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t, ...e);
  }
  SetLocalTextNew(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, ...e);
  }
  TrySetLocalTextNew(t, ...e) {
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), t, ...e);
  }
  SetShowText(t) {
    this.GetText(1).ShowTextNew(t);
  }
  SetEnableClick(t) {
    this.GetButton(0)?.SetSelfInteractive(t);
  }
  SetFunction(t) {
    this.Gke = t;
  }
  SetRedDotVisible(t) {
    this.GetItem(2).SetUIActive(t);
  }
  BindRedDot(t, e = 0) {
    var i = this.GetItem(2);
    if (i && (this.UnBindRedDot(), this.l4e = t, this.l4e)) {
      RedDotController_1.RedDotController.BindRedDot(t, i, undefined, e);
    }
  }
  UnBindRedDot() {
    if (this.l4e) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, this.GetItem(2));
      this.l4e = undefined;
    }
  }
}
exports.TrapDefenseEntrySideBtnItem = TrapDefenseEntrySideBtnItem;
//# sourceMappingURL=TrapDefenseEntrySideBtnItem.js.map
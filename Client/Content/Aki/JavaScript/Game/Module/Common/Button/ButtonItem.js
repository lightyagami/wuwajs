"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonItem = undefined;
const UE = require("ue");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.Pe = 0;
    this.l4e = undefined;
    this.Gke = undefined;
    this.ije = () => {
      this.ExecuteButtonFunction();
    };
    if (t) {
      this.CreateThenShowByActor(t.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.ije]];
  }
  OnBeforeDestroy() {
    this.UnBindRedDot();
  }
  SetButtonAllowEventBubbleUp(t) {
    this.GetButton(0).AllowEventBubbleUp = t;
  }
  SetText(t) {
    var e = this.GetText(1);
    if (e) {
      e.SetText(t);
    }
  }
  SetLocalText(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), t, ...e);
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
  SetTextShowState(t) {
    this.GetText(1).SetUIActive(t);
  }
  SetData(t) {
    this.Pe = t;
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
  GetBtn() {
    return this.GetButton(0);
  }
  ExecuteButtonFunction() {
    if (this.Gke) {
      this.Gke(this.Pe);
    }
  }
}
exports.ButtonItem = ButtonItem;
//# sourceMappingURL=ButtonItem.js.map
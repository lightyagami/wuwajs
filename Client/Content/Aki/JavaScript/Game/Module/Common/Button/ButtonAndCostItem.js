"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonAndCostItem = undefined;
const UE = require("ue");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ButtonAndCostItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = 0;
    this.l4e = undefined;
    this.Gke = undefined;
    this.ije = () => {
      this.Gke?.(this.Pe);
    };
  }
  async Init(t) {
    await this.CreateByActorAsync(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIText]];
    this.BtnBindInfo = [[0, this.ije]];
  }
  OnBeforeDestroy() {
    this.UnBindRedDot();
  }
  SetButtonAllowEventBubbleUp(t) {
    this.GetBtn().AllowEventBubbleUp = t;
  }
  SetText(t) {
    this.GetText(1)?.SetText(t);
  }
  SetLocalTextNew(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, ...e);
  }
  SetShowText(t) {
    this.GetText(1).ShowTextNew(t);
  }
  SetData(t) {
    this.Pe = t;
  }
  SetEnableClick(t) {
    this.GetBtn().SetSelfInteractive(t);
  }
  SetFunction(t) {
    this.Gke = t;
  }
  SetRedDotVisible(t) {
    this.GetItem(2).SetUIActive(t);
  }
  BindRedDot(t, e = 0) {
    var i;
    this.UnBindRedDot();
    this.l4e = t;
    if (this.l4e) {
      i = this.GetItem(2);
      RedDotController_1.RedDotController.BindRedDot(t, i, undefined, e);
    }
  }
  BindGivenUid(t, e) {
    var i;
    this.l4e = t;
    if (this.l4e) {
      i = this.GetItem(2);
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
  UpdateCostIcon(t) {
    var e = this.GetTexture(3);
    this.SetTextureByPath(t, e);
  }
  UpdateCostNum(t) {
    this.GetText(4).SetText(t.toString());
  }
  UpdateCostColor(t) {
    var e = this.GetText(4);
    e.SetChangeColor(t, e.changeColor);
  }
}
exports.ButtonAndCostItem = ButtonAndCostItem;
//# sourceMappingURL=ButtonAndCostItem.js.map
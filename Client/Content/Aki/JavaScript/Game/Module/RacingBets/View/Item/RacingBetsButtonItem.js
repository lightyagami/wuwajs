"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsButtonItem = undefined;
const UE = require("ue");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class RacingBetsButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.l4e = undefined;
    this.c8a = 0;
    this.UJa = new Set();
    this.Gke = undefined;
    this.ije = () => {
      this.Gke?.();
      for (const t of this.UJa) {
        t();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem]];
    this.BtnBindInfo = [[0, this.ije]];
  }
  OnBeforeDestroy() {
    this.Gke = undefined;
    this.UJa.clear();
    this.UnBindGivenUid(this.c8a);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var e = this.GetButton(0)?.RootUIComp;
    if (e !== undefined) {
      return [e, e];
    }
  }
  SetButtonAllowEventBubbleUp(t) {
    this.GetButton(0).AllowEventBubbleUp = t;
  }
  SetEnableClick(t) {
    this.GetButton(0)?.SetSelfInteractive(t);
  }
  SetFunction(t) {
    this.Gke = t;
  }
  SetExtraFunction(t) {
    this.UJa.add(t);
  }
  DeleteExtraFunction(t) {
    this.UJa.delete(t);
  }
  SetRedDotVisible(t) {
    this.GetItem(1).SetUIActive(t);
  }
  BindRedDot(t, e = 0) {
    var i = this.GetItem(1);
    if (i && (this.l4e = t, this.c8a = e, this.l4e)) {
      RedDotController_1.RedDotController.BindRedDot(t, i, undefined, e);
    }
  }
  UnBindGivenUid(t) {
    if (this.l4e) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, this.GetItem(1), t);
      this.l4e = undefined;
      this.c8a = 0;
    }
  }
  UnBindRedDot() {
    if (this.l4e) {
      RedDotController_1.RedDotController.UnBindRedDot(this.l4e);
      this.l4e = undefined;
      this.c8a = 0;
    }
  }
}
exports.RacingBetsButtonItem = RacingBetsButtonItem;
//# sourceMappingURL=RacingBetsButtonItem.js.map
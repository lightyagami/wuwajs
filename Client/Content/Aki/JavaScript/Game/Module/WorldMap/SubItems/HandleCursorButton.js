"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandleCursorButton = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class HandleCursorButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.d5o = false;
    this.e0t = undefined;
    this.C5o = undefined;
  }
  async Initialize(t, e) {
    this.C5o = e;
    await this.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnStart() {
    this.RootItem?.SetRaycastTarget(false);
    this.e0t = this.GetRootActor().GetComponentByClass(UE.UIButtonComponent.StaticClass());
    this.e0t.OnClickCallBack.Bind(this.C5o);
  }
  OnBeforeDestroy() {
    this.e0t.OnClickCallBack.Unbind();
  }
  SetSelected(t) {
    if (Info_1.Info.IsInGamepad() && this.d5o !== t) {
      if (this.d5o = t) {
        this.e0t.SetSelectionState(1);
      } else {
        this.e0t.SetSelectionState(0);
      }
    }
  }
  SetCursorActive(t) {
    if (Info_1.Info.IsInGamepad() && t) {
      this.SetActive(true);
    } else {
      this.SetActive(false);
    }
  }
}
exports.HandleCursorButton = HandleCursorButton;
//# sourceMappingURL=HandleCursorButton.js.map
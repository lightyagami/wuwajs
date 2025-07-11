"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleModelLoadingItem = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleModelLoadingItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.h1o = true;
    this.TDe = undefined;
    this.jFe = true;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    this.l1o();
  }
  OnBeforeDestroy() {
    this._1o();
  }
  _1o() {
    if (this.TDe !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  l1o() {
    this.SetActive(this.h1o && this.jFe);
  }
  SetLoadingOpen(e) {
    this.jFe = e;
  }
  SetLoadingActive(e) {
    if (this.h1o !== e) {
      if (this.h1o = e) {
        this.TDe = TimerSystem_1.GameplayTimerSystem.Delay(() => {
          this._1o();
          this.l1o();
        }, 300);
      } else {
        this._1o();
        this.l1o();
      }
    }
  }
  SetIconPosition(e) {
    this.GetItem(0)?.SetAnchorOffset(e);
  }
}
exports.RoleModelLoadingItem = RoleModelLoadingItem;
//# sourceMappingURL=RoleModelLoadingItem.js.map
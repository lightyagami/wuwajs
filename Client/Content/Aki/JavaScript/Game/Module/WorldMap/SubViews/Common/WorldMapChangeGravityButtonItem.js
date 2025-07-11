"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapChangeGravityButtonItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class WorldMapChangeGravityButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Gke = undefined;
    this.ije = () => {
      if (this.Gke) {
        this.Gke();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UIText], [3, UE.UISpriteTransition]];
    this.BtnBindInfo = [[0, this.ije]];
  }
  SetEnableClick(t) {
    this.GetButton(0).SetSelfInteractive(t);
  }
  SetFunction(t) {
    this.Gke = t;
  }
  SetSprite(t) {
    const e = this.GetSprite(1);
    e.SetUIActive(false);
    this.SetSpriteByPath(t, e, false, undefined, t => {
      this.GetUiSpriteTransition(3).SetAllTransitionSprite(e.GetSprite());
      e.SetUIActive(t);
    });
  }
}
exports.WorldMapChangeGravityButtonItem = WorldMapChangeGravityButtonItem;
//# sourceMappingURL=WorldMapChangeGravityButtonItem.js.map
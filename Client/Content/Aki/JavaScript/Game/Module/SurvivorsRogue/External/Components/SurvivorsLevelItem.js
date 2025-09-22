"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsLevelItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class SurvivorsLevelItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelId = 0;
    this.OnButtonClickedCallback = undefined;
    this.Lxt = () => {
      this.OnButtonClickedCallback?.(this.LevelId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Lxt]];
  }
  SetButtonInteractive(e) {
    this.GetButton(0).SetSelfInteractive(e);
  }
  Refresh(e, t) {
    this.LevelId = e;
    this.GetItem(1).SetUIActive(!t);
    this.GetItem(2).SetUIActive(t);
  }
  GetBottomPosItem() {
    return this.GetItem(3);
  }
}
exports.SurvivorsLevelItem = SurvivorsLevelItem;
//# sourceMappingURL=SurvivorsLevelItem.js.map
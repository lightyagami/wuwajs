"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureAreaCameraSelectionItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FurnitureAreaCameraSelectionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.PreBtnClickDelegate = undefined;
    this.NextBtnClickDelegate = undefined;
    this.K4g = () => {
      this.PreBtnClickDelegate?.();
    };
    this.hrd = () => {
      this.NextBtnClickDelegate?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIItem]];
    this.BtnBindInfo = [[2, this.K4g], [4, this.hrd]];
  }
  Refresh(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
  }
}
exports.FurnitureAreaCameraSelectionItem = FurnitureAreaCameraSelectionItem;
//# sourceMappingURL=FurnitureAreaCameraSelectionItem.js.map
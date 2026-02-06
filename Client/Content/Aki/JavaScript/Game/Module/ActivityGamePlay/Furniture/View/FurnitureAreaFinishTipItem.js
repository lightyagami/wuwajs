"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureAreaFinishTipItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FurnitureAreaFinishTipItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText]];
  }
  Refresh(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
  }
}
exports.FurnitureAreaFinishTipItem = FurnitureAreaFinishTipItem;
//# sourceMappingURL=FurnitureAreaFinishTipItem.js.map
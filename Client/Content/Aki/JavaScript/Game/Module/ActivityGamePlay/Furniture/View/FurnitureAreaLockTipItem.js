"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureAreaLockTipItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FurnitureAreaLockTipItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Teg = undefined;
    this.beg = () => {
      this.Teg?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.beg]];
  }
  Refresh(e, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
    this.Teg = i;
  }
}
exports.FurnitureAreaLockTipItem = FurnitureAreaLockTipItem;
//# sourceMappingURL=FurnitureAreaLockTipItem.js.map
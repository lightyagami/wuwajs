"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureGetWayButtonItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FurnitureGetWayButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.i9i = () => {
      this.Pe?.JumpFunction?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.i9i]];
  }
  Refresh(t) {
    this.Pe = t;
    if (this.Pe.NameTextId) {
      if (this.Pe.NameTextParams) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.Pe.NameTextId, ...this.Pe.NameTextParams);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.Pe.NameTextId);
      }
    }
  }
}
exports.FurnitureGetWayButtonItem = FurnitureGetWayButtonItem;
//# sourceMappingURL=FurnitureGetWayButtonItem.js.map
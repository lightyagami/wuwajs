"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorLinkageStickerItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
class MotorLinkageStickerItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.o4f = 0;
    this.ClickToggleCallback = undefined;
    this.kqe = () => {
      if (this.o4f !== 0) {
        this.ClickToggleCallback?.();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  Refresh(e) {
    this.o4f = e;
    e = this.IsReceived();
    this.GetItem(1)?.SetUIActive(e);
  }
  IsReceived() {
    return ActivityControllerHolder_1.ActivityControllerHolder.ActivityMotorLinkageController.ActivityData.IsStickerReceived(this.o4f);
  }
  SetToggleSelect(e, t) {
    this.GetExtendToggle(0)?.SetToggleStateForce(e ? 1 : 0, t);
  }
}
exports.MotorLinkageStickerItem = MotorLinkageStickerItem;
//# sourceMappingURL=MotorLinkageStickerItem.js.map
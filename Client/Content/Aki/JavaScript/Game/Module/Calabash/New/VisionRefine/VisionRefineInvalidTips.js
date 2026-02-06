"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRefineInvalidTipsData = exports.VisionRefineInvalidTips = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class VisionRefineInvalidTips extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent]];
  }
  RefreshExternalByData(i) {
    var e = this.GetText(1);
    if (i.LockDescriptionTextId) {
      e?.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, i.LockDescriptionTextId, i.LockDescriptionTextArgs);
    } else {
      e?.SetUIActive(false);
    }
  }
}
exports.VisionRefineInvalidTips = VisionRefineInvalidTips;
class VisionRefineInvalidTipsData {
  constructor() {
    this.LockDescriptionTextId = undefined;
    this.LockDescriptionTextArgs = undefined;
  }
}
exports.VisionRefineInvalidTipsData = VisionRefineInvalidTipsData;
//# sourceMappingURL=VisionRefineInvalidTips.js.map
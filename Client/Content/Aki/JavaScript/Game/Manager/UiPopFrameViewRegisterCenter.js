"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiPopFrameViewRegisterCenter = undefined;
const FullScreenViewItem_1 = require("../Ui/Common/FullScreenViewItem");
const InteractSystemViewItem_1 = require("../Ui/Common/InteractSystemViewItem");
const NpcSystemViewItem_1 = require("../Ui/Common/NpcSystemViewItem");
const PopupTypeBigItem_1 = require("../Ui/Common/PopupTypeBigItem");
const PopupTypeLargeItem_1 = require("../Ui/Common/PopupTypeLargeItem");
const PopupTypeMiddleItem_1 = require("../Ui/Common/PopupTypeMiddleItem");
const PopupTypeRightItem_1 = require("../Ui/Common/PopupTypeRightItem");
const PopupTypeSmallItem_1 = require("../Ui/Common/PopupTypeSmallItem");
const UiPopFrameViewStorage_1 = require("../Ui/UiPopFrameViewStorage");
const uiPopFrameViewCtorMap = {
  [1]: ["UiView_PopupB", PopupTypeBigItem_1.PopupTypeBigItem],
  4: ["UiView_PopupL", PopupTypeLargeItem_1.PopupTypeLargeItem],
  3: ["UiView_PopupM", PopupTypeMiddleItem_1.PopupTypeMiddleItem],
  2: ["UiView_PopupS", PopupTypeSmallItem_1.PopupTypeSmallItem],
  5: ["UiView_PopupL1", NpcSystemViewItem_1.NpcSystemViewItem],
  6: ["UiView_PopupL2", InteractSystemViewItem_1.InteractSystemViewItem],
  7: ["UiView_PopupFullScreen", FullScreenViewItem_1.FullScreenViewItem],
  8: ["UiView_SoundRemnantArenaPopupB", PopupTypeBigItem_1.PopupTypeBigItem],
  9: ["UiView_SoundRemnantArenaPopupM", PopupTypeMiddleItem_1.PopupTypeMiddleItem],
  10: ["UiView_SoundRemnantArenaPopupS", PopupTypeSmallItem_1.PopupTypeSmallItem],
  11: ["UiView_PasturePopupHelp", PopupTypeMiddleItem_1.PopupTypeMiddleItem],
  12: ["UiView_PopupR", PopupTypeRightItem_1.PopupTypeRightItem]
};
class UiPopFrameViewRegisterCenter {
  static Init() {
    for (const p in uiPopFrameViewCtorMap) {
      var e = Number(p);
      UiPopFrameViewStorage_1.UiPopFrameViewStorage.RegisterUiBehaviourPop(e, uiPopFrameViewCtorMap[e]);
    }
  }
}
exports.UiPopFrameViewRegisterCenter = UiPopFrameViewRegisterCenter;
//# sourceMappingURL=UiPopFrameViewRegisterCenter.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueFloatTipsItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const TIPS_OFFSET_Y = -80;
class MapRogueFloatTipsItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem]];
  }
  OnStart() {
    this.GetItem(1).SetAnchorOffsetY(TIPS_OFFSET_Y);
  }
  SetText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
  }
}
exports.MapRogueFloatTipsItem = MapRogueFloatTipsItem;
//# sourceMappingURL=MapRogueFloatTipsItem.js.map
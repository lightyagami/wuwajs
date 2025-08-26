"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseTalentUnlockItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class TrapDefenseTalentUnlockItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent]];
  }
  OnStart() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "TrapDefenseTalentNodeUnlocked");
  }
}
exports.TrapDefenseTalentUnlockItem = TrapDefenseTalentUnlockItem;
//# sourceMappingURL=TrapDefenseTalentUnlockItem.js.map
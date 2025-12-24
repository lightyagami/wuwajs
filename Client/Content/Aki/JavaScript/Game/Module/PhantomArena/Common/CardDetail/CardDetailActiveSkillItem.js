"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardDetailActiveSkillItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class CardDetailActiveSkillItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  Refresh(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Desc, ...e.Params);
  }
}
exports.CardDetailActiveSkillItem = CardDetailActiveSkillItem;
//# sourceMappingURL=CardDetailActiveSkillItem.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillTrickSmallTitleItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RoleSkillTrickSmallTitleItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  SetText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
  }
}
exports.RoleSkillTrickSmallTitleItem = RoleSkillTrickSmallTitleItem;
//# sourceMappingURL=RoleSkillTrickSmallTitleItem.js.map
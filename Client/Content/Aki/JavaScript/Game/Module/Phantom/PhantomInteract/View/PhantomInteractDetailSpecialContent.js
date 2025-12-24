"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomInteractDetailSpecialContent = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class PhantomInteractDetailSpecialContent extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText]];
  }
  OnStart() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "PhantomDisplay_SpecialSkillTitle");
  }
  Refresh(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.SkillDescription);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.SkillName);
    var t = this.GetTexture(1);
    this.SetTextureByPath(e.SkillPicturePath, t);
  }
}
exports.PhantomInteractDetailSpecialContent = PhantomInteractDetailSpecialContent;
//# sourceMappingURL=PhantomInteractDetailSpecialContent.js.map
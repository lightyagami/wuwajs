"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomInteractDetailNormalContent = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class PhantomInteractDetailNormalContent extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnStart() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "PhantomDisplay_GeneralSkillTitle");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "PhantomDisplay_GeneralDesc");
  }
  Refresh(e) {
    e = e.Name;
    e = new LguiUtil_1.TableTextArgNew(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "PhantomDisplay_GeneralDesc", e);
  }
}
exports.PhantomInteractDetailNormalContent = PhantomInteractDetailNormalContent;
//# sourceMappingURL=PhantomInteractDetailNormalContent.js.map
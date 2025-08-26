"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GreatSwordOpenTipsView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class GreatSwordOpenTipsView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnStart() {
    var e = this.OpenParam;
    if (e && (e.MainText && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.MainText), e.SubText)) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.SubText);
    }
  }
  OnAfterShow() {
    this.CloseMe();
  }
}
exports.GreatSwordOpenTipsView = GreatSwordOpenTipsView;
//# sourceMappingURL=GreatSwordOpenTipsView.js.map
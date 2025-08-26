"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecommendQuestTipsSubPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class RecommendQuestTipsSubPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.pxl = undefined;
    this.fxl = () => {
      this.pxl?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.fxl]];
  }
  SetTipsTxtByTextId(e, ...t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e, t);
  }
  SetTipsTxt(e) {
    this.GetText(0).SetText(e);
  }
  BindClickBtnTipsCallBack(e) {
    this.pxl = e;
  }
  SetBtnActive(e) {
    this.GetButton(1)?.RootUIComp.SetUIActive(e);
  }
}
exports.RecommendQuestTipsSubPanel = RecommendQuestTipsSubPanel;
//# sourceMappingURL=RecommendQuestTipsSubPanel.js.map
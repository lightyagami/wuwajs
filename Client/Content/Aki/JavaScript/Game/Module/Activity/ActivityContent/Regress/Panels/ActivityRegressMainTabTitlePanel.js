"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressMainTabTitlePanel = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityRegressMainTabTitlePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnBackBtnCallBack = undefined;
    this.B6e = () => {
      this.OnBackBtnCallBack?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIItem]];
    this.BtnBindInfo = [[3, this.B6e]];
  }
  UpdateIcon(i) {
    if (!StringUtils_1.StringUtils.IsEmpty(i)) {
      this.SetSpriteByPath(i, this.GetSprite(0), false);
    }
  }
  UpdateTitle(i) {
    var e = this.GetText(1);
    if (i) {
      e.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, i.TextId, ...i.Args);
    } else {
      e.SetUIActive(false);
    }
  }
}
exports.ActivityRegressMainTabTitlePanel = ActivityRegressMainTabTitlePanel;
//# sourceMappingURL=ActivityRegressMainTabTitlePanel.js.map
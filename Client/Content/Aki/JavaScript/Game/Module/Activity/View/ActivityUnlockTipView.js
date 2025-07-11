"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityUnlockTipView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ActivityUnlockTipView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnAfterShow() {
    this.CloseMe();
  }
  OnStart() {
    this.ActivityBaseData = this.OpenParam;
    this.Refresh();
  }
  Refresh() {
    this.SetTitle(this.ActivityBaseData.LocalConfig.Title);
  }
  SetTitle(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i);
  }
}
exports.ActivityUnlockTipView = ActivityUnlockTipView;
//# sourceMappingURL=ActivityUnlockTipView.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RepeatKeyTipsView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RepeatKeyTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Qxi = undefined;
    this.Xxi = undefined;
    this.oxi = 0;
    this.$xi = undefined;
    this.Yxi = false;
    this.CPi = () => {
      this.Yxi = true;
      this.CloseMe();
    };
    this.gPi = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.CPi], [7, this.gPi]];
  }
  OnStart() {
    var i = this.OpenParam;
    this.Qxi = i.CurrentKeySettingRowData;
    this.Xxi = i.RepeatKeySettingRowData;
    this.oxi = i.InputControllerType;
    this.$xi = i.OnCloseCallback;
    var i = this.Qxi.GetSettingName();
    var t = this.Qxi.GetCurrentKeyNameRichText(this.oxi);
    var s = this.Xxi.GetSettingName();
    var e = this.Xxi.GetCurrentKeyNameRichText(this.oxi);
    if (StringUtils_1.StringUtils.IsBlank(t)) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "NoneText");
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "NoneText");
    } else {
      this.GetText(1)?.SetText(t);
      this.GetText(5)?.SetText(t);
    }
    this.GetText(4)?.SetText(e);
    this.GetText(2)?.SetText(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), s);
  }
  OnBeforeDestroy() {
    if (this.$xi) {
      this.$xi(this.Yxi);
    }
    this.Qxi = undefined;
    this.Xxi = undefined;
    this.oxi = 0;
    this.$xi = undefined;
  }
}
exports.RepeatKeyTipsView = RepeatKeyTipsView;
//# sourceMappingURL=RepeatKeyTipsView.js.map
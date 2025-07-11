"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spring25EnvelopeView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivitySpring25Controller_1 = require("../Controller/ActivitySpring25Controller");
class Spring25EnvelopeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.JGl = () => {
      ActivitySpring25Controller_1.ActivitySpring25Controller.Instance.HandleResetCurrentSignId();
      this.CloseMe();
    };
    this.zGl = () => {
      ActivitySpring25Controller_1.ActivitySpring25Controller.Instance.HandleResetCurrentSignId();
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIText]];
    this.BtnBindInfo = [[1, this.JGl], [2, this.zGl]];
  }
  OnStart() {
    var i = this.OpenParam;
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(0), i.InfoTextId);
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(3), i.TitleTextId);
  }
}
exports.Spring25EnvelopeView = Spring25EnvelopeView;
//# sourceMappingURL=Spring25EnvelopeView.js.map
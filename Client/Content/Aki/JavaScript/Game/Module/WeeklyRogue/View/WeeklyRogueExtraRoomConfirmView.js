"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueExtraRoomConfirmView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class WeeklyRogueExtraRoomConfirmView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.qLn = () => {
      this.Data.CancelFunc?.();
      this.CloseMe();
    };
    this.GLn = () => {
      this.Data.ConfirmFunc?.();
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.qLn], [5, this.GLn]];
  }
  OnStart() {
    var i = this.OpenParam;
    if (i) {
      this.Data = i;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "WeRogueScorePopupText", i.CurScore, i.MaxScore);
      this.ChildPopView?.PopItem.OverrideBackBtnCallBack(this.qLn);
    }
  }
}
exports.WeeklyRogueExtraRoomConfirmView = WeeklyRogueExtraRoomConfirmView;
//# sourceMappingURL=WeeklyRogueExtraRoomConfirmView.js.map
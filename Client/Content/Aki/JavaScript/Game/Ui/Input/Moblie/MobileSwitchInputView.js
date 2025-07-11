"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MobileSwitchInputView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../Base/UiViewBase");
const MobileSwitchInputController_1 = require("./MobileSwitchInputController");
class MobileSwitchInputView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    var e = this.OpenParam;
    this.GetItem(0)?.SetUIActive(!e);
    this.GetItem(1)?.SetUIActive(e);
  }
  OnAfterPlayStartSequence() {
    this.CloseMe(MobileSwitchInputController_1.MobileSwitchInputController.ReOpenBattleView);
  }
}
exports.MobileSwitchInputView = MobileSwitchInputView;
//# sourceMappingURL=MobileSwitchInputView.js.map
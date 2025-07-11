"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsUiNavigationTextChangeListener = undefined;
const UE = require("ue");
const GlobalData_1 = require("../../../GlobalData");
class TsUiNavigationTextChangeListener extends UE.UINavigationTextChangeListener {
  constructor() {
    super(...arguments);
    this.Listener = undefined;
    this.Text = undefined;
  }
  Constructor() {
    this.Listener = undefined;
    this.Text = undefined;
  }
  AwakeBP() {
    if (GlobalData_1.GlobalData.GameInstance) {
      this.Listener = this.GetOwner().GetComponentByClass(UE.TsUiNavigationBehaviorListener_C.StaticClass());
    }
  }
  StartBP() {
    if (GlobalData_1.GlobalData.GameInstance) {
      this.NotifyDefaultText();
    }
  }
  OnNotifyTextChangeBP(t) {
    if (GlobalData_1.GlobalData.GameInstance && this.Listener) {
      this.Listener.NotifyTextChangeByComponent(t);
    }
  }
  NotifyDefaultText() {
    if (this.Listener && this.TextActor && (this.Text = this.TextActor.GetComponentByClass(UE.UIText.StaticClass()), this.Text)) {
      this.Listener.NotifyTextChangeByComponent(this.Text.GetText());
    }
  }
}
exports.TsUiNavigationTextChangeListener = TsUiNavigationTextChangeListener;
exports.default = TsUiNavigationTextChangeListener; //# sourceMappingURL=TsUiNavigationTextChangeListener.js.map
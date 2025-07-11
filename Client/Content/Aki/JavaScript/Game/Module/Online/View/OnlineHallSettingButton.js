"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineHallSettingButton = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class OnlineHallSettingButton extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super();
    this.W5e = undefined;
    this.A5e = () => !this.W5e || this.W5e(this.E9);
    this.xNi = t => {
      if (t === 1 && this.wNi) {
        this.wNi(this.E9);
      }
    };
    this.E9 = i;
    this.CreateThenShowByActor(t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
  }
  OnStart() {
    this.BNi(this.E9);
    this.Ore();
  }
  OnBeforeDestroy() {
    this.kre();
  }
  Ore() {
    this.GetExtendToggle(0).OnStateChange.Add(this.xNi);
  }
  kre() {
    this.GetExtendToggle(0).OnStateChange.Remove(this.xNi);
  }
  BindOnSettingButtonClickedCallback(t) {
    this.wNi = t;
  }
  BindCanToggleExecuteChange(t) {
    this.W5e = t;
  }
  SetSelected(t) {
    var i = this.GetExtendToggle(0);
    if (t) {
      i.SetToggleStateForce(1, false);
    } else {
      i.SetToggleStateForce(0, false);
    }
  }
  BNi(t) {
    var i = this.GetText(1);
    var t = "PermissionsSetting_" + t;
    LguiUtil_1.LguiUtil.SetLocalText(i, t);
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.A5e);
  }
}
exports.OnlineHallSettingButton = OnlineHallSettingButton;
//# sourceMappingURL=OnlineHallSettingButton.js.map
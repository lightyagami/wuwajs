"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmBoxButton = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ConfirmBoxDefine_1 = require("../ConfirmBoxDefine");
class ConfirmBoxButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Timer = undefined;
    this.DelayTime = 0;
    this.ClickFunction = undefined;
    this.ije = () => {
      this.CloseView();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [0, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.ije]];
  }
  CloseView() {
    if (this.ClickFunction) {
      this.ClickFunction();
    }
  }
  SetTextById(i) {
    this.GetText(1).SetText(ConfigManager_1.ConfigManager.ConfirmBoxConfig.GetButtonText(i));
  }
  SetText(i) {
    this.GetText(1).SetText(i);
  }
  SetBtnCanClick(i) {
    var e = this.RootActor.GetComponentByClass(UE.UIInteractionGroup.StaticClass());
    if (e) {
      e.SetInteractable(i);
    }
  }
  SetTimer(i, e, t) {
    if (!t) {
      this.SetBtnCanClick(t);
    }
    this.DelayTime = e;
    this.gqt(i);
    this.Timer = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      --this.DelayTime;
      this.gqt(i);
      if (this.DelayTime <= 0) {
        if (t) {
          this.CloseView();
        } else {
          this.SetBtnCanClick(true);
        }
      }
    }, ConfirmBoxDefine_1.BUTTON_DELAYTIME);
  }
  gqt(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i, this.DelayTime > 0 ? this.DelayTime : "");
  }
  SetClickFunction(i) {
    this.ClickFunction = i;
  }
  OnBeforeDestroy() {
    if (this.Timer) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.Timer);
      this.Timer = undefined;
    }
  }
}
exports.ConfirmBoxButton = ConfirmBoxButton;
//# sourceMappingURL=ConfirmBoxButton.js.map
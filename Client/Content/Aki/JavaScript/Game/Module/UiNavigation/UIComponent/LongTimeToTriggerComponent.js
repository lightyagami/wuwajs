"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LongTimeToTriggerComponent = undefined;
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const HotKeyViewDefine_1 = require("../HotKeyViewDefine");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class LongTimeToTriggerComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments);
    this.vqo = 0;
    this.Mqo = undefined;
    this.Eqo = false;
    this.Sqo = () => {
      this.vqo += TimerSystem_1.MIN_TIME;
      var e;
      var i = this.GetHotKeyConfig();
      let t = 0;
      if (this.vqo > i.ReleaseFailureTime) {
        this.yqo();
        e = i.LongPressTime;
        t = (this.vqo - i.ReleaseFailureTime) / e;
      }
      if (t >= 1) {
        this.ReleaseWithoutCheck();
      } else {
        this.CurComponent.SetLongPressState(t);
      }
    };
  }
  OnPress(e) {
    this.Iqo();
    this.Tqo();
  }
  OnRelease(e) {
    if (this.vqo >= e.LongPressTime + e.ReleaseFailureTime) {
      this.ClickButton(e.BindButtonTag);
    }
    this.CurComponent.SetLongPressState(0);
    this.Iqo();
    this.Eqo = false;
  }
  ClickButton(e) {
    if (e === HotKeyViewDefine_1.EXIT_TAG) {
      UiNavigationNewController_1.UiNavigationNewController.HotKeyCloseView();
    } else {
      UiNavigationNewController_1.UiNavigationNewController.ClickButton(e);
    }
  }
  OnUnRegisterMe() {
    this.Iqo();
  }
  Iqo() {
    if (this.Mqo) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.Mqo);
      this.Mqo = undefined;
    }
    this.vqo = 0;
  }
  Tqo() {
    this.Mqo = TimerSystem_1.GameplayTimerSystem.Forever(this.Sqo, TimerSystem_1.MIN_TIME);
  }
  yqo() {
    if (!this.Eqo) {
      this.Eqo = true;
      var e = ModelManager_1.ModelManager.UiNavigationModel;
      if (e) {
        for (const i of e.GetActionHotKeyComponentSet(this.GetActionName())) {
          i.ResetPressState();
        }
      }
    }
  }
}
exports.LongTimeToTriggerComponent = LongTimeToTriggerComponent;
//# sourceMappingURL=LongTimeToTriggerComponent.js.map
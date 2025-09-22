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
      var t = this.GetHotKeyConfig();
      let i = 0;
      if (this.vqo > t.ReleaseFailureTime) {
        this.yqo();
        e = t.LongPressTime;
        i = (this.vqo - t.ReleaseFailureTime) / e;
      }
      if (i >= 1) {
        this.ReleaseWithoutCheck();
      } else {
        this.CurComponent.SetLongPressState(i);
        this.R7d(i > 0 ? 1 : 0);
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
    this.R7d(0);
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
  R7d(e) {
    if (this.GetHotKeyConfig().ApplicableType === 6) {
      this.CurComponent.SetLongPressItemAlpha(e);
    }
  }
  yqo() {
    if (!this.Eqo) {
      this.Eqo = true;
      var e = ModelManager_1.ModelManager.UiNavigationModel;
      if (e) {
        for (const t of e.GetActionHotKeyComponentSet(this.GetActionName())) {
          t.ResetPressState();
        }
      }
    }
  }
}
exports.LongTimeToTriggerComponent = LongTimeToTriggerComponent;
//# sourceMappingURL=LongTimeToTriggerComponent.js.map
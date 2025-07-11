"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyTransitionView = undefined;
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
class DangoMonopolyTransitionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
  }
  OnAfterPlayStartSequence() {
    this.OnTransitionCallback();
  }
  async OnTransitionCallback() {
    await this.OpenParam?.TransitionCallback();
    await this.OpenPromise?.Promise;
    await TimerSystem_1.GameplayTimerSystem.Wait(TimerSystem_1.MIN_TIME);
    this.CloseMe();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DangoMonopolyTransitionClose);
  }
}
exports.DangoMonopolyTransitionView = DangoMonopolyTransitionView;
//# sourceMappingURL=DangoMonopolyTransitionView.js.map
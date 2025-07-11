"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputDistributeDelay = exports.delayInput = undefined;
const Time_1 = require("../../../Core/Common/Time");
const Queue_1 = require("../../../Core/Container/Queue");
const UiManager_1 = require("../UiManager");
const InputMappingsDefine_1 = require("./InputMappingsDefine");
exports.delayInput = [InputMappingsDefine_1.actionMappings.通用交互];
class InputDistributeDelay {
  constructor() {
    this.Fmr = new Queue_1.Queue();
    this.Vmr = new Queue_1.Queue();
  }
  StartDelay(e, i) {
    (i ? this.Fmr : this.Vmr).Push(Time_1.Time.Now + e);
  }
  IsInputActive(e) {
    let i = undefined;
    i = e ? this.Fmr : this.Vmr;
    var t = Time_1.Time.Now;
    for (; i.Size > 0;) {
      if (t < i.Front) {
        i.Pop();
        return true;
      }
      i.Pop();
    }
    return false;
  }
  CheckCondition(e, i) {
    return e === InputMappingsDefine_1.actionMappings.通用交互 && !UiManager_1.UiManager.IsViewCreating("InteractionHintView") && !UiManager_1.UiManager.IsViewDestroying("InteractionHintView");
  }
}
exports.InputDistributeDelay = InputDistributeDelay;
//# sourceMappingURL=InputDistributeDelay.js.map
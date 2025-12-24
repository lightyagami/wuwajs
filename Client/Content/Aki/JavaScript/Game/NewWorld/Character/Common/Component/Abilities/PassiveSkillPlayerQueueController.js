"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PassiveSkillPlayerQueueController = exports.PassiveSkillPlayerQueue = undefined;
const Queue_1 = require("../../../../../../Core/Container/Queue");
const ControllerBase_1 = require("../../../../../../Core/Framework/ControllerBase");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
class PassiveSkillPlayerQueue {
  constructor() {
    this.Gbm = new Queue_1.Queue();
    this.w_f = undefined;
  }
  DoActionCheckCd(e) {
    if (this.w_f) {
      this.Gbm.Push(e);
      return false;
    } else {
      this.L_f(e);
      return true;
    }
  }
  jm() {
    if (this.w_f !== undefined) {
      if (TimerSystem_1.TimerSystem.Has(this.w_f)) {
        TimerSystem_1.TimerSystem.Remove(this.w_f);
      }
      this.w_f = undefined;
    }
  }
  P_f() {
    var e;
    this.jm();
    if (!this.Gbm.Empty) {
      if (e = this.Gbm.Pop()) {
        this.L_f(e);
      }
    }
  }
  L_f(e) {
    this.jm();
    e = e();
    if (e > TimerSystem_1.MIN_TIME) {
      this.w_f = TimerSystem_1.TimerSystem.Delay(this.P_f.bind(this), e);
    } else {
      this.w_f = TimerSystem_1.TimerSystem.Next(this.P_f.bind(this));
    }
  }
  Clear() {
    this.jm();
    this.Gbm.Clear();
  }
}
exports.PassiveSkillPlayerQueue = PassiveSkillPlayerQueue;
class PassiveSkillPlayerQueueController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.mp.Clear();
    return true;
  }
  static OnClear() {
    this.mp.Clear();
    return true;
  }
  static DoAction(e) {
    return this.mp.DoActionCheckCd(e);
  }
}
(exports.PassiveSkillPlayerQueueController = PassiveSkillPlayerQueueController).mp = new PassiveSkillPlayerQueue();
//# sourceMappingURL=PassiveSkillPlayerQueueController.js.map
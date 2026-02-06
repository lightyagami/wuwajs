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
    this.Vwm = new Queue_1.Queue();
    this.Fcf = undefined;
  }
  DoActionCheckCd(e) {
    if (this.Fcf) {
      this.Vwm.Push(e);
      return false;
    } else {
      this.Ncf(e);
      return true;
    }
  }
  jm() {
    if (this.Fcf !== undefined) {
      if (TimerSystem_1.TimerSystem.Has(this.Fcf)) {
        TimerSystem_1.TimerSystem.Remove(this.Fcf);
      }
      this.Fcf = undefined;
    }
  }
  Vcf() {
    var e;
    this.jm();
    if (!this.Vwm.Empty) {
      if (e = this.Vwm.Pop()) {
        this.Ncf(e);
      }
    }
  }
  Ncf(e) {
    this.jm();
    e = e();
    if (e > TimerSystem_1.MIN_TIME) {
      this.Fcf = TimerSystem_1.TimerSystem.Delay(this.Vcf.bind(this), e);
    } else {
      this.Fcf = TimerSystem_1.TimerSystem.Next(this.Vcf.bind(this));
    }
  }
  Clear() {
    this.jm();
    this.Vwm.Clear();
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
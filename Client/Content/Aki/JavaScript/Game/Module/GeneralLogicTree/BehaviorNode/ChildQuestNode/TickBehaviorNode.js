"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TickBehaviorNode = undefined;
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class TickBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.IRe = undefined;
    this.IntervalTime = TimerSystem_1.MIN_TIME;
    this.r6 = () => {
      this.OnTick(this.IntervalTime);
    };
  }
  get CorrelativeEntities() {}
  OnStart(e) {
    super.OnStart(e);
    this.IRe = TimerSystem_1.GameplayTimerSystem.Forever(this.r6, this.IntervalTime);
  }
  OnEnd(e) {
    this.RemoveTimer();
    super.OnEnd(e);
  }
  RemoveTimer() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.IRe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.IRe);
    }
  }
  OnTick(e) {}
}
exports.TickBehaviorNode = TickBehaviorNode;
//# sourceMappingURL=TickBehaviorNode.js.map
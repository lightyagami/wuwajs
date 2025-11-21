"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPerformUnderAttackState = undefined;
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const NpcPerceptionReactionUtil_1 = require("./Common/NpcPerceptionReactionUtil");
const NpcPerformBaseState_1 = require("./NpcPerformBaseState");
const BUBBLE_TIME = 3;
class NpcPerformUnderAttackState extends NpcPerformBaseState_1.NpcPerformBaseState {
  constructor() {
    super(...arguments);
    this.pir = false;
    this.btr = 0;
    this.qtr = undefined;
    this.vir = Vector_1.Vector.Create();
    this.Gtr = undefined;
  }
  CanChangeFrom(e) {
    var t = this.Owner.Entity.GetComponent(191);
    return this.pir && e === 1 && !t.IsInPlot;
  }
  SetDefaultDirect(e) {
    this.vir.DeepCopy(e);
  }
  OnCreate(e) {
    super.OnCreate(e);
    if (e?.NpcHitShow) {
      this.pir = true;
      this.btr = e.NpcHitShow.BubbleRate;
      this.qtr = e.NpcHitShow.HitBubble;
    } else {
      this.pir = false;
    }
  }
  OnEnter(e) {
    this.Gtr = e;
    e = this.Owner.Entity.GetComponent(191);
    if (e?.HasBrain) {
      this.Owner.Entity.GetComponent(45)?.StopMove(false);
    }
    e?.StopPerformMontage(3, {
      Method: 0,
      BlendOutTime: 0
    });
    if (!this.pir) {
      TimerSystem_1.TimerSystem.Delay(() => {
        this.StateMachine.Switch(this.Gtr);
      }, BUBBLE_TIME * CommonDefine_1.MILLIONSECOND_PER_SECOND);
    }
    NpcPerceptionReactionUtil_1.NpcPerceptionReactionUtil.ShowHeadDialog(this.Owner.Entity, this.btr, this.qtr);
  }
  OnExit(e) {}
  OnDestroy() {}
}
exports.NpcPerformUnderAttackState = NpcPerformUnderAttackState;
//# sourceMappingURL=NpcPerformUnderAttackState.js.map
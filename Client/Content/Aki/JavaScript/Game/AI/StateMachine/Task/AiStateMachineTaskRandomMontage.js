"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineTaskRandomMontage = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const CombatLog_1 = require("../../../Utils/CombatLog");
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineTask_1 = require("./AiStateMachineTask");
class AiStateMachineTaskRandomMontage extends AiStateMachineTask_1.AiStateMachineTask {
  constructor() {
    super(...arguments);
    this.MontageNames = undefined;
    this.Ine = false;
    this.ose = 0;
    this.Rne = undefined;
    this.rse = undefined;
    this.MontageIndex = undefined;
    this.Dne = false;
    this.Playing = false;
    this.RemainedTrigger = -1;
    this.Une = () => {
      this.Dne = false;
      if (this.Node.Activated) {
        if (this.Ine && this.Rne) {
          this.Node.ActorComponent.EnableActor(this.Rne);
          this.Rne = undefined;
        }
        this.Node.MoveComponent.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
      }
    };
    this.nse = t => {
      this.Node.TaskFinished = true;
    };
    this.FTu = t => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("StateMachine", 84, "Random Montage Task OnMontageRemain", ["montage", this.GetNameByCurrentHandle()], ["remain time", t], ["remained trigger", this.RemainedTrigger]);
      }
      EventSystem_1.EventSystem.EmitWithTarget(this, EventDefine_1.EEventName.OnMontageRemain, t);
    };
  }
  get HasResource() {
    return !!this.rse;
  }
  OnInit(t) {
    this.MontageNames = Array.from(t.TaskRandomMontage.MontageNames);
    this.Ine = t.TaskRandomMontage.HideOnLoading;
    this.ose = t.TaskRandomMontage.BlendInTime * 0.001;
    return true;
  }
  OnEnter(t) {
    if (this.Node.TagComponent.HasTag(1008164187)) {
      this.Node.TaskFinished = true;
    } else {
      this.Node.SkillComponent.StopGroup1Skill("AiStateMachineTaskRandomMontage.OnEnter");
      this.Node.TaskFinished = false;
      this.Dne = true;
      this.Playing = false;
      this.MontageIndex = this.Node.Owner.GetBlackboard(1);
      CombatLog_1.CombatLog.Info("StateMachineNew", this.Node.Entity, "随机Montage", ["MontageIndex", this.MontageIndex]);
      if (this.MontageIndex === undefined || this.MontageIndex < 0 || this.MontageIndex >= this.MontageNames.length) {
        CombatLog_1.CombatLog.Error("StateMachineNew", this.Node.Entity, "播放随机Montage失败，MontageIndex非法", ["MontageIndex", this.MontageIndex]);
        this.MontageIndex = 0;
      }
      var i = this.Node.MontageComponent;
      if (!this.rse) {
        if (this.Ine && !this.Rne) {
          this.Rne = this.Node.ActorComponent.DisableActor("状态机加载动作");
        }
        for (let t = 0; t < this.MontageNames.length; t++) {
          var e = (this.MontageIndex + t) % this.MontageNames.length;
          var e = this.MontageNames[e];
          this.rse = i.CreateTaskWithName(e, this.Une, this.nse, this.ose);
          if (this.rse) {
            i.SetMontageTaskRemainCb(this.rse, this.FTu);
            break;
          }
        }
      }
      if (this.rse) {
        this.Playing = true;
        i.PlayMontageTaskWhenReady(this.rse, this.Node.ElapseTime * TimeUtil_1.TimeUtil.Millisecond, t, this.RemainedTrigger);
      } else {
        this.Node.TaskFinished = true;
      }
    }
  }
  OnExit(t) {
    if (this.Ine && this.Dne && this.Rne) {
      this.Node.ActorComponent.EnableActor(this.Rne);
      this.Rne = undefined;
    }
    this.Node.MontageComponent.EndMontageTask(this.rse);
    this.rse = undefined;
    this.Node.TaskFinished = false;
    this.Playing = false;
  }
  OnTick() {
    this.Node.MontageComponent.GetMontageTimeRemaining(this.rse);
  }
  OnClear() {
    if (this.rse) {
      this.Node.MontageComponent.EndMontageTask(this.rse);
    }
    this.rse = undefined;
  }
  GetTimeRemaining() {
    return this.Node.MontageComponent.GetMontageTimeRemaining(this.rse);
  }
  GetTimeElapsing() {
    return this.Node.MontageComponent.GetMontageTimeElapsing(this.rse);
  }
  GetTimeLength() {
    return this.Node.MontageComponent.GetMontageTimeLength(this.rse);
  }
  ToString(t, i = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, i);
  }
  VTu(t) {
    return this.Node.MontageComponent.GetMontageTaskNameByHandle(t);
  }
  GetNameByCurrentHandle() {
    if (this.rse) {
      return this.VTu(this.rse);
    }
  }
}
exports.AiStateMachineTaskRandomMontage = AiStateMachineTaskRandomMontage;
//# sourceMappingURL=AiStateMachineTaskRandomMontage.js.map
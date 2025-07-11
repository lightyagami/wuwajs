"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPerformBornState = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NpcPerformBaseState_1 = require("./NpcPerformBaseState");
const DEFAULT_MAX_BORN_MAT_EFFECT_TIME = 30;
class NpcPerformBornState extends NpcPerformBaseState_1.NpcPerformBaseState {
  constructor() {
    super(...arguments);
    this.w21 = undefined;
    this.A21 = undefined;
    this.Qdu = undefined;
    this.P21 = false;
    this.x21 = undefined;
    this.D21 = undefined;
    this.U21 = false;
    this.B21 = undefined;
    this.rbt = 0;
    this.XAl = undefined;
    this.OnBornMatEffectEnd = t => {
      if (t === this.B21?.Handle) {
        this.ClearState();
        this.StateMachine.Switch(1);
      }
    };
  }
  OnCreate(t) {
    super.OnCreate(t);
    this.w21 = t?.ShowOnAwake?.RegisteredMontageId;
    this.x21 = t?.ShowOnAwake?.MaterialDa;
  }
  OnStart() {
    this.Owner.Entity.GetComponent(187)?.PauseAi("NpcPerformBornState");
    this.k21();
  }
  OnExit(t) {
    this.ClearState();
    this.Owner.Entity.GetComponent(187)?.ResumeAi("NpcPerformBornState");
  }
  OnDestroy() {
    this.ClearState();
  }
  k21() {
    this.pra();
  }
  pra() {
    this.O21();
    this.q21();
  }
  O21() {
    let t = undefined;
    if (t = this.w21 ? this.w21.IsAbp ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(this.w21.MontageId) : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(this.w21.MontageId) : t) {
      const i = {
        InitStateName: t?.InitState,
        EndStatename: t?.EndState
      };
      ResourceSystem_1.ResourceSystem.LoadAsync(t.ActionMontage, UE.AnimMontage, (t, e) => {
        this.P21 = true;
        this.A21 = t;
        this.Qdu = i;
        this._al();
      });
    } else {
      this.P21 = true;
      this._al();
    }
  }
  q21() {
    if (this.x21 && this.x21 !== "") {
      ResourceSystem_1.ResourceSystem.LoadAsync(this.x21, UE.PrimaryDataAsset, (t, e) => {
        this.U21 = true;
        this.D21 = t;
        this._al();
      });
    } else {
      this.U21 = true;
      this._al();
    }
  }
  _al() {
    var t;
    if (this?.ActorComp?.Actor?.IsValid() && this.P21 && this.U21) {
      if (this.A21?.IsValid() && (t = this.A21.SequenceLength * MathUtils_1.MathUtils.SecondToMillisecond, this.rbt = t, this.PerformComp?.ClearAction(), this.PerformComp?.PlayPerformMontage(3, {
        MontageAsset: this.A21,
        AnimStateParam: this.Qdu,
        IsLoop: false
      }), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("NPC", 50, "播放出生Montage", ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()], ["Montage", this.A21.GetName()], ["Time", t]);
      }
      if (this.D21?.IsValid() && (t = this.D21, t = this.PerformComp?.MaterialController?.ApplyMaterialEffectByAsset(t), this.B21 = this.PerformComp?.MaterialController?.GetMaterialInfo(t), this.TryAddBornMaterialEffectEvents(), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("NPC", 50, "播放出生材质表现", ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()], ["Path", this.x21], ["Type", this.B21?.Type], ["Time", this.rbt]);
      }
      this.G21();
    }
  }
  G21() {
    if (this.rbt === 0) {
      this.StateMachine.Switch(1);
    } else {
      this.XAl = TimerSystem_1.TimerSystem.Delay(() => {
        this.StateMachine.Switch(1);
      }, this.rbt);
    }
  }
  TryAddBornMaterialEffectEvents() {
    if (this.rbt === 0 && this.ActorComp && this.B21) {
      var t = this.D21;
      switch (this.B21.Type) {
        case 1:
          this.rbt = (t.Start + t.Loop) * MathUtils_1.MathUtils.SecondToMillisecond;
          break;
        case 2:
          this.rbt = DEFAULT_MAX_BORN_MAT_EFFECT_TIME * MathUtils_1.MathUtils.SecondToMillisecond;
          EventSystem_1.EventSystem.AddWithTarget(this.ActorComp.Actor.CharacterActorComponent, EventDefine_1.EEventName.OnRemoveMaterialController, this.OnBornMatEffectEnd);
          break;
        case 3:
          this.rbt = DEFAULT_MAX_BORN_MAT_EFFECT_TIME * MathUtils_1.MathUtils.SecondToMillisecond;
          EventSystem_1.EventSystem.AddWithTarget(this.ActorComp.Actor.CharacterActorComponent, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.OnBornMatEffectEnd);
      }
    }
  }
  TryRemoveBornMaterialEffectEvents() {
    var t;
    if (this.ActorComp?.Actor?.IsValid() && this.ActorComp.Actor.CharRenderingComponent && (t = this.ActorComp.Actor.CharRenderingComponent, EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnRemoveMaterialController, this.OnBornMatEffectEnd) && EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.OnRemoveMaterialController, this.OnBornMatEffectEnd), EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.OnBornMatEffectEnd))) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.OnBornMatEffectEnd);
    }
  }
  ClearState() {
    this.TryRemoveBornMaterialEffectEvents();
    if (this.XAl) {
      TimerSystem_1.TimerSystem.Remove(this.XAl);
    }
    this.XAl = undefined;
    this.B21 = undefined;
  }
}
exports.NpcPerformBornState = NpcPerformBornState;
//# sourceMappingURL=NpcPerformBornState.js.map
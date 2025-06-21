"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NpcPerformBornState = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  NpcPerformBaseState_1 = require("./NpcPerformBaseState"),
  DEFAULT_MAX_BORN_MAT_EFFECT_TIME = 30;
class NpcPerformBornState extends NpcPerformBaseState_1.NpcPerformBaseState {
  constructor() {
    super(...arguments), this.zq1 = void 0, this.Jq1 = void 0, this.Vau = void 0, this.Zq1 = !1, this.e21 = void 0, this.t21 = void 0, this.i21 = !1, this.r21 = void 0, this.rbt = 0, this.XAl = void 0, this.OnBornMatEffectEnd = t => {
      t === this.r21?.Handle && (this.ClearState(), this.StateMachine.Switch(1))
    }
  }
  OnCreate(t) {
    super.OnCreate(t), this.zq1 = t?.ShowOnAwake?.RegisteredMontageId, this.e21 = t?.ShowOnAwake?.MaterialDa
  }
  OnStart() {
    this.Owner.Entity.GetComponent(187)?.PauseAi("NpcPerformBornState"), this.o21()
  }
  OnExit(t) {
    this.ClearState(), this.Owner.Entity.GetComponent(187)?.ResumeAi("NpcPerformBornState")
  }
  OnDestroy() {
    this.ClearState()
  }
  o21() {
    this.pra()
  }
  pra() {
    this.n21(), this.s21()
  }
  n21() {
    let t = void 0;
    if (t = this.zq1 ? this.zq1.IsAbp ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(this.zq1.MontageId) : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(this.zq1.MontageId) : t) {
      const i = {
        InitStateName: t?.InitState,
        EndStatename: t?.EndState
      };
      ResourceSystem_1.ResourceSystem.LoadAsync(t.ActionMontage, UE.AnimMontage, (t, e) => {
        this.Zq1 = !0, this.Jq1 = t, this.Vau = i, this._al()
      })
    } else this.Zq1 = !0, this._al()
  }
  s21() {
    this.e21 && "" !== this.e21 ? ResourceSystem_1.ResourceSystem.LoadAsync(this.e21, UE.PrimaryDataAsset, (t, e) => {
      this.i21 = !0, this.t21 = t, this._al()
    }) : (this.i21 = !0, this._al())
  }
  _al() {
    var t;
    this?.ActorComp?.Actor?.IsValid() && this.Zq1 && this.i21 && (this.Jq1?.IsValid() && (t = this.Jq1.SequenceLength * MathUtils_1.MathUtils.SecondToMillisecond, this.rbt = t, this.PerformComp?.ClearAction(), this.PerformComp?.PlayPerformMontage(3, {
      MontageAsset: this.Jq1,
      AnimStateParam: this.Vau,
      IsLoop: !1
    }), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("NPC", 50, "播放出生Montage", ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()], ["Montage", this.Jq1.GetName()], ["Time", t]), this.t21?.IsValid() && (t = this.t21, t = this.PerformComp?.MaterialController?.ApplyMaterialEffectByAsset(t), this.r21 = this.PerformComp?.MaterialController?.GetMaterialInfo(t), this.TryAddBornMaterialEffectEvents(), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("NPC", 50, "播放出生材质表现", ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()], ["Path", this.e21], ["Type", this.r21?.Type], ["Time", this.rbt]), this.a21())
  }
  a21() {
    0 === this.rbt ? this.StateMachine.Switch(1) : this.XAl = TimerSystem_1.TimerSystem.Delay(() => {
      this.StateMachine.Switch(1)
    }, this.rbt)
  }
  TryAddBornMaterialEffectEvents() {
    if (0 === this.rbt && this.ActorComp && this.r21) {
      var t = this.t21;
      switch (this.r21.Type) {
        case 1:
          this.rbt = (t.Start + t.Loop) * MathUtils_1.MathUtils.SecondToMillisecond;
          break;
        case 2:
          this.rbt = DEFAULT_MAX_BORN_MAT_EFFECT_TIME * MathUtils_1.MathUtils.SecondToMillisecond, EventSystem_1.EventSystem.AddWithTarget(this.ActorComp.Actor.CharacterActorComponent, EventDefine_1.EEventName.OnRemoveMaterialController, this.OnBornMatEffectEnd);
          break;
        case 3:
          this.rbt = DEFAULT_MAX_BORN_MAT_EFFECT_TIME * MathUtils_1.MathUtils.SecondToMillisecond, EventSystem_1.EventSystem.AddWithTarget(this.ActorComp.Actor.CharacterActorComponent, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.OnBornMatEffectEnd)
      }
    }
  }
  TryRemoveBornMaterialEffectEvents() {
    var t;
    this.ActorComp?.Actor?.IsValid() && this.ActorComp.Actor.CharRenderingComponent && (t = this.ActorComp.Actor.CharRenderingComponent, EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnRemoveMaterialController, this.OnBornMatEffectEnd) && EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.OnRemoveMaterialController, this.OnBornMatEffectEnd), EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.OnBornMatEffectEnd)) && EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.OnBornMatEffectEnd)
  }
  ClearState() {
    this.TryRemoveBornMaterialEffectEvents(), this.XAl && TimerSystem_1.TimerSystem.Remove(this.XAl), this.XAl = void 0, this.r21 = void 0
  }
}
exports.NpcPerformBornState = NpcPerformBornState;
//# sourceMappingURL=NpcPerformBornState.js.map
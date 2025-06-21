"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NpcPerformDestroyState = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  NpcPerformComponent_1 = require("../Component/NpcPerformComponent"),
  NpcPerformBaseState_1 = require("./NpcPerformBaseState"),
  DEFAULT_MAX_DEATH_MAT_EFFECT_TIME = 20;
class NpcPerformDestroyState extends NpcPerformBaseState_1.NpcPerformBaseState {
  constructor() {
    super(...arguments), this.DeathMontage = void 0, this.DeathMontageAsset = void 0, this.DeathMontageState = void 0, this.DeathMontageReady = !1, this.DeathMaterialEffectPath = void 0, this.DeathMaterialEffectAsset = void 0, this.DeathMaterialEffectReady = !1, this.DeathMaterialEffectInfo = void 0, this.NeedDisappearEffect = !1, this.DestroyTime = 0, this.DestroyHandle = void 0, this.OnDeathMatEffectEnd = t => {
      t === this.DeathMaterialEffectInfo?.Handle && (this.ClearState(), ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Owner?.Entity))
    }
  }
  OnCreate(t) {
    super.OnCreate(t), this.DeathMontage = t?.DeathInteract?.Montage, this.DeathMaterialEffectPath = t?.DeathInteract?.MaterialDa;
    var t = this.Owner.Entity.GetComponent(0)?.GetPbEntityInitData();
    t && (t = (0, IComponent_1.getComponent)(t.ComponentsData, "EntityVisibleComponent"), this.NeedDisappearEffect = !!t?.UseFadeEffect)
  }
  OnEnter(t) {
    this.HandleDestroyEffect()
  }
  OnDestroy() {
    this.ClearState()
  }
  HandleDestroyEffect() {
    2 === this.Owner.Entity.GetComponent(0).GetSubEntityType() ? this.HandlePasserbyNpcDestroyEffect() : this.HandleCommonNpcDestroyEffect()
  }
  HandlePasserbyNpcDestroyEffect() {
    this.ActorComp.Actor.DitherEffectController?.EnterDisappearEffect(MathUtils_1.MathUtils.SecondToMillisecond / NpcPerformComponent_1.DEFUALT_DITHER_TIME, 1, !0), TimerSystem_1.TimerSystem.Delay(() => {
      ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Owner?.Entity)
    }, NpcPerformComponent_1.DEFUALT_DITHER_TIME)
  }
  HandleCommonNpcDestroyEffect() {
    this.HandleDeathMontage(), this.HandleDeathMaterialEffect()
  }
  HandleDeathMontage() {
    let t = void 0;
    if (t = this.DeathMontage ? this.DeathMontage.IsAbp ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(this.DeathMontage.MontageId) : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(this.DeathMontage.MontageId) : t) {
      const s = {
        InitStateName: t?.InitState,
        EndStatename: t?.EndState
      };
      ResourceSystem_1.ResourceSystem.LoadAsync(t.ActionMontage, UE.AnimMontage, (t, e) => {
        this.DeathMontageReady = !0, this.DeathMontageAsset = t, this.DeathMontageState = s, this.WaitAssetLoadedComplete()
      })
    } else this.DeathMontageReady = !0, this.WaitAssetLoadedComplete()
  }
  HandleDeathMaterialEffect() {
    this.DeathMaterialEffectPath && "" !== this.DeathMaterialEffectPath ? ResourceSystem_1.ResourceSystem.LoadAsync(this.DeathMaterialEffectPath, UE.PrimaryDataAsset, (t, e) => {
      this.DeathMaterialEffectReady = !0, this.DeathMaterialEffectAsset = t, this.WaitAssetLoadedComplete()
    }) : (this.DeathMaterialEffectReady = !0, this.WaitAssetLoadedComplete())
  }
  WaitAssetLoadedComplete() {
    var t;
    this?.ActorComp?.Actor?.IsValid() && this.DeathMontageReady && this.DeathMaterialEffectReady && (this.DeathMaterialEffectAsset?.IsValid() && (t = this.DeathMaterialEffectAsset, t = this.PerformComp?.MaterialController?.ApplyMaterialEffectByAsset(t), this.DeathMaterialEffectInfo = this.PerformComp?.MaterialController?.GetMaterialInfo(t), this.TryAddDeathMaterialEffectEvents(), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("NPC", 50, "播放销毁材质表现", ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()], ["Path", this.DeathMaterialEffectPath], ["Type", this.DeathMaterialEffectInfo?.Type], ["Time", this.DestroyTime]), this.DeathMontageAsset?.IsValid() && (t = this.DeathMontageAsset.SequenceLength * MathUtils_1.MathUtils.SecondToMillisecond, 0 === this.DestroyTime && (this.DestroyTime = t), this.PerformComp?.ClearAction(), this.PerformComp?.PlayPerformMontage(3, {
      MontageAsset: this.DeathMontageAsset,
      AnimStateParam: this.DeathMontageState,
      IsLoop: !1
    }), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("NPC", 50, "播放销毁Montage", ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()], ["Montage", this.DeathMontageAsset.GetName()], ["Time", t]), this.NeedDisappearEffect && (0 === this.DestroyTime && (this.DestroyTime = NpcPerformComponent_1.DEFUALT_DITHER_TIME), this.ActorComp.Actor.DitherEffectController?.EnterDisappearEffect(MathUtils_1.MathUtils.SecondToMillisecond / this.DestroyTime, 1, !1)), this.HandleDelayRemove())
  }
  HandleDelayRemove() {
    0 === this.DestroyTime ? ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Owner.Entity) : this.DestroyHandle = TimerSystem_1.TimerSystem.Delay(() => {
      this.DestroyHandle = void 0, ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Owner?.Entity)
    }, this.DestroyTime)
  }
  TryAddDeathMaterialEffectEvents() {
    if (this.ActorComp && this.DeathMaterialEffectInfo) {
      var t = this.DeathMaterialEffectAsset;
      switch (this.DeathMaterialEffectInfo.Type) {
        case 1:
          this.DestroyTime = (t.Start + t.Loop) * MathUtils_1.MathUtils.SecondToMillisecond;
          break;
        case 2:
          this.DestroyTime = DEFAULT_MAX_DEATH_MAT_EFFECT_TIME * MathUtils_1.MathUtils.SecondToMillisecond, EventSystem_1.EventSystem.AddWithTarget(this.ActorComp.Actor.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, this.OnDeathMatEffectEnd);
          break;
        case 3:
          this.DestroyTime = DEFAULT_MAX_DEATH_MAT_EFFECT_TIME * MathUtils_1.MathUtils.SecondToMillisecond, EventSystem_1.EventSystem.AddWithTarget(this.ActorComp.Actor.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.OnDeathMatEffectEnd)
      }
    }
  }
  TryRemoveDeathMaterialEffectEvents() {
    var t;
    this.ActorComp?.Actor.CharRenderingComponent && (t = this.ActorComp.Actor.CharRenderingComponent, EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnRemoveMaterialController, this.OnDeathMatEffectEnd) && EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.OnRemoveMaterialController, this.OnDeathMatEffectEnd), EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.OnDeathMatEffectEnd)) && EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.OnDeathMatEffectEnd)
  }
  ClearState() {
    this.TryRemoveDeathMaterialEffectEvents(), this.DestroyHandle && TimerSystem_1.TimerSystem.Remove(this.DestroyHandle), this.DestroyHandle = void 0, this.DeathMaterialEffectInfo = void 0
  }
}
exports.NpcPerformDestroyState = NpcPerformDestroyState;
//# sourceMappingURL=NpcPerformDestroyState.js.map
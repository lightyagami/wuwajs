"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPerformDestroyState = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NpcPerformComponent_1 = require("../Component/NpcPerformComponent");
const NpcPerformBaseState_1 = require("./NpcPerformBaseState");
const DEFAULT_MAX_DEATH_MAT_EFFECT_TIME = 20;
class NpcPerformDestroyState extends NpcPerformBaseState_1.NpcPerformBaseState {
  constructor() {
    super(...arguments);
    this.DeathMontage = undefined;
    this.DeathMontageAsset = undefined;
    this.DeathMontageState = undefined;
    this.DeathMontageReady = false;
    this.DeathMaterialEffectPath = undefined;
    this.DeathMaterialEffectAsset = undefined;
    this.DeathMaterialEffectReady = false;
    this.DeathMaterialEffectInfo = undefined;
    this.NeedDisappearEffect = false;
    this.DestroyTime = 0;
    this.DestroyHandle = undefined;
    this.OnDeathMatEffectEnd = t => {
      if (t === this.DeathMaterialEffectInfo?.Handle) {
        this.ClearState();
        ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Owner?.Entity);
      }
    };
  }
  OnCreate(t) {
    super.OnCreate(t);
    this.DeathMontage = t?.DeathInteract?.Montage;
    this.DeathMaterialEffectPath = t?.DeathInteract?.MaterialDa;
    var t = this.Owner.Entity.GetComponent(0)?.GetPbEntityInitData();
    if (t) {
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "EntityVisibleComponent");
      this.NeedDisappearEffect = !!t?.UseFadeEffect;
    }
  }
  OnEnter(t) {
    this.HandleDestroyEffect();
  }
  OnDestroy() {
    this.ClearState();
  }
  HandleDestroyEffect() {
    if (this.Owner.Entity.GetComponent(0).GetSubEntityType() === 2) {
      this.HandlePasserbyNpcDestroyEffect();
    } else {
      this.HandleCommonNpcDestroyEffect();
    }
  }
  HandlePasserbyNpcDestroyEffect() {
    this.ActorComp.Actor.DitherEffectController?.EnterDisappearEffect(MathUtils_1.MathUtils.SecondToMillisecond / NpcPerformComponent_1.DEFUALT_DITHER_TIME, 1, true);
    TimerSystem_1.TimerSystem.Delay(() => {
      ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Owner?.Entity);
    }, NpcPerformComponent_1.DEFUALT_DITHER_TIME);
  }
  HandleCommonNpcDestroyEffect() {
    this.HandleDeathMontage();
    this.HandleDeathMaterialEffect();
  }
  HandleDeathMontage() {
    let t = undefined;
    if (t = this.DeathMontage ? this.DeathMontage.IsAbp ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(this.DeathMontage.MontageId) : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(this.DeathMontage.MontageId) : t) {
      const s = {
        InitStateName: t?.InitState,
        EndStatename: t?.EndState
      };
      ResourceSystem_1.ResourceSystem.LoadAsync(t.ActionMontage, UE.AnimMontage, (t, e) => {
        this.DeathMontageReady = true;
        this.DeathMontageAsset = t;
        this.DeathMontageState = s;
        this.WaitAssetLoadedComplete();
      });
    } else {
      this.DeathMontageReady = true;
      this.WaitAssetLoadedComplete();
    }
  }
  HandleDeathMaterialEffect() {
    if (this.DeathMaterialEffectPath && this.DeathMaterialEffectPath !== "") {
      ResourceSystem_1.ResourceSystem.LoadAsync(this.DeathMaterialEffectPath, UE.PrimaryDataAsset, (t, e) => {
        this.DeathMaterialEffectReady = true;
        this.DeathMaterialEffectAsset = t;
        this.WaitAssetLoadedComplete();
      });
    } else {
      this.DeathMaterialEffectReady = true;
      this.WaitAssetLoadedComplete();
    }
  }
  WaitAssetLoadedComplete() {
    var t;
    if (this?.ActorComp?.Actor?.IsValid() && this.DeathMontageReady && this.DeathMaterialEffectReady) {
      if (this.DeathMaterialEffectAsset?.IsValid() && (t = this.DeathMaterialEffectAsset, t = this.PerformComp?.MaterialController?.ApplyMaterialEffectByAsset(t), this.DeathMaterialEffectInfo = this.PerformComp?.MaterialController?.GetMaterialInfo(t), this.TryAddDeathMaterialEffectEvents(), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("NPC", 50, "播放销毁材质表现", ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()], ["Path", this.DeathMaterialEffectPath], ["Type", this.DeathMaterialEffectInfo?.Type], ["Time", this.DestroyTime]);
      }
      if (this.DeathMontageAsset?.IsValid() && (t = this.DeathMontageAsset.SequenceLength * MathUtils_1.MathUtils.SecondToMillisecond, this.DestroyTime === 0 && (this.DestroyTime = t), this.PerformComp?.ClearAction(), this.PerformComp?.PlayPerformMontage(3, {
        MontageAsset: this.DeathMontageAsset,
        AnimStateParam: this.DeathMontageState,
        IsLoop: false
      }), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("NPC", 50, "播放销毁Montage", ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()], ["Montage", this.DeathMontageAsset.GetName()], ["Time", t]);
      }
      if (this.NeedDisappearEffect) {
        if (this.DestroyTime === 0) {
          this.DestroyTime = NpcPerformComponent_1.DEFUALT_DITHER_TIME;
        }
        this.ActorComp.Actor.DitherEffectController?.EnterDisappearEffect(MathUtils_1.MathUtils.SecondToMillisecond / this.DestroyTime, 1, false);
      }
      this.HandleDelayRemove();
    }
  }
  HandleDelayRemove() {
    if (this.DestroyTime === 0) {
      ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Owner.Entity);
    } else {
      this.DestroyHandle = TimerSystem_1.TimerSystem.Delay(() => {
        this.DestroyHandle = undefined;
        ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Owner?.Entity);
      }, this.DestroyTime);
    }
  }
  TryAddDeathMaterialEffectEvents() {
    if (this.ActorComp && this.DeathMaterialEffectInfo) {
      var t = this.DeathMaterialEffectAsset;
      switch (this.DeathMaterialEffectInfo.Type) {
        case 1:
          this.DestroyTime = (t.Start + t.Loop) * MathUtils_1.MathUtils.SecondToMillisecond;
          break;
        case 2:
          this.DestroyTime = DEFAULT_MAX_DEATH_MAT_EFFECT_TIME * MathUtils_1.MathUtils.SecondToMillisecond;
          EventSystem_1.EventSystem.AddWithTarget(this.ActorComp.Actor.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, this.OnDeathMatEffectEnd);
          break;
        case 3:
          this.DestroyTime = DEFAULT_MAX_DEATH_MAT_EFFECT_TIME * MathUtils_1.MathUtils.SecondToMillisecond;
          EventSystem_1.EventSystem.AddWithTarget(this.ActorComp.Actor.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.OnDeathMatEffectEnd);
      }
    }
  }
  TryRemoveDeathMaterialEffectEvents() {
    var t;
    if (this.ActorComp?.Actor?.CharRenderingComponent && (t = this.ActorComp.Actor.CharRenderingComponent, EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnRemoveMaterialController, this.OnDeathMatEffectEnd) && EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.OnRemoveMaterialController, this.OnDeathMatEffectEnd), EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.OnDeathMatEffectEnd))) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.OnDeathMatEffectEnd);
    }
  }
  ClearState() {
    this.TryRemoveDeathMaterialEffectEvents();
    if (this.DestroyHandle) {
      TimerSystem_1.TimerSystem.Remove(this.DestroyHandle);
    }
    this.DestroyHandle = undefined;
    this.DeathMaterialEffectInfo = undefined;
  }
}
exports.NpcPerformDestroyState = NpcPerformDestroyState;
//# sourceMappingURL=NpcPerformDestroyState.js.map
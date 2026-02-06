"use strict";

var SceneItemSunSpiritGearComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, r) {
  var s;
  var n = arguments.length;
  var o = n < 3 ? i : r === null ? r = Object.getOwnPropertyDescriptor(i, e) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, i, e, r);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (s = t[h]) {
        o = (n < 3 ? s(o) : n > 3 ? s(i, e, o) : s(i, e)) || o;
      }
    }
  }
  if (n > 3 && o) {
    Object.defineProperty(i, e, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemSunSpiritGearComponent = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const GlobalData_1 = require("../../GlobalData");
const SunSpiritCrowdPerform_1 = require("../../LevelGamePlay/SunSpirit/SunSpiritPerform/SunSpiritCrowdPerform");
const SunSpiritOccupiedByGearState_1 = require("../../LevelGamePlay/SunSpirit/SunSpiritState/SunSpiritOccupiedByGearState");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const MANUAL_TICK_INTERVAL = 25;
const SCALE_SPEED = 0.05;
let SceneItemSunSpiritGearComponent = SceneItemSunSpiritGearComponent_1 = class SceneItemSunSpiritGearComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.Hte = undefined;
    this.Lie = undefined;
    this.Stg = undefined;
    this.Ssm = undefined;
    this.Msm = undefined;
    this.wzi = Vector_1.Vector.Create(Vector_1.Vector.OneVectorProxy);
    this.X1t = Vector_1.Vector.Create(Vector_1.Vector.OneVectorProxy);
    this.Y0f = Transform_1.Transform.Create();
    this.z0f = Vector_1.Vector.Create();
    this.Esm = () => {
      if (!this.EIe?.GetRemoveState() && this.Hte?.GetIsSceneInteractionLoadCompleted()) {
        if (this.Msm) {
          for (var [t, i] of this.Msm) {
            this.Mvf(t, i);
          }
        }
        this.J0f(true);
      }
    };
    this.Evf = () => {
      this.Ivf("SceneItemSunSpiritGearComponent.OnSceneInteractionHide");
      this.wzi.DeepCopy(Vector_1.Vector.OneVectorProxy);
    };
    this.veg = undefined;
    this.yeg = t => {
      if (!this.EIe?.GetRemoveState()) {
        if (this.Hte?.GetIsSceneInteractionLoadCompleted()) {
          this.Seg(t);
        }
      }
    };
    this.Tvf = undefined;
    this.Mtg = t => {
      if (this.Tvf?.IsValid()) {
        this.Tvf.KuroTickActorOutside(t);
      }
    };
    this.Meg = 0;
  }
  OnInitData(t) {
    t = t.GetParam(SceneItemSunSpiritGearComponent_1)[0];
    if (t) {
      this.Ssm = t.PerformConfig;
    }
    this.EIe = this.Entity.GetComponent(0);
    t = this.EIe?.ComponentDataMap.get("iom")?.iom;
    t = t?.nom;
    if (t) {
      ControllerHolder_1.ControllerHolder.SunSpiritController.OnEntityInitSetSunSpirit(t);
      var i = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
      var e = this.EIe.GetPbDataId();
      for (const n of t) {
        var r;
        var s = ModelManager_1.ModelManager.SunSpiritModel.GetSunSpiritDataByPlayerIdAndConfigId(i, n.r6n, n.A5n);
        if (s && (r = s.GetSunSpiritState()) instanceof SunSpiritOccupiedByGearState_1.SunSpiritOccupiedByGearState && r.GearConfigId === e) {
          this.OnSunSpiritTakeUp(s, r.GearSocketIndex);
        }
      }
    }
    return true;
  }
  OnInit() {
    this.Hte = this.Entity.GetComponent(214);
    this.Lie = this.Entity.GetComponent(217);
    this.Stg = this.Entity.GetComponent(150);
    return true;
  }
  OnActivate() {
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionShowCompleted, this.Esm)) {
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.Entity, EventDefine_1.EEventName.OnSceneInteractionShowCompleted, this.Esm);
    }
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionHideCompleted, this.Evf)) {
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.Entity, EventDefine_1.EEventName.OnSceneInteractionHideCompleted, this.Evf);
    }
    if (this.Hte?.GetIsSceneInteractionLoadCompleted()) {
      this.Esm();
    }
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    this.Ivf("SceneItemSunSpiritGearComponent.OnEnd");
    return true;
  }
  OnClear() {
    return true;
  }
  Eeg() {
    this.Ieg();
    this.veg = TimerSystem_1.GameplayTimerSystem.Forever(this.yeg, MANUAL_TICK_INTERVAL);
  }
  Ieg() {
    if (this.veg?.Valid()) {
      this.veg.Remove();
    }
    this.veg = undefined;
  }
  Mvf(t, i) {
    var e;
    var r;
    var s;
    if (this.GetSunSpiritPerformType() === "ToGearRelativePos" && !this.EIe?.GetRemoveState()) {
      if (this.Hte?.GetIsSceneInteractionLoadCompleted()) {
        if (s = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritDataById(t)) {
          if (e = this.bvf()) {
            if (r = this.wvf(i)) {
              if ((s = s.GetSunSpiritPerform()) instanceof SunSpiritCrowdPerform_1.SunSpiritCrowdPerform) {
                if (s = s.GetCrowdAiBoidId()) {
                  e.AddRoute(r, s);
                } else if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("SunSpirit", 39, "日灵: 机关绑定日灵失败，拿不到日灵的BoidId", ["GearConfigId", this.EIe?.GetPbDataId()], ["GearIndex", i], ["SunSpiritId", t]);
                }
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("SunSpirit", 39, "日灵: 机关绑定日灵失败，日灵非GpuNpc集群表现", ["GearConfigId", this.EIe?.GetPbDataId()], ["GearIndex", i], ["SunSpiritId", t]);
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("SunSpirit", 39, "日灵: 机关绑定日灵失败，拿不到ProxyActor", ["GearConfigId", this.EIe?.GetPbDataId()], ["GearIndex", i], ["SunSpiritId", t]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SunSpirit", 39, "日灵: 机关绑定日灵失败，拿不到路由Actor", ["GearConfigId", this.EIe?.GetPbDataId()], ["GearIndex", i], ["SunSpiritId", t]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SunSpirit", 39, "日灵: 机关绑定日灵失败，拿不到日灵数据", ["GearConfigId", this.EIe?.GetPbDataId()], ["GearIndex", i], ["SunSpiritId", t]);
        }
      }
    }
  }
  Rvf(t, i) {
    var e;
    var r;
    if (this.GetSunSpiritPerformType() === "ToGearRelativePos" && !this.EIe?.GetRemoveState()) {
      if (this.Hte?.GetIsSceneInteractionLoadCompleted()) {
        if (e = this.bvf(false)) {
          if (r = this.wvf(i)) {
            e.RemoveRouteByProxyActor(r);
          } else {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("SunSpirit", 39, "日灵: 机关取消绑定日灵时，找不到绑定的ProxyActor，无法通过ProxyActor解绑", ["GearConfigId", this.EIe?.GetPbDataId()], ["GearIndex", i], ["SunSpiritId", t]);
            }
            if (r = (r = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritDataById(t)?.GetSunSpiritPerform()) instanceof SunSpiritCrowdPerform_1.SunSpiritCrowdPerform ? r.GetCrowdAiBoidId() : undefined) {
              e.RemoveRouteByBoidId(r);
            } else if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("SunSpirit", 39, "日灵: 机关取消绑定日灵时，找不到绑定的BoidId，无法通过BoidId解绑", ["GearConfigId", this.EIe?.GetPbDataId()], ["GearIndex", i], ["SunSpiritId", t]);
            }
          }
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SunSpirit", 39, "日灵: 机关取消绑定日灵时，已经拿不到路由Actor，无需再处理解绑", ["GearConfigId", this.EIe?.GetPbDataId()], ["GearIndex", i], ["SunSpiritId", t]);
        }
      }
    }
  }
  bvf(t = true) {
    if (!this.Tvf?.IsValid()) {
      this.Tvf = undefined;
      if (t) {
        t = ActorSystem_1.ActorSystem.Get(UE.KuroCrowdAiBoidInstanceSequenceProxyRouter.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
        this.Tvf = t?.IsValid() ? t : undefined;
      }
      if (this.Tvf) {
        if (this.Etg() && this.Stg) {
          this.Tvf.SetKuroOnlyTickOutside(true);
          this.Tvf.SetActorTickEnabled(false);
          this.Stg.RegisterAfterElevatorTickHandler(this, this.Mtg);
        } else {
          this.Tvf.SetKuroOnlyTickOutside(false);
          this.Tvf.SetActorTickEnabled(true);
        }
      }
    }
    return this.Tvf;
  }
  Ivf(t) {
    if (this.Tvf?.IsValid()) {
      this.Tvf.ClearRoute();
      this.Tvf.SetActorTickEnabled(false);
      this.Tvf.SetKuroOnlyTickOutside(false);
      ActorSystem_1.ActorSystem.Put(t, this.Tvf);
    }
    this.Tvf = undefined;
    if (this.Etg() && this.Stg) {
      this.Stg.UnRegisterAfterElevatorTickHandlers(this);
    }
  }
  wvf(t) {
    if (this.Hte?.GetIsSceneInteractionLoadCompleted()) {
      t = this.Hte.GetReferenceActor("SunSpiritProxy" + t);
      if (t?.IsValid() && t instanceof UE.KuroCrowdAiBoidInstanceSequenceProxy) {
        return t;
      }
    }
  }
  Etg() {
    var t = this.EIe?.GetPbEntityInitData();
    return !!t && !!(0, IComponent_1.getComponent)(t.ComponentsData, "LiftComponent");
  }
  GetSunSpiritPerformType() {
    return this.Ssm?.Type;
  }
  GetSunSpiritSocketLocAndRot(t, i, e) {
    return !!this.EIe && !!this.Hte && !(this.Ssm?.Type === "ToGearRelativePos" && (t = this.wvf(t)) ? (i?.FromUeVector(t.D_K2_GetActorLocation()), e?.FromUeQuat(t.K2_GetActorQuaternion())) : (i?.DeepCopy(this.Hte.ActorLocationProxy), e?.DeepCopy(this.Hte.ActorQuatProxy)), 0);
  }
  GetSunSpiritSocketTransform(t, i) {
    if (!this.EIe || !this.Hte) {
      return false;
    }
    switch (this.Ssm?.Type) {
      case "ToGearRelativePos":
        var e = this.wvf(t);
        if (e) {
          i.FromUeTransform(e.D_GetTransform());
        } else {
          i.FromUeTransform(this.Hte.ActorTransform);
          i.SetScale3D(Vector_1.Vector.OneVectorProxy);
        }
        return true;
      case "ScaleUp":
        i.FromUeTransform(this.Hte.ActorTransform);
        i.SetScale3D(Vector_1.Vector.OneVectorProxy);
        return true;
      default:
        i.FromUeTransform(this.Hte.ActorTransform);
        return true;
    }
  }
  GetNumOfSunSpiritOccupiedByMe() {
    return this.Msm?.size ?? 0;
  }
  OnSunSpiritTakeUp(t, i) {
    if (this.Msm?.get(t.SunSpiritId) !== i) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SunSpirit", 39, "日灵: 机关捕获日灵", ["GearConfigId", this.EIe?.GetPbDataId()], ["GearIndex", i], ["SunSpiritConfigId", t.ConfigId], ["SunSpiritId", t.SunSpiritId]);
      }
      this.Msm ||= new Map();
      this.Msm.set(t.SunSpiritId, i);
      this.Mvf(t.SunSpiritId, i);
      this.J0f(false);
    }
  }
  OnSunSpiritRelease(t, i) {
    if (this.Msm?.has(t.SunSpiritId)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SunSpirit", 39, "日灵: 机关释放日灵", ["GearConfigId", this.EIe?.GetPbDataId()], ["GearIndex", i], ["SunSpiritConfigId", t.ConfigId], ["SunSpiritId", t.SunSpiritId]);
      }
      this.Msm?.delete(t.SunSpiritId);
      this.Rvf(t.SunSpiritId, i);
      this.J0f(false);
      if (!this.Msm.size) {
        this.Ivf("SceneItemSunSpiritGearComponent.OnSunSpiritRelease 机关持有日灵数量为空");
      }
    }
  }
  J0f(t) {
    if (!this.EIe?.GetRemoveState()) {
      if (this.Hte?.GetIsSceneInteractionLoadCompleted() && this.Ssm?.Type === "ScaleUp") {
        this.Z0f(t);
      }
    }
  }
  eCf(t) {
    var i;
    var e;
    if (this.Ssm?.Type === "ScaleUp") {
      i = this.GetNumOfSunSpiritOccupiedByMe();
      if ((e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(this.EIe?.GetPbDataId())) && e.IsScaleEnabled && e.Transform) {
        t.Set(e.Transform.Scale?.X ?? 1, e.Transform.Scale?.Y ?? 1, e.Transform.Scale?.Z ?? 1);
      } else {
        t.Set(1, 1, 1);
      }
      e = i * this.Ssm.Scale;
      t.AdditionEqual(e);
    }
  }
  Z0f(t) {
    var i;
    var e;
    if (this.Ssm?.Type === "ScaleUp" && this.Hte && (this.z0f.DeepCopy(this.wzi), this.eCf(this.wzi), Log_1.Log.CheckInfo() && Log_1.Log.Info("SunSpirit", 39, "日灵: 机关缩放", ["GearConfigId", this.EIe?.GetPbDataId()], ["OldScale", this.z0f], ["NewScale", this.wzi], ["bInit", t]), i = this.Meg, e = this.GetNumOfSunSpiritOccupiedByMe(), this.Meg = e, t ? this.Seg(0) : this.Eeg(), t && this.Ssm.ScaleUpPerformConfig?.IsInitHide && e === 0 ? this.Hte.SetSceneItemActorHide(true) : this.Hte.SetSceneItemActorHide(false), this.Y0f.FromUeTransform(this.Hte.ActorTransform), this.Y0f.SetScale3D(Vector_1.Vector.OneVectorProxy), i < e) && (i === 0 ? this.Ssm.ScaleUpPerformConfig?.AppearEffectDa && EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, this.Y0f.ToUeTransform(), this.Ssm.ScaleUpPerformConfig.AppearEffectDa, "[SceneItemSunSpiritGearComponent] PlayAppearEffect") : this.Ssm.ScaleUpPerformConfig?.ScaleUpEffectDa && EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, this.Y0f.ToUeTransform(), this.Ssm.ScaleUpPerformConfig.ScaleUpEffectDa, "[SceneItemSunSpiritGearComponent] PlayScaleUpEffect"), this.Ssm.ScaleUpPerformConfig?.ScaleUpPerformTag)) {
      if (this.Lie?.HasTag(this.Ssm.ScaleUpPerformConfig.ScaleUpPerformTag)) {
        this.Lie.RemoveTag(this.Ssm.ScaleUpPerformConfig.ScaleUpPerformTag);
      }
      this.Lie?.AddTag(this.Ssm.ScaleUpPerformConfig.ScaleUpPerformTag);
    }
  }
  Seg(i) {
    if (!this.EIe?.GetRemoveState()) {
      var t = this.Hte?.GetInteractionMainActor();
      if (t?.IsValid()) {
        if (i <= 0) {
          this.X1t.DeepCopy(this.wzi);
          this.Ieg();
        } else {
          var e = this.wzi.X - this.X1t.X;
          let t = 1;
          if (MathUtils_1.MathUtils.IsNearlyZero(e)) {
            this.Ieg();
            return;
          }
          t = MathUtils_1.MathUtils.Clamp(Math.abs(SCALE_SPEED * i / e), 0, 1);
          i = MathUtils_1.MathUtils.Lerp(this.X1t.X, this.wzi.X, t);
          this.X1t.Set(i, i, i);
        }
        t.D_SetActorScale3D(this.X1t.ToUeVector());
      }
    }
  }
  GetDebugString() {
    let t = `占用日灵数量=${this.Msm?.size ?? 0}
`;
    if (this.Msm && this.Msm.size > 0) {
      for (var [i, e] of this.Msm) {
        var r = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritDataById(i);
        t += `	ID=${i} 配置ID=${r?.ConfigId} 插槽ID=${e}
`;
      }
    }
    return t;
  }
};
SceneItemSunSpiritGearComponent = SceneItemSunSpiritGearComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(336)], SceneItemSunSpiritGearComponent);
exports.SceneItemSunSpiritGearComponent = SceneItemSunSpiritGearComponent; //# sourceMappingURL=SceneItemSunSpiritGearComponent.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeamlessTravelKeepKite = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const DEFAULT_KITE_SKELETAL_MESH_PATH = "/Game/Aki/Character/NPC/AlienNPC/Level_C/SC1Fengzheng/Model/SC1Fengzheng.SC1Fengzheng";
const DEFAULT_KITE_ANIM_PATH = "/Game/Aki/Character/NPC/AlienNPC/Level_C/SC1Fengzheng/CommonAnim/SC1Fengzheng_State03_Montage.SC1Fengzheng_State03_Montage";
const KITE_HOOK_BEAM_EFFECT_PATH = "/Game/Aki/Effect/Niagara/NI_Common/NS_Fx_Hook_Beam1.NS_Fx_Hook_Beam1";
const KITE_HOOK_BALL_EFFECT_PATH = "/Game/Aki/Effect/Niagara/NI_Common/NS_Fx_Hook_Maodian.NS_Fx_Hook_Maodian";
const KITE_HOOK_BEAM_OWNER_SOCKET = "Bip001LHand";
const KITE_HOOK_BEAM_NIAGARA_ENDPOS_VAR = "end";
const KITE_ACTOR_REF_NAME = "Fengzheng";
class SeamlessTravelKeepKite {
  constructor() {
    this.Hte = undefined;
    this.nx = undefined;
    this.cl1 = false;
    this.mQo = false;
    this.h41 = undefined;
    this.l41 = undefined;
    this._41 = 0;
    this.u41 = undefined;
    this.c41 = undefined;
    this.d41 = undefined;
    this.f41 = undefined;
    this.g41 = undefined;
    this.C41 = undefined;
    this.X9c = undefined;
    this.V$o = Transform_1.Transform.Create();
    this.Tdc = Vector_1.Vector.Create();
    this.p41 = "";
    this.v41 = "";
    this.y41 = "";
    this.J2u = Transform_1.Transform.Create();
    this.M41 = Transform_1.Transform.Create();
    this.E41 = Vector_1.Vector.Create();
    this.Y9c = undefined;
    this.z9c = undefined;
    this.I41 = undefined;
  }
  get IsInit() {
    return this.cl1;
  }
  get IsActive() {
    return this.mQo;
  }
  Init(t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 39, "[无缝传送KeepKite] 初始化KeepKite(开始)");
    }
    this.Hte = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (this.Hte) {
      if (this.IsInit) {
        i?.(true);
      } else {
        this.nx = t;
        if (this.nx) {
          this.p41 = KITE_HOOK_BEAM_EFFECT_PATH;
          this.v41 = KITE_HOOK_BALL_EFFECT_PATH;
          this.y41 = KITE_HOOK_BEAM_OWNER_SOCKET;
          this.I41 = i;
          if (!this.h41?.IsValid()) {
            ResourceSystem_1.ResourceSystem.LoadAsync(DEFAULT_KITE_SKELETAL_MESH_PATH, UE.SkeletalMesh, t => {
              if (t?.IsValid()) {
                this.h41 = t;
                this.T41();
              } else {
                this.b41();
              }
            });
          }
          if (!this.l41?.IsValid()) {
            ResourceSystem_1.ResourceSystem.LoadAsync(DEFAULT_KITE_ANIM_PATH, UE.AnimationAsset, t => {
              if (t?.IsValid()) {
                this.l41 = t;
                this.T41();
              } else {
                this.b41();
              }
            });
          }
          if (!this.c41?.IsValid()) {
            ResourceSystem_1.ResourceSystem.LoadAsync(this.p41, UE.NiagaraSystem, t => {
              if (t?.IsValid()) {
                this.c41 = t;
                this.T41();
              } else {
                this.b41();
              }
            });
          }
          if (!this.d41?.IsValid()) {
            ResourceSystem_1.ResourceSystem.LoadAsync(this.v41, UE.NiagaraSystem, t => {
              if (t?.IsValid()) {
                this.d41 = t;
                this.T41();
              } else {
                this.b41();
              }
            });
          }
          this.T41();
        } else {
          i?.(false);
        }
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Teleport", 39, "[无缝传送KeepKite] 初始化失败，无效的ActorComp", ["ActorName", Global_1.Global.BaseCharacter?.GetName()]);
      }
      i?.(false);
    }
  }
  b41() {
    var t = this.I41;
    this.I41 = undefined;
    t?.(false);
  }
  R41() {
    var t = this.I41;
    this.I41 = undefined;
    t?.(true);
  }
  T41() {
    if (!this.IsInit) {
      if (this.h41?.IsValid() && this.l41?.IsValid() && this.c41?.IsValid() && this.d41?.IsValid()) {
        this.L41();
      }
    }
  }
  L41() {
    var t;
    if (this.Hte?.Actor?.IsValid() && (this.u41 = ActorSystem_1.ActorSystem.Get(UE.SkeletalMeshActor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble), this.f41 = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble), this.g41 = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble), this.u41?.IsValid()) && this.f41?.IsValid() && this.g41?.IsValid() && (GlobalData_1.GlobalData.IsPlayInEditor && (this.u41.SetActorLabel("SeamlessTravel_KiteActor"), this.f41.SetActorLabel("SeamlessTravel_BeamActor"), this.g41.SetActorLabel("SeamlessTravel_BallActor")), (t = this.u41.GetSkeletalMeshComponent())?.IsValid())) {
      t.SetSkeletalMesh(this.h41);
      t.PlayAnimation(this.l41, true);
      if (this._41) {
        t.SetPosition(this._41);
      }
      t.VisibilityBasedAnimTickOption = 0;
      this.u41.SetActorHiddenInGame(true);
      this.C41 = this.f41.AddComponentByClass(UE.NiagaraComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
      this.C41.SetAsset(this.c41);
      TimerSystem_1.TimerSystem.Next(() => {
        UE.KuroEffectLibrary.SetNiagaraSimulationMinDeltaTime(this.C41, -1);
      });
      this.f41.K2_AttachToComponent(this.Hte.Actor.Mesh, FNameUtil_1.FNameUtil.GetDynamicFName(this.y41), 2, 2, 2, false);
      this.f41.SetActorHiddenInGame(true);
      this.X9c = this.g41.AddComponentByClass(UE.NiagaraComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
      this.X9c.SetAsset(this.d41);
      TimerSystem_1.TimerSystem.Next(() => {
        UE.KuroEffectLibrary.SetNiagaraSimulationMinDeltaTime(this.X9c, -1);
        UE.KuroEffectLibrary.SetNiagaraFrameDeltaTime(this.X9c, 1);
      });
      this.g41.SetActorHiddenInGame(true);
      this.UpdateKeepKite();
      this.cl1 = true;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 39, "[无缝传送KeepKite] 初始化KeepKite(完成)");
      }
      this.R41();
    } else {
      this.b41();
    }
  }
  Tick(t) {
    if (this.IsInit && this.IsActive) {
      this.UpdateKeepKite();
    }
  }
  UpdateKeepKite() {
    var t;
    var i;
    if (this.u41?.IsValid() && (this.Hte?.Actor.IsValid() && this.u41.D_K2_SetActorTransform(this.w41(this.M41).ToUeTransform(), false, undefined, true), t = this.A41(this.E41), this.C41?.IsValid() && (i = UE.KismetMathLibrary.WD_WorldToLocal(GlobalData_1.GlobalData.World, t.ToUeVector()), this.C41.SetNiagaraVariableVec3(KITE_HOOK_BEAM_NIAGARA_ENDPOS_VAR, i)), this.g41?.IsValid())) {
      this.g41.D_K2_SetActorLocation(t.ToUeVector(), false, undefined, true);
    }
  }
  Destroy() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 39, "[无缝传送KeepKite] 清理KeepKite");
    }
    this.cl1 = false;
    this.c41 = undefined;
    this.C41 = undefined;
    ActorSystem_1.ActorSystem.Put("SeamlessTravelKeepKite.Destroy", this.f41);
    this.f41 = undefined;
    this.d41 = undefined;
    this.X9c = undefined;
    ActorSystem_1.ActorSystem.Put("SeamlessTravelKeepKite.Destroy", this.g41);
    this.g41 = undefined;
    this.h41 = undefined;
    this.l41 = undefined;
    this._41 = 0;
    ActorSystem_1.ActorSystem.Put("SeamlessTravelKeepKite.Destroy", this.u41);
    this.u41 = undefined;
    this.Hte = undefined;
    this.nx = undefined;
  }
  AppearEffect(t) {
    var i;
    var s;
    var e;
    if (this.IsInit) {
      if (this.IsActive) {
        t?.(true);
      } else if (this.u41?.IsValid() && this.Hte?.Actor.IsValid()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "[无缝传送KeepKite] 显示效果");
        }
        this.mQo = true;
        this.u41.SetActorHiddenInGame(false);
        this.f41?.SetActorHiddenInGame(false);
        this.g41?.SetActorHiddenInGame(false);
        i = this.Hte.SkeletalMesh;
        s = this.Hte.Entity.GetComponent(81)?.Hulu;
        e = this.u41.SkeletalMeshComponent;
        if (i?.IsValid()) {
          this.Y9c = i.bCastHiddenShadow;
          i.bCastHiddenShadow = true;
        }
        if (s?.IsValid()) {
          this.z9c = s.bCastHiddenShadow;
          s.bCastHiddenShadow = true;
        }
        if (e?.IsValid()) {
          e.bCastHiddenShadow = true;
        }
        if (this.C41?.IsValid()) {
          this.C41.bCastHiddenShadow = true;
        }
        if (this.X9c?.IsValid()) {
          this.X9c.bCastHiddenShadow = true;
        }
        t?.(true);
      } else {
        t?.(false);
      }
    } else {
      t?.(false);
    }
  }
  DisappearEffect(t) {
    var i;
    var s;
    var e;
    if (this.IsInit) {
      if (this.IsActive && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 39, "[无缝传送KeepKite] 隐藏效果"), this.mQo = false, this.u41?.SetActorHiddenInGame(true), this.f41?.SetActorHiddenInGame(true), this.g41?.SetActorHiddenInGame(true), i = this.Hte?.SkeletalMesh, s = this.Hte?.Entity.GetComponent(81)?.Hulu, e = this.u41?.SkeletalMeshComponent, i?.IsValid() && this.Y9c !== undefined && (i.bCastHiddenShadow = this.Y9c), s?.IsValid() && this.z9c !== undefined && (s.bCastHiddenShadow = this.z9c), e?.IsValid() && (e.bCastHiddenShadow = false), this.C41?.IsValid() && (this.C41.bCastHiddenShadow = false), this.X9c?.IsValid())) {
        this.X9c.bCastHiddenShadow = false;
      }
      t?.(true);
    } else {
      t?.(false);
    }
  }
  SetInitData(t, i) {
    var t = t.GetComponent(202);
    var s = t.GetActorInSceneInteraction(KITE_ACTOR_REF_NAME);
    var t = t.Owner?.D_GetTransform() ?? t.ActorTransform;
    var e = s?.D_GetTransform() ?? t;
    var i = i.GetComponent(1);
    var h = i.ActorTransform;
    this.V$o.FromUeTransform(e.GetRelativeTransform(h));
    this.Tdc.DeepCopy(i.ActorGravityDirectProxy);
    this.J2u.FromUeTransform(t.GetRelativeTransform(e));
    if (s instanceof UE.SkeletalMeshActor) {
      h = s.GetSkeletalMeshComponent();
      this.h41 = h?.SkeletalMesh;
      i = h?.GetAnimInstance();
      this.l41 = i?.GetCurrentActiveMontage();
      this._41 = i?.Montage_GetPosition(undefined) ?? 0;
    }
  }
  A41(t) {
    var i;
    if (this.u41?.IsValid()) {
      i = this.J2u.ToUeTransform().op_Multiply(this.u41.D_GetTransform());
      t.DeepCopy(i.GetLocation());
    }
    return t;
  }
  w41(t) {
    if (this.Hte?.Actor.IsValid()) {
      t.FromUeTransform(this.V$o.ToUeTransform().op_Multiply(this.Hte.Actor.D_GetTransform()));
    }
    return t;
  }
  GetSeamlessTravelActors(t) {
    if (this.u41) {
      t.push(this.u41);
    }
    if (this.f41) {
      t.push(this.f41);
    }
    if (this.g41) {
      t.push(this.g41);
    }
    return t;
  }
}
exports.SeamlessTravelKeepKite = SeamlessTravelKeepKite;
//# sourceMappingURL=SeamlessTravelKeepKite.js.map
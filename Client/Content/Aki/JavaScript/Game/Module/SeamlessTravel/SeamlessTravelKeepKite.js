"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SeamlessTravelKeepKite = void 0;
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  DEFAULT_KITE_SKELETAL_MESH_PATH = "/Game/Aki/Character/NPC/AlienNPC/Level_C/SC1Fengzheng/Model/SC1Fengzheng.SC1Fengzheng",
  DEFAULT_KITE_ANIM_PATH = "/Game/Aki/Character/NPC/AlienNPC/Level_C/SC1Fengzheng/CommonAnim/SC1Fengzheng_State03_Montage.SC1Fengzheng_State03_Montage",
  KITE_HOOK_BEAM_EFFECT_PATH = "/Game/Aki/Effect/Niagara/NI_Common/NS_Fx_Hook_Beam1.NS_Fx_Hook_Beam1",
  KITE_HOOK_BALL_EFFECT_PATH = "/Game/Aki/Effect/Niagara/NI_Common/NS_Fx_Hook_Maodian.NS_Fx_Hook_Maodian",
  KITE_HOOK_BEAM_OWNER_SOCKET = "Bip001LHand",
  KITE_HOOK_BEAM_NIAGARA_ENDPOS_VAR = "end",
  KITE_ACTOR_REF_NAME = "Fengzheng";
class SeamlessTravelKeepKite {
  constructor() {
    this.Hte = void 0, this.nx = void 0, this.qh1 = !1, this.mQo = !1, this.P31 = void 0, this.x31 = void 0, this.D31 = 0, this.U31 = void 0, this.B31 = void 0, this.k31 = void 0, this.O31 = void 0, this.q31 = void 0, this.G31 = void 0, this.V$o = Transform_1.Transform.Create(), this.Tdc = Vector_1.Vector.Create(), this.F31 = "", this.N31 = "", this.V31 = "", this.rgu = Transform_1.Transform.Create(), this.H31 = Transform_1.Transform.Create(), this.$31 = Vector_1.Vector.Create(), this.W31 = void 0
  }
  get IsInit() {
    return this.qh1
  }
  get IsActive() {
    return this.mQo
  }
  Init(t, i) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 39, "[无缝传送KeepKite] 初始化KeepKite(开始)"), this.Hte = Global_1.Global.BaseCharacter?.CharacterActorComponent, this.Hte ? this.IsInit ? i?.(!0) : (this.nx = t, this.nx ? (this.F31 = KITE_HOOK_BEAM_EFFECT_PATH, this.N31 = KITE_HOOK_BALL_EFFECT_PATH, this.V31 = KITE_HOOK_BEAM_OWNER_SOCKET, this.W31 = i, this.P31?.IsValid() || ResourceSystem_1.ResourceSystem.LoadAsync(DEFAULT_KITE_SKELETAL_MESH_PATH, UE.SkeletalMesh, t => {
      t?.IsValid() ? (this.P31 = t, this.Q31()) : this.K31()
    }), this.x31?.IsValid() || ResourceSystem_1.ResourceSystem.LoadAsync(DEFAULT_KITE_ANIM_PATH, UE.AnimationAsset, t => {
      t?.IsValid() ? (this.x31 = t, this.Q31()) : this.K31()
    }), this.B31?.IsValid() || ResourceSystem_1.ResourceSystem.LoadAsync(this.F31, UE.NiagaraSystem, t => {
      t?.IsValid() ? (this.B31 = t, this.Q31()) : this.K31()
    }), this.k31?.IsValid() || ResourceSystem_1.ResourceSystem.LoadAsync(this.N31, UE.NiagaraSystem, t => {
      t?.IsValid() ? (this.k31 = t, this.Q31()) : this.K31()
    }), this.Q31()) : i?.(!1)) : (Log_1.Log.CheckError() && Log_1.Log.Error("Teleport", 39, "[无缝传送KeepKite] 初始化失败，无效的ActorComp", ["ActorName", Global_1.Global.BaseCharacter?.GetName()]), i?.(!1))
  }
  K31() {
    var t = this.W31;
    this.W31 = void 0, t?.(!1)
  }
  X31() {
    var t = this.W31;
    this.W31 = void 0, t?.(!0)
  }
  Q31() {
    this.IsInit || this.P31?.IsValid() && this.x31?.IsValid() && this.B31?.IsValid() && this.k31?.IsValid() && this.Y31()
  }
  Y31() {
    if (this.Hte?.Actor?.IsValid())
      if (this.U31 = ActorSystem_1.ActorSystem.Get(UE.SkeletalMeshActor.StaticClass(), this.z31(this.H31).ToUeTransform(), this.Hte.Actor), this.O31 = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble), this.q31 = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble), this.U31?.IsValid() && this.O31?.IsValid() && this.q31?.IsValid()) {
        GlobalData_1.GlobalData.IsPlayInEditor && (this.U31.SetActorLabel("SeamlessTravel_KiteActor"), this.O31.SetActorLabel("SeamlessTravel_BeamActor"), this.q31.SetActorLabel("SeamlessTravel_BallActor"));
        var t = this.U31.GetSkeletalMeshComponent();
        if (t?.IsValid()) {
          t.SetSkeletalMesh(this.P31), t.PlayAnimation(this.x31, !0), this.D31 && t.SetPosition(this.D31), t.VisibilityBasedAnimTickOption = 0, this.U31.K2_AttachToActor(this.Hte.Actor, void 0, 1, 1, 1, !1), this.U31.SetActorHiddenInGame(!0), this.G31 = this.O31.AddComponentByClass(UE.NiagaraComponent.StaticClass(), !1, MathUtils_1.MathUtils.DefaultTransform, !1), this.G31.SetAsset(this.B31), TimerSystem_1.TimerSystem.Next(() => {
            UE.KuroEffectLibrary.SetNiagaraSimulationMinDeltaTime(this.G31, -1)
          }), this.O31.K2_AttachToComponent(this.Hte.Actor.Mesh, FNameUtil_1.FNameUtil.GetDynamicFName(this.V31), 2, 2, 2, !1), this.O31.SetActorHiddenInGame(!0);
          const i = this.q31.AddComponentByClass(UE.NiagaraComponent.StaticClass(), !1, MathUtils_1.MathUtils.DefaultTransform, !1);
          i.SetAsset(this.k31), TimerSystem_1.TimerSystem.Next(() => {
            UE.KuroEffectLibrary.SetNiagaraSimulationMinDeltaTime(i, -1), UE.KuroEffectLibrary.SetNiagaraFrameDeltaTime(i, 1)
          }), this.q31.SetActorHiddenInGame(!0), this.UpdateKeepKite(), this.qh1 = !0, Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 39, "[无缝传送KeepKite] 初始化KeepKite(完成)"), this.X31()
        } else this.K31()
      } else this.K31();
    else this.K31()
  }
  Tick(t) {
    this.IsInit && this.IsActive && this.UpdateKeepKite()
  }
  UpdateKeepKite() {
    var t, i;
    this.U31?.IsValid() && (this.Hte?.Actor.IsValid() && this.U31.D_K2_SetActorTransform(this.z31(this.H31).ToUeTransform(), !1, void 0, !0), t = this.J31(this.$31), i = UE.KismetMathLibrary.WD_WorldToLocal(GlobalData_1.GlobalData.World, t.ToUeVector()), this.G31?.IsValid() && this.G31.SetNiagaraVariableVec3(KITE_HOOK_BEAM_NIAGARA_ENDPOS_VAR, i), this.q31?.IsValid()) && this.q31.D_K2_SetActorLocation(t.ToUeVector(), !1, void 0, !0)
  }
  Destroy() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 39, "[无缝传送KeepKite] 清理KeepKite"), this.qh1 = !1, this.B31 = void 0, this.G31 = void 0, ActorSystem_1.ActorSystem.Put("SeamlessTravelKeepKite.Destroy", this.O31), this.O31 = void 0, this.k31 = void 0, ActorSystem_1.ActorSystem.Put("SeamlessTravelKeepKite.Destroy", this.q31), this.q31 = void 0, this.P31 = void 0, this.x31 = void 0, this.D31 = 0, ActorSystem_1.ActorSystem.Put("SeamlessTravelKeepKite.Destroy", this.U31), this.U31 = void 0, this.Hte = void 0, this.nx = void 0
  }
  AppearEffect(t) {
    this.IsInit ? this.IsActive ? t?.(!0) : this.U31?.IsValid() && this.Hte?.Actor.IsValid() ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 39, "[无缝传送KeepKite] 显示效果"), this.mQo = !0, this.U31.SetActorHiddenInGame(!1), this.O31?.SetActorHiddenInGame(!1), this.q31?.SetActorHiddenInGame(!1), t?.(!0)) : t?.(!1) : t?.(!1)
  }
  DisappearEffect(t) {
    this.IsInit ? (this.IsActive && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 39, "[无缝传送KeepKite] 隐藏效果"), this.mQo = !1, this.U31?.SetActorHiddenInGame(!0), this.O31?.SetActorHiddenInGame(!0), this.q31?.SetActorHiddenInGame(!0)), t?.(!0)) : t?.(!1)
  }
  SetInitData(t, i) {
    var t = t.GetComponent(202),
      s = t.GetActorInSceneInteraction(KITE_ACTOR_REF_NAME),
      t = t.Owner?.D_GetTransform() ?? t.ActorTransform,
      e = s?.D_GetTransform() ?? t,
      i = i.GetComponent(1),
      h = i.ActorTransform;
    this.V$o.FromUeTransform(e.GetRelativeTransform(h)), this.Tdc.DeepCopy(i.ActorGravityDirectProxy), this.rgu.FromUeTransform(t.GetRelativeTransform(e)), s instanceof UE.SkeletalMeshActor && (h = s.GetSkeletalMeshComponent(), this.P31 = h?.SkeletalMesh, i = h?.GetAnimInstance(), this.x31 = i?.GetCurrentActiveMontage(), this.D31 = i?.Montage_GetPosition(void 0) ?? 0)
  }
  J31(t) {
    var i;
    return this.U31?.IsValid() && (i = this.rgu.ToUeTransform().op_Multiply(this.U31.D_GetTransform()), t.DeepCopy(i.GetLocation())), t
  }
  z31(t) {
    return this.Hte?.Actor.IsValid() && t.FromUeTransform(this.V$o.ToUeTransform().op_Multiply(this.Hte.Actor.D_GetTransform())), t
  }
  GetSeamlessTravelActors(t) {
    return this.U31 && t.push(this.U31), this.O31 && t.push(this.O31), this.q31 && t.push(this.q31), t
  }
}
exports.SeamlessTravelKeepKite = SeamlessTravelKeepKite;
//# sourceMappingURL=SeamlessTravelKeepKite.js.map
"use strict";
var __decorate = this && this.__decorate || function(e, t, i, s) {
  var h, r = arguments.length,
    o = r < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, s);
  else
    for (var n = e.length - 1; 0 <= n; n--)(h = e[n]) && (o = (r < 3 ? h(o) : 3 < r ? h(t, i, o) : h(t, i)) || o);
  return 3 < r && o && Object.defineProperty(t, i, o), o
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CharacterDriveVehicleComponent = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  Quat_1 = require("../../../../../Core/Utils/Math/Quat"),
  Transform_1 = require("../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GameModePromise_1 = require("../../../../World/Define/GameModePromise"),
  VehicleInfoDefines_1 = require("../../../Vehicle/Common/VehicleInfoDefines"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
  CustomMovementDefine_1 = require("./Move/CustomMovementDefine"),
  DEFAULT_SITTING_HEIGHT = 45,
  PRE_ENTER_EFFECT_PATH = "/Game/Aki/Effect/EffectGroup/SB1Gongduola3/DA_Fx_Group_ChuanSong.DA_Fx_Group_ChuanSong",
  POST_ENTER_EFFECT_PATH = "/Game/Aki/Effect/EffectGroup/SB1Gongduola3/DA_Fx_Group_ChuanSongEnd.DA_Fx_Group_ChuanSongEnd",
  PRE_ENTER_MAT_EFFECT_PATH = "/Game/Aki/Effect/MaterialController/Common/SB1GongDuoLa3/DA_Fx_HidePlayer.DA_Fx_HidePlayer",
  POST_ENTER_MAT_EFFECT_PATH = "/Game/Aki/Effect/MaterialController/Common/SB1GongDuoLa3/DA_Fx_Group_ShowPlayer.DA_Fx_Group_ShowPlayer";
let CharacterDriveVehicleComponent = class CharacterDriveVehicleComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.ActorComp = void 0, this.MoveComp = void 0, this.UnifiedStateComp = void 0, this.TagComp = void 0, this.VehicleInfo = void 0, this.AttachOffset = Vector_1.Vector.Create(), this.SeatReletiveTrans = Transform_1.Transform.Create(), this.HasWaterEffect = !0, this.PreEnterEffectTime = 0, this.PreEnterMatEffect = void 0, this.PostEnterMatEffect = void 0, this.WaitPreEnterEffectHandle = void 0, this.WasLeavePerformFinish = !1, this.LeavePerformEndPromise = void 0, this.EntityHandle = void 0, this.TmpVector1 = Vector_1.Vector.Create(), this.TmpVector2 = Vector_1.Vector.Create(), this.TmpQuat = Quat_1.Quat.Create(), this.TmpTrans = Transform_1.Transform.Create(), this.IsAttachToMoveSceneItem = !1, this.OnEnterVehicleWrapper = e => {
      this.OnEnterVehicle(e)
    }, this.OnLeaveVehicleWrapper = e => {
      this.OnLeaveVehicle(e)
    }, this.OnTeleportChangleLocation = () => {
      this.NeedLeaveVehicleWhenTeleport() && (this.VehicleInfo.VehicleEntity?.GetComponent(233))?.Leave(this.Entity, 1)
    }, this.OnMoveRide = e => {
      var t;
      this.ActorComp?.Actor.GetAttachRootParentActor()?.IsValid() && (t = this.ActorComp?.Actor.CharacterMovement?.RootMotionParams)?.bHasRootMotion && (this.TmpVector1.FromUeVector(t.RootMotionTransform.GetLocation()), this.ActorComp.ActorQuatProxy.Inverse(this.TmpQuat), this.TmpQuat.RotateVector(this.TmpVector1, this.TmpVector2), this.TmpVector2.ContainsNaN() ? Log_1.Log.CheckError() && Log_1.Log.Error("Test", 50, "[OnMoveRide] RootMotion计算存在NAN", ["WorldOffset", this.TmpVector1], ["LocalOffset", this.TmpVector2]) : this.ActorComp.Actor.K2_AddActorLocalOffset(this.TmpVector2.ToUeVectorOld(), !1, void 0, !1))
    }
  }
  get IsDriver() {
    return !!this.VehicleInfo?.IsDriver
  }
  get IsOnVehicle() {
    return !!this.VehicleInfo
  }
  get VehicleType() {
    return this.VehicleInfo?.VehicleType
  }
  get VehicleEntity() {
    return this.VehicleInfo?.VehicleEntity
  }
  get Seat() {
    return this.VehicleInfo?.Seat ?? -1
  }
  get CanLeave() {
    return !!this.VehicleEntity?.GetComponent(237)?.CheckIfCanLeave()
  }
  get CanSprint() {
    return !!this.VehicleEntity?.GetComponent(237)?.CheckIfCanSprint()
  }
  get CanRiderSharing() {
    return !!this.VehicleEntity?.GetComponent(237)?.CheckIfCanRiderSharing()
  }
  IsVehicleType(e) {
    return this.VehicleInfo?.VehicleType === e
  }
  IsEnableLongPressLeave() {
    return !0
  }
  OnStart() {
    return this.ActorComp = this.Entity.GetComponent(3), this.MoveComp = this.Entity.GetComponent(45), this.UnifiedStateComp = this.Entity.GetComponent(101), this.TagComp = this.Entity.GetComponent(205), this.EntityHandle = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.Entity.Id), this.InitEnterEffectAsset(), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveRide, this.OnMoveRide), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.TeleportChangeLocation, this.OnTeleportChangleLocation), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnEnterVehicle, this.OnEnterVehicleWrapper), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnLeaveVehicle, this.OnLeaveVehicleWrapper), !0
  }
  OnEnd() {
    return EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveRide, this.OnMoveRide), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.TeleportChangeLocation, this.OnTeleportChangleLocation), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnEnterVehicle, this.OnEnterVehicleWrapper), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnLeaveVehicle, this.OnLeaveVehicleWrapper), this.VehicleInfo && (this.VehicleInfo.VehicleEntity?.GetComponent(233))?.Leave(this.Entity), !0
  }
  InitEnterEffectAsset() {
    ResourceSystem_1.ResourceSystem.LoadAsync(PRE_ENTER_MAT_EFFECT_PATH, UE.PD_CharacterControllerData_C, e => {
      e?.IsValid() && (this.PreEnterMatEffect = e, this.PreEnterEffectTime = e.LoopTime.Start + e.LoopTime.Loop)
    }), ResourceSystem_1.ResourceSystem.LoadAsync(POST_ENTER_MAT_EFFECT_PATH, UE.PD_CharacterControllerDataGroup_C, e => {
      e?.IsValid() && (this.PostEnterMatEffect = e)
    })
  }
  OnEnterVehicle(e) {
    this.VehicleInfo = e, this.MoveComp.IsSpecialMove = !0, this.MoveComp.NeedRootMotionWhenAttached = !0, this.SetWaterEffect(!1), this.EnterVehiclePerform(e)
  }
  async OnLeaveVehicle(e) {
    this.LeavePerformEndPromise = new GameModePromise_1.GameModePromise, this.LeaveVehiclePerform(e), this.WasLeavePerformFinish || (e = this.ActorComp?.CreatureData.GetPbDataId(), Log_1.Log.CheckInfo() && Log_1.Log.Info("Vehicle", 50, "等待离开载具表现(开始)", ["PbDataId", e]), await this.LeavePerformEndPromise.Promise, Log_1.Log.CheckInfo() && Log_1.Log.Info("Vehicle", 50, "等待离开载具表现(完成)", ["PbDataId", e])), this.WasLeavePerformFinish = !1, this.LeavePerformEndPromise = void 0, this.VehicleInfo = void 0, this.MoveComp.IsSpecialMove = !1, this.IsAttachToMoveSceneItem || (this.MoveComp.NeedRootMotionWhenAttached = !1), this.SetWaterEffect(!0)
  }
  EnterVehiclePerform(e) {
    this.PreEnterVehiclePerform(e), 0 < this.PreEnterEffectTime ? this.WaitPreEnterEffectHandle = TimerSystem_1.TimerSystem.Delay(() => {
      this.WaitPreEnterEffectHandle = void 0, this.ChangeCurrentState(), this.AttachAndSetPassengerTransform(), this.PostEnterVehiclePerform(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAfterAttachVehicle, e)
    }, this.PreEnterEffectTime * MathUtils_1.MathUtils.SecondToMillisecond) : (this.ChangeCurrentState(), this.AttachAndSetPassengerTransform(), this.PostEnterVehiclePerform(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAfterAttachVehicle, e))
  }
  LeaveVehiclePerform(e) {
    this.WaitPreEnterEffectHandle && (TimerSystem_1.TimerSystem.Remove(this.WaitPreEnterEffectHandle), this.WaitPreEnterEffectHandle = void 0, this.AttachAndSetPassengerTransform()), this.ActorComp.Actor.K2_DetachFromActor(1, 1, 1), this.IsAttachToMoveSceneItem && (e = e.VehicleEntity?.GetComponent(202)?.Owner) && this.ActorComp.Actor.K2_AttachToActor(e, void 0, 1, 1, 1, !0), this.SeatReletiveTrans.Reset(), this.RestoreState(), this.ActorComp.SetForbidSettingLocAndRot(!1, 0), this.WasLeavePerformFinish = !0, this.LeavePerformEndPromise.SetResult(!0)
  }
  ChangeCurrentState() {
    this.ActorComp.ClearInput(), this.MoveComp.StopMoveNew(), EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnBeforeAttachVehicle), this.ActorComp.Actor.KuroSetMovementMode({
      Mode: 6,
      CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RIDE,
      Context: "[CharacterDriveVehicleComponent.ClearCurrentState]"
    }), this.UnifiedStateComp?.SetMoveState(this.GetMoveStateFromVehicleType(this.VehicleType)), this.IgnoreVehicleCollision(!0)
  }
  IgnoreVehicleCollision(e) {
    if (this.VehicleInfo) {
      var t = this.VehicleInfo.VehicleEntity;
      switch (this.VehicleInfo.VehicleType) {
        case "SceneItemAutoMoveVehicle":
        case "CoBathingEmptyVehicle":
          t.GetComponent(202).Owner?.IgnoreActorWhenMoving(this.ActorComp.Actor, e, !0);
          break;
        case "NpcVehicle":
          t.GetComponent(3).Actor.IgnoreActorWhenMoving(this.ActorComp.Actor, e, !0);
          break;
        default:
          var i = t.GetComponent(234);
          i.Actor.IgnoreActorWhenMoving(this.ActorComp.Actor, e, !0), i.Actor.PlatformActor?.IgnoreActorWhenMoving(this.ActorComp.Actor, e, !0)
      }
    }
  }
  RestoreState() {
    this.ActorComp.Actor.KuroSetMovementMode({
      Mode: 3,
      Context: "[CharacterDriveVehicleComponent.RestoreState]"
    }), this.IgnoreVehicleCollision(!1)
  }
  SetWaterEffect(e) {
    this.HasWaterEffect !== e && (this.HasWaterEffect = e, this.ActorComp.Actor.CharRenderingComponent?.SetNoWater(!e))
  }
  PreEnterVehiclePerform(e) {
    EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.ActorComp?.ActorTransform, PRE_ENTER_EFFECT_PATH, "CharacterDriveVehicle.PlayPreOnBoardEffect", new EffectContext_1.EffectContext(this.Entity.Id)), this.PreEnterMatEffect?.IsValid() && this.ActorComp.Actor.CharRenderingComponent.AddMaterialControllerData(this.PreEnterMatEffect)
  }
  PostEnterVehiclePerform(e) {
    EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.ActorComp?.ActorTransform, POST_ENTER_EFFECT_PATH, "CharacterDriveVehicle.PlayPostOnBoardEffect", new EffectContext_1.EffectContext(this.Entity.Id)), this.PostEnterMatEffect?.IsValid() && this.ActorComp.Actor.CharRenderingComponent.AddMaterialControllerDataGroup(this.PostEnterMatEffect)
  }
  AttachAndSetPassengerTransform() {
    if (this.VehicleInfo) {
      var i = this.VehicleInfo.VehicleEntity.GetComponent(1);
      let e = void 0,
        t = !0;
      switch (this.VehicleInfo.VehicleType) {
        case "NpcVehicle":
          e = this.VehicleInfo.VehicleEntity.GetComponent(3)?.Actor?.Mesh;
          break;
        case "SceneItemAutoMoveVehicle":
        case "CoBathingEmptyVehicle":
          var s = this.VehicleInfo.VehicleEntity.GetComponent(271);
          if (s && !(e = s?.SkeletonMeshComponent)) {
            const o = VehicleInfoDefines_1.VehicleInfoDefines.GetSeatSocketName(this.VehicleInfo.Seat);
            e = s?.GetStaticMeshVehicleSeats(o.toString()), t = !1
          }
          break;
        default:
          e = this.VehicleInfo.VehicleEntity.GetComponent(234)?.Actor?.Mesh
      }
      if (e && i) {
        const o = t ? VehicleInfoDefines_1.VehicleInfoDefines.GetSeatSocketName(this.VehicleInfo.Seat) : FNameUtil_1.FNameUtil.EMPTY;
        var h = t ? e.D_GetSocketTransform(o) : e.D_GetRelativeTransform(),
          r = t ? i.ActorTransform.GetRelativeTransform(h) : e.D_GetRelativeTransform();
        this.SeatReletiveTrans.FromUeTransform(r), this.TmpVector1.FromUeVector(h.GetLocation()), this.TmpVector1.Equals(Vector_1.Vector.ZeroVectorProxy) && (this.TmpVector1.DeepCopy(i.ActorLocationProxy), Log_1.Log.CheckWarn()) && Log_1.Log.Warn("Vehicle", 50, "进入载具设置位置时找不到Socket", ["VehiclePbId", i?.CreatureData.GetPbDataId()], ["PassengerPbId", this.ActorComp?.CreatureData.GetPbDataId()], ["SocketName", o]), this.ActorComp.Actor.K2_AttachToComponent(e, o, 2, 2, 1, !1), this.ActorComp.SetForbidSettingLocAndRot(!1, 0), this.TmpVector1.Set(0, 0, this.ActorComp.HalfHeight - DEFAULT_SITTING_HEIGHT), this.TmpVector1.AdditionEqual(this.AttachOffset), this.ActorComp.Actor.D_K2_SetActorRelativeLocation(this.TmpVector1.ToUeVector(), !1, void 0, !1), this.ActorComp.ResetAllCachedTime(), this.ActorComp.SetForbidSettingLocAndRot(!0, 0)
      } else Log_1.Log.CheckError() && Log_1.Log.Error("Vehicle", 50, "进入载具设置位置时找不到载具的ActorComp或Mesh", ["VehiclePbId", i?.CreatureData.GetPbDataId()], ["VehicleType", this.VehicleInfo.VehicleType])
    }
  }
  GetSeatTransform(e) {
    var t, i;
    return !!this.VehicleInfo && (i = "NpcVehicle" !== this.VehicleInfo.VehicleType ? this.VehicleInfo.VehicleEntity.GetComponent(234) : this.VehicleInfo.VehicleEntity.GetComponent(3), t = VehicleInfoDefines_1.VehicleInfoDefines.GetSeatSocketName(this.VehicleInfo.Seat), i = i.Actor.Mesh.D_GetSocketTransform(t), e.FromUeTransform(i), !0)
  }
  GetMoveStateFromVehicleType(e) {
    switch (e) {
      case "Gongduola":
        return CharacterUnifiedStateTypes_1.ECharMoveState.Gongduola;
      case "NpcVehicle":
        return CharacterUnifiedStateTypes_1.ECharMoveState.NpcVehicle;
      default:
        return CharacterUnifiedStateTypes_1.ECharMoveState.Other
    }
  }
  NeedLeaveVehicleWhenTeleport() {
    return 3 === this.VehicleInfo?.ExitType || "NpcVehicle" === this.VehicleType
  }
};
CharacterDriveVehicleComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(229)], CharacterDriveVehicleComponent), exports.CharacterDriveVehicleComponent = CharacterDriveVehicleComponent;
//# sourceMappingURL=CharacterDriveVehicleComponent.js.map
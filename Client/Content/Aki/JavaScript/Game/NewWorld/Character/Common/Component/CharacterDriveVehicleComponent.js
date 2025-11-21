"use strict";

var __decorate = this && this.__decorate || function (e, t, i, s) {
  var h;
  var r = arguments.length;
  var o = r < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(e, t, i, s);
  } else {
    for (var n = e.length - 1; n >= 0; n--) {
      if (h = e[n]) {
        o = (r < 3 ? h(o) : r > 3 ? h(t, i, o) : h(t, i)) || o;
      }
    }
  }
  if (r > 3 && o) {
    Object.defineProperty(t, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterDriveVehicleComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GameModePromise_1 = require("../../../../World/Define/GameModePromise");
const VehicleInfoDefines_1 = require("../../../Vehicle/Common/VehicleInfoDefines");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const CustomMovementDefine_1 = require("./Move/CustomMovementDefine");
const DEFAULT_SITTING_HEIGHT = 45;
const PRE_ENTER_EFFECT_PATH = "/Game/Aki/Effect/EffectGroup/SB1Gongduola3/DA_Fx_Group_ChuanSong.DA_Fx_Group_ChuanSong";
const POST_ENTER_EFFECT_PATH = "/Game/Aki/Effect/EffectGroup/SB1Gongduola3/DA_Fx_Group_ChuanSongEnd.DA_Fx_Group_ChuanSongEnd";
const PRE_ENTER_MAT_EFFECT_PATH = "/Game/Aki/Effect/MaterialController/Common/SB1GongDuoLa3/DA_Fx_HidePlayer.DA_Fx_HidePlayer";
const POST_ENTER_MAT_EFFECT_PATH = "/Game/Aki/Effect/MaterialController/Common/SB1GongDuoLa3/DA_Fx_Group_ShowPlayer.DA_Fx_Group_ShowPlayer";
let CharacterDriveVehicleComponent = class CharacterDriveVehicleComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.MoveComp = undefined;
    this.UnifiedStateComp = undefined;
    this.TagComp = undefined;
    this.VehicleInfo = undefined;
    this.AttachOffset = Vector_1.Vector.Create();
    this.SeatReletiveTrans = Transform_1.Transform.Create();
    this.HasWaterEffect = true;
    this.PreEnterEffectTime = 0;
    this.PreEnterMatEffect = undefined;
    this.PostEnterMatEffect = undefined;
    this.WaitPreEnterEffectHandle = undefined;
    this.WasLeavePerformFinish = false;
    this.LeavePerformEndPromise = undefined;
    this.EntityHandle = undefined;
    this.TmpVector1 = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TmpQuat = Quat_1.Quat.Create();
    this.TmpTrans = Transform_1.Transform.Create();
    this.IsAttachToMoveSceneItem = false;
    this.OnEnterVehicleWrapper = e => {
      this.OnEnterVehicle(e);
    };
    this.OnLeaveVehicleWrapper = e => {
      this.OnLeaveVehicle(e);
    };
    this.OnTeleportChangleLocation = () => {
      if (this.NeedLeaveVehicleWhenTeleport()) {
        this.VehicleInfo.VehicleEntity?.GetComponent(237)?.Leave(this.Entity, 1);
      }
    };
    this.OnMoveRide = e => {
      var t;
      if (this.ActorComp?.Actor.GetAttachRootParentActor()?.IsValid() && (t = this.ActorComp?.Actor.CharacterMovement?.RootMotionParams)?.bHasRootMotion) {
        this.TmpVector1.FromUeVector(t.RootMotionTransform.GetLocation());
        this.ActorComp.ActorQuatProxy.Inverse(this.TmpQuat);
        this.TmpQuat.RotateVector(this.TmpVector1, this.TmpVector2);
        if (this.TmpVector2.ContainsNaN()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Test", 50, "[OnMoveRide] RootMotion计算存在NAN", ["WorldOffset", this.TmpVector1], ["LocalOffset", this.TmpVector2]);
          }
        } else {
          this.ActorComp.Actor.K2_AddActorLocalOffset(this.TmpVector2.ToUeVectorOld(), false, undefined, false);
        }
      }
    };
  }
  get IsDriver() {
    return !!this.VehicleInfo?.IsDriver;
  }
  get IsOnVehicle() {
    return !!this.VehicleInfo;
  }
  get VehicleType() {
    return this.VehicleInfo?.VehicleType;
  }
  get VehicleEntity() {
    return this.VehicleInfo?.VehicleEntity;
  }
  get Seat() {
    return this.VehicleInfo?.Seat ?? -1;
  }
  get CanLeave() {
    return !!this.VehicleEntity?.GetComponent(241)?.CheckIfCanLeave();
  }
  get CanSprint() {
    return !!this.VehicleEntity?.GetComponent(241)?.CheckIfCanSprint();
  }
  get CanRiderSharing() {
    return !!this.VehicleEntity?.GetComponent(241)?.CheckIfCanRiderSharing();
  }
  IsVehicleType(e) {
    return this.VehicleInfo?.VehicleType === e;
  }
  IsEnableLongPressLeave() {
    return !!this.IsVehicleType("Gongduola") || !!this.IsVehicleType("AutoMoveGongduola") || !!this.IsVehicleType("NpcVehicle");
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(3);
    this.MoveComp = this.Entity.GetComponent(45);
    this.UnifiedStateComp = this.Entity.GetComponent(104);
    this.TagComp = this.Entity.GetComponent(209);
    this.EntityHandle = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.Entity.Id);
    this.InitEnterEffectAsset();
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveRide, this.OnMoveRide);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.TeleportChangeLocation, this.OnTeleportChangleLocation);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnEnterVehicle, this.OnEnterVehicleWrapper);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnLeaveVehicle, this.OnLeaveVehicleWrapper);
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveRide, this.OnMoveRide);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.TeleportChangeLocation, this.OnTeleportChangleLocation);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnEnterVehicle, this.OnEnterVehicleWrapper);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnLeaveVehicle, this.OnLeaveVehicleWrapper);
    if (this.VehicleInfo) {
      this.VehicleInfo.VehicleEntity?.GetComponent(237)?.Leave(this.Entity);
    }
    return true;
  }
  InitEnterEffectAsset() {
    ResourceSystem_1.ResourceSystem.LoadAsync(PRE_ENTER_MAT_EFFECT_PATH, UE.PD_CharacterControllerData_C, e => {
      if (e?.IsValid()) {
        this.PreEnterMatEffect = e;
        this.PreEnterEffectTime = e.LoopTime.Start + e.LoopTime.Loop;
      }
    });
    ResourceSystem_1.ResourceSystem.LoadAsync(POST_ENTER_MAT_EFFECT_PATH, UE.PD_CharacterControllerDataGroup_C, e => {
      if (e?.IsValid()) {
        this.PostEnterMatEffect = e;
      }
    });
  }
  OnEnterVehicle(e) {
    var t;
    this.VehicleInfo = e;
    this.MoveComp.IsSpecialMove = true;
    this.MoveComp.NeedRootMotionWhenAttached = true;
    this.SetWaterEffect(false);
    this.EnterVehiclePerform(e);
    if (this.VehicleType === "Motorcycle" && ((t = this.ActorComp?.Actor.Mesh?.GetAnimInstance()).SetEnableAreaMove && t.SetEnableAreaMove(true), t = this.ActorComp?.Actor.Mesh?.GetLinkedAnimGraphInstanceByTag(new UE.FName("ABP_Gameplay"))) && t.SetVehicle) {
      t.SetVehicle(e.VehicleEntity?.Id ?? 0);
    }
    if (this.VehicleType === "Gongduola" || this.VehicleType === "AutoMoveGongduola") {
      if (e.IsRolePassenger(true)) {
        this.ReplaceExploreSkillForGongduola();
      }
    }
  }
  async OnLeaveVehicle(e) {
    var t;
    if (this.VehicleType === "Motorcycle" && (t = this.ActorComp?.Actor.Mesh?.GetAnimInstance()).SetEnableAreaMove && (t.SetEnableAreaMove(false), t = this.ActorComp?.Actor.Mesh?.GetLinkedAnimGraphInstanceByTag(new UE.FName("ABP_Gameplay"))) && t.SetVehicle) {
      t.SetVehicle(0);
    }
    if (this.VehicleType === "Gongduola" || this.VehicleType === "AutoMoveGongduola") {
      if (e.IsRolePassenger(true)) {
        this.ResetExploreSkillForGongduola();
      }
    }
    this.LeavePerformEndPromise = new GameModePromise_1.GameModePromise();
    this.LeaveVehiclePerform(e);
    if (!this.WasLeavePerformFinish) {
      t = this.ActorComp?.CreatureData.GetPbDataId();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 50, "等待离开载具表现(开始)", ["PbDataId", t]);
      }
      await this.LeavePerformEndPromise.Promise;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 50, "等待离开载具表现(完成)", ["PbDataId", t]);
      }
    }
    this.WasLeavePerformFinish = false;
    this.LeavePerformEndPromise = undefined;
    this.VehicleInfo = undefined;
    this.MoveComp.IsSpecialMove = false;
    if (!this.IsAttachToMoveSceneItem) {
      this.MoveComp.NeedRootMotionWhenAttached = false;
    }
    this.SetWaterEffect(true);
  }
  EnterVehiclePerform(e) {
    this.PreEnterVehiclePerform(e);
    if (this.PreEnterEffectTime > 0) {
      this.WaitPreEnterEffectHandle = TimerSystem_1.TimerSystem.Delay(() => {
        this.WaitPreEnterEffectHandle = undefined;
        this.ChangeCurrentState();
        this.AttachAndSetPassengerTransform();
        this.PostEnterVehiclePerform(e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAfterAttachVehicle, e);
      }, this.PreEnterEffectTime * MathUtils_1.MathUtils.SecondToMillisecond);
    } else {
      this.ChangeCurrentState();
      this.AttachAndSetPassengerTransform();
      this.PostEnterVehiclePerform(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAfterAttachVehicle, e);
    }
  }
  LeaveVehiclePerform(e) {
    if (this.WaitPreEnterEffectHandle) {
      TimerSystem_1.TimerSystem.Remove(this.WaitPreEnterEffectHandle);
      this.WaitPreEnterEffectHandle = undefined;
      this.AttachAndSetPassengerTransform();
    }
    this.ActorComp.Actor.K2_DetachFromActor(1, 1, 1);
    if (this.IsAttachToMoveSceneItem && (e = e.VehicleEntity?.GetComponent(206)?.Owner)) {
      this.ActorComp.Actor.K2_AttachToActor(e, undefined, 1, 1, 1, true);
    }
    this.SeatReletiveTrans.Reset();
    this.RestoreState();
    this.ActorComp.SetForbidSettingLocAndRot(false, 0);
    this.WasLeavePerformFinish = true;
    this.LeavePerformEndPromise.SetResult(true);
  }
  ChangeCurrentState() {
    this.ActorComp.ClearInput();
    this.MoveComp.StopMoveNew();
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnBeforeAttachVehicle);
    this.Entity.GetComponent(181)?.ConsumeRootMotion();
    this.ActorComp.Actor.KuroSetMovementMode({
      Mode: 6,
      CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RIDE,
      Context: "[CharacterDriveVehicleComponent.ClearCurrentState]"
    });
    this.UnifiedStateComp?.SetMoveState(this.GetMoveStateFromVehicleType(this.VehicleType));
    this.IgnoreVehicleCollision(true);
  }
  IgnoreVehicleCollision(e) {
    if (this.VehicleInfo) {
      var t = this.VehicleInfo.VehicleEntity;
      switch (this.VehicleInfo.VehicleType) {
        case "SceneItemAutoMoveVehicle":
        case "CoBathingEmptyVehicle":
          t.GetComponent(206).Owner?.IgnoreActorWhenMoving(this.ActorComp.Actor, e, true);
          break;
        case "NpcVehicle":
          t.GetComponent(3).Actor.IgnoreActorWhenMoving(this.ActorComp.Actor, e, true);
          break;
        default:
          var i = t.GetComponent(238);
          i.Actor.IgnoreActorWhenMoving(this.ActorComp.Actor, e, true);
          i.Actor.PlatformActor?.IgnoreActorWhenMoving(this.ActorComp.Actor, e, true);
      }
    }
  }
  RestoreState() {
    this.ActorComp.Actor.KuroSetMovementMode({
      Mode: 3,
      Context: "[CharacterDriveVehicleComponent.RestoreState]"
    });
    this.IgnoreVehicleCollision(false);
  }
  SetWaterEffect(e) {
    if (this.HasWaterEffect !== e) {
      this.HasWaterEffect = e;
      this.ActorComp.Actor.CharRenderingComponent?.SetNoWater(!e);
    }
  }
  PreEnterVehiclePerform(e) {
    EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.ActorComp?.ActorTransform, PRE_ENTER_EFFECT_PATH, "CharacterDriveVehicle.PlayPreOnBoardEffect", new EffectContext_1.EffectContext(this.Entity.Id));
    if (this.PreEnterMatEffect?.IsValid()) {
      this.ActorComp.Actor.CharRenderingComponent.AddMaterialControllerData(this.PreEnterMatEffect);
    }
  }
  PostEnterVehiclePerform(e) {
    EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.ActorComp?.ActorTransform, POST_ENTER_EFFECT_PATH, "CharacterDriveVehicle.PlayPostOnBoardEffect", new EffectContext_1.EffectContext(this.Entity.Id));
    if (this.PostEnterMatEffect?.IsValid()) {
      this.ActorComp.Actor.CharRenderingComponent.AddMaterialControllerDataGroup(this.PostEnterMatEffect);
    }
  }
  AttachAndSetPassengerTransform() {
    if (this.VehicleInfo) {
      var i = this.VehicleInfo.VehicleEntity.GetComponent(1);
      let e = undefined;
      let t = true;
      switch (this.VehicleInfo.VehicleType) {
        case "NpcVehicle":
          e = this.VehicleInfo.VehicleEntity.GetComponent(3)?.Actor?.Mesh;
          break;
        case "SceneItemAutoMoveVehicle":
        case "CoBathingEmptyVehicle":
          var s = this.VehicleInfo.VehicleEntity.GetComponent(279);
          if (s && !(e = s?.SkeletonMeshComponent)) {
            const o = VehicleInfoDefines_1.VehicleInfoDefines.GetSeatSocketName(this.VehicleInfo.Seat);
            e = s?.GetStaticMeshVehicleSeats(o.toString());
            t = false;
          }
          break;
        default:
          e = this.VehicleInfo.VehicleEntity.GetComponent(238)?.Actor?.Mesh;
      }
      if (e && i) {
        const o = t ? VehicleInfoDefines_1.VehicleInfoDefines.GetSeatSocketName(this.VehicleInfo.Seat) : FNameUtil_1.FNameUtil.EMPTY;
        var h = t ? e.D_GetSocketTransform(o) : e.D_GetRelativeTransform();
        var r = t ? i.ActorTransform.GetRelativeTransform(h) : e.D_GetRelativeTransform();
        this.SeatReletiveTrans.FromUeTransform(r);
        this.TmpVector1.FromUeVector(h.GetLocation());
        if (this.TmpVector1.Equals(Vector_1.Vector.ZeroVectorProxy) && (this.TmpVector1.DeepCopy(i.ActorLocationProxy), Log_1.Log.CheckWarn())) {
          Log_1.Log.Warn("Vehicle", 50, "进入载具设置位置时找不到Socket", ["VehiclePbId", i?.CreatureData.GetPbDataId()], ["PassengerPbId", this.ActorComp?.CreatureData.GetPbDataId()], ["SocketName", o]);
        }
        this.ActorComp.Actor.K2_AttachToComponent(e, o, 0, 2, 1, false);
        this.ActorComp.SetForbidSettingLocAndRot(false, 0);
        this.TmpVector1.Set(0, 0, this.ActorComp.HalfHeight - DEFAULT_SITTING_HEIGHT);
        this.TmpVector1.AdditionEqual(this.AttachOffset);
        if (this.VehicleType === "Motorcycle") {
          this.TmpVector1.Z /= e.GetSocketTransform(o).GetScale3D().Z;
        }
        this.ActorComp.Actor.D_K2_SetActorRelativeLocation(this.TmpVector1.ToUeVector(), false, undefined, false);
        this.ActorComp.ResetAllCachedTime();
        this.ActorComp.SetForbidSettingLocAndRot(true, 0);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 50, "进入载具设置位置时找不到载具的ActorComp或Mesh", ["VehiclePbId", i?.CreatureData.GetPbDataId()], ["VehicleType", this.VehicleInfo.VehicleType]);
      }
    }
  }
  GetSeatTransform(e) {
    var t;
    var i;
    return !!this.VehicleInfo && (i = this.VehicleInfo.VehicleType !== "NpcVehicle" ? this.VehicleInfo.VehicleEntity.GetComponent(238) : this.VehicleInfo.VehicleEntity.GetComponent(3), t = VehicleInfoDefines_1.VehicleInfoDefines.GetSeatSocketName(this.VehicleInfo.Seat), i = i.Actor.Mesh.D_GetSocketTransform(t), e.FromUeTransform(i), true);
  }
  GetMoveStateFromVehicleType(e) {
    switch (e) {
      case "Gongduola":
        return CharacterUnifiedStateTypes_1.ECharMoveState.Gongduola;
      case "NpcVehicle":
        return CharacterUnifiedStateTypes_1.ECharMoveState.NpcVehicle;
      default:
        return CharacterUnifiedStateTypes_1.ECharMoveState.Other;
    }
  }
  NeedLeaveVehicleWhenTeleport() {
    return this.VehicleInfo?.ExitType === 3 || this.VehicleType === "NpcVehicle";
  }
  ReplaceExploreSkillForGongduola() {
    if (ModelManager_1.ModelManager.ExploreModel.CheckNeedChangeSkill(1009, 1)) {
      ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(1009, undefined, true);
    }
    ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(1009, 1);
  }
  ResetExploreSkillForGongduola() {
    ModelManager_1.ModelManager.ExploreModel.ResetExplodeSkillId(1);
    var e = ModelManager_1.ModelManager.ExploreModel.GetTopLayerExplodeSkillId();
    ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(e, undefined, true);
  }
};
CharacterDriveVehicleComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(233)], CharacterDriveVehicleComponent);
exports.CharacterDriveVehicleComponent = CharacterDriveVehicleComponent; //# sourceMappingURL=CharacterDriveVehicleComponent.js.map
"use strict";

var __decorate = this && this.__decorate || function (e, t, i, s) {
  var o;
  var r = arguments.length;
  var h = r < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(e, t, i, s);
  } else {
    for (var n = e.length - 1; n >= 0; n--) {
      if (o = e[n]) {
        h = (r < 3 ? o(h) : r > 3 ? o(t, i, h) : o(t, i)) || h;
      }
    }
  }
  if (r > 3 && h) {
    Object.defineProperty(t, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterDriveVehicleComponent = exports.DEFAULT_SITTING_HEIGHT = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const Platform_1 = require("../../../../../Launcher/Platform/Platform");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const GameSettingsDeviceRender_1 = require("../../../../GameSettings/GameSettingsDeviceRender");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const HoldingHandsUtils_1 = require("../../../../Module/HoldHands/HoldingHandsUtils");
const GameModePromise_1 = require("../../../../World/Define/GameModePromise");
const VehicleInfoDefines_1 = require("../../../Vehicle/Common/VehicleInfoDefines");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const CustomMovementDefine_1 = require("./Move/CustomMovementDefine");
exports.DEFAULT_SITTING_HEIGHT = 45;
const VEHICLE_DISABLE_TIME_LENGTH_THRESHOLD = 1000;
const gongduolaTypes = new Set(["AutoMoveGongduola", "FishingBoat", "Gongduola"]);
class MotorHandIkConfigs {
  constructor(e, t) {
    this.HandTrans = e;
    this.MotorBone = FNameUtil_1.FNameUtil.EMPTY;
    this.HandName = FNameUtil_1.FNameUtil.EMPTY;
    if (t) {
      this.MotorBone = FNameUtil_1.FNameUtil.GetDynamicFName("Bone_Other002_R");
      this.HandName = FNameUtil_1.FNameUtil.GetDynamicFName("Bip001RHand");
    } else {
      this.MotorBone = FNameUtil_1.FNameUtil.GetDynamicFName("Bone_Other002_L");
      this.HandName = FNameUtil_1.FNameUtil.GetDynamicFName("Bip001LHand");
    }
  }
}
const motorHandIkConfigsForRoleTypes = new Map([["MaleM", [new MotorHandIkConfigs(Transform_1.Transform.Create(Rotator_1.Rotator.Create(-9.420941, -122.644333, -84.960785).Quaternion(), Vector_1.Vector.Create(8.421957, 3.511599, 4.183678), Vector_1.Vector.OneVectorProxy), true), new MotorHandIkConfigs(Transform_1.Transform.Create(Rotator_1.Rotator.Create(-26.566101, 116.186264, -95.456398).Quaternion(), Vector_1.Vector.Create(8.110287, -3.468761, 5.362827), Vector_1.Vector.OneVectorProxy), false)]], ["MaleS", [new MotorHandIkConfigs(Transform_1.Transform.Create(Rotator_1.Rotator.Create(4.18961, -119.036339, -92.826721).Quaternion(), Vector_1.Vector.Create(9.205099, 4.245266, 2.893757), Vector_1.Vector.OneVectorProxy), true), new MotorHandIkConfigs(Transform_1.Transform.Create(Rotator_1.Rotator.Create(-18.845734, 104.746269, -83.328384).Quaternion(), Vector_1.Vector.Create(6.092396, -3.887035, 4.884502), Vector_1.Vector.OneVectorProxy), false)]], ["MaleXL", [new MotorHandIkConfigs(Transform_1.Transform.Create(Rotator_1.Rotator.Create(-20.770571, -101.058029, -84.462967).Quaternion(), Vector_1.Vector.Create(7.1915, 4.35553, 5.005596), Vector_1.Vector.OneVectorProxy), true), new MotorHandIkConfigs(Transform_1.Transform.Create(Rotator_1.Rotator.Create(-28.636816, 116.154587, -94.795395).Quaternion(), Vector_1.Vector.Create(7.63273, -3.248871, 5.240402), Vector_1.Vector.OneVectorProxy), false)]], ["FemaleM", [new MotorHandIkConfigs(Transform_1.Transform.Create(Rotator_1.Rotator.Create(17.884138, -95.802849, -93.979454).Quaternion(), Vector_1.Vector.Create(6.697874, 5.237093, 1.268063), Vector_1.Vector.OneVectorProxy), true), new MotorHandIkConfigs(Transform_1.Transform.Create(Rotator_1.Rotator.Create(-6.658949, 97.668579, -86.539093).Quaternion(), Vector_1.Vector.Create(6.070141, -3.900547, 3.864731), Vector_1.Vector.OneVectorProxy), false)]], ["FemaleMS", [new MotorHandIkConfigs(Transform_1.Transform.Create(Rotator_1.Rotator.Create(5.606335, -96.78434, -98.140648).Quaternion(), Vector_1.Vector.Create(5.637402, 4.574818, 0.937985), Vector_1.Vector.OneVectorProxy), true), new MotorHandIkConfigs(Transform_1.Transform.Create(Rotator_1.Rotator.Create(-6.231653, 96.001564, -93.148895).Quaternion(), Vector_1.Vector.Create(5.752922, -3.51818, 2.545318), Vector_1.Vector.OneVectorProxy), false)]], ["FemaleS", [new MotorHandIkConfigs(Transform_1.Transform.Create(Rotator_1.Rotator.Create(4.072568, -105.944626, -93.2379).Quaternion(), Vector_1.Vector.Create(7.251067, 3.239118, 2.388649), Vector_1.Vector.OneVectorProxy), true), new MotorHandIkConfigs(Transform_1.Transform.Create(Rotator_1.Rotator.Create(0.390086, 105.084808, -96.067238).Quaternion(), Vector_1.Vector.Create(4.466759, -3.419833, 3.027257), Vector_1.Vector.OneVectorProxy), false)]], ["FemaleXL", [new MotorHandIkConfigs(Transform_1.Transform.Create(Rotator_1.Rotator.Create(-17.666298, -95.35923, -92.673592).Quaternion(), Vector_1.Vector.Create(6.598392, 3.557126, 4.348299), Vector_1.Vector.OneVectorProxy), true), new MotorHandIkConfigs(Transform_1.Transform.Create(Rotator_1.Rotator.Create(-6.962592, 89.318382, -87.712952).Quaternion(), Vector_1.Vector.Create(5.430406, -4.386706, 3.197402), Vector_1.Vector.OneVectorProxy), false)]]]);
let CharacterDriveVehicleComponent = class CharacterDriveVehicleComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.MoveComp = undefined;
    this.UnifiedStateComp = undefined;
    this.TagComp = undefined;
    this.BuffComp = undefined;
    this.UeMovementComp = undefined;
    this.VehicleInfo = undefined;
    this.NFf = undefined;
    this.AttachOffset = Vector_1.Vector.Create();
    this.SeatReletiveTrans = Transform_1.Transform.Create();
    this.HasWaterEffect = true;
    this.PreEnterEffectTime = 0;
    this.WaitPreEnterEffectHandle = undefined;
    this.IsLeavingVehicle = false;
    this.WasLeavePerformFinish = false;
    this.LeavePerformEndPromise = undefined;
    this.UeMovementCompDisableHandle = 0;
    this.EntityHandle = undefined;
    this.TmpVector1 = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TmpQuat = Quat_1.Quat.Create();
    this.TmpTrans = Transform_1.Transform.Create();
    this.TmpTrans2 = Transform_1.Transform.Create();
    this.TmpTrans3 = Transform_1.Transform.Create();
    this.CacheHandIk = [new HoldingHandsUtils_1.IkTarget(), new HoldingHandsUtils_1.IkTarget()];
    this.IsAttachToMoveSceneItem = false;
    this.p6f = 0;
    this.OnEnterVehicleWrapper = e => {
      this.OnEnterVehicle(e);
    };
    this.OnLeaveVehicleWrapper = e => {
      this.OnLeaveVehicle(e);
    };
    this.OnRoleGameplayAnimInstChanged = e => {
      if (this.VehicleInfo && (e = e) && e.SetVehicle) {
        e.SetVehicle(this.VehicleInfo.VehicleEntity?.Id ?? 0);
      }
    };
    this.Ejr = (e, t, i, s, o) => {
      if (!this.Entity.HasDisableKey(1)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Vehicle", 6, "Error Change MovementMode when Riding", ["Actor", this.ActorComp?.Actor.GetName()], ["From Mode", t], ["Custom", s], ["To Mode", i], ["Custom", o]);
        }
      }
    };
    this.OnTeleportChangleLocation = () => {
      if (this.NeedLeaveVehicleWhenTeleport()) {
        this.VehicleInfo.VehicleEntity?.GetComponent(246)?.Leave(this.Entity, 1);
      }
    };
    this.OnMoveRide = e => {
      var t;
      if (this.MoveComp && this.ActorComp?.Actor.GetAttachRootParentActor()?.IsValid() && (t = this.ActorComp?.Actor.CharacterMovement?.RootMotionParams)?.bHasRootMotion && this.VehicleInfo?.VehicleType !== "Motorcycle") {
        this.TmpVector1.FromUeVector(this.MoveComp.CharacterMovement.Velocity);
        this.TmpVector1.MultiplyEqual(e);
        if (this.TmpVector1.ContainsNaN()) {
          this.TmpVector2.FromUeVector(t.RootMotionTransform.GetLocation());
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Vehicle", 50, "[OnMoveRide] RootMotion计算存在NAN", ["WorldOffset", this.TmpVector1], ["RootMotionOffset", this.TmpVector2]);
          }
        } else {
          this.ActorComp.SetForbidSettingLocAndRot(false, 0);
          this.ActorComp.AddActorWorldOffset(this.TmpVector1.ToUeVector(), "OnMoveRide", this.ShouldMoveSweep());
          this.ActorComp.SetForbidSettingLocAndRot(true, 0);
          this.ActorComp.ResetAllCachedTime();
        }
      }
    };
    this.WQf = (e, t) => {
      this.EnableUeMovementComp(t, "OnEnableUeMovementTagChanged");
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
  get VehicleTypeInt() {
    return VehicleInfoDefines_1.VehicleInfoDefines.ConvertToVehicleTypeInt(this.VehicleInfo?.VehicleType);
  }
  get VehicleEntity() {
    return this.VehicleInfo?.VehicleEntity;
  }
  get Seat() {
    return this.VehicleInfo?.Seat ?? -1;
  }
  get CanLeave() {
    return !!this.VehicleEntity?.GetComponent(250)?.CheckIfCanLeave();
  }
  get CanSprint() {
    return !!this.VehicleEntity?.GetComponent(250)?.CheckIfCanSprint();
  }
  get CanRiderSharing() {
    return !!this.VehicleEntity?.GetComponent(250)?.CheckIfCanRiderSharing();
  }
  IsVehicleType(e) {
    return this.VehicleInfo?.VehicleType === e;
  }
  IsEnableLongPressLeave() {
    return !!this.IsVehicleType("Gongduola") || !!this.IsVehicleType("AutoMoveGongduola");
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(3);
    this.MoveComp = this.Entity.GetComponent(48);
    this.UnifiedStateComp = this.Entity.GetComponent(111);
    this.TagComp = this.Entity.GetComponent(217);
    this.BuffComp = this.Entity.GetComponent(222);
    this.UeMovementComp = this.Entity.GetComponent(124);
    this.EntityHandle = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.Entity.Id);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveRide, this.OnMoveRide);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.TeleportChangeLocation, this.OnTeleportChangleLocation);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnEnterVehicle, this.OnEnterVehicleWrapper);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnLeaveVehicle, this.OnLeaveVehicleWrapper);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnRoleGameplayAnimInstChanged, this.OnRoleGameplayAnimInstChanged);
    this.CacheHandIk = [new HoldingHandsUtils_1.IkTarget(), new HoldingHandsUtils_1.IkTarget()];
    return true;
  }
  OnPostActivate() {
    ControllerHolder_1.ControllerHolder.VehicleController.OnCharacterEnable(this.Entity);
  }
  OnEnd() {
    this.NFf = undefined;
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveRide, this.OnMoveRide);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.TeleportChangeLocation, this.OnTeleportChangleLocation);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnEnterVehicle, this.OnEnterVehicleWrapper);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnLeaveVehicle, this.OnLeaveVehicleWrapper);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnRoleGameplayAnimInstChanged, this.OnRoleGameplayAnimInstChanged);
    if (this.VehicleInfo) {
      this.VehicleInfo.VehicleEntity?.GetComponent(246)?.Leave(this.Entity, 1);
    }
    return true;
  }
  OnTick(e) {
    if (this.VehicleInfo) {
      if (this.VehicleEntity?.Active) {
        this.p6f = 0;
      } else {
        this.p6f += e;
        if (this.p6f > VEHICLE_DISABLE_TIME_LENGTH_THRESHOLD) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Vehicle", 6, "座驾长时间处于非激活状态，脱离乘坐", ["Actor", this.ActorComp?.Actor.GetName()], ["Vehicle", this.VehicleEntity?.GetComponent(247)?.Actor.GetName()]);
          }
          if (e = this.VehicleEntity?.GetComponent(246)) {
            e.TryLeaveAtOnce(this.Entity, 0, "EnterDisableVehicle");
          } else {
            this.OnLeaveVehicle(this.VehicleInfo);
          }
        }
      }
    }
  }
  OnEnterVehicle(e) {
    this.VehicleInfo = e;
    this.MoveComp.IsSpecialMove = true;
    this.MoveComp.NeedRootMotionWhenAttached = true;
    if (gongduolaTypes.has(this.VehicleType)) {
      this.SetWaterEffect(false);
    }
    this.EnterVehiclePerform(e);
    this.ListenAutoLeave();
    this.RegisterExtraFollow(e);
    this.TryDisableUeMovementComp();
    if (e.VehicleType === "Motorcycle" && GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsSupportedAFME) {
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.TemporaryDisableAFME("RotationMovingOnMobile");
    }
    if (e.VehicleType === "Motorcycle" && Platform_1.Platform.IsPcOrGamepadPlatform()) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.KuroDisableToonVelocity 1");
    }
    if (this.VehicleType === "Gongduola" || this.VehicleType === "AutoMoveGongduola") {
      if (e.IsRolePassenger(true)) {
        this.ReplaceExploreSkillForGongduola();
      }
    }
    if (e.VehicleType === "Motorcycle" && this.IsDriver) {
      e = this.ActorComp.CreatureData.GetRoleConfig()?.RoleBody;
      this.NFf = e ? motorHandIkConfigsForRoleTypes.get(e) : undefined;
    } else {
      this.NFf = undefined;
    }
  }
  async OnLeaveVehicle(e) {
    this.NFf = undefined;
    this.UnregisterExtraFollow(e);
    if (this.VehicleType === "Gongduola" || this.VehicleType === "AutoMoveGongduola") {
      if (e.IsRolePassenger(true)) {
        this.ResetExploreSkillForGongduola();
      }
    }
    this.LeavePerformEndPromise = new GameModePromise_1.GameModePromise();
    this.LeaveVehiclePerform(e);
    this.RemoveListenAutoLeave();
    if (!this.WasLeavePerformFinish) {
      e = this.ActorComp?.CreatureData.GetPbDataId();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 50, "等待离开载具表现(开始)", ["PbDataId", e]);
      }
      await this.LeavePerformEndPromise.Promise;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 50, "等待离开载具表现(完成)", ["PbDataId", e]);
      }
    }
    this.WasLeavePerformFinish = false;
    this.LeavePerformEndPromise = undefined;
    this.VehicleInfo = undefined;
    this.MoveComp.IsSpecialMove = false;
    if (!this.IsAttachToMoveSceneItem) {
      this.MoveComp.NeedRootMotionWhenAttached = false;
    }
    if (gongduolaTypes.has(this.VehicleType)) {
      this.SetWaterEffect(true);
    }
    this.TryEnableUeMovementComp();
    if (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsSupportedAFME) {
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelTemporaryDisableAFME("RotationMovingOnMobile");
    }
    if (Platform_1.Platform.IsPcOrGamepadPlatform()) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.KuroDisableToonVelocity 0");
    }
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
    if (!this.TagComp?.HasTag(-648310348)) {
      this.ActorComp.Actor.K2_DetachFromActor(1, 1, 1);
    }
    if (this.IsAttachToMoveSceneItem && (e = e.VehicleEntity?.GetComponent(214)?.Owner)) {
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
    if (this.ShouldDisableMoveSync()) {
      this.Entity.GetComponent(72)?.SetEnableMovementSync(false, "CharDriveVehicleComp.ChangeCurrentState");
    }
    this.Entity.GetComponent(188)?.ConsumeRootMotion();
    this.ActorComp.Actor.KuroSetMovementMode({
      Mode: 6,
      CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RIDE,
      Context: "[CharacterDriveVehicleComponent.ClearCurrentState]"
    });
    this.UnifiedStateComp?.SetMoveState(this.GetMoveStateFromVehicleType(this.VehicleType));
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharMovementModeChanged, this.Ejr);
    this.IgnoreVehicleCollision(true);
  }
  IgnoreVehicleCollision(e) {
    if (this.VehicleInfo) {
      var t = this.VehicleInfo.VehicleEntity;
      switch (this.VehicleInfo.VehicleType) {
        case "SceneItemAutoMoveVehicle":
        case "CoBathingEmptyVehicle":
          t.GetComponent(214).Owner?.IgnoreActorWhenMoving(this.ActorComp.Actor, e, true);
          break;
        case "NpcVehicle":
          t.GetComponent(3).Actor.IgnoreActorWhenMoving(this.ActorComp.Actor, e, true);
          break;
        default:
          var i = t.GetComponent(247);
          i.Actor.IgnoreActorWhenMoving(this.ActorComp.Actor, e, true);
          i.Actor.PlatformActor?.IgnoreActorWhenMoving(this.ActorComp.Actor, e, true);
      }
    }
  }
  RestoreState() {
    if (this.ShouldDisableMoveSync()) {
      this.Entity.GetComponent(72)?.SetEnableMovementSync(true, "CharDriveVehicleComp.RestoreState");
    }
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharMovementModeChanged, this.Ejr);
    this.ActorComp.Actor.KuroSetMovementMode({
      Mode: 3,
      Context: "[CharacterDriveVehicleComponent.RestoreState]"
    });
    this.IgnoreVehicleCollision(false);
    this.IsLeavingVehicle = false;
  }
  ListenAutoLeave() {}
  RemoveListenAutoLeave() {}
  RegisterExtraFollow(e) {
    var t;
    if (this.VehicleType === "Motorcycle" && (t = this.ActorComp?.Actor.Mesh?.GetLinkedAnimGraphInstanceByTag(new UE.FName("ABP_Gameplay"))) && t.SetVehicle) {
      t.SetVehicle(e.VehicleEntity?.Id ?? 0);
    }
  }
  UnregisterExtraFollow(e) {
    var t;
    if (this.VehicleType === "Motorcycle" && (t = this.ActorComp?.Actor.Mesh?.GetLinkedAnimGraphInstanceByTag(new UE.FName("ABP_Gameplay"))) && t.SetVehicle) {
      t.SetVehicle(0);
    }
  }
  SetWaterEffect(e) {
    if (this.HasWaterEffect !== e) {
      this.HasWaterEffect = e;
      this.ActorComp.Actor.CharRenderingComponent?.SetNoWater(!e);
    }
  }
  PreEnterVehiclePerform(e) {
    this.PreEnterEffectTime = 0;
    var e = e.VehicleEntity?.GetComponent(250)?.Config;
    if (e && (e.PreEnterEffect !== "" && e.PreEnterEffect !== "None" && EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.ActorComp?.ActorTransform, e.PreEnterEffect, "CharacterDriveVehicle.PlayPreOnBoardEffect", new EffectContext_1.EffectContext(this.Entity.Id)), e.PreEnterMatEffect.length > 0) && (e = ResourceSystem_1.ResourceSystem.Load(e.PreEnterMatEffect, UE.PD_CharacterControllerData_C))?.IsValid()) {
      this.PreEnterEffectTime = e.LoopTime.Start + e.LoopTime.Loop;
      this.ActorComp.Actor.CharRenderingComponent.AddMaterialControllerData(e);
    }
  }
  PostEnterVehiclePerform(e) {
    var e = e.VehicleEntity?.GetComponent(250)?.Config;
    if (e && (e.PostEnterEffect !== "" && e.PostEnterEffect !== "None" && EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.ActorComp?.ActorTransform, e.PostEnterEffect, "CharacterDriveVehicle.PlayPostOnBoardEffect", new EffectContext_1.EffectContext(this.Entity.Id)), e.PostEnterMatEffect.length > 0) && (e = ResourceSystem_1.ResourceSystem.Load(e.PostEnterMatEffect, UE.PD_CharacterControllerDataGroup_C))?.IsValid()) {
      this.ActorComp.Actor.CharRenderingComponent.AddMaterialControllerDataGroup(e);
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
          var s = this.VehicleInfo.VehicleEntity.GetComponent(300);
          if (s && !(e = s?.SkeletonMeshComponent)) {
            const h = VehicleInfoDefines_1.VehicleInfoDefines.GetSeatSocketName(this.VehicleInfo.Seat);
            e = s?.GetStaticMeshVehicleSeats(h.toString());
            t = false;
          }
          break;
        default:
          e = this.VehicleInfo.VehicleEntity.GetComponent(247)?.Actor?.Mesh;
      }
      if (e && i) {
        const h = t ? VehicleInfoDefines_1.VehicleInfoDefines.GetSeatSocketName(this.VehicleInfo.Seat) : FNameUtil_1.FNameUtil.EMPTY;
        var o = t ? e.D_GetSocketTransform(h) : e.D_GetRelativeTransform();
        var r = t ? i.ActorTransform.GetRelativeTransform(o) : e.D_GetRelativeTransform();
        this.SeatReletiveTrans.FromUeTransform(r);
        this.TmpVector1.FromUeVector(o.GetLocation());
        if (this.TmpVector1.Equals(Vector_1.Vector.ZeroVectorProxy) && (this.TmpVector1.DeepCopy(i.ActorLocationProxy), Log_1.Log.CheckWarn())) {
          Log_1.Log.Warn("Vehicle", 50, "进入载具设置位置时找不到Socket", ["VehiclePbId", i?.CreatureData.GetPbDataId()], ["PassengerPbId", this.ActorComp?.CreatureData.GetPbDataId()], ["SocketName", h]);
        }
        this.ActorComp.Actor.K2_AttachToComponent(e, h, 0, 2, 1, false);
        this.ActorComp.SetForbidSettingLocAndRot(false, 0);
        this.SetRelativeTransform(e, h);
        this.ActorComp.ResetAllCachedTime();
        this.Entity.GetComponent(31)?.MarkDebugRecord("Attach到载具", undefined, true);
        this.ActorComp.SetForbidSettingLocAndRot(true, 0);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Test", 50, "DriverTransformInfo", ["Actor", this.ActorComp?.Actor.GetName()], ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["CreatureId", this.ActorComp?.CreatureData.GetCreatureDataId()], ["Transform", this.ActorComp?.ActorTransform], ["RelativeTrans", this.ActorComp?.Actor.RootComponent?.GetRelativeTransform()]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 50, "进入载具设置位置时找不到载具的ActorComp或Mesh", ["VehiclePbId", i?.CreatureData.GetPbDataId()], ["VehicleType", this.VehicleInfo.VehicleType]);
      }
    }
  }
  SetRelativeTransform(e, t, i = false) {
    this.TmpVector1.Set(0, 0, this.ActorComp.HalfHeight - exports.DEFAULT_SITTING_HEIGHT);
    this.TmpVector1.AdditionEqual(this.AttachOffset);
    this.TmpTrans.SetLocation(this.TmpVector1);
    this.TmpTrans.SetRotation(Quat_1.Quat.IdentityProxy);
    this.TmpTrans.SetScale3D(Vector_1.Vector.OneVector);
    this.TmpTrans2.FromUeTransform(this.ActorComp.Actor.RootComponent.D_GetRelativeTransform());
    var s = this.TmpTrans.GetLocation().Equals(this.TmpTrans2.GetLocation(), 1) && this.TmpTrans.GetRotation().Equals(this.TmpTrans2.GetRotation(), 0.01);
    if (!s) {
      if (i && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 6, "Vehicle.SetRelativeTransform Seat RelativePosError", ["Passenger", this.ActorComp?.Actor.GetName()], ["ErrorTrans", this.TmpTrans2], ["Seat", t.toString()]);
      }
      this.ActorComp.Actor.D_K2_SetActorRelativeTransform(this.TmpTrans.ToUeTransform(), false, undefined, false);
    }
    return s;
  }
  MotorCheckAndResetRelativeTransform() {
    var e;
    var t;
    if (!this.MoveComp?.CharacterMovement || this.MoveComp.CharacterMovement.MovementMode === 6 && this.MoveComp.CharacterMovement.CustomMovementMode === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RIDE) {
      return !!this.VehicleInfo?.VehicleEntity && !!(e = this.VehicleInfo.VehicleEntity.GetComponent(247)?.Actor?.Mesh) && (t = VehicleInfoDefines_1.VehicleInfoDefines.GetSeatSocketName(this.VehicleInfo.Seat), this.Entity.GetComponent(188)?.CheckAndResetModel(), this.SetRelativeTransform(e, t, true));
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 6, "Vehicle.MotorCheckAndResetRelativeTransform", ["Passenger", this.ActorComp?.Actor.GetName()], ["Mode", this.MoveComp.CharacterMovement.MovementMode], ["Custom", this.MoveComp.CharacterMovement.CustomMovementMode]);
      }
      this.ActorComp.Actor.KuroSetMovementMode({
        Mode: 6,
        CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RIDE,
        Context: "[CharacterDriveVehicleComponent.ClearCurrentState]"
      });
      return false;
    }
  }
  GetSeatTransform(e) {
    var t;
    var i;
    return !!this.VehicleInfo && (i = this.VehicleInfo.VehicleType !== "NpcVehicle" ? this.VehicleInfo.VehicleEntity.GetComponent(247) : this.VehicleInfo.VehicleEntity.GetComponent(3), t = VehicleInfoDefines_1.VehicleInfoDefines.GetSeatSocketName(this.VehicleInfo.Seat), i = i.Actor.Mesh.D_GetSocketTransform(t), e.FromUeTransform(i), true);
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
    if (ModelManager_1.ModelManager.ExploreModel.CheckNeedChangeSkill(1009, 2)) {
      ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(1009, undefined, true);
    }
    ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(1009, 2, "贡多拉拍照");
  }
  ResetExploreSkillForGongduola() {
    ModelManager_1.ModelManager.ExploreModel.ResetExplodeSkillId(2, "ResetExploreSkillForGongduola");
    var e = ModelManager_1.ModelManager.ExploreModel.GetTopLayerExplodeSkillId();
    ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(e, undefined, true);
  }
  GetHandIkTarget() {
    var t = [undefined, undefined];
    if (this.NFf) {
      var e = this.ActorComp?.Actor.Mesh;
      var i = this.VehicleEntity?.GetComponent(247)?.Actor.Mesh;
      if (e && i) {
        this.TmpTrans3.FromUeTransform(e.D_K2_GetComponentToWorld());
        for (let e = 0; e < 2; ++e) {
          var s = this.NFf[e];
          var o = this.CacheHandIk[e];
          this.TmpTrans.FromUeTransform(i.D_GetSocketTransform(s.MotorBone, 0));
          s.HandTrans.ComposeTransforms(this.TmpTrans, this.TmpTrans2);
          this.TmpTrans2.UnComposeTransform(this.TmpTrans3, this.TmpTrans);
          o.Location.DeepCopy(this.TmpTrans.GetLocation());
          o.Rotation.DeepCopy(this.TmpTrans.GetRotation());
          o.Alpha = 1;
          t[e] = o;
        }
      }
    }
    return t;
  }
  GetHandIkTargetUe() {
    if (this.NFf) {
      return [this.CacheHandIk[0].ToUeIkTarget(), this.CacheHandIk[1].ToUeIkTarget()];
    } else {
      return [undefined, undefined];
    }
  }
  TryDisableUeMovementComp() {
    var e;
    if (this.UeMovementComp) {
      this.TagComp?.AddTagAddOrRemoveListener(e = 170413930, this.WQf);
      if (!this.TagComp?.HasTag(e)) {
        this.EnableUeMovementComp(false, "OnEnterVehicle");
      }
    }
  }
  TryEnableUeMovementComp() {
    if (this.UeMovementComp) {
      this.TagComp?.RemoveTagAddOrRemoveListener(170413930, this.WQf);
      this.EnableUeMovementComp(true, "OnLeaveVehicle");
    }
  }
  EnableUeMovementComp(e, t = "") {
    if (this.UeMovementComp) {
      if (e && this.UeMovementCompDisableHandle) {
        this.UeMovementComp.Enable(this.UeMovementCompDisableHandle, t);
        this.UeMovementCompDisableHandle = 0;
        this.Entity.GetComponent(188)?.ConsumeRootMotion();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Vehicle", 50, "开启乘客移动组件", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Reason", t]);
        }
      } else if (!e && !this.UeMovementCompDisableHandle) {
        this.UeMovementCompDisableHandle = this.UeMovementComp.Disable(t);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Vehicle", 50, "关闭乘客移动组件", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Reason", t]);
        }
      }
    }
  }
  ShouldMoveSweep() {
    switch (this.VehicleType) {
      case "Gongduola":
      case "AutoMoveGongduola":
      case "CoBathingEmptyVehicle":
      case "SceneItemAutoMoveVehicle":
        return false;
      default:
        return true;
    }
  }
  ShouldDisableMoveSync() {
    return !!this.VehicleEntity?.GetComponent(0)?.IsVehicle();
  }
};
CharacterDriveVehicleComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(242)], CharacterDriveVehicleComponent);
exports.CharacterDriveVehicleComponent = CharacterDriveVehicleComponent; //# sourceMappingURL=CharacterDriveVehicleComponent.js.map
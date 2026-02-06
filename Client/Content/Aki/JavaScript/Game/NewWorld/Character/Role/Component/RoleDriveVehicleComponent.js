"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var h;
  var o = arguments.length;
  var r = o < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (h = t[n]) {
        r = (o < 3 ? h(r) : o > 3 ? h(e, i, r) : h(e, i)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDriveVehicleComponent = undefined;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../../../Module/Abilities/FormationAttributeController");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const CombatLog_1 = require("../../../../Utils/CombatLog");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const BasePlatform_1 = require("../../../Common/BasePlatform");
const VehicleConfig_1 = require("../../../Vehicle/Common/VehicleConfig");
const FollowUtils_1 = require("../../Common/Component/Abilities/Follow/FollowUtils");
const CharacterActionComponent_1 = require("../../Common/Component/Action/CharacterActionComponent");
const CharacterDriveVehicleComponent_1 = require("../../Common/Component/CharacterDriveVehicleComponent");
const STAND_UP_EXIT_DELAY_TIME = 1700;
let RoleDriveVehicleComponent = class RoleDriveVehicleComponent extends CharacterDriveVehicleComponent_1.CharacterDriveVehicleComponent {
  constructor() {
    super(...arguments);
    this.ParaglidingDelayHandle = undefined;
    this.PlatformActorToIgnore = undefined;
    this.GuaranteeBounceSkillEndHandle = undefined;
    this.AddMoveHandle = 0;
    this.SwimDelayHandle = undefined;
    this.OnParaglidingDelayFinish = () => {
      var t;
      if (this.Entity?.Valid) {
        this.ParaglidingDelayHandle = undefined;
        this.TagComp?.RemoveTag(-1747001544);
        t = this.ActorComp.CreatureData.GetPlayerId();
        ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(t, {
          ParamType: 2,
          IsControl: true
        })?.EntityHandle?.Entity?.GetComponent(189)?.TrySetGlide();
      }
    };
    this.GuaranteeBounceSkillEnd = () => {
      if (this.Entity?.Valid && (this.GuaranteeBounceSkillEndHandle = undefined, EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSkillEnd, this.OnBounceSkillEnd))) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillEnd, this.OnBounceSkillEnd);
        this.RestoreSwimAndCollision();
      }
    };
    this.OnBounceSkillEnd = (t, e) => {
      if (e === CharacterActionComponent_1.LEAVE_VEHICLE_BOUNCE_SKILL_ID && (EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillEnd, this.OnBounceSkillEnd), this.GuaranteeBounceSkillEndHandle)) {
        TimerSystem_1.TimerSystem.Remove(this.GuaranteeBounceSkillEndHandle);
        this.GuaranteeBounceSkillEndHandle = undefined;
        this.RestoreSwimAndCollision();
      }
    };
    this.lFm = (t, e) => {
      if (e && this.VehicleInfo) {
        CombatLog_1.CombatLog.Info("Vehicle", this.Entity, "角色被抓取请求离开载具");
        this.TryLeaveAndDisableVehicle("RoleDriveVehicleComponent.OnCaughtTagChange", true);
      }
    };
    this.OYm = t => {
      if (this._Fm() && this.VehicleInfo && !t) {
        CombatLog_1.CombatLog.Info("Vehicle", this.Entity, "角色被冻结结束请求离开载具");
        this.TryLeaveAndDisableVehicle("RoleDriveVehicleComponent.OnFrozenChange", true);
      }
    };
    this.OnCharBeHitAnim = () => {
      if (!!this.VehicleInfo && !this.TagComp?.HasTag(-1988938205)) {
        CombatLog_1.CombatLog.Info("Vehicle", this.Entity, "角色被伤害请求离开载具");
        this.TryLeaveAndDisableVehicle("RoleDriveVehicleComponent.OnCharBeHitAnim", true);
      }
    };
    this.OnRoleDead = () => {
      if (this.VehicleInfo) {
        this.TryLeaveAndDisableVehicle("RoleDriveVehicleComponent.OnRoleDead", true);
      }
    };
    this.OnBanMotorTag = (t, e) => {
      if (this.VehicleEntity && e && (ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(this.VehicleEntity, false, "禁用摩托", true), e = this.VehicleEntity.GetComponent(246))) {
        e.TryLeaveAllAtOnce(0, "OnBanMotorTag");
      }
    };
    this.OnEnterOrExitUnopenedArea = t => {
      if (this.VehicleEntity && t && (ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(this.VehicleEntity, false, "禁用摩托", true), t = this.VehicleEntity.GetComponent(246))) {
        t.TryLeaveAllAtOnce(0, "OnEnterOrExitUnopenedArea");
      }
    };
    this.OnMoveStateChanged = (t, e) => {
      this.ForceStopAddMove();
    };
  }
  OnStart() {
    return !!super.OnStart() && (EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.OnMoveStateChanged), true);
  }
  OnTick(t) {
    super.OnTick(t);
    if (!this.IsOnVehicle) {
      t = this.ActorComp.Actor.BasedMovement;
      if (BasePlatform_1.BasePlatformController.GetBasePlatformByBasedMovementInfo(t) instanceof BasePlatform_1.VehicleBasePlatform) {
        this.SetWaterEffect(false);
      } else {
        this.SetWaterEffect(true);
      }
    }
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.OnMoveStateChanged);
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSkillEnd, this.OnBounceSkillEnd)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillEnd, this.OnBounceSkillEnd);
    }
    if (this.ParaglidingDelayHandle) {
      TimerSystem_1.TimerSystem.Remove(this.ParaglidingDelayHandle);
    }
    this.ParaglidingDelayHandle = undefined;
    if (this.GuaranteeBounceSkillEndHandle) {
      TimerSystem_1.TimerSystem.Remove(this.GuaranteeBounceSkillEndHandle);
    }
    this.GuaranteeBounceSkillEndHandle = undefined;
    return super.OnEnd();
  }
  LeaveVehiclePerform(t) {
    switch (t.ExitType) {
      case 0:
        super.LeaveVehiclePerform(t);
        this.JumpToAirAndParagliding(t);
        break;
      case 1:
        this.LeaveVehiclePerformStandUp(t);
        break;
      case 2:
        this.TagComp.AddTag(-1266260958);
        this.TagComp.AddTag(170413930);
        this.IsLeavingVehicle = true;
        InputDistributeController_1.InputDistributeController.RefreshInputTag();
        TimerSystem_1.TimerSystem.Delay(() => {
          super.LeaveVehiclePerform(t);
          InputDistributeController_1.InputDistributeController.RefreshInputTag();
          this.TagComp?.RemoveTag(170413930);
        }, STAND_UP_EXIT_DELAY_TIME);
        break;
      default:
        super.LeaveVehiclePerform(t);
    }
  }
  LeaveVehiclePerformStandUp(t) {
    if (t.VehicleType === "Motorcycle") {
      super.LeaveVehiclePerform(t);
      this.LeaveVehiclePerformStandUpMotorcycle(t);
    } else {
      super.LeaveVehiclePerform(t);
    }
    Quat_1.Quat.FindBetween(this.ActorComp.ActorUpProxy, this.MoveComp.GravityUp, this.TmpQuat);
    var t = this.Entity.GetComponent(188);
    var e = Quat_1.Quat.Create();
    this.TmpQuat.Multiply(this.ActorComp.ActorQuatProxy, e);
    var i = Rotator_1.Rotator.Create();
    e.Rotator(i);
    if (t) {
      t.SetLocationAndRotatorWithModelBuffer(this.ActorComp.ActorLocation, i.ToUeRotator(), 300, "LeaveVehicle.StandUp");
    } else {
      this.ActorComp.SetActorRotation(i.ToUeRotator(), "LeaveVehicle.StandUp");
    }
  }
  LeaveVehiclePerformStandUpMotorcycle(t) {
    var e;
    var i;
    var s = t.VehicleEntity?.GetComponent(247);
    var t = t.VehicleEntity?.GetComponent(268);
    if (s && t) {
      e = t.LaunchSpeedFadeTime;
      i = t.LaunchSpeedFadeCurve;
      t = t.LaunchVehicleSpeedAddRatio;
      this.TmpVector1.FromUeVector(s.ActorVelocityProxy);
      this.TmpVector1.MultiplyEqual(t);
      if (GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.ActorComp, this.TmpVector1) < 0) {
        GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, this.TmpVector1);
      }
      if (!this.TmpVector1.IsNearlyZero()) {
        this.AddMoveHandle = this.MoveComp.SetAddMoveWorld(this.TmpVector1.ToUeVector(), e, i, this.AddMoveHandle, undefined, i === undefined ? 3 : 0);
      }
    }
  }
  async JumpToAirAndParagliding(t) {
    var e;
    var i;
    var s;
    var h;
    var o = t.PassengerEntity?.GetComponent(2);
    if (o && (o.Actor.KuroSetMovementMode({
      Mode: 3,
      Context: "[RoleDriveVehicleComponent.JumpToAirAndParagliding]"
    }), o = t.VehicleEntity?.GetComponent(246)) && (h = (o.Config?.BounceTime ?? VehicleConfig_1.DEFAULT_BOUNCE_TIME) * MathUtils_1.MathUtils.MillisecondToSecond, s = o.Config?.BounceHeight ?? VehicleConfig_1.DEFAULT_BOUNCE_HEIGHT, e = o.Config?.BounceCurve ?? VehicleConfig_1.DEFAULT_BOUNCE_CURVE, i = this.Entity.GetComponent(29), o?.GetVehicleVelocity(this.TmpVector1), this.TmpVector1.MultiplyEqual(h * 0.5), GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, this.TmpVector1), await i?.StartBounceWithHorizontalOffset(s, this.TmpVector1, h, e)) && this.Entity?.Valid) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillEnd, this.OnBounceSkillEnd);
      if (o.VehicleType === "NpcVehicle") {
        i = t.VehicleEntity?.GetComponent(3);
        this.PlatformActorToIgnore = i?.Actor;
      } else {
        s = t.VehicleEntity?.GetComponent(247);
        this.PlatformActorToIgnore = s?.Actor.PlatformActor;
      }
      if (this.PlatformActorToIgnore?.IsValid()) {
        this.ActorComp?.Actor.IgnoreActorWhenMoving(this.PlatformActorToIgnore, true, true);
      }
      h = o.Config?.ParaglidingDelayTime ?? VehicleConfig_1.PARAGLIDING_DELAY_MILISECONDS;
      this.TagComp?.AddTag(-1747001544);
      this.ParaglidingDelayHandle = TimerSystem_1.TimerSystem.Delay(this.OnParaglidingDelayFinish, h);
      this.GuaranteeBounceSkillEndHandle = TimerSystem_1.TimerSystem.Delay(this.GuaranteeBounceSkillEnd, h);
    }
  }
  RestoreSwimAndCollision() {
    if (this.Entity?.Valid && this.PlatformActorToIgnore?.IsValid()) {
      this.ActorComp?.Actor.IgnoreActorWhenMoving(this.PlatformActorToIgnore, false, true);
      this.PlatformActorToIgnore = undefined;
    }
  }
  ChangeCurrentState() {
    var t = this.Entity.GetComponent(43);
    if (t.GetSkillIdWithGroupId(2) !== 800001) {
      t?.EndOwnerAndFollowSkills();
    }
    this.ForceStopAddMove();
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnBeforeCharActionWithTarget, 2);
    this.TagComp?.RemoveTag(-1523054094);
    this.TagComp.AddTag(525255941);
    this.TagComp?.AddTag(464607714);
    if (this.SwimDelayHandle) {
      TimerSystem_1.TimerSystem.Remove(this.SwimDelayHandle);
      this.SwimDelayHandle = undefined;
    }
    super.ChangeCurrentState();
  }
  RestoreState() {
    super.RestoreState();
    if (this.VehicleInfo?.ExitType === 2) {
      this.ActorComp.Actor.KuroSetMovementMode({
        Mode: 1,
        Context: "[CharacterDriveVehicleComponent.RestoreState]"
      });
      --this.ActorComp.MoveComp.GroundedTimeUe;
    }
    if (this.SwimDelayHandle) {
      TimerSystem_1.TimerSystem.Remove(this.SwimDelayHandle);
      this.SwimDelayHandle = undefined;
    }
    if (this.VehicleInfo?.ExitType !== 0) {
      this.TagComp.RemoveTag(464607714);
    } else {
      this.SwimDelayHandle = TimerSystem_1.TimerSystem.Delay(() => {
        this.TagComp.RemoveTag(464607714);
        this.SwimDelayHandle = undefined;
      }, VehicleConfig_1.PARAGLIDING_DELAY_MILISECONDS);
    }
    this.TagComp.RemoveTag(525255941);
  }
  ListenAutoLeave() {
    super.ListenAutoLeave();
    if (this.BuffComp?.HasBuffAuthority()) {
      this.TagComp?.AddTagAddOrRemoveListener(-648310348, this.lFm);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharAfterFrozenChange, this.OYm);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitAnim, this.OnCharBeHitAnim);
    }
    if (this.ActorComp?.IsRoleAndCtrlByMe) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.OnRoleDead);
    }
    if (this.VehicleType === "Motorcycle") {
      this.TagComp?.AddTagAddOrRemoveListener(379437700, this.OnBanMotorTag);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnEnterOrExitUnopenedArea, this.OnEnterOrExitUnopenedArea);
    }
  }
  RemoveListenAutoLeave() {
    super.RemoveListenAutoLeave();
    if (this.BuffComp?.HasBuffAuthority()) {
      this.TagComp?.RemoveTagAddOrRemoveListener(-648310348, this.lFm);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharAfterFrozenChange, this.OYm);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitAnim, this.OnCharBeHitAnim);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.OnRoleDead)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.OnRoleDead);
    }
    if (this.VehicleType === "Motorcycle") {
      this.TagComp?.RemoveTagAddOrRemoveListener(379437700, this.OnBanMotorTag);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnEnterOrExitUnopenedArea, this.OnEnterOrExitUnopenedArea);
    }
  }
  _Fm() {
    return FormationAttributeController_1.FormationAttributeController.GetValue(16) <= 0;
  }
  TryLeaveAndDisableVehicle(t, e = false) {
    var i;
    var s;
    if (this.VehicleInfo && this.VehicleInfo.VehicleType === "Motorcycle") {
      if (i = this.VehicleInfo.VehicleEntity) {
        CombatLog_1.CombatLog.Info("Vehicle", this.Entity, t + ":请求离开载具");
        s = i.GetComponent(246);
        if (e) {
          s?.TryLeaveAtOnce(this.Entity, 1, t);
        } else {
          s?.TryLeave(this.Entity, 1);
        }
        if (FollowUtils_1.FollowUtils.GetPlayerFollowVehicle(ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), "Motorcycle")?.Entity?.Id === i.Id) {
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(i, false, t, true);
        }
      } else {
        CombatLog_1.CombatLog.Error("Vehicle", this.Entity, t + ":请求离开载具失败");
      }
    }
  }
  ForceStopAddMove() {
    this.MoveComp?.StopAddMove(this.AddMoveHandle);
    this.AddMoveHandle = 0;
  }
};
RoleDriveVehicleComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(243)], RoleDriveVehicleComponent);
exports.RoleDriveVehicleComponent = RoleDriveVehicleComponent; //# sourceMappingURL=RoleDriveVehicleComponent.js.map
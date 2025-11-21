"use strict";

var __decorate = this && this.__decorate || function (t, i, e, s) {
  var h;
  var r = arguments.length;
  var o = r < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, i, e, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (h = t[n]) {
        o = (r < 3 ? h(o) : r > 3 ? h(i, e, o) : h(i, e)) || o;
      }
    }
  }
  if (r > 3 && o) {
    Object.defineProperty(i, e, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GongduolaPerformComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const Global_1 = require("../../../Global");
const InputEnums_1 = require("../../../Input/InputEnums");
const GameSplineComponent_1 = require("../../../LevelGamePlay/Common/GameSplineComponent");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BattleUiControl_1 = require("../../../Module/BattleUi/BattleUiControl");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const CreatureController_1 = require("../../../World/Controller/CreatureController");
const VehicleInfoDefines_1 = require("../Common/VehicleInfoDefines");
const VehiclePerformComponent_1 = require("../Common/VehiclePerformComponent");
const GongduolaConfig_1 = require("./GongduolaConfig");
const IMPACT_ANIM_TIME = 1000;
const BORN_FIX_DOWN_WATER_DETECT_DIST = 200;
const BORN_FIX_UP_WATER_DETECT_DIST = 200;
const UP_WATERMOVE_MONTAGE_PATH = "/Game/Aki/Character/NPC/AlienNPC/Level_B/SB1Gongduola3/BaseAnim/AM_Waterfall.AM_Waterfall";
const DOWN_WATERMOVE_MONTAGE_PATH = "/Game/Aki/Character/NPC/AlienNPC/Level_B/SB1Gongduola3/BaseAnim/AM_Waterfall_Down.AM_Waterfall_Down";
const DYNAMIC_GRAVITY_WATERMOVE_MONTAGE_PATH = "/Game/Aki/Character/NPC/AlienNPC/Level_B/SB1Gongduola3/BaseAnim/AM_Waterfall_GravityFlip.AM_Waterfall_GravityFlip";
const PROFILE_DETECT_WATER = "VehiclePerformComponent_SimpleWaterTrace";
let GongduolaPerformComponent = class GongduolaPerformComponent extends VehiclePerformComponent_1.VehiclePerformComponent {
  constructor() {
    super(...arguments);
    this.UeMovementMgr = undefined;
    this.ImpactTimerHandle = undefined;
    this.IsSprint = false;
    this.IsInSprintStartAction = false;
    this.IsEnterSprint = false;
    this.SprintStopSpeedSquared = 0;
    this.SprintCd = 0;
    this.SprintUsableCount = 0;
    this.IsForbidInputSprint = false;
    this.SkipUsableChange = false;
    this.SprintEclapseTime = 0;
    this.SprintDuration = 0;
    this.CanForceInput = true;
    this.SprintCdArray = new Array();
    this.EnterSprintTagListenTask = undefined;
    this.IsWaterfallMove = false;
    this.WaterfallSplineId = 0;
    this.WaterfallDirect = Vector_1.Vector.Create();
    this.WaterfallGravity = Vector_1.Vector.Create();
    this.IsWaterfallDynamicGravity = false;
    this.IsWaterfallHide = false;
    this.IsWaterfallMoveDown = false;
    this.UpWaterfallMontage = undefined;
    this.DownWaterfallMontage = undefined;
    this.DynamicGravityWaterfallMontage = undefined;
    this.WaterfallUiDisableHandle = 0;
    this.WaterTrace = undefined;
    this.UeMovementDisableHandle = 0;
    this.MKl = (t, i) => {
      var e = this.CheckIfCanLeave();
      this.f3_(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVehicleSkillEnableChanged, e, InputEnums_1.EInputAction.跳跃);
    };
    this.EKl = (t, i) => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVehicleSkillEnableChanged, this.CheckIfCanSprint(), InputEnums_1.EInputAction.闪避);
    };
    this.r1_ = (t, i) => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVehicleSkillEnableChanged, this.CheckIfCanRiderSharing(), InputEnums_1.EInputAction.技能1);
    };
    this.OnEnterHitCollision = (t, i, e, s, h) => {
      this.CalculateImpactStrengthAndDirection(i, e, h);
      this.BeginCollisionPerform();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Vehicle", 50, "载具发生碰撞", ["HitComp", t?.GetName()], ["OtherActor", i?.GetName()], ["OtherComp", e?.GetName()], ["ImpactNormal", h.ImpactNormal], ["CollisionStrength", this.CollisionStrength], ["CollisionDirection", this.CollisionDirection]);
      }
    };
    this.EnterSprintTagListenTaskCallback = (t, i) => {
      if (i) {
        this.StartSprint();
      } else {
        this.IsInSprintStartAction = false;
      }
    };
    this.OnWaterfallMontageEnd = (t, i) => {
      if (t !== this.GetWatefallMontage()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Vehicle", 50, "攀瀑被外部打断，触发保底");
        }
        this.EndWaterfallMove();
      }
    };
    this.OnRemoveEntity = (t, i) => {
      EventSystem_1.EventSystem.RemoveWithTarget(this.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
      this.EntityHandle = undefined;
      if (this.IsWaterfallMove) {
        this.EndWaterfallMove();
      }
      for (const e of this.PassengerInfoMap.values()) {
        this.Leave(e.PassengerEntity);
      }
    };
    this.OnTeleport = () => {
      this.ForceEndWaterfallMove();
    };
  }
  OnStart() {
    return !!super.OnStart() && (this.UeMovementMgr = this.Entity.GetComponent(248), this.VehicleType === "AutoMoveGongduola" && (this.CanBeenManipulated = false, this.UeMovementMgr?.Disable("城区贡多拉默认关闭移动组件")), this.EnterSprintTagListenTask = this.TagComp?.ListenForTagAddOrRemove(653152204, this.EnterSprintTagListenTaskCallback), this.InitWaterfallMoveMontage(), this.InitWaterTraceElement(), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.TeleportChangeLocation, this.OnTeleport), true);
  }
  OnActivate() {
    this.ActorComp.Actor.VehicleMovementComponent.SetMovementMode(2);
    this.FixBornLocation(undefined, "贡多拉出生位置修正");
    this.LastActorRotation.DeepCopy(this.ActorComp.ActorRotationProxy);
    super.OnActivate();
  }
  OnTick(t) {
    super.OnTick(t);
    this.UpdateSprintState(t);
    this.UpdateSprintCoolDown(t);
  }
  OnEnd() {
    this.RemoveVehicleTagListeners();
    if (this.EnterSprintTagListenTask) {
      this.EnterSprintTagListenTask.EndTask();
    }
    this.EnterSprintTagListenTask = undefined;
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.TeleportChangeLocation, this.OnTeleport);
    return super.OnEnd();
  }
  InitVehicleConfig() {
    var t = this.LoadVehicleConfigAsset();
    return !!t?.IsValid() && (this.Config = new GongduolaConfig_1.GongduolaConfig(this.Entity, t), this.ConfigInternal = this.Config.DeepCopy(), this.Config.Init());
  }
  RefreshMoveConfigFromVehicleConfig() {
    var t;
    if (this.Config instanceof GongduolaConfig_1.GongduolaConfig && (t = this.ActorComp?.Actor.VehicleMovementComponent)) {
      if (this.IsSprint) {
        this.Config.SetSprintStateMoveConfig(t);
      } else {
        this.Config.SetBaseStateMoveConfig(t);
      }
    }
  }
  EnterConditionCheck(t, i) {
    return !!super.EnterConditionCheck(t, i) && !this.IsWaterfallMove;
  }
  LeaveConditionCheck(t) {
    return !!super.LeaveConditionCheck(t) && !this.TagComp?.HasTag(653152204) && !this.IsWaterfallMove;
  }
  CheckIfCanLeave() {
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
    return !!t && this.LeaveConditionCheck(t);
  }
  CheckIfCanSprint() {
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
    return !!t && !!(t = this.PassengerInfoMap.get(t.Id)) && !!t.IsDriver && !this.TagComp?.HasTag(-1347413397) && !(this.SprintUsableCount <= 0) && !this.IsForbidInputSprint;
  }
  CheckIfCanRiderSharing() {
    return !ModelManager_1.ModelManager.GameModeModel?.IsMulti && !this.TagComp?.HasTag(-778094350) && super.CheckIfCanRiderSharing();
  }
  AddVehicleTagListeners() {
    if (!this.VehicleTagListeners) {
      this.VehicleTagListeners = [];
      var t = [653152204, 401464757];
      var i = this.TagComp?.HasAnyTag(t) ?? false;
      this.f3_(!i);
      for (const r of t) {
        var e = this.TagComp?.ListenForTagAddOrRemove(r, this.MKl);
        if (e) {
          this.VehicleTagListeners.push(e);
        }
      }
      for (const o of [-1347413397]) {
        var s = this.TagComp?.ListenForTagAddOrRemove(o, this.EKl);
        if (s) {
          this.VehicleTagListeners.push(s);
        }
      }
      for (const n of [-778094350]) {
        var h = this.TagComp?.ListenForTagAddOrRemove(n, this.r1_);
        if (h) {
          this.VehicleTagListeners.push(h);
        }
      }
    }
  }
  RemoveVehicleTagListeners() {
    if (this.VehicleTagListeners) {
      for (const t of this.VehicleTagListeners) {
        t.EndTask();
      }
      this.VehicleTagListeners = undefined;
    }
  }
  f3_(t) {
    if (t) {
      this.TagComp?.AddTag(-1821703142);
    } else {
      this.TagComp?.RemoveTag(-1821703142);
    }
  }
  InitVehicleMovementFeature(t) {
    this.CanBeenManipulated = false;
    if (t.MoveSpline) {
      this.MoveComp?.MoveAlongPath({
        SplineId: t.MoveSpline,
        StartFromNearest: true
      });
    }
  }
  CalculateImpactStrengthAndDirection(t, i, e) {
    var s = this.TmpVector1;
    var h = this.TmpVector2;
    s.FromUeVector(e.ImpactNormal);
    h.Reset();
    if (i) {
      h.FromUeVector(i.GetComponentVelocity());
    }
    h.Subtraction(this.ActorComp.ActorVelocityProxy, this.CollisionVelocity);
    this.TmpVector1.FromUeVector(e.ImpactPoint);
    this.TmpVector2.FromUeVector(e.Location);
    this.TmpVector1.SubtractionEqual(this.TmpVector2);
    this.TmpVector1.GetSafeNormal2D(this.TmpVector2);
    var s = Vector_1.Vector.DotProduct(this.TmpVector2, this.ActorComp.ActorForwardProxy);
    var i = Vector_1.Vector.DotProduct(this.CollisionVelocity, this.ActorComp.ActorForwardProxy);
    var h = Vector_1.Vector.DotProduct(this.TmpVector2, this.ActorComp.ActorRightProxy);
    var e = Vector_1.Vector.DotProduct(this.CollisionVelocity, this.ActorComp.ActorRightProxy);
    var s = Math.max(-s * i, 0);
    var i = Math.max(-h * e, 0);
    this.CollisionStrength = s + i;
    var h = Math.acos(this.TmpVector2.CosineAngle2D(this.ActorComp.ActorForwardProxy)) * MathUtils_1.MathUtils.RadToDeg;
    this.CollisionDirection = h * Math.sign(this.TmpVector2.DotProduct(this.ActorComp.ActorRightProxy));
  }
  BeginCollisionPerform(t = IMPACT_ANIM_TIME) {
    this.IsBeingImpacted = true;
    this.MoveComp?.EnableUeMovementTick("载具受到碰撞");
    if (this.ImpactTimerHandle) {
      TimerSystem_1.TimerSystem.Remove(this.ImpactTimerHandle);
    }
    this.ImpactTimerHandle = TimerSystem_1.TimerSystem.Delay(() => {
      this.IsBeingImpacted = false;
      this.CollisionStrength = 0;
      this.CollisionDirection = 0;
      this.ImpactTimerHandle = undefined;
    }, t);
  }
  TryEnterSprint(t = false) {
    if (this.TagComp?.HasTag(-1347413397)) {
      return false;
    }
    if (this.IsInSprintStartAction) {
      return false;
    }
    if (this.ActorComp.InputDirectProxy.X < 0) {
      return false;
    }
    if (!t) {
      if (this.SprintUsableCount <= 0) {
        return false;
      }
      if (this.IsForbidInputSprint) {
        return false;
      }
    }
    this.IsEnterSprint = true;
    this.SkipUsableChange ||= t;
    return true;
  }
  StartSprint() {
    if (!this.IsSprint) {
      this.TagComp?.AddTag(1646668090);
    }
    var t = this.Config;
    t.SetSprintStateMoveConfig(this.ActorComp.Actor.VehicleMovementComponent);
    this.IsSprint = true;
    this.IsInSprintStartAction = true;
    this.CanForceInput = true;
    this.SprintDuration = t.SprintDuration + this.SprintEclapseTime;
    if (!this.SkipUsableChange) {
      this.SprintUsableCount--;
      this.SprintCdArray.push(0);
    }
    this.SkipUsableChange = false;
    this.TmpVector1.DeepCopy(this.ActorComp.ActorForwardProxy);
    this.TmpVector1.MultiplyEqual(Math.max(t.SprintExceedLimitSpeed, t.SprintMaxSpeed));
    this.MoveComp.SetForceSpeed(this.TmpVector1);
    this.ActorComp.Actor.VehicleMovementComponent?.IgnoreMoveFriction(t.SprintExceedLimitDuration * MathUtils_1.MathUtils.MillisecondToSecond);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVehicleSkillUsableCountChanged, 0, this.SprintUsableCount);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Vehicle", 50, "载具冲刺开始", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["EclapseTime", this.SprintEclapseTime], ["Duration", this.SprintDuration], ["RemainCount", this.SprintUsableCount]);
    }
  }
  EndSprint() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Vehicle", 50, "载具冲刺结束", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["EclapseTime", this.SprintEclapseTime], ["Duration", this.SprintDuration], ["RemainCount", this.SprintUsableCount]);
    }
    this.Config.SetBaseStateMoveConfig(this.ActorComp.Actor.VehicleMovementComponent);
    this.IsSprint = false;
    this.SprintDuration = 0;
    this.SprintEclapseTime = 0;
    this.TagComp?.RemoveTag(1646668090);
  }
  UpdateSprintState(t) {
    var i;
    if (this.IsSprint) {
      this.SprintEclapseTime += t;
      if (this.SprintEclapseTime >= this.SprintDuration || (this.GetVehicleVelocity(this.TmpVector1), !this.IsInSprintStartAction && this.TmpVector1.SizeSquared2D() < this.SprintStopSpeedSquared)) {
        this.EndSprint();
      } else {
        i = (t = this.Config).SprintDuration - this.SprintDuration + this.SprintEclapseTime;
        if (this.CanForceInput && i < t.SprintForceInputDuration) {
          if (!this.TagComp?.HasTag(110078660) && this.ActorComp.InputDirectProxy.X < 0) {
            this.CanForceInput = false;
          } else {
            this.TmpVector1.Set(1, this.ActorComp.InputDirectProxy.Y, 0);
            this.ActorComp.SetInputDirect(this.TmpVector1);
          }
        }
      }
    }
  }
  UpdateSprintCoolDown(e) {
    var s = this.Config;
    if (this.SprintCd) {
      if (this.SprintCdArray.length) {
        let t = 0;
        let i = e;
        while (t < this.SprintCdArray.length && i > 0 && (this.SprintCdArray[t] += i, !(this.SprintCdArray[t] < this.SprintCd))) {
          i -= this.SprintCd - this.SprintCdArray[t];
          t++;
        }
        if (t > 0) {
          this.SprintCdArray.splice(0, t);
          this.SprintUsableCount += t;
          this.SprintUsableCount = MathUtils_1.MathUtils.Clamp(this.SprintUsableCount, 0, s.SprintMaxUsableCount);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Vehicle", 50, "载具冲刺恢复", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["CurSprintCount", this.SprintUsableCount]);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVehicleSkillUsableCountChanged, 0, this.SprintUsableCount);
        }
      }
    } else {
      this.SprintUsableCount = s.SprintMaxUsableCount;
    }
  }
  IsSprintSkillInCd() {
    var t = this.Config;
    return this.SprintUsableCount !== t.SprintMaxUsableCount;
  }
  GetSprintSkillUsableCount() {
    return this.SprintUsableCount;
  }
  GetSprintSkillRemainingCd() {
    if (this.SprintCdArray.length) {
      return [(this.SprintCd - this.SprintCdArray[0]) * TimeUtil_1.TimeUtil.Millisecond, this.SprintCd * TimeUtil_1.TimeUtil.Millisecond];
    } else {
      return [0, 0];
    }
  }
  SetEnableInputSprint(t) {
    if (this.IsForbidInputSprint === t) {
      this.IsForbidInputSprint = !t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVehicleSkillEnableChanged, this.CheckIfCanSprint(), InputEnums_1.EInputAction.闪避);
    }
  }
  TryEnterWaterfallMove(t) {
    return !this.TagComp?.HasTag(1117748456) && !this.IsWaterfallMove && !(this.SetWaterfallConfig(t), this.GetWatefallMontage()?.IsValid() ? (this.StartWaterfallMove(t), 0) : (this.ResetWaterfallConfig(), 1));
  }
  StartWaterfallMove(t) {
    this.IsWaterfallMove = true;
    this.TagComp.AddTag(401464757);
    this.TagComp.AddTag(-1782915173);
    this.AnimComp.Play(this.GetWatefallMontage(), this.OnWaterfallMontageEnd);
    this.MoveComp.SetForceSpeed(Vector_1.Vector.ZeroVector);
    this.ActorComp.Actor.VehicleMovementComponent.ForbidGravityDirectMove = true;
    this.ActorComp.Actor.VehicleMovementComponent.bSafetyDepthCheck = false;
    this.ActorComp.SetCollisionEnable(false, "贡多拉攀瀑开始");
    this.WaterfallUiDisableHandle = BattleUiControl_1.BattleUiControl.SetBattleViewInvisible();
    InputDistributeController_1.InputDistributeController.RefreshInputTag();
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnWaterfallMoveBegin);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "贡多拉攀瀑开始", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["SplineId", t.SplineId], ["IsMoveDown", this.IsWaterfallMoveDown], ["Direct", t.Direct]);
    }
  }
  OnWaterfallMoveBeginEnd() {
    var t;
    if (this.IsWaterfallMove && (this.TagComp?.RemoveTag(-360496329), this.TagComp?.AddTag(-1801973972), t = this.IsWaterfallDynamicGravity ? this.WaterfallGravity : this.ActorComp?.ActorGravityDirectProxy, this.SetGravityDirectForVehicle(t), t.UnaryNegation(this.TmpVector1), MathUtils_1.MathUtils.LookRotationUpFirst(this.WaterfallDirect, this.TmpVector1, this.TmpRotator), this.ActorComp.SetActorRotation(this.TmpRotator.ToUeRotator(), "攀瀑三阶段设置旋转", false), this.MoveComp.SetForceSpeed(Vector_1.Vector.ZeroVector), this.AnimComp.ConsumeRootMotion(), this.AnimComp.PlayFromEnd(this.GetWatefallMontage()), this.AnimComp.StartForceDisableAnimOptimization(3, false), TimerSystem_1.TimerSystem.Next(() => {
      this.WaterfallHideVehicleAndPassenger(false, "贡多拉攀瀑出水");
    }), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Vehicle", 50, "贡多拉攀瀑进入三阶段", ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()], ["SplineId", this.WaterfallSplineId], ["Passengers", this.PassengerInfoMap], ["Direct", this.WaterfallDirect]);
    }
  }
  EndWaterfallMove() {
    if (this.IsWaterfallMove) {
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnWaterfallMoveEnd);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 50, "贡多拉攀瀑结束", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["SplineId", this.WaterfallSplineId], ["IsMoveDown", this.IsWaterfallMoveDown], ["Direct", this.WaterfallDirect]);
      }
      this.IsWaterfallMove = false;
      this.IsWaterfallMoveDown = false;
      this.ResetWaterfallConfig();
      this.TagComp.RemoveTag(401464757);
      this.AnimComp.RemoveOnMontageEnded(this.OnWaterfallMontageEnd);
      this.WaterfallHideVehicleAndPassenger(false, "贡多拉攀瀑结束保底");
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
      BattleUiControl_1.BattleUiControl.SetBattleViewVisible(this.WaterfallUiDisableHandle);
      this.AnimComp.CancelForceDisableAnimOptimization(3);
      this.WaterfallUiDisableHandle = 0;
      this.ActorComp.SetCollisionEnable(true, "贡多拉攀瀑结束");
      this.ActorComp.Actor.VehicleMovementComponent.ForbidGravityDirectMove = false;
      this.ActorComp.Actor.VehicleMovementComponent.bSafetyDepthCheck = true;
    }
  }
  ForceEndWaterfallMove() {
    if (this.IsWaterfallMove) {
      this.MoveComp?.SetForceSpeed(Vector_1.Vector.ZeroVector);
      this.AnimComp?.ConsumeRootMotion();
      this.AnimComp?.RemoveOnMontageEnded(this.OnWaterfallMontageEnd);
      this.AnimComp?.MainAnimInstance?.Montage_Stop(0.1, this.GetWatefallMontage());
      this.MoveComp?.StopMove();
      this.EndWaterfallMove();
    }
  }
  WaterfallHideVehicleAndPassenger(t, i) {
    if (this.IsWaterfallHide !== t && (this.IsWaterfallHide = t, CreatureController_1.CreatureController.SetActorVisible(this.Entity, !t, false, true, i), !this.IsHidePassenger)) {
      for (const e of this.PassengerInfoMap.values()) {
        if (e.PassengerEntity) {
          CreatureController_1.CreatureController.SetActorVisible(e.PassengerEntity, !t, !t, true, i);
        }
      }
    }
  }
  CheckIsWaterfallMoveDown(t) {
    var i;
    var e;
    var t = new GameSplineComponent_1.GameSplineComponent(t);
    return !!t.Initialize() && (i = t.GetNumberOfSplinePoints(), e = t.GetWorldLocationAtSplinePoint(0), t.GetWorldLocationAtSplinePoint(i - 1).Subtraction(e, this.TmpVector1), GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.ActorComp, this.TmpVector1) < 0);
  }
  GetWatefallMontage() {
    if (this.IsWaterfallDynamicGravity) {
      return this.DynamicGravityWaterfallMontage;
    } else if (this.IsWaterfallMoveDown) {
      return this.DownWaterfallMontage;
    } else {
      return this.UpWaterfallMontage;
    }
  }
  InitWaterfallMoveMontage() {
    ResourceSystem_1.ResourceSystem.LoadAsync(UP_WATERMOVE_MONTAGE_PATH, UE.AnimMontage, t => {
      if (t?.IsValid()) {
        this.UpWaterfallMontage = t;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 50, "加载向上攀瀑Montage失败", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Path", UP_WATERMOVE_MONTAGE_PATH]);
      }
    });
    ResourceSystem_1.ResourceSystem.LoadAsync(DOWN_WATERMOVE_MONTAGE_PATH, UE.AnimMontage, t => {
      if (t?.IsValid()) {
        this.DownWaterfallMontage = t;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 50, "加载向下攀瀑Montage失败", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Path", DOWN_WATERMOVE_MONTAGE_PATH]);
      }
    });
    ResourceSystem_1.ResourceSystem.LoadAsync(DYNAMIC_GRAVITY_WATERMOVE_MONTAGE_PATH, UE.AnimMontage, t => {
      if (t?.IsValid()) {
        this.DynamicGravityWaterfallMontage = t;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 50, "加载异重力攀瀑Montage失败", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Path", DYNAMIC_GRAVITY_WATERMOVE_MONTAGE_PATH]);
      }
    });
  }
  SetWaterfallConfig(t) {
    this.WaterfallSplineId = t.SplineId;
    this.WaterfallDirect.DeepCopy(t.Direct);
    this.WaterfallGravity.DeepCopy(t.ChangeGravity ?? Vector_1.Vector.ZeroVectorProxy);
    this.IsWaterfallDynamicGravity = !!t.ChangeGravity;
    this.IsWaterfallMoveDown = !t.ChangeGravity && this.CheckIsWaterfallMoveDown(t.SplineId);
  }
  ResetWaterfallConfig() {
    this.WaterfallSplineId = 0;
    this.WaterfallDirect.Reset();
    this.WaterfallGravity.Reset();
    this.IsWaterfallDynamicGravity = false;
  }
  LeaveVehiclePerform(t) {
    super.LeaveVehiclePerform(t);
    if (this.IsWaterfallHide && t.PassengerEntity) {
      CreatureController_1.CreatureController.SetActorVisible(t.PassengerEntity, true, true, true, "攀瀑过程中离开载具");
    }
  }
  HandlePendingDestroy() {
    this.IsPendingDestroy = true;
    ResourceSystem_1.ResourceSystem.LoadAsync("/Game/Aki/Character/NPC/AlienNPC/Level_B/SB1Gongduola3/BaseAnim/AM_Idle_End.AM_Idle_End", UE.AnimMontage, t => {
      var i;
      if (t?.IsValid()) {
        i = t.SequenceLength * MathUtils_1.MathUtils.SecondToMillisecond;
        this.AnimComp?.PlayOnce(t);
        TimerSystem_1.TimerSystem.Delay(() => {
          ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
        }, i);
      } else {
        ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
      }
    });
  }
  InitWaterTraceElement() {
    this.WaterTrace = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.WaterTrace.WorldContextObject = this.ActorComp.Actor;
    this.WaterTrace.Radius = 1;
    this.WaterTrace.bIgnoreSelf = true;
    this.WaterTrace.bIsSingle = false;
    this.WaterTrace.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
  }
  DetectWaterSurface(t, i, e) {
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.WaterTrace, t);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.WaterTrace, i);
    if (TraceElementCommon_1.TraceElementCommon.SphereTrace(this.WaterTrace, PROFILE_DETECT_WATER) && this.WaterTrace.HitResult.bBlockingHit) {
      var s = this.WaterTrace.HitResult.GetHitCount();
      for (let t = 0; t < s; ++t) {
        var h = this.WaterTrace.HitResult.PenetrationDepthArray.Get(t);
        if (!(Math.abs(h) > MathCommon_1.MathCommon.KindaSmallNumber)) {
          if (this.WaterTrace.HitResult.Actors.Get(t)?.IsValid()) {
            TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.WaterTrace.HitResult, t, e);
            return true;
          }
        }
      }
    }
    return false;
  }
  GetBuoyancyBalancePosition(t, i) {
    this.GetNormalizedBuoyancyBalanceOffset(this.TmpVector3);
    this.ActorComp.ActorQuatProxy.RotateVector(this.TmpVector3, this.TmpVector2);
    t.Addition(this.TmpVector2, i);
  }
  GetNormalizedBuoyancyBalanceOffset(t) {
    var i = this.ActorComp.Actor.VehicleMovementComponent.VehicleShapeBounds.BoxExtent.Z;
    t.Reset();
    t.Z = i - i * 2 * this.ActorComp.Actor.VehicleMovementComponent.BuoyancyBalanceRatio;
    this.TmpVector2.FromUeVector(this.ActorComp.Actor.VehicleMovementComponent.VehicleShapeBoundsOffset);
    t.SubtractionEqual(this.TmpVector2);
  }
  FixBornLocation(i = undefined, e = "FixBornLocation") {
    if (this.ActorComp) {
      var s = this.TmpVector1;
      s.FromUeVector(this.ActorComp.Actor.VehicleMovementComponent.VehicleShapeBoundsOffset);
      var h = this.TmpVector3;
      this.ActorComp.ActorQuatProxy.RotateVector(s, h);
      h.AdditionEqual(i ?? this.ActorComp.ActorLocationProxy);
      var s = this.ActorComp.Actor.VehicleMovementComponent.VehicleShapeBounds.BoxExtent.Z;
      var i = this.TmpVector1;
      var r = this.TmpVector2;
      i.Set(h.X, h.Y, h.Z + s);
      r.Set(h.X, h.Y, h.Z - s - BORN_FIX_DOWN_WATER_DETECT_DIST);
      let t = this.DetectWaterSurface(i, r, this.TmpVector4);
      if (!t) {
        i.Set(h.X, h.Y, h.Z + s + BORN_FIX_UP_WATER_DETECT_DIST);
        r.Set(h.X, h.Y, h.Z - s);
        t = this.DetectWaterSurface(i, r, this.TmpVector4);
      }
      if (t && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Entity", 3, "[GongduolaPerformComp.FixBornLocation] 贡多拉水面修正:前", ["CreatureDataId", this.ActorComp.CreatureData.GetCreatureDataId()], ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()], ["K2_GetActorLocation", this.ActorComp.Actor.D_K2_GetActorLocation()], ["ActorLocationProxy", h], ["InitLocation", this.ActorComp.CreatureData.GetInitLocation()], ["射线开始位置", i], ["射线结束位置", r], ["Context", e]), this.GetBuoyancyBalancePosition(this.TmpVector4, this.TmpVector1), this.ActorComp.SetActorLocation(this.TmpVector1.ToUeVector(), e, false), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Vehicle", 50, "[GongduolaPerformComp.FixBornLocation] 贡多拉水面修正:后", ["CreatureDataId", this.ActorComp.CreatureData.GetCreatureDataId()], ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()], ["K2_GetActorLocation", this.ActorComp.Actor.D_K2_GetActorLocation()], ["Context", e]);
      }
    }
  }
  GetVehicleVelocity(t) {
    if (this.ActorComp) {
      if (this.CanBeenManipulated) {
        t.DeepCopy(this.ActorComp.ActorVelocityProxy);
      } else {
        t.DeepCopy(this.ActorComp.SimulatedVelocity);
      }
    }
  }
  GetDrivedVehicleSeatLocalRot(t, i) {
    t = this.ActorComp?.SkeletalMesh?.GetSocketRotation(VehicleInfoDefines_1.VehicleInfoDefines.GetSeatSocketName(t));
    return !!t && (this.MoveComp?.IsStandardGravity ? i.FromUeRotator(t) : (this.TmpRotator.FromUeRotator(t), GravityUtils_1.GravityUtils.GetBaseQuatInGravityForActor(this.ActorComp, this.TmpQuat1), this.TmpQuat1.Inverse(this.TmpQuat2), GravityUtils_1.GravityUtils.GetRotInInverseQuat(this.TmpRotator, this.TmpQuat2, i)), true);
  }
};
GongduolaPerformComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(249)], GongduolaPerformComponent);
exports.GongduolaPerformComponent = GongduolaPerformComponent; //# sourceMappingURL=GongduolaPerformComponent.js.map
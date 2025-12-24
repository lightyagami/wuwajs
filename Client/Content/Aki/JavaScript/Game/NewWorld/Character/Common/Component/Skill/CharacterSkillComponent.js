"use strict";

var CharacterSkillComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, r) {
  var s;
  var a = arguments.length;
  var h = a < 3 ? i : r === null ? r = Object.getOwnPropertyDescriptor(i, e) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, i, e, r);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (s = t[o]) {
        h = (a < 3 ? s(h) : a > 3 ? s(i, e, h) : s(i, e)) || h;
      }
    }
  }
  if (a > 3 && h) {
    Object.defineProperty(i, e, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterSkillComponent = undefined;
const Stats_1 = require("../../../../../../Core/Common/Stats");
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../../../Global");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes");
const CustomMovementDefine_1 = require("../Move/CustomMovementDefine");
const BaseSkillComponent_1 = require("./BaseSkillComponent");
const ROLLING_GROUNDED_RECOVER_TIME = 600;
let CharacterSkillComponent = CharacterSkillComponent_1 = class CharacterSkillComponent extends BaseSkillComponent_1.BaseSkillComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.Gce = undefined;
    this.mBe = undefined;
    this.oRe = undefined;
    this.fZr = () => {
      if (!this.TagComp.HasTag(-1371021686)) {
        CombatLog_1.CombatLog.Info("Skill", this.Entity, "疑难杂症debug日志，RollingGroundedDelay");
        this.IsMainSkillReadyEnd = true;
      }
      this.pZr = undefined;
    };
    this.pZr = undefined;
    this.DZr = 0;
    this.RZr = 0;
  }
  OnInitData() {
    return !!super.OnInitData() && (this.ActorComp = this.Entity.GetComponent(3), CharacterSkillComponent_1.AZr || (CharacterSkillComponent_1.PZr = CommonParamById_1.configCommonParamById.GetIntConfig("jump_priority"), CharacterSkillComponent_1.xZr = CommonParamById_1.configCommonParamById.GetIntConfig("fly_priority"), CharacterSkillComponent_1.AZr = true), true);
  }
  OnInit() {
    return !!super.OnInit() && (this.Gce = this.Entity.GetComponent(187), this.mBe = this.Entity.CheckGetComponent(184), this.oRe = this.Entity.GetComponent(186), true);
  }
  OnEnd() {
    return !!super.OnEnd() && (this.DZr = 0, void (this.RZr = 0) !== this.pZr && (TimerSystem_1.TimerSystem.Remove(this.pZr), this.pZr = undefined), true);
  }
  DoSkillBeginMoveAction(t, i) {
    CharacterSkillComponent_1.Yzr.Start();
    this.mBe.ExitHitState("释放技能");
    CharacterSkillComponent_1.Yzr.Stop();
    CharacterSkillComponent_1.Jzr.Start();
    this.SetSkillTargetDirection(i.SkillDirection, i.SkillTarget.SkillTargetPriority);
    CharacterSkillComponent_1.Jzr.Stop();
    CharacterSkillComponent_1.zzr.Start();
    this.RGl(t.SkillId, i);
    CharacterSkillComponent_1.zzr.Stop();
    this.oRe?.StartForceDisableAnimOptimization(4, false);
  }
  SetSkillTargetDirection(t, i = 0) {
    if (this.LockOnComp?.Valid) {
      switch (t) {
        case 0:
          if (this.SkillTarget?.Valid) {
            this.ZZr();
          } else if (i === 6) {
            this.ten();
          } else {
            this.een();
          }
          break;
        case 1:
          this.een();
          break;
        case 3:
          this.ten();
      }
    }
  }
  een() {
    if (this.ActorComp.IsAutonomousProxy && this.IsHasInputDir() && !this.Entity.GetComponent(65)?.IsLocalInput) {
      MathUtils_1.MathUtils.LookRotationUpFirst(this.ActorComp.InputDirectProxy, this.Gce.GravityUp, this.TmpRotator);
      this.TmpTransform.Set(this.ActorComp.ActorLocationProxy, this.TmpRotator.Quaternion(), this.ActorComp.ActorScaleProxy);
      this.ActorComp.SetActorTransform(this.TmpTransform.ToUeTransform(), "释放技能.转向输入方向", false, 1);
    }
  }
  IsHasInputDir() {
    var t;
    return !!this.CheckIsLoaded() && (t = this.ActorComp.InputDirectProxy, Math.abs(t.X) > 0 || Math.abs(t.Y) > 0);
  }
  ten() {
    this.TmpRotator.FromUeRotator(Global_1.Global.CharacterCameraManager.GetCameraRotation());
    this.TmpRotator.Vector(this.TmpVector);
    MathUtils_1.MathUtils.LookRotationUpFirst(this.TmpVector, this.ActorComp?.MoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy, this.TmpRotator);
    this.TmpTransform.Set(this.ActorComp.ActorLocationProxy, this.TmpRotator.Quaternion(), this.ActorComp.ActorScaleProxy);
    this.ActorComp.SetActorTransform(this.TmpTransform.ToUeTransform(), "释放技能.转向摄像机方向", false, 1);
  }
  ZZr() {
    if (this.SkillTarget) {
      this.TmpVector.FromUeVector(this.GetTargetTransform().GetLocation());
      this.TmpVector.SubtractionEqual(this.ActorComp.ActorLocationProxy);
      MathUtils_1.MathUtils.LookRotationUpFirst(this.TmpVector, this.ActorComp?.MoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy, this.TmpRotator);
      this.ActorComp.SetActorRotation(this.TmpRotator.ToUeRotator(), "释放技能.转向技能目标", false);
    }
  }
  oen() {
    return this.ActorComp.InputRotatorProxy;
  }
  RGl(t, i) {
    if (i.WalkOffLedge) {
      this.Gce.SetWalkOffLedgeRecord(false);
    }
    if (i.SkillStepUp) {
      this.Gce.SetStepUpParamsRecord(false);
    }
    if (BaseSkillComponent_1.SKILL_GROUP_MAIN === i.GroupId) {
      if (this.Gce && this.Gce.CharacterMovement.MovementMode === 6) {
        if ((i = this.Gce.CharacterMovement.CustomMovementMode) === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE) {
          if ((e = this.Entity.GetComponent(62)).Valid) {
            e.ExitGlideState("Skill");
          }
        } else if (i === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SOAR && (e = this.Entity.GetComponent(62)).Valid) {
          e.ExitSoarState(3, "Skill");
        }
      }
      var e;
      var r;
      var i = this.mBe.MoveState;
      switch (i) {
        case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
          if (!this.TagComp.HasTag(-1800191060)) {
            this.TagComp.RemoveTag(r = 388142570);
            this.BuffComp?.RemoveBuffByTag(r, `技能${t}结束移动`);
            this.mBe.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
          }
          break;
        case CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop:
        case CharacterUnifiedStateTypes_1.ECharMoveState.RunStop:
        case CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop:
          this.mBe.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Stand);
      }
    }
    this.Gce.CharacterMovement.OverrideTerminalVelocity = 99999;
    this.Gce.SetFallingHorizontalMaxSpeed(99999);
  }
  DoSkillEndMoveAction(t) {
    if (t.WalkOffLedge) {
      this.Gce.SetWalkOffLedgeRecord(true);
    }
    if (t.SkillStepUp) {
      this.Gce.SetStepUpParamsRecord(true);
    }
    this.Gce.CharacterMovement.OverrideTerminalVelocity = 0;
    this.Gce.ClearFallingHorizontalMaxSpeed();
    this.oRe?.CancelForceDisableAnimOptimization(4);
  }
  OnBeforePlaySkillMontage() {
    this.mBe.ExitHitState("播放技能蒙太奇");
  }
  GetMainAnimInstance() {
    return this.oRe.GetAnimInstance();
  }
  RollingGrounded() {
    this.IsMainSkillReadyEnd = false;
    this.pZr = TimerSystem_1.TimerSystem.Delay(this.fZr, ROLLING_GROUNDED_RECOVER_TIME);
    if (this.mBe.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
      this.mBe.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.LandRoll);
    }
  }
  UpdateAllSkillRotator(t) {
    if (!this.CheckIsLoaded() || !this.Gce) {
      return false;
    }
    if (this.TagComp.HasTag(504239013)) {
      return false;
    }
    if (!this.SkillCanRotateInternal) {
      return false;
    }
    if (!this.ActorComp.IsMoveAutonomousProxy) {
      return false;
    }
    var i = Math.abs(this.SkillRotateSpeedInternal);
    if (this.SkillRotateToTargetInternal) {
      var e = this.GetCurrentSkillRotateDirect();
      if (e.IsNearlyZero()) {
        return false;
      }
      MathUtils_1.MathUtils.LookRotationUpFirst(e, this.ActorComp?.MoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy, this.TmpRotator);
      this.Gce.SmoothCharacterRotation(this.TmpRotator, i, t, false, "Skill.UpdateAllSkillRotator");
    } else {
      this.Gce.SmoothCharacterRotation(this.oen(), i, t, false, "Skill.UpdateAllSkillRotator");
    }
    return true;
  }
  CheckJumpCanInterrupt() {
    return this.DoCheckInterrupt(BaseSkillComponent_1.SKILL_GROUP_MAIN, CharacterSkillComponent_1.PZr);
  }
  CheckGlideCanInterrupt() {
    return this.DoCheckInterrupt(BaseSkillComponent_1.SKILL_GROUP_MAIN, CharacterSkillComponent_1.xZr);
  }
  get SkillElevationAngle() {
    return this.DZr;
  }
  SetSkillElevationAngle(t) {
    this.DZr = t;
  }
  get LastActivateSkillTime() {
    return this.RZr;
  }
  SetLastActivateSkillTime(t) {
    this.RZr = t;
  }
};
CharacterSkillComponent.Yzr = Stats_1.Stat.Create("DoSkillBegin5 SetAnimState");
CharacterSkillComponent.Jzr = Stats_1.Stat.Create("DoSkillBegin6 Target&Rotation");
CharacterSkillComponent.zzr = Stats_1.Stat.Create("DoSkillBegin7 SetMoveState");
CharacterSkillComponent.AZr = false;
CharacterSkillComponent.PZr = 0;
CharacterSkillComponent.xZr = 0;
CharacterSkillComponent = CharacterSkillComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(41)], CharacterSkillComponent);
exports.CharacterSkillComponent = CharacterSkillComponent; //# sourceMappingURL=CharacterSkillComponent.js.map
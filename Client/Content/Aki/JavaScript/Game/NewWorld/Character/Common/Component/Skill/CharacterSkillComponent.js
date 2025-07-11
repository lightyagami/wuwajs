"use strict";

var CharacterSkillComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, s) {
  var r;
  var h = arguments.length;
  var a = h < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, i, e, s);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (r = t[o]) {
        a = (h < 3 ? r(a) : h > 3 ? r(i, e, a) : r(i, e)) || a;
      }
    }
  }
  if (h > 3 && a) {
    Object.defineProperty(i, e, a);
  }
  return a;
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
    this.Yzr = Stats_1.Stat.Create("DoSkillBegin5 SetAnimState");
    this.Jzr = Stats_1.Stat.Create("DoSkillBegin6 Target&Rotation");
    this.zzr = Stats_1.Stat.Create("DoSkillBegin7 SetMoveState");
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
    return !!super.OnInit() && (this.Gce = this.Entity.GetComponent(178), this.mBe = this.Entity.CheckGetComponent(175), this.oRe = this.Entity.GetComponent(177), true);
  }
  OnEnd() {
    return !!super.OnEnd() && (this.DZr = 0, void (this.RZr = 0) !== this.pZr && (TimerSystem_1.TimerSystem.Remove(this.pZr), this.pZr = undefined), true);
  }
  DoSkillBeginMoveAction(t, i) {
    this.Yzr.Start();
    this.mBe.ExitHitState("释放技能");
    if (!t.HasAnimTag) {
      this.mBe.ExitAimStatus();
    }
    this.Yzr.Stop();
    this.Jzr.Start();
    this.SetSkillTargetDirection(i.SkillDirection, i.SkillTarget.SkillTargetPriority);
    this.Jzr.Stop();
    this.zzr.Start();
    this.RGl(t.SkillId, i);
    this.zzr.Stop();
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
    if (this.ActorComp.IsAutonomousProxy && this.IsHasInputDir()) {
      this.TmpRotator.FromUeRotator(this.oen());
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
          if ((e = this.Entity.GetComponent(59)).Valid) {
            e.ExitGlideState();
          }
        } else if (i === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SOAR && (e = this.Entity.GetComponent(59)).Valid) {
          e.ExitSoarState();
        }
      }
      var e;
      var s;
      var i = this.mBe.MoveState;
      switch (i) {
        case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
          if (!this.TagComp.HasTag(-1800191060)) {
            this.TagComp.RemoveTag(s = 388142570);
            this.BuffComp?.RemoveBuffByTag(s, `技能${t}结束移动`);
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
CharacterSkillComponent.AZr = false;
CharacterSkillComponent.PZr = 0;
CharacterSkillComponent.xZr = 0;
CharacterSkillComponent = CharacterSkillComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(40)], CharacterSkillComponent);
exports.CharacterSkillComponent = CharacterSkillComponent; //# sourceMappingURL=CharacterSkillComponent.js.map
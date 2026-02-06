"use strict";

var __decorate = this && this.__decorate || function (t, i, e, s) {
  var h;
  var o = arguments.length;
  var r = o < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, e, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (h = t[n]) {
        r = (o < 3 ? h(r) : o > 3 ? h(i, e, r) : h(i, e)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(i, e, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleSkillComponent = undefined;
const Stats_1 = require("../../../../Core/Common/Stats");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../Global");
const BaseSkillComponent_1 = require("../../Character/Common/Component/Skill/BaseSkillComponent");
let VehicleSkillComponent = class VehicleSkillComponent extends BaseSkillComponent_1.BaseSkillComponent {
  constructor() {
    super(...arguments);
    this.Jzr = Stats_1.Stat.Create("Vehicle DoSkillBegin Target&Rotation");
    this.oRe = undefined;
    this.Gce = undefined;
    this.mBf = undefined;
  }
  static get Dependencies() {
    return [247];
  }
  OnInit() {
    return !!super.OnInit() && (this.oRe = this.Entity.GetComponent(248), this.Gce = this.Entity.GetComponent(249), this.mBf = this.ActorComp, true);
  }
  GetMainAnimInstance() {
    return this.oRe.MainAnimInstance;
  }
  DoSkillBeginMoveAction(t, i) {
    if (this.TagComp?.HasTag(1616400338)) {
      this.Gce?.SetForceSpeed(Vector_1.Vector.ZeroVector);
    }
    this.Jzr.Start();
    this.SetSkillTargetDirection(i.SkillDirection, i.SkillTarget.SkillTargetPriority);
    this.Jzr.Stop();
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
        case 4:
          if (this.SkillTarget?.Valid) {
            this.ZZr();
          } else if (i === 6) {
            this.ten();
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
    if (this.mBf.IsAutonomousProxy && this.IsHasInputDir()) {
      MathUtils_1.MathUtils.LookRotationUpFirst(this.mBf.InputDirectProxy, this.Gce.GravityUp, this.TmpRotator);
      this.TmpTransform.Set(this.mBf.ActorLocationProxy, this.TmpRotator.Quaternion(), this.mBf.ActorScaleProxy);
      this.mBf.SetActorTransform(this.TmpTransform.ToUeTransform(), "载具.释放技能.转向输入方向", false, 1);
    }
  }
  IsHasInputDir() {
    var t;
    return !!this.CheckIsLoaded() && (t = this.mBf.InputDirectProxy, Math.abs(t.X) > 0 || Math.abs(t.Y) > 0);
  }
  ten() {
    this.TmpRotator.FromUeRotator(Global_1.Global.CharacterCameraManager.GetCameraRotation());
    this.TmpRotator.Vector(this.TmpVector);
    MathUtils_1.MathUtils.LookRotationUpFirst(this.TmpVector, this.mBf?.MoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy, this.TmpRotator);
    this.TmpTransform.Set(this.mBf.ActorLocationProxy, this.TmpRotator.Quaternion(), this.mBf.ActorScaleProxy);
    this.mBf.SetActorTransform(this.TmpTransform.ToUeTransform(), "载具.释放技能.转向摄像机方向", false, 1);
  }
  ZZr() {
    if (this.SkillTarget) {
      this.TmpVector.FromUeVector(this.GetTargetTransform().GetLocation());
      this.TmpVector.SubtractionEqual(this.mBf.ActorLocationProxy);
      MathUtils_1.MathUtils.LookRotationUpFirst(this.TmpVector, this.mBf?.MoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy, this.TmpRotator);
      this.mBf.SetActorRotation(this.TmpRotator.ToUeRotator(), "载具.释放技能.转向技能目标", false);
    }
  }
  DoSkillEndMoveAction(t) {
    this.oRe?.CancelForceDisableAnimOptimization(4);
  }
};
VehicleSkillComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(44)], VehicleSkillComponent);
exports.VehicleSkillComponent = VehicleSkillComponent; //# sourceMappingURL=VehicleSkillComponent.js.map
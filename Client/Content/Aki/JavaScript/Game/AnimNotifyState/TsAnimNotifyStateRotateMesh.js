"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Transform_1 = require("../../Core/Utils/Math/Transform");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateRotateMesh extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.旋转速度 = 100;
    this.是否自动朝向目标 = false;
    this.是否平滑旋转 = false;
    this.是否接受输入控制 = false;
    this.BaseChar = undefined;
    this.TmpVector = undefined;
    this.ActorTransform = undefined;
  }
  Constructor() {
    this.TmpVector = undefined;
    this.ActorTransform = undefined;
  }
  K2_NotifyBegin(t, i, s) {
    this.Init();
    t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (this.BaseChar = t, true);
  }
  K2_NotifyTick(t, i, s) {
    if (this.BaseChar?.IsValid()) {
      var e = this.BaseChar.CharacterActorComponent?.Entity;
      if (!e?.Valid) {
        return false;
      }
      var r = e.GetComponent(41);
      var e = e.GetComponent(46);
      if (!r?.Valid || !e?.Valid) {
        return false;
      }
      let t = 0;
      r = r.GetSkillTargetForAns()?.Entity?.GetComponent(1)?.Owner;
      this.ActorTransform.FromUeTransform(this.BaseChar.D_GetTransform());
      if (this.是否自动朝向目标 && r?.IsValid()) {
        this.TmpVector.FromUeVector(r.D_K2_GetActorLocation());
      } else {
        if (!e.HasMoveInput || !this.是否接受输入控制) {
          return true;
        }
        this.TmpVector.FromUeVector(this.BaseChar.CharacterActorComponent.InputDirect);
      }
      MathUtils_1.MathUtils.InverseTransformPosition(this.ActorTransform.GetLocation(), this.ActorTransform.GetRotation().Rotator(), this.ActorTransform.GetScale3D(), this.TmpVector, this.TmpVector);
      t = UE.KismetMathLibrary.D_MakeRotFromX(this.TmpVector.ToUeVector()).Yaw - 90;
      for (var h = this.BaseChar.Mesh.RelativeRotation.Yaw; t - h > 180;) {
        t -= 360;
      }
      while (h - t > 180) {
        t += 360;
      }
      r = t - h;
      if (r != 0) {
        if (this.旋转速度 > 0) {
          e = MathUtils_1.MathUtils.Clamp(this.旋转速度 * s / Math.abs(r), 0, 1);
          t = e * r + h;
        }
        this.BaseChar.Mesh.K2_SetRelativeRotation(new UE.Rotator(0, t, 0), false, undefined, false);
      }
      return true;
    }
    return false;
  }
  K2_NotifyEnd(t, i) {
    t = t.GetOwner();
    return !!t?.IsValid() && !!(t instanceof TsBaseCharacter_1.default) && (t.CharacterActorComponent.SetActorRotationWithPriority(UE.KismetMathLibrary.ComposeRotators(t.Mesh.K2_GetComponentRotation(), new UE.Rotator(0, 90, 0)), "TsAnimNotifyStateRotateMesh", 0, true, false), t.Mesh.K2_SetRelativeRotation(new UE.Rotator(0, -90, 0), false, undefined, false), true);
  }
  Init() {
    this.BaseChar = undefined;
    this.TmpVector = Vector_1.Vector.Create();
    this.ActorTransform = Transform_1.Transform.Create();
  }
  GetNotifyName() {
    return "旋转网格体";
  }
}
exports.default = TsAnimNotifyStateRotateMesh;
//# sourceMappingURL=TsAnimNotifyStateRotateMesh.js.map
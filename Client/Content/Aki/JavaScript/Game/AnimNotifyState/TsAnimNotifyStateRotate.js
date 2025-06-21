"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
});
const UE = require("ue"),
  Macro_1 = require("../../Core/Preprocessor/Macro"),
  MathCommon_1 = require("../../Core/Utils/Math/MathCommon"),
  Quat_1 = require("../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines"),
  BaseSkillComponent_1 = require("../NewWorld/Character/Common/Component/Skill/BaseSkillComponent"),
  SkillUtils_1 = require("../NewWorld/Character/Common/Component/Skill/SkillUtils"),
  ColorUtils_1 = require("../Utils/ColorUtils"),
  GravityUtils_1 = require("../Utils/GravityUtils"),
  DEBUG_DRAW_LENGTH = 500;
class AnsRotateParam {
  constructor(t) {
    this.RotateDetectionType = 0, this.SkillRotateTarget = new BaseSkillComponent_1.SkillRotateTarget, this.NowTime = 0, this.TotalDurationReciprocal = 0, this.NowTime = 0, this.TotalDurationReciprocal = 1 / t
  }
  Update(t, i) {
    this.NowTime = t, this.TotalDurationReciprocal = 1 / i
  }
  SetRotateTarget(t, i) {
    this.SkillRotateTarget.Target = t, this.SkillRotateTarget.Type = i
  }
}
class TsAnimNotifyStateRotate extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), this.旋转速度 = 100, this.是否自动朝向目标 = !1, this.是否平滑旋转 = !1, this.Curve = void 0, this.是否应用旋转偏移 = !1, this.旋转偏移 = -0, this.设置为朝向黑板目标 = !1, this.黑板类型 = 0, this.朝向黑板目标名 = "HateTarget", this.停止旋转阈值 = -0, this.继续旋转阈值 = -0, this.在横板模式中禁用 = !1, this.只在横板模式中生效 = !1, this.定向旋转功能 = !1, this.定向旋转阈值最小值 = -MathUtils_1.PI_DEG, this.定向旋转阈值最大值 = MathUtils_1.PI_DEG, this.定向旋转方式 = 0, this.调试定向旋转范围 = !1, this.屏蔽标签列表 = void 0, this.ParamsMap = void 0, this.IsInitialize = !1, this.TmpVector = Vector_1.Vector.Create(), this.TmpVector1 = Vector_1.Vector.Create(), this.TmpQuat = Quat_1.Quat.Create()
  }
  Constructor() {
    this.ParamsMap = void 0, this.IsInitialize = !1, this.TmpVector = Vector_1.Vector.Create(), this.TmpVector1 = Vector_1.Vector.Create(), this.TmpQuat = Quat_1.Quat.Create()
  }
  K2_NotifyBegin(t, i, s) {
    this.Initialize();
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default && !t.AbilitySystemComponent?.HasAnyGameplayTag(this.屏蔽标签列表)) {
      var e = t.CharacterActorComponent?.Entity;
      if (!e?.Valid) return !1;
      if (this.ParamsMap.has(e.Id) ? this.ParamsMap.get(e.Id).Update(0, s) : this.ParamsMap.set(e.Id, new AnsRotateParam(s)), this.在横板模式中禁用) {
        if (e.GetComponent(108)?.Active) return !1
      } else if (this.只在横板模式中生效)
        if (!e.GetComponent(108)?.Active) return !1;
      s = e.GetComponent(40);
      return s?.Valid ? (e = this.ParamsMap.get(e.Id), this.定向旋转功能 ? (this.UpdateAnsBlackBoardTargetType(e), this.UpdateContinueDetection(e, s, t.CharacterActorComponent)) : this.UpdateBlackBoardTargetType(s), s.SetSkillCanRotate(!0), s.SetSkillRotateToTarget(this.是否自动朝向目标 || this.设置为朝向黑板目标, this.是否应用旋转偏移, this.旋转偏移, this.停止旋转阈值, this.继续旋转阈值), !0) : !1
    }
    return !1
  }
  K2_NotifyTick(e, t, r) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      var a = e.CharacterActorComponent?.Entity;
      if (!a?.Valid) return !1;
      var h = this.ParamsMap.get(a.Id);
      if (!h) return !1;
      var o = h.NowTime;
      if (h.NowTime += r, this.在横板模式中禁用) {
        if (a.GetComponent(108)?.Active) return !1
      } else if (this.只在横板模式中生效)
        if (!a.GetComponent(108)?.Active) return !1;
      a = a.GetComponent(40);
      if (!a?.Valid) return !1;
      this.定向旋转功能 && this.UpdateContinueDetection(h, a, e.CharacterActorComponent);
      let s = this.旋转速度;
      if (this.是否平滑旋转) {
        let t = o * h.TotalDurationReciprocal,
          i = h.NowTime * h.TotalDurationReciprocal;
        this.Curve && (t = this.Curve.GetFloatValue(MathUtils_1.MathUtils.Clamp(t, 0, 1)), i = this.Curve.GetFloatValue(MathUtils_1.MathUtils.Clamp(i, 0, 1)));
        o = Math.abs(this.GetSkillRotateAngle(e.CharacterActorComponent, a)) * MathUtils_1.MathUtils.Clamp((i - t) / (1 - t), 0, 1) / r;
        s = MathUtils_1.MathUtils.Clamp(o, 0, s)
      }
      return a.SetSkillRotateSpeed(s), !0
    }
    return !1
  }
  GetSkillRotateAngle(t, i) {
    var s = t.ActorForwardProxy,
      i = i.GetSkillRotateDirect();
    return s.IsNearlyZero() || i.IsNearlyZero() ? MathUtils_1.PI_DEG : GravityUtils_1.GravityUtils.GetAngleOffsetInGravityAbsForActor(t, s, i)
  }
  K2_NotifyEnd(t, i) {
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (this.ParamsMap?.delete(t.CharacterActorComponent?.Entity.Id ?? 0), (t = t.CharacterActorComponent?.Entity?.GetComponent(40))?.Valid) && (t.SetSkillCanRotate(!1), t.SetRotateTarget(void 0, 0)), !1
  }
  Initialize() {
    this.IsInitialize || (this.IsInitialize = !0, this.ParamsMap = new Map)
  }
  GetNotifyName() {
    return "旋转到黑板目标或技能目标或输入方向"
  }
  UpdateBlackBoardTargetType(t) {
    if (this.设置为朝向黑板目标) switch (this.黑板类型) {
      case 0:
        t.SetRotateTarget(this.朝向黑板目标名, 3);
        break;
      case 1:
        t.SetRotateTarget(this.朝向黑板目标名, 4);
        break;
      case 2:
        t.SetRotateTarget(this.朝向黑板目标名, 5);
        break;
      case 3:
        t.SetRotateTarget(this.朝向黑板目标名, 6);
        break;
      default:
        t.SetRotateTarget(void 0, 0)
    }
  }
  UpdateAnsBlackBoardTargetType(t) {
    if (this.设置为朝向黑板目标) switch (this.黑板类型) {
      case 0:
        t.SetRotateTarget(this.朝向黑板目标名, 3);
        break;
      case 1:
        t.SetRotateTarget(this.朝向黑板目标名, 4);
        break;
      case 2:
        t.SetRotateTarget(this.朝向黑板目标名, 5);
        break;
      case 3:
        t.SetRotateTarget(this.朝向黑板目标名, 6);
        break;
      default:
        t.SetRotateTarget(void 0, 0)
    }
  }
  IsInContinueDetectionAngle(t) {
    var i = (this.定向旋转阈值最大值 - this.定向旋转阈值最小值) % 360;
    return !(MathUtils_1.MathUtils.IsNearlyEqual(this.定向旋转阈值最大值, this.定向旋转阈值最小值) || !MathUtils_1.MathUtils.IsNearlyZero(i) && !MathUtils_1.MathUtils.IsNearlyEqual(i, 360)) || (i = MathUtils_1.PI_DEG + this.定向旋转阈值最小值, t = MathUtils_1.MathUtils.WrapAngle(t - i), i = MathUtils_1.MathUtils.WrapAngle(this.定向旋转阈值最大值 - i), -MathUtils_1.PI_DEG <= t && t <= i)
  }
  UpdateContinueDetection(t, i, s) {
    var e = this.TmpVector;
    if (SkillUtils_1.SkillUtils.GetSkillRotateDirect(ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(s.Entity), t.SkillRotateTarget, e), e.IsNearlyZero()) t.RotateDetectionType = 0;
    else {
      var r = GravityUtils_1.GravityUtils.GetAngleOffsetInGravityForActor(s, s.ActorForwardProxy, e);
      switch (this.定向旋转方式) {
        case 0:
          2 !== t.RotateDetectionType && (this.IsInContinueDetectionAngle(r) ? (t.RotateDetectionType = 2, this.UpdateBlackBoardTargetType(i)) : i.SetRotateTarget(void 0, 7));
          break;
        case 1:
          1 !== t.RotateDetectionType && (t.RotateDetectionType = 1, this.IsInContinueDetectionAngle(r) ? i.SetRotateTarget(Vector_1.Vector.Create(e), 2) : i.SetRotateTarget(void 0, 7));
          break;
        case 2:
          3 !== t.RotateDetectionType && (this.IsInContinueDetectionAngle(r) ? (t.RotateDetectionType = 3, i.SetRotateTarget(Vector_1.Vector.Create(e), 2)) : i.SetRotateTarget(void 0, 7))
      }
    }
  }
}
exports.default = TsAnimNotifyStateRotate;
//# sourceMappingURL=TsAnimNotifyStateRotate.js.map
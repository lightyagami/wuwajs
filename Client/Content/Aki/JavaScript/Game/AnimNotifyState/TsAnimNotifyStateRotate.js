"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Macro_1 = require("../../Core/Preprocessor/Macro");
const MathCommon_1 = require("../../Core/Utils/Math/MathCommon");
const Quat_1 = require("../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const GlobalData_1 = require("../GlobalData");
const ModelManager_1 = require("../Manager/ModelManager");
const CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines");
const BaseSkillComponent_1 = require("../NewWorld/Character/Common/Component/Skill/BaseSkillComponent");
const SkillUtils_1 = require("../NewWorld/Character/Common/Component/Skill/SkillUtils");
const ColorUtils_1 = require("../Utils/ColorUtils");
const GravityUtils_1 = require("../Utils/GravityUtils");
const DEBUG_DRAW_LENGTH = 500;
class AnsRotateParam {
  constructor(t) {
    this.RotateDetectionType = 0;
    this.SkillRotateTarget = new BaseSkillComponent_1.SkillRotateTarget();
    this.NowTime = 0;
    this.TotalDurationReciprocal = 0;
    this.NowTime = 0;
    this.TotalDurationReciprocal = 1 / t;
  }
  Update(t, i) {
    this.NowTime = t;
    this.TotalDurationReciprocal = 1 / i;
  }
  SetRotateTarget(t, i) {
    this.SkillRotateTarget.Target = t;
    this.SkillRotateTarget.Type = i;
  }
}
class TsAnimNotifyStateRotate extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.旋转速度 = 100;
    this.是否自动朝向目标 = false;
    this.是否平滑旋转 = false;
    this.Curve = undefined;
    this.是否应用旋转偏移 = false;
    this.旋转偏移 = -0;
    this.设置为朝向黑板目标 = false;
    this.黑板类型 = 0;
    this.朝向黑板目标名 = "HateTarget";
    this.停止旋转阈值 = -0;
    this.继续旋转阈值 = -0;
    this.在横板模式中禁用 = false;
    this.只在横板模式中生效 = false;
    this.定向旋转功能 = false;
    this.定向旋转阈值最小值 = -MathUtils_1.PI_DEG;
    this.定向旋转阈值最大值 = MathUtils_1.PI_DEG;
    this.定向旋转方式 = 0;
    this.调试定向旋转范围 = false;
    this.屏蔽标签列表 = undefined;
    this.ParamsMap = undefined;
    this.IsInitialize = false;
    this.TmpVector = Vector_1.Vector.Create();
    this.TmpVector1 = Vector_1.Vector.Create();
    this.TmpQuat = Quat_1.Quat.Create();
  }
  Constructor() {
    this.ParamsMap = undefined;
    this.IsInitialize = false;
    this.TmpVector = Vector_1.Vector.Create();
    this.TmpVector1 = Vector_1.Vector.Create();
    this.TmpQuat = Quat_1.Quat.Create();
  }
  K2_NotifyBegin(t, i, s) {
    this.Initialize();
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default && !t.AbilitySystemComponent?.HasAnyGameplayTag(this.屏蔽标签列表)) {
      var e = t.CharacterActorComponent?.Entity;
      if (!e?.Valid) {
        return false;
      }
      if (this.ParamsMap.has(e.Id)) {
        this.ParamsMap.get(e.Id).Update(0, s);
      } else {
        this.ParamsMap.set(e.Id, new AnsRotateParam(s));
      }
      if (this.在横板模式中禁用) {
        if (e.GetComponent(118)?.Active) {
          return false;
        }
      } else if (this.只在横板模式中生效) {
        if (!e.GetComponent(118)?.Active) {
          return false;
        }
      }
      s = e.GetComponent(43);
      if (s?.Valid) {
        e = this.ParamsMap.get(e.Id);
        if (this.定向旋转功能) {
          this.UpdateAnsBlackBoardTargetType(e);
          this.UpdateContinueDetection(e, s, t.CharacterActorComponent);
        } else {
          this.UpdateBlackBoardTargetType(s);
        }
        s.SetSkillCanRotate(true);
        s.SetSkillRotateToTarget(this.是否自动朝向目标 || this.设置为朝向黑板目标, this.是否应用旋转偏移, this.旋转偏移, this.停止旋转阈值, this.继续旋转阈值);
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
  K2_NotifyTick(e, t, r) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      var a = e.CharacterActorComponent?.Entity;
      if (!a?.Valid) {
        return false;
      }
      var h = this.ParamsMap.get(a.Id);
      if (!h) {
        return false;
      }
      var o = h.NowTime;
      h.NowTime += r;
      if (this.在横板模式中禁用) {
        if (a.GetComponent(118)?.Active) {
          return false;
        }
      } else if (this.只在横板模式中生效) {
        if (!a.GetComponent(118)?.Active) {
          return false;
        }
      }
      a = a.GetComponent(43);
      if (!a?.Valid) {
        return false;
      }
      if (this.定向旋转功能) {
        this.UpdateContinueDetection(h, a, e.CharacterActorComponent);
      }
      let s = this.旋转速度;
      if (this.是否平滑旋转) {
        let t = o * h.TotalDurationReciprocal;
        let i = h.NowTime * h.TotalDurationReciprocal;
        if (this.Curve) {
          t = this.Curve.GetFloatValue(MathUtils_1.MathUtils.Clamp(t, 0, 1));
          i = this.Curve.GetFloatValue(MathUtils_1.MathUtils.Clamp(i, 0, 1));
        }
        o = Math.abs(this.GetSkillRotateAngle(e.CharacterActorComponent, a)) * MathUtils_1.MathUtils.Clamp((i - t) / (1 - t), 0, 1) / r;
        s = MathUtils_1.MathUtils.Clamp(o, 0, s);
      }
      a.SetSkillRotateSpeed(s);
      return true;
    }
    return false;
  }
  GetSkillRotateAngle(t, i) {
    var s = t.ActorForwardProxy;
    var i = i.GetSkillRotateDirect();
    if (s.IsNearlyZero() || i.IsNearlyZero()) {
      return MathUtils_1.PI_DEG;
    } else {
      return GravityUtils_1.GravityUtils.GetAngleOffsetInGravityAbsForActor(t, s, i);
    }
  }
  K2_NotifyEnd(t, i) {
    var t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default && (this.ParamsMap?.delete(t.CharacterActorComponent?.Entity.Id ?? 0), (t = t.CharacterActorComponent?.Entity?.GetComponent(43))?.Valid)) {
      t.SetSkillCanRotate(false);
      t.SetRotateTarget(undefined, 0);
    }
    return false;
  }
  Initialize() {
    if (!this.IsInitialize) {
      this.IsInitialize = true;
      this.ParamsMap = new Map();
    }
  }
  GetNotifyName() {
    return "旋转到黑板目标或技能目标或输入方向";
  }
  UpdateBlackBoardTargetType(t) {
    if (this.设置为朝向黑板目标) {
      switch (this.黑板类型) {
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
          t.SetRotateTarget(undefined, 0);
      }
    }
  }
  UpdateAnsBlackBoardTargetType(t) {
    if (this.设置为朝向黑板目标) {
      switch (this.黑板类型) {
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
          t.SetRotateTarget(undefined, 0);
      }
    }
  }
  IsInContinueDetectionAngle(t) {
    var i = (this.定向旋转阈值最大值 - this.定向旋转阈值最小值) % 360;
    return !MathUtils_1.MathUtils.IsNearlyEqual(this.定向旋转阈值最大值, this.定向旋转阈值最小值) && (!!MathUtils_1.MathUtils.IsNearlyZero(i) || !!MathUtils_1.MathUtils.IsNearlyEqual(i, 360)) || (i = MathUtils_1.PI_DEG + this.定向旋转阈值最小值, t = MathUtils_1.MathUtils.WrapAngle(t - i), i = MathUtils_1.MathUtils.WrapAngle(this.定向旋转阈值最大值 - i), -MathUtils_1.PI_DEG <= t && t <= i);
  }
  UpdateContinueDetection(t, i, s) {
    var e = this.TmpVector;
    SkillUtils_1.SkillUtils.GetSkillRotateDirect(ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(s.Entity), t.SkillRotateTarget, undefined, e);
    if (e.IsNearlyZero()) {
      t.RotateDetectionType = 0;
    } else {
      var r = GravityUtils_1.GravityUtils.GetAngleOffsetInGravityForActor(s, s.ActorForwardProxy, e);
      switch (this.定向旋转方式) {
        case 0:
          if (t.RotateDetectionType !== 2) {
            if (this.IsInContinueDetectionAngle(r)) {
              t.RotateDetectionType = 2;
              this.UpdateBlackBoardTargetType(i);
            } else {
              i.SetRotateTarget(undefined, 7);
            }
          }
          break;
        case 1:
          if (t.RotateDetectionType !== 1) {
            t.RotateDetectionType = 1;
            if (this.IsInContinueDetectionAngle(r)) {
              i.SetRotateTarget(Vector_1.Vector.Create(e), 2);
            } else {
              i.SetRotateTarget(undefined, 7);
            }
          }
          break;
        case 2:
          if (t.RotateDetectionType !== 3) {
            if (this.IsInContinueDetectionAngle(r)) {
              t.RotateDetectionType = 3;
              i.SetRotateTarget(Vector_1.Vector.Create(e), 2);
            } else {
              i.SetRotateTarget(undefined, 7);
            }
          }
      }
    }
  }
}
exports.default = TsAnimNotifyStateRotate;
//# sourceMappingURL=TsAnimNotifyStateRotate.js.map
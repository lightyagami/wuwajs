"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const CharacterUnifiedStateTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const GravityUtils_1 = require("../Utils/GravityUtils");
class TsAnimNotifyStateRoleRotate extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.旋转速度 = 100;
    this.是否自动朝向目标 = false;
    this.TagContainer = undefined;
    this.在横板模式中禁用 = false;
    this.只在横板模式中生效 = false;
    this.TmpRotator = undefined;
  }
  Constructor() {
    this.TmpRotator = undefined;
  }
  K2_NotifyBegin(t, i, e) {
    this.Init();
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      t = t.GetEntityNoBlueprint();
      if (!t?.Valid) {
        return false;
      }
      if (this.在横板模式中禁用) {
        if (t.GetComponent(118)?.Active) {
          return false;
        }
      } else if (this.只在横板模式中生效) {
        if (!t.GetComponent(118)?.Active) {
          return false;
        }
      }
      t = t.GetComponent(43);
      if (t?.Valid) {
        t.SetSkillRotateToTarget(this.是否自动朝向目标, false, 0);
        return true;
      }
    }
    return false;
  }
  K2_NotifyTick(t, i, e) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default && !t.AbilitySystemComponent.HasAnyGameplayTag(this.TagContainer)) {
      var r = t.CharacterActorComponent?.Entity;
      if (!r?.Valid) {
        return false;
      }
      if (this.在横板模式中禁用) {
        if (r.GetComponent(118)?.Active) {
          return false;
        }
      } else if (this.只在横板模式中生效) {
        if (!r.GetComponent(118)?.Active) {
          return false;
        }
      }
      var s = r?.GetComponent(43);
      if (!s?.Valid) {
        return false;
      }
      if (r?.GetComponent(186)?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ride) {
        return false;
      }
      if (this.是否自动朝向目标) {
        s.SetSkillRotateToTarget(s.GetSkillTargetForAns()?.Valid ?? false, false, 0);
        s.SetSkillRotateSpeed(this.旋转速度);
      } else {
        r = t.CharacterActorComponent;
        s = r.InputDirectProxy;
        if (!s.IsNearlyZero()) {
          t = r.ActorForwardProxy;
          GravityUtils_1.GravityUtils.RotatorInterpConstantToForActor(r, r.ActorRotationProxy, r.InputRotatorProxy, e, Math.acos(MathUtils_1.MathUtils.Clamp(t.DotProduct(s), -1, 1)) * MathUtils_1.MathUtils.RadToDeg / 180 * this.旋转速度, this.TmpRotator);
          return r.SetActorRotationWithPriority(this.TmpRotator.ToUeRotator(), "TsAnimNotifyStateRoleRotate", 0, true, false);
        }
      }
    }
    return true;
  }
  K2_NotifyEnd(t, i) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      t = t.CharacterActorComponent?.Entity?.GetComponent(43);
      if (t?.Valid) {
        t.SetSkillCanRotate(false);
        return true;
      }
    }
    return false;
  }
  Init() {
    this.TmpRotator = Rotator_1.Rotator.Create();
  }
}
exports.default = TsAnimNotifyStateRoleRotate;
//# sourceMappingURL=TsAnimNotifyStateRoleRotate.js.map
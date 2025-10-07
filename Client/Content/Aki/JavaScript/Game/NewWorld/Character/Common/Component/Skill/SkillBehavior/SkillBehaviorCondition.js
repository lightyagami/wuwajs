"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillBehaviorCondition = undefined;
const Stats_1 = require("../../../../../../../Core/Common/Stats");
const GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const CombatLog_1 = require("../../../../../../Utils/CombatLog");
const CharacterAttributeTypes_1 = require("../../Abilities/CharacterAttributeTypes");
const SkillUtils_1 = require("../SkillUtils");
const SkillBehaviorMisc_1 = require("./SkillBehaviorMisc");
const SkillConditionParser_1 = require("./SkillConditionParser");
class SkillBehaviorCondition {
  static SatisfyGroup(i, e, r) {
    var a;
    var o = [];
    for (let t = 0; t < i.Num(); t++) {
      a = this.Satisfy(i.Get(t), r);
      if (e) {
        o.push(a);
      } else if (!a) {
        return false;
      }
    }
    if (o.length) {
      try {
        var t = new SkillConditionParser_1.Parser(e).Parse();
        return new SkillConditionParser_1.ConditionArray(o, t).Evaluate();
      } catch (t) {
        CombatLog_1.CombatLog.ErrorWithStack("Skill", r.Entity, "SkillBehaviorCondition.SatisfyGroup技能行为条件公式解析异常", t, ["技能Id", r.Skill.SkillId], ["技能名", r.Skill.SkillName], ["formula", e]);
        return false;
      }
    }
    return true;
  }
  static Satisfy(t, i) {
    let e = false;
    let r = "未知条件类型";
    switch (t.ConditionType) {
      case 0:
        r = "是否有技能目标";
        e = this.uZo(t, i);
        break;
      case 1:
        r = "与技能目标锁定点距离";
        e = this.cZo(t, i);
        break;
      case 2:
        r = "与技能目标锁定点角度";
        e = this.mZo(t, i);
        break;
      case 3:
        r = "施法者标签检测";
        e = this.dZo(t, i);
        break;
      case 4:
        r = "施法者属性检测";
        e = this.CZo(t, i);
        break;
      case 5:
        r = "空中高度检测";
        e = this.zDd(t, i);
        break;
      case 6:
        r = "与技能目标锁定点高度";
        e = this.gZo(t, i);
        break;
      case 7:
        r = "是否有技能目标和是否战斗单位";
        e = this.FQd(t, i);
    }
    SkillUtils_1.SkillUtils.Log(1, 1, i.Entity, "SkillBehaviorCondition.Satisfy技能行为条件判断", ["技能Id", i.Skill.SkillId], ["技能名", i.Skill.SkillName], ["条件", r], ["结果", e]);
    return e;
  }
  static uZo(t, i) {
    let e = false;
    if (i.SkillComponent.SkillTarget) {
      e = true;
    }
    if (t.Reverse) {
      return !e;
    } else {
      return e;
    }
  }
  static cZo(t, i) {
    let e = false;
    var r;
    if (i.SkillComponent.SkillTarget) {
      r = i.Entity.GetComponent(1).ActorLocationProxy;
      i = Vector_1.Vector.Create(i.SkillComponent.GetTargetTransform().GetLocation());
      r = t.IgnoreZ ? Vector_1.Vector.Dist2D(r, i) : Vector_1.Vector.Distance(r, i);
      e = (0, SkillBehaviorMisc_1.compare)(t.ComparisonLogic, r, t.Value, t.RangeL, t.RangeR);
    }
    if (t.Reverse) {
      return !e;
    } else {
      return e;
    }
  }
  static mZo(t, i) {
    let e = false;
    var r;
    var a;
    var o;
    if (i.SkillComponent.SkillTarget) {
      a = (r = i.Entity.GetComponent(1)).ActorLocationProxy;
      i = Vector_1.Vector.Create(i.SkillComponent.GetTargetTransform().GetLocation());
      o = Vector_1.Vector.Create();
      i.Subtraction(a, o);
      if (t.IgnoreZ) {
        o.Z = 0;
      }
      o.Normalize();
      i = t.Sign ? MathUtils_1.MathUtils.GetAngleByVectorDotWithSign(r.ActorForwardProxy, o) : MathUtils_1.MathUtils.GetAngleByVectorDot(r.ActorForwardProxy, o);
      e = (0, SkillBehaviorMisc_1.compare)(t.ComparisonLogic, i, t.Value, t.RangeL, t.RangeR);
    }
    if (t.Reverse) {
      return !e;
    } else {
      return e;
    }
  }
  static dZo(t, i) {
    i = i.Entity.GetComponent(206);
    i = t.AnyTag ? i.HasAnyTag(GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(t.TagToCheck)) : i.HasAllTag(GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(t.TagToCheck));
    if (t.Reverse) {
      return !i;
    } else {
      return i;
    }
  }
  static CZo(t, i) {
    var i = i.Entity.GetComponent(174);
    var e = i.GetCurrentValue(t.AttributeId1);
    var i = t.AttributeId2 > 0 ? i.GetCurrentValue(t.AttributeId2) : 0;
    var e = (0, SkillBehaviorMisc_1.compare)(t.ComparisonLogic, e, t.Value + i * t.AttributeRate * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, t.RangeL, t.RangeR);
    if (t.Reverse) {
      return !e;
    } else {
      return e;
    }
  }
  static zDd(t, i) {
    i = i.Entity.GetComponent(179).GetHeightAboveGround();
    i = (0, SkillBehaviorMisc_1.compare)(t.ComparisonLogic, i, t.Value, t.RangeL, t.RangeR);
    if (t.Reverse) {
      return !i;
    } else {
      return i;
    }
  }
  static gZo(t, i) {
    let e = false;
    var r;
    if (i.SkillComponent.SkillTarget) {
      r = i.Entity.GetComponent(1).ActorLocationProxy;
      i = Vector_1.Vector.Create(i.SkillComponent.GetTargetTransform().GetLocation());
      r = r.Z - i.Z;
      e = (0, SkillBehaviorMisc_1.compare)(t.ComparisonLogic, r, t.Value, t.RangeL, t.RangeR);
    }
    if (t.Reverse) {
      return !e;
    } else {
      return e;
    }
  }
  static FQd(t, i) {
    let e = false;
    if (SkillUtils_1.SkillUtils.IsTsActor(i.SkillComponent.SkillTarget)) {
      e = true;
    }
    if (t.Reverse) {
      return !e;
    } else {
      return e;
    }
  }
}
exports.SkillBehaviorCondition = SkillBehaviorCondition;
//# sourceMappingURL=SkillBehaviorCondition.js.map
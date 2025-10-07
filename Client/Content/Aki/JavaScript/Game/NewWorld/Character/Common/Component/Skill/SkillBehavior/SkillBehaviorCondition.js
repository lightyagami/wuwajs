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
  static SatisfyGroup(t, e, r) {
    var a;
    var o = [];
    for (let i = 0; i < t.Num(); i++) {
      a = this.Satisfy(t.Get(i), r);
      if (e) {
        o.push(a);
      } else if (!a) {
        return false;
      }
    }
    if (o.length) {
      try {
        var i = new SkillConditionParser_1.Parser(e).Parse();
        return new SkillConditionParser_1.ConditionArray(o, i).Evaluate();
      } catch (i) {
        CombatLog_1.CombatLog.ErrorWithStack("Skill", r.Entity, "SkillBehaviorCondition.SatisfyGroup技能行为条件公式解析异常", i, ["技能Id", r.Skill.SkillId], ["技能名", r.Skill.SkillName], ["formula", e]);
        return false;
      }
    }
    return true;
  }
  static Satisfy(i, t) {
    let e = false;
    let r = "未知条件类型";
    switch (i.ConditionType) {
      case 0:
        r = "是否有技能目标";
        e = this.uZo(i, t);
        break;
      case 1:
        r = "与技能目标锁定点距离";
        e = this.cZo(i, t);
        break;
      case 2:
        r = "与技能目标锁定点角度";
        e = this.mZo(i, t);
        break;
      case 3:
        r = "施法者标签检测";
        e = this.dZo(i, t);
        break;
      case 4:
        r = "施法者属性检测";
        e = this.CZo(i, t);
        break;
      case 5:
        r = "空中高度检测";
        e = this.zDd(i, t);
        break;
      case 6:
        r = "与技能目标锁定点高度";
        e = this.gZo(i, t);
    }
    SkillUtils_1.SkillUtils.Log(1, 1, t.Entity, "SkillBehaviorCondition.Satisfy技能行为条件判断", ["技能Id", t.Skill.SkillId], ["技能名", t.Skill.SkillName], ["条件", r], ["结果", e]);
    return e;
  }
  static uZo(i, t) {
    let e = false;
    if (t.SkillComponent.SkillTarget) {
      e = true;
    }
    if (i.Reverse) {
      return !e;
    } else {
      return e;
    }
  }
  static cZo(i, t) {
    let e = false;
    var r;
    if (t.SkillComponent.SkillTarget) {
      r = t.Entity.GetComponent(1).ActorLocationProxy;
      t = Vector_1.Vector.Create(t.SkillComponent.GetTargetTransform().GetLocation());
      r = i.IgnoreZ ? Vector_1.Vector.Dist2D(r, t) : Vector_1.Vector.Distance(r, t);
      e = (0, SkillBehaviorMisc_1.compare)(i.ComparisonLogic, r, i.Value, i.RangeL, i.RangeR);
    }
    if (i.Reverse) {
      return !e;
    } else {
      return e;
    }
  }
  static mZo(i, t) {
    let e = false;
    var r;
    var a;
    var o;
    if (t.SkillComponent.SkillTarget) {
      a = (r = t.Entity.GetComponent(1)).ActorLocationProxy;
      t = Vector_1.Vector.Create(t.SkillComponent.GetTargetTransform().GetLocation());
      o = Vector_1.Vector.Create();
      t.Subtraction(a, o);
      if (i.IgnoreZ) {
        o.Z = 0;
      }
      o.Normalize();
      t = i.Sign ? MathUtils_1.MathUtils.GetAngleByVectorDotWithSign(r.ActorForwardProxy, o) : MathUtils_1.MathUtils.GetAngleByVectorDot(r.ActorForwardProxy, o);
      e = (0, SkillBehaviorMisc_1.compare)(i.ComparisonLogic, t, i.Value, i.RangeL, i.RangeR);
    }
    if (i.Reverse) {
      return !e;
    } else {
      return e;
    }
  }
  static dZo(i, t) {
    t = t.Entity.GetComponent(206);
    t = i.AnyTag ? t.HasAnyTag(GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(i.TagToCheck)) : t.HasAllTag(GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(i.TagToCheck));
    if (i.Reverse) {
      return !t;
    } else {
      return t;
    }
  }
  static CZo(i, t) {
    var t = t.Entity.GetComponent(174);
    var e = t.GetCurrentValue(i.AttributeId1);
    var t = i.AttributeId2 > 0 ? t.GetCurrentValue(i.AttributeId2) : 0;
    var e = (0, SkillBehaviorMisc_1.compare)(i.ComparisonLogic, e, i.Value + t * i.AttributeRate * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, i.RangeL, i.RangeR);
    if (i.Reverse) {
      return !e;
    } else {
      return e;
    }
  }
  static zDd(i, t) {
    t = t.Entity.GetComponent(179).GetHeightAboveGround();
    t = (0, SkillBehaviorMisc_1.compare)(i.ComparisonLogic, t, i.Value, i.RangeL, i.RangeR);
    if (i.Reverse) {
      return !t;
    } else {
      return t;
    }
  }
  static gZo(i, t) {
    let e = false;
    var r;
    if (t.SkillComponent.SkillTarget) {
      r = t.Entity.GetComponent(1).ActorLocationProxy;
      t = Vector_1.Vector.Create(t.SkillComponent.GetTargetTransform().GetLocation());
      r = r.Z - t.Z;
      e = (0, SkillBehaviorMisc_1.compare)(i.ComparisonLogic, r, i.Value, i.RangeL, i.RangeR);
    }
    if (i.Reverse) {
      return !e;
    } else {
      return e;
    }
  }
}
exports.SkillBehaviorCondition = SkillBehaviorCondition;
//# sourceMappingURL=SkillBehaviorCondition.js.map
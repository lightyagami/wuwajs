"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiLibrary = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
class AiLibrary {
  static IsSkillAvailable(e, o, r, t, l, i, a, _, g, s, n = false) {
    var L;
    var c = e.AiSkill.SkillInfos.get(o);
    return !!c && !!(L = e.AiSkill.SkillPreconditionMap.get(c.SkillPreconditionId)) && !!L.NeedTarget && !((n = n && !Info_1.Info.IsBuildShipping) && Log_1.Log.CheckInfo() && Log_1.Log.Info("AI", 6, "Detect Skill", ["SkillInfoId", o]), l >= 0 && c.SkillType !== l ? (n && Log_1.Log.CheckInfo() && Log_1.Log.Info("AI", 6, "FailType", ["Type", l]), 1) : e.AiSkill.CanActivate(o) && r.IsCanUseSkill(Number(c.SkillId)) && e.AiSkill.CanActivate(o) ? L.NeedTag && (!t.Valid || e.AiSkill.PreconditionTagMap.has(c.SkillPreconditionId) && !t.HasTag(e.AiSkill.PreconditionTagMap.get(c.SkillPreconditionId).TagId)) ? (n && Log_1.Log.CheckInfo() && Log_1.Log.Info("AI", 6, "FailTag"), 1) : (!MathUtils_1.MathUtils.InRangeAngle(i, L.TargetAngleRange) || !MathUtils_1.MathUtils.InRange(a, L.HeightRange) || !!s && (!MathUtils_1.MathUtils.InRange(_, L.DistanceRange) || !MathUtils_1.MathUtils.InRangeAngle(g, L.AngleRange))) && (n && Log_1.Log.CheckInfo() && Log_1.Log.Info("AI", 6, "FailLocation", ["TargetAngle", i], ["Distance", _], ["Angle", g], ["Height", a]), 1) : (n && Log_1.Log.CheckInfo() && Log_1.Log.Info("AI", 6, "FailCD"), 1));
  }
  static SelectSkillWithTarget(e, o, r, t, l = false) {
    var i = e.CharActorComp;
    var a = i.Entity.GetComponent(205);
    var _ = Vector_1.Vector.Create();
    MathUtils_1.MathUtils.InverseTransformPositionNoScale(r.FloorLocation, r.ActorRotationProxy, i.FloorLocation, _);
    var g = Vector_1.Vector.GetAngleByVector2D(_);
    MathUtils_1.MathUtils.InverseTransformPositionNoScale(i.FloorLocation, i.ActorRotationProxy, r.FloorLocation, _);
    var s = _.Z;
    var n = Math.max(_.Size2D() - i.ScaledRadius - r.ScaledRadius, MathUtils_1.MathUtils.SmallNumber);
    var L = Vector_1.Vector.GetAngleByVector2D(_);
    let c = 0;
    let I = 0;
    let h = 0;
    if (l && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AI", 6, "SelectSkillWithTarget", ["Owner", e.CharActorComp.Actor.GetName()]);
    }
    for (const S of e.AiSkill.ActiveSkillGroup) {
      for (const M of e.AiSkill.BaseSkill.RandomSkills[S].ArrayInt) {
        var d;
        var u = e.AiSkill.SkillInfos.get(M);
        if (u) {
          if (!(u.SkillWeight <= 0)) {
            if (AiLibrary.IsSkillAvailable(e, M, o, a, t, g, s, n, L, true, l) && (d = u.SkillWeight, c += d, MathUtils_1.MathUtils.GetRandomRange(0, c) < d)) {
              I = M;
              h = Number(u.SkillId);
            }
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 6, "没有配置技能库", ["Id", M]);
        }
      }
    }
    if (l && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AI", 6, "SelectSkillWithTarget Success", ["SkillId", h]);
    }
    return !!h && (ControllerHolder_1.ControllerHolder.BlackboardController.SetStringValueByEntity(i.Entity.Id, "SkillId", h.toString()), ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(i.Entity.Id, "SkillInfoId", I), true);
  }
  static SelectSkillWithoutTarget(a, _, g) {
    var e = a.CharActorComp;
    const s = e.Entity.GetComponent(205);
    let n = 0;
    let L = 0;
    let c = 0;
    a.AiSkill.ActiveSkillGroup.forEach((e, o, r) => {
      a.AiSkill.BaseSkill.RandomSkills[e].ArrayInt.forEach((e, o, r) => {
        var t;
        var l;
        var i = a.AiSkill.SkillInfos.get(e);
        if (i) {
          if (l = a.AiSkill.SkillPreconditionMap.get(i.SkillPreconditionId)) {
            if (!l.NeedTarget && (!(g >= 0) || i.SkillType === g)) {
              if (_.IsCanUseSkill(Number(i.SkillId)) && a.AiSkill.CanActivate(e) && (t = a.AiSkill.PreconditionTagMap.get(i.SkillPreconditionId)?.TagId, !l.NeedTag || !t || s.Valid && s.HasTag(t)) && (l = i.SkillWeight, n += l, MathUtils_1.MathUtils.GetRandomRange(0, n) < l)) {
                L = e;
                c = Number(i.SkillId);
              }
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("BehaviorTree", 6, "没有配置技能前置条件", ["Id", i.SkillPreconditionId]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 6, "没有配置技能库", ["Id", e]);
        }
      });
    });
    return !!c && (ControllerHolder_1.ControllerHolder.BlackboardController.SetStringValueByEntity(e.Entity.Id, "SkillId", c.toString()), ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(e.Entity.Id, "SkillInfoId", L), true);
  }
}
exports.AiLibrary = AiLibrary;
//# sourceMappingURL=AiLibrary.js.map
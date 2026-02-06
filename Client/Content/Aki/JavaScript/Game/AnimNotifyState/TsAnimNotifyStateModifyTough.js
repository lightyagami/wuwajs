"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const ToughCalcRatioById_1 = require("../../Core/Define/ConfigQuery/ToughCalcRatioById");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const CombatMessage_1 = require("../Module/CombatMessage/CombatMessage");
class TsAnimNotifyStateModifyTough extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.ToughModifierId = "";
  }
  Constructor() {}
  K2_NotifyBegin(e, o, r) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      let t = undefined;
      try {
        t = BigInt(this.ToughModifierId);
      } catch (e) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 19, "在修改被削韧倍率中配置了不合法的id", ["id", t], ["animationName", o?.GetName()]);
        }
        return true;
      }
      var e = e.CharacterActorComponent?.Entity;
      var a = e?.CheckGetComponent(19);
      var i = ToughCalcRatioById_1.configToughCalcRatioById.GetConfig(t);
      if (i === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 19, "韧性系数计算表对应id非法", ["id", t], ["animationName", o?.GetName()]);
        }
      } else if (e && a && a?.Valid && (a.AddToughModifier("ToughRate", i.RatioNormal), a.AddToughModifier("ToughRateOnCounter", i.RatioSpecial), a.ActorComponent.IsAutonomousProxy)) {
        CombatMessage_1.CombatNet.Send(17623, e, Protocol_1.Aki.Protocol.ve_.create({
          s5n: MathUtils_1.MathUtils.BigIntToLong(t),
          n5n: r
        }));
      }
    }
    return true;
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      let e = undefined;
      try {
        e = BigInt(this.ToughModifierId);
      } catch (e) {
        return true;
      }
      var t = t.CharacterActorComponent?.Entity?.CheckGetComponent(19);
      var o = ToughCalcRatioById_1.configToughCalcRatioById.GetConfig(e);
      if (o === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 19, "韧性系数计算表对应id非法", ["id", e]);
        }
      } else if (t?.Valid) {
        t.RemoveToughModifier("ToughRate", o.RatioNormal);
        t.RemoveToughModifier("ToughRateOnCounter", o.RatioSpecial);
      }
    }
    return true;
  }
  GetNotifyName() {
    return "修改被削韧倍率";
  }
}
exports.default = TsAnimNotifyStateModifyTough;
//# sourceMappingURL=TsAnimNotifyStateModifyTough.js.map
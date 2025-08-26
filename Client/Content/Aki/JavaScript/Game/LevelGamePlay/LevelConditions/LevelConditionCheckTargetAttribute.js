"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckTargetAttribute = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ICondition_1 = require("../../../UniverseEditor/Interface/ICondition");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckTargetAttribute extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    e = e.Option;
    return e.Type === ICondition_1.ETargetType.Player && this.iLe(e);
  }
  iLe(e) {
    return e.Option === ICondition_1.EPlayerCheckType.AnyRole && this.oLe(ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(), e.AttributeTypes);
  }
  oLe(e, r) {
    let t = false;
    for (const o of e) {
      let e = true;
      for (const n of r) {
        if (n.Type === ICondition_1.EPlayerAttributeType.Health) {
          e &&= this.rLe(o, n);
        }
        if (!e) {
          break;
        }
      }
      if (t ||= e) {
        return true;
      }
    }
    return t;
  }
  rLe(e, r) {
    e = e.Entity?.GetComponent(174);
    if (!e) {
      return false;
    }
    var t = e.GetCurrentValue(Protocol_1.Aki.Protocol.Vks.Proto_Life) / e.GetCurrentValue(Protocol_1.Aki.Protocol.Vks.l5n) * 100;
    switch (r.Compare) {
      case "Eq":
        return t === r.Value;
      case "Ne":
        return t !== r.Value;
      case "Ge":
        return t >= r.Value;
      case "Gt":
        return t > r.Value;
      case "Le":
        return t <= r.Value;
      case "Lt":
        return t < r.Value;
      default:
        return false;
    }
  }
}
exports.LevelConditionCheckTargetAttribute = LevelConditionCheckTargetAttribute;
//# sourceMappingURL=LevelConditionCheckTargetAttribute.js.map
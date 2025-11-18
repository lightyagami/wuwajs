"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckTargetAttribute = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ICondition_1 = require("../../../UniverseEditor/Interface/ICondition");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const HonamiStoryUtil_1 = require("../../Module/HonamiStory/HonamiStoryUtil");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckTargetAttribute extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    e = e.Option;
    return e.Type === ICondition_1.ETargetType.Player && this.iLe(e);
  }
  iLe(e) {
    switch (e.Option) {
      case ICondition_1.EPlayerCheckType.AnyRole:
        return this.oLe(ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(), e.AttributeTypes);
      case ICondition_1.EPlayerCheckType.Team:
        return this.Xtm(e.AttributeTypes);
      default:
        return false;
    }
  }
  oLe(e, r) {
    let t = false;
    for (const o of e) {
      let e = true;
      for (const i of r) {
        if (i.Type === ICondition_1.EPlayerAttributeType.Health) {
          e &&= this.rLe(o, i);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelCondition", 93, "检测目标战斗属性 队伍任意角色属性检查", ["不支持的属性类型", i.Type]);
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
  Xtm(e) {
    let r = true;
    for (const t of e) {
      if (t.Type === ICondition_1.EPlayerAttributeType.StabilityPoint) {
        r &&= this.Ivm(t);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelCondition", 93, "检测目标战斗属性 队伍属性检查", ["不支持的属性类型", t.Type]);
        }
        r = false;
      }
      if (!r) {
        return false;
      }
    }
    return true;
  }
  rLe(e, r) {
    var t;
    var e = e.Entity?.GetComponent(177);
    return !!e && (t = e.GetCurrentValue(Protocol_1.Aki.Protocol.Vks.Proto_Life), e = e.GetCurrentValue(Protocol_1.Aki.Protocol.Vks.l5n), this.ztm(r.Compare, t / e * 100, r.Value));
  }
  Ytm(e, r, t) {
    r = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetValue(r);
    return this.ztm(e.Compare, r, t ?? e.Value);
  }
  Ivm(e) {
    var r = e;
    let t = true;
    if (r.ValueGroup && r.ValueGroup > 0) {
      r = HonamiStoryUtil_1.HonamiStoryUtil.GetSteadyConsumeByCostGroup(r.ValueGroup);
      t &&= this.Ytm(e, 13, r);
    } else {
      t &&= this.Ytm(e, 13);
    }
    return t;
  }
  ztm(e, r, t) {
    switch (e) {
      case "Eq":
        return r === t;
      case "Ne":
        return r !== t;
      case "Ge":
        return t <= r;
      case "Gt":
        return t < r;
      case "Le":
        return r <= t;
      case "Lt":
        return r < t;
      default:
        return false;
    }
  }
}
exports.LevelConditionCheckTargetAttribute = LevelConditionCheckTargetAttribute;
//# sourceMappingURL=LevelConditionCheckTargetAttribute.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KingShipUtil = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
class KingShipUtil {
  static CheckEndingList(e, r, n) {
    for (const a of e) {
      var i = a.Conditions.ConditionType === 1;
      let t = false;
      for (const s of a.Conditions.Conditions) {
        let e = this.JMu(r.get(s.PropertyId) ?? 0, s.Target, s.Compare);
        if (!a.IsSuccess && n.includes(s.PropertyId)) {
          e = false;
        }
        if (i && e) {
          return a;
        }
        if (!i && !e) {
          t = true;
          break;
        }
      }
      if (!i && !t) {
        return a;
      }
    }
  }
  static JMu(e, t, r) {
    switch (r) {
      case "Eq":
        return e === t;
      case "Ne":
        return e !== t;
      case "Ge":
        return t <= e;
      case "Gt":
        return t < e;
      case "Le":
        return e <= t;
      case "Lt":
        return e < t;
    }
    return false;
  }
  static GetKingShipOpenData(e) {
    var t = ConfigManager_1.ConfigManager.KingShipConfig?.GetReigns(e);
    if (t) {
      var r = [];
      for (const a of JSON.parse(t.BaseProperty)) {
        var n = {
          AttributeId: a.Id,
          MaxCount: a.MaxValue,
          MinCount: -a.MaxValue,
          Current: a.BaseValue,
          IsDefaultEnable: a.IsDefaultEnable
        };
        r.push(n);
      }
      var i = JSON.parse(t.EndingList);
      return {
        ReignsId: e,
        NextReignsId: t.NextReignsId,
        BaseAttribute: r,
        FlowId: t.FlowId,
        PropertyDownReducePercent: t.PropertyDownReducePercent,
        UseReducePercent: false,
        EndingList: i,
        QuestText: t.TargetText,
        TitleText: t.TitleText
      };
    }
  }
}
exports.KingShipUtil = KingShipUtil;
//# sourceMappingURL=KingShipUtil.js.map
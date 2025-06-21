"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RogueBattleUtils = void 0;
class RogueBattleUtils {
  static GetTokenSortElementInfo(e) {
    var t = [];
    for (const o of e.lIc.ZVc) t.push({
      ElementId: o.o5c,
      Count: o.m9n,
      IsPreview: !1
    });
    return t
  }
  static GetTokenSortElementInfoByCount(e) {
    var t = [];
    let o = [];
    e.lIc ? o = e.lIc.ZVc : e._Ic && (o = e._Ic.ZVc);
    for (const n of o) t.push({
      ElementId: n.o5c,
      Count: n.m9n,
      IsPreview: !1
    });
    return t.length <= 0 ? [] : new Array(t[0].Count).fill(t[0].ElementId)
  }
  static ConvertElementUnitsToElementInfo(e) {
    return e.map(e => ({
      ElementId: e.o5c,
      Count: e.m9n,
      IsPreview: !1
    }))
  }
}
exports.RogueBattleUtils = RogueBattleUtils;
//# sourceMappingURL=RogueBattleUtils.js.map
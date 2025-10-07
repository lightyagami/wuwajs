"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorConditionModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class RoleFavorConditionModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Cqi = new Map();
  }
  UpdateRoleFavorCondition(e, o) {
    var r = this.Cqi.get(e) ?? new Map();
    var t = o.oUs;
    for (const f of Object.keys(t)) {
      var s = Number(f);
      var i = t[s].rUs;
      var a = r.get(s) ?? new Map();
      for (const u of Object.keys(i)) {
        var n = Number(u);
        var d = i[n].iUs;
        var l = a.get(n) ?? [];
        var v = d.length;
        for (let e = 0; e < v; e++) {
          var c = d[e];
          l.push(c);
        }
        a.set(n, l);
      }
      r.set(s, a);
    }
    this.Cqi.set(e, r);
  }
  IsConditionFinish(e, o, r, t) {
    e = this.Cqi.get(e);
    if (e) {
      e = e.get(o);
      if (e) {
        var s = e.get(r);
        if (s) {
          var i = s.length;
          for (let e = 0; e < i; e++) {
            if (s[e] === t) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
}
exports.RoleFavorConditionModel = RoleFavorConditionModel;
//# sourceMappingURL=RoleFavorConditionModel.js.map
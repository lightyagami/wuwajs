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
  UpdateRoleFavorCondtion(e, o) {
    var r = this.Cqi.get(e) ?? new Map();
    var t = o.oUs;
    for (const f of Object.keys(t)) {
      var s = Number(f);
      var a = t[s].rUs;
      var i = r.get(s) ?? new Map();
      for (const u of Object.keys(a)) {
        var n = Number(u);
        var d = a[n].iUs;
        var l = i.get(n) ?? [];
        var v = d.length;
        for (let e = 0; e < v; e++) {
          var c = d[e];
          l.push(c);
        }
        i.set(n, l);
      }
      r.set(s, i);
    }
    this.Cqi.set(e, r);
  }
  IsCondtionFinish(e, o, r, t) {
    e = this.Cqi.get(e);
    if (e) {
      e = e.get(o);
      if (e) {
        var s = e.get(r);
        if (s) {
          var a = s.length;
          for (let e = 0; e < a; e++) {
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
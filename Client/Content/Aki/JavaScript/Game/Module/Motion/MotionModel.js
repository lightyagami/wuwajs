"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotionModel = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
class MotionModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.cqi = new Map();
    this.mqi = new Map();
    this.dqi = new Map();
    this.Cqi = new Map();
  }
  OnMotionUnlock(t, o) {
    this.gqi(t, o);
    this.fqi(t, o);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateRoleFavorData, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UnLockRoleFavorItem, t, o);
  }
  OnNewMotionCanUnlock(t, o) {
    this.gqi(t, o);
    this.pqi(t, o);
  }
  OnRoleMotionActive(o) {
    o.lUs.hUs.forEach(t => {
      this.gqi(o.lUs.Q6n, t.s5n);
      if (t.H6n === Protocol_1.Aki.Protocol.h6s.Proto_ItemLocked) {
        this.vqi(o.lUs.Q6n, t.s5n);
      } else if (t.H6n === Protocol_1.Aki.Protocol.h6s.Proto_ItemUnLocked) {
        this.fqi(o.lUs.Q6n, t.s5n);
      } else if (t.H6n === Protocol_1.Aki.Protocol.h6s.Proto_ItemCanUnLock) {
        this.pqi(o.lUs.Q6n, t.s5n);
      }
    });
  }
  OnGetAllRoleMotionInfo(t) {
    this.cqi.clear();
    this.dqi.clear();
    this.mqi.clear();
    t._Us.forEach(o => {
      o.hUs.forEach(t => {
        this.gqi(o.Q6n, t.s5n);
        if (t.H6n === Protocol_1.Aki.Protocol.h6s.Proto_ItemLocked) {
          this.vqi(o.Q6n, t.s5n);
        } else if (t.H6n === Protocol_1.Aki.Protocol.h6s.Proto_ItemUnLocked) {
          this.fqi(o.Q6n, t.s5n);
        } else if (t.H6n === Protocol_1.Aki.Protocol.h6s.Proto_ItemCanUnLock) {
          this.pqi(o.Q6n, t.s5n);
        }
      });
    });
    var o = t.zPs;
    for (const i of Object.keys(o)) {
      var e = Number(i);
      this.UpdateCondition(e, o[e]);
    }
  }
  OnMotionFinishCondition(t) {
    var o = t.zPs;
    for (const i of Object.keys(o)) {
      var e = Number(i);
      this.UpdateCondition(e, o[e]);
    }
  }
  GetRoleMotionState(t, o) {
    let e = this.cqi.get(t);
    if (e && e.has(o)) {
      return 2;
    } else if ((!(e = this.dqi.get(t)) || !e.has(o)) && (e = this.mqi.get(t)) && e.has(o)) {
      return 1;
    } else {
      return 0;
    }
  }
  IsCondtionFinish(t, o, e) {
    t = this.Cqi.get(t);
    if (t) {
      t = t.get(0);
      if (t) {
        var i = t.get(o);
        if (i) {
          var n = i.length;
          for (let t = 0; t < n; t++) {
            if (i[t] === e) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  UpdateCondition(t, o) {
    var e = this.Cqi.get(t) ?? new Map();
    var i = o.oUs;
    for (const M of Object.keys(i)) {
      var n = Number(M);
      var r = i[n].rUs;
      var s = e.get(n) ?? new Map();
      for (const _ of Object.keys(r)) {
        var h = Number(_);
        var a = r[h].iUs;
        var v = s.get(h) ?? [];
        var l = a.length;
        for (let t = 0; t < l; t++) {
          var c = a[t];
          v.push(c);
        }
        s.set(h, v);
      }
      e.set(n, s);
    }
    this.Cqi.set(t, e);
  }
  gqi(t, o) {
    var e = this.cqi.get(t);
    if (e) {
      e.delete(o);
    }
    var e = this.dqi.get(t);
    if (e) {
      e.delete(o);
    }
    var e = this.mqi.get(t);
    if (e) {
      e.delete(o);
    }
  }
  fqi(t, o) {
    var e = this.cqi.get(t);
    if (e) {
      e.add(o);
    } else {
      (e = new Set()).add(o);
      this.cqi.set(t, e);
    }
  }
  pqi(t, o) {
    var e = this.mqi.get(t);
    if (e) {
      e.add(o);
    } else {
      (e = new Set()).add(o);
      this.mqi.set(t, e);
    }
  }
  vqi(t, o) {
    var e = this.dqi.get(t);
    if (e) {
      e.add(o);
    } else {
      (e = new Set()).add(o);
      this.dqi.set(t, e);
    }
  }
  IfRoleMotionCanUnlock(t) {
    t = this.mqi.get(t);
    return !!t && t.size > 0;
  }
}
exports.MotionModel = MotionModel;
//# sourceMappingURL=MotionModel.js.map
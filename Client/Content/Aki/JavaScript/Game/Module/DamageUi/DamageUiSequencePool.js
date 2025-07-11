"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DamageUiSequencePool = undefined;
const puerts_1 = require("puerts");
const Pool_1 = require("../../../Core/Container/Pool");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const DamageSequenceHandle_1 = require("./DamageSequenceHandle");
class DamageUiSequencePool {
  static Preload(e, t, a) {
    let i = DamageUiSequencePool.J2t(e);
    if (!((i = i || DamageUiSequencePool.z2t(e, t)).Size > 0)) {
      DamageUiSequencePool.PreloadAdd(i, e, a);
    }
  }
  static z2t(e, t) {
    t = new Pool_1.Pool(t, () => this.Z2t(e), this.h7);
    this.eFt.set(e, t);
    return t;
  }
  static J2t(e) {
    return this.eFt.get(e);
  }
  static Get(e, t) {
    var a;
    var i = this.J2t(e);
    if (i) {
      if (a = i.Get()) {
        if (t) {
          t(a);
        }
      } else {
        (a = this.qp(i, e)).SpawnSequence(t);
      }
    }
  }
  static Recycle(e) {
    e.Reset();
    var t = e.GetPath();
    var t = this.J2t(t);
    if (t) {
      t.Put(e);
    }
  }
  static PreloadAdd(t, e, a) {
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      for (let e = 0; e < a; e++) {
        var i = t.Create();
        if (!i) {
          return;
        }
        i.SpawnSequence();
        t.Put(i);
      }
    }
  }
  static qp(e, t) {
    return e.Create();
  }
  static Z2t(e) {
    var t;
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      (t = new DamageSequenceHandle_1.DamageSequenceHandle()).Initialize(e);
      return t;
    }
  }
  static Clear() {
    for (const e of this.eFt.values()) {
      e.Clear();
    }
  }
}
(exports.DamageUiSequencePool = DamageUiSequencePool).SequenceActorRef = (0, puerts_1.$ref)(undefined);
DamageUiSequencePool.eFt = new Map();
DamageUiSequencePool.h7 = e => {
  e.Destroy();
}; //# sourceMappingURL=DamageUiSequencePool.js.map
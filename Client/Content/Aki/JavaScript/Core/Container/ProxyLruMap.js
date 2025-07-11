"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProxyLruMap = undefined;
const Log_1 = require("../Common/Log");
const ProxyLru_1 = require("./ProxyLru");
class ProxyLruMap {
  constructor(t = undefined) {
    this._7 = new Map();
    this.B7 = undefined;
    this.B7 = t;
  }
  Add(t, e, r, i = undefined) {
    if (this._7.has(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Core", 1, "池中已存在该种类", ["category", t]);
      }
    } else {
      this._7.set(t, new ProxyLru_1.ProxyLru(e, r, i));
    }
  }
  Remove(t) {
    var e = this.b7(t);
    if (e) {
      this._7.delete(t);
      e.Clear();
      this.B7?.(t);
    }
  }
  Create(t, e) {
    return this.b7(t)?.Create(e);
  }
  Get(t, e) {
    return this.b7(t)?.Get(e);
  }
  Put(t, e) {
    if (this.b7(t)?.Put(e)) {
      this.B7?.(t);
    }
  }
  GetEnable(t) {
    t = this.b7(t);
    return !!t && t.Enable;
  }
  SetEnable(t, e) {
    t = this.b7(t);
    if (t) {
      t.Enable = e;
    }
  }
  GetSize(t) {
    t = this.b7(t);
    if (t) {
      return t.Size;
    } else {
      return 0;
    }
  }
  GetCapacity(t) {
    t = this.b7(t);
    if (t) {
      return t.Capacity;
    } else {
      return 0;
    }
  }
  SetCapacity(t, e) {
    t = this.b7(t);
    if (t) {
      t.Capacity = e;
    }
  }
  GetHitRate(t) {
    t = this.b7(t);
    if (t) {
      return t.HitRate;
    } else {
      return 0;
    }
  }
  GetUsedAvg(t) {
    t = this.b7(t);
    if (t) {
      return t.UsedAvg;
    } else {
      return 0;
    }
  }
  GetThresholdUsedRate(t) {
    t = this.b7(t);
    if (t) {
      return t.ThresholdUsedRate;
    } else {
      return 0;
    }
  }
  [Symbol.iterator]() {
    return this._7.keys();
  }
  b7(t) {
    var e = this._7.get(t);
    if (e) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Core", 1, "池中不存在该种类", ["category", t]);
    }
  }
}
exports.ProxyLruMap = ProxyLruMap;
//# sourceMappingURL=ProxyLruMap.js.map
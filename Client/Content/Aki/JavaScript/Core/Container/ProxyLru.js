"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProxyLru = undefined;
const Log_1 = require("../Common/Log");
const Lru_1 = require("./Lru");
class ProxyLru {
  constructor(t, e, r = undefined, i = undefined) {
    this.G9 = undefined;
    this.L7 = new WeakMap();
    this.D7 = new WeakMap();
    this.R7 = undefined;
    this.U7 = true;
    this.A7 = {
      has: (t, e) => Reflect.has(t, e),
      ownKeys: t => Reflect.ownKeys(t),
      get: (t, e, r) => {
        var i;
        var e = Reflect.get(t, e);
        return e && ((i = typeof e) == "object" ? this.P7(t, r, e) : i == "function" ? this.x7(t, r, e) : e);
      },
      deleteProperty: (t, e) => {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Core", 1, "容器中的对象不允许删除属性", ["target", t], ["property", e]);
        }
        return false;
      },
      isExtensible: t => {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Core", 1, "容器中的对象不允许扩展", ["target", t]);
        }
        return false;
      },
      preventExtensions: t => {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Core", 1, "容器中的对象不允许阻止扩展", ["target", t]);
        }
        return false;
      },
      getPrototypeOf: t => Reflect.getPrototypeOf(t),
      setPrototypeOf: (t, e) => {
        if (e) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Core", 1, "容器中的对象不允许修改原型", ["target", t], ["prototype", e]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Core", 1, "容器中的对象不允许修改原型", ["target", t]);
        }
        return false;
      }
    };
    this.G9 = new Lru_1.Lru(t, e, r);
    this.R7 = i;
    this.U7 = ProxyLru.ProxyLruEnable;
  }
  get Enable() {
    return this.G9.Enable;
  }
  set Enable(t) {
    this.G9.Enable = t;
  }
  get Size() {
    return this.G9.Size;
  }
  get Capacity() {
    return this.G9.Capacity;
  }
  set Capacity(t) {
    this.G9.Capacity = t;
  }
  get HitRate() {
    return this.G9.HitRate;
  }
  get UsedAvg() {
    return this.G9.UsedAvg;
  }
  get ThresholdUsedRate() {
    return this.G9.ThresholdUsedRate;
  }
  Create(t) {
    if (this.U7) {
      return this.w7(t, this.G9.Create(t));
    } else {
      return this.G9.Create(t);
    }
  }
  Get(t) {
    var e = this.G9.Get(t);
    if (this.U7 && e) {
      return this.w7(t, e);
    } else {
      return e;
    }
  }
  Put(t) {
    if (this.U7) {
      var e = this.L7.get(t);
      if (!e) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Core", 1, "对象不在维护列表中", ["value", t]);
        }
        return false;
      }
      var r = this.D7.get(t);
      if (!r) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Core", 1, "对象不存在所属代理表", ["value", t]);
        }
        return false;
      }
      this.D7.delete(t);
      for (const i of r.values()) {
        this.D7.delete(i.proxy);
        i.revoke();
      }
      r.clear();
      e.revoke();
      this.L7.delete(t);
      return this.G9.Put(e.Value);
    }
    return this.G9.Put(t);
  }
  Clear() {
    this.G9.Clear();
  }
  w7(t, e) {
    var r = Proxy.revocable(e, this.A7);
    r.Key = t;
    r.Value = e;
    var t = r.proxy;
    this.L7.set(t, r);
    this.D7.set(t, new Map());
    return t;
  }
  P7(t, e, r) {
    if (this.D7.has(r)) {
      return r;
    }
    var i = this.D7.get(e);
    if (i) {
      var o = i.get(r);
      if (!o) {
        if (!this.R7?.(t, r)) {
          return r;
        }
        o = Proxy.revocable(r, this.A7);
        i.set(r, o);
        this.D7.set(o.proxy, i);
      }
      return o.proxy;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Core", 1, "对象不存在所属代理表", ["receiver", e]);
    }
  }
  x7(r, i, o) {
    return (...t) => {
      var e;
      var t = Reflect.apply(o, r, t);
      return t && ((e = typeof t) == "object" ? this.P7(r, i, t) : e == "function" ? this.x7(r, i, t) : t);
    };
  }
  GetCount(t) {
    return this.G9.GetCount(t);
  }
}
(exports.ProxyLru = ProxyLru).ProxyLruEnable = false;
//# sourceMappingURL=ProxyLru.js.map
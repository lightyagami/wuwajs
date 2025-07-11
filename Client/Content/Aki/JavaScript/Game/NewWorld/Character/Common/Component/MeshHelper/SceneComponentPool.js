"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneComponentPool = undefined;
const MeshComponentUtils_1 = require("./MeshComponentUtils");
class SceneComponentPool {
  constructor() {
    this.iJo = new Array();
    this.oJo = new Array();
    this.AttachComponentInternal = undefined;
    this.ActorInternal = undefined;
    this.MaxPoolSize = 0;
  }
  ActiveComponent(t) {}
  CleanComponent(t) {}
  CreateComponent() {}
  GetComponents(t, i = true, e = false) {
    t = t > this.MaxPoolSize ? this.MaxPoolSize : t;
    let h = i ? 0 : t;
    var o = new Array();
    if (i) {
      let s = t;
      i = this.oJo.length;
      if (i < t) {
        s = i;
        h = t - i;
      } else {
        var r = i - t;
        for (let t = 0; t < r; ++t) {
          var n = this.oJo.pop();
          this.BasePoolPush(n);
        }
      }
      for (let t = 0; t < s; ++t) {
        this.PoolPushInternal(this.oJo[t], o, false);
        if (e) {
          this.CleanComponent(this.oJo[t]);
        }
      }
    }
    if (h > 0) {
      let s = 0;
      i = this.iJo.length;
      if (h > i) {
        s = h - i;
        h = i;
      }
      for (let t = 0; t < h; ++t) {
        var l = this.iJo.pop();
        this.PoolPushInternal(l, o, false);
        this.UsedPoolPush(l);
      }
      for (let t = 0; t < s; ++t) {
        var a = this.CreateComponent();
        this.PoolPushInternal(a, o, false);
        this.UsedPoolPush(a);
      }
    }
    for (const s of o) {
      this.ActiveComponent(s);
    }
    return o;
  }
  BackComponent(t) {
    let s = true;
    for (const e of t) {
      var i;
      if (this.oJo.concat(e)) {
        i = this.oJo.indexOf(e);
        this.iJo.push(e);
        this.oJo.slice(i, 1);
      } else {
        s = false;
      }
    }
    return s;
  }
  Init(t, s, i, e, h = false, o = false) {
    if (s && i && t > 0) {
      this.ActorInternal = i;
      this.MaxPoolSize = t;
      this.AttachComponentInternal = s;
      var i = e.length;
      var r = t < i ? t : i;
      for (let t = 0; t < r; ++t) {
        var n = e[t];
        MeshComponentUtils_1.MeshComponentUtils.RelativeAttachComponentOnSafe(n, this.AttachComponentInternal);
        this.iJo.push();
        if (!this.PoolPush(n, h, o)) {
          break;
        }
      }
    }
  }
  CheckPoolRange() {
    return this.iJo.length + this.oJo.length < this.MaxPoolSize;
  }
  PoolPush(t, s = false, i = true) {
    return !!this.CheckPoolRange() && (s ? this.BasePoolPush(t, i) : this.UsedPoolPush(t, i), true);
  }
  BasePoolPush(t, s = true) {
    this.PoolPushInternal(t, this.iJo, s);
  }
  UsedPoolPush(t, s = false) {
    this.PoolPushInternal(t, this.oJo, s);
  }
  PoolPushInternal(t, s, i = true) {
    s.push(t);
    if (i) {
      this.CleanComponent(t);
    }
  }
  Shrink() {
    for (const t of this.iJo) {
      t.K2_DestroyComponent(this.ActorInternal);
    }
    this.iJo.splice(0, this.iJo.length);
  }
  GetUsedLength() {
    return this.oJo.length;
  }
}
exports.SceneComponentPool = SceneComponentPool;
//# sourceMappingURL=SceneComponentPool.js.map
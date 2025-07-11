"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkSpritePool = undefined;
const Time_1 = require("../../../../Core/Common/Time");
const MAX_SPRITE_HANDLE_CACHE_TIME = 10000;
class MarkSpritePool {
  static Get(t, i) {
    var s = this.LW_.get(i);
    if (s !== undefined) {
      this.Ref(t, i, s.Obj);
      return s.Obj;
    }
  }
  static Ref(t, i, s) {
    let e = this.wW_.get(t);
    if (e === undefined) {
      e = new Set();
      this.wW_.set(t, e);
    }
    e.add(i);
    let o = this.LW_.get(i);
    if (o !== undefined) {
      ++o.Ref;
    } else {
      o = {
        SpritePath: i,
        RecycleTimeStamp: 0,
        Obj: s,
        Ref: 1
      };
      this.LW_.set(i, o);
    }
  }
  static UnRef(t) {
    var i = this.wW_.get(t);
    if (i !== undefined) {
      for (const e of i) {
        var s = this.LW_.get(e);
        if (s !== undefined && (--s.Ref, s.Ref <= 0)) {
          s.RecycleTimeStamp = Time_1.Time.ServerTimeStamp;
          this.LW_.delete(e);
        }
      }
      this.wW_.delete(t);
    }
  }
  static Tick() {
    this.RW_.length = 0;
    for (const i of this.LW_.values()) {
      var t = Time_1.Time.ServerTimeStamp - i.RecycleTimeStamp;
      if (i.Ref <= 0 && t > MAX_SPRITE_HANDLE_CACHE_TIME || !i.Obj?.IsValid()) {
        this.RW_.push(i.SpritePath);
      }
    }
    for (const s of this.RW_) {
      this.LW_.delete(s);
    }
  }
  static Dispose() {
    this.wW_.clear();
    this.LW_.clear();
  }
}
(exports.MarkSpritePool = MarkSpritePool).wW_ = new Map();
MarkSpritePool.LW_ = new Map();
MarkSpritePool.RW_ = []; //# sourceMappingURL=MarkSpritePool.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHideWorldEntityAndLevelPlayGroup = undefined;
class FbHideWorldEntityAndLevelPlayGroup {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.hxh = false;
    this.lxh = undefined;
    this.oxh = false;
    this.nxh = undefined;
    this._xh = false;
    this.cxh = undefined;
    this.uxh = false;
    this.dxh = undefined;
    this.P9_ = false;
    this.x9_ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbHideWorldEntityAndLevelPlayGroup(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get HideRangeEntities() {
    if (!this.hxh) {
      this.hxh = true;
      this.lxh = new Array();
      var i = this.FbDataInternal.hideRangeEntitiesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.lxh.push(this.FbDataInternal.hideRangeEntities(t));
        }
      }
    }
    return this.lxh;
  }
  get ExcludeEntities() {
    if (!this.oxh) {
      this.oxh = true;
      this.nxh = new Array();
      var i = this.FbDataInternal.excludeEntitiesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.nxh.push(this.FbDataInternal.excludeEntities(t));
        }
      }
    }
    return this.nxh;
  }
  get ExcludeLevelPlays() {
    if (!this._xh) {
      this._xh = true;
      this.cxh = new Array();
      var i = this.FbDataInternal.excludeLevelPlaysLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.cxh.push(this.FbDataInternal.excludeLevelPlays(t));
        }
      }
    }
    return this.cxh;
  }
  get AppendEntities() {
    if (!this.uxh) {
      this.uxh = true;
      this.dxh = new Array();
      var i = this.FbDataInternal.appendEntitiesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.dxh.push(this.FbDataInternal.appendEntities(t));
        }
      }
    }
    return this.dxh;
  }
  get AppendLevelPlays() {
    if (!this.P9_) {
      this.P9_ = true;
      this.x9_ = new Array();
      var i = this.FbDataInternal.appendLevelPlaysLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.x9_.push(this.FbDataInternal.appendLevelPlays(t));
        }
      }
    }
    return this.x9_;
  }
}
exports.FbHideWorldEntityAndLevelPlayGroup = FbHideWorldEntityAndLevelPlayGroup;
//# sourceMappingURL=FbHideWorldEntityAndLevelPlayGroup.js.map
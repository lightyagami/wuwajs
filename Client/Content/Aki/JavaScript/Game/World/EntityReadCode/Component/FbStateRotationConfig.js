"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbStateRotationConfig = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbKeyRotatorConfig_1 = require("./FbKeyRotatorConfig");
const FbRotationConfig_1 = require("./FbRotationConfig");
class FbStateRotationConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.Bch = false;
    this.Cbo = undefined;
    this.Dfh = false;
    this.Bfh = false;
    this.aqh = false;
    this.hqh = undefined;
    this.lqh = false;
    this._qh = undefined;
    this.cqh = false;
    this.uqh = undefined;
    this.cQl = false;
    this.uQl = false;
  }
  static Create(t) {
    if (t) {
      return new FbStateRotationConfig(t);
    }
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
  get IsLoop() {
    if (!this.Dfh) {
      this.Dfh = true;
      this.Bfh = this.FbDataInternal.isLoop();
    }
    return this.Bfh;
  }
  get RotatePoint() {
    if (!this.aqh) {
      this.aqh = true;
      this.hqh = this.FbDataInternal.rotatePoint();
    }
    return this.hqh;
  }
  get RotationConfig() {
    if (!this.lqh) {
      this.lqh = true;
      this._qh = new Array();
      var i = this.FbDataInternal.rotationConfigLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var o = this.FbDataInternal.rotationConfig(t, new fb_component_1.RotationConfig());
          this._qh.push(FbRotationConfig_1.FbRotationConfig.Create(o));
        }
      }
    }
    return this._qh;
  }
  get KeyRotatorConfig() {
    if (!this.cqh) {
      this.cqh = true;
      this.uqh = new Array();
      var i = this.FbDataInternal.keyRotatorConfigLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var o = this.FbDataInternal.keyRotatorConfig(t, new fb_component_1.KeyRotatorConfig());
          this.uqh.push(FbKeyRotatorConfig_1.FbKeyRotatorConfig.Create(o));
        }
      }
    }
    return this.uqh;
  }
  get KeepLastRotation() {
    if (!this.cQl) {
      this.cQl = true;
      this.uQl = this.FbDataInternal.keepLastRotation();
    }
    return this.uQl;
  }
}
exports.FbStateRotationConfig = FbStateRotationConfig;
//# sourceMappingURL=FbStateRotationConfig.js.map
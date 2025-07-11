"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCaptureStrategicPoint = undefined;
const FbStaticEntitiyMatch_1 = require("./FbStaticEntitiyMatch");
class FbCaptureStrategicPoint {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.nWh = false;
    this.Fke = 0;
    this.sWh = false;
    this.aWh = 0;
    this.hWh = false;
    this.lWh = 0;
    this._Wh = false;
    this.cWh = 0;
    this.uWh = false;
    this.dWh = 0;
    this.mWh = false;
    this.CWh = 0;
    this.gWh = false;
    this.fWh = undefined;
    this.pWh = false;
    this.vWh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCaptureStrategicPoint(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MaxValue() {
    if (!this.nWh) {
      this.nWh = true;
      this.Fke = this.FbDataInternal.maxValue();
    }
    return this.Fke;
  }
  get InitValue() {
    if (!this.sWh) {
      this.sWh = true;
      this.aWh = this.FbDataInternal.initValue();
    }
    return this.aWh;
  }
  get ProgressPerformanceAttribute() {
    if (!this.hWh) {
      this.hWh = true;
      this.lWh = this.FbDataInternal.progressPerformanceAttribute();
    }
    return this.lWh;
  }
  get IncreaseSpeed() {
    if (!this._Wh) {
      this._Wh = true;
      this.cWh = this.FbDataInternal.increaseSpeed();
    }
    return this.cWh;
  }
  get DecreaseSpeed() {
    if (!this.uWh) {
      this.uWh = true;
      this.dWh = this.FbDataInternal.decreaseSpeed();
    }
    return this.dWh;
  }
  get UnoccupiedDecreaseSpeed() {
    if (!this.mWh) {
      this.mWh = true;
      this.CWh = this.FbDataInternal.unoccupiedDecreaseSpeed();
    }
    return this.CWh;
  }
  get EnemyEntitiyMatch() {
    if (!this.gWh) {
      this.gWh = true;
      this.fWh = FbStaticEntitiyMatch_1.FbStaticEntitiyMatch.Create(this.FbDataInternal.enemyEntitiyMatch());
    }
    return this.fWh;
  }
  get CaptureType() {
    if (!this.pWh) {
      this.pWh = true;
      this.vWh = this.FbDataInternal.captureType();
    }
    return this.vWh;
  }
}
exports.FbCaptureStrategicPoint = FbCaptureStrategicPoint;
//# sourceMappingURL=FbCaptureStrategicPoint.js.map
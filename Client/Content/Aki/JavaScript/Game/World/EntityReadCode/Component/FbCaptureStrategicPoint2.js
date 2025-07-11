"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCaptureStrategicPoint2 = undefined;
const FbStaticEntitiyMatch_1 = require("./FbStaticEntitiyMatch");
class FbCaptureStrategicPoint2 {
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
    this.gWh = false;
    this.fWh = undefined;
    this.yWh = false;
    this.SWh = 0;
    this.MWh = false;
    this.EWh = 0;
    this.IWh = false;
    this.TWh = 0;
    this.bWh = false;
    this.LWh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCaptureStrategicPoint2(t);
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
  get EnemyEntitiyMatch() {
    if (!this.gWh) {
      this.gWh = true;
      this.fWh = FbStaticEntitiyMatch_1.FbStaticEntitiyMatch.Create(this.FbDataInternal.enemyEntitiyMatch());
    }
    return this.fWh;
  }
  get PlayerInMonsterOutCaptureSpeed() {
    if (!this.yWh) {
      this.yWh = true;
      this.SWh = this.FbDataInternal.playerInMonsterOutCaptureSpeed();
    }
    return this.SWh;
  }
  get PlayerInMonsterInCaptureSpeed() {
    if (!this.MWh) {
      this.MWh = true;
      this.EWh = this.FbDataInternal.playerInMonsterInCaptureSpeed();
    }
    return this.EWh;
  }
  get PlayerOutMonsterOutCaptureSpeed() {
    if (!this.IWh) {
      this.IWh = true;
      this.TWh = this.FbDataInternal.playerOutMonsterOutCaptureSpeed();
    }
    return this.TWh;
  }
  get PlayerOutMonsterInCaptureSpeed() {
    if (!this.bWh) {
      this.bWh = true;
      this.LWh = this.FbDataInternal.playerOutMonsterInCaptureSpeed();
    }
    return this.LWh;
  }
}
exports.FbCaptureStrategicPoint2 = FbCaptureStrategicPoint2;
//# sourceMappingURL=FbCaptureStrategicPoint2.js.map
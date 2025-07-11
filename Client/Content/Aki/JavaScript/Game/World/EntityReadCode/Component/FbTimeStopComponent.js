"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTimeStopComponent = undefined;
const FbTimeStopTarget_1 = require("./FbTimeStopTarget");
class FbTimeStopComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.PKh = false;
    this.UKh = undefined;
    this.jEh = false;
    this.HEh = 0;
    this.ldh = false;
    this.NHo = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTimeStopComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get ActiveState() {
    if (!this.PKh) {
      this.PKh = true;
      this.UKh = this.FbDataInternal.activeState();
    }
    return this.UKh;
  }
  get StopTime() {
    if (!this.jEh) {
      this.jEh = true;
      this.HEh = this.FbDataInternal.stopTime();
    }
    return this.HEh;
  }
  get Target() {
    if (!this.ldh) {
      this.ldh = true;
      this.NHo = FbTimeStopTarget_1.FbTimeStopTarget.Create(this.FbDataInternal.target());
    }
    return this.NHo;
  }
}
exports.FbTimeStopComponent = FbTimeStopComponent;
//# sourceMappingURL=FbTimeStopComponent.js.map
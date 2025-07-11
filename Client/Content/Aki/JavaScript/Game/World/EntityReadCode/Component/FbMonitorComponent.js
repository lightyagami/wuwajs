"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMonitorComponent = undefined;
const FbConeTriggerShape_1 = require("../Shape/FbConeTriggerShape");
class FbMonitorComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.M_h = false;
    this.E_h = undefined;
    this.dQl = false;
    this.mQl = undefined;
    this.QXh = false;
    this.KXh = undefined;
    this.$Xh = false;
    this.XXh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbMonitorComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Range() {
    if (!this.M_h) {
      this.M_h = true;
      this.E_h = FbConeTriggerShape_1.FbConeTriggerShape.Create(this.FbDataInternal.range());
    }
    return this.E_h;
  }
  get AvailableStates() {
    if (!this.dQl) {
      this.dQl = true;
      this.mQl = new Array();
      var i = this.FbDataInternal.availableStatesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.mQl.push(this.FbDataInternal.availableStates(t));
        }
      }
    }
    return this.mQl;
  }
  get StateAfterTriggered() {
    if (!this.QXh) {
      this.QXh = true;
      this.KXh = this.FbDataInternal.stateAfterTriggered();
    }
    return this.KXh;
  }
  get StateAfterLeaved() {
    if (!this.$Xh) {
      this.$Xh = true;
      this.XXh = this.FbDataInternal.stateAfterLeaved();
    }
    return this.XXh;
  }
}
exports.FbMonitorComponent = FbMonitorComponent;
//# sourceMappingURL=FbMonitorComponent.js.map
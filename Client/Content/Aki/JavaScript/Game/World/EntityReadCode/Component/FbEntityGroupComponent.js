"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityGroupComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbEntityStateTrigger_1 = require("./FbEntityStateTrigger");
const FbFailureStateTrigger_1 = require("./FbFailureStateTrigger");
const FbFinishStateTrigger_1 = require("./FbFinishStateTrigger");
class FbEntityGroupComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.V1h = false;
    this.j1h = undefined;
    this.gVh = false;
    this.fVh = undefined;
    this.pVh = false;
    this.vVh = undefined;
    this.yVh = false;
    this.SVh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityGroupComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get EntityIds() {
    if (!this.V1h) {
      this.V1h = true;
      this.j1h = new Array();
      var i = this.FbDataInternal.entityIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.j1h.push(this.FbDataInternal.entityIds(t));
        }
      }
    }
    return this.j1h;
  }
  get StateTriggers() {
    if (!this.gVh) {
      this.gVh = true;
      this.fVh = new Array();
      var i = this.FbDataInternal.stateTriggersLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.stateTriggers(t, new fb_component_1.EntityStateTrigger());
          this.fVh.push(FbEntityStateTrigger_1.FbEntityStateTrigger.Create(e));
        }
      }
    }
    return this.fVh;
  }
  get FinishState() {
    if (!this.pVh) {
      this.pVh = true;
      this.vVh = FbFinishStateTrigger_1.FbFinishStateTrigger.Create(this.FbDataInternal.finishState());
    }
    return this.vVh;
  }
  get FailureState() {
    if (!this.yVh) {
      this.yVh = true;
      this.SVh = FbFailureStateTrigger_1.FbFailureStateTrigger.Create(this.FbDataInternal.failureState());
    }
    return this.SVh;
  }
}
exports.FbEntityGroupComponent = FbEntityGroupComponent;
//# sourceMappingURL=FbEntityGroupComponent.js.map
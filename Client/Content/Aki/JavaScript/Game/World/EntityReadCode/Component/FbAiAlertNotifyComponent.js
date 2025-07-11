"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAiAlertNotifyComponent = undefined;
const FbExtraAiAlert_1 = require("./FbExtraAiAlert");
class FbAiAlertNotifyComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.N7h = false;
    this.V7h = undefined;
    this.oxh = false;
    this.nxh = undefined;
    this.j7h = false;
    this.H7h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbAiAlertNotifyComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get ExtraAiAlert() {
    if (!this.N7h) {
      this.N7h = true;
      this.V7h = FbExtraAiAlert_1.FbExtraAiAlert.Create(this.FbDataInternal.extraAiAlert());
    }
    return this.V7h;
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
  get AlertSound() {
    if (!this.j7h) {
      this.j7h = true;
      this.H7h = this.FbDataInternal.alertSound();
    }
    return this.H7h;
  }
}
exports.FbAiAlertNotifyComponent = FbAiAlertNotifyComponent;
//# sourceMappingURL=FbAiAlertNotifyComponent.js.map
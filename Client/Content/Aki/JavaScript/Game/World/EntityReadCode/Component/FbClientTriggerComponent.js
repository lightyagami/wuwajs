"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbClientTriggerComponent = undefined;
const FbTriggeredConfig_1 = require("./FbTriggeredConfig");
const FbTriggerMatchConfig_1 = require("./FbTriggerMatchConfig");
class FbClientTriggerComponent {
  constructor(i) {
    this.FbDataInternal = i;
    this.q_h = false;
    this.k_h = false;
    this.Y$h = false;
    this.z$h = undefined;
    this.J$h = false;
    this.Z$h = undefined;
    this.eXh = false;
    this.tXh = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbClientTriggerComponent(i);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get TriggerMatch() {
    if (!this.Y$h) {
      this.Y$h = true;
      this.z$h = FbTriggerMatchConfig_1.FbTriggerMatchConfig.Create(this.FbDataInternal.triggerMatch());
    }
    return this.z$h;
  }
  get OnTriggerEnter() {
    if (!this.J$h) {
      this.J$h = true;
      this.Z$h = FbTriggeredConfig_1.FbTriggeredConfig.Create(this.FbDataInternal.onTriggerEnter());
    }
    return this.Z$h;
  }
  get OnTriggerExit() {
    if (!this.eXh) {
      this.eXh = true;
      this.tXh = FbTriggeredConfig_1.FbTriggeredConfig.Create(this.FbDataInternal.onTriggerExit());
    }
    return this.tXh;
  }
}
exports.FbClientTriggerComponent = FbClientTriggerComponent;
//# sourceMappingURL=FbClientTriggerComponent.js.map
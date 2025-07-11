"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInteractAudioComponent = undefined;
const FbAudioEventConfig_1 = require("./FbAudioEventConfig");
class FbInteractAudioComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.V5h = false;
    this.j5h = undefined;
    this.H5h = false;
    this.W5h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbInteractAudioComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get CollisionMaterial() {
    if (!this.V5h) {
      this.V5h = true;
      this.j5h = this.FbDataInternal.collisionMaterial();
    }
    return this.j5h;
  }
  get InteractEventConfig() {
    if (!this.H5h) {
      this.H5h = true;
      this.W5h = FbAudioEventConfig_1.FbAudioEventConfig.Create(this.FbDataInternal.interactEventConfig());
    }
    return this.W5h;
  }
}
exports.FbInteractAudioComponent = FbInteractAudioComponent;
//# sourceMappingURL=FbInteractAudioComponent.js.map
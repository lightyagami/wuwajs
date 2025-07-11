"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBuffConsumerComponent = undefined;
class FbBuffConsumerComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.I5h = false;
    this.T5h = 0;
    this.p0h = false;
    this.nXs = 0;
    this.A5h = false;
    this.x5h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbBuffConsumerComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get BuffId() {
    if (!this.I5h) {
      this.I5h = true;
      this.T5h = Number(this.FbDataInternal.buffId());
    }
    return this.T5h;
  }
  get BulletId() {
    if (!this.p0h) {
      this.p0h = true;
      this.nXs = Number(this.FbDataInternal.bulletId());
    }
    return this.nXs;
  }
  get ProducerEntityId() {
    if (!this.A5h) {
      this.A5h = true;
      this.x5h = this.FbDataInternal.producerEntityId();
    }
    return this.x5h;
  }
}
exports.FbBuffConsumerComponent = FbBuffConsumerComponent;
//# sourceMappingURL=FbBuffConsumerComponent.js.map
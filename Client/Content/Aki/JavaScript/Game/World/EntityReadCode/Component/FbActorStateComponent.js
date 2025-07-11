"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbActorStateComponent = undefined;
class FbActorStateComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.wAh = false;
    this.PAh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbActorStateComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get InitState() {
    if (!this.wAh) {
      this.wAh = true;
      this.PAh = this.FbDataInternal.initState();
    }
    return this.PAh;
  }
}
exports.FbActorStateComponent = FbActorStateComponent;
//# sourceMappingURL=FbActorStateComponent.js.map
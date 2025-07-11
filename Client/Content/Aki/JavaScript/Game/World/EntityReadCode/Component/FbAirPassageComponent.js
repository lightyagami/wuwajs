"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAirPassageComponent = undefined;
class FbAirPassageComponent {
  constructor(s) {
    this.FbDataInternal = s;
    this.q_h = false;
    this.k_h = false;
  }
  static Create(s) {
    if (s) {
      return new FbAirPassageComponent(s);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
}
exports.FbAirPassageComponent = FbAirPassageComponent;
//# sourceMappingURL=FbAirPassageComponent.js.map
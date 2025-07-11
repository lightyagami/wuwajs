"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTreasureBoxComponent = undefined;
class FbTreasureBoxComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.fkh = false;
    this.pkh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbTreasureBoxComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get TypeId() {
    if (!this.fkh) {
      this.fkh = true;
      this.pkh = this.FbDataInternal.typeId();
    }
    return this.pkh;
  }
}
exports.FbTreasureBoxComponent = FbTreasureBoxComponent;
//# sourceMappingURL=FbTreasureBoxComponent.js.map
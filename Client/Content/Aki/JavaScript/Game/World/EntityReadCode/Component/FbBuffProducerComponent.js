"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBuffProducerComponent = undefined;
const UnionAddBuffModeHelper_1 = require("./UnionAddBuffModeHelper");
class FbBuffProducerComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.M5h = false;
    this.E5h = undefined;
    this.I5h = false;
    this.T5h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbBuffProducerComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get AddBuffMode() {
    var t;
    var e;
    if (!this.M5h && (this.M5h = true, t = this.FbDataInternal.addBuffModeType(), e = UnionAddBuffModeHelper_1.UnionAddBuffModeHelper.GetUnionAddBuffModeObject(t))) {
      this.E5h = UnionAddBuffModeHelper_1.UnionAddBuffModeHelper.ReadUnionAddBuffMode(t, this.FbDataInternal.addBuffMode(e));
    }
    return this.E5h;
  }
  get BuffId() {
    if (!this.I5h) {
      this.I5h = true;
      this.T5h = Number(this.FbDataInternal.buffId());
    }
    return this.T5h;
  }
}
exports.FbBuffProducerComponent = FbBuffProducerComponent;
//# sourceMappingURL=FbBuffProducerComponent.js.map
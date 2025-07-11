"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPickInteractComponent = undefined;
const UnionPickInteractionHelper_1 = require("./UnionPickInteractionHelper");
class FbPickInteractComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.F$h = false;
    this.N$h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPickInteractComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get PickInteractType() {
    var t;
    var e;
    if (!this.F$h && (this.F$h = true, t = this.FbDataInternal.pickInteractTypeType(), e = UnionPickInteractionHelper_1.UnionPickInteractionHelper.GetUnionPickInteractionObject(t))) {
      this.N$h = UnionPickInteractionHelper_1.UnionPickInteractionHelper.ReadUnionPickInteraction(t, this.FbDataInternal.pickInteractType(e));
    }
    return this.N$h;
  }
}
exports.FbPickInteractComponent = FbPickInteractComponent;
//# sourceMappingURL=FbPickInteractComponent.js.map
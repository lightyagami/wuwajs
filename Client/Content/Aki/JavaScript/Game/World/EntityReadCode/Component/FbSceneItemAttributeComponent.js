"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSceneItemAttributeComponent = undefined;
class FbSceneItemAttributeComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.oDh = false;
    this.nDh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSceneItemAttributeComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get AttributeType() {
    if (!this.oDh) {
      this.oDh = true;
      this.nDh = this.FbDataInternal.attributeType();
    }
    return this.nDh;
  }
}
exports.FbSceneItemAttributeComponent = FbSceneItemAttributeComponent;
//# sourceMappingURL=FbSceneItemAttributeComponent.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMeshAnimalModel = undefined;
class FbMeshAnimalModel {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.IKh = false;
    this.TKh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbMeshAnimalModel(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Mesh() {
    if (!this.IKh) {
      this.IKh = true;
      this.TKh = this.FbDataInternal.mesh();
    }
    return this.TKh;
  }
}
exports.FbMeshAnimalModel = FbMeshAnimalModel;
//# sourceMappingURL=FbMeshAnimalModel.js.map
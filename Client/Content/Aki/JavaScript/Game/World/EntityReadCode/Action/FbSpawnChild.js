"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSpawnChild = undefined;
const FbTransform_1 = require("./FbTransform");
class FbSpawnChild {
  constructor(t) {
    this.FbDataInternal = t;
    this.Iph = false;
    this.Tph = undefined;
    this.bph = false;
    this.Lph = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSpawnChild(t);
    }
  }
  get TemplateGuid() {
    if (!this.Iph) {
      this.Iph = true;
      this.Tph = this.FbDataInternal.templateGuid();
    }
    return this.Tph;
  }
  get Transform() {
    if (!this.bph) {
      this.bph = true;
      this.Lph = FbTransform_1.FbTransform.Create(this.FbDataInternal.transform());
    }
    return this.Lph;
  }
}
exports.FbSpawnChild = FbSpawnChild;
//# sourceMappingURL=FbSpawnChild.js.map
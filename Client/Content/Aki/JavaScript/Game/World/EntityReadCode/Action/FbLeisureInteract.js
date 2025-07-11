"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLeisureInteract = undefined;
const UnionLeisureInteractOptionHelper_1 = require("./UnionLeisureInteractOptionHelper");
class FbLeisureInteract {
  constructor(t) {
    this.FbDataInternal = t;
    this.s_h = false;
    this.Hye = undefined;
    this.fec = false;
    this.gec = 0;
  }
  static Create(t) {
    if (t) {
      return new FbLeisureInteract(t);
    }
  }
  get Option() {
    var t;
    var e;
    if (!this.s_h && (this.s_h = true, t = this.FbDataInternal.optionType(), e = UnionLeisureInteractOptionHelper_1.UnionLeisureInteractOptionHelper.GetUnionLeisureInteractOptionObject(t))) {
      this.Hye = UnionLeisureInteractOptionHelper_1.UnionLeisureInteractOptionHelper.ReadUnionLeisureInteractOption(t, this.FbDataInternal.option(e));
    }
    return this.Hye;
  }
  get SceneEntity() {
    if (!this.fec) {
      this.fec = true;
      this.gec = this.FbDataInternal.sceneEntity();
    }
    return this.gec;
  }
}
exports.FbLeisureInteract = FbLeisureInteract;
//# sourceMappingURL=FbLeisureInteract.js.map
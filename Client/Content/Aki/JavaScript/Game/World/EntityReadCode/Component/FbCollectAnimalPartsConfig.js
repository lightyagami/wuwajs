"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCollectAnimalPartsConfig = undefined;
class FbCollectAnimalPartsConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.A8h = false;
    this.x8h = undefined;
    this.R8h = false;
    this.w8h = undefined;
    this.P8h = false;
    this.U8h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCollectAnimalPartsConfig(t);
    }
  }
  get Slot() {
    if (!this.A8h) {
      this.A8h = true;
      this.x8h = this.FbDataInternal.slot();
    }
    return this.x8h;
  }
  get Skeleton() {
    if (!this.R8h) {
      this.R8h = true;
      this.w8h = this.FbDataInternal.skeleton();
    }
    return this.w8h;
  }
  get CollectEntity() {
    if (!this.P8h) {
      this.P8h = true;
      this.U8h = this.FbDataInternal.collectEntity();
    }
    return this.U8h;
  }
}
exports.FbCollectAnimalPartsConfig = FbCollectAnimalPartsConfig;
//# sourceMappingURL=FbCollectAnimalPartsConfig.js.map
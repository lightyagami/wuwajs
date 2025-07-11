"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCollectAnimalConfig = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbCollectAnimalPartsConfig_1 = require("./FbCollectAnimalPartsConfig");
class FbCollectAnimalConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.b8h = false;
    this.L8h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCollectAnimalConfig(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get PartsMap() {
    if (!this.b8h) {
      this.b8h = true;
      this.L8h = new Array();
      var i = this.FbDataInternal.partsMapLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.partsMap(t, new fb_component_1.CollectAnimalPartsConfig());
          this.L8h.push(FbCollectAnimalPartsConfig_1.FbCollectAnimalPartsConfig.Create(e));
        }
      }
    }
    return this.L8h;
  }
}
exports.FbCollectAnimalConfig = FbCollectAnimalConfig;
//# sourceMappingURL=FbCollectAnimalConfig.js.map
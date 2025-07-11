"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPointGroupByLayer = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbParkourPointLayerConfig_1 = require("./FbParkourPointLayerConfig");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPointGroupByLayer {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._9h = false;
    this.c9h = undefined;
    this.F9h = false;
    this.N9h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPointGroupByLayer(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Space() {
    if (!this._9h) {
      this._9h = true;
      this.c9h = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.space());
    }
    return this.c9h;
  }
  get Layers() {
    if (!this.F9h) {
      this.F9h = true;
      this.N9h = new Array();
      var r = this.FbDataInternal.layersLength();
      if (r) {
        for (let t = 0; t < r; ++t) {
          var i = this.FbDataInternal.layers(t, new fb_component_1.ParkourPointLayerConfig());
          this.N9h.push(FbParkourPointLayerConfig_1.FbParkourPointLayerConfig.Create(i));
        }
      }
    }
    return this.N9h;
  }
}
exports.FbPointGroupByLayer = FbPointGroupByLayer;
//# sourceMappingURL=FbPointGroupByLayer.js.map
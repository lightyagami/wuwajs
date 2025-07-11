"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSwitchDataLayers = undefined;
class FbSwitchDataLayers {
  constructor(t) {
    this.FbDataInternal = t;
    this.YTh = false;
    this.zTh = undefined;
    this.JTh = false;
    this.ZTh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSwitchDataLayers(t);
    }
  }
  get LoadDataLayers() {
    if (!this.YTh) {
      this.YTh = true;
      this.zTh = new Array();
      var s = this.FbDataInternal.loadDataLayersLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.zTh.push(this.FbDataInternal.loadDataLayers(t));
        }
      }
    }
    return this.zTh;
  }
  get UnloadDataLayers() {
    if (!this.JTh) {
      this.JTh = true;
      this.ZTh = new Array();
      var s = this.FbDataInternal.unloadDataLayersLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.ZTh.push(this.FbDataInternal.unloadDataLayers(t));
        }
      }
    }
    return this.ZTh;
  }
}
exports.FbSwitchDataLayers = FbSwitchDataLayers;
//# sourceMappingURL=FbSwitchDataLayers.js.map
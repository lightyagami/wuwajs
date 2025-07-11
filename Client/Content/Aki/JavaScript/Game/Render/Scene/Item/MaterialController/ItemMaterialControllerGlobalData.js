"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
class ItemMaterialControllerGlobalData extends UE.PrimaryDataAsset {
  constructor() {
    super(...arguments);
    this.StartTime = -0;
    this.LoopTime = -0;
    this.EndTime = -0;
    this.EnableBaseColorScale = false;
    this.BaseColorScale = undefined;
    this.EnableAddEmissionColor = false;
    this.AddEmissionColor = undefined;
    this.EnableRimLight = false;
    this.AddRimLightColor = undefined;
    this.RimWidth = undefined;
    this.RimPower = undefined;
    this.RimMix = undefined;
    this.EnableScanningOutline = false;
    this.ScanningOutlineColor = undefined;
    this.ScanningOutlineWidth = undefined;
    this.ScanningOutlineTexScaleOffset = undefined;
    this.ScanningBrokenTexScaleOffset = undefined;
  }
  Constructor() {}
}
exports.default = ItemMaterialControllerGlobalData;
//# sourceMappingURL=ItemMaterialControllerGlobalData.js.map
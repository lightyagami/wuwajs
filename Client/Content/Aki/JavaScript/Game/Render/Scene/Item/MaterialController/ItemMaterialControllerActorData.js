"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
class ItemMaterialControllerActorData extends UE.PrimaryDataAsset {
  constructor() {
    super(...arguments);
    this.StartTime = -0;
    this.LoopTime = -0;
    this.EndTime = -0;
    this.EnableBaseColorScale = false;
    this.BaseColorScale = undefined;
    this.EnableAddEmissionColor = false;
    this.AddEmissionColor = undefined;
    this.EnableEmissionChange = false;
    this.EmissionLightColorChangeProgress = undefined;
    this.EmissionLightColorChangeStrength = undefined;
    this.EmissionLightColorChangeColor = undefined;
    this.EnableRimLight = false;
    this.RimLightColor = undefined;
    this.RimPower = undefined;
    this.EnableDissolve = false;
    this.DissolveProgress = undefined;
    this.DissolveAdjustment = undefined;
    this.DissolveEdageWidth = undefined;
    this.DissolveEdageColor = undefined;
    this.DissolveEdageStrength = undefined;
    this.DissolveTexSpeed = undefined;
    this.DissolveUv = 0;
    this.DissolveTexScaleOffset = undefined;
    this.EnableScanning = false;
    this.ScanningOutlineMixNoiseStrength = undefined;
    this.ScanningOutlineStrength = undefined;
    this.ScanningOutlineTexScaleOffset = undefined;
    this.ScanningOutlineColor = undefined;
    this.VertexAnimTimeDebug = undefined;
    this.VertexAnimFrame = undefined;
    this.PivotPainterTransform = undefined;
    this.FloatingThreshold = undefined;
    this.EnablePivotPainterWorldPositionOffset = false;
    this.EnableWorldPositionOffset = false;
    this.DisableFoliageEffect = false;
    this.EnableFoliageEffect = false;
    this.RimLightColorSpecil = undefined;
    this.UseRimlightColorSpecil = false;
    this.RimlightColorStrength = undefined;
    this.UseEmissionTex = false;
    this.EmissionTexStrength = undefined;
    this.WorldPositionOffsetNormal = undefined;
    this.WorldPositionOffsetOffset = undefined;
    this.SimpleUspeed = undefined;
    this.SimpleVspeed = undefined;
    this.SimpleUseFlow = undefined;
    this.EnableQuanXiPinTu = false;
    this.TransparencyQuanXiPinTu = undefined;
    this.TransparentColorQuanXiPinTu = undefined;
    this.OpaqueColorQuanXiPinTu = undefined;
    this.EnableQuanXiFengSuo = false;
    this.TransparencyQuanXiFengSuo = undefined;
    this.TransparentColorQuanXiFengSuo = undefined;
    this.CustomScalarParMap = undefined;
    this.CustomColorParMap = undefined;
  }
  Constructor() {}
}
exports.default = ItemMaterialControllerActorData;
//# sourceMappingURL=ItemMaterialControllerActorData.js.map
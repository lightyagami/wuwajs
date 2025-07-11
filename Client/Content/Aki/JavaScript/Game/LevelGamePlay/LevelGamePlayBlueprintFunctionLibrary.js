"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const SceneInteractionManager_1 = require("../Render/Scene/Interaction/SceneInteractionManager");
class LevelGamePlayBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static ApplyScanEffect(e, r) {
    return ControllerHolder_1.ControllerHolder.LevelGamePlayController.HandleScanResponse(e, r);
  }
  static ClearAllScanEffects() {
    ControllerHolder_1.ControllerHolder.LevelGamePlayController.HandleClearAllScanEffect();
  }
  static SceneInteractionBind(e, r, t) {
    SceneInteractionManager_1.SceneInteractionManager.Get().EmitActor(e, r, t);
  }
  static GetScanMaxDistance() {
    return ConfigManager_1.ConfigManager.LevelGamePlayConfig?.ScanMaxDistance ?? 0;
  }
  static GetScanInteractionEffectMaxDistance() {
    return ConfigManager_1.ConfigManager.LevelGamePlayConfig?.ScanShowInteractionEffectMaxDistance ?? 0;
  }
  static GetPolygonListFromSplines(e) {
    var r = UE.NewArray(UE.KuroGeometrySimplePolygon);
    var t = (0, puerts_1.$unref)(e);
    for (let e = 0; e < t.Num(); e++) {
      var n;
      var a;
      var i = t.Get(e);
      if (i?.IsValid()) {
        n = new UE.KuroGeometrySimplePolygon();
        n = (0, puerts_1.$ref)(n);
        (a = new UE.KuroSplineSamplingOptions()).SampleSpacing = 3;
        UE.KuroSimplePolygonLibrary.SampleSplineToPolygon(i, n, a);
        i = (0, puerts_1.$unref)(n);
        r.Add(i);
      }
    }
    return UE.KuroPolygonListLibrary.CreatePolygonListFromSimplePolygons(r);
  }
  static PolygonsOpenPathsDifferenceViaSplines(e, r, t, n, a) {
    e = LevelGamePlayBlueprintFunctionLibrary.GetPolygonListFromSplines(e);
    r = LevelGamePlayBlueprintFunctionLibrary.GetPolygonListFromSplines(r);
    return UE.KuroPolygonListLibrary.PolygonsOpenPathsDifference(e, r, t, n, a);
  }
  static DifferenceSelectedActorsSplines() {
    var r = UE.VRScoutingInteractor.GetSelectedActors();
    var t = UE.NewArray(UE.SplineComponent);
    var n = UE.NewArray(UE.SplineComponent);
    for (let e = 0; e < r.Num(); e++) {
      var a = r.Get(e);
      if (a?.IsValid()) {
        a = a.GetComponentByClass(UE.SplineComponent.StaticClass());
        (e === 0 ? t : n).Add(a);
      }
    }
    return LevelGamePlayBlueprintFunctionLibrary.PolygonsOpenPathsDifferenceViaSplines((0, puerts_1.$ref)(t), (0, puerts_1.$ref)(n), 3, 1, 1);
  }
}
exports.default = LevelGamePlayBlueprintFunctionLibrary;
//# sourceMappingURL=LevelGamePlayBlueprintFunctionLibrary.js.map
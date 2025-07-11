"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetupSeqCamera = undefined;
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetupSeqCamera extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    var l;
    var a;
    if (e && ModelManager_1.ModelManager.CameraModel.CameraMode === 1 && (e = e, a = (l = ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.GetComponent(9).CineCamera).CameraComponent, ObjectUtils_1.ObjectUtils.IsValid(l)) && (l.D_K2_SetActorTransform(e.Transform.ToUeTransform(), false, undefined, false), e.Aperture && (a.CurrentAperture = e.Aperture), e.FocalLength && (a.CurrentFocalLength = e.FocalLength), e.FocusDistance)) {
      a.FocusSettings.ManualFocusDistance = e.FocusDistance;
    }
  }
}
exports.LevelEventSetupSeqCamera = LevelEventSetupSeqCamera;
//# sourceMappingURL=LevelEventSetupSeqCamera.js.map
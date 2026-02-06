"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTaskDetectionMaterial = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SkipTask_1 = require("./SkipTask");
class SkipTaskDetectionMaterial extends SkipTask_1.SkipTask {
  OnRun(e) {
    ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(true);
    ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(Protocol_1.Aki.Protocol.r8n.Proto_Material, [], e);
  }
}
exports.SkipTaskDetectionMaterial = SkipTaskDetectionMaterial;
//# sourceMappingURL=SkipTaskDetectionMaterial.js.map
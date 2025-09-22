"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraTargetTypeNpc = undefined;
const UE = require("ue");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiCameraTargetTypeBase_1 = require("./UiCameraTargetTypeBase");
class UiCameraTargetTypeNpc extends UiCameraTargetTypeBase_1.UiCameraTargetTypeBase {
  GetTargetActor() {
    return ModelManager_1.ModelManager.InteractionModel.CurrentInteractUeActor;
  }
  GetTargetBodyKey() {
    var e = ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
    var e = EntitySystem_1.EntitySystem.Get(e);
    if (e?.Valid) {
      switch (e.GetComponent(0).GetModelConfig().体型类型) {
        case 0:
          return;
        case 6:
          return "FemaleM";
        case 5:
          return "FemaleMS";
        case 4:
          return "FemaleS";
        case 7:
          return "FemaleXL";
        case 2:
          return "MaleM";
        case 1:
          return "MaleS";
        case 3:
          return "MaleXL";
        case 8:
          return "ShopHand";
        case 9:
          return "ShopStore";
        case 10:
          return "ShopDoll";
        case 11:
          return "ShopPhonograph";
        case 12:
          return "ShopPicture";
        default:
          return;
      }
    }
  }
  GetTargetSkeletalMesh() {
    var e = ModelManager_1.ModelManager.InteractionModel.CurrentInteractUeActor;
    if (e) {
      return e.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
    }
  }
}
exports.UiCameraTargetTypeNpc = UiCameraTargetTypeNpc;
//# sourceMappingURL=UiCameraTargetTypeNpc.js.map
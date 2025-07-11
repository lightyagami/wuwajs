"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkeletalMeshComponentPool = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const MeshComponentUtils_1 = require("./MeshComponentUtils");
const SceneComponentPool_1 = require("./SceneComponentPool");
class SkeletalMeshComponentPool extends SceneComponentPool_1.SceneComponentPool {
  ActiveComponent(e) {
    e.SetHiddenInGame(false);
    e.SetComponentTickEnabled(true);
  }
  CleanComponent(e) {
    e.SetSkeletalMesh(undefined);
    e.SetAnimClass(undefined);
    e.SetHiddenInGame(true);
    e.SetComponentTickEnabled(false);
  }
  CreateComponent() {
    var e;
    if (this.CheckPoolRange()) {
      e = this.ActorInternal.AddComponentByClass(UE.SkeletalMeshComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
      MeshComponentUtils_1.MeshComponentUtils.RelativeAttachComponentOnSafe(e, this.AttachComponentInternal);
      return e;
    }
  }
}
exports.SkeletalMeshComponentPool = SkeletalMeshComponentPool;
//# sourceMappingURL=SkeletalMeshComponentPool.js.map
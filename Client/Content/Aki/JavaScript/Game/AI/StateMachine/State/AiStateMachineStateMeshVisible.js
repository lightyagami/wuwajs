"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineStateMeshVisible = undefined;
const UE = require("ue");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateMeshVisible extends AiStateMachineState_1.AiStateMachineState {
  constructor() {
    super(...arguments);
    this.Tag = undefined;
    this.Visible = false;
    this.PropagateToChildren = false;
    this.MeshComponentsCache = undefined;
  }
  OnInit(t) {
    this.Tag = new UE.FName(t.BindMeshVisible.Tag);
    this.Visible = t.BindMeshVisible.Visible;
    this.PropagateToChildren = t.BindMeshVisible.PropagateToChildren;
    return true;
  }
  xne() {
    var t;
    if (!this.MeshComponentsCache) {
      t = this.Node.ActorComponent.Actor.GetComponentsByTag(UE.SkeletalMeshComponent.StaticClass(), this.Tag);
      this.MeshComponentsCache = (0, ObjectUtils_1.ueArrayToArray)(t);
    }
  }
  OnActivate(t, i) {
    this.xne();
    if (this.MeshComponentsCache) {
      for (const e of this.MeshComponentsCache) {
        e.SetHiddenInGame(!this.Visible, this.PropagateToChildren);
      }
    }
  }
  OnDeactivate(t, i) {
    if (!this.Node.TagComponent.HasTag(1008164187) && (this.xne(), this.MeshComponentsCache)) {
      for (const e of this.MeshComponentsCache) {
        e.SetHiddenInGame(this.Visible, this.PropagateToChildren);
      }
    }
  }
  ToString(t, i = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, i);
  }
}
exports.AiStateMachineStateMeshVisible = AiStateMachineStateMeshVisible;
//# sourceMappingURL=AiStateMachineStateMeshVisible.js.map
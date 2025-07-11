"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSceneActorRefComponent = undefined;
const fb_actor_1 = require("../../../../Game/World/EntityFb/fb-actor");
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbActorRef_1 = require("../Actor/FbActorRef");
const FbSceneActorRefGroup_1 = require("./FbSceneActorRefGroup");
class FbSceneActorRefComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.r7h = false;
    this.o7h = undefined;
    this.n7h = false;
    this.s7h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSceneActorRefComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get ActorRefGroups() {
    if (!this.r7h) {
      this.r7h = true;
      this.o7h = new Array();
      var e = this.FbDataInternal.actorRefGroupsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var r = this.FbDataInternal.actorRefGroups(t, new fb_component_1.SceneActorRefGroup());
          this.o7h.push(FbSceneActorRefGroup_1.FbSceneActorRefGroup.Create(r));
        }
      }
    }
    return this.o7h;
  }
  get VolumesRef() {
    if (!this.n7h) {
      this.n7h = true;
      this.s7h = new Array();
      var e = this.FbDataInternal.volumesRefLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var r = this.FbDataInternal.volumesRef(t, new fb_actor_1.ActorRef());
          this.s7h.push(FbActorRef_1.FbActorRef.Create(r));
        }
      }
    }
    return this.s7h;
  }
}
exports.FbSceneActorRefComponent = FbSceneActorRefComponent;
//# sourceMappingURL=FbSceneActorRefComponent.js.map
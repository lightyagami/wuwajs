"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPortalRenderConfig = undefined;
const fb_actor_1 = require("../../../../Game/World/EntityFb/fb-actor");
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbActorRef_1 = require("../Actor/FbActorRef");
const FbRenderFlag_1 = require("./FbRenderFlag");
const UnionPortalViewDistanceConfigHelper_1 = require("./UnionPortalViewDistanceConfigHelper");
class FbPortalRenderConfig {
  constructor(e) {
    this.FbDataInternal = e;
    this.GKh = false;
    this.OKh = undefined;
    this.FKh = false;
    this.NKh = undefined;
    this.VKh = false;
    this.jKh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbPortalRenderConfig(e);
    }
  }
  get ViewDistance() {
    var e;
    var t;
    if (!this.GKh && (this.GKh = true, e = this.FbDataInternal.viewDistanceType(), t = UnionPortalViewDistanceConfigHelper_1.UnionPortalViewDistanceConfigHelper.GetUnionPortalViewDistanceConfigObject(e))) {
      this.OKh = UnionPortalViewDistanceConfigHelper_1.UnionPortalViewDistanceConfigHelper.ReadUnionPortalViewDistanceConfig(e, this.FbDataInternal.viewDistance(t));
    }
    return this.OKh;
  }
  get ForceRenderActors() {
    if (!this.FKh) {
      this.FKh = true;
      this.NKh = new Array();
      var t = this.FbDataInternal.forceRenderActorsLength();
      if (t) {
        for (let e = 0; e < t; ++e) {
          var i = this.FbDataInternal.forceRenderActors(e, new fb_actor_1.ActorRef());
          this.NKh.push(FbActorRef_1.FbActorRef.Create(i));
        }
      }
    }
    return this.NKh;
  }
  get SetRenderFlags() {
    if (!this.VKh) {
      this.VKh = true;
      this.jKh = new Array();
      var t = this.FbDataInternal.setRenderFlagsLength();
      if (t) {
        for (let e = 0; e < t; ++e) {
          var i = this.FbDataInternal.setRenderFlags(e, new fb_component_1.RenderFlag());
          this.jKh.push(FbRenderFlag_1.FbRenderFlag.Create(i));
        }
      }
    }
    return this.jKh;
  }
}
exports.FbPortalRenderConfig = FbPortalRenderConfig;
//# sourceMappingURL=FbPortalRenderConfig.js.map
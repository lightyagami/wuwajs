"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeActorMaterialData = undefined;
const fb_actor_1 = require("../../../../Game/World/EntityFb/fb-actor");
const FbActorRef_1 = require("../Actor/FbActorRef");
class FbChangeActorMaterialData {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.DLh = false;
    this.BLh = undefined;
    this.PLh = false;
    this.ULh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbChangeActorMaterialData(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MaterialData() {
    if (!this.DLh) {
      this.DLh = true;
      this.BLh = this.FbDataInternal.materialData();
    }
    return this.BLh;
  }
  get ActorRefs() {
    if (!this.PLh) {
      this.PLh = true;
      this.ULh = new Array();
      var i = this.FbDataInternal.actorRefsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var r = this.FbDataInternal.actorRefs(t, new fb_actor_1.ActorRef());
          this.ULh.push(FbActorRef_1.FbActorRef.Create(r));
        }
      }
    }
    return this.ULh;
  }
}
exports.FbChangeActorMaterialData = FbChangeActorMaterialData;
//# sourceMappingURL=FbChangeActorMaterialData.js.map
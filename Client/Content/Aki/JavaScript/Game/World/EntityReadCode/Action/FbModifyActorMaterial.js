"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbModifyActorMaterial = undefined;
const fb_actor_1 = require("../../../../Game/World/EntityFb/fb-actor");
const UnionModifyActorMaterialTypeHelper_1 = require("./UnionModifyActorMaterialTypeHelper");
const FbActorRef_1 = require("../Actor/FbActorRef");
class FbModifyActorMaterial {
  constructor(t) {
    this.FbDataInternal = t;
    this.PLh = false;
    this.ULh = undefined;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbModifyActorMaterial(t);
    }
  }
  get ActorRefs() {
    if (!this.PLh) {
      this.PLh = true;
      this.ULh = new Array();
      var r = this.FbDataInternal.actorRefsLength();
      if (r) {
        for (let t = 0; t < r; ++t) {
          var e = this.FbDataInternal.actorRefs(t, new fb_actor_1.ActorRef());
          this.ULh.push(FbActorRef_1.FbActorRef.Create(e));
        }
      }
    }
    return this.ULh;
  }
  get Config() {
    var t;
    var r;
    if (!this.bSh && (this.bSh = true, t = this.FbDataInternal.configType(), r = UnionModifyActorMaterialTypeHelper_1.UnionModifyActorMaterialTypeHelper.GetUnionModifyActorMaterialTypeObject(t))) {
      this.TAe = UnionModifyActorMaterialTypeHelper_1.UnionModifyActorMaterialTypeHelper.ReadUnionModifyActorMaterialType(t, this.FbDataInternal.config(r));
    }
    return this.TAe;
  }
}
exports.FbModifyActorMaterial = FbModifyActorMaterial;
//# sourceMappingURL=FbModifyActorMaterial.js.map
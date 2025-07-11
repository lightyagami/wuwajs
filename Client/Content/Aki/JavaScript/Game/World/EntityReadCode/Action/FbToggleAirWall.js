"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbToggleAirWall = undefined;
const fb_actor_1 = require("../../../../Game/World/EntityFb/fb-actor");
const UnionToggleAirWallHelper_1 = require("./UnionToggleAirWallHelper");
const FbActorRef_1 = require("../Actor/FbActorRef");
class FbToggleAirWall {
  constructor(t) {
    this.FbDataInternal = t;
    this.s_h = false;
    this.Hye = undefined;
    this.PLh = false;
    this.ULh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbToggleAirWall(t);
    }
  }
  get Option() {
    var t;
    var e;
    if (!this.s_h && (this.s_h = true, t = this.FbDataInternal.optionType(), e = UnionToggleAirWallHelper_1.UnionToggleAirWallHelper.GetUnionToggleAirWallObject(t))) {
      this.Hye = UnionToggleAirWallHelper_1.UnionToggleAirWallHelper.ReadUnionToggleAirWall(t, this.FbDataInternal.option(e));
    }
    return this.Hye;
  }
  get ActorRefs() {
    if (!this.PLh) {
      this.PLh = true;
      this.ULh = new Array();
      var e = this.FbDataInternal.actorRefsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var r = this.FbDataInternal.actorRefs(t, new fb_actor_1.ActorRef());
          this.ULh.push(FbActorRef_1.FbActorRef.Create(r));
        }
      }
    }
    return this.ULh;
  }
}
exports.FbToggleAirWall = FbToggleAirWall;
//# sourceMappingURL=FbToggleAirWall.js.map
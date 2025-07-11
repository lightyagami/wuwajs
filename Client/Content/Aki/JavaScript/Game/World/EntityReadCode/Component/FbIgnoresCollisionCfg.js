"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbIgnoresCollisionCfg = undefined;
const fb_actor_1 = require("../../../../Game/World/EntityFb/fb-actor");
const FbActorRef_1 = require("../Actor/FbActorRef");
class FbIgnoresCollisionCfg {
  constructor(t) {
    this.FbDataInternal = t;
    this.QWh = false;
    this.KWh = undefined;
    this.$Wh = false;
    this.XWh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbIgnoresCollisionCfg(t);
    }
  }
  get IgnoreEntitys() {
    if (!this.QWh) {
      this.QWh = true;
      this.KWh = new Array();
      var r = this.FbDataInternal.ignoreEntitysLength();
      if (r) {
        for (let t = 0; t < r; ++t) {
          this.KWh.push(this.FbDataInternal.ignoreEntitys(t));
        }
      }
    }
    return this.KWh;
  }
  get IgnoreActors() {
    if (!this.$Wh) {
      this.$Wh = true;
      this.XWh = new Array();
      var r = this.FbDataInternal.ignoreActorsLength();
      if (r) {
        for (let t = 0; t < r; ++t) {
          var i = this.FbDataInternal.ignoreActors(t, new fb_actor_1.ActorRef());
          this.XWh.push(FbActorRef_1.FbActorRef.Create(i));
        }
      }
    }
    return this.XWh;
  }
}
exports.FbIgnoresCollisionCfg = FbIgnoresCollisionCfg;
//# sourceMappingURL=FbIgnoresCollisionCfg.js.map
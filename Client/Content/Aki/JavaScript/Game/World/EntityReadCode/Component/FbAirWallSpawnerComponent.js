"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAirWallSpawnerComponent = undefined;
const fb_actor_1 = require("../../../../Game/World/EntityFb/fb-actor");
const FbActorRef_1 = require("../Actor/FbActorRef");
class FbAirWallSpawnerComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.yRh = false;
    this.SRh = 0;
    this.MRh = false;
    this.ERh = undefined;
    this.IRh = false;
    this.TRh = 0;
    this.mSh = false;
    this.CSh = 0;
    this.bRh = false;
    this.LRh = undefined;
    this.ARh = false;
    this.xRh = false;
    this.RRh = false;
    this.wRh = false;
    this.PRh = false;
    this.URh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbAirWallSpawnerComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get SplineEntity() {
    if (!this.yRh) {
      this.yRh = true;
      this.SRh = this.FbDataInternal.splineEntity();
    }
    return this.SRh;
  }
  get WallName() {
    if (!this.MRh) {
      this.MRh = true;
      this.ERh = this.FbDataInternal.wallName();
    }
    return this.ERh;
  }
  get Thickness() {
    if (!this.IRh) {
      this.IRh = true;
      this.TRh = this.FbDataInternal.thickness();
    }
    return this.TRh;
  }
  get Height() {
    if (!this.mSh) {
      this.mSh = true;
      this.CSh = this.FbDataInternal.height();
    }
    return this.CSh;
  }
  get BiasDirection() {
    if (!this.bRh) {
      this.bRh = true;
      this.LRh = this.FbDataInternal.biasDirection();
    }
    return this.LRh;
  }
  get IsExtend() {
    if (!this.ARh) {
      this.ARh = true;
      this.xRh = this.FbDataInternal.isExtend();
    }
    return this.xRh;
  }
  get HasCover() {
    if (!this.RRh) {
      this.RRh = true;
      this.wRh = this.FbDataInternal.hasCover();
    }
    return this.wRh;
  }
  get WallActorsRef() {
    if (!this.PRh) {
      this.PRh = true;
      this.URh = new Array();
      var i = this.FbDataInternal.wallActorsRefLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.wallActorsRef(t, new fb_actor_1.ActorRef());
          this.URh.push(FbActorRef_1.FbActorRef.Create(s));
        }
      }
    }
    return this.URh;
  }
}
exports.FbAirWallSpawnerComponent = FbAirWallSpawnerComponent;
//# sourceMappingURL=FbAirWallSpawnerComponent.js.map
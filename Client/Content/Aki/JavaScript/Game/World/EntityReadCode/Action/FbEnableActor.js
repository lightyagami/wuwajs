"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEnableActor = undefined;
const fb_actor_1 = require("../../../../Game/World/EntityFb/fb-actor");
const FbActorRef_1 = require("../Actor/FbActorRef");
class FbEnableActor {
  constructor(t) {
    this.FbDataInternal = t;
    this.bLh = false;
    this.LLh = undefined;
    this.ALh = false;
    this.xLh = undefined;
    this.Jch = false;
    this.l7 = false;
    this.RLh = false;
    this.wLh = false;
  }
  static Create(t) {
    if (t) {
      return new FbEnableActor(t);
    }
  }
  get ActorType() {
    if (!this.bLh) {
      this.bLh = true;
      this.LLh = this.FbDataInternal.actorType();
    }
    return this.LLh;
  }
  get Targets() {
    if (!this.ALh) {
      this.ALh = true;
      this.xLh = new Array();
      var i = this.FbDataInternal.targetsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.targets(t, new fb_actor_1.ActorRef());
          this.xLh.push(FbActorRef_1.FbActorRef.Create(s));
        }
      }
    }
    return this.xLh;
  }
  get Enable() {
    if (!this.Jch) {
      this.Jch = true;
      this.l7 = this.FbDataInternal.enable();
    }
    return this.l7;
  }
  get SyncChildActor() {
    if (!this.RLh) {
      this.RLh = true;
      this.wLh = this.FbDataInternal.syncChildActor();
    }
    return this.wLh;
  }
}
exports.FbEnableActor = FbEnableActor;
//# sourceMappingURL=FbEnableActor.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbActorCollisionTriggerShape = undefined;
const FbActorRef_1 = require("../Actor/FbActorRef");
class FbActorCollisionTriggerShape {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.L7h = false;
    this.A7h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbActorCollisionTriggerShape(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get ActorRef() {
    if (!this.L7h) {
      this.L7h = true;
      this.A7h = FbActorRef_1.FbActorRef.Create(this.FbDataInternal.actorRef());
    }
    return this.A7h;
  }
}
exports.FbActorCollisionTriggerShape = FbActorCollisionTriggerShape;
//# sourceMappingURL=FbActorCollisionTriggerShape.js.map
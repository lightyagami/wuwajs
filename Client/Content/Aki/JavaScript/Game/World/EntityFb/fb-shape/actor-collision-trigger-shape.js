"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorCollisionTriggerShape = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const actor_ref_js_1 = require("../fb-actor/actor-ref.js");
class ActorCollisionTriggerShape {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsActorCollisionTriggerShape(t, r) {
    return (r || new ActorCollisionTriggerShape()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsActorCollisionTriggerShape(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ActorCollisionTriggerShape()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  actorRef(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return (t || new actor_ref_js_1.ActorRef()).__init(this.bb.__indirect(this.bb_pos + r), this.bb);
    } else {
      return undefined;
    }
  }
  static startActorCollisionTriggerShape(t) {
    t.startObject(2);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addActorRef(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static endActorCollisionTriggerShape(t) {
    return t.endObject();
  }
}
exports.ActorCollisionTriggerShape = ActorCollisionTriggerShape;
//# sourceMappingURL=actor-collision-trigger-shape.js.map
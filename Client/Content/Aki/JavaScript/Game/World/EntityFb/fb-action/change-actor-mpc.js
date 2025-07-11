"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeActorMPC = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeActorMPC {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsChangeActorMPC(t, e) {
    return (e || new ChangeActorMPC()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsChangeActorMPC(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ChangeActorMPC()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  mpcData(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startChangeActorMPC(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addMpcData(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endChangeActorMPC(t) {
    return t.endObject();
  }
  static createChangeActorMPC(t, e, r) {
    ChangeActorMPC.startChangeActorMPC(t);
    ChangeActorMPC.addType(t, e);
    ChangeActorMPC.addMpcData(t, r);
    return ChangeActorMPC.endChangeActorMPC(t);
  }
}
exports.ChangeActorMPC = ChangeActorMPC;
//# sourceMappingURL=change-actor-mpc.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorLookAtEmptyData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorLookAtEmptyData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsActorLookAtEmptyData(t, o) {
    return (o || new ActorLookAtEmptyData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsActorLookAtEmptyData(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new ActorLookAtEmptyData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  lock() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startActorLookAtEmptyData(t) {
    t.startObject(2);
  }
  static addType(t, o) {
    t.addFieldInt8(0, o, 0);
  }
  static addLock(t, o) {
    t.addFieldInt8(1, +o, 0);
  }
  static endActorLookAtEmptyData(t) {
    return t.endObject();
  }
  static createActorLookAtEmptyData(t, o, a) {
    ActorLookAtEmptyData.startActorLookAtEmptyData(t);
    ActorLookAtEmptyData.addType(t, o);
    ActorLookAtEmptyData.addLock(t, a);
    return ActorLookAtEmptyData.endActorLookAtEmptyData(t);
  }
}
exports.ActorLookAtEmptyData = ActorLookAtEmptyData;
//# sourceMappingURL=actor-look-at-empty-data.js.map
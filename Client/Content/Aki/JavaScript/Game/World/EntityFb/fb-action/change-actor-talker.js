"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeActorTalker = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeActorTalker {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsChangeActorTalker(t, e) {
    return (e || new ChangeActorTalker()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsChangeActorTalker(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ChangeActorTalker()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  actorIndex() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  talker() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startChangeActorTalker(t) {
    t.startObject(2);
  }
  static addActorIndex(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addTalker(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endChangeActorTalker(t) {
    return t.endObject();
  }
  static createChangeActorTalker(t, e, r) {
    ChangeActorTalker.startChangeActorTalker(t);
    ChangeActorTalker.addActorIndex(t, e);
    ChangeActorTalker.addTalker(t, r);
    return ChangeActorTalker.endChangeActorTalker(t);
  }
}
exports.ChangeActorTalker = ChangeActorTalker;
//# sourceMappingURL=change-actor-talker.js.map
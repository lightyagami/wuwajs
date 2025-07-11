"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetEntityPos = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const pos_a_js_1 = require("../fb-action/pos-a.js");
class SetEntityPos {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsSetEntityPos(t, s) {
    return (s || new SetEntityPos()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetEntityPos(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new SetEntityPos()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  pos(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return (t || new pos_a_js_1.PosA()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  static startSetEntityPos(t) {
    t.startObject(2);
  }
  static addEntityId(t, s) {
    t.addFieldInt32(0, s, 0);
  }
  static addPos(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endSetEntityPos(t) {
    return t.endObject();
  }
}
exports.SetEntityPos = SetEntityPos;
//# sourceMappingURL=set-entity-pos.js.map
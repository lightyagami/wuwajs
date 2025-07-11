"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetEntityClientVisible = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetEntityClientVisible {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsSetEntityClientVisible(t, i) {
    return (i || new SetEntityClientVisible()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetEntityClientVisible(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new SetEntityClientVisible()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityIds(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + t * 4);
    } else {
      return 0;
    }
  }
  entityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  entityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  visible() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startSetEntityClientVisible(t) {
    t.startObject(2);
  }
  static addEntityIds(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static createEntityIdsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addInt32(e[t]);
    }
    return i.endVector();
  }
  static startEntityIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addVisible(t, i) {
    t.addFieldInt8(1, +i, 0);
  }
  static endSetEntityClientVisible(t) {
    return t.endObject();
  }
  static createSetEntityClientVisible(t, i, e) {
    SetEntityClientVisible.startSetEntityClientVisible(t);
    SetEntityClientVisible.addEntityIds(t, i);
    SetEntityClientVisible.addVisible(t, e);
    return SetEntityClientVisible.endSetEntityClientVisible(t);
  }
}
exports.SetEntityClientVisible = SetEntityClientVisible;
//# sourceMappingURL=set-entity-client-visible.js.map
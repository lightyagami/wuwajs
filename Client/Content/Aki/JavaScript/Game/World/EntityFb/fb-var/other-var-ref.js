"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OtherVarRef = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class OtherVarRef {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsOtherVarRef(t, e) {
    return (e || new OtherVarRef()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsOtherVarRef(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new OtherVarRef()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  source(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  refType(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  refId() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startOtherVarRef(t) {
    t.startObject(5);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addSource(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addRefType(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addRefId(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addName(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static endOtherVarRef(t) {
    return t.endObject();
  }
  static createOtherVarRef(t, e, r, s, i, a) {
    OtherVarRef.startOtherVarRef(t);
    OtherVarRef.addType(t, e);
    OtherVarRef.addSource(t, r);
    OtherVarRef.addRefType(t, s);
    OtherVarRef.addRefId(t, i);
    OtherVarRef.addName(t, a);
    return OtherVarRef.endOtherVarRef(t);
  }
}
exports.OtherVarRef = OtherVarRef;
//# sourceMappingURL=other-var-ref.js.map
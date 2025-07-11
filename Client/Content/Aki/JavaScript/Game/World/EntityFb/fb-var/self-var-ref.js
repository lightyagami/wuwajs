"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelfVarRef = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SelfVarRef {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsSelfVarRef(e, t) {
    return (t || new SelfVarRef()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsSelfVarRef(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SelfVarRef()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  source(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  name(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startSelfVarRef(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addSource(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addName(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endSelfVarRef(e) {
    return e.endObject();
  }
  static createSelfVarRef(e, t, r, s) {
    SelfVarRef.startSelfVarRef(e);
    SelfVarRef.addType(e, t);
    SelfVarRef.addSource(e, r);
    SelfVarRef.addName(e, s);
    return SelfVarRef.endSelfVarRef(e);
  }
}
exports.SelfVarRef = SelfVarRef;
//# sourceMappingURL=self-var-ref.js.map
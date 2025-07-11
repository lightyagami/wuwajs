"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalVarRef = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GlobalVarRef {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsGlobalVarRef(t, e) {
    return (e || new GlobalVarRef()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsGlobalVarRef(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new GlobalVarRef()).__init(t.readInt32(t.position()) + t.position(), t);
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
  keyword(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startGlobalVarRef(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addSource(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addKeyword(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endGlobalVarRef(t) {
    return t.endObject();
  }
  static createGlobalVarRef(t, e, r, a) {
    GlobalVarRef.startGlobalVarRef(t);
    GlobalVarRef.addType(t, e);
    GlobalVarRef.addSource(t, r);
    GlobalVarRef.addKeyword(t, a);
    return GlobalVarRef.endGlobalVarRef(t);
  }
}
exports.GlobalVarRef = GlobalVarRef;
//# sourceMappingURL=global-var-ref.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckNodeStatus = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckNodeStatus {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCheckNodeStatus(t, e) {
    return (e || new CheckNodeStatus()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckNodeStatus(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CheckNodeStatus()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  nodeId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  status() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCheckNodeStatus(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addNodeId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addStatus(t, e) {
    t.addFieldInt8(2, e, 0);
  }
  static endCheckNodeStatus(t) {
    return t.endObject();
  }
  static createCheckNodeStatus(t, e, s, a) {
    CheckNodeStatus.startCheckNodeStatus(t);
    CheckNodeStatus.addType(t, e);
    CheckNodeStatus.addNodeId(t, s);
    CheckNodeStatus.addStatus(t, a);
    return CheckNodeStatus.endCheckNodeStatus(t);
  }
}
exports.CheckNodeStatus = CheckNodeStatus;
//# sourceMappingURL=check-node-status.js.map
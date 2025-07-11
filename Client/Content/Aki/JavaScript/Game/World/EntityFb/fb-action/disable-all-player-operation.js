"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisableAllPlayerOperation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DisableAllPlayerOperation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsDisableAllPlayerOperation(e, t) {
    return (t || new DisableAllPlayerOperation()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsDisableAllPlayerOperation(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new DisableAllPlayerOperation()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  displayMode(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startDisableAllPlayerOperation(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addDisplayMode(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endDisableAllPlayerOperation(e) {
    return e.endObject();
  }
  static createDisableAllPlayerOperation(e, t, l) {
    DisableAllPlayerOperation.startDisableAllPlayerOperation(e);
    DisableAllPlayerOperation.addType(e, t);
    DisableAllPlayerOperation.addDisplayMode(e, l);
    return DisableAllPlayerOperation.endDisableAllPlayerOperation(e);
  }
}
exports.DisableAllPlayerOperation = DisableAllPlayerOperation;
//# sourceMappingURL=disable-all-player-operation.js.map
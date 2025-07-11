"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordTimeStampType = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RecordTimeStampType {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsRecordTimeStampType(e, t) {
    return (t || new RecordTimeStampType()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsRecordTimeStampType(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new RecordTimeStampType()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  timeStampType(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startRecordTimeStampType(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addTimeStampType(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endRecordTimeStampType(e) {
    return e.endObject();
  }
  static createRecordTimeStampType(e, t, i) {
    RecordTimeStampType.startRecordTimeStampType(e);
    RecordTimeStampType.addType(e, t);
    RecordTimeStampType.addTimeStampType(e, i);
    return RecordTimeStampType.endRecordTimeStampType(e);
  }
}
exports.RecordTimeStampType = RecordTimeStampType;
//# sourceMappingURL=record-time-stamp-type.js.map
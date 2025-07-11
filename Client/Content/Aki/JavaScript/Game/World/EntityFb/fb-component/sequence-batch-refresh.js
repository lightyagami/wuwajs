"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceBatchRefresh = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SequenceBatchRefresh {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSequenceBatchRefresh(t, e) {
    return (e || new SequenceBatchRefresh()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSequenceBatchRefresh(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SequenceBatchRefresh()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  entityBatchesType(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readUint8(this.bb.__vector(this.bb_pos + e) + t);
    } else {
      return 0;
    }
  }
  entityBatchesTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  entityBatchesTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  entityBatches(t, e) {
    var s = this.bb.__offset(this.bb_pos, 8);
    if (s) {
      return this.bb.__union(e, this.bb.__vector(this.bb_pos + s) + t * 4);
    } else {
      return undefined;
    }
  }
  entityBatchesLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isRestartAfterAllBatchesFinished() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startSequenceBatchRefresh(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEntityBatchesType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createEntityBatchesTypeVector(e, s) {
    e.startVector(1, s.length, 1);
    for (let t = s.length - 1; t >= 0; t--) {
      e.addInt8(s[t]);
    }
    return e.endVector();
  }
  static startEntityBatchesTypeVector(t, e) {
    t.startVector(1, e, 1);
  }
  static addEntityBatches(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createEntityBatchesVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      e.addOffset(s[t]);
    }
    return e.endVector();
  }
  static startEntityBatchesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addIsRestartAfterAllBatchesFinished(t, e) {
    t.addFieldInt8(3, +e, 0);
  }
  static endSequenceBatchRefresh(t) {
    return t.endObject();
  }
  static createSequenceBatchRefresh(t, e, s, h, r) {
    SequenceBatchRefresh.startSequenceBatchRefresh(t);
    SequenceBatchRefresh.addType(t, e);
    SequenceBatchRefresh.addEntityBatchesType(t, s);
    SequenceBatchRefresh.addEntityBatches(t, h);
    SequenceBatchRefresh.addIsRestartAfterAllBatchesFinished(t, r);
    return SequenceBatchRefresh.endSequenceBatchRefresh(t);
  }
}
exports.SequenceBatchRefresh = SequenceBatchRefresh;
//# sourceMappingURL=sequence-batch-refresh.js.map
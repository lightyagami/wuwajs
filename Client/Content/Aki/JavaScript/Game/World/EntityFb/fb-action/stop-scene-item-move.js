"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StopSceneItemMove = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StopSceneItemMove {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsStopSceneItemMove(t, e) {
    return (e || new StopSceneItemMove()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsStopSceneItemMove(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new StopSceneItemMove()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityIds(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
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
  stopType(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startStopSceneItemMove(t) {
    t.startObject(2);
  }
  static addEntityIds(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static createEntityIdsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      e.addInt32(s[t]);
    }
    return e.endVector();
  }
  static startEntityIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addStopType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endStopSceneItemMove(t) {
    return t.endObject();
  }
  static createStopSceneItemMove(t, e, s) {
    StopSceneItemMove.startStopSceneItemMove(t);
    StopSceneItemMove.addEntityIds(t, e);
    StopSceneItemMove.addStopType(t, s);
    return StopSceneItemMove.endStopSceneItemMove(t);
  }
}
exports.StopSceneItemMove = StopSceneItemMove;
//# sourceMappingURL=stop-scene-item-move.js.map
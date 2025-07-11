"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportDungeonFunction = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TeleportDungeonFunction {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTeleportDungeonFunction(t, e) {
    return (e || new TeleportDungeonFunction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTeleportDungeonFunction(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TeleportDungeonFunction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  enable() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  dungeonList(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  dungeonListLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  dungeonListArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  static startTeleportDungeonFunction(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEnable(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static addDungeonList(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createDungeonListVector(e, n) {
    e.startVector(4, n.length, 4);
    for (let t = n.length - 1; t >= 0; t--) {
      e.addInt32(n[t]);
    }
    return e.endVector();
  }
  static startDungeonListVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endTeleportDungeonFunction(t) {
    return t.endObject();
  }
  static createTeleportDungeonFunction(t, e, n, i) {
    TeleportDungeonFunction.startTeleportDungeonFunction(t);
    TeleportDungeonFunction.addType(t, e);
    TeleportDungeonFunction.addEnable(t, n);
    TeleportDungeonFunction.addDungeonList(t, i);
    return TeleportDungeonFunction.endTeleportDungeonFunction(t);
  }
}
exports.TeleportDungeonFunction = TeleportDungeonFunction;
//# sourceMappingURL=teleport-dungeon-function.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HideWorldMonsterAndMonsterTreasureGroup = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HideWorldMonsterAndMonsterTreasureGroup {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, r) {
    this.bb_pos = e;
    this.bb = r;
    return this;
  }
  static getRootAsHideWorldMonsterAndMonsterTreasureGroup(e, r) {
    return (r || new HideWorldMonsterAndMonsterTreasureGroup()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsHideWorldMonsterAndMonsterTreasureGroup(e, r) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new HideWorldMonsterAndMonsterTreasureGroup()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, e);
    } else {
      return undefined;
    }
  }
  hideRangeEntities(e) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + r) + e * 4);
    } else {
      return 0;
    }
  }
  hideRangeEntitiesLength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__vector_len(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  hideRangeEntitiesArray() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + e), this.bb.__vector_len(this.bb_pos + e));
    } else {
      return undefined;
    }
  }
  static startHideWorldMonsterAndMonsterTreasureGroup(e) {
    e.startObject(2);
  }
  static addType(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static addHideRangeEntities(e, r) {
    e.addFieldOffset(1, r, 0);
  }
  static createHideRangeEntitiesVector(r, t) {
    r.startVector(4, t.length, 4);
    for (let e = t.length - 1; e >= 0; e--) {
      r.addInt32(t[e]);
    }
    return r.endVector();
  }
  static startHideRangeEntitiesVector(e, r) {
    e.startVector(4, r, 4);
  }
  static endHideWorldMonsterAndMonsterTreasureGroup(e) {
    return e.endObject();
  }
  static createHideWorldMonsterAndMonsterTreasureGroup(e, r, t) {
    HideWorldMonsterAndMonsterTreasureGroup.startHideWorldMonsterAndMonsterTreasureGroup(e);
    HideWorldMonsterAndMonsterTreasureGroup.addType(e, r);
    HideWorldMonsterAndMonsterTreasureGroup.addHideRangeEntities(e, t);
    return HideWorldMonsterAndMonsterTreasureGroup.endHideWorldMonsterAndMonsterTreasureGroup(e);
  }
}
exports.HideWorldMonsterAndMonsterTreasureGroup = HideWorldMonsterAndMonsterTreasureGroup;
//# sourceMappingURL=hide-world-monster-and-monster-treasure-group.js.map
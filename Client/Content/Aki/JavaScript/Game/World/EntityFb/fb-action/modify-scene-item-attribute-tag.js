"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModifySceneItemAttributeTag = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ModifySceneItemAttributeTag {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsModifySceneItemAttributeTag(t, e) {
    return (e || new ModifySceneItemAttributeTag()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsModifySceneItemAttributeTag(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ModifySceneItemAttributeTag()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  isAddTag() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  performanceTag(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  performanceTagLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  performanceTagArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  static startModifySceneItemAttributeTag(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addIsAddTag(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static addPerformanceTag(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createPerformanceTagVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addInt32(i[t]);
    }
    return e.endVector();
  }
  static startPerformanceTagVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endModifySceneItemAttributeTag(t) {
    return t.endObject();
  }
  static createModifySceneItemAttributeTag(t, e, i, r) {
    ModifySceneItemAttributeTag.startModifySceneItemAttributeTag(t);
    ModifySceneItemAttributeTag.addType(t, e);
    ModifySceneItemAttributeTag.addIsAddTag(t, i);
    ModifySceneItemAttributeTag.addPerformanceTag(t, r);
    return ModifySceneItemAttributeTag.endModifySceneItemAttributeTag(t);
  }
}
exports.ModifySceneItemAttributeTag = ModifySceneItemAttributeTag;
//# sourceMappingURL=modify-scene-item-attribute-tag.js.map
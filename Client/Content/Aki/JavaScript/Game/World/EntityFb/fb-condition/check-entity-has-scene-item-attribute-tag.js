"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckEntityHasSceneItemAttributeTag = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckEntityHasSceneItemAttributeTag {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCheckEntityHasSceneItemAttributeTag(t, e) {
    return (e || new CheckEntityHasSceneItemAttributeTag()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckEntityHasSceneItemAttributeTag(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CheckEntityHasSceneItemAttributeTag()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  checkType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  tags(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  tagsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  tagsArray() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  static startCheckEntityHasSceneItemAttributeTag(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addCheckType(t, e) {
    t.addFieldInt8(1, e, 0);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static addTags(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createTagsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addInt32(i[t]);
    }
    return e.endVector();
  }
  static startTagsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endCheckEntityHasSceneItemAttributeTag(t) {
    return t.endObject();
  }
  static createCheckEntityHasSceneItemAttributeTag(t, e, i, s, a) {
    CheckEntityHasSceneItemAttributeTag.startCheckEntityHasSceneItemAttributeTag(t);
    CheckEntityHasSceneItemAttributeTag.addType(t, e);
    CheckEntityHasSceneItemAttributeTag.addCheckType(t, i);
    CheckEntityHasSceneItemAttributeTag.addEntityId(t, s);
    CheckEntityHasSceneItemAttributeTag.addTags(t, a);
    return CheckEntityHasSceneItemAttributeTag.endCheckEntityHasSceneItemAttributeTag(t);
  }
}
exports.CheckEntityHasSceneItemAttributeTag = CheckEntityHasSceneItemAttributeTag;
//# sourceMappingURL=check-entity-has-scene-item-attribute-tag.js.map
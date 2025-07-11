"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerAttribute = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PlayerAttribute {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPlayerAttribute(t, e) {
    return (e || new PlayerAttribute()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPlayerAttribute(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PlayerAttribute()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  option(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  attributeTypesType(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readUint8(this.bb.__vector(this.bb_pos + e) + t);
    } else {
      return 0;
    }
  }
  attributeTypesTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  attributeTypesTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  attributeTypes(t, e) {
    var r = this.bb.__offset(this.bb_pos, 10);
    if (r) {
      return this.bb.__union(e, this.bb.__vector(this.bb_pos + r) + t * 4);
    } else {
      return undefined;
    }
  }
  attributeTypesLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startPlayerAttribute(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addOption(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addAttributeTypesType(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createAttributeTypesTypeVector(e, r) {
    e.startVector(1, r.length, 1);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addInt8(r[t]);
    }
    return e.endVector();
  }
  static startAttributeTypesTypeVector(t, e) {
    t.startVector(1, e, 1);
  }
  static addAttributeTypes(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createAttributeTypesVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addOffset(r[t]);
    }
    return e.endVector();
  }
  static startAttributeTypesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endPlayerAttribute(t) {
    return t.endObject();
  }
  static createPlayerAttribute(t, e, r, i, s) {
    PlayerAttribute.startPlayerAttribute(t);
    PlayerAttribute.addType(t, e);
    PlayerAttribute.addOption(t, r);
    PlayerAttribute.addAttributeTypesType(t, i);
    PlayerAttribute.addAttributeTypes(t, s);
    return PlayerAttribute.endPlayerAttribute(t);
  }
}
exports.PlayerAttribute = PlayerAttribute;
//# sourceMappingURL=player-attribute.js.map
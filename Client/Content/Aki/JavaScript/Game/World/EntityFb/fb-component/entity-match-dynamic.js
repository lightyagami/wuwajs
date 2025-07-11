"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityMatchDynamic = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const dynamic_entity_match_js_1 = require("../fb-component/dynamic-entity-match.js");
class EntityMatchDynamic {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsEntityMatchDynamic(t, i) {
    return (i || new EntityMatchDynamic()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityMatchDynamic(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new EntityMatchDynamic()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  matchEntity(t, i) {
    var a = this.bb.__offset(this.bb_pos, 6);
    if (a) {
      return (i || new dynamic_entity_match_js_1.DynamicEntityMatch()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + a) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  matchEntityLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startEntityMatchDynamic(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addMatchEntity(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createMatchEntityVector(i, a) {
    i.startVector(4, a.length, 4);
    for (let t = a.length - 1; t >= 0; t--) {
      i.addOffset(a[t]);
    }
    return i.endVector();
  }
  static startMatchEntityVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endEntityMatchDynamic(t) {
    return t.endObject();
  }
  static createEntityMatchDynamic(t, i, a) {
    EntityMatchDynamic.startEntityMatchDynamic(t);
    EntityMatchDynamic.addType(t, i);
    EntityMatchDynamic.addMatchEntity(t, a);
    return EntityMatchDynamic.endEntityMatchDynamic(t);
  }
}
exports.EntityMatchDynamic = EntityMatchDynamic;
//# sourceMappingURL=entity-match-dynamic.js.map
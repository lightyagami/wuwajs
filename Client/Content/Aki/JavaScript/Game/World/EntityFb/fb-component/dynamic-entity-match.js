"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicEntityMatch = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const entity_category_js_1 = require("../fb-component/entity-category.js");
const entity_state_js_1 = require("../fb-component/entity-state.js");
class DynamicEntityMatch {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsDynamicEntityMatch(t, i) {
    return (i || new DynamicEntityMatch()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDynamicEntityMatch(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new DynamicEntityMatch()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  category(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return (t || new entity_category_js_1.EntityCategory()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  categoryType(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  entityIds(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + t * 4);
    } else {
      return 0;
    }
  }
  entityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  entityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  state(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return (t || new entity_state_js_1.EntityState()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  hasProperty(t, i) {
    var s = this.bb.__offset(this.bb_pos, 12);
    if (s) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + s) + t * 4, i);
    } else {
      return undefined;
    }
  }
  hasPropertyLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  noProperty(t, i) {
    var s = this.bb.__offset(this.bb_pos, 14);
    if (s) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + s) + t * 4, i);
    } else {
      return undefined;
    }
  }
  noPropertyLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startDynamicEntityMatch(t) {
    t.startObject(6);
  }
  static addCategory(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addCategoryType(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addEntityIds(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createEntityIdsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addInt32(s[t]);
    }
    return i.endVector();
  }
  static startEntityIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addState(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addHasProperty(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static createHasPropertyVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startHasPropertyVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addNoProperty(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static createNoPropertyVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startNoPropertyVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endDynamicEntityMatch(t) {
    return t.endObject();
  }
}
exports.DynamicEntityMatch = DynamicEntityMatch;
//# sourceMappingURL=dynamic-entity-match.js.map
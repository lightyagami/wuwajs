"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetEntitiesPosComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_trigger_shape_js_1 = require("../fb-shape/union-trigger-shape.js");
class ResetEntitiesPosComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsResetEntitiesPosComponent(t, e) {
    return (e || new ResetEntitiesPosComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsResetEntitiesPosComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ResetEntitiesPosComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  rangeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_trigger_shape_js_1.UnionTriggerShape.NONE;
    }
  }
  range(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  entityIds(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  entityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  entityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  static startResetEntitiesPosComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addRangeType(t, e) {
    t.addFieldInt8(1, e, union_trigger_shape_js_1.UnionTriggerShape.NONE);
  }
  static addRange(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addEntityIds(t, e) {
    t.addFieldOffset(3, e, 0);
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
  static endResetEntitiesPosComponent(t) {
    return t.endObject();
  }
  static createResetEntitiesPosComponent(t, e, s, i, n) {
    ResetEntitiesPosComponent.startResetEntitiesPosComponent(t);
    ResetEntitiesPosComponent.addDisabled(t, e);
    ResetEntitiesPosComponent.addRangeType(t, s);
    ResetEntitiesPosComponent.addRange(t, i);
    ResetEntitiesPosComponent.addEntityIds(t, n);
    return ResetEntitiesPosComponent.endResetEntitiesPosComponent(t);
  }
}
exports.ResetEntitiesPosComponent = ResetEntitiesPosComponent;
//# sourceMappingURL=reset-entities-pos-component.js.map
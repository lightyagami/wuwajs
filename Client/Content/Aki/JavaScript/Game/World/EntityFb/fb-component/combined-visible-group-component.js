"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CombinedVisibleGroupComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CombinedVisibleGroupComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCombinedVisibleGroupComponent(t, i) {
    return (i || new CombinedVisibleGroupComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCombinedVisibleGroupComponent(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CombinedVisibleGroupComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  areaIds(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + t * 4);
    } else {
      return 0;
    }
  }
  areaIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  areaIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  includeSubArea() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  entityIds(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + t * 4);
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
  static startCombinedVisibleGroupComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addAreaIds(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createAreaIdsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addInt32(e[t]);
    }
    return i.endVector();
  }
  static startAreaIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addIncludeSubArea(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static addEntityIds(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static createEntityIdsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addInt32(e[t]);
    }
    return i.endVector();
  }
  static startEntityIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endCombinedVisibleGroupComponent(t) {
    return t.endObject();
  }
  static createCombinedVisibleGroupComponent(t, i, e, s, r) {
    CombinedVisibleGroupComponent.startCombinedVisibleGroupComponent(t);
    CombinedVisibleGroupComponent.addDisabled(t, i);
    CombinedVisibleGroupComponent.addAreaIds(t, e);
    CombinedVisibleGroupComponent.addIncludeSubArea(t, s);
    CombinedVisibleGroupComponent.addEntityIds(t, r);
    return CombinedVisibleGroupComponent.endCombinedVisibleGroupComponent(t);
  }
}
exports.CombinedVisibleGroupComponent = CombinedVisibleGroupComponent;
//# sourceMappingURL=combined-visible-group-component.js.map
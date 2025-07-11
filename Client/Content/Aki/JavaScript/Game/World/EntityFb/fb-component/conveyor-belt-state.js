"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConveyorBeltState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_conveyor_belt_field_type_js_1 = require("../fb-component/union-conveyor-belt-field-type.js");
const union_conveyor_belt_move_type_js_1 = require("../fb-component/union-conveyor-belt-move-type.js");
class ConveyorBeltState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsConveyorBeltState(t, e) {
    return (e || new ConveyorBeltState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsConveyorBeltState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ConveyorBeltState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityState(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  fieldTypeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_conveyor_belt_field_type_js_1.UnionConveyorBeltFieldType.NONE;
    }
  }
  fieldType(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  moveTypeType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_conveyor_belt_move_type_js_1.UnionConveyorBeltMoveType.NONE;
    }
  }
  moveType(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startConveyorBeltState(t) {
    t.startObject(5);
  }
  static addEntityState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addFieldTypeType(t, e) {
    t.addFieldInt8(1, e, union_conveyor_belt_field_type_js_1.UnionConveyorBeltFieldType.NONE);
  }
  static addFieldType(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addMoveTypeType(t, e) {
    t.addFieldInt8(3, e, union_conveyor_belt_move_type_js_1.UnionConveyorBeltMoveType.NONE);
  }
  static addMoveType(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static endConveyorBeltState(t) {
    return t.endObject();
  }
  static createConveyorBeltState(t, e, o, i, r, n) {
    ConveyorBeltState.startConveyorBeltState(t);
    ConveyorBeltState.addEntityState(t, e);
    ConveyorBeltState.addFieldTypeType(t, o);
    ConveyorBeltState.addFieldType(t, i);
    ConveyorBeltState.addMoveTypeType(t, r);
    ConveyorBeltState.addMoveType(t, n);
    return ConveyorBeltState.endConveyorBeltState(t);
  }
}
exports.ConveyorBeltState = ConveyorBeltState;
//# sourceMappingURL=conveyor-belt-state.js.map
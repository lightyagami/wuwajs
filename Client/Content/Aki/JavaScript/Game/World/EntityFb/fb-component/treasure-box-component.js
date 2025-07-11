"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreasureBoxComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TreasureBoxComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsTreasureBoxComponent(e, t) {
    return (t || new TreasureBoxComponent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsTreasureBoxComponent(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new TreasureBoxComponent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  disabled() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  typeId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startTreasureBoxComponent(e) {
    e.startObject(2);
  }
  static addDisabled(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static addTypeId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endTreasureBoxComponent(e) {
    return e.endObject();
  }
  static createTreasureBoxComponent(e, t, r) {
    TreasureBoxComponent.startTreasureBoxComponent(e);
    TreasureBoxComponent.addDisabled(e, t);
    TreasureBoxComponent.addTypeId(e, r);
    return TreasureBoxComponent.endTreasureBoxComponent(e);
  }
}
exports.TreasureBoxComponent = TreasureBoxComponent;
//# sourceMappingURL=treasure-box-component.js.map
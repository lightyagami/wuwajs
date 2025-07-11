"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviseItemComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AdviseItemComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsAdviseItemComponent(t, e) {
    return (e || new AdviseItemComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAdviseItemComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new AdviseItemComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startAdviseItemComponent(t) {
    t.startObject(1);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static endAdviseItemComponent(t) {
    return t.endObject();
  }
  static createAdviseItemComponent(t, e) {
    AdviseItemComponent.startAdviseItemComponent(t);
    AdviseItemComponent.addDisabled(t, e);
    return AdviseItemComponent.endAdviseItemComponent(t);
  }
}
exports.AdviseItemComponent = AdviseItemComponent;
//# sourceMappingURL=advise-item-component.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AirPassageComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AirPassageComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsAirPassageComponent(t, s) {
    return (s || new AirPassageComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAirPassageComponent(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new AirPassageComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startAirPassageComponent(t) {
    t.startObject(1);
  }
  static addDisabled(t, s) {
    t.addFieldInt8(0, +s, 0);
  }
  static endAirPassageComponent(t) {
    return t.endObject();
  }
  static createAirPassageComponent(t, s) {
    AirPassageComponent.startAirPassageComponent(t);
    AirPassageComponent.addDisabled(t, s);
    return AirPassageComponent.endAirPassageComponent(t);
  }
}
exports.AirPassageComponent = AirPassageComponent;
//# sourceMappingURL=air-passage-component.js.map
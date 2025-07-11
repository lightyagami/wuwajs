"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindSourceComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_wind_source_js_1 = require("../fb-component/union-wind-source.js");
class WindSourceComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsWindSourceComponent(t, e) {
    return (e || new WindSourceComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsWindSourceComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new WindSourceComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  windSourceType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_wind_source_js_1.UnionWindSource.NONE;
    }
  }
  windSource(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startWindSourceComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addWindSourceType(t, e) {
    t.addFieldInt8(1, e, union_wind_source_js_1.UnionWindSource.NONE);
  }
  static addWindSource(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endWindSourceComponent(t) {
    return t.endObject();
  }
  static createWindSourceComponent(t, e, n, o) {
    WindSourceComponent.startWindSourceComponent(t);
    WindSourceComponent.addDisabled(t, e);
    WindSourceComponent.addWindSourceType(t, n);
    WindSourceComponent.addWindSource(t, o);
    return WindSourceComponent.endWindSourceComponent(t);
  }
}
exports.WindSourceComponent = WindSourceComponent;
//# sourceMappingURL=wind-source-component.js.map
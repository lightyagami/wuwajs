"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UndergroundComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const underground_state_info_js_1 = require("../fb-component/underground-state-info.js");
class UndergroundComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsUndergroundComponent(t, e) {
    return (e || new UndergroundComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsUndergroundComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new UndergroundComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  testState() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isRestartPlayer() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  destroyTag(t, e) {
    var r = this.bb.__offset(this.bb_pos, 10);
    if (r) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + r) + t * 4, e);
    } else {
      return undefined;
    }
  }
  destroyTagLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  stateInfo(t, e) {
    var r = this.bb.__offset(this.bb_pos, 12);
    if (r) {
      return (e || new underground_state_info_js_1.UndergroundStateInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  stateInfoLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startUndergroundComponent(t) {
    t.startObject(5);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addTestState(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addIsRestartPlayer(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static addDestroyTag(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createDestroyTagVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addOffset(r[t]);
    }
    return e.endVector();
  }
  static startDestroyTagVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addStateInfo(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createStateInfoVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addOffset(r[t]);
    }
    return e.endVector();
  }
  static startStateInfoVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endUndergroundComponent(t) {
    return t.endObject();
  }
  static createUndergroundComponent(t, e, r, n, s, o) {
    UndergroundComponent.startUndergroundComponent(t);
    UndergroundComponent.addDisabled(t, e);
    UndergroundComponent.addTestState(t, r);
    UndergroundComponent.addIsRestartPlayer(t, n);
    UndergroundComponent.addDestroyTag(t, s);
    UndergroundComponent.addStateInfo(t, o);
    return UndergroundComponent.endUndergroundComponent(t);
  }
}
exports.UndergroundComponent = UndergroundComponent;
//# sourceMappingURL=underground-component.js.map
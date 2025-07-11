"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlideRailComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const exchange_slide_rail_config_js_1 = require("../fb-component/exchange-slide-rail-config.js");
class SlideRailComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsSlideRailComponent(i, t) {
    return (t || new SlideRailComponent()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsSlideRailComponent(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SlideRailComponent()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  disabled() {
    var i = this.bb.__offset(this.bb_pos, 4);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  slideSpeed() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readInt32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  railSplineEntityId() {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.readInt32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  exchangeRailConfigs(i, t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return (t || new exchange_slide_rail_config_js_1.ExchangeSlideRailConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + i * 4), this.bb);
    } else {
      return undefined;
    }
  }
  exchangeRailConfigsLength() {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__vector_len(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  static startSlideRailComponent(i) {
    i.startObject(4);
  }
  static addDisabled(i, t) {
    i.addFieldInt8(0, +t, 0);
  }
  static addSlideSpeed(i, t) {
    i.addFieldInt32(1, t, 0);
  }
  static addRailSplineEntityId(i, t) {
    i.addFieldInt32(2, t, 0);
  }
  static addExchangeRailConfigs(i, t) {
    i.addFieldOffset(3, t, 0);
  }
  static createExchangeRailConfigsVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let i = e.length - 1; i >= 0; i--) {
      t.addOffset(e[i]);
    }
    return t.endVector();
  }
  static startExchangeRailConfigsVector(i, t) {
    i.startVector(4, t, 4);
  }
  static endSlideRailComponent(i) {
    return i.endObject();
  }
  static createSlideRailComponent(i, t, e, n, s) {
    SlideRailComponent.startSlideRailComponent(i);
    SlideRailComponent.addDisabled(i, t);
    SlideRailComponent.addSlideSpeed(i, e);
    SlideRailComponent.addRailSplineEntityId(i, n);
    SlideRailComponent.addExchangeRailConfigs(i, s);
    return SlideRailComponent.endSlideRailComponent(i);
  }
}
exports.SlideRailComponent = SlideRailComponent;
//# sourceMappingURL=slide-rail-component.js.map
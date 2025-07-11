"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderSpecifiedRangeComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_render_specified_range_config_js_1 = require("../fb-component/union-render-specified-range-config.js");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class RenderSpecifiedRangeComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, i) {
    this.bb_pos = e;
    this.bb = i;
    return this;
  }
  static getRootAsRenderSpecifiedRangeComponent(e, i) {
    return (i || new RenderSpecifiedRangeComponent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsRenderSpecifiedRangeComponent(e, i) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new RenderSpecifiedRangeComponent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  disabled() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  condition(e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (e || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  renderConfigType() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_render_specified_range_config_js_1.UnionRenderSpecifiedRangeConfig.NONE;
    }
  }
  renderConfig(e) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__union(e, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startRenderSpecifiedRangeComponent(e) {
    e.startObject(4);
  }
  static addDisabled(e, i) {
    e.addFieldInt8(0, +i, 0);
  }
  static addCondition(e, i) {
    e.addFieldOffset(1, i, 0);
  }
  static addRenderConfigType(e, i) {
    e.addFieldInt8(2, i, union_render_specified_range_config_js_1.UnionRenderSpecifiedRangeConfig.NONE);
  }
  static addRenderConfig(e, i) {
    e.addFieldOffset(3, i, 0);
  }
  static endRenderSpecifiedRangeComponent(e) {
    return e.endObject();
  }
}
exports.RenderSpecifiedRangeComponent = RenderSpecifiedRangeComponent;
//# sourceMappingURL=render-specified-range-component.js.map
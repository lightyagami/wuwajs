"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnableSplineMoveModel = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_spline_move_model_js_1 = require("../fb-action/union-spline-move-model.js");
class EnableSplineMoveModel {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, i) {
    this.bb_pos = e;
    this.bb = i;
    return this;
  }
  static getRootAsEnableSplineMoveModel(e, i) {
    return (i || new EnableSplineMoveModel()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsEnableSplineMoveModel(e, i) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new EnableSplineMoveModel()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  configType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_spline_move_model_js_1.UnionSplineMoveModel.NONE;
    }
  }
  config(e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__union(e, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startEnableSplineMoveModel(e) {
    e.startObject(2);
  }
  static addConfigType(e, i) {
    e.addFieldInt8(0, i, union_spline_move_model_js_1.UnionSplineMoveModel.NONE);
  }
  static addConfig(e, i) {
    e.addFieldOffset(1, i, 0);
  }
  static endEnableSplineMoveModel(e) {
    return e.endObject();
  }
  static createEnableSplineMoveModel(e, i, n) {
    EnableSplineMoveModel.startEnableSplineMoveModel(e);
    EnableSplineMoveModel.addConfigType(e, i);
    EnableSplineMoveModel.addConfig(e, n);
    return EnableSplineMoveModel.endEnableSplineMoveModel(e);
  }
}
exports.EnableSplineMoveModel = EnableSplineMoveModel;
//# sourceMappingURL=enable-spline-move-model.js.map
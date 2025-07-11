"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuildingBlockFoundation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BuildingBlockFoundation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsBuildingBlockFoundation(i, t) {
    return (t || new BuildingBlockFoundation()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsBuildingBlockFoundation(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new BuildingBlockFoundation()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  static startBuildingBlockFoundation(i) {
    i.startObject(1);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static endBuildingBlockFoundation(i) {
    return i.endObject();
  }
  static createBuildingBlockFoundation(i, t) {
    BuildingBlockFoundation.startBuildingBlockFoundation(i);
    BuildingBlockFoundation.addType(i, t);
    return BuildingBlockFoundation.endBuildingBlockFoundation(i);
  }
}
exports.BuildingBlockFoundation = BuildingBlockFoundation;
//# sourceMappingURL=building-block-foundation.js.map
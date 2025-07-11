"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreloadAction = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_preload_object_type_config_js_1 = require("../fb-action/union-preload-object-type-config.js");
class PreloadAction {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPreloadAction(t, e) {
    return (e || new PreloadAction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPreloadAction(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PreloadAction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  preloadObjectTypeType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_preload_object_type_config_js_1.UnionPreloadObjectTypeConfig.NONE;
    }
  }
  preloadObjectType(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startPreloadAction(t) {
    t.startObject(2);
  }
  static addPreloadObjectTypeType(t, e) {
    t.addFieldInt8(0, e, union_preload_object_type_config_js_1.UnionPreloadObjectTypeConfig.NONE);
  }
  static addPreloadObjectType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endPreloadAction(t) {
    return t.endObject();
  }
  static createPreloadAction(t, e, o) {
    PreloadAction.startPreloadAction(t);
    PreloadAction.addPreloadObjectTypeType(t, e);
    PreloadAction.addPreloadObjectType(t, o);
    return PreloadAction.endPreloadAction(t);
  }
}
exports.PreloadAction = PreloadAction;
//# sourceMappingURL=preload-action.js.map
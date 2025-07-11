"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemovePreloadResourceAction = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_remove_preload_resource_config_js_1 = require("../fb-action/union-remove-preload-resource-config.js");
class RemovePreloadResourceAction {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, o) {
    this.bb_pos = e;
    this.bb = o;
    return this;
  }
  static getRootAsRemovePreloadResourceAction(e, o) {
    return (o || new RemovePreloadResourceAction()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsRemovePreloadResourceAction(e, o) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new RemovePreloadResourceAction()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  removePreloadResourceObjectTypeType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_remove_preload_resource_config_js_1.UnionRemovePreloadResourceConfig.NONE;
    }
  }
  removePreloadResourceObjectType(e) {
    var o = this.bb.__offset(this.bb_pos, 6);
    if (o) {
      return this.bb.__union(e, this.bb_pos + o);
    } else {
      return undefined;
    }
  }
  static startRemovePreloadResourceAction(e) {
    e.startObject(2);
  }
  static addRemovePreloadResourceObjectTypeType(e, o) {
    e.addFieldInt8(0, o, union_remove_preload_resource_config_js_1.UnionRemovePreloadResourceConfig.NONE);
  }
  static addRemovePreloadResourceObjectType(e, o) {
    e.addFieldOffset(1, o, 0);
  }
  static endRemovePreloadResourceAction(e) {
    return e.endObject();
  }
  static createRemovePreloadResourceAction(e, o, r) {
    RemovePreloadResourceAction.startRemovePreloadResourceAction(e);
    RemovePreloadResourceAction.addRemovePreloadResourceObjectTypeType(e, o);
    RemovePreloadResourceAction.addRemovePreloadResourceObjectType(e, r);
    return RemovePreloadResourceAction.endRemovePreloadResourceAction(e);
  }
}
exports.RemovePreloadResourceAction = RemovePreloadResourceAction;
//# sourceMappingURL=remove-preload-resource-action.js.map
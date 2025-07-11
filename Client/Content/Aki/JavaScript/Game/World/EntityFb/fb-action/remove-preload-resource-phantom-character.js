"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemovePreloadResourcePhantomCharacter = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_delay_remove_config_js_1 = require("../fb-action/union-delay-remove-config.js");
class RemovePreloadResourcePhantomCharacter {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, r) {
    this.bb_pos = e;
    this.bb = r;
    return this;
  }
  static getRootAsRemovePreloadResourcePhantomCharacter(e, r) {
    return (r || new RemovePreloadResourcePhantomCharacter()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsRemovePreloadResourcePhantomCharacter(e, r) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new RemovePreloadResourcePhantomCharacter()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, e);
    } else {
      return undefined;
    }
  }
  id() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  delayReMoveType() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_delay_remove_config_js_1.UnionDelayRemoveConfig.NONE;
    }
  }
  delayReMove(e) {
    var r = this.bb.__offset(this.bb_pos, 10);
    if (r) {
      return this.bb.__union(e, this.bb_pos + r);
    } else {
      return undefined;
    }
  }
  static startRemovePreloadResourcePhantomCharacter(e) {
    e.startObject(4);
  }
  static addType(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static addId(e, r) {
    e.addFieldInt32(1, r, 0);
  }
  static addDelayReMoveType(e, r) {
    e.addFieldInt8(2, r, union_delay_remove_config_js_1.UnionDelayRemoveConfig.NONE);
  }
  static addDelayReMove(e, r) {
    e.addFieldOffset(3, r, 0);
  }
  static endRemovePreloadResourcePhantomCharacter(e) {
    return e.endObject();
  }
  static createRemovePreloadResourcePhantomCharacter(e, r, t, a, o) {
    RemovePreloadResourcePhantomCharacter.startRemovePreloadResourcePhantomCharacter(e);
    RemovePreloadResourcePhantomCharacter.addType(e, r);
    RemovePreloadResourcePhantomCharacter.addId(e, t);
    RemovePreloadResourcePhantomCharacter.addDelayReMoveType(e, a);
    RemovePreloadResourcePhantomCharacter.addDelayReMove(e, o);
    return RemovePreloadResourcePhantomCharacter.endRemovePreloadResourcePhantomCharacter(e);
  }
}
exports.RemovePreloadResourcePhantomCharacter = RemovePreloadResourcePhantomCharacter;
//# sourceMappingURL=remove-preload-resource-phantom-character.js.map
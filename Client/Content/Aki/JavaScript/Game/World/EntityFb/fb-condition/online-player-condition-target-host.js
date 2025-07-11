"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlinePlayerConditionTargetHost = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class OnlinePlayerConditionTargetHost {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsOnlinePlayerConditionTargetHost(t, e) {
    return (e || new OnlinePlayerConditionTargetHost()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsOnlinePlayerConditionTargetHost(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new OnlinePlayerConditionTargetHost()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startOnlinePlayerConditionTargetHost(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endOnlinePlayerConditionTargetHost(t) {
    return t.endObject();
  }
  static createOnlinePlayerConditionTargetHost(t, e) {
    OnlinePlayerConditionTargetHost.startOnlinePlayerConditionTargetHost(t);
    OnlinePlayerConditionTargetHost.addType(t, e);
    return OnlinePlayerConditionTargetHost.endOnlinePlayerConditionTargetHost(t);
  }
}
exports.OnlinePlayerConditionTargetHost = OnlinePlayerConditionTargetHost;
//# sourceMappingURL=online-player-condition-target-host.js.map
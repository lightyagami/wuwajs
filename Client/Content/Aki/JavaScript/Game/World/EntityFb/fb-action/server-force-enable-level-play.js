"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerForceEnableLevelPlay = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const enable_level_play_config_js_1 = require("../fb-action/enable-level-play-config.js");
class ServerForceEnableLevelPlay {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, r) {
    this.bb_pos = e;
    this.bb = r;
    return this;
  }
  static getRootAsServerForceEnableLevelPlay(e, r) {
    return (r || new ServerForceEnableLevelPlay()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsServerForceEnableLevelPlay(e, r) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ServerForceEnableLevelPlay()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  configs(e, r) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return (r || new enable_level_play_config_js_1.EnableLevelPlayConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + t) + e * 4), this.bb);
    } else {
      return undefined;
    }
  }
  configsLength() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__vector_len(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startServerForceEnableLevelPlay(e) {
    e.startObject(1);
  }
  static addConfigs(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static createConfigsVector(r, t) {
    r.startVector(4, t.length, 4);
    for (let e = t.length - 1; e >= 0; e--) {
      r.addOffset(t[e]);
    }
    return r.endVector();
  }
  static startConfigsVector(e, r) {
    e.startVector(4, r, 4);
  }
  static endServerForceEnableLevelPlay(e) {
    return e.endObject();
  }
  static createServerForceEnableLevelPlay(e, r) {
    ServerForceEnableLevelPlay.startServerForceEnableLevelPlay(e);
    ServerForceEnableLevelPlay.addConfigs(e, r);
    return ServerForceEnableLevelPlay.endServerForceEnableLevelPlay(e);
  }
}
exports.ServerForceEnableLevelPlay = ServerForceEnableLevelPlay;
//# sourceMappingURL=server-force-enable-level-play.js.map
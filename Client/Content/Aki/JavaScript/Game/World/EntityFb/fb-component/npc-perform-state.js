"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPerformState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const init_npc_perform_state_js_1 = require("../fb-common/init-npc-perform-state.js");
const npc_perform_state_config_js_1 = require("../fb-component/npc-perform-state-config.js");
class NpcPerformState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsNpcPerformState(t, e) {
    return (e || new NpcPerformState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNpcPerformState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new NpcPerformState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  initState(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return (t || new init_npc_perform_state_js_1.InitNpcPerformState()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  configs(t, e) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return (e || new npc_perform_state_config_js_1.NpcPerformStateConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  configsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startNpcPerformState(t) {
    t.startObject(2);
  }
  static addInitState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addConfigs(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createConfigsVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addOffset(r[t]);
    }
    return e.endVector();
  }
  static startConfigsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endNpcPerformState(t) {
    return t.endObject();
  }
  static createNpcPerformState(t, e, r) {
    NpcPerformState.startNpcPerformState(t);
    NpcPerformState.addInitState(t, e);
    NpcPerformState.addConfigs(t, r);
    return NpcPerformState.endNpcPerformState(t);
  }
}
exports.NpcPerformState = NpcPerformState;
//# sourceMappingURL=npc-perform-state.js.map
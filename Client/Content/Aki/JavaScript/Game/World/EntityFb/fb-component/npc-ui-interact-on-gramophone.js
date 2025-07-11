"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcUiInteractOnGramophone = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const play_flow_js_1 = require("../fb-action/play-flow.js");
class NpcUiInteractOnGramophone {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsNpcUiInteractOnGramophone(t, i) {
    return (i || new NpcUiInteractOnGramophone()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNpcUiInteractOnGramophone(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new NpcUiInteractOnGramophone()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  enterMontage(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  standByMontage(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  switchMusicMontage(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  exitMontage(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  enterFlow(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    if (i) {
      return (t || new play_flow_js_1.PlayFlow()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  failedFlow(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    if (i) {
      return (t || new play_flow_js_1.PlayFlow()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  successFlow(t) {
    var i = this.bb.__offset(this.bb_pos, 18);
    if (i) {
      return (t || new play_flow_js_1.PlayFlow()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startNpcUiInteractOnGramophone(t) {
    t.startObject(8);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addEnterMontage(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addStandByMontage(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addSwitchMusicMontage(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addExitMontage(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addEnterFlow(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addFailedFlow(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addSuccessFlow(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static endNpcUiInteractOnGramophone(t) {
    return t.endObject();
  }
}
exports.NpcUiInteractOnGramophone = NpcUiInteractOnGramophone;
//# sourceMappingURL=npc-ui-interact-on-gramophone.js.map
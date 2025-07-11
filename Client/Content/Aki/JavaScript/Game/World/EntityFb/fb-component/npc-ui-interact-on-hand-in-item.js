"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcUiInteractOnHandInItem = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const play_flow_js_1 = require("../fb-action/play-flow.js");
class NpcUiInteractOnHandInItem {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, n) {
    this.bb_pos = t;
    this.bb = n;
    return this;
  }
  static getRootAsNpcUiInteractOnHandInItem(t, n) {
    return (n || new NpcUiInteractOnHandInItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNpcUiInteractOnHandInItem(t, n) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (n || new NpcUiInteractOnHandInItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var n = this.bb.__offset(this.bb_pos, 4);
    if (n) {
      return this.bb.__string(this.bb_pos + n, t);
    } else {
      return undefined;
    }
  }
  enterMontage(t) {
    var n = this.bb.__offset(this.bb_pos, 6);
    if (n) {
      return this.bb.__string(this.bb_pos + n, t);
    } else {
      return undefined;
    }
  }
  standByMontage(t) {
    var n = this.bb.__offset(this.bb_pos, 8);
    if (n) {
      return this.bb.__string(this.bb_pos + n, t);
    } else {
      return undefined;
    }
  }
  handInFailedMontage(t) {
    var n = this.bb.__offset(this.bb_pos, 10);
    if (n) {
      return this.bb.__string(this.bb_pos + n, t);
    } else {
      return undefined;
    }
  }
  enterFlow(t) {
    var n = this.bb.__offset(this.bb_pos, 12);
    if (n) {
      return (t || new play_flow_js_1.PlayFlow()).__init(this.bb.__indirect(this.bb_pos + n), this.bb);
    } else {
      return undefined;
    }
  }
  handInFailedFlow(t) {
    var n = this.bb.__offset(this.bb_pos, 14);
    if (n) {
      return (t || new play_flow_js_1.PlayFlow()).__init(this.bb.__indirect(this.bb_pos + n), this.bb);
    } else {
      return undefined;
    }
  }
  static startNpcUiInteractOnHandInItem(t) {
    t.startObject(6);
  }
  static addType(t, n) {
    t.addFieldOffset(0, n, 0);
  }
  static addEnterMontage(t, n) {
    t.addFieldOffset(1, n, 0);
  }
  static addStandByMontage(t, n) {
    t.addFieldOffset(2, n, 0);
  }
  static addHandInFailedMontage(t, n) {
    t.addFieldOffset(3, n, 0);
  }
  static addEnterFlow(t, n) {
    t.addFieldOffset(4, n, 0);
  }
  static addHandInFailedFlow(t, n) {
    t.addFieldOffset(5, n, 0);
  }
  static endNpcUiInteractOnHandInItem(t) {
    return t.endObject();
  }
}
exports.NpcUiInteractOnHandInItem = NpcUiInteractOnHandInItem;
//# sourceMappingURL=npc-ui-interact-on-hand-in-item.js.map
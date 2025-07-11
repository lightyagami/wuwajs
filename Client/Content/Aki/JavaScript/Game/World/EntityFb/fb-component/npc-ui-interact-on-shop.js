"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcUiInteractOnShop = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const play_flow_js_1 = require("../fb-action/play-flow.js");
const union_montage_config_js_1 = require("../fb-action/union-montage-config.js");
class NpcUiInteractOnShop {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsNpcUiInteractOnShop(t, i) {
    return (i || new NpcUiInteractOnShop()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNpcUiInteractOnShop(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new NpcUiInteractOnShop()).__init(t.readInt32(t.position()) + t.position(), t);
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
  shopSuccessMontage(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  enterFlow(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return (t || new play_flow_js_1.PlayFlow()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  shopFailedFlow(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    if (i) {
      return (t || new play_flow_js_1.PlayFlow()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  shopSuccessFlow(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    if (i) {
      return (t || new play_flow_js_1.PlayFlow()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  workingFlow(t) {
    var i = this.bb.__offset(this.bb_pos, 18);
    if (i) {
      return (t || new play_flow_js_1.PlayFlow()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  exitMontageType() {
    var t = this.bb.__offset(this.bb_pos, 20);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_montage_config_js_1.UnionMontageConfig.NONE;
    }
  }
  exitMontage(t) {
    var i = this.bb.__offset(this.bb_pos, 22);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  exitFlow(t) {
    var i = this.bb.__offset(this.bb_pos, 24);
    if (i) {
      return (t || new play_flow_js_1.PlayFlow()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startNpcUiInteractOnShop(t) {
    t.startObject(11);
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
  static addShopSuccessMontage(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addEnterFlow(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addShopFailedFlow(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addShopSuccessFlow(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addWorkingFlow(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static addExitMontageType(t, i) {
    t.addFieldInt8(8, i, union_montage_config_js_1.UnionMontageConfig.NONE);
  }
  static addExitMontage(t, i) {
    t.addFieldOffset(9, i, 0);
  }
  static addExitFlow(t, i) {
    t.addFieldOffset(10, i, 0);
  }
  static endNpcUiInteractOnShop(t) {
    return t.endObject();
  }
}
exports.NpcUiInteractOnShop = NpcUiInteractOnShop;
//# sourceMappingURL=npc-ui-interact-on-shop.js.map
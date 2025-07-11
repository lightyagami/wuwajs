"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleControl2 = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const bullet_cfg_js_1 = require("../fb-component/bullet-cfg.js");
const destroy_cfg_js_1 = require("../fb-component/destroy-cfg.js");
const hold_cfg_js_1 = require("../fb-component/hold-cfg.js");
const search_target_cfg_js_1 = require("../fb-component/search-target-cfg.js");
const tele_control_base_cfg_js_1 = require("../fb-component/tele-control-base-cfg.js");
const throw_cfg_js_1 = require("../fb-component/throw-cfg.js");
class TeleControl2 {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTeleControl2(t, e) {
    return (e || new TeleControl2()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTeleControl2(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TeleControl2()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  baseCfg(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new tele_control_base_cfg_js_1.TeleControlBaseCfg()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  searchTargetCfg(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return (t || new search_target_cfg_js_1.SearchTargetCfg()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  bulletCfg(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return (t || new bullet_cfg_js_1.BulletCfg()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  destroyCfg(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return (t || new destroy_cfg_js_1.DestroyCfg()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  holdCfg(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    if (e) {
      return (t || new hold_cfg_js_1.HoldCfg()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  throwCfg(t) {
    var e = this.bb.__offset(this.bb_pos, 16);
    if (e) {
      return (t || new throw_cfg_js_1.ThrowCfg()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  playerStateRestritionId() {
    var t = this.bb.__offset(this.bb_pos, 18);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startTeleControl2(t) {
    t.startObject(8);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addBaseCfg(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addSearchTargetCfg(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addBulletCfg(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addDestroyCfg(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static addHoldCfg(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static addThrowCfg(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static addPlayerStateRestritionId(t, e) {
    t.addFieldInt32(7, e, 0);
  }
  static endTeleControl2(t) {
    return t.endObject();
  }
}
exports.TeleControl2 = TeleControl2;
//# sourceMappingURL=tele-control2.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectorRange = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const connector_effect_config_js_1 = require("../fb-component/connector-effect-config.js");
const dynamic_entity_match_js_1 = require("../fb-component/dynamic-entity-match.js");
class ConnectorRange {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsConnectorRange(t, e) {
    return (e || new ConnectorRange()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsConnectorRange(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ConnectorRange()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  effectConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new connector_effect_config_js_1.ConnectorEffectConfig()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  activeState(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  enterRange() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  leaveRange() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  matchConditions(t, e) {
    var i = this.bb.__offset(this.bb_pos, 14);
    if (i) {
      return (e || new dynamic_entity_match_js_1.DynamicEntityMatch()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  matchConditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  keepConditions(t, e) {
    var i = this.bb.__offset(this.bb_pos, 16);
    if (i) {
      return (e || new dynamic_entity_match_js_1.DynamicEntityMatch()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  keepConditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  connectedState(t) {
    var e = this.bb.__offset(this.bb_pos, 18);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  disconnectedState(t) {
    var e = this.bb.__offset(this.bb_pos, 20);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startConnectorRange(t) {
    t.startObject(9);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEffectConfig(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addActiveState(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addEnterRange(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addLeaveRange(t, e) {
    t.addFieldInt32(4, e, 0);
  }
  static addMatchConditions(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static createMatchConditionsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startMatchConditionsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addKeepConditions(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static createKeepConditionsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startKeepConditionsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addConnectedState(t, e) {
    t.addFieldOffset(7, e, 0);
  }
  static addDisconnectedState(t, e) {
    t.addFieldOffset(8, e, 0);
  }
  static endConnectorRange(t) {
    return t.endObject();
  }
}
exports.ConnectorRange = ConnectorRange;
//# sourceMappingURL=connector-range.js.map
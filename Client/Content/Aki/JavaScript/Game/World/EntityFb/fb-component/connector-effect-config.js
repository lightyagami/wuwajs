"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectorEffectConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ConnectorEffectConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsConnectorEffectConfig(t, e) {
    return (e || new ConnectorEffectConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsConnectorEffectConfig(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ConnectorEffectConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  effectPath(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  startPoint(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  endPoint(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startConnectorEffectConfig(t) {
    t.startObject(3);
  }
  static addEffectPath(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addStartPoint(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addEndPoint(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endConnectorEffectConfig(t) {
    return t.endObject();
  }
  static createConnectorEffectConfig(t, e, n, o) {
    ConnectorEffectConfig.startConnectorEffectConfig(t);
    ConnectorEffectConfig.addEffectPath(t, e);
    ConnectorEffectConfig.addStartPoint(t, n);
    ConnectorEffectConfig.addEndPoint(t, o);
    return ConnectorEffectConfig.endConnectorEffectConfig(t);
  }
}
exports.ConnectorEffectConfig = ConnectorEffectConfig;
//# sourceMappingURL=connector-effect-config.js.map
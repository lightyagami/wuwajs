"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnrichmentAreaComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnrichmentAreaComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsEnrichmentAreaComponent(t, e) {
    return (e || new EnrichmentAreaComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEnrichmentAreaComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new EnrichmentAreaComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  refEntityIds(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  refEntityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  refEntityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  fogIds(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  fogIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  fogIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  static startEnrichmentAreaComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addRefEntityIds(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createRefEntityIdsVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addInt32(r[t]);
    }
    return e.endVector();
  }
  static startRefEntityIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addFogIds(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createFogIdsVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addInt32(r[t]);
    }
    return e.endVector();
  }
  static startFogIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endEnrichmentAreaComponent(t) {
    return t.endObject();
  }
  static createEnrichmentAreaComponent(t, e, r, i) {
    EnrichmentAreaComponent.startEnrichmentAreaComponent(t);
    EnrichmentAreaComponent.addDisabled(t, e);
    EnrichmentAreaComponent.addRefEntityIds(t, r);
    EnrichmentAreaComponent.addFogIds(t, i);
    return EnrichmentAreaComponent.endEnrichmentAreaComponent(t);
  }
}
exports.EnrichmentAreaComponent = EnrichmentAreaComponent;
//# sourceMappingURL=enrichment-area-component.js.map
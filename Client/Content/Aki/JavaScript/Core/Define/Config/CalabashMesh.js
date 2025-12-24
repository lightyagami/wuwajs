"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashMesh = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class CalabashMesh {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get MeshId() {
    return this.meshid();
  }
  get OldEffects() {
    return GameUtils_1.GameUtils.ConvertToArray(this.oldeffectsLength(), this.oldeffects, this);
  }
  get NewEffects() {
    return GameUtils_1.GameUtils.ConvertToArray(this.neweffectsLength(), this.neweffects, this);
  }
  get HideParaglider() {
    return this.hideparaglider();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsCalabashMesh(t, s) {
    return (s || new CalabashMesh()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  meshid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetOldeffectsAt(t) {
    return this.oldeffects(t);
  }
  oldeffects(t, s) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, s) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  oldeffectsLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetNeweffectsAt(t) {
    return this.neweffects(t);
  }
  neweffects(t, s) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, s) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  neweffectsLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  hideparaglider() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
}
exports.CalabashMesh = CalabashMesh;
//# sourceMappingURL=CalabashMesh.js.map
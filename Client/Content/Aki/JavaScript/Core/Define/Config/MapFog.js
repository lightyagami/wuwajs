"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapFog = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MapFog {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Fog() {
    return this.fog();
  }
  get MapId() {
    return this.mapid();
  }
  get AreaId() {
    return this.areaid();
  }
  get GravityFlip() {
    return this.gravityflip();
  }
  get UnlockCondition() {
    return this.unlockcondition();
  }
  get FogUnlockPosition() {
    return GameUtils_1.GameUtils.ConvertToArray(this.fogunlockpositionLength(), this.fogunlockposition, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMapFog(t, i) {
    return (i || new MapFog()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  fog() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  areaid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  gravityflip() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetFogunlockpositionAt(t) {
    return this.fogunlockposition(t);
  }
  fogunlockposition(t) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  fogunlockpositionLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  fogunlockpositionArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.MapFog = MapFog;
//# sourceMappingURL=MapFog.js.map
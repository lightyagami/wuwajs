"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EncircleUtils = undefined;
class EncircleUtils {
  static PlanePosToKey(s, o) {
    return this.HexPosToKey(this.PlanePosToHexPos(s, o));
  }
  static HexPosToKey(s) {
    return s.PosY * this.wVg + s.PosX;
  }
  static GetPosFromKey(s) {
    return {
      PosX: s % this.wVg,
      PosY: Math.floor(s / this.wVg)
    };
  }
  static PlanePosToHexPos(s, o) {
    return {
      PosX: s * 2 + (o + 1) % 2 * 1,
      PosY: o
    };
  }
  static HexPosToPlanePos(s) {
    var o = s.PosY;
    return {
      PosX: (s.PosX - (o + 1) % 2) / 2,
      PosY: o
    };
  }
}
(exports.EncircleUtils = EncircleUtils).wVg = 100;
EncircleUtils.Directions = [{
  PosX: 2,
  PosY: 0
}, {
  PosX: 1,
  PosY: -1
}, {
  PosX: -1,
  PosY: -1
}, {
  PosX: -2,
  PosY: 0
}, {
  PosX: -1,
  PosY: 1
}, {
  PosX: 1,
  PosY: 1
}]; //# sourceMappingURL=EncircleUtils.js.map
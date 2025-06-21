"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CharacterHitOptimize = void 0;
const Time_1 = require("../../../../../../Core/Common/Time"),
  COOLDOWN_TIME_MS = 1e3;
class CharacterHitOptimize {
  constructor() {
    this.oX1 = 0
  }
  IsInCooling() {
    return Time_1.Time.WorldTime - this.oX1 < COOLDOWN_TIME_MS
  }
  UpdateLastHitTime() {
    this.oX1 = Time_1.Time.WorldTime
  }
}
exports.CharacterHitOptimize = CharacterHitOptimize;
//# sourceMappingURL=CharacterHitOptimize.js.map
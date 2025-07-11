"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterHitOptimize = undefined;
const Time_1 = require("../../../../../../Core/Common/Time");
const COOLDOWN_TIME_MS = 1000;
class CharacterHitOptimize {
  constructor() {
    this.mY1 = 0;
  }
  IsInCooling() {
    return Time_1.Time.WorldTime - this.mY1 < COOLDOWN_TIME_MS;
  }
  UpdateLastHitTime() {
    this.mY1 = Time_1.Time.WorldTime;
  }
}
exports.CharacterHitOptimize = CharacterHitOptimize;
//# sourceMappingURL=CharacterHitOptimize.js.map
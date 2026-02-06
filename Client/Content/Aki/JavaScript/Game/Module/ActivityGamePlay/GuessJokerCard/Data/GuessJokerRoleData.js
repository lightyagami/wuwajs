"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerRoleData = undefined;
class GuessJokerRoleData {
  constructor(t, s) {
    this.H2f = 1;
    this.j2f = 0;
    this.F$f = 0;
    this.H2f = t;
    this.j2f = s;
    this.F$f = s;
  }
  RemoveHp(t) {
    let s = this.j2f - t;
    if ((s = s < 0 ? 0 : s) > this.F$f) {
      s = this.F$f;
    }
    this.j2f = s;
  }
  SetHp(t) {
    let s = t < 0 ? 0 : t;
    if (t > this.F$f) {
      s = this.F$f;
    }
    this.j2f = s;
  }
  GetHp() {
    return this.j2f;
  }
  GetMaxHp() {
    return this.F$f;
  }
  GetPlayerType() {
    return this.H2f;
  }
}
exports.GuessJokerRoleData = GuessJokerRoleData;
//# sourceMappingURL=GuessJokerRoleData.js.map
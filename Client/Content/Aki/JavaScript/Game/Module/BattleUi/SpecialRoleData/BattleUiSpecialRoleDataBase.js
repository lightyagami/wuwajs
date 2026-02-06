"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiSpecialRoleDataBase = undefined;
class BattleUiSpecialRoleDataBase {
  constructor() {
    this.RoleData = undefined;
  }
  Init(t) {
    this.RoleData = t;
    this.OnInit();
  }
  Clear() {
    this.OnClear();
    this.RoleData = undefined;
  }
  OnChangeRole(t) {}
  OnInit() {}
  OnClear() {}
}
exports.BattleUiSpecialRoleDataBase = BattleUiSpecialRoleDataBase;
//# sourceMappingURL=BattleUiSpecialRoleDataBase.js.map
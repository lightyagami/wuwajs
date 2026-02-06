"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiSpecialRoleDataLuPa = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const BattleUiSpecialRoleDataBase_1 = require("./BattleUiSpecialRoleDataBase");
class BattleUiSpecialRoleDataLuPa extends BattleUiSpecialRoleDataBase_1.BattleUiSpecialRoleDataBase {
  OnInit() {
    if (this.RoleData?.ActorComp?.IsAutonomousProxy) {
      ControllerHolder_1.ControllerHolder.HudUnitController.TryCreateHud(7);
    }
  }
  OnClear() {
    if (this.RoleData?.ActorComp?.IsAutonomousProxy) {
      ControllerHolder_1.ControllerHolder.HudUnitController.TryDestroyHud(7);
    }
  }
}
exports.BattleUiSpecialRoleDataLuPa = BattleUiSpecialRoleDataLuPa;
//# sourceMappingURL=BattleUiSpecialRoleDataLuPa.js.map
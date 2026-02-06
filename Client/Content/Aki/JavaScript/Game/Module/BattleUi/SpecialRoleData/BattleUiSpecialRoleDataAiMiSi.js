"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiSpecialRoleDataAiMiSi = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const BattleUiSpecialRoleDataBase_1 = require("./BattleUiSpecialRoleDataBase");
class BattleUiSpecialRoleDataAiMiSi extends BattleUiSpecialRoleDataBase_1.BattleUiSpecialRoleDataBase {
  constructor() {
    super(...arguments);
    this.bHa = false;
  }
  OnInit() {
    this.bHa = this.RoleData?.ActorComp?.IsAutonomousProxy ?? false;
    if (this.bHa) {
      this.Lri();
    }
  }
  OnClear() {
    this.bHa = false;
    this.Lri();
  }
  Lri() {
    if (this.bHa) {
      ControllerHolder_1.ControllerHolder.HudUnitController.TryCreateHud(10);
    } else {
      ControllerHolder_1.ControllerHolder.HudUnitController.TryDestroyHud(10);
    }
  }
}
exports.BattleUiSpecialRoleDataAiMiSi = BattleUiSpecialRoleDataAiMiSi;
//# sourceMappingURL=BattleUiSpecialRoleDataAiMiSi.js.map
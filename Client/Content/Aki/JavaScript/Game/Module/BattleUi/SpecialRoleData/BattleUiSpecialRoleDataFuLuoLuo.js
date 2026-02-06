"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiSpecialRoleDataFuLuoLuo = undefined;
const BattleUiSpecialRoleDataBase_1 = require("./BattleUiSpecialRoleDataBase");
class BattleUiSpecialRoleDataFuLuoLuo extends BattleUiSpecialRoleDataBase_1.BattleUiSpecialRoleDataBase {
  constructor() {
    super(...arguments);
    this.Dgd = (t, e) => {
      this.RoleData.SetHasEnergyTag(e);
    };
  }
  OnInit() {
    if (this.RoleData) {
      this.RoleData.CheckEnergyTag = true;
      this.RoleData.ListenForTagSignificantChanged(414280119, this.Dgd, true);
    }
  }
}
exports.BattleUiSpecialRoleDataFuLuoLuo = BattleUiSpecialRoleDataFuLuoLuo;
//# sourceMappingURL=BattleUiSpecialRoleDataFuLuoLuo.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorBaseInfoComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const RoleFavorViewComponentBase_1 = require("./RoleFavorViewComponentBase");
class RoleFavorBaseInfoComponent extends RoleFavorViewComponentBase_1.RoleFavorViewComponentBase {
  constructor() {
    super(...arguments);
    this.dFe = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UINiagara]];
  }
  OnSetData(e) {
    this.dFe = e.RoleId;
  }
  OnRefreshView() {
    var e;
    var o;
    if (this.dFe) {
      e = this.GetText(0);
      o = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(this.dFe);
      LguiUtil_1.LguiUtil.SetLocalText(e, "FavorBaseInfo");
      this.GetText(2).SetUIActive(false);
      this.GetText(3).ShowTextNew(o.Sex);
      this.GetText(4).ShowTextNew(o.Country);
      this.GetText(5).ShowTextNew(o.Influence);
      this.GetText(6).ShowTextNew(o.Info);
    }
  }
  OnStart() {
    var e = this.GetText(6);
    if (!ControllerHolder_1.ControllerHolder.TermExplanationController.IsUiTextRegistered(e)) {
      ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlink(e, 1, 5, 1);
    }
  }
  OnBeforeDestroy() {
    this.dFe = undefined;
    var e = this.GetText(6);
    if (ControllerHolder_1.ControllerHolder.TermExplanationController.IsUiTextRegistered(e)) {
      ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(e);
    }
  }
}
exports.RoleFavorBaseInfoComponent = RoleFavorBaseInfoComponent;
//# sourceMappingURL=RoleFavorBaseInfoComponent.js.map
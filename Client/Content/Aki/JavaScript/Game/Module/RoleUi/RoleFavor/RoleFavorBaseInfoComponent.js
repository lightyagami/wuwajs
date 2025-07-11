"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorBaseInfoComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RoleFavorBaseInfoComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e, r) {
    super();
    this.dFe = 0;
    this.dFe = r;
    if (e) {
      this.CreateThenShowByActor(e.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UINiagara]];
  }
  OnStart() {
    var e;
    var r;
    if (this.dFe) {
      r = this.GetText(0);
      e = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(this.dFe);
      LguiUtil_1.LguiUtil.SetLocalText(r, "FavorBaseInfo");
      this.GetText(2).SetUIActive(false);
      this.GetText(3).ShowTextNew(e.Sex);
      this.GetText(4).ShowTextNew(e.Country);
      this.GetText(5).ShowTextNew(e.Influence);
      this.GetText(6).ShowTextNew(e.Info);
      r = this.GetText(6);
      if (!ControllerHolder_1.ControllerHolder.TermExplanationController.IsUiTextRegistered(r)) {
        ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlink(r, 1, 5, 1);
      }
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
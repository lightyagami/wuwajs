"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorPowerInfoComponent = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RoleFavorPowerInfoComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e, o) {
    super();
    this.guo = o;
    if (e) {
      this.CreateThenShowByActor(e.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UINiagara], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText]];
  }
  OnStart() {
    var e = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalText(e, "FavorPowerFile");
    this.GetText(3).ShowTextNew(this.guo.TalentName);
    this.GetText(4).ShowTextNew(this.guo.TalentDoc);
    this.GetText(5).ShowTextNew(this.guo.TalentCertification);
    if (!ControllerHolder_1.ControllerHolder.TermExplanationController.IsUiTextRegistered(this.GetText(3))) {
      ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlink(this.GetText(3), 1, 5, 1);
    }
    if (!ControllerHolder_1.ControllerHolder.TermExplanationController.IsUiTextRegistered(this.GetText(4))) {
      ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlink(this.GetText(4), 1, 5, 1);
    }
    if (!ControllerHolder_1.ControllerHolder.TermExplanationController.IsUiTextRegistered(this.GetText(5))) {
      ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlink(this.GetText(5), 1, 5, 1);
    }
  }
  OnBeforeDestroy() {
    this.guo = undefined;
    if (ControllerHolder_1.ControllerHolder.TermExplanationController.IsUiTextRegistered(this.GetText(3))) {
      ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(3));
    }
    if (ControllerHolder_1.ControllerHolder.TermExplanationController.IsUiTextRegistered(this.GetText(4))) {
      ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(4));
    }
    if (ControllerHolder_1.ControllerHolder.TermExplanationController.IsUiTextRegistered(this.GetText(5))) {
      ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(5));
    }
  }
}
exports.RoleFavorPowerInfoComponent = RoleFavorPowerInfoComponent;
//# sourceMappingURL=RoleFavorPowerInfoComponent.js.map
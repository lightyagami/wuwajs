"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorPowerInfoComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const RoleFavorViewComponentBase_1 = require("./RoleFavorViewComponentBase");
class RoleFavorPowerInfoComponent extends RoleFavorViewComponentBase_1.RoleFavorViewComponentBase {
  constructor() {
    super(...arguments);
    this.guo = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UINiagara], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText]];
  }
  OnSetData(o) {
    if (o.FavorContentType !== 1) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 78, "不支持的好感度类型", ["favorTabType", o.FavorContentType]);
      }
    } else {
      this.guo = o.ConfigData;
    }
  }
  OnRefreshView() {
    var o;
    if (this.guo) {
      o = this.GetText(0);
      LguiUtil_1.LguiUtil.SetLocalText(o, "FavorPowerFile");
      this.GetText(3).ShowTextNew(this.guo.TalentName);
      this.GetText(4).ShowTextNew(this.guo.TalentDoc);
      this.GetText(5).ShowTextNew(this.guo.TalentCertification);
    }
  }
  OnStart() {
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
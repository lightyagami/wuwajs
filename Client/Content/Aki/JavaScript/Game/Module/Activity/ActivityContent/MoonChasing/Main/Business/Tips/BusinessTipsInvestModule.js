"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BusinessTipsInvestModule = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../../Ui/Base/UiPanelBase");
const NumberSelectComponent_1 = require("../../../../../../Common/NumberSelect/NumberSelectComponent");
class BusinessTipsInvestModule extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.NumberSelect = undefined;
    this.roa = undefined;
    this.QGe = e => {
      var r = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetInvestData(e);
      this.GetText(0).SetText(r.SuccessProbability.toString());
      this.GetText(1).SetText(r.Ratio.toString());
      this.roa.SetText(e.toString());
    };
    this.Jke = () => {
      var e = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetInvestData(0);
      var r = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData();
      ControllerHolder_1.ControllerHolder.MoonChasingController.InvestRequest(r.EntrustId, 0, e.Ratio, e.Ratio);
    };
    this.Mke = () => {
      var e = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData();
      var r = this.NumberSelect.GetSelectNumber();
      var a = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetInvestData(r);
      var n = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetInvestData(0);
      ControllerHolder_1.ControllerHolder.MoonChasingController.InvestRequest(e.EntrustId, r, a.Ratio, n.Ratio);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UITexture], [6, UE.UIText]];
    this.BtnBindInfo = [[3, this.Jke], [4, this.Mke]];
  }
  OnStart() {
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetCoinItemId();
    this.SetItemIcon(this.GetTexture(5), e);
    this.roa = this.GetText(6);
    var e = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData();
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(e.EntrustId);
    var r = ModelManager_1.ModelManager.MoonChasingModel.GetCoinValue();
    var e = r > e.InvestLimit ? e.InvestLimit : r;
    this.NumberSelect = new NumberSelectComponent_1.NumberSelectComponent(this.GetItem(2));
    this.NumberSelect.SetLimitMaxValueForce(e);
    var r = {
      MaxNumber: e,
      ValueChangeFunction: this.QGe
    };
    this.NumberSelect.Init(r);
  }
}
exports.BusinessTipsInvestModule = BusinessTipsInvestModule;
//# sourceMappingURL=BusinessTipsInvestModule.js.map
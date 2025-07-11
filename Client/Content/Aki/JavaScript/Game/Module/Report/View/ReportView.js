"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReportView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const ReportController_1 = require("../ReportController");
const ReportRowView_1 = require("./ReportRowView");
class ReportView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.tao = undefined;
    this.iao = -1;
    this.oao = undefined;
    this.rao = undefined;
    this.CreateGrid = () => {
      var i = new ReportRowView_1.ReportRowView();
      i.SetToggleFunction(this.N8e);
      return i;
    };
    this.uHe = () => {
      UiManager_1.UiManager.CloseView("ReportView");
    };
    this.L3e = () => {
      var i = this.GetInputText(2);
      if (this.iao === -1) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ReportReasonNotSelect");
      } else {
        ReportController_1.ReportController.ReportPlayerRequest(this.tao, this.iao, i.GetText());
      }
    };
    this.N8e = i => {
      this.iao = i;
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UITextInputComponent], [3, UE.UILoopScrollViewComponent], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.uHe], [1, this.L3e]];
  }
  OnStart() {
    this.tao = this.OpenParam;
    this.rao = ConfigManager_1.ConfigManager.ReportConfig.GetReportConfigList();
    if (this.rao === undefined) {
      this.rao = [];
    }
    this.oao = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(3), this.GetItem(4).GetOwner(), this.CreateGrid);
    if (this.rao.length > 0) {
      this.iao = this.rao[0].Id;
    }
    this.oao.ReloadData(this.rao);
  }
  OnBeforeDestroy() {
    if (this.oao) {
      this.oao.ClearGridProxies();
    }
  }
}
exports.ReportView = ReportView;
//# sourceMappingURL=ReportView.js.map
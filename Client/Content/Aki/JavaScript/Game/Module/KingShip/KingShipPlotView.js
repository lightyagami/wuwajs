"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KingShipPlotView = undefined;
const UE = require("ue");
const SpeakerById_1 = require("../../../Core/Define/ConfigQuery/SpeakerById");
const PublicUtil_1 = require("../../Common/PublicUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../Ui/UiManager");
const DynamicMaskButton_1 = require("../DynamicMask/DynamicMaskButton");
class KingShipPlotView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.k2u = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.k2u = new KingShipPlotItem();
    await this.k2u.CreateThenShowByResourceIdAsync("UiView_PlotD_Prefab", this.GetItem(1));
  }
  OnStart() {
    var i = this.OpenParam;
    this.k2u?.RefreshPlot(i.FlowId);
    this.SetTextureByPath(i.Path, this.GetTexture(0));
  }
  OnBeforeDestroy() {
    this.OpenParam.OnCloseCallBack();
  }
}
exports.KingShipPlotView = KingShipPlotView;
class KingShipPlotItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.O2u = [];
    this.q2u = 0;
    this.lLt = undefined;
    this.XTt = () => {
      this.q2u++;
      this.ShowPlot();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.lLt = new DynamicMaskButton_1.DynamicMaskButton();
    this.lLt.SetButtonFunction(this.XTt);
    await this.lLt.Init();
    this.lLt.GetRootItem().SetAsFirstHierarchy();
    this.lLt.SetUiActive(true);
  }
  RefreshPlot(i) {
    this.O2u = [];
    this.q2u = 0;
    for (const e of ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(i[0], Number(i[1]), Number(i[2]))) {
      if (e.Name === "ShowTalk") {
        for (const t of e.Params.TalkItems) {
          this.O2u.push([t.WhoId ?? 0, t.TidTalk ?? ""]);
        }
      }
    }
    this.ShowPlot();
  }
  ShowPlot() {
    var i;
    var e = this.O2u.length;
    if (this.q2u >= e) {
      this.lLt?.SetUiActive(false);
      UiManager_1.UiManager.CloseView("KingShipPlotView");
    } else {
      e = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(this.O2u[this.q2u][1]) ?? "";
      this.GetText(2).SetText(e);
      if (e = (e = this.O2u[this.q2u][0]) ? SpeakerById_1.configSpeakerById.GetConfig(e) : undefined) {
        i = PublicUtil_1.PublicUtil.GetConfigTextByTable(0, e.Id) ?? "";
        this.GetText(0)?.SetText(i);
        if (!e.Title) {
          this.GetText(1)?.SetUIActive(false);
        }
        this.GetText(0)?.SetUIActive(true);
        i = PublicUtil_1.PublicUtil.GetConfigTextByTable(1, e.Id) ?? "";
        this.GetText(1)?.SetText(i);
      }
    }
  }
  OnBeforeDestroy() {
    this.lLt?.Destroy();
  }
}
//# sourceMappingURL=KingShipPlotView.js.map
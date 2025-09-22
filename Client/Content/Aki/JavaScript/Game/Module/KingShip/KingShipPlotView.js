"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KingShipPlotView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../Ui/UiManager");
const DynamicMaskButton_1 = require("../DynamicMask/DynamicMaskButton");
const PlotTextLogic_1 = require("../Plot/PlotView/PlotTextLogic");
const CLICK_AUDIO_EVENT = "play_ui_ia_com_confirm";
class KingShipPlotView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.GFu = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.GFu = new KingShipPlotItem();
    await this.GFu.CreateThenShowByResourceIdAsync("UiView_PlotD_Prefab", this.GetItem(1));
  }
  OnStart() {
    var i = this.OpenParam;
    this.GFu?.RefreshPlot(i.FlowId);
    this.SetTextureByPath(i.Path, this.GetTexture(0));
  }
  OnBeforeDestroy() {
    this.OpenParam.OnCloseCallBack();
  }
  async OnPlayingCloseSequenceAsync() {
    await this.GFu.DestroyPortraitItem();
  }
}
exports.KingShipPlotView = KingShipPlotView;
class KingShipPlotItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.FFu = [];
    this.NFu = 0;
    this.lLt = undefined;
    this.geo = undefined;
    this.XTt = () => {
      this.NFu++;
      this.ShowPlot();
      AudioSystem_1.AudioSystem.PostEvent(CLICK_AUDIO_EVENT);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIScrollViewComponent]];
  }
  async OnBeforeStartAsync() {
    this.lLt = new DynamicMaskButton_1.DynamicMaskButton();
    this.lLt.SetButtonFunction(this.XTt);
    await this.lLt.Init();
    this.lLt.GetRootItem().SetAsFirstHierarchy();
    this.lLt.SetUiActive(true);
    var i = this.GetScrollView(8);
    i?.SetCanScroll(false);
    i?.SetRayCastTargetForScrollView(false);
    this.geo = new PlotTextLogic_1.PlotTextCommonLogic(this.GetItem(4), this.GetText(0), this.GetText(1), this.GetText(2), this.GetItem(3), i);
  }
  RefreshPlot(i) {
    this.FFu = [];
    this.NFu = 0;
    for (const t of ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(i[0], Number(i[1]), Number(i[2]))) {
      if (t.Name === "ShowTalk") {
        for (const e of t.Params.TalkItems) {
          this.FFu.push(e);
        }
      }
    }
    this.ShowPlot();
  }
  ShowPlot() {
    var i = this.FFu.length;
    if (this.NFu >= i) {
      this.lLt?.SetUiActive(false);
      UiManager_1.UiManager.CloseView("KingShipPlotView");
    } else {
      i = this.FFu[this.NFu];
      this.geo?.UpdatePlotSubtitle(i);
    }
  }
  OnBeforeDestroy() {
    this.lLt?.Destroy();
    this.geo?.Clear();
  }
  async DestroyPortraitItem() {
    await this.geo.DestroyPortraitItem();
  }
}
//# sourceMappingURL=KingShipPlotView.js.map
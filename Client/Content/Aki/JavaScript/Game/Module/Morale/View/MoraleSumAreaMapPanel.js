"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleSumAreaMapPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const MoraleAreaPlotPanel_1 = require("./MoraleAreaPlotPanel");
const MoraleSumAreaTitleItem_1 = require("./MoraleSumAreaTitleItem");
class MoraleSumAreaMapPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.AreaData = undefined;
    this.AreaTitle = undefined;
    this.AreaPlotPanel = undefined;
    this.OnBtnSelf = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Morale", 69, "点击了区域总览 - 单个区域地图面板", ["AreaId", this.AreaData.Id]);
      }
      UiManager_1.UiManager.OpenView("MoraleAreaInfoView", {
        AreaId: this.AreaData.Id
      });
    };
  }
  async Init(e, t) {
    this.AreaData = t;
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnBtnSelf]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var e = this.GetItem(1);
    this.AreaTitle = new MoraleSumAreaTitleItem_1.MoraleSumAreaTitleItem();
    await this.AreaTitle.Init(e, this.AreaData);
    var e = this.GetItem(3);
    this.AreaPlotPanel = new MoraleAreaPlotPanel_1.MoraleAreaPlotPanel();
    await this.AreaPlotPanel.Init(e, this.AreaData);
  }
  UpdateData() {
    this.AreaTitle.UpdateData();
    this.AreaPlotPanel?.UpdateData();
    this.CheckAreaLight();
  }
  InitData() {
    this.AreaTitle.UpdateData();
    this.AreaPlotPanel.HideAllPlot();
    this.CheckAreaLight();
  }
  CheckAreaLight() {
    var e = this.AreaData.IsAllUiFlagActive();
    this.GetItem(4)?.SetUIActive(e);
  }
  SetRecommendLightActive(e) {
    this.GetItem(5)?.SetUIActive(e);
  }
  async PlayEnterEffect(e) {
    var t;
    var e = this.GetBelongCurAreaPlotItemList(e);
    if (!(e.length <= 0)) {
      t = e.map(e => e.PlotData.Id);
      this.LogIdList(t, "播放入场效果 => Start");
      await Promise.all(e.map(async e => e.PlayEnterEffect()));
      this.LogIdList(t, "播放入场效果 => End");
    }
  }
  async PlayLoopEffect(e) {
    e = this.GetBelongCurAreaPlotItemList(e);
    if (!(e.length <= 0)) {
      await Promise.all(e.map(async e => e.PlayLoopEffect()));
    }
  }
  async PlayNewUnlockEffect(e) {
    var t;
    var e = this.GetBelongCurAreaPlotItemList(e);
    if (!(e.length <= 0)) {
      t = e.map(e => e.PlotData.Id);
      this.LogIdList(t, "播放新解锁效果 => Start");
      await Promise.all(e.map(async e => e.PlayNewUnlockEffect()));
      this.LogIdList(t, "播放新解锁效果 => End");
    }
  }
  LogIdList(e, t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, t, ["格子列表", e], ["区域id", this.AreaData.Id]);
    }
  }
  GetBelongCurAreaPlotItemList(e) {
    const t = this.AreaPlotPanel.PlotMap;
    return e.filter(e => e.AreaId === this.AreaData.Id && t.has(e.Id)).map(e => t.get(e.Id));
  }
  OnTick(t) {
    this.AreaPlotPanel.PlotList.forEach(e => {
      e.OnTick(t);
    });
  }
}
exports.MoraleSumAreaMapPanel = MoraleSumAreaMapPanel;
//# sourceMappingURL=MoraleSumAreaMapPanel.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleAreaInfoMapPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const MoraleAreaInfoFlagItem_1 = require("./MoraleAreaInfoFlagItem");
const MoraleAreaPlotPanel_1 = require("./MoraleAreaPlotPanel");
class MoraleAreaInfoMapPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.PlotPanel = undefined;
    this.FlagItemList = [];
    this.FlagItemMap = new Map();
    this.AreaData = undefined;
    this.ClickCallback = undefined;
    this.G$1 = e => {
      this.ClickCallback?.(e);
    };
  }
  async Init(e, a) {
    e = "Pnl_MoraleAreaDesc" + (this.AreaData = e).Id;
    await this.CreateThenShowByResourceIdAsync(e, a);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.PlotPanel = new MoraleAreaPlotPanel_1.MoraleAreaPlotPanel();
    await this.PlotPanel.Init(this.GetItem(1), this.AreaData);
    const r = [];
    this.AreaData.GetUiFlagList().forEach(e => {
      var a = new MoraleAreaInfoFlagItem_1.MoraleAreaInfoFlagItem();
      var t = this.GetItem(2);
      var i = e.TypeConfig.ResId;
      var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
      a.ClickCallback = this.G$1;
      r.push(a.Init(i, t, e));
      this.FlagItemList.push(a);
      this.FlagItemMap.set(e.Id, a);
    });
    await Promise.all(r);
  }
  UpdateData() {
    this.PlotPanel.UpdateData();
    this.F$1();
  }
  UpdateFlagState() {
    this.FlagItemList.forEach(e => {
      e.UpdateSelectState();
    });
  }
  F$1() {
    this.FlagItemList.forEach(e => {
      e.UpdateData();
      var a = this.PlotPanel.PlotMap.get(e.FlagData.Config.FlagPosPlotId);
      if (a) {
        e.UpdatePosition(a.GetRootItem());
      }
    });
  }
  PlayStartSequence() {
    this.FlagItemList.forEach(e => {
      e.PlayStartSequence();
    });
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var a;
    if (e && !(e.length <= 0) && e[0] === "BossFlag") {
      for (const t of this.FlagItemList) {
        if (t.FlagData.IsHighDifficultyChallenge()) {
          if (a = t.GetRootItem()) {
            return [a, a];
          } else {
            return undefined;
          }
        }
      }
    }
  }
}
exports.MoraleAreaInfoMapPanel = MoraleAreaInfoMapPanel;
//# sourceMappingURL=MoraleAreaInfoMapPanel.js.map
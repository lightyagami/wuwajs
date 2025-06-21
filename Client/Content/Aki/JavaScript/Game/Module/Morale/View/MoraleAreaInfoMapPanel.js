"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleAreaInfoMapPanel = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  MoraleAreaInfoFlagItem_1 = require("./MoraleAreaInfoFlagItem"),
  MoraleAreaPlotPanel_1 = require("./MoraleAreaPlotPanel");
class MoraleAreaInfoMapPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.PlotPanel = void 0, this.FlagItemList = [], this.FlagItemMap = new Map, this.AreaData = void 0, this.ClickCallback = void 0, this.i$1 = e => {
      this.ClickCallback?.(e)
    }
  }
  async Init(e, a) {
    e = "Pnl_MoraleAreaDesc" + (this.AreaData = e).Id;
    await this.CreateThenShowByResourceIdAsync(e, a)
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(), this.PlotPanel = new MoraleAreaPlotPanel_1.MoraleAreaPlotPanel, await this.PlotPanel.Init(this.GetItem(1), this.AreaData);
    const r = [];
    this.AreaData.GetUiFlagList().forEach(e => {
      var a = new MoraleAreaInfoFlagItem_1.MoraleAreaInfoFlagItem,
        t = this.GetItem(2),
        i = e.TypeConfig.ResId,
        i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
      a.ClickCallback = this.i$1, r.push(a.Init(i, t, e)), this.FlagItemList.push(a), this.FlagItemMap.set(e.Id, a)
    }), await Promise.all(r)
  }
  UpdateData() {
    this.PlotPanel.UpdateData(), this.r$1()
  }
  UpdateFlagState() {
    this.FlagItemList.forEach(e => {
      e.UpdateSelectState()
    })
  }
  r$1() {
    this.FlagItemList.forEach(e => {
      e.UpdateData();
      var a = this.PlotPanel.PlotMap.get(e.FlagData.Config.FlagPosPlotId);
      a && e.UpdatePosition(a.GetRootItem())
    })
  }
  PlayStartSequence() {
    this.FlagItemList.forEach(e => {
      e.PlayStartSequence()
    })
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var a;
    if (e && !(e.length <= 0) && "BossFlag" === e[0])
      for (const t of this.FlagItemList)
        if (t.FlagData.IsHighDifficultyChallenge()) return (a = t.GetRootItem()) ? [a, a] : void 0
  }
}
exports.MoraleAreaInfoMapPanel = MoraleAreaInfoMapPanel;
//# sourceMappingURL=MoraleAreaInfoMapPanel.js.map
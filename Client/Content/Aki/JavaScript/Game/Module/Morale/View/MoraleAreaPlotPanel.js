"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleAreaPlotPanel = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  MoraleAreaPlotItem_1 = require("./MoraleAreaPlotItem");
class MoraleAreaPlotPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.AreaData = void 0, this.PlotList = [], this.FlagToPlotMap = new Map, this.PlotMap = new Map, this.AllPlotIdList = []
  }
  async Init(t, e) {
    this.AreaData = e, this.AllPlotIdList = this.AreaData.GetAllPlotIdList(), await this.CreateThenShowByActorAsync(t.GetOwner())
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [], this.AllPlotIdList.forEach((t, e) => {
      this.ComponentRegisterInfos.push([e, UE.UIItem])
    })
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(), await this.s$1()
  }
  async s$1() {
    const o = [];
    this.AllPlotIdList.forEach((t, e) => {
      var i, s, a = this.GetItem(e);
      a ? (i = this.AreaData.GetPlotData(t)) ? (s = new MoraleAreaPlotItem_1.MoraleAreaPlotItem, o.push(s.Init(a, i)), this.a$1(s)) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, "地块Id找不到地块信息", ["id", t], ["index", e], ["AreaId", this.AreaData.Id]) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, "地块ui找不到", ["id", t], ["index", e])
    }), await Promise.all(o)
  }
  a$1(t) {
    this.PlotList.push(t), this.PlotMap.set(t.PlotData.Id, t);
    var e = t.PlotData.FlagId;
    this.FlagToPlotMap.has(e) ? this.FlagToPlotMap.get(e).push(t) : this.FlagToPlotMap.set(e, [t])
  }
  UpdatePlotState() {
    this.PlotList.forEach(t => {
      t.UpdatePlotState()
    })
  }
  HideAllPlot() {
    this.PlotList.forEach(t => {
      t.SetPlotActive(!1)
    })
  }
  ShowAllPlot() {
    this.PlotList.forEach(t => {
      t.SetPlotActive(!0)
    })
  }
  UpdateData() {
    this.UpdatePlotState()
  }
}
exports.MoraleAreaPlotPanel = MoraleAreaPlotPanel;
//# sourceMappingURL=MoraleAreaPlotPanel.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleAreaPlotPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const MoraleAreaPlotItem_1 = require("./MoraleAreaPlotItem");
class MoraleAreaPlotPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.AreaData = undefined;
    this.PlotList = [];
    this.FlagToPlotMap = new Map();
    this.PlotMap = new Map();
    this.AllPlotIdList = [];
  }
  async Init(t, e) {
    this.AreaData = e;
    this.AllPlotIdList = this.AreaData.GetAllPlotIdList();
    await this.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [];
    this.AllPlotIdList.forEach((t, e) => {
      this.ComponentRegisterInfos.push([e, UE.UIItem]);
    });
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    await this.j$1();
  }
  async j$1() {
    const o = [];
    this.AllPlotIdList.forEach((t, e) => {
      var i;
      var s;
      var a = this.GetItem(e);
      if (a) {
        if (i = this.AreaData.GetPlotData(t)) {
          s = new MoraleAreaPlotItem_1.MoraleAreaPlotItem();
          o.push(s.Init(a, i));
          this.H$1(s);
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Morale", 69, "地块Id找不到地块信息", ["id", t], ["index", e], ["AreaId", this.AreaData.Id]);
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Morale", 69, "地块ui找不到", ["id", t], ["index", e]);
      }
    });
    await Promise.all(o);
  }
  H$1(t) {
    this.PlotList.push(t);
    this.PlotMap.set(t.PlotData.Id, t);
    var e = t.PlotData.FlagId;
    if (this.FlagToPlotMap.has(e)) {
      this.FlagToPlotMap.get(e).push(t);
    } else {
      this.FlagToPlotMap.set(e, [t]);
    }
  }
  UpdatePlotState() {
    this.PlotList.forEach(t => {
      t.UpdatePlotState();
    });
  }
  HideAllPlot() {
    this.PlotList.forEach(t => {
      t.SetPlotActive(false);
    });
  }
  ShowAllPlot() {
    this.PlotList.forEach(t => {
      t.SetPlotActive(true);
    });
  }
  UpdateData() {
    this.UpdatePlotState();
  }
}
exports.MoraleAreaPlotPanel = MoraleAreaPlotPanel;
//# sourceMappingURL=MoraleAreaPlotPanel.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RandomPlotItem = undefined;
const Time_1 = require("../../../Core/Common/Time");
const PlotReferenceById_1 = require("../../../Core/Define/ConfigQuery/PlotReferenceById");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
class RandomPlotItem {
  constructor() {
    this.Vzd = 0;
    this.jzd = 0;
    this.Hzd = new Array();
    this.$zd = 0;
  }
  static Create(e) {
    var t = new RandomPlotItem();
    t.Vzd = e.Probability / 100;
    t.jzd = e.Cooldown * MathUtils_1.MathUtils.SecondToMillisecond;
    for (const o of e.ClientPlotReferenceList) {
      var r = PlotReferenceById_1.configPlotReferenceById.GetConfig(o);
      if (r) {
        r = r.Plot.split(",");
        t.Hzd.push({
          FlowListName: r[0],
          FlowId: Number(r[1]),
          StateId: Number(r[2])
        });
      }
    }
    return t;
  }
  PlayRandomPlot() {
    var e;
    var t;
    var r = Time_1.Time.PlayerTime;
    if (!(r < this.$zd) && (t = this.Vzd) !== 0 && !(e = Math.random(), t < 1 && t < e)) {
      t = this.Hzd.length;
      e = Math.random();
      e = MathUtils_1.MathUtils.Clamp(Math.floor(e * t), 0, t - 1);
      t = this.Hzd[e];
      ControllerHolder_1.ControllerHolder.FlowController.StartFlow(t.FlowListName, t.FlowId, t.StateId);
      this.$zd = r + this.jzd;
    }
  }
}
exports.RandomPlotItem = RandomPlotItem;
//# sourceMappingURL=RandomPlotItem.js.map
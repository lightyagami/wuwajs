"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotMontage = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
class PlotMontage {
  constructor() {
    this.tj_ = new Set();
  }
  StartPlayMontage(o) {
    var e;
    var t;
    if (o && o.ActionMontage.Path && o.ActionMontage.Path !== "Empty" && (e = o.EntityId === 0 ? ModelManager_1.ModelManager.PlotModel.CurrentInteractEntity : ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o.EntityId))?.IsInit && (t = e.Entity.GetComponent(46)) && (t.OnNpcInPlot(true), t.PlayPerformMontage(1, {
      MontagePath: o.ActionMontage.Path,
      IsLoop: false
    }), this.tj_.add(e), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Plot", 26, "NPC播放蒙太奇", ["Id", e.PbDataId], ["Montage", o.ActionMontage.Path]);
    }
  }
  StopAllMontage() {
    for (const e of this.tj_) {
      if (e.Valid) {
        var o = e.Entity.GetComponent(188);
        if (!o) {
          return;
        }
        o.StopPerformMontage(1, {
          Method: 0
        });
        o.OnNpcInPlot(false);
      }
    }
    this.tj_.clear();
  }
}
exports.PlotMontage = PlotMontage;
//# sourceMappingURL=PlotMontage.js.map
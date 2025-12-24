"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowSwitchDataLayers = undefined;
const Log_1 = require("../../../Core/Common/Log");
const DataLayerConfigById_1 = require("../../../Core/Define/ConfigQuery/DataLayerConfigById");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowSwitchDataLayers extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.OPt = undefined;
  }
  Init(e) {
    this.OPt = e;
    return this;
  }
  OnExecute() {
    if (this.OPt) {
      const r = new Array();
      const t = new Array();
      for (const a of this.OPt.UnloadDataLayers) {
        var e = DataLayerConfigById_1.configDataLayerConfigById.GetConfig(a);
        r.push(e.DataLayer);
      }
      for (const s of this.OPt.LoadDataLayers) {
        var o = DataLayerConfigById_1.configDataLayerConfigById.GetConfig(s);
        t.push(o.DataLayer);
      }
      ControllerHolder_1.ControllerHolder.GameModeController.SwitchDataLayer(r, t, e => {
        if (!e) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("InstanceDungeon", 18, "切换DataLayer失败", ["unloads", r.join()], ["newLoads", t.join()]);
          }
        }
      }, this.OPt.TransitionOption?.SequencePath, this.OPt.TransitionOption?.SeqMarkBeforeModifyMat, this.OPt.MaterialDataForLoadedLayers, this.OPt.MaterialDataForUnloadLayers);
      this.FinishExecute(true);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelFlow", 18, "执行行为LevelFlowSwitchDataLayers失败，参数错误");
    }
  }
}
exports.LevelFlowSwitchDataLayers = LevelFlowSwitchDataLayers;
//# sourceMappingURL=LevelFlowSwitchDataLayers.js.map
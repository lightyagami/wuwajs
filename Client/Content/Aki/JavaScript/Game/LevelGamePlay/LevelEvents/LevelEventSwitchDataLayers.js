"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSwitchDataLayers = undefined;
const Log_1 = require("../../../Core/Common/Log");
const DataLayerConfigById_1 = require("../../../Core/Define/ConfigQuery/DataLayerConfigById");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSwitchDataLayers extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r, a) {
    if (e) {
      const t = new Array();
      const l = new Array();
      for (const s of e.UnloadDataLayers) {
        var o = DataLayerConfigById_1.configDataLayerConfigById.GetConfig(s);
        t.push(o.DataLayer);
      }
      for (const L of e.LoadDataLayers) {
        var n = DataLayerConfigById_1.configDataLayerConfigById.GetConfig(L);
        l.push(n.DataLayer);
      }
      ControllerHolder_1.ControllerHolder.GameModeController.SwitchDataLayer(t, l, e => {
        if (!e) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("InstanceDungeon", 18, "切换DataLayer失败", ["unloads", t.join()], ["newLoads", l.join()]);
          }
        }
      }, e.TransitionOption?.SequencePath);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 18, "执行行为LevelEventSwitchDataLayers失败，参数错误");
    }
  }
}
exports.LevelEventSwitchDataLayers = LevelEventSwitchDataLayers;
//# sourceMappingURL=LevelEventSwitchDataLayers.js.map
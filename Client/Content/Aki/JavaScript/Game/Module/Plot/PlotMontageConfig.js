"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotMontageConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const AbpMontageDataById_1 = require("../../../Core/Define/ConfigQuery/AbpMontageDataById");
const AbpStateByAbp_1 = require("../../../Core/Define/ConfigQuery/AbpStateByAbp");
const MontageDataById_1 = require("../../../Core/Define/ConfigQuery/MontageDataById");
const OverlayAbpMontageDataById_1 = require("../../../Core/Define/ConfigQuery/OverlayAbpMontageDataById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class PlotMontageConfig extends ConfigBase_1.ConfigBase {
  GetPlotMontageConfig(e) {
    var o = MontageDataById_1.configMontageDataById.GetConfig(e, false);
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Plot", 42, "找不到剧情蒙太奇配置", ["Montage ID", e]);
      }
    }
    return o;
  }
  GetPlotAbpMontageConfig(e) {
    var o = AbpMontageDataById_1.configAbpMontageDataById.GetConfig(e, false);
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Plot", 38, "找不到剧情ABP蒙太奇配置", ["Montage ID", e]);
      }
    }
    return o;
  }
  GetOverlayAbpMontageConfig(e) {
    var o = OverlayAbpMontageDataById_1.configOverlayAbpMontageDataById.GetConfig(e, false);
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Plot", 42, "找不到剧情叠加ABP蒙太奇配置", ["Montage ID", e]);
      }
    }
    return o;
  }
  GetAbpStateConfig(e) {
    var o = AbpStateByAbp_1.configAbpStateByAbp.GetConfig(e);
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Plot", 50, "多状态ABP找不到状态定义", ["ABP Path", e]);
      }
    }
    return o;
  }
}
exports.PlotMontageConfig = PlotMontageConfig;
//# sourceMappingURL=PlotMontageConfig.js.map
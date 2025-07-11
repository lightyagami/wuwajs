"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotCameraTemplateConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const FlowTemplateDataById_1 = require("../../../Core/Define/ConfigQuery/FlowTemplateDataById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class PlotCameraTemplateConfig extends ConfigBase_1.ConfigBase {
  GetCameraTemplateConfig(e) {
    var o = FlowTemplateDataById_1.configFlowTemplateDataById.GetConfig(e, false);
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Plot", 42, "找不到相机模板配置", ["CameraTemplate ID", e]);
      }
    }
    return o;
  }
}
exports.PlotCameraTemplateConfig = PlotCameraTemplateConfig;
//# sourceMappingURL=PlotCameraTemplateConfig.js.map
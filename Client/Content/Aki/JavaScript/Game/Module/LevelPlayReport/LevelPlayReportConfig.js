"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayReportConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const HiddenBossWindowById_1 = require("../../../Core/Define/ConfigQuery/HiddenBossWindowById");
const LevelPlayInfoMappingConfigAll_1 = require("../../../Core/Define/ConfigQuery/LevelPlayInfoMappingConfigAll");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class LevelPlayReportConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.CLl = new Map();
  }
  OnInit() {
    var e = LevelPlayInfoMappingConfigAll_1.configLevelPlayInfoMappingConfigAll.GetConfigList();
    if (e) {
      for (const i of e) {
        var o;
        var r;
        var n = JSON.parse(i.Data);
        if (this.CLl.has(n.LevelPlayId)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelPlayReport", 63, "玩法信息映射设置失败,重复玩法Id,请联系策划检查", ["LevelPlayId", n.LevelPlayId]);
          }
        } else {
          if (n.Vars.length > 1) {
            o = n.Vars.length - 1;
            r = n.Vars[o];
            n.GetBoxNumKey = r;
            n.Vars = n.Vars.slice(0, o);
          }
          this.CLl.set(n.LevelPlayId, n);
        }
      }
    }
    return true;
  }
  GetLevelPlayReportConfig(e) {
    var o = this.CLl.get(e);
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlayReport", 63, "获取玩法信息映设配置失败,请联系策划检查", ["LevelPlayId", e]);
      }
    }
    return o;
  }
  GetHiddenBossWindowConfig(e) {
    var o = HiddenBossWindowById_1.configHiddenBossWindowById.GetConfig(e);
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlayReport", 63, "找不到隐藏Boss窗口配置", ["界面Id", e]);
      }
    }
    return o;
  }
}
exports.LevelPlayReportConfig = LevelPlayReportConfig;
//# sourceMappingURL=LevelPlayReportConfig.js.map
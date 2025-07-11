"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configUiCameraMappingByViewName = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const UiCameraMapping_1 = require("../Config/UiCameraMapping");
const DB = "db_uicamera.db";
const FILE = "u.Ui相机.xlsx";
const TABLE = "UiCameraMapping";
const COMMAND = "select BinData from `UiCameraMapping` where ViewName=?";
const KEY_PREFIX = "UiCameraMappingByViewName";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configUiCameraMappingByViewName.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configUiCameraMappingByViewName.GetConfig");
const CONFIG_STAT_PREFIX = "configUiCameraMappingByViewName.GetConfig(";
exports.configUiCameraMappingByViewName = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (i, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${i})`);
    o?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (n) {
        var a = `${KEY_PREFIX}#${i})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (t) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ViewName", i]) > 0) {
        a = undefined;
        [e, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ViewName", i]);
        if (e) {
          const t = UiCameraMapping_1.UiCameraMapping.getRootAsUiCameraMapping(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (n) {
            e = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=UiCameraMappingByViewName.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configDevicePlatformByPidAndVid = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DevicePlatform_1 = require("../Config/DevicePlatform");
const DB = "db_deviceplatform.db";
const FILE = "s.设备平台.xlsx";
const TABLE = "DevicePlatform";
const COMMAND = "select BinData from `DevicePlatform` where PidAndVid=?";
const KEY_PREFIX = "DevicePlatformByPidAndVid";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configDevicePlatformByPidAndVid.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configDevicePlatformByPidAndVid.GetConfig");
const CONFIG_STAT_PREFIX = "configDevicePlatformByPidAndVid.GetConfig(";
exports.configDevicePlatformByPidAndVid = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    n?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (i) {
        var t = `${KEY_PREFIX}#${o})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (f) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["PidAndVid", o]) > 0) {
        t = undefined;
        [e, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["PidAndVid", o]);
        if (e) {
          const f = DevicePlatform_1.DevicePlatform.getRootAsDevicePlatform(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (i) {
            e = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, f);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=DevicePlatformByPidAndVid.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSpringFestivalAreaCameraById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SpringFestivalAreaCamera_1 = require("../Config/SpringFestivalAreaCamera");
const DB = "db_spring26.db";
const FILE = "c.3.1春节活动外围.xlsx";
const TABLE = "SpringFestivalAreaCamera";
const COMMAND = "select BinData from `SpringFestivalAreaCamera` where Id=?";
const KEY_PREFIX = "SpringFestivalAreaCameraById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSpringFestivalAreaCameraById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configSpringFestivalAreaCameraById.GetConfig");
const CONFIG_STAT_PREFIX = "configSpringFestivalAreaCameraById.GetConfig(";
exports.configSpringFestivalAreaCameraById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    o?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (i) {
        var a = `${KEY_PREFIX}#${n})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (t) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        a = undefined;
        [e, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (e) {
          const t = SpringFestivalAreaCamera_1.SpringFestivalAreaCamera.getRootAsSpringFestivalAreaCamera(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (i) {
            e = `${KEY_PREFIX}#${n})`;
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
//# sourceMappingURL=SpringFestivalAreaCameraById.js.map
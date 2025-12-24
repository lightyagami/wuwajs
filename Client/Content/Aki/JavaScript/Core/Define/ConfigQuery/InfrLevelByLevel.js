"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configInfrLevelByLevel = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const InfrLevel_1 = require("../Config/InfrLevel");
const DB = "db_infrastructure.db";
const FILE = "j.基建.xlsx";
const TABLE = "InfrLevel";
const COMMAND = "select BinData from `InfrLevel` where Level=?";
const KEY_PREFIX = "InfrLevelByLevel";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configInfrLevelByLevel.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configInfrLevelByLevel.GetConfig");
const CONFIG_STAT_PREFIX = "configInfrLevelByLevel.GetConfig(";
exports.configInfrLevelByLevel = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    o?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var i = `${KEY_PREFIX}#${e})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (f) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Level", e]) > 0) {
        i = undefined;
        [t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Level", e]);
        if (t) {
          const f = InfrLevel_1.InfrLevel.getRootAsInfrLevel(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (n) {
            t = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, f);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=InfrLevelByLevel.js.map
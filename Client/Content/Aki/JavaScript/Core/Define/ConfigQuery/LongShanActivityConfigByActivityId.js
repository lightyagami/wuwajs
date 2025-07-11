"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configLongShanActivityConfigByActivityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const LongShanActivityConfig_1 = require("../Config/LongShanActivityConfig");
const DB = "db_activity.db";
const FILE = "l.龙山主题活动.xlsx";
const TABLE = "LongShanActivityConfig";
const COMMAND = "select BinData from `LongShanActivityConfig` where ActivityId=?";
const KEY_PREFIX = "LongShanActivityConfigByActivityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configLongShanActivityConfigByActivityId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configLongShanActivityConfigByActivityId.GetConfig");
const CONFIG_STAT_PREFIX = "configLongShanActivityConfigByActivityId.GetConfig(";
exports.configLongShanActivityConfigByActivityId = {
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
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var g = `${KEY_PREFIX}#${i})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(g);
        if (C) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ActivityId", i]) > 0) {
        g = undefined;
        [t, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", i]);
        if (t) {
          const C = LongShanActivityConfig_1.LongShanActivityConfig.getRootAsLongShanActivityConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          if (n) {
            t = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=LongShanActivityConfigByActivityId.js.map
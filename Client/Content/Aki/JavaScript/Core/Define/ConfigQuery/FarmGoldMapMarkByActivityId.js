"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFarmGoldMapMarkByActivityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FarmGoldMapMark_1 = require("../Config/FarmGoldMapMark");
const DB = "db_activity.db";
const FILE = "b.爆金币活动.xlsx";
const TABLE = "FarmGoldMapMark";
const COMMAND = "select BinData from `FarmGoldMapMark` where ActivityId=?";
const KEY_PREFIX = "FarmGoldMapMarkByActivityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFarmGoldMapMarkByActivityId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configFarmGoldMapMarkByActivityId.GetConfig");
const CONFIG_STAT_PREFIX = "configFarmGoldMapMarkByActivityId.GetConfig(";
exports.configFarmGoldMapMarkByActivityId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    t?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (i) {
        var a = `${KEY_PREFIX}#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (r) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ActivityId", o]) > 0) {
        a = undefined;
        [n, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", o]);
        if (n) {
          const r = FarmGoldMapMark_1.FarmGoldMapMark.getRootAsFarmGoldMapMark(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (i) {
            n = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, r);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=FarmGoldMapMarkByActivityId.js.map
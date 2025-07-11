"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFarmGoldActivityByActivityIdAndInstanceId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FarmGoldActivity_1 = require("../Config/FarmGoldActivity");
const DB = "db_activity.db";
const FILE = "b.爆金币活动.xlsx";
const TABLE = "FarmGoldActivity";
const COMMAND = "select BinData from `FarmGoldActivity` where ActivityId=? And InstId=?";
const KEY_PREFIX = "FarmGoldActivityByActivityIdAndInstanceId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFarmGoldActivityByActivityIdAndInstanceId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configFarmGoldActivityByActivityIdAndInstanceId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configFarmGoldActivityByActivityIdAndInstanceId.GetConfigList(";
exports.configFarmGoldActivityByActivityIdAndInstanceId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (t, i, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${t}#${i})`);
    n?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (o) {
        var a = `${KEY_PREFIX}#${t}#${i})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (C) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair)) {
        const C = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ActivityId", t], ["InstId", i]) !== 1) {
            break;
          }
          var d = undefined;
          [e, d] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", t], ["InstId", i]);
          if (!e) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          d = FarmGoldActivity_1.FarmGoldActivity.getRootAsFarmGoldActivity(new byte_buffer_1.ByteBuffer(new Uint8Array(d.buffer)));
          C.push(d);
        }
        if (o) {
          a = `${KEY_PREFIX}#${t}#${i})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(a, C, C.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return C;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=FarmGoldActivityByActivityIdAndInstanceId.js.map
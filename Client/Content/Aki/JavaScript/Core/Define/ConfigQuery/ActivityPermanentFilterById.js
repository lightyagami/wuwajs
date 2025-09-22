"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configActivityPermanentFilterById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ActivityPermanentFilter_1 = require("../Config/ActivityPermanentFilter");
const DB = "db_activity.db";
const FILE = "h.活动.xlsx";
const TABLE = "ActivityPermanentFilter";
const COMMAND = "select BinData from `ActivityPermanentFilter` where Id=?";
const KEY_PREFIX = "ActivityPermanentFilterById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configActivityPermanentFilterById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configActivityPermanentFilterById.GetConfig");
const CONFIG_STAT_PREFIX = "configActivityPermanentFilterById.GetConfig(";
exports.configActivityPermanentFilterById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (t, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${t})`);
    n?.Start();
    var o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (o) {
      if (i) {
        var e = `${KEY_PREFIX}#${t})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (o = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", t]) > 0) {
        e = undefined;
        [o, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", t]);
        if (o) {
          const r = ActivityPermanentFilter_1.ActivityPermanentFilter.getRootAsActivityPermanentFilter(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (i) {
            o = `${KEY_PREFIX}#${t})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(o, r);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ActivityPermanentFilterById.js.map
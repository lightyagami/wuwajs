"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configActivityTitleTagsById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ActivityTitleTags_1 = require("../Config/ActivityTitleTags");
const DB = "db_activity.db";
const FILE = "h.活动.xlsx";
const TABLE = "ActivityTitleTags";
const COMMAND = "select BinData from `ActivityTitleTags` where Id=?";
const KEY_PREFIX = "ActivityTitleTagsById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configActivityTitleTagsById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configActivityTitleTagsById.GetConfig");
const CONFIG_STAT_PREFIX = "configActivityTitleTagsById.GetConfig(";
exports.configActivityTitleTagsById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (i, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${i})`);
    o?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (t) {
        var e = `${KEY_PREFIX}#${i})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (g) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", i]) > 0) {
        e = undefined;
        [n, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", i]);
        if (n) {
          const g = ActivityTitleTags_1.ActivityTitleTags.getRootAsActivityTitleTags(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (t) {
            n = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, g);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ActivityTitleTagsById.js.map
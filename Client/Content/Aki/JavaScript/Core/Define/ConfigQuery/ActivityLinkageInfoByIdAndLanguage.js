"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configActivityLinkageInfoByIdAndLanguage = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ActivityLinkageInfo_1 = require("../Config/ActivityLinkageInfo");
const DB = "db_activitylinkage.db";
const FILE = "h.活动联动页活动.xlsx";
const TABLE = "ActivityLinkageInfo";
const COMMAND = "select BinData from `ActivityLinkageInfo` where ActivityLinkageId=? And Language=?";
const KEY_PREFIX = "ActivityLinkageInfoByIdAndLanguage";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configActivityLinkageInfoByIdAndLanguage.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configActivityLinkageInfoByIdAndLanguage.GetConfig");
const CONFIG_STAT_PREFIX = "configActivityLinkageInfoByIdAndLanguage.GetConfig(";
exports.configActivityLinkageInfoByIdAndLanguage = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, i, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n}#${i})`);
    t?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (o) {
        var g = `${KEY_PREFIX}#${n}#${i})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(g);
        if (a) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ActivityLinkageId", n], ["Language", i]) > 0) {
        g = undefined;
        [e, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityLinkageId", n], ["Language", i]);
        if (e) {
          const a = ActivityLinkageInfo_1.ActivityLinkageInfo.getRootAsActivityLinkageInfo(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          if (o) {
            e = `${KEY_PREFIX}#${n}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ActivityLinkageInfoByIdAndLanguage.js.map
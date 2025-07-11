"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configActivityViewNameByType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ActivityViewName_1 = require("../Config/ActivityViewName");
const DB = "db_activity.db";
const FILE = "h.活动.xlsx";
const TABLE = "ActivityViewName";
const COMMAND = "select BinData from `ActivityViewName` where Type=?";
const KEY_PREFIX = "ActivityViewNameByType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configActivityViewNameByType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configActivityViewNameByType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configActivityViewNameByType.GetConfigList(";
exports.configActivityViewNameByType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (i, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${i})`);
    o?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (t) {
        var n = `${KEY_PREFIX}#${i})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (C) {
          o?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair)) {
        const C = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["Type", i]) !== 1) {
            break;
          }
          var a = undefined;
          [e, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Type", i]);
          if (!e) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            o?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          a = ActivityViewName_1.ActivityViewName.getRootAsActivityViewName(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          C.push(a);
        }
        if (t) {
          n = `${KEY_PREFIX}#${i})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(n, C, C.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        o?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return C;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ActivityViewNameByType.js.map
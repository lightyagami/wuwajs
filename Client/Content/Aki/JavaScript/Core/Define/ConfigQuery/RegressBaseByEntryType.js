"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRegressBaseByEntryType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RegressBase_1 = require("../Config/RegressBase");
const DB = "db_activity.db";
const FILE = "h.回流活动(新).xlsx";
const TABLE = "RegressBase";
const COMMAND = "select BinData from `RegressBase` where EntryType=?";
const KEY_PREFIX = "RegressBaseByEntryType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRegressBaseByEntryType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configRegressBaseByEntryType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configRegressBaseByEntryType.GetConfigList(";
exports.configRegressBaseByEntryType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (e, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${e})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (o) {
        var i = `${KEY_PREFIX}#${e})`;
        const s = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (s) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return s;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair)) {
        const s = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["EntryType", e]) !== 1) {
            break;
          }
          var r = undefined;
          [t, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["EntryType", e]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          r = RegressBase_1.RegressBase.getRootAsRegressBase(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          s.push(r);
        }
        if (o) {
          i = `${KEY_PREFIX}#${e})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(i, s, s.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return s;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RegressBaseByEntryType.js.map
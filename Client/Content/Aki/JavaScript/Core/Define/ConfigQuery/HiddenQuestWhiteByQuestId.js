"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHiddenQuestWhiteByQuestId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const HiddenQuestWhite_1 = require("../Config/HiddenQuestWhite");
const DB = "db_download.db";
const FILE = "b.包体管理.xlsx";
const TABLE = "HiddenQuestWhite";
const COMMAND = "select BinData from `HiddenQuestWhite` where QuestId=?";
const KEY_PREFIX = "HiddenQuestWhiteByQuestId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHiddenQuestWhiteByQuestId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configHiddenQuestWhiteByQuestId.GetConfig");
const CONFIG_STAT_PREFIX = "configHiddenQuestWhiteByQuestId.GetConfig(";
exports.configHiddenQuestWhiteByQuestId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    o?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (t) {
        var i = `${KEY_PREFIX}#${e})`;
        const d = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (d) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return d;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["QuestId", e]) > 0) {
        i = undefined;
        [n, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["QuestId", e]);
        if (n) {
          const d = HiddenQuestWhite_1.HiddenQuestWhite.getRootAsHiddenQuestWhite(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (t) {
            n = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, d);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return d;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=HiddenQuestWhiteByQuestId.js.map
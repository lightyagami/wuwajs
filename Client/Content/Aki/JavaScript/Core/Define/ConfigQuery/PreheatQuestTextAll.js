"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPreheatQuestTextAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PreheatQuestText_1 = require("../Config/PreheatQuestText");
const DB = "db_preheat.db";
const FILE = "y.预热签到活动.xlsx";
const TABLE = "PreheatQuestText";
const COMMAND = "select BinData from `PreheatQuestText`";
const KEY_PREFIX = "PreheatQuestTextAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPreheatQuestTextAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configPreheatQuestTextAll.GetConfigList");
exports.configPreheatQuestTextAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (t = true) => {
    var e;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (t) {
        var o = KEY_PREFIX + ")";
        const i = ConfigCommon_1.ConfigCommon.GetConfig(o);
        if (i) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      const i = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var n = undefined;
        [e, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!e) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        n = PreheatQuestText_1.PreheatQuestText.getRootAsPreheatQuestText(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
        i.push(n);
      }
      if (t) {
        o = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(o, i, i.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return i;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PreheatQuestTextAll.js.map
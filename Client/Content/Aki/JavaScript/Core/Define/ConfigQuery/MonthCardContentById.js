"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMonthCardContentById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MonthCardContent_1 = require("../Config/MonthCardContent");
const DB = "db_monthcardcontent.db";
const FILE = "y.月卡.xlsx";
const TABLE = "MonthCardContent";
const COMMAND = "select BinData from `MonthCardContent` where Id=?";
const KEY_PREFIX = "MonthCardContentById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMonthCardContentById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configMonthCardContentById.GetConfig");
const CONFIG_STAT_PREFIX = "configMonthCardContentById.GetConfig(";
exports.configMonthCardContentById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    t?.Start();
    var C = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (C) {
      if (o) {
        var e = `${KEY_PREFIX}#${n})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (i) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (C = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        e = undefined;
        [C, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (C) {
          const i = MonthCardContent_1.MonthCardContent.getRootAsMonthCardContent(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (o) {
            C = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(C, i);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MonthCardContentById.js.map
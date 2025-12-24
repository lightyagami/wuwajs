"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configArtemisByDay = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const Artemis_1 = require("../Config/Artemis");
const DB = "db_artemis.db";
const FILE = "a.爱弥斯预热签到活动.xlsx";
const TABLE = "Artemis";
const COMMAND = "select BinData from `Artemis` where ActivityId=? AND UnlockDay=?";
const KEY_PREFIX = "ArtemisByDay";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configArtemisByDay.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configArtemisByDay.GetConfig");
const CONFIG_STAT_PREFIX = "configArtemisByDay.GetConfig(";
exports.configArtemisByDay = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${i})`);
    t?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (n) {
        var C = `${KEY_PREFIX}#${o}#${i})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (a) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ActivityId", o], ["UnlockDay", i]) > 0) {
        C = undefined;
        [e, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", o], ["UnlockDay", i]);
        if (e) {
          const a = Artemis_1.Artemis.getRootAsArtemis(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (n) {
            e = `${KEY_PREFIX}#${o}#${i})`;
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
//# sourceMappingURL=ArtemisByDay.js.map
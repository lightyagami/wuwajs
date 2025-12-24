"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMotorcycleChallengeAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MotorcycleChallenge_1 = require("../Config/MotorcycleChallenge");
const DB = "db_roadbook.db";
const FILE = "q.千岛路书3.0.xlsx";
const TABLE = "MotorcycleChallenge";
const COMMAND = "select BinData from `MotorcycleChallenge`";
const KEY_PREFIX = "MotorcycleChallengeAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMotorcycleChallengeAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configMotorcycleChallengeAll.GetConfigList");
exports.configMotorcycleChallengeAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o = true) => {
    var n;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (o) {
        var t = KEY_PREFIX + ")";
        const i = ConfigCommon_1.ConfigCommon.GetConfig(t);
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
        var e = undefined;
        [n, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!n) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        e = MotorcycleChallenge_1.MotorcycleChallenge.getRootAsMotorcycleChallenge(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
        i.push(e);
      }
      if (o) {
        t = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(t, i, i.length);
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
//# sourceMappingURL=MotorcycleChallengeAll.js.map
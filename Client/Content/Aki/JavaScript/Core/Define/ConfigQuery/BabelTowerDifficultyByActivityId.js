"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configBabelTowerDifficultyByActivityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BabelTowerDifficulty_1 = require("../Config/BabelTowerDifficulty");
const DB = "db_activity.db";
const FILE = "b.巴别塔活动.xlsx";
const TABLE = "BabelTowerDifficulty";
const COMMAND = "select BinData from `BabelTowerDifficulty` where ActivityId=?";
const KEY_PREFIX = "BabelTowerDifficultyByActivityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configBabelTowerDifficultyByActivityId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configBabelTowerDifficultyByActivityId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configBabelTowerDifficultyByActivityId.GetConfigList(";
exports.configBabelTowerDifficultyByActivityId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (i, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${i})`);
    t?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (o) {
        var e = `${KEY_PREFIX}#${i})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair)) {
        const a = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ActivityId", i]) !== 1) {
            break;
          }
          var f = undefined;
          [n, f] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", i]);
          if (!n) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          f = BabelTowerDifficulty_1.BabelTowerDifficulty.getRootAsBabelTowerDifficulty(new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)));
          a.push(f);
        }
        if (o) {
          e = `${KEY_PREFIX}#${i})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, a, a.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return a;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=BabelTowerDifficultyByActivityId.js.map
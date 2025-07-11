"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configTowerDefenceRewardById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TowerDefenceReward_1 = require("../Config/TowerDefenceReward");
const DB = "db_activity.db";
const FILE = "l.联机塔防活动.xlsx";
const TABLE = "TowerDefenceReward";
const COMMAND = "select BinData from `TowerDefenceReward` where Id = ?";
const KEY_PREFIX = "TowerDefenceRewardById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configTowerDefenceRewardById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configTowerDefenceRewardById.GetConfig");
const CONFIG_STAT_PREFIX = "configTowerDefenceRewardById.GetConfig(";
exports.configTowerDefenceRewardById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    n?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (o) {
        var t = `${KEY_PREFIX}#${e})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (f) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", e]) > 0) {
        t = undefined;
        [i, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", e]);
        if (i) {
          const f = TowerDefenceReward_1.TowerDefenceReward.getRootAsTowerDefenceReward(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (o) {
            i = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, f);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=TowerDefenceRewardById.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configTowerDefenseSettleById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TowerDefenseSettle_1 = require("../Config/TowerDefenseSettle");
const DB = "db_activity.db";
const FILE = "l.联机塔防活动.xlsx";
const TABLE = "TowerDefenseSettle";
const COMMAND = "select BinData from `TowerDefenseSettle` where Id = ?";
const KEY_PREFIX = "TowerDefenseSettleById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configTowerDefenseSettleById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configTowerDefenseSettleById.GetConfig");
const CONFIG_STAT_PREFIX = "configTowerDefenseSettleById.GetConfig(";
exports.configTowerDefenseSettleById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    t?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (o) {
        var i = `${KEY_PREFIX}#${e})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (f) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", e]) > 0) {
        i = undefined;
        [n, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", e]);
        if (n) {
          const f = TowerDefenseSettle_1.TowerDefenseSettle.getRootAsTowerDefenseSettle(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (o) {
            n = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, f);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=TowerDefenseSettleById.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configNewTowerTagById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const NewTowerTag_1 = require("../Config/NewTowerTag");
const DB = "db_newtower.db";
const FILE = "x.3.0新爬塔.xlsx";
const TABLE = "NewTowerTag";
const COMMAND = "select BinData from `NewTowerTag` where Id=?";
const KEY_PREFIX = "NewTowerTagById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configNewTowerTagById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configNewTowerTagById.GetConfig");
const CONFIG_STAT_PREFIX = "configNewTowerTagById.GetConfig(";
exports.configNewTowerTagById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (e) {
        var i = `${KEY_PREFIX}#${o})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (g) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        i = undefined;
        [t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (t) {
          const g = NewTowerTag_1.NewTowerTag.getRootAsNewTowerTag(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (e) {
            t = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, g);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=NewTowerTagById.js.map
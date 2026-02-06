"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configGachaRoleDevelopInsByDungeonDetection = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const GachaRoleDevelopIns_1 = require("../Config/GachaRoleDevelopIns");
const DB = "db_gacharoledevelop.db";
const FILE = "d.当期卡池角色养成推荐.xlsx";
const TABLE = "GachaRoleDevelopIns";
const COMMAND = "select BinData from `GachaRoleDevelopIns` where DungeonDetection=?";
const KEY_PREFIX = "GachaRoleDevelopInsByDungeonDetection";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configGachaRoleDevelopInsByDungeonDetection.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configGachaRoleDevelopInsByDungeonDetection.GetConfig");
const CONFIG_STAT_PREFIX = "configGachaRoleDevelopInsByDungeonDetection.GetConfig(";
exports.configGachaRoleDevelopInsByDungeonDetection = {
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
        const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (a) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["DungeonDetection", o]) > 0) {
        i = undefined;
        [t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["DungeonDetection", o]);
        if (t) {
          const a = GachaRoleDevelopIns_1.GachaRoleDevelopIns.getRootAsGachaRoleDevelopIns(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (e) {
            t = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=GachaRoleDevelopInsByDungeonDetection.js.map
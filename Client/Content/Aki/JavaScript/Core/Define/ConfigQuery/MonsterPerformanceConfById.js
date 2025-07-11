"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMonsterPerformanceConfById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MonsterPerformanceConf_1 = require("../Config/MonsterPerformanceConf");
const DB = "db_monster_info.db";
const FILE = "g.怪物战斗配置.xlsx";
const TABLE = "MonsterPerformanceConf";
const COMMAND = "select BinData from `MonsterPerformanceConf` where MonsterPerformanceId=?";
const KEY_PREFIX = "MonsterPerformanceConfById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMonsterPerformanceConfById.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configMonsterPerformanceConfById.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configMonsterPerformanceConfById.GetConfigList(";
exports.configMonsterPerformanceConfById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    e?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var r = `${KEY_PREFIX}#${o})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (f) {
          e?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const f = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["MonsterPerformanceId", o]) !== 1) {
            break;
          }
          var i = undefined;
          [t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MonsterPerformanceId", o]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            e?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          i = MonsterPerformanceConf_1.MonsterPerformanceConf.getRootAsMonsterPerformanceConf(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          f.push(i);
        }
        if (n) {
          r = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(r, f, f.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        e?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return f;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MonsterPerformanceConfById.js.map
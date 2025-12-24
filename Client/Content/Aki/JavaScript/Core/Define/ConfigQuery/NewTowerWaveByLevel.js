"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configNewTowerWaveByLevel = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const NewTowerWave_1 = require("../Config/NewTowerWave");
const DB = "db_newtower.db";
const FILE = "x.3.0新爬塔.xlsx";
const TABLE = "NewTowerWave";
const COMMAND = "select BinData from `NewTowerWave` where Level=?";
const KEY_PREFIX = "NewTowerWaveByLevel";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configNewTowerWaveByLevel.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configNewTowerWaveByLevel.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configNewTowerWaveByLevel.GetConfigList(";
exports.configNewTowerWaveByLevel = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (e, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${e})`);
    n?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (o) {
        var t = `${KEY_PREFIX}#${e})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (r) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair)) {
        const r = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["Level", e]) !== 1) {
            break;
          }
          var a = undefined;
          [i, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Level", e]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          a = NewTowerWave_1.NewTowerWave.getRootAsNewTowerWave(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          r.push(a);
        }
        if (o) {
          t = `${KEY_PREFIX}#${e})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(t, r, r.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return r;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=NewTowerWaveByLevel.js.map
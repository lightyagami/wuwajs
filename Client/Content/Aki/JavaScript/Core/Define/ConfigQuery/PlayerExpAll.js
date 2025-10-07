"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPlayerExpAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PlayerExp_1 = require("../Config/PlayerExp");
const DB = "db_player_exp.db";
const FILE = "j.经验.xlsx";
const TABLE = "PlayerExp";
const COMMAND = "select BinData from `PlayerExp`";
const KEY_PREFIX = "PlayerExpAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPlayerExpAll.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPlayerExpAll.GetConfig");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configPlayerExpAll.GetConfigList");
exports.configPlayerExpAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    if (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (o) {
        var n = KEY_PREFIX + ")";
        const t = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (t) {
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair) > 0) {
        var i;
        var n = undefined;
        [i, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (i) {
          const t = PlayerExp_1.PlayerExp.getRootAsPlayerExp(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
          if (o) {
            i = KEY_PREFIX + ")";
            ConfigCommon_1.ConfigCommon.SaveConfig(i, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
  GetConfigList: (o = true) => {
    var n;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (o) {
        var i = KEY_PREFIX + ")";
        const e = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (e) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      const e = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var t = undefined;
        [n, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!n) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        t = PlayerExp_1.PlayerExp.getRootAsPlayerExp(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
        e.push(t);
      }
      if (o) {
        i = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(i, e, e.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return e;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PlayerExpAll.js.map
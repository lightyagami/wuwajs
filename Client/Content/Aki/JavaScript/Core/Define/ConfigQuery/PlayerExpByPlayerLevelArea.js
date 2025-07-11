"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPlayerExpByPlayerLevelArea = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PlayerExp_1 = require("../Config/PlayerExp");
const DB = "db_player_exp.db";
const FILE = "j.经验.xlsx";
const TABLE = "PlayerExp";
const COMMAND = "select BinData from `PlayerExp` where PlayerLevel >= ? AND PlayerLevel < ?";
const KEY_PREFIX = "PlayerExpByPlayerLevelArea";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPlayerExpByPlayerLevelArea.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configPlayerExpByPlayerLevelArea.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configPlayerExpByPlayerLevelArea.GetConfigList(";
exports.configPlayerExpByPlayerLevelArea = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (e, o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${e}#${o})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var a = `${KEY_PREFIX}#${e}#${o})`;
        const l = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (l) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return l;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair)) {
        const l = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["PlayerLevel", e], ["PlayerLevel", o]) !== 1) {
            break;
          }
          var r = undefined;
          [t, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["PlayerLevel", e], ["PlayerLevel", o]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          r = PlayerExp_1.PlayerExp.getRootAsPlayerExp(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          l.push(r);
        }
        if (n) {
          a = `${KEY_PREFIX}#${e}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(a, l, l.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return l;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PlayerExpByPlayerLevelArea.js.map
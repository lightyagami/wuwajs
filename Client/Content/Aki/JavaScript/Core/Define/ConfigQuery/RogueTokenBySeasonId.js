"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRogueTokenBySeasonId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RogueToken_1 = require("../Config/RogueToken");
const DB = "db_rogue.db";
const FILE = "r.肉鸽.xlsx";
const TABLE = "RogueToken";
const COMMAND = "select BinData from `RogueToken` where SeasonId=?";
const KEY_PREFIX = "RogueTokenBySeasonId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRogueTokenBySeasonId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configRogueTokenBySeasonId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configRogueTokenBySeasonId.GetConfigList(";
exports.configRogueTokenBySeasonId = {
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
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (n) {
        var t = `${KEY_PREFIX}#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C) {
          e?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const C = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["SeasonId", o]) !== 1) {
            break;
          }
          var g = undefined;
          [i, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["SeasonId", o]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            e?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          g = RogueToken_1.RogueToken.getRootAsRogueToken(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          C.push(g);
        }
        if (n) {
          t = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(t, C, C.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        e?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return C;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RogueTokenBySeasonId.js.map
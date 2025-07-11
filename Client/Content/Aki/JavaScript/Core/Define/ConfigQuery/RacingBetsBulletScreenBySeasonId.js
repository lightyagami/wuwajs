"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRacingBetsBulletScreenBySeasonId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RacingBetsBulletScreen_1 = require("../Config/RacingBetsBulletScreen");
const DB = "db_racingbets.db";
const FILE = "q.全服赌马.xlsx";
const TABLE = "RacingBetsBulletScreen";
const COMMAND = "select BinData from `RacingBetsBulletScreen` where SeasonId=?";
const KEY_PREFIX = "RacingBetsBulletScreenBySeasonId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRacingBetsBulletScreenBySeasonId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configRacingBetsBulletScreenBySeasonId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configRacingBetsBulletScreenBySeasonId.GetConfigList(";
exports.configRacingBetsBulletScreenBySeasonId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (n, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${n})`);
    o?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (e) {
        var i = `${KEY_PREFIX}#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (g) {
          o?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair)) {
        const g = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["SeasonId", n]) !== 1) {
            break;
          }
          var a = undefined;
          [t, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["SeasonId", n]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            o?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          a = RacingBetsBulletScreen_1.RacingBetsBulletScreen.getRootAsRacingBetsBulletScreen(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          g.push(a);
        }
        if (e) {
          i = `${KEY_PREFIX}#${n})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(i, g, g.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        o?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return g;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RacingBetsBulletScreenBySeasonId.js.map
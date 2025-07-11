"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configGamePlayScanByUid = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const GamePlayScan_1 = require("../Config/GamePlayScan");
const DB = "db_levelgameplay.db";
const FILE = "g.关卡玩法数据.xlsx";
const TABLE = "GamePlayScan";
const COMMAND = "select BinData from `GamePlayScan` where UID=?";
const KEY_PREFIX = "GamePlayScanByUid";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configGamePlayScanByUid.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configGamePlayScanByUid.GetConfig");
const CONFIG_STAT_PREFIX = "configGamePlayScanByUid.GetConfig(";
exports.configGamePlayScanByUid = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var a = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    a?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (o) {
        var e = `${KEY_PREFIX}#${n})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (t) {
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["UId", n]) > 0) {
        e = undefined;
        [i, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["UId", n]);
        if (i) {
          const t = GamePlayScan_1.GamePlayScan.getRootAsGamePlayScan(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (o) {
            i = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=GamePlayScanByUid.js.map
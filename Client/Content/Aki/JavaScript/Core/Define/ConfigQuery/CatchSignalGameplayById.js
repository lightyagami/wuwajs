"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configCatchSignalGameplayById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const CatchSignalGameplay_1 = require("../Config/CatchSignalGameplay");
const DB = "db_catchsignalgameplay.db";
const FILE = "k.可视化编辑/c.Csv/m.捕获信号玩法配置/*.csv*";
const TABLE = "CatchSignalGameplay";
const COMMAND = "select BinData from `CatchSignalGameplay` where Id=?";
const KEY_PREFIX = "CatchSignalGameplayById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configCatchSignalGameplayById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configCatchSignalGameplayById.GetConfig");
const CONFIG_STAT_PREFIX = "configCatchSignalGameplayById.GetConfig(";
exports.configCatchSignalGameplayById = {
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
        var t = `${KEY_PREFIX}#${n})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (e) {
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        t = undefined;
        [i, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (i) {
          const e = CatchSignalGameplay_1.CatchSignalGameplay.getRootAsCatchSignalGameplay(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (o) {
            i = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, e);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=CatchSignalGameplayById.js.map
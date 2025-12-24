"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPhantomBattleMapParamByMapId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PhantomBattleMapParam_1 = require("../Config/PhantomBattleMapParam");
const DB = "db_phantombattle.db";
const FILE = "s.声骸大作战外围.xlsx";
const TABLE = "PhantomBattleMapParam";
const COMMAND = "select BinData from `PhantomBattleMapParam` where MapId=?";
const KEY_PREFIX = "PhantomBattleMapParamByMapId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleMapParamByMapId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleMapParamByMapId.GetConfig");
const CONFIG_STAT_PREFIX = "configPhantomBattleMapParamByMapId.GetConfig(";
exports.configPhantomBattleMapParamByMapId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (a, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${a})`);
    o?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (t) {
        var e = `${KEY_PREFIX}#${a})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (i) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, a, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["MapId", a]) > 0) {
        e = undefined;
        [n, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MapId", a]);
        if (n) {
          const i = PhantomBattleMapParam_1.PhantomBattleMapParam.getRootAsPhantomBattleMapParam(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (t) {
            n = `${KEY_PREFIX}#${a})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, i);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PhantomBattleMapParamByMapId.js.map
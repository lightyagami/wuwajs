"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configElementLevelByLevel = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ElementLevel_1 = require("../Config/ElementLevel");
const DB = "db_rogue.db";
const FILE = "r.肉鸽.xlsx";
const TABLE = "ElementLevel";
const COMMAND = "select BinData from `ElementLevel` where Level=?";
const KEY_PREFIX = "ElementLevelByLevel";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configElementLevelByLevel.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configElementLevelByLevel.GetConfig");
const CONFIG_STAT_PREFIX = "configElementLevelByLevel.GetConfig(";
exports.configElementLevelByLevel = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (o) {
        var i = `${KEY_PREFIX}#${e})`;
        const l = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (l) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return l;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Level", e]) > 0) {
        i = undefined;
        [t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Level", e]);
        if (t) {
          const l = ElementLevel_1.ElementLevel.getRootAsElementLevel(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (o) {
            t = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, l);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return l;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ElementLevelByLevel.js.map
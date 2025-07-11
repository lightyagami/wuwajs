"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRogueWeeklyBuffDescById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RogueWeeklyBuffDesc_1 = require("../Config/RogueWeeklyBuffDesc");
const DB = "db_weeklyrogue.db";
const FILE = "r.肉鸽周常.xlsx";
const TABLE = "RogueWeeklyBuffDesc";
const COMMAND = "select BinData from `RogueWeeklyBuffDesc` where Id=?";
const KEY_PREFIX = "RogueWeeklyBuffDescById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRogueWeeklyBuffDescById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRogueWeeklyBuffDescById.GetConfig");
const CONFIG_STAT_PREFIX = "configRogueWeeklyBuffDescById.GetConfig(";
exports.configRogueWeeklyBuffDescById = {
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
    var f = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (f) {
      if (o) {
        var i = `${KEY_PREFIX}#${e})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (t) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (f = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", e]) > 0) {
        i = undefined;
        [f, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", e]);
        if (f) {
          const t = RogueWeeklyBuffDesc_1.RogueWeeklyBuffDesc.getRootAsRogueWeeklyBuffDesc(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (o) {
            f = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(f, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RogueWeeklyBuffDescById.js.map
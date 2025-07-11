"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configCiacconaGalEndingById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const CiacconaGalEnding_1 = require("../Config/CiacconaGalEnding");
const DB = "db_ciacconagal.db";
const FILE = "x.夏空活动.xlsx";
const TABLE = "CiacconaGalEnding";
const COMMAND = "select BinData from `CiacconaGalEnding` where Id=?";
const KEY_PREFIX = "CiacconaGalEndingById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configCiacconaGalEndingById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configCiacconaGalEndingById.GetConfig");
const CONFIG_STAT_PREFIX = "configCiacconaGalEndingById.GetConfig(";
exports.configCiacconaGalEndingById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    i?.Start();
    var a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (a) {
      if (o) {
        var t = `${KEY_PREFIX}#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        t = undefined;
        [a, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (a) {
          const C = CiacconaGalEnding_1.CiacconaGalEnding.getRootAsCiacconaGalEnding(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (o) {
            a = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(a, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=CiacconaGalEndingById.js.map
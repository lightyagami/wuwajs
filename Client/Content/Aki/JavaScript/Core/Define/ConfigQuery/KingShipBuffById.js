"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configKingShipBuffById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const KingShipBuff_1 = require("../Config/KingShipBuff");
const DB = "db_kingship.db";
const FILE = "w.王权.xlsx";
const TABLE = "KingShipBuff";
const COMMAND = "select BinData from `KingShipBuff` where Id = ?";
const KEY_PREFIX = "KingShipBuffById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configKingShipBuffById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configKingShipBuffById.GetConfig");
const CONFIG_STAT_PREFIX = "configKingShipBuffById.GetConfig(";
exports.configKingShipBuffById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (i, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${i})`);
    o?.Start();
    var f = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (f) {
      if (n) {
        var t = `${KEY_PREFIX}#${i})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (e) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (f = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", i]) > 0) {
        t = undefined;
        [f, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", i]);
        if (f) {
          const e = KingShipBuff_1.KingShipBuff.getRootAsKingShipBuff(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (n) {
            f = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(f, e);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=KingShipBuffById.js.map
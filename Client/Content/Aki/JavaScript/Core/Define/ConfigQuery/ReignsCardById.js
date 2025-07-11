"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configReignsCardById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ReignsCard_1 = require("../Config/ReignsCard");
const DB = "db_reignscard.db";
const FILE = "k.可视化编辑/c.Csv/w.王权玩法结果卡片/*.csv*";
const TABLE = "ReignsCard";
const COMMAND = "select BinData from `ReignsCard` where Id=?";
const KEY_PREFIX = "ReignsCardById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configReignsCardById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configReignsCardById.GetConfig");
const CONFIG_STAT_PREFIX = "configReignsCardById.GetConfig(";
exports.configReignsCardById = {
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
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
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
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        t = undefined;
        [e, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (e) {
          const C = ReignsCard_1.ReignsCard.getRootAsReignsCard(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (o) {
            e = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, C);
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
//# sourceMappingURL=ReignsCardById.js.map
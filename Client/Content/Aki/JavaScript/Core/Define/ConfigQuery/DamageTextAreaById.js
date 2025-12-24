"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configDamageTextAreaById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DamageTextArea_1 = require("../Config/DamageTextArea");
const DB = "db_damage_text.db";
const FILE = "s.伤害飘字.xlsx";
const TABLE = "DamageTextArea";
const COMMAND = "select BinData from `DamageTextArea` where Id=?";
const KEY_PREFIX = "DamageTextAreaById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configDamageTextAreaById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configDamageTextAreaById.GetConfig");
const CONFIG_STAT_PREFIX = "configDamageTextAreaById.GetConfig(";
exports.configDamageTextAreaById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    t?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (o) {
        var a = `${KEY_PREFIX}#${e})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (i) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", e]) > 0) {
        a = undefined;
        [n, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", e]);
        if (n) {
          const i = DamageTextArea_1.DamageTextArea.getRootAsDamageTextArea(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (o) {
            n = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, i);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=DamageTextAreaById.js.map
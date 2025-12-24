"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configEffectSaveByEffectId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const EffectSave_1 = require("../Config/EffectSave");
const DB = "db_effectsave.db";
const FILE = "t.特效保留.xlsx";
const TABLE = "EffectSave";
const COMMAND = "select BinData from `EffectSave` where EffectId = ?";
const KEY_PREFIX = "EffectSaveByEffectId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configEffectSaveByEffectId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configEffectSaveByEffectId.GetConfig");
const CONFIG_STAT_PREFIX = "configEffectSaveByEffectId.GetConfig(";
exports.configEffectSaveByEffectId = {
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
    var f = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (f) {
      if (o) {
        var n = `${KEY_PREFIX}#${e})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (i) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (f = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["EffectId", e]) > 0) {
        n = undefined;
        [f, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["EffectId", e]);
        if (f) {
          const i = EffectSave_1.EffectSave.getRootAsEffectSave(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
          if (o) {
            f = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(f, i);
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
//# sourceMappingURL=EffectSaveByEffectId.js.map
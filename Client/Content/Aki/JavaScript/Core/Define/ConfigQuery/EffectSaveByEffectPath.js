"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configEffectSaveByEffectPath = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const EffectSave_1 = require("../Config/EffectSave");
const DB = "db_effectsave.db";
const FILE = "t.特效保留.xlsx";
const TABLE = "EffectSave";
const COMMAND = "select BinData from `EffectSave` where EffectPath = ?";
const KEY_PREFIX = "EffectSaveByEffectPath";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configEffectSaveByEffectPath.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configEffectSaveByEffectPath.GetConfig");
const CONFIG_STAT_PREFIX = "configEffectSaveByEffectPath.GetConfig(";
exports.configEffectSaveByEffectPath = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (t, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${t})`);
    o?.Start();
    var f = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (f) {
      if (e) {
        var n = `${KEY_PREFIX}#${t})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (i) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (f = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["EffectPath", t]) > 0) {
        n = undefined;
        [f, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["EffectPath", t]);
        if (f) {
          const i = EffectSave_1.EffectSave.getRootAsEffectSave(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
          if (e) {
            f = `${KEY_PREFIX}#${t})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(f, i);
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
//# sourceMappingURL=EffectSaveByEffectPath.js.map
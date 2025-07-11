"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configEntityAudioConfigByIdWithZero = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const EntityAudioConfig_1 = require("../Config/EntityAudioConfig");
const DB = "db_entity_audio.db";
const FILE = "y.音频组件配置.xlsx";
const TABLE = "EntityAudioConfig";
const COMMAND = "select BinData from `EntityAudioConfig` where id=0 AND (SELECT count(0) from `EntityAudioConfig` WHERE id = ?) <= 0 OR id = ? AND (SELECT count(0) from `EntityAudioConfig` WHERE id = ?) >0;";
const KEY_PREFIX = "EntityAudioConfigByIdWithZero";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configEntityAudioConfigByIdWithZero.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configEntityAudioConfigByIdWithZero.GetConfig");
const CONFIG_STAT_PREFIX = "configEntityAudioConfigByIdWithZero.GetConfig(";
exports.configEntityAudioConfigByIdWithZero = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i, n, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var C = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${i}#${n})`);
    C?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (t) {
        var f = `${KEY_PREFIX}#${o}#${i}#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (g) {
          C?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindString(handleId, 2, i, ...logPair) && ConfigCommon_1.ConfigCommon.BindString(handleId, 3, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o], ["Id", i], ["Id", n]) > 0) {
        f = undefined;
        [e, f] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o], ["Id", i], ["Id", n]);
        if (e) {
          const g = EntityAudioConfig_1.EntityAudioConfig.getRootAsEntityAudioConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)));
          if (t) {
            e = `${KEY_PREFIX}#${o}#${i}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, g);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          C?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    C?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=EntityAudioConfigByIdWithZero.js.map
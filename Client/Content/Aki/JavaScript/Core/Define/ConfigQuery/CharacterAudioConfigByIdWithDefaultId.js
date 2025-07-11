"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configCharacterAudioConfigByIdWithDefaultId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const CharacterAudioConfig_1 = require("../Config/CharacterAudioConfig");
const DB = "db_entity_audio.db";
const FILE = "y.音频组件配置.xlsx";
const TABLE = "CharacterAudioConfig";
const COMMAND = "select BinData from `CharacterAudioConfig` where id = ? AND (SELECT count(0) from `CharacterAudioConfig` WHERE id = ?) <= 0 OR id = ? AND (SELECT count(0) from `CharacterAudioConfig` WHERE id = ?) >0;";
const KEY_PREFIX = "CharacterAudioConfigByIdWithDefaultId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configCharacterAudioConfigByIdWithDefaultId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configCharacterAudioConfigByIdWithDefaultId.GetConfig");
const CONFIG_STAT_PREFIX = "configCharacterAudioConfigByIdWithDefaultId.GetConfig(";
exports.configCharacterAudioConfigByIdWithDefaultId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i, n, t, C = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var a = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${i}#${n}#${t})`);
    a?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (C) {
        var f = `${KEY_PREFIX}#${o}#${i}#${n}#${t})`;
        const d = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (d) {
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return d;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 4, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o], ["Id", i], ["Id", n], ["Id", t]) > 0) {
        f = undefined;
        [e, f] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o], ["Id", i], ["Id", n], ["Id", t]);
        if (e) {
          const d = CharacterAudioConfig_1.CharacterAudioConfig.getRootAsCharacterAudioConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)));
          if (C) {
            e = `${KEY_PREFIX}#${o}#${i}#${n}#${t})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, d);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return d;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=CharacterAudioConfigByIdWithDefaultId.js.map
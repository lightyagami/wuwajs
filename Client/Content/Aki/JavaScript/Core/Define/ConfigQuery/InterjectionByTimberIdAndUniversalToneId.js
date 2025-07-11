"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configInterjectionByTimberIdAndUniversalToneId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const Interjection_1 = require("../Config/Interjection");
const DB = "db_audio_interjection.db";
const FILE = "k.可视化编辑/c.Csv/y.音频/y.音色语音事件映射/*.csv*";
const TABLE = "Interjection";
const COMMAND = "select BinData from `Interjection` where TimberId = ? AND UniversalToneId = ?";
const KEY_PREFIX = "InterjectionByTimberIdAndUniversalToneId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configInterjectionByTimberIdAndUniversalToneId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configInterjectionByTimberIdAndUniversalToneId.GetConfig");
const CONFIG_STAT_PREFIX = "configInterjectionByTimberIdAndUniversalToneId.GetConfig(";
exports.configInterjectionByTimberIdAndUniversalToneId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n}#${o})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (e) {
        var r = `${KEY_PREFIX}#${n}#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (C) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["TimberId", n], ["UniversalToneId", o]) > 0) {
        r = undefined;
        [t, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TimberId", n], ["UniversalToneId", o]);
        if (t) {
          const C = Interjection_1.Interjection.getRootAsInterjection(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          if (e) {
            t = `${KEY_PREFIX}#${n}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, C);
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
//# sourceMappingURL=InterjectionByTimberIdAndUniversalToneId.js.map
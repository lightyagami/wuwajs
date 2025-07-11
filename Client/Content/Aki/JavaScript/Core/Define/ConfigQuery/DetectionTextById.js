"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configDetectionTextById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DetectionText_1 = require("../Config/DetectionText");
const DB = "db_adventure_detect.db";
const FILE = "k.开拓探测.xlsx";
const TABLE = "DetectionText";
const COMMAND = "select BinData from `DetectionText` where Id=?";
const KEY_PREFIX = "DetectionTextById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configDetectionTextById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configDetectionTextById.GetConfig");
const CONFIG_STAT_PREFIX = "configDetectionTextById.GetConfig(";
exports.configDetectionTextById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (t, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${t})`);
    e?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (o) {
        var i = `${KEY_PREFIX}#${t})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (C) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", t]) > 0) {
        i = undefined;
        [n, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", t]);
        if (n) {
          const C = DetectionText_1.DetectionText.getRootAsDetectionText(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (o) {
            n = `${KEY_PREFIX}#${t})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=DetectionTextById.js.map
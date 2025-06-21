"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configDetectionTabTypeById = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  DetectionTabType_1 = require("../Config/DetectionTabType"),
  DB = "db_adventure_detect.db",
  FILE = "k.开拓探测.xlsx",
  TABLE = "DetectionTabType",
  COMMAND = "select BinData from `DetectionTabType` where Id=?",
  KEY_PREFIX = "DetectionTabTypeById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configDetectionTabTypeById.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configDetectionTabTypeById.GetConfig"),
  CONFIG_STAT_PREFIX = "configDetectionTabTypeById.GetConfig(";
exports.configDetectionTabTypeById = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (o, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${o})`),
      n = (t?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (e) {
        var i = KEY_PREFIX + `#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (a) return t?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), a
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["Id", o])) {
        i = void 0;
        if ([n, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]), n) {
          const a = DetectionTabType_1.DetectionTabType.getRootAsDetectionTabType(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          return e && (n = KEY_PREFIX + `#${o})`, ConfigCommon_1.ConfigCommon.SaveConfig(n, a)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), t?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), a
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    t?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=DetectionTabTypeById.js.map
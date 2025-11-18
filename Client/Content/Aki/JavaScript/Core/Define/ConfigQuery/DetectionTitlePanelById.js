"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configDetectionTitlePanelById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DetectionTitlePanel_1 = require("../Config/DetectionTitlePanel");
const DB = "db_adventure_detect.db";
const FILE = "k.开拓探测.xlsx";
const TABLE = "DetectionTitlePanel";
const COMMAND = "select BinData from `DetectionTitlePanel` where Id=?";
const KEY_PREFIX = "DetectionTitlePanelById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configDetectionTitlePanelById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configDetectionTitlePanelById.GetConfig");
const CONFIG_STAT_PREFIX = "configDetectionTitlePanelById.GetConfig(";
exports.configDetectionTitlePanelById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    n?.Start();
    var o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (o) {
      if (t) {
        var i = `${KEY_PREFIX}#${e})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (a) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (o = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", e]) > 0) {
        i = undefined;
        [o, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", e]);
        if (o) {
          const a = DetectionTitlePanel_1.DetectionTitlePanel.getRootAsDetectionTitlePanel(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (t) {
            o = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(o, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=DetectionTitlePanelById.js.map
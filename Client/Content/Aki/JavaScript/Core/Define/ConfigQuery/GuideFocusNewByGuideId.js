"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configGuideFocusNewByGuideId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const GuideFocusNew_1 = require("../Config/GuideFocusNew");
const DB = "db_guide_new.db";
const FILE = "y.引导(新).xlsx";
const TABLE = "GuideFocusNew";
const COMMAND = "select BinData from `GuideFocusNew` where GuideId=?";
const KEY_PREFIX = "GuideFocusNewByGuideId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configGuideFocusNewByGuideId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configGuideFocusNewByGuideId.GetConfig");
const CONFIG_STAT_PREFIX = "configGuideFocusNewByGuideId.GetConfig(";
exports.configGuideFocusNewByGuideId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    i?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (e) {
        var t = `${KEY_PREFIX}#${o})`;
        const d = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (d) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return d;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["GuideId", o]) > 0) {
        t = undefined;
        [n, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["GuideId", o]);
        if (n) {
          const d = GuideFocusNew_1.GuideFocusNew.getRootAsGuideFocusNew(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (e) {
            n = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, d);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return d;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=GuideFocusNewByGuideId.js.map
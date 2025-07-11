"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configGuideTutorialAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const GuideTutorial_1 = require("../Config/GuideTutorial");
const DB = "db_guide_new.db";
const FILE = "y.引导(新).xlsx";
const TABLE = "GuideTutorial";
const COMMAND = "select BinData from `GuideTutorial`";
const KEY_PREFIX = "GuideTutorialAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configGuideTutorialAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configGuideTutorialAll.GetConfigList");
exports.configGuideTutorialAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o = true) => {
    var i;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (o) {
        var t = KEY_PREFIX + ")";
        const e = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (e) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      const e = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var n = undefined;
        [i, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!i) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        n = GuideTutorial_1.GuideTutorial.getRootAsGuideTutorial(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
        e.push(n);
      }
      if (o) {
        t = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(t, e, e.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return e;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=GuideTutorialAll.js.map
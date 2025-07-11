"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configUiDynamicTabByChildViewName = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const UiDynamicTab_1 = require("../Config/UiDynamicTab");
const DB = "db_ui.db";
const FILE = "u.UI动态页签.csv";
const TABLE = "UiDynamicTab";
const COMMAND = "select BinData from `UiDynamicTab` where ChildViewName = ?";
const KEY_PREFIX = "UiDynamicTabByChildViewName";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configUiDynamicTabByChildViewName.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configUiDynamicTabByChildViewName.GetConfig");
const CONFIG_STAT_PREFIX = "configUiDynamicTabByChildViewName.GetConfig(";
exports.configUiDynamicTabByChildViewName = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (i, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${i})`);
    o?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (n) {
        var a = `${KEY_PREFIX}#${i})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (t) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ChildViewName", i]) > 0) {
        a = undefined;
        [e, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ChildViewName", i]);
        if (e) {
          const t = UiDynamicTab_1.UiDynamicTab.getRootAsUiDynamicTab(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (n) {
            e = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=UiDynamicTabByChildViewName.js.map
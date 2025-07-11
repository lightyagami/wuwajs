"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configUiDynamicTabByParentViewName = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const UiDynamicTab_1 = require("../Config/UiDynamicTab");
const DB = "db_ui.db";
const FILE = "u.UI动态页签.csv";
const TABLE = "UiDynamicTab";
const COMMAND = "select BinData from `UiDynamicTab` where ParentViewName = ?";
const KEY_PREFIX = "UiDynamicTabByParentViewName";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configUiDynamicTabByParentViewName.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configUiDynamicTabByParentViewName.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configUiDynamicTabByParentViewName.GetConfigList(";
exports.configUiDynamicTabByParentViewName = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (i, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${i})`);
    o?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var e = `${KEY_PREFIX}#${i})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (m) {
          o?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, i, ...logPair)) {
        const m = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ParentViewName", i]) !== 1) {
            break;
          }
          var a = undefined;
          [t, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ParentViewName", i]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            o?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          a = UiDynamicTab_1.UiDynamicTab.getRootAsUiDynamicTab(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          m.push(a);
        }
        if (n) {
          e = `${KEY_PREFIX}#${i})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, m, m.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        o?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return m;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=UiDynamicTabByParentViewName.js.map
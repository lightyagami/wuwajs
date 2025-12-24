"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configCommonTouchUiEditByPanelResId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const CommonTouchUiEdit_1 = require("../Config/CommonTouchUiEdit");
const DB = "db_commontouchuiedit.db";
const FILE = "y.移动端活动玩法主界面键位配置.xlsx";
const TABLE = "CommonTouchUiEdit";
const COMMAND = "select BinData from `CommonTouchUiEdit` where PanelResId=?";
const KEY_PREFIX = "CommonTouchUiEditByPanelResId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configCommonTouchUiEditByPanelResId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configCommonTouchUiEditByPanelResId.GetConfig");
const CONFIG_STAT_PREFIX = "configCommonTouchUiEditByPanelResId.GetConfig(";
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configCommonTouchUiEditByPanelResId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configCommonTouchUiEditByPanelResId.GetConfigList(";
exports.configCommonTouchUiEditByPanelResId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var e = `${KEY_PREFIX}#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (C) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["PanelResId", o]) > 0) {
        e = undefined;
        [t, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["PanelResId", o]);
        if (t) {
          const C = CommonTouchUiEdit_1.CommonTouchUiEdit.getRootAsCommonTouchUiEdit(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (n) {
            t = `${KEY_PREFIX}#${o})`;
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
  },
  GetConfigList: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var e = `${KEY_PREFIX}#${o})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (m) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair)) {
        const m = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["PanelResId", o]) !== 1) {
            break;
          }
          var C = undefined;
          [t, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["PanelResId", o]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          C = CommonTouchUiEdit_1.CommonTouchUiEdit.getRootAsCommonTouchUiEdit(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          m.push(C);
        }
        if (n) {
          e = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, m, m.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return m;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=CommonTouchUiEditByPanelResId.js.map
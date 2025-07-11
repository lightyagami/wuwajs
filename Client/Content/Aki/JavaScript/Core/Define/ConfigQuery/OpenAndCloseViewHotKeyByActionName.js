"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configOpenAndCloseViewHotKeyByActionName = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const OpenAndCloseViewHotKey_1 = require("../Config/OpenAndCloseViewHotKey");
const DB = "db_input_settings.db";
const FILE = "s.输入配置.xlsx";
const TABLE = "OpenAndCloseViewHotKey";
const COMMAND = "select BinData from `OpenAndCloseViewHotKey` where ActionName=?";
const KEY_PREFIX = "OpenAndCloseViewHotKeyByActionName";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configOpenAndCloseViewHotKeyByActionName.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configOpenAndCloseViewHotKeyByActionName.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configOpenAndCloseViewHotKeyByActionName.GetConfigList(";
exports.configOpenAndCloseViewHotKeyByActionName = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    e?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (n) {
        var t = `${KEY_PREFIX}#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (a) {
          e?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair)) {
        const a = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ActionName", o]) !== 1) {
            break;
          }
          var C = undefined;
          [i, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActionName", o]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            e?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          C = OpenAndCloseViewHotKey_1.OpenAndCloseViewHotKey.getRootAsOpenAndCloseViewHotKey(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          a.push(C);
        }
        if (n) {
          t = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(t, a, a.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        e?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return a;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=OpenAndCloseViewHotKeyByActionName.js.map
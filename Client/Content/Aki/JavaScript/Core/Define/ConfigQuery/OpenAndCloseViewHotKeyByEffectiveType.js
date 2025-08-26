"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configOpenAndCloseViewHotKeyByEffectiveType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const OpenAndCloseViewHotKey_1 = require("../Config/OpenAndCloseViewHotKey");
const DB = "db_input_settings.db";
const FILE = "s.输入配置.xlsx";
const TABLE = "OpenAndCloseViewHotKey";
const COMMAND = "select BinData from `OpenAndCloseViewHotKey` where EffectiveType=?";
const KEY_PREFIX = "OpenAndCloseViewHotKeyByEffectiveType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configOpenAndCloseViewHotKeyByEffectiveType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configOpenAndCloseViewHotKeyByEffectiveType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configOpenAndCloseViewHotKeyByEffectiveType.GetConfigList(";
exports.configOpenAndCloseViewHotKeyByEffectiveType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (e, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${e})`);
    n?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (o) {
        var t = `${KEY_PREFIX}#${e})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair)) {
        const C = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["EffectiveType", e]) !== 1) {
            break;
          }
          var f = undefined;
          [i, f] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["EffectiveType", e]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          f = OpenAndCloseViewHotKey_1.OpenAndCloseViewHotKey.getRootAsOpenAndCloseViewHotKey(new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)));
          C.push(f);
        }
        if (o) {
          t = `${KEY_PREFIX}#${e})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(t, C, C.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return C;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=OpenAndCloseViewHotKeyByEffectiveType.js.map
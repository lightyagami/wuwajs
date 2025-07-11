"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configAxisMappingByAxisType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AxisMapping_1 = require("../Config/AxisMapping");
const DB = "db_input_settings.db";
const FILE = "s.输入配置.xlsx";
const TABLE = "AxisMapping";
const COMMAND = "select BinData from `AxisMapping` where AxisType=?";
const KEY_PREFIX = "AxisMappingByAxisType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configAxisMappingByAxisType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configAxisMappingByAxisType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configAxisMappingByAxisType.GetConfigList(";
exports.configAxisMappingByAxisType = {
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
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a) {
          o?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair)) {
        const a = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["AxisType", i]) !== 1) {
            break;
          }
          var g = undefined;
          [t, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["AxisType", i]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            o?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          g = AxisMapping_1.AxisMapping.getRootAsAxisMapping(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          a.push(g);
        }
        if (n) {
          e = `${KEY_PREFIX}#${i})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, a, a.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        o?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return a;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=AxisMappingByAxisType.js.map
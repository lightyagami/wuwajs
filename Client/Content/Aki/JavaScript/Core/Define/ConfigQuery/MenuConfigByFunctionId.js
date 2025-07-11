"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMenuConfigByFunctionId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MenuConfig_1 = require("../Config/MenuConfig");
const DB = "db_menu.db";
const FILE = "s.设置系统.xlsx";
const TABLE = "MenuConfig";
const COMMAND = "select BinData from `MenuConfig` where FunctionId=?";
const KEY_PREFIX = "MenuConfigByFunctionId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMenuConfigByFunctionId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configMenuConfigByFunctionId.GetConfig");
const CONFIG_STAT_PREFIX = "configMenuConfigByFunctionId.GetConfig(";
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configMenuConfigByFunctionId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configMenuConfigByFunctionId.GetConfigList(";
exports.configMenuConfigByFunctionId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (o) {
        var C = `${KEY_PREFIX}#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (g) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["FunctionId", n]) > 0) {
        C = undefined;
        [t, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["FunctionId", n]);
        if (t) {
          const g = MenuConfig_1.MenuConfig.getRootAsMenuConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (o) {
            t = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, g);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
  GetConfigList: (n, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${n})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (o) {
        var C = `${KEY_PREFIX}#${n})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (e) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair)) {
        const e = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["FunctionId", n]) !== 1) {
            break;
          }
          var g = undefined;
          [t, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["FunctionId", n]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          g = MenuConfig_1.MenuConfig.getRootAsMenuConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          e.push(g);
        }
        if (o) {
          C = `${KEY_PREFIX}#${n})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(C, e, e.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return e;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MenuConfigByFunctionId.js.map
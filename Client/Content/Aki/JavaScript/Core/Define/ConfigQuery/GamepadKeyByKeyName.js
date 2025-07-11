"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configGamepadKeyByKeyName = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const GamepadKey_1 = require("../Config/GamepadKey");
const DB = "db_key.db";
const FILE = "a.按键.xlsx";
const TABLE = "GamepadKey";
const COMMAND = "select BinData from `GamepadKey` where KeyName=?";
const KEY_PREFIX = "GamepadKeyByKeyName";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configGamepadKeyByKeyName.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configGamepadKeyByKeyName.GetConfig");
const CONFIG_STAT_PREFIX = "configGamepadKeyByKeyName.GetConfig(";
exports.configGamepadKeyByKeyName = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    n?.Start();
    var a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (a) {
      if (o) {
        var i = `${KEY_PREFIX}#${e})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (t) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (a = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["KeyName", e]) > 0) {
        i = undefined;
        [a, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["KeyName", e]);
        if (a) {
          const t = GamepadKey_1.GamepadKey.getRootAsGamepadKey(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (o) {
            a = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(a, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=GamepadKeyByKeyName.js.map
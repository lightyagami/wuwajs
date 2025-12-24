"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configWeatherSwitchById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const WeatherSwitch_1 = require("../Config/WeatherSwitch");
const DB = "db_weather.db";
const FILE = "t.天气系统.xlsx";
const TABLE = "WeatherSwitch";
const COMMAND = "select BinData from `WeatherSwitch` where Id=?";
const KEY_PREFIX = "WeatherSwitchById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configWeatherSwitchById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configWeatherSwitchById.GetConfig");
const CONFIG_STAT_PREFIX = "configWeatherSwitchById.GetConfig(";
exports.configWeatherSwitchById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (t, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${t})`);
    e?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (o) {
        var i = `${KEY_PREFIX}#${t})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (a) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", t]) > 0) {
        i = undefined;
        [n, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", t]);
        if (n) {
          const a = WeatherSwitch_1.WeatherSwitch.getRootAsWeatherSwitch(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (o) {
            n = `${KEY_PREFIX}#${t})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=WeatherSwitchById.js.map
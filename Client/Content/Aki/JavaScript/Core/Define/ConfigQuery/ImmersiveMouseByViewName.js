"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configImmersiveMouseByViewName = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ImmersiveMouse_1 = require("../Config/ImmersiveMouse");
const DB = "db_input_settings.db";
const FILE = "s.输入配置.xlsx";
const TABLE = "ImmersiveMouse";
const COMMAND = "select BinData from `ImmersiveMouse` where ViewName=?";
const KEY_PREFIX = "ImmersiveMouseByViewName";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configImmersiveMouseByViewName.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configImmersiveMouseByViewName.GetConfig");
const CONFIG_STAT_PREFIX = "configImmersiveMouseByViewName.GetConfig(";
exports.configImmersiveMouseByViewName = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    i?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (o) {
        var t = `${KEY_PREFIX}#${e})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (m) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ViewName", e]) > 0) {
        t = undefined;
        [n, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ViewName", e]);
        if (n) {
          const m = ImmersiveMouse_1.ImmersiveMouse.getRootAsImmersiveMouse(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (o) {
            n = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, m);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ImmersiveMouseByViewName.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configImmersiveMouseAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ImmersiveMouse_1 = require("../Config/ImmersiveMouse");
const DB = "db_input_settings.db";
const FILE = "s.输入配置.xlsx";
const TABLE = "ImmersiveMouse";
const COMMAND = "select BinData from `ImmersiveMouse`";
const KEY_PREFIX = "ImmersiveMouseAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configImmersiveMouseAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configImmersiveMouseAll.GetConfigList");
exports.configImmersiveMouseAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o = true) => {
    var i;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (o) {
        var e = KEY_PREFIX + ")";
        const t = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (t) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      const t = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var n = undefined;
        [i, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!i) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        n = ImmersiveMouse_1.ImmersiveMouse.getRootAsImmersiveMouse(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
        t.push(n);
      }
      if (o) {
        e = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(e, t, t.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return t;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ImmersiveMouseAll.js.map
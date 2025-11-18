"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHonamiStoryScanMachineAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const HonamiStoryScanMachine_1 = require("../Config/HonamiStoryScanMachine");
const DB = "db_honamistory.db";
const FILE = "s.穗波奇妙物语局内.xlsx";
const TABLE = "HonamiStoryScanMachine";
const COMMAND = "select BinData from `HonamiStoryScanMachine`";
const KEY_PREFIX = "HonamiStoryScanMachineAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryScanMachineAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryScanMachineAll.GetConfigList");
exports.configHonamiStoryScanMachineAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o = true) => {
    var n;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (o) {
        var i = KEY_PREFIX + ")";
        const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (a) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      const a = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var t = undefined;
        [n, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!n) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        t = HonamiStoryScanMachine_1.HonamiStoryScanMachine.getRootAsHonamiStoryScanMachine(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
        a.push(t);
      }
      if (o) {
        i = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(i, a, a.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return a;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=HonamiStoryScanMachineAll.js.map
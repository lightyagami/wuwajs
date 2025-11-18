"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHonamiStoryScanMachineById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const HonamiStoryScanMachine_1 = require("../Config/HonamiStoryScanMachine");
const DB = "db_honamistory.db";
const FILE = "s.穗波奇妙物语局内.xlsx";
const TABLE = "HonamiStoryScanMachine";
const COMMAND = "select BinData from `HonamiStoryScanMachine` where Id=?";
const KEY_PREFIX = "HonamiStoryScanMachineById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryScanMachineById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryScanMachineById.GetConfig");
const CONFIG_STAT_PREFIX = "configHonamiStoryScanMachineById.GetConfig(";
exports.configHonamiStoryScanMachineById = {
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
        var a = `${KEY_PREFIX}#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (e) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        a = undefined;
        [t, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (t) {
          const e = HonamiStoryScanMachine_1.HonamiStoryScanMachine.getRootAsHonamiStoryScanMachine(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (n) {
            t = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, e);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=HonamiStoryScanMachineById.js.map
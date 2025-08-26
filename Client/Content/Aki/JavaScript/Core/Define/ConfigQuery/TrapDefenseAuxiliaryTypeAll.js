"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configTrapDefenseAuxiliaryTypeAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TrapDefenseAuxiliaryType_1 = require("../Config/TrapDefenseAuxiliaryType");
const DB = "db_trapdefense.db";
const FILE = "x.陷阱塔防活动_机关.xlsx";
const TABLE = "TrapDefenseAuxiliaryType";
const COMMAND = "select BinData from `TrapDefenseAuxiliaryType`";
const KEY_PREFIX = "TrapDefenseAuxiliaryTypeAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configTrapDefenseAuxiliaryTypeAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configTrapDefenseAuxiliaryTypeAll.GetConfigList");
exports.configTrapDefenseAuxiliaryTypeAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (e = true) => {
    var i;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (e) {
        var n = KEY_PREFIX + ")";
        const t = ConfigCommon_1.ConfigCommon.GetConfig(n);
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
        var o = undefined;
        [i, o] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!i) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        o = TrapDefenseAuxiliaryType_1.TrapDefenseAuxiliaryType.getRootAsTrapDefenseAuxiliaryType(new byte_buffer_1.ByteBuffer(new Uint8Array(o.buffer)));
        t.push(o);
      }
      if (e) {
        n = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(n, t, t.length);
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
//# sourceMappingURL=TrapDefenseAuxiliaryTypeAll.js.map
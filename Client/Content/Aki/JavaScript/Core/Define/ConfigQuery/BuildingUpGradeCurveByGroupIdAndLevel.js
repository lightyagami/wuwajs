"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configBuildingUpGradeCurveByGroupIdAndLevel = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BuildingUpGradeCurve_1 = require("../Config/BuildingUpGradeCurve");
const DB = "db_moonchasing.db";
const FILE = "z.追月节.xlsx";
const TABLE = "BuildingUpGradeCurve";
const COMMAND = "select BinData from `BuildingUpGradeCurve` where GroupId=? AND Level=?";
const KEY_PREFIX = "BuildingUpGradeCurveByGroupIdAndLevel";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configBuildingUpGradeCurveByGroupIdAndLevel.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configBuildingUpGradeCurveByGroupIdAndLevel.GetConfig");
const CONFIG_STAT_PREFIX = "configBuildingUpGradeCurveByGroupIdAndLevel.GetConfig(";
exports.configBuildingUpGradeCurveByGroupIdAndLevel = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${n})`);
    i?.Start();
    var r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (r) {
      if (e) {
        var t = `${KEY_PREFIX}#${o}#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (r = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["GroupId", o], ["Level", n]) > 0) {
        t = undefined;
        [r, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["GroupId", o], ["Level", n]);
        if (r) {
          const C = BuildingUpGradeCurve_1.BuildingUpGradeCurve.getRootAsBuildingUpGradeCurve(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (e) {
            r = `${KEY_PREFIX}#${o}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(r, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=BuildingUpGradeCurveByGroupIdAndLevel.js.map
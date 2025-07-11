"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configChildUiCameraMappingById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ChildUiCameraMapping_1 = require("../Config/ChildUiCameraMapping");
const DB = "db_uicamera.db";
const FILE = "u.Ui相机.xlsx";
const TABLE = "ChildUiCameraMapping";
const COMMAND = "select BinData from `ChildUiCameraMapping` where Id=?";
const KEY_PREFIX = "ChildUiCameraMappingById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configChildUiCameraMappingById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configChildUiCameraMappingById.GetConfig");
const CONFIG_STAT_PREFIX = "configChildUiCameraMappingById.GetConfig(";
exports.configChildUiCameraMappingById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (i, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${i})`);
    o?.Start();
    var a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (a) {
      if (n) {
        var C = `${KEY_PREFIX}#${i})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (e) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", i]) > 0) {
        C = undefined;
        [a, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", i]);
        if (a) {
          const e = ChildUiCameraMapping_1.ChildUiCameraMapping.getRootAsChildUiCameraMapping(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (n) {
            a = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(a, e);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ChildUiCameraMappingById.js.map
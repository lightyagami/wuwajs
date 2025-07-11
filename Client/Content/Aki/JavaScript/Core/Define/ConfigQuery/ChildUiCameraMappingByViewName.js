"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configChildUiCameraMappingByViewName = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ChildUiCameraMapping_1 = require("../Config/ChildUiCameraMapping");
const DB = "db_uicamera.db";
const FILE = "u.Ui相机.xlsx";
const TABLE = "ChildUiCameraMapping";
const COMMAND = "select BinData from `ChildUiCameraMapping` where ViewName=?";
const KEY_PREFIX = "ChildUiCameraMappingByViewName";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configChildUiCameraMappingByViewName.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configChildUiCameraMappingByViewName.GetConfig");
const CONFIG_STAT_PREFIX = "configChildUiCameraMappingByViewName.GetConfig(";
exports.configChildUiCameraMappingByViewName = {
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
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (n) {
        var a = `${KEY_PREFIX}#${i})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (C) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ViewName", i]) > 0) {
        a = undefined;
        [e, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ViewName", i]);
        if (e) {
          const C = ChildUiCameraMapping_1.ChildUiCameraMapping.getRootAsChildUiCameraMapping(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (n) {
            e = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ChildUiCameraMappingByViewName.js.map
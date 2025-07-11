"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configChildUiCameraMappingAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ChildUiCameraMapping_1 = require("../Config/ChildUiCameraMapping");
const DB = "db_uicamera.db";
const FILE = "u.Ui相机.xlsx";
const TABLE = "ChildUiCameraMapping";
const COMMAND = "select BinData from `ChildUiCameraMapping`";
const KEY_PREFIX = "ChildUiCameraMappingAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configChildUiCameraMappingAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configChildUiCameraMappingAll.GetConfigList");
exports.configChildUiCameraMappingAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (i = true) => {
    var o;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (i) {
        var n = KEY_PREFIX + ")";
        const a = ConfigCommon_1.ConfigCommon.GetConfig(n);
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
        [o, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!o) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        t = ChildUiCameraMapping_1.ChildUiCameraMapping.getRootAsChildUiCameraMapping(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
        a.push(t);
      }
      if (i) {
        n = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(n, a, a.length);
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
//# sourceMappingURL=ChildUiCameraMappingAll.js.map
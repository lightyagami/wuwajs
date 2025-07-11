"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configDeviceRenderFeatureByDeviceId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DeviceRenderFeature_1 = require("../Config/DeviceRenderFeature");
const DB = "db_device_render_feature.db";
const FILE = "s.设置机型适配.xlsx";
const TABLE = "DeviceRenderFeature";
const COMMAND = "select BinData from `DeviceRenderFeature` where DeviceId = ?";
const KEY_PREFIX = "DeviceRenderFeatureByDeviceId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configDeviceRenderFeatureByDeviceId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configDeviceRenderFeatureByDeviceId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configDeviceRenderFeatureByDeviceId.GetConfigList(";
exports.configDeviceRenderFeatureByDeviceId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (e, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${e})`);
    o?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (i) {
        var t = `${KEY_PREFIX}#${e})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (a) {
          o?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair)) {
        const a = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["DeviceId", e]) !== 1) {
            break;
          }
          var r = undefined;
          [n, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["DeviceId", e]);
          if (!n) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            o?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          r = DeviceRenderFeature_1.DeviceRenderFeature.getRootAsDeviceRenderFeature(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          a.push(r);
        }
        if (i) {
          t = `${KEY_PREFIX}#${e})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(t, a, a.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        o?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return a;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=DeviceRenderFeatureByDeviceId.js.map
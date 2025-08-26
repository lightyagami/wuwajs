"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configEntityOwnerDataById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const EntityOwnerData_1 = require("../Config/EntityOwnerData");
const DB = "db_entityownerdata.db";
const FILE = "UniverseEditor/EntityOwnerConfig/EntityOwner.csv";
const TABLE = "EntityOwnerData";
const COMMAND = "select BinData from `EntityOwnerData` where Guid=?";
const KEY_PREFIX = "EntityOwnerDataById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configEntityOwnerDataById.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configEntityOwnerDataById.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configEntityOwnerDataById.GetConfigList(";
exports.configEntityOwnerDataById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (t, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${t})`);
    i?.Start();
    var o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (o) {
      if (n) {
        var e = `${KEY_PREFIX}#${t})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (o = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, t, ...logPair)) {
        const r = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["Guid", t]) !== 1) {
            break;
          }
          var a = undefined;
          [o, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Guid", t]);
          if (!o) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          a = EntityOwnerData_1.EntityOwnerData.getRootAsEntityOwnerData(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          r.push(a);
        }
        if (n) {
          e = `${KEY_PREFIX}#${t})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, r, r.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return r;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=EntityOwnerDataById.js.map
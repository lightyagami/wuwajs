"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMapBlockInfoByMapId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MapBlockInfo_1 = require("../Config/MapBlockInfo");
const DB = "db_download.db";
const FILE = "b.包体管理.xlsx";
const TABLE = "MapBlockInfo";
const COMMAND = "select BinData from `MapBlockInfo` where MapId=?";
const KEY_PREFIX = "MapBlockInfoByMapId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMapBlockInfoByMapId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configMapBlockInfoByMapId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configMapBlockInfoByMapId.GetConfigList(";
exports.configMapBlockInfoByMapId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var a = `${KEY_PREFIX}#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (e) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const e = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["MapId", o]) !== 1) {
            break;
          }
          var f = undefined;
          [t, f] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MapId", o]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          f = MapBlockInfo_1.MapBlockInfo.getRootAsMapBlockInfo(new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)));
          e.push(f);
        }
        if (n) {
          a = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(a, e, e.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return e;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MapBlockInfoByMapId.js.map
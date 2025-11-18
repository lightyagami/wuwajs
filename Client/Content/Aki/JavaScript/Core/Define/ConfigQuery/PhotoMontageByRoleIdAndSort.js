"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPhotoMontageByRoleIdAndSort = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PhotoMontage_1 = require("../Config/PhotoMontage");
const DB = "db_photograph.db";
const FILE = "p.拍照.xlsx";
const TABLE = "PhotoMontage";
const COMMAND = "select BinData from `PhotoMontage` where RoleId=? And Sort=?";
const KEY_PREFIX = "PhotoMontageByRoleIdAndSort";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhotoMontageByRoleIdAndSort.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configPhotoMontageByRoleIdAndSort.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configPhotoMontageByRoleIdAndSort.GetConfigList(";
exports.configPhotoMontageByRoleIdAndSort = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, t, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o}#${t})`);
    i?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (n) {
        var g = `${KEY_PREFIX}#${o}#${t})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(g);
        if (C) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, t, ...logPair)) {
        const C = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["RoleId", o], ["Sort", t]) !== 1) {
            break;
          }
          var a = undefined;
          [e, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["RoleId", o], ["Sort", t]);
          if (!e) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          a = PhotoMontage_1.PhotoMontage.getRootAsPhotoMontage(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          C.push(a);
        }
        if (n) {
          g = `${KEY_PREFIX}#${o}#${t})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(g, C, C.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return C;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PhotoMontageByRoleIdAndSort.js.map
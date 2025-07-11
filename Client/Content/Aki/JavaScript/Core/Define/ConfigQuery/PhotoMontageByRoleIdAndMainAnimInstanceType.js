"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPhotoMontageByRoleIdAndMainAnimInstanceType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PhotoMontage_1 = require("../Config/PhotoMontage");
const DB = "db_photograph.db";
const FILE = "p.拍照.xlsx";
const TABLE = "PhotoMontage";
const COMMAND = "select BinData from `PhotoMontage` where RoleId=? And MainAnimInstanceType=?";
const KEY_PREFIX = "PhotoMontageByRoleIdAndMainAnimInstanceType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhotoMontageByRoleIdAndMainAnimInstanceType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configPhotoMontageByRoleIdAndMainAnimInstanceType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configPhotoMontageByRoleIdAndMainAnimInstanceType.GetConfigList(";
exports.configPhotoMontageByRoleIdAndMainAnimInstanceType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, n, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o}#${n})`);
    i?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (t) {
        var a = `${KEY_PREFIX}#${o}#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (C) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair)) {
        const C = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["RoleId", o], ["MainAnimInstanceType", n]) !== 1) {
            break;
          }
          var g = undefined;
          [e, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["RoleId", o], ["MainAnimInstanceType", n]);
          if (!e) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          g = PhotoMontage_1.PhotoMontage.getRootAsPhotoMontage(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          C.push(g);
        }
        if (t) {
          a = `${KEY_PREFIX}#${o}#${n})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(a, C, C.length);
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
//# sourceMappingURL=PhotoMontageByRoleIdAndMainAnimInstanceType.js.map
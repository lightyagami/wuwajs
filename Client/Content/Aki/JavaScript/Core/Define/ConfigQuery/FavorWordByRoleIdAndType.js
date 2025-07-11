"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFavorWordByRoleIdAndType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FavorWord_1 = require("../Config/FavorWord");
const DB = "db_favor.db";
const FILE = "h.好感度.xlsx";
const TABLE = "FavorWord";
const COMMAND = "select BinData from `FavorWord` where RoleId=? and Type=? Order By Sort";
const KEY_PREFIX = "FavorWordByRoleIdAndType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFavorWordByRoleIdAndType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configFavorWordByRoleIdAndType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configFavorWordByRoleIdAndType.GetConfigList(";
exports.configFavorWordByRoleIdAndType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, n, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o}#${n})`);
    t?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (i) {
        var r = `${KEY_PREFIX}#${o}#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (C) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair)) {
        const C = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["RoleId", o], ["Type", n]) !== 1) {
            break;
          }
          var a = undefined;
          [e, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["RoleId", o], ["Type", n]);
          if (!e) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          a = FavorWord_1.FavorWord.getRootAsFavorWord(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          C.push(a);
        }
        if (i) {
          r = `${KEY_PREFIX}#${o}#${n})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(r, C, C.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return C;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=FavorWordByRoleIdAndType.js.map
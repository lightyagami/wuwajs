"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFlagAreaByAreaId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FlagArea_1 = require("../Config/FlagArea");
const DB = "db_moraleplay.db";
const FILE = "c.插旗玩法.xlsx";
const TABLE = "FlagArea";
const COMMAND = "select BinData from `FlagArea` where FlagAreaId=?";
const KEY_PREFIX = "FlagAreaByAreaId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFlagAreaByAreaId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configFlagAreaByAreaId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configFlagAreaByAreaId.GetConfigList(";
exports.configFlagAreaByAreaId = {
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
    var a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (a) {
      if (n) {
        var e = `${KEY_PREFIX}#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const r = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["FlagAreaId", o]) !== 1) {
            break;
          }
          var t = undefined;
          [a, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["FlagAreaId", o]);
          if (!a) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          t = FlagArea_1.FlagArea.getRootAsFlagArea(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          r.push(t);
        }
        if (n) {
          e = `${KEY_PREFIX}#${o})`;
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
//# sourceMappingURL=FlagAreaByAreaId.js.map
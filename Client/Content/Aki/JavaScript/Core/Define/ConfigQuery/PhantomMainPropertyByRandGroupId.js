"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPhantomMainPropertyByRandGroupId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PhantomMainProperty_1 = require("../Config/PhantomMainProperty");
const DB = "db_phantom.db";
const FILE = "h.幻象.xlsx";
const TABLE = "PhantomMainProperty";
const COMMAND = "select BinData from `PhantomMainProperty` where RandGroupId=?";
const KEY_PREFIX = "PhantomMainPropertyByRandGroupId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomMainPropertyByRandGroupId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomMainPropertyByRandGroupId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configPhantomMainPropertyByRandGroupId.GetConfigList(";
exports.configPhantomMainPropertyByRandGroupId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    t?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (n) {
        var a = `${KEY_PREFIX}#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (e) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const e = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["RandGroupId", o]) !== 1) {
            break;
          }
          var r = undefined;
          [i, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["RandGroupId", o]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          r = PhantomMainProperty_1.PhantomMainProperty.getRootAsPhantomMainProperty(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          e.push(r);
        }
        if (n) {
          a = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(a, e, e.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return e;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PhantomMainPropertyByRandGroupId.js.map
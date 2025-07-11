"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSlashBuffToItemBySeason = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SlashBuffToItem_1 = require("../Config/SlashBuffToItem");
const DB = "db_shiptower.db";
const FILE = "g.割草爬塔常驻.xlsx";
const TABLE = "SlashBuffToItem";
const COMMAND = "select BinData from `SlashBuffToItem` where Season=?";
const KEY_PREFIX = "SlashBuffToItemBySeason";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSlashBuffToItemBySeason.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configSlashBuffToItemBySeason.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configSlashBuffToItemBySeason.GetConfigList(";
exports.configSlashBuffToItemBySeason = {
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
        var e = `${KEY_PREFIX}#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const a = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["Season", o]) !== 1) {
            break;
          }
          var f = undefined;
          [i, f] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Season", o]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          f = SlashBuffToItem_1.SlashBuffToItem.getRootAsSlashBuffToItem(new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)));
          a.push(f);
        }
        if (n) {
          e = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, a, a.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return a;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SlashBuffToItemBySeason.js.map
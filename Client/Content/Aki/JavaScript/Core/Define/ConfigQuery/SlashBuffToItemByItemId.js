"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSlashBuffToItemByItemId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SlashBuffToItem_1 = require("../Config/SlashBuffToItem");
const DB = "db_shiptower.db";
const FILE = "g.割草爬塔常驻.xlsx";
const TABLE = "SlashBuffToItem";
const COMMAND = "select BinData from `SlashBuffToItem` where ItemId=?";
const KEY_PREFIX = "SlashBuffToItemByItemId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSlashBuffToItemByItemId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configSlashBuffToItemByItemId.GetConfig");
const CONFIG_STAT_PREFIX = "configSlashBuffToItemByItemId.GetConfig(";
exports.configSlashBuffToItemByItemId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    n?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (t) {
        var f = `${KEY_PREFIX}#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (i) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ItemId", o]) > 0) {
        f = undefined;
        [e, f] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ItemId", o]);
        if (e) {
          const i = SlashBuffToItem_1.SlashBuffToItem.getRootAsSlashBuffToItem(new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)));
          if (t) {
            e = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, i);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SlashBuffToItemByItemId.js.map
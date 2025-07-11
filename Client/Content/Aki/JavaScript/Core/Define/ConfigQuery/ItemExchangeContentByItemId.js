"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configItemExchangeContentByItemId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ItemExchangeContent_1 = require("../Config/ItemExchangeContent");
const DB = "db_item_exchange.db";
const FILE = "d.道具兑换.xlsx";
const TABLE = "ItemExchangeContent";
const COMMAND = "select BinData from `ItemExchangeContent` where ItemId=?";
const KEY_PREFIX = "ItemExchangeContentByItemId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configItemExchangeContentByItemId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configItemExchangeContentByItemId.GetConfig");
const CONFIG_STAT_PREFIX = "configItemExchangeContentByItemId.GetConfig(";
exports.configItemExchangeContentByItemId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    e?.Start();
    var o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (o) {
      if (t) {
        var i = `${KEY_PREFIX}#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (C) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (o = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ItemId", n]) > 0) {
        i = undefined;
        [o, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ItemId", n]);
        if (o) {
          const C = ItemExchangeContent_1.ItemExchangeContent.getRootAsItemExchangeContent(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (t) {
            o = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(o, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ItemExchangeContentByItemId.js.map
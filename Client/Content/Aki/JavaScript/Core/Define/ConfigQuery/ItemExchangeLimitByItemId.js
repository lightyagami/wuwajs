"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configItemExchangeLimitByItemId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ItemExchangeLimit_1 = require("../Config/ItemExchangeLimit");
const DB = "db_item_exchange.db";
const FILE = "d.道具兑换.xlsx";
const TABLE = "ItemExchangeLimit";
const COMMAND = "select BinData from `ItemExchangeLimit` where ItemId=?";
const KEY_PREFIX = "ItemExchangeLimitByItemId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configItemExchangeLimitByItemId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configItemExchangeLimitByItemId.GetConfig");
const CONFIG_STAT_PREFIX = "configItemExchangeLimitByItemId.GetConfig(";
exports.configItemExchangeLimitByItemId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (t, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${t})`);
    e?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (n) {
        var o = `${KEY_PREFIX}#${t})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(o);
        if (m) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ItemId", t]) > 0) {
        o = undefined;
        [i, o] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ItemId", t]);
        if (i) {
          const m = ItemExchangeLimit_1.ItemExchangeLimit.getRootAsItemExchangeLimit(new byte_buffer_1.ByteBuffer(new Uint8Array(o.buffer)));
          if (n) {
            i = `${KEY_PREFIX}#${t})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, m);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ItemExchangeLimitByItemId.js.map
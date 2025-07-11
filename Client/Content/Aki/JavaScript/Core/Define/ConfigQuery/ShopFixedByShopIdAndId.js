"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configShopFixedByShopIdAndId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ShopFixed_1 = require("../Config/ShopFixed");
const DB = "db_shop.db";
const FILE = "s.商城.xlsx";
const TABLE = "ShopFixed";
const COMMAND = "select BinData from `ShopFixed` where ShopId =? AND Id = ?";
const KEY_PREFIX = "ShopFixedByShopIdAndId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configShopFixedByShopIdAndId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configShopFixedByShopIdAndId.GetConfig");
const CONFIG_STAT_PREFIX = "configShopFixedByShopIdAndId.GetConfig(";
exports.configShopFixedByShopIdAndId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${n})`);
    e?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (i) {
        var d = `${KEY_PREFIX}#${o}#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(d);
        if (C) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ShopId", o], ["Id", n]) > 0) {
        d = undefined;
        [t, d] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ShopId", o], ["Id", n]);
        if (t) {
          const C = ShopFixed_1.ShopFixed.getRootAsShopFixed(new byte_buffer_1.ByteBuffer(new Uint8Array(d.buffer)));
          if (i) {
            t = `${KEY_PREFIX}#${o}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, C);
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
//# sourceMappingURL=ShopFixedByShopIdAndId.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPayShopTabByShopIdAndTabId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PayShopTab_1 = require("../Config/PayShopTab");
const DB = "db_payshop.db";
const FILE = "s.商业化商城.xlsx";
const TABLE = "PayShopTab";
const COMMAND = "select BinData from `PayShopTab` where ShopId=? And TabId=?";
const KEY_PREFIX = "PayShopTabByShopIdAndTabId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPayShopTabByShopIdAndTabId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPayShopTabByShopIdAndTabId.GetConfig");
const CONFIG_STAT_PREFIX = "configPayShopTabByShopIdAndTabId.GetConfig(";
exports.configPayShopTabByShopIdAndTabId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n, a = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${n})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (a) {
        var e = `${KEY_PREFIX}#${o}#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (C) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ShopId", o], ["TabId", n]) > 0) {
        e = undefined;
        [t, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ShopId", o], ["TabId", n]);
        if (t) {
          const C = PayShopTab_1.PayShopTab.getRootAsPayShopTab(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (a) {
            t = `${KEY_PREFIX}#${o}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PayShopTabByShopIdAndTabId.js.map
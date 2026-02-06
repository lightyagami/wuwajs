"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configDrinksRoleLikeDrinkById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DrinksRoleLikeDrink_1 = require("../Config/DrinksRoleLikeDrink");
const DB = "db_drinks.db";
const FILE = "t.调饮料.xlsx";
const TABLE = "DrinksRoleLikeDrink";
const COMMAND = "select BinData from `DrinksRoleLikeDrink` where Id=?";
const KEY_PREFIX = "DrinksRoleLikeDrinkById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configDrinksRoleLikeDrinkById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configDrinksRoleLikeDrinkById.GetConfig");
const CONFIG_STAT_PREFIX = "configDrinksRoleLikeDrinkById.GetConfig(";
exports.configDrinksRoleLikeDrinkById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    o?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (i) {
        var t = `${KEY_PREFIX}#${n})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (r) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        t = undefined;
        [e, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (e) {
          const r = DrinksRoleLikeDrink_1.DrinksRoleLikeDrink.getRootAsDrinksRoleLikeDrink(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (i) {
            e = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, r);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=DrinksRoleLikeDrinkById.js.map
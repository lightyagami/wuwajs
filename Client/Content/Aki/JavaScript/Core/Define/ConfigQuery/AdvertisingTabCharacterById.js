"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configAdvertisingTabCharacterById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AdvertisingTabCharacter_1 = require("../Config/AdvertisingTabCharacter");
const DB = "db_advertisingpage.db";
const FILE = "x.下一版本核心内容展示.xlsx";
const TABLE = "AdvertisingTabCharacter";
const COMMAND = "select BinData from `AdvertisingTabCharacter` where Id=?";
const KEY_PREFIX = "AdvertisingTabCharacterById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configAdvertisingTabCharacterById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configAdvertisingTabCharacterById.GetConfig");
const CONFIG_STAT_PREFIX = "configAdvertisingTabCharacterById.GetConfig(";
exports.configAdvertisingTabCharacterById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (i, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${i})`);
    o?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var e = `${KEY_PREFIX}#${i})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", i]) > 0) {
        e = undefined;
        [t, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", i]);
        if (t) {
          const a = AdvertisingTabCharacter_1.AdvertisingTabCharacter.getRootAsAdvertisingTabCharacter(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (n) {
            t = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=AdvertisingTabCharacterById.js.map
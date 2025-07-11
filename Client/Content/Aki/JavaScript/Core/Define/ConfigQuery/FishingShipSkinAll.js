"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFishingShipSkinAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FishingShipSkin_1 = require("../Config/FishingShipSkin");
const DB = "db_fishing.db";
const FILE = "b.捕鱼船坞.xlsx";
const TABLE = "FishingShipSkin";
const COMMAND = "select BinData from `FishingShipSkin`";
const KEY_PREFIX = "FishingShipSkinAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFishingShipSkinAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configFishingShipSkinAll.GetConfigList");
exports.configFishingShipSkinAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (i = true) => {
    var n;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (i) {
        var o = KEY_PREFIX + ")";
        const e = ConfigCommon_1.ConfigCommon.GetConfig(o);
        if (e) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      const e = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var t = undefined;
        [n, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!n) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        t = FishingShipSkin_1.FishingShipSkin.getRootAsFishingShipSkin(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
        e.push(t);
      }
      if (i) {
        o = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(o, e, e.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return e;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=FishingShipSkinAll.js.map
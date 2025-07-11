"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configItemInfoByItemType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ItemInfo_1 = require("../Config/ItemInfo");
const DB = "db_item.db";
const FILE = "d.道具.xlsx";
const TABLE = "ItemInfo";
const COMMAND = "select BinData from `ItemInfo` where ItemType=?";
const KEY_PREFIX = "ItemInfoByItemType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configItemInfoByItemType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configItemInfoByItemType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configItemInfoByItemType.GetConfigList(";
exports.configItemInfoByItemType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    n?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (t) {
        var i = `${KEY_PREFIX}#${o})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (m) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const m = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ItemType", o]) !== 1) {
            break;
          }
          var f = undefined;
          [e, f] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ItemType", o]);
          if (!e) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          f = ItemInfo_1.ItemInfo.getRootAsItemInfo(new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)));
          m.push(f);
        }
        if (t) {
          i = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(i, m, m.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return m;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ItemInfoByItemType.js.map
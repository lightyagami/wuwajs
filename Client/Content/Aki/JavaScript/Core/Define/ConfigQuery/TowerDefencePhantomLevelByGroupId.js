"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configTowerDefencePhantomLevelByGroupId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TowerDefencePhantomLevel_1 = require("../Config/TowerDefencePhantomLevel");
const DB = "db_activity.db";
const FILE = "l.联机塔防活动.xlsx";
const TABLE = "TowerDefencePhantomLevel";
const COMMAND = "select BinData from `TowerDefencePhantomLevel` where GroupId = ?";
const KEY_PREFIX = "TowerDefencePhantomLevelByGroupId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configTowerDefencePhantomLevelByGroupId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configTowerDefencePhantomLevelByGroupId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configTowerDefencePhantomLevelByGroupId.GetConfigList(";
exports.configTowerDefencePhantomLevelByGroupId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (e) {
        var i = `${KEY_PREFIX}#${o})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (f) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const f = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["GroupId", o]) !== 1) {
            break;
          }
          var r = undefined;
          [t, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["GroupId", o]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          r = TowerDefencePhantomLevel_1.TowerDefencePhantomLevel.getRootAsTowerDefencePhantomLevel(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          f.push(r);
        }
        if (e) {
          i = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(i, f, f.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return f;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=TowerDefencePhantomLevelByGroupId.js.map
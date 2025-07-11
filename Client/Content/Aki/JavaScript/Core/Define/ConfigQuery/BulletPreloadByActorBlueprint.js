"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configBulletPreloadByActorBlueprint = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BulletPreload_1 = require("../Config/BulletPreload");
const DB = "db_bullet_preload.db";
const FILE = "Preload/BulletPreload.csv";
const TABLE = "BulletPreload";
const COMMAND = "select BinData from `BulletPreload` where ActorBlueprint=?";
const KEY_PREFIX = "BulletPreloadByActorBlueprint";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configBulletPreloadByActorBlueprint.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configBulletPreloadByActorBlueprint.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configBulletPreloadByActorBlueprint.GetConfigList(";
exports.configBulletPreloadByActorBlueprint = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    e?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (t) {
        var i = `${KEY_PREFIX}#${o})`;
        const l = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (l) {
          e?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return l;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair)) {
        const l = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ActorBlueprint", o]) !== 1) {
            break;
          }
          var r = undefined;
          [n, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActorBlueprint", o]);
          if (!n) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            e?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          r = BulletPreload_1.BulletPreload.getRootAsBulletPreload(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          l.push(r);
        }
        if (t) {
          i = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(i, l, l.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        e?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return l;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=BulletPreloadByActorBlueprint.js.map
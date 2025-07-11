"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configEntitySkillPreloadByActorBlueprint = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const EntitySkillPreload_1 = require("../Config/EntitySkillPreload");
const DB = "db_entity_skill_preload.db";
const FILE = "Preload/EntitySkillPreload.csv";
const TABLE = "EntitySkillPreload";
const COMMAND = "select BinData from `EntitySkillPreload` where ActorBlueprint=?";
const KEY_PREFIX = "EntitySkillPreloadByActorBlueprint";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configEntitySkillPreloadByActorBlueprint.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configEntitySkillPreloadByActorBlueprint.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configEntitySkillPreloadByActorBlueprint.GetConfigList(";
exports.configEntitySkillPreloadByActorBlueprint = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (t, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${t})`);
    i?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (o) {
        var e = `${KEY_PREFIX}#${t})`;
        const l = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (l) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return l;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, t, ...logPair)) {
        const l = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ActorBlueprint", t]) !== 1) {
            break;
          }
          var r = undefined;
          [n, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActorBlueprint", t]);
          if (!n) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          r = EntitySkillPreload_1.EntitySkillPreload.getRootAsEntitySkillPreload(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          l.push(r);
        }
        if (o) {
          e = `${KEY_PREFIX}#${t})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, l, l.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return l;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=EntitySkillPreloadByActorBlueprint.js.map
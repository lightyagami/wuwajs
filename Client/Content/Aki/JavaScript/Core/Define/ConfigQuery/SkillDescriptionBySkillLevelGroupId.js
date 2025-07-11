"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSkillDescriptionBySkillLevelGroupId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SkillDescription_1 = require("../Config/SkillDescription");
const DB = "db_skill.db";
const FILE = "j.技能.xlsx";
const TABLE = "SkillDescription";
const COMMAND = "select BinData from `SkillDescription` where SkillLevelGroupId = ?";
const KEY_PREFIX = "SkillDescriptionBySkillLevelGroupId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSkillDescriptionBySkillLevelGroupId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configSkillDescriptionBySkillLevelGroupId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configSkillDescriptionBySkillLevelGroupId.GetConfigList(";
exports.configSkillDescriptionBySkillLevelGroupId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (i, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${i})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (o) {
        var e = `${KEY_PREFIX}#${i})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair)) {
        const r = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["SkillLevelGroupId", i]) !== 1) {
            break;
          }
          var l = undefined;
          [t, l] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["SkillLevelGroupId", i]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          l = SkillDescription_1.SkillDescription.getRootAsSkillDescription(new byte_buffer_1.ByteBuffer(new Uint8Array(l.buffer)));
          r.push(l);
        }
        if (o) {
          e = `${KEY_PREFIX}#${i})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, r, r.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return r;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SkillDescriptionBySkillLevelGroupId.js.map
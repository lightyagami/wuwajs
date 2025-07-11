"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSkillLevelBySkillLevelGroupId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SkillLevel_1 = require("../Config/SkillLevel");
const DB = "db_skill.db";
const FILE = "j.技能.xlsx";
const TABLE = "SkillLevel";
const COMMAND = "select BinData from `SkillLevel` where SkillLevelGroupId = ?";
const KEY_PREFIX = "SkillLevelBySkillLevelGroupId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSkillLevelBySkillLevelGroupId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configSkillLevelBySkillLevelGroupId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configSkillLevelBySkillLevelGroupId.GetConfigList(";
exports.configSkillLevelBySkillLevelGroupId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    e?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (i) {
        var l = `${KEY_PREFIX}#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(l);
        if (C) {
          e?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const C = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["SkillLevelGroupId", o]) !== 1) {
            break;
          }
          var t = undefined;
          [n, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["SkillLevelGroupId", o]);
          if (!n) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            e?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          t = SkillLevel_1.SkillLevel.getRootAsSkillLevel(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          C.push(t);
        }
        if (i) {
          l = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(l, C, C.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        e?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return C;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SkillLevelBySkillLevelGroupId.js.map
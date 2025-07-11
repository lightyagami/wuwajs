"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSkillTreeByNodeGroupAndNodeIndex = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SkillTree_1 = require("../Config/SkillTree");
const DB = "db_skilltree.db";
const FILE = "j.技能树.xlsx";
const TABLE = "SkillTree";
const COMMAND = "select BinData from `SkillTree` where NodeGroup = ? AND NodeIndex = ?";
const KEY_PREFIX = "SkillTreeByNodeGroupAndNodeIndex";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSkillTreeByNodeGroupAndNodeIndex.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configSkillTreeByNodeGroupAndNodeIndex.GetConfig");
const CONFIG_STAT_PREFIX = "configSkillTreeByNodeGroupAndNodeIndex.GetConfig(";
exports.configSkillTreeByNodeGroupAndNodeIndex = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${e})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var r = `${KEY_PREFIX}#${o}#${e})`;
        const d = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (d) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return d;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["NodeGroup", o], ["NodeIndex", e]) > 0) {
        r = undefined;
        [t, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["NodeGroup", o], ["NodeIndex", e]);
        if (t) {
          const d = SkillTree_1.SkillTree.getRootAsSkillTree(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          if (n) {
            t = `${KEY_PREFIX}#${o}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, d);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return d;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SkillTreeByNodeGroupAndNodeIndex.js.map
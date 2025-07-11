"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configGuideDungeonSetDefineByStrId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const GuideDungeonSetDefine_1 = require("../Config/GuideDungeonSetDefine");
const DB = "db_guide_new.db";
const FILE = "y.引导(新).xlsx";
const TABLE = "GuideDungeonSetDefine";
const COMMAND = "select BinData from `GuideDungeonSetDefine` where StrId=?";
const KEY_PREFIX = "GuideDungeonSetDefineByStrId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configGuideDungeonSetDefineByStrId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configGuideDungeonSetDefineByStrId.GetConfig");
const CONFIG_STAT_PREFIX = "configGuideDungeonSetDefineByStrId.GetConfig(";
exports.configGuideDungeonSetDefineByStrId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    o?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (n) {
        var t = `${KEY_PREFIX}#${e})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (f) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["StrId", e]) > 0) {
        t = undefined;
        [i, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["StrId", e]);
        if (i) {
          const f = GuideDungeonSetDefine_1.GuideDungeonSetDefine.getRootAsGuideDungeonSetDefine(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (n) {
            i = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, f);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=GuideDungeonSetDefineByStrId.js.map
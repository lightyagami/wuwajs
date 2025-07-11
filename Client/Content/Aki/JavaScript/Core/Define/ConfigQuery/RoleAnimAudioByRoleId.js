"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRoleAnimAudioByRoleId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RoleAnimAudio_1 = require("../Config/RoleAnimAudio");
const DB = "db_role.db";
const FILE = "j.角色.xlsx";
const TABLE = "RoleAnimAudio";
const COMMAND = "select BinData from `RoleAnimAudio` where RoleId=?";
const KEY_PREFIX = "RoleAnimAudioByRoleId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRoleAnimAudioByRoleId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configRoleAnimAudioByRoleId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configRoleAnimAudioByRoleId.GetConfigList(";
exports.configRoleAnimAudioByRoleId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    n?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (i) {
        var t = `${KEY_PREFIX}#${o})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (f) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const f = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["RoleId", o]) !== 1) {
            break;
          }
          var C = undefined;
          [e, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["RoleId", o]);
          if (!e) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          C = RoleAnimAudio_1.RoleAnimAudio.getRootAsRoleAnimAudio(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          f.push(C);
        }
        if (i) {
          t = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(t, f, f.length);
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
//# sourceMappingURL=RoleAnimAudioByRoleId.js.map
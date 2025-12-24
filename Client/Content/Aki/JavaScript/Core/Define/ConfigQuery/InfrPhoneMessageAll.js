"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configInfrPhoneMessageAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const InfrPhoneMessage_1 = require("../Config/InfrPhoneMessage");
const DB = "db_infrastructure.db";
const FILE = "j.基建_档案馆.xlsx";
const TABLE = "InfrPhoneMessage";
const COMMAND = "select BinData from `InfrPhoneMessage`";
const KEY_PREFIX = "InfrPhoneMessageAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configInfrPhoneMessageAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configInfrPhoneMessageAll.GetConfigList");
exports.configInfrPhoneMessageAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (n = true) => {
    var o;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (n) {
        var e = KEY_PREFIX + ")";
        const i = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (i) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      const i = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var t = undefined;
        [o, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!o) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        t = InfrPhoneMessage_1.InfrPhoneMessage.getRootAsInfrPhoneMessage(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
        i.push(t);
      }
      if (n) {
        e = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(e, i, i.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return i;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=InfrPhoneMessageAll.js.map
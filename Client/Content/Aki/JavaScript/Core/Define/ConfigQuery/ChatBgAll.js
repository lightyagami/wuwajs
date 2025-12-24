"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configChatBgAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ChatBg_1 = require("../Config/ChatBg");
const DB = "db_phonemsg.db";
const FILE = "s.手机系统.xlsx";
const TABLE = "ChatBg";
const COMMAND = "select BinData from `ChatBg`";
const KEY_PREFIX = "ChatBgAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configChatBgAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configChatBgAll.GetConfigList");
exports.configChatBgAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o = true) => {
    var t;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (o) {
        var n = KEY_PREFIX + ")";
        const C = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (C) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      const C = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var i = undefined;
        [t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!t) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        i = ChatBg_1.ChatBg.getRootAsChatBg(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
        C.push(i);
      }
      if (o) {
        n = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(n, C, C.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return C;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ChatBgAll.js.map
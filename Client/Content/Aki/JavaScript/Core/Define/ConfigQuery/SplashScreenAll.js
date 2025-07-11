"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSplashScreenAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SplashScreen_1 = require("../Config/SplashScreen");
const DB = "db_splashscreen.db";
const FILE = "k.开屏动画.xlsx";
const TABLE = "SplashScreen";
const COMMAND = "select BinData from `SplashScreen`";
const KEY_PREFIX = "SplashScreenAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSplashScreenAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configSplashScreenAll.GetConfigList");
exports.configSplashScreenAll = {
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
        t = SplashScreen_1.SplashScreen.getRootAsSplashScreen(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
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
//# sourceMappingURL=SplashScreenAll.js.map
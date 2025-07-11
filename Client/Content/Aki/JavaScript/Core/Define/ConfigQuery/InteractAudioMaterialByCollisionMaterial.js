"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configInteractAudioMaterialByCollisionMaterial = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const InteractAudioMaterial_1 = require("../Config/InteractAudioMaterial");
const DB = "db_interactaudiomaterial.db";
const FILE = "k.可视化编辑/c.Csv/y.音频/j.交互材质音频/*.csv*";
const TABLE = "InteractAudioMaterial";
const COMMAND = "select BinData from `InteractAudioMaterial` where CollisionMaterial=?";
const KEY_PREFIX = "InteractAudioMaterialByCollisionMaterial";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configInteractAudioMaterialByCollisionMaterial.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configInteractAudioMaterialByCollisionMaterial.GetConfig");
const CONFIG_STAT_PREFIX = "configInteractAudioMaterialByCollisionMaterial.GetConfig(";
exports.configInteractAudioMaterialByCollisionMaterial = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    t?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (i) {
        var a = `${KEY_PREFIX}#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (e) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["CollisionMaterial", o]) > 0) {
        a = undefined;
        [n, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["CollisionMaterial", o]);
        if (n) {
          const e = InteractAudioMaterial_1.InteractAudioMaterial.getRootAsInteractAudioMaterial(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (i) {
            n = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, e);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=InteractAudioMaterialByCollisionMaterial.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configCommonParamById = undefined;
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DeserializeConfig_1 = require("../../Config/DeserializeConfig");
const FILE = "c.参数.xlsx";
const DB = "db_common_param.db";
const TABLE = "CommonParam";
const COMMAND = "select BinData from `CommonParam` where KeyName = ?";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const intCache = new Map();
const floatCache = new Map();
const long54Cache = new Map();
const boolCache = new Map();
const stringCache = new Map();
const intListCache = new Map();
const floatListCache = new Map();
const long54ListCache = new Map();
const stringListCache = new Map();
function getDataView(t) {
  var a;
  var o;
  if (a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ["command", COMMAND])) {
    if (a = (a = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, t, ...logPair, ["Id", t])) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", t]) > 0) {
      o = undefined;
      [a, o] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", t]);
      ConfigCommon_1.ConfigCommon.Reset(handleId);
      return [a, o];
    } else {
      ConfigCommon_1.ConfigCommon.Reset(handleId);
      return [false, undefined];
    }
  } else {
    return [false, undefined];
  }
}
const initStat = Stats_1.Stat.CreateNoFlameGraph("configCommonParamById.Init");
const getIntConfigStat = Stats_1.Stat.CreateNoFlameGraph("configCommonParamById.GetIntConfig");
const INT_STAT_PREFIX = "configCommonParamById.GetIntConfig(";
const getFloatConfigStat = Stats_1.Stat.CreateNoFlameGraph("configCommonParamById.GetFloatConfig");
const FLOAT_STAT_PREFIX = "configCommonParamById.GetFloatConfig(";
const getLong54ConfigStat = Stats_1.Stat.CreateNoFlameGraph("configCommonParamById.GetLong54Config");
const LONG54_STAT_PREFIX = "configCommonParamById.GetLong54Config(";
const getBoolConfigStat = Stats_1.Stat.CreateNoFlameGraph("configCommonParamById.GetBoolConfig");
const BOOL_STAT_PREFIX = "configCommonParamById.GetBoolConfig(";
const getStringConfigStat = Stats_1.Stat.CreateNoFlameGraph("configCommonParamById.GetStringConfig");
const STRING_STAT_PREFIX = "configCommonParamById.GetStringConfig(";
const getIntArrayConfigStat = Stats_1.Stat.CreateNoFlameGraph("configCommonParamById.GetIntArrayConfig");
const INT_ARRAY_STAT_PREFIX = "configCommonParamById.GetIntArrayConfig(";
const getFloatArrayConfigStat = Stats_1.Stat.CreateNoFlameGraph("configCommonParamById.GetFloatArrayConfig");
const FLOAT_ARRAY_STAT_PREFIX = "configCommonParamById.GetFloatArrayConfig(";
const getLong54ArrayConfigStat = Stats_1.Stat.CreateNoFlameGraph("configCommonParamById.GetLong54ArrayConfig");
const LONG54_ARRAY_STAT_PREFIX = "configCommonParamById.GetLong54ArrayConfig(";
const getStringArrayConfigStat = Stats_1.Stat.CreateNoFlameGraph("configCommonParamById.GetStringArrayConfig");
const STRING_ARRAY_STAT_PREFIX = "configCommonParamById.GetStringArrayConfig(";
exports.configCommonParamById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetIntConfig: t => {
    var a = Stats_1.Stat.CreateNoFlameGraph("" + INT_STAT_PREFIX + t + ")");
    getIntConfigStat?.Start();
    a?.Start();
    var o = intCache.get(t);
    if (o) {
      a?.Stop();
      getIntConfigStat?.Stop();
      return o;
    }
    var [o, n] = getDataView(t);
    if (o && (o = DeserializeConfig_1.DeserializeConfig.ParseInt(n, 0, ...logPair, ["Id", t])).Success) {
      intCache.set(t, o.Value);
      a?.Stop();
      getIntConfigStat?.Stop();
      return o.Value;
    }
    a?.Stop();
    getIntConfigStat?.Stop();
  },
  GetFloatConfig: t => {
    var a = Stats_1.Stat.CreateNoFlameGraph("" + FLOAT_STAT_PREFIX + t + ")");
    getFloatConfigStat?.Start();
    a?.Start();
    var o = floatCache.get(t);
    if (o) {
      a?.Stop();
      getFloatConfigStat?.Stop();
      return o;
    }
    var [o, n] = getDataView(t);
    if (o && (o = DeserializeConfig_1.DeserializeConfig.ParseFloat(n, 0, ...logPair, ["Id", t])).Success) {
      floatCache.set(t, o.Value);
      a?.Stop();
      getFloatConfigStat?.Stop();
      return o.Value;
    }
    a?.Stop();
    getFloatConfigStat?.Stop();
  },
  GetLong54Config: t => {
    var a = Stats_1.Stat.CreateNoFlameGraph("" + LONG54_STAT_PREFIX + t + ")");
    getLong54ConfigStat?.Start();
    a?.Start();
    var o = long54Cache.get(t);
    if (o) {
      a?.Stop();
      getLong54ConfigStat?.Stop();
      return o;
    }
    var [o, n] = getDataView(t);
    if (o && (o = DeserializeConfig_1.DeserializeConfig.ParseFloat64(n, 0, ...logPair, ["Id", t])).Success) {
      long54Cache.set(t, o.Value);
      a?.Stop();
      getLong54ConfigStat?.Stop();
      return o.Value;
    }
    a?.Stop();
    getLong54ConfigStat?.Stop();
  },
  GetBoolConfig: t => {
    var a = Stats_1.Stat.CreateNoFlameGraph("" + BOOL_STAT_PREFIX + t + ")");
    getBoolConfigStat?.Start();
    a?.Start();
    var o = boolCache.get(t);
    if (o) {
      a?.Stop();
      getBoolConfigStat?.Stop();
      return o;
    }
    var [o, n] = getDataView(t);
    if (o && (o = DeserializeConfig_1.DeserializeConfig.ParseBoolean(n, 0, ...logPair, ["Id", t])).Success) {
      boolCache.set(t, o.Value);
      a?.Stop();
      getBoolConfigStat?.Stop();
      return o.Value;
    }
    a?.Stop();
    getBoolConfigStat?.Stop();
  },
  GetStringConfig: t => {
    var a = Stats_1.Stat.CreateNoFlameGraph("" + STRING_STAT_PREFIX + t + ")");
    getStringConfigStat?.Start();
    a?.Start();
    var o = stringCache.get(t);
    if (o) {
      a?.Stop();
      getStringConfigStat?.Stop();
      return o;
    }
    var [o, n] = getDataView(t);
    if (o && (o = DeserializeConfig_1.DeserializeConfig.ParseString(n, 0, ...logPair, ["Id", t])).Success) {
      stringCache.set(t, o.Value);
      a?.Stop();
      getStringConfigStat?.Stop();
      return o.Value;
    }
    a?.Stop();
    getStringConfigStat?.Stop();
  },
  GetIntArrayConfig: o => {
    var n = Stats_1.Stat.CreateNoFlameGraph("" + INT_ARRAY_STAT_PREFIX + o + ")");
    getIntArrayConfigStat?.Start();
    n?.Start();
    if (r = intListCache.get(o)) {
      n?.Stop();
      getIntArrayConfigStat?.Stop();
      return r;
    }
    var [t, i] = getDataView(o);
    if (t) {
      var r = new Array();
      var g = DeserializeConfig_1.DeserializeConfig.ParseInt(i, 0, ...logPair, ["Id", o]);
      if (g.Success) {
        let a = g.Position;
        for (let t = 0; t < g.Value; t++) {
          var e = DeserializeConfig_1.DeserializeConfig.ParseInt(i, a, ...logPair, ["Id", o]);
          if (!e.Success) {
            n?.Stop();
            getIntArrayConfigStat?.Stop();
            return;
          }
          a = e.Position;
          r.push(e.Value);
        }
        intListCache.set(o, r);
        n?.Stop();
        getIntArrayConfigStat?.Stop();
        return r;
      }
    }
    n?.Stop();
    getIntArrayConfigStat?.Stop();
  },
  GetFloatArrayConfig: o => {
    var n = Stats_1.Stat.CreateNoFlameGraph("" + FLOAT_ARRAY_STAT_PREFIX + o + ")");
    getFloatArrayConfigStat?.Start();
    n?.Start();
    if (r = floatListCache.get(o)) {
      n?.Stop();
      getFloatArrayConfigStat?.Stop();
      return r;
    }
    var [t, i] = getDataView(o);
    if (t) {
      var r = new Array();
      var g = DeserializeConfig_1.DeserializeConfig.ParseInt(i, 0, ...logPair, ["Id", o]);
      if (g.Success) {
        let a = g.Position;
        for (let t = 0; t < g.Value; t++) {
          var e = DeserializeConfig_1.DeserializeConfig.ParseFloat(i, a, ...logPair, ["Id", o]);
          if (!e.Success) {
            n?.Stop();
            getFloatArrayConfigStat?.Stop();
            return;
          }
          a = e.Position;
          r.push(e.Value);
        }
        floatListCache.set(o, r);
        n?.Stop();
        getFloatArrayConfigStat?.Stop();
        return r;
      }
    }
    n?.Stop();
    getFloatArrayConfigStat?.Stop();
  },
  GetLong54ArrayConfig: o => {
    var n = Stats_1.Stat.CreateNoFlameGraph("" + LONG54_ARRAY_STAT_PREFIX + o + ")");
    getLong54ArrayConfigStat?.Start();
    n?.Start();
    if (r = long54ListCache.get(o)) {
      n?.Stop();
      getLong54ArrayConfigStat?.Stop();
      return r;
    }
    var [t, i] = getDataView(o);
    if (t) {
      var r = new Array();
      var g = DeserializeConfig_1.DeserializeConfig.ParseInt(i, 0, ...logPair, ["Id", o]);
      if (g.Success) {
        let a = g.Position;
        for (let t = 0; t < g.Value; t++) {
          var e = DeserializeConfig_1.DeserializeConfig.ParseFloat64(i, a, ...logPair, ["Id", o]);
          if (!e.Success) {
            n?.Stop();
            getLong54ArrayConfigStat?.Stop();
            return;
          }
          a = e.Position;
          r.push(e.Value);
        }
        long54ListCache.set(o, r);
        n?.Stop();
        getLong54ArrayConfigStat?.Stop();
        return r;
      }
    }
    n?.Stop();
    getLong54ArrayConfigStat?.Stop();
  },
  GetStringArrayConfig: o => {
    var n = Stats_1.Stat.CreateNoFlameGraph("" + STRING_ARRAY_STAT_PREFIX + o + ")");
    getStringArrayConfigStat?.Start();
    n?.Start();
    if (r = stringListCache.get(o)) {
      n?.Stop();
      getStringArrayConfigStat?.Stop();
      return r;
    }
    var [t, i] = getDataView(o);
    if (t) {
      var r = new Array();
      var g = DeserializeConfig_1.DeserializeConfig.ParseInt(i, 0, ...logPair, ["Id", o]);
      if (g.Success) {
        let a = g.Position;
        for (let t = 0; t < g.Value; t++) {
          var e = DeserializeConfig_1.DeserializeConfig.ParseString(i, a, ...logPair, ["Id", o]);
          if (!e.Success) {
            n?.Stop();
            getStringArrayConfigStat?.Stop();
            return;
          }
          a = e.Position;
          r.push(e.Value);
        }
        stringListCache.set(o, r);
        n?.Stop();
        getStringArrayConfigStat?.Stop();
        return r;
      }
    }
    n?.Stop();
    getStringArrayConfigStat?.Stop();
  }
};
//# sourceMappingURL=CommonParamById.js.map
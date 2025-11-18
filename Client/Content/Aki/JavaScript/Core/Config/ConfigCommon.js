"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigCommon = exports.toNumberTemp = exports.ConfigBase = exports.dataIntRef = exports.dataRef = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const LanguageSystem_1 = require("../Common/LanguageSystem");
const Log_1 = require("../Common/Log");
const Stats_1 = require("../Common/Stats");
const TrimLru_1 = require("../Container/TrimLru");
const CommonDbConnectManager_1 = require("./CommonDbConnectManager");
const ConfigStatementLibSync_1 = require("./ConfigStatementLibSync");
exports.dataRef = (0, puerts_1.$ref)(undefined);
exports.dataIntRef = (0, puerts_1.$ref)(0);
class ConfigBase {
  constructor() {
    this.RowId = 0;
  }
}
function toNumberTemp(o) {
  return Number(o);
}
exports.ConfigBase = ConfigBase;
exports.toNumberTemp = toNumberTemp;
class ConfigCommon {
  static SetLruCapacity(o) {
    this.G9.Capacity = o;
  }
  static SetDynamicConnectDb(o) {
    this.P7d = o;
  }
  static GetDynamicConnectDb() {
    return this.P7d;
  }
  static SaveConfig(o, n, t = 1) {
    this.G9.Put(o, n, t);
  }
  static GetConfig(o) {
    return this.G9.Get(o);
  }
  static ToList(n) {
    if (n) {
      var t = n.length;
      var e = new Array(t);
      for (let o = 0; o < t; o++) {
        e[o] = n[o];
      }
      return e;
    }
  }
  static GetProjectContentDir() {
    ConfigCommon.N9 ||= "" + UE.BlueprintPathsLibrary.ProjectContentDir();
    return ConfigCommon.N9;
  }
  static InitDataStatement(o, n, t) {
    if (ConfigCommon.P7d) {
      return CommonDbConnectManager_1.CommonDbConnectManager.InitDataStatement(o, n, t);
    }
    ConfigCommon.O9.Start();
    if (o !== 0) {
      ConfigCommon.O9.Stop();
      return o;
    }
    if (n.length <= 0 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Config", 2, "dbName为空！请确认该配置表在拆分Db表中是否有正确配置！");
    }
    var e = ConfigCommon.GetProjectContentDir() + "Aki/ConfigDB/" + n;
    var o = ConfigStatementLibSync_1.ConfigStatementLibSync.CreateStatement(e, t);
    switch (o) {
      case -1:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Config", 2, "找不到Db连接", ["path", e]);
        }
        break;
      case -2:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Config", 2, "创建语句失败", ["path", e], ["command", t]);
        }
    }
    ConfigCommon.O9.Stop();
    return o;
  }
  static GetLangStatementId(o, n, t, e = "") {
    if (ConfigCommon.P7d) {
      return CommonDbConnectManager_1.CommonDbConnectManager.GetLangStatementId(o, n, t, e);
    }
    ConfigCommon.k9.Start();
    if (n.length <= 0 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Config", 2, "dbName为空！请确认该配置表在拆分Db表中是否有正确配置！");
    }
    e = e && e.length !== 0 ? e : LanguageSystem_1.LanguageSystem.PackageLanguage;
    o = n + o;
    let C = ConfigCommon.F9.get(o);
    if (!C) {
      C = new Map();
      ConfigCommon.F9.set(o, C);
    }
    let i = C.get(e);
    if (!i) {
      var m = `${ConfigCommon.GetProjectContentDir()}Aki/ConfigDB/${e}/${n}`;
      switch (i = ConfigStatementLibSync_1.ConfigStatementLibSync.CreateStatement(m, t)) {
        case -1:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Config", 2, "找不到语言表Db连接", ["path", m]);
          }
          break;
        case -2:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Config", 2, "创建语言表语句失败", ["path", m], ["command", t]);
          }
      }
      C.set(e, i);
    }
    ConfigCommon.k9.Stop();
    return i;
  }
  static ClearLangAllStatementId(o, n) {
    if (ConfigCommon.P7d) {
      CommonDbConnectManager_1.CommonDbConnectManager.ClearLangAllStatementId(o, n);
    } else {
      n = n + o;
      for (const t of ConfigCommon.F9.get(n)?.values() ?? []) {
        UE.KuroPrepareStatementLib.DestroyStatement(t);
      }
      ConfigCommon.F9.delete(n);
    }
  }
  static CheckStatement(o, ...n) {
    if (ConfigCommon.P7d) {
      return CommonDbConnectManager_1.CommonDbConnectManager.CheckStatement(o, ...n);
    }
    let t = true;
    let e = "";
    switch (o) {
      case 0:
        e = "语句未初始化！";
        break;
      case -1:
        e = "找不到该语句的 DB 连接！";
        break;
      case -2:
        e = "语句创建不成功！";
    }
    if (e && (t = false, Log_1.Log.CheckError())) {
      Log_1.Log.Error("Config", 2, e, ...n);
    }
    return t;
  }
  static BindBigInt(o, n, t, ...e) {
    if (ConfigCommon.P7d) {
      return CommonDbConnectManager_1.CommonDbConnectManager.BindBigInt(o, n, t, ...e);
    } else {
      ConfigCommon.V9.Start();
      if (typeof t != "bigint") {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Config", 2, "绑定参数 int64 失败", ["handleId", o], ["bindingIndex", n], ["value", t], ...e);
        }
        ConfigCommon.V9.Stop();
        return false;
      } else {
        if (!(t = UE.KuroPrepareStatementLib.SetBindingValueBigInt(o, n, t))) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Config", 2, "绑定参数 int64 失败", ["handleId", o], ["bindingIndex", n], ...e);
          }
        }
        ConfigCommon.V9.Stop();
        return t;
      }
    }
  }
  static BindInt(o, n, t, ...e) {
    if (ConfigCommon.P7d) {
      return CommonDbConnectManager_1.CommonDbConnectManager.BindInt(o, n, t, ...e);
    }
    ConfigCommon.H9.Start();
    t = UE.KuroPrepareStatementLib.SetBindingValueInt(o, n, t);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 2, "绑定参数 int32 失败", ["handleId", o], ["bindingIndex", n], ...e);
      }
    }
    ConfigCommon.H9.Stop();
    return t;
  }
  static BindFloat(o, n, t, ...e) {
    if (ConfigCommon.P7d) {
      return CommonDbConnectManager_1.CommonDbConnectManager.BindFloat(o, n, t, ...e);
    }
    ConfigCommon.j9.Start();
    t = UE.KuroPrepareStatementLib.SetBindingValueFloat(o, n, t);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 2, "绑定参数 float 失败", ["handleId", o], ["bindingIndex", n], ...e);
      }
    }
    ConfigCommon.j9.Stop();
    return t;
  }
  static BindFloat64(o, n, t, ...e) {
    if (ConfigCommon.P7d) {
      return CommonDbConnectManager_1.CommonDbConnectManager.BindFloat64(o, n, t, ...e);
    }
    ConfigCommon.mtl.Start();
    t = UE.KuroPrepareStatementLib.SetBindingValueFloat64(o, n, t);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 62, "绑定参数 float64 失败", ["handleId", o], ["bindingIndex", n], ...e);
      }
    }
    ConfigCommon.mtl.Stop();
    return t;
  }
  static BindBool(o, n, t, ...e) {
    if (ConfigCommon.P7d) {
      return CommonDbConnectManager_1.CommonDbConnectManager.BindBool(o, n, t, ...e);
    }
    ConfigCommon.W9.Start();
    t = UE.KuroPrepareStatementLib.SetBindingValueBool(o, n, t);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 2, "绑定参数 bool 失败", ["handleId", o], ["bindingIndex", n], ...e);
      }
    }
    ConfigCommon.W9.Stop();
    return t;
  }
  static BindString(o, n, t, ...e) {
    if (ConfigCommon.P7d) {
      return CommonDbConnectManager_1.CommonDbConnectManager.BindString(o, n, t, ...e);
    }
    ConfigCommon.K9.Start();
    t = UE.KuroPrepareStatementLib.SetBindingValueString(o, n, t);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 2, "绑定参数 string 失败", ["handleId", o], ["bindingIndex", n], ...e);
      }
    }
    ConfigCommon.K9.Stop();
    return t;
  }
  static ClearBind(o) {
    if (ConfigCommon.P7d) {
      CommonDbConnectManager_1.CommonDbConnectManager.ClearBind(o);
    } else {
      UE.KuroPrepareStatementLib.ClearBindings(o);
    }
  }
  static Reset(o, ...n) {
    var t;
    if (ConfigCommon.P7d) {
      return CommonDbConnectManager_1.CommonDbConnectManager.Reset(o, ...n);
    } else {
      if (!(t = UE.KuroPrepareStatementLib.Reset(o))) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Config", 2, "重置语句失败！", ["handleId", o], ...n);
        }
      }
      return t;
    }
  }
  static Step(o, n = false, ...t) {
    if (ConfigCommon.P7d) {
      return CommonDbConnectManager_1.CommonDbConnectManager.Step(o, n, ...t);
    }
    var e = UE.KuroPrepareStatementLib.Step(o);
    let C = "";
    switch (e) {
      case 0:
        C = n ? "配置表中没有该数据，请确认该问题，或修改为合理的查询！" : undefined;
        break;
      case -1:
        C = "找不到创建的语句，确认语句是否已调用过销毁，但业务还持有着句柄！";
        break;
      case -2:
        C = "创建的语句无效或已被释放！";
        break;
      case -3:
        C = "事务繁忙中，查询失败！";
        break;
      case -4:
        C = "执行查询出错！";
    }
    if (C && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Config", 2, C, ["handleId", o], ...t);
    }
    return e;
  }
  static GetValue(o, n, ...t) {
    if (ConfigCommon.P7d) {
      return CommonDbConnectManager_1.CommonDbConnectManager.GetValue(o, n, ...t);
    }
    ConfigCommon.Q9.Start();
    n = UE.KuroPrepareStatementLib.GetColumnValueBytes(o, n, exports.dataRef);
    if (!n) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 2, "获取配置表字段数值出错", ["handleId", o], ...t);
      }
    }
    o = n ? new DataView((0, puerts_1.$unref)(exports.dataRef).slice(0)) : undefined;
    ConfigCommon.Q9.Stop();
    return [n, o];
  }
  static GetValueInt(o, n, ...t) {
    if (ConfigCommon.P7d) {
      return CommonDbConnectManager_1.CommonDbConnectManager.GetValueInt(o, n, ...t);
    }
    ConfigCommon.rhm.Start();
    n = UE.KuroPrepareStatementLib.GetColumnValueInt32(o, n, exports.dataIntRef);
    if (!n) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 62, "获取配置表int字段数值出错", ["handleId", o], ...t);
      }
    }
    o = n ? (0, puerts_1.$unref)(exports.dataIntRef) : 0;
    ConfigCommon.rhm.Stop();
    return [n, o];
  }
  static CloseAllConnection() {
    (ConfigCommon.P7d ? CommonDbConnectManager_1.CommonDbConnectManager : ConfigStatementLibSync_1.ConfigStatementLibSync).CloseAllConnection();
  }
}
(exports.ConfigCommon = ConfigCommon).N9 = undefined;
ConfigCommon.F9 = new Map();
ConfigCommon.G9 = new TrimLru_1.TrimLru(3000);
ConfigCommon.O9 = Stats_1.Stat.Create("ConfigCommon.InitDataStatement");
ConfigCommon.k9 = Stats_1.Stat.Create("ConfigCommon.GetLangStatementId");
ConfigCommon.V9 = Stats_1.Stat.Create("ConfigCommon.BindBigInt");
ConfigCommon.H9 = Stats_1.Stat.Create("ConfigCommon.BindInt");
ConfigCommon.j9 = Stats_1.Stat.Create("ConfigCommon.BindFloat");
ConfigCommon.W9 = Stats_1.Stat.Create("ConfigCommon.BindBool");
ConfigCommon.K9 = Stats_1.Stat.Create("ConfigCommon.BindString");
ConfigCommon.mtl = Stats_1.Stat.Create("ConfigCommon.BindFloat64Stat");
ConfigCommon.Q9 = Stats_1.Stat.Create("ConfigCommon.GetValue");
ConfigCommon.rhm = Stats_1.Stat.Create("ConfigCommon.GetValueInt");
ConfigCommon.AllConfigStatementStat = Stats_1.Stat.Create("ConfigCommon.AllConfig");
ConfigCommon.P7d = true; //# sourceMappingURL=ConfigCommon.js.map
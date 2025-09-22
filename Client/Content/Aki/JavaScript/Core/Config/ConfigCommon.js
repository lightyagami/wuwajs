"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigCommon = exports.toNumberTemp = exports.ConfigBase = exports.dataRef = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const LanguageSystem_1 = require("../Common/LanguageSystem");
const Log_1 = require("../Common/Log");
const Stats_1 = require("../Common/Stats");
const TrimLru_1 = require("../Container/TrimLru");
const CommonDbConnectManager_1 = require("./CommonDbConnectManager");
exports.dataRef = (0, puerts_1.$ref)(undefined);
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
  static SaveConfig(o, n, t = 1) {
    this.G9.Put(o, n, t);
  }
  static GetConfig(o) {
    return this.G9.Get(o);
  }
  static ToList(n) {
    if (n) {
      var t = n.length;
      var C = new Array(t);
      for (let o = 0; o < t; o++) {
        C[o] = n[o];
      }
      return C;
    }
  }
  static GetProjectContentDir() {
    ConfigCommon.N9 ||= "" + UE.BlueprintPathsLibrary.ProjectContentDir();
    return ConfigCommon.N9;
  }
  static InitDataStatement(o, n, t) {
    if (ConfigCommon.mNd) {
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
    var C = ConfigCommon.GetProjectContentDir() + "Aki/ConfigDB/" + n;
    var o = UE.KuroPrepareStatementLib.CreateStatement(C, t);
    switch (o) {
      case -1:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Config", 2, "找不到Db连接", ["path", C]);
        }
        break;
      case -2:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Config", 2, "创建语句失败", ["path", C], ["command", t]);
        }
    }
    ConfigCommon.O9.Stop();
    return o;
  }
  static GetLangStatementId(o, n, t, C = "") {
    if (ConfigCommon.mNd) {
      return CommonDbConnectManager_1.CommonDbConnectManager.GetLangStatementId(o, n, t, C);
    }
    ConfigCommon.k9.Start();
    if (n.length <= 0 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Config", 2, "dbName为空！请确认该配置表在拆分Db表中是否有正确配置！");
    }
    C = C && C.length !== 0 ? C : LanguageSystem_1.LanguageSystem.PackageLanguage;
    let i = ConfigCommon.F9.get(o);
    if (!i) {
      i = new Map();
      ConfigCommon.F9.set(o, i);
    }
    let m = i.get(C);
    if (!m) {
      var e = `${ConfigCommon.GetProjectContentDir()}Aki/ConfigDB/${C}/${n}`;
      switch (m = UE.KuroPrepareStatementLib.CreateStatement(e, t)) {
        case -1:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Config", 2, "找不到语言表Db连接", ["path", e]);
          }
          break;
        case -2:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Config", 2, "创建语言表语句失败", ["path", e], ["command", t]);
          }
      }
      i.set(C, m);
    }
    ConfigCommon.k9.Stop();
    return m;
  }
  static CheckStatement(o, ...n) {
    if (ConfigCommon.mNd) {
      return CommonDbConnectManager_1.CommonDbConnectManager.CheckStatement(o, ...n);
    }
    let t = true;
    let C = "";
    switch (o) {
      case 0:
        C = "语句未初始化！";
        break;
      case -1:
        C = "找不到该语句的 DB 连接！";
        break;
      case -2:
        C = "语句创建不成功！";
    }
    if (C && (t = false, Log_1.Log.CheckError())) {
      Log_1.Log.Error("Config", 2, C, ...n);
    }
    return t;
  }
  static BindBigInt(o, n, t, ...C) {
    if (ConfigCommon.mNd) {
      return CommonDbConnectManager_1.CommonDbConnectManager.BindBigInt(o, n, t, ...C);
    } else {
      ConfigCommon.V9.Start();
      if (typeof t != "bigint") {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Config", 2, "绑定参数 int64 失败", ["handleId", o], ["bindingIndex", n], ["value", t], ...C);
        }
        ConfigCommon.V9.Stop();
        return false;
      } else {
        if (!(t = UE.KuroPrepareStatementLib.SetBindingValueBigInt(o, n, t))) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Config", 2, "绑定参数 int64 失败", ["handleId", o], ["bindingIndex", n], ...C);
          }
        }
        ConfigCommon.V9.Stop();
        return t;
      }
    }
  }
  static BindInt(o, n, t, ...C) {
    if (ConfigCommon.mNd) {
      return CommonDbConnectManager_1.CommonDbConnectManager.BindInt(o, n, t, ...C);
    }
    ConfigCommon.H9.Start();
    t = UE.KuroPrepareStatementLib.SetBindingValueInt(o, n, t);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 2, "绑定参数 int32 失败", ["handleId", o], ["bindingIndex", n], ...C);
      }
    }
    ConfigCommon.H9.Stop();
    return t;
  }
  static BindFloat(o, n, t, ...C) {
    if (ConfigCommon.mNd) {
      return CommonDbConnectManager_1.CommonDbConnectManager.BindFloat(o, n, t, ...C);
    }
    ConfigCommon.j9.Start();
    t = UE.KuroPrepareStatementLib.SetBindingValueFloat(o, n, t);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 2, "绑定参数 float 失败", ["handleId", o], ["bindingIndex", n], ...C);
      }
    }
    ConfigCommon.j9.Stop();
    return t;
  }
  static BindFloat64(o, n, t, ...C) {
    if (ConfigCommon.mNd) {
      return CommonDbConnectManager_1.CommonDbConnectManager.BindFloat64(o, n, t, ...C);
    }
    ConfigCommon.mtl.Start();
    t = UE.KuroPrepareStatementLib.SetBindingValueFloat64(o, n, t);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 62, "绑定参数 float64 失败", ["handleId", o], ["bindingIndex", n], ...C);
      }
    }
    ConfigCommon.mtl.Stop();
    return t;
  }
  static BindBool(o, n, t, ...C) {
    if (ConfigCommon.mNd) {
      return CommonDbConnectManager_1.CommonDbConnectManager.BindBool(o, n, t, ...C);
    }
    ConfigCommon.W9.Start();
    t = UE.KuroPrepareStatementLib.SetBindingValueBool(o, n, t);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 2, "绑定参数 bool 失败", ["handleId", o], ["bindingIndex", n], ...C);
      }
    }
    ConfigCommon.W9.Stop();
    return t;
  }
  static BindString(o, n, t, ...C) {
    if (ConfigCommon.mNd) {
      return CommonDbConnectManager_1.CommonDbConnectManager.BindString(o, n, t, ...C);
    }
    ConfigCommon.K9.Start();
    t = UE.KuroPrepareStatementLib.SetBindingValueString(o, n, t);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 2, "绑定参数 string 失败", ["handleId", o], ["bindingIndex", n], ...C);
      }
    }
    ConfigCommon.K9.Stop();
    return t;
  }
  static ClearBind(o) {
    if (ConfigCommon.mNd) {
      CommonDbConnectManager_1.CommonDbConnectManager.ClearBind(o);
    } else {
      UE.KuroPrepareStatementLib.ClearBindings(o);
    }
  }
  static Reset(o, ...n) {
    var t;
    if (ConfigCommon.mNd) {
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
    if (ConfigCommon.mNd) {
      return CommonDbConnectManager_1.CommonDbConnectManager.Step(o, n, ...t);
    }
    var C = UE.KuroPrepareStatementLib.Step(o);
    let i = "";
    switch (C) {
      case 0:
        i = n ? "配置表中没有该数据，请确认该问题，或修改为合理的查询！" : undefined;
        break;
      case -1:
        i = "找不到创建的语句，确认语句是否已调用过销毁，但业务还持有着句柄！";
        break;
      case -2:
        i = "创建的语句无效或已被释放！";
        break;
      case -3:
        i = "事务繁忙中，查询失败！";
        break;
      case -4:
        i = "执行查询出错！";
    }
    if (i && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Config", 2, i, ["handleId", o], ...t);
    }
    return C;
  }
  static GetValue(o, n, ...t) {
    if (ConfigCommon.mNd) {
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
  static CloseAllConnection() {
    (ConfigCommon.mNd ? CommonDbConnectManager_1.CommonDbConnectManager : UE.KuroPrepareStatementLib).CloseAllConnection();
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
ConfigCommon.AllConfigStatementStat = Stats_1.Stat.Create("ConfigCommon.AllConfig");
ConfigCommon.mNd = true; //# sourceMappingURL=ConfigCommon.js.map
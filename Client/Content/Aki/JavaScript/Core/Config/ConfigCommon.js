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
      var i = new Array(t);
      for (let o = 0; o < t; o++) {
        i[o] = n[o];
      }
      return i;
    }
  }
  static GetProjectContentDir() {
    ConfigCommon.N9 ||= "" + UE.BlueprintPathsLibrary.ProjectContentDir();
    return ConfigCommon.N9;
  }
  static InitDataStatement(o, n, t) {
    ConfigCommon.O9.Start();
    if (o !== 0) {
      ConfigCommon.O9.Stop();
      return o;
    }
    if (n.length <= 0 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Config", 2, "dbName为空！请确认该配置表在拆分Db表中是否有正确配置！");
    }
    var i = ConfigCommon.GetProjectContentDir() + "Aki/ConfigDB/" + n;
    var o = UE.KuroPrepareStatementLib.CreateStatement(i, t);
    switch (o) {
      case -1:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Config", 2, "找不到Db连接", ["path", i]);
        }
        break;
      case -2:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Config", 2, "创建语句失败", ["path", i], ["command", t]);
        }
    }
    ConfigCommon.O9.Stop();
    return o;
  }
  static GetLangStatementId(o, n, t, i = "") {
    ConfigCommon.k9.Start();
    if (n.length <= 0 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Config", 2, "dbName为空！请确认该配置表在拆分Db表中是否有正确配置！");
    }
    i = i && i.length !== 0 ? i : LanguageSystem_1.LanguageSystem.PackageLanguage;
    let e = ConfigCommon.F9.get(o);
    if (!e) {
      e = new Map();
      ConfigCommon.F9.set(o, e);
    }
    let C = e.get(i);
    if (!C) {
      var g = `${ConfigCommon.GetProjectContentDir()}Aki/ConfigDB/${i}/${n}`;
      switch (C = UE.KuroPrepareStatementLib.CreateStatement(g, t)) {
        case -1:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Config", 2, "找不到语言表Db连接", ["path", g]);
          }
          break;
        case -2:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Config", 2, "创建语言表语句失败", ["path", g], ["command", t]);
          }
      }
      e.set(i, C);
    }
    ConfigCommon.k9.Stop();
    return C;
  }
  static CheckStatement(o, ...n) {
    let t = true;
    let i = "";
    switch (o) {
      case 0:
        i = "语句未初始化！";
        break;
      case -1:
        i = "找不到该语句的 DB 连接！";
        break;
      case -2:
        i = "语句创建不成功！";
    }
    if (i && (t = false, Log_1.Log.CheckError())) {
      Log_1.Log.Error("Config", 2, i, ...n);
    }
    return t;
  }
  static BindBigInt(o, n, t, ...i) {
    ConfigCommon.V9.Start();
    if (typeof t != "bigint") {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 2, "绑定参数 int64 失败", ["handleId", o], ["bindingIndex", n], ["value", t], ...i);
      }
      ConfigCommon.V9.Stop();
      return false;
    } else {
      if (!(t = UE.KuroPrepareStatementLib.SetBindingValueBigInt(o, n, t))) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Config", 2, "绑定参数 int64 失败", ["handleId", o], ["bindingIndex", n], ...i);
        }
      }
      ConfigCommon.V9.Stop();
      return t;
    }
  }
  static BindInt(o, n, t, ...i) {
    ConfigCommon.H9.Start();
    t = UE.KuroPrepareStatementLib.SetBindingValueInt(o, n, t);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 2, "绑定参数 int32 失败", ["handleId", o], ["bindingIndex", n], ...i);
      }
    }
    ConfigCommon.H9.Stop();
    return t;
  }
  static BindFloat(o, n, t, ...i) {
    ConfigCommon.j9.Start();
    t = UE.KuroPrepareStatementLib.SetBindingValueFloat(o, n, t);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 2, "绑定参数 float 失败", ["handleId", o], ["bindingIndex", n], ...i);
      }
    }
    ConfigCommon.j9.Stop();
    return t;
  }
  static BindFloat64(o, n, t, ...i) {
    ConfigCommon.mtl.Start();
    t = UE.KuroPrepareStatementLib.SetBindingValueFloat64(o, n, t);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 62, "绑定参数 float64 失败", ["handleId", o], ["bindingIndex", n], ...i);
      }
    }
    ConfigCommon.mtl.Stop();
    return t;
  }
  static BindBool(o, n, t, ...i) {
    ConfigCommon.W9.Start();
    t = UE.KuroPrepareStatementLib.SetBindingValueBool(o, n, t);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 2, "绑定参数 bool 失败", ["handleId", o], ["bindingIndex", n], ...i);
      }
    }
    ConfigCommon.W9.Stop();
    return t;
  }
  static BindString(o, n, t, ...i) {
    ConfigCommon.K9.Start();
    t = UE.KuroPrepareStatementLib.SetBindingValueString(o, n, t);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 2, "绑定参数 string 失败", ["handleId", o], ["bindingIndex", n], ...i);
      }
    }
    ConfigCommon.K9.Stop();
    return t;
  }
  static ClearBind(o) {
    UE.KuroPrepareStatementLib.ClearBindings(o);
  }
  static Reset(o, ...n) {
    var t = UE.KuroPrepareStatementLib.Reset(o);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 2, "重置语句失败！", ["handleId", o], ...n);
      }
    }
    return t;
  }
  static Step(o, n = false, ...t) {
    var i = UE.KuroPrepareStatementLib.Step(o);
    let e = "";
    switch (i) {
      case 0:
        e = n ? "配置表中没有该数据，请确认该问题，或修改为合理的查询！" : undefined;
        break;
      case -1:
        e = "找不到创建的语句，确认语句是否已调用过销毁，但业务还持有着句柄！";
        break;
      case -2:
        e = "创建的语句无效或已被释放！";
        break;
      case -3:
        e = "事务繁忙中，查询失败！";
        break;
      case -4:
        e = "执行查询出错！";
    }
    if (e && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Config", 2, e, ["handleId", o], ...t);
    }
    return i;
  }
  static GetValue(o, n, ...t) {
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
ConfigCommon.AllConfigStatementStat = Stats_1.Stat.Create("ConfigCommon.AllConfig"); //# sourceMappingURL=ConfigCommon.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonDbConnectManager = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const LanguageSystem_1 = require("../Common/LanguageSystem");
const Log_1 = require("../Common/Log");
const Stats_1 = require("../Common/Stats");
const Lru_1 = require("../Container/Lru");
const CommonDbData_1 = require("./CommonDbData");
const ConnectDbObject_1 = require("./ConnectDbObject");
const dataRef = (0, puerts_1.$ref)(undefined);
const DB_CONNECT_LRU_SIZE = 200;
class CommonDbConnectManager {
  static ifd() {
    return ++CommonDbConnectManager.rfd;
  }
  static ofd(n) {
    var o;
    var n = CommonDbConnectManager.nfd.get(n);
    if (n) {
      (o = new ConnectDbObject_1.ConnectDbObject()).ConnectStatement(n);
      return o;
    }
  }
  static sfd(n) {
    n.DisConnectStatement();
  }
  static afd(n) {
    let o = this.hfd.Get(n);
    if (o = o || this.hfd.Create(n)) {
      this.hfd.Put(o);
    }
    return o;
  }
  static lfd(n, o, t) {
    var e = this.ifd();
    var n = new CommonDbData_1.CommonDbData(e, n, o, t);
    CommonDbConnectManager.nfd.set(e, n);
    return n;
  }
  static InitDataStatement(n, o, t) {
    CommonDbConnectManager.O9.Start();
    if (n !== CommonDbData_1.UNVALID_INCREMENT_ID) {
      CommonDbConnectManager.O9.Stop();
      return n;
    }
    if (o.length <= 0 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("CommonDbConnect", 10, "dbName为空！请确认该配置表在拆分Db表中是否有正确配置！");
    }
    n = CommonDbConnectManager.lfd(o, t, "");
    CommonDbConnectManager.O9.Stop();
    return n.IncrementId;
  }
  static GetLangStatementId(n, o, t, e = "") {
    CommonDbConnectManager.k9.Start();
    if (o.length <= 0 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("CommonDbConnect", 10, "dbName为空！请确认该配置表在拆分Db表中是否有正确配置！");
    }
    e = e && e.length !== 0 ? e : LanguageSystem_1.LanguageSystem.PackageLanguage;
    let a = CommonDbConnectManager.F9.get(n);
    if (!a) {
      a = new Map();
      CommonDbConnectManager.F9.set(n, a);
    }
    let m = a.get(e);
    if (!m) {
      n = CommonDbConnectManager.lfd(o, t, e);
      m = n.IncrementId;
      n = this.afd(n.IncrementId);
      if (!n) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonDbConnect", 10, "创建Db连接对象失败", ["dbName", o]);
        }
        CommonDbConnectManager.k9.Stop();
        return m;
      }
      switch (n.HandleId) {
        case -1:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("CommonDbConnect", 10, "找不到语言表Db连接", ["dbName", o]);
          }
          break;
        case -2:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("CommonDbConnect", 10, "创建语言表语句失败", ["dbName", o], ["command", t]);
          }
      }
      a.set(e, m);
    }
    CommonDbConnectManager.k9.Stop();
    return m;
  }
  static CheckStatement(n, ...o) {
    let t = "";
    let e = true;
    if (n <= CommonDbData_1.UNVALID_INCREMENT_ID) {
      t = "未调用InitDataStatement进行初始化";
    } else {
      n = this.afd(n);
      if (!n) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonDbConnect", 10, "[CheckStatement]未调用InitDataStatement进行初始化");
        }
        return false;
      }
      switch (n.HandleId) {
        case 0:
          t = "语句未初始化！";
          break;
        case -1:
          t = "找不到该语句的 DB 连接！";
          break;
        case -2:
          t = "语句创建不成功！";
      }
    }
    if (t && (e = false, Log_1.Log.CheckError())) {
      Log_1.Log.Error("CommonDbConnect", 10, t, ...o);
    }
    return e;
  }
  static BindBigInt(n, o, t, ...e) {
    CommonDbConnectManager.V9.Start();
    if (typeof t != "bigint") {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CommonDbConnect", 10, "绑定参数 int64 失败", ["incrementId", n], ["bindingIndex", o], ["value", t], ...e);
      }
      CommonDbConnectManager.V9.Stop();
      return false;
    } else if (n = this.afd(n)) {
      n = n.HandleId;
      if (!(t = UE.KuroPrepareStatementLib.SetBindingValueBigInt(n, o, t))) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonDbConnect", 10, "绑定参数 int64 失败", ["handleId", n], ["bindingIndex", o], ...e);
        }
      }
      CommonDbConnectManager.V9.Stop();
      return t;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CommonDbConnect", 10, "[BindBigInt]未调用InitDataStatement进行初始化");
      }
      CommonDbConnectManager.V9.Stop();
      return false;
    }
  }
  static BindInt(n, o, t, ...e) {
    CommonDbConnectManager.H9.Start();
    var n = this.afd(n);
    if (n) {
      n = n.HandleId;
      if (!(t = UE.KuroPrepareStatementLib.SetBindingValueInt(n, o, t))) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonDbConnect", 10, "绑定参数 int32 失败", ["handleId", n], ["bindingIndex", o], ...e);
        }
      }
      CommonDbConnectManager.H9.Stop();
      return t;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CommonDbConnect", 10, "[BindInt]未调用InitDataStatement进行初始化");
      }
      CommonDbConnectManager.H9.Stop();
      return false;
    }
  }
  static BindFloat(n, o, t, ...e) {
    CommonDbConnectManager.j9.Start();
    var n = this.afd(n);
    if (n) {
      n = n.HandleId;
      if (!(t = UE.KuroPrepareStatementLib.SetBindingValueFloat(n, o, t))) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonDbConnect", 10, "绑定参数 float 失败", ["handleId", n], ["bindingIndex", o], ...e);
        }
      }
      CommonDbConnectManager.j9.Stop();
      return t;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CommonDbConnect", 10, "[BindFloat]未调用InitDataStatement进行初始化");
      }
      CommonDbConnectManager.j9.Stop();
      return false;
    }
  }
  static BindFloat64(n, o, t, ...e) {
    CommonDbConnectManager.mtl.Start();
    var n = this.afd(n);
    if (n) {
      n = n.HandleId;
      if (!(t = UE.KuroPrepareStatementLib.SetBindingValueFloat64(n, o, t))) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonDbConnect", 10, "绑定参数 float64 失败", ["handleId", n], ["bindingIndex", o], ...e);
        }
      }
      CommonDbConnectManager.mtl.Stop();
      return t;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CommonDbConnect", 10, "[BindFloat64]未调用InitDataStatement进行初始化");
      }
      CommonDbConnectManager.mtl.Stop();
      return false;
    }
  }
  static BindBool(n, o, t, ...e) {
    CommonDbConnectManager.W9.Start();
    var n = this.afd(n);
    if (n) {
      n = n.HandleId;
      if (!(t = UE.KuroPrepareStatementLib.SetBindingValueBool(n, o, t))) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonDbConnect", 10, "绑定参数 bool 失败", ["handleId", n], ["bindingIndex", o], ...e);
        }
      }
      CommonDbConnectManager.W9.Stop();
      return t;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CommonDbConnect", 10, "[BindBool]未调用InitDataStatement进行初始化");
      }
      CommonDbConnectManager.W9.Stop();
      return false;
    }
  }
  static BindString(n, o, t, ...e) {
    CommonDbConnectManager.K9.Start();
    var n = this.afd(n);
    if (n) {
      n = n.HandleId;
      if (!(t = UE.KuroPrepareStatementLib.SetBindingValueString(n, o, t))) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonDbConnect", 10, "绑定参数 string 失败", ["handleId", n], ["bindingIndex", o], ...e);
        }
      }
      CommonDbConnectManager.K9.Stop();
      return t;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CommonDbConnect", 10, "[BindString]未调用InitDataStatement进行初始化");
      }
      CommonDbConnectManager.K9.Stop();
      return false;
    }
  }
  static Reset(n, ...o) {
    var t;
    var n = this.afd(n);
    if (n) {
      n = n.HandleId;
      if (!(t = UE.KuroPrepareStatementLib.Reset(n))) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonDbConnect", 10, "重置语句失败！", ["handleId", n], ...o);
        }
      }
      return t;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CommonDbConnect", 10, "[Reset]未调用InitDataStatement进行初始化");
      }
      return false;
    }
  }
  static Step(n, o = false, ...t) {
    n = this.afd(n);
    if (!n) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CommonDbConnect", 10, "[Step]未调用InitDataStatement进行初始化");
      }
      return 0;
    }
    var n = n.HandleId;
    var e = UE.KuroPrepareStatementLib.Step(n);
    let a = "";
    switch (e) {
      case 0:
        a = o ? "配置表中没有该数据，请确认该问题，或修改为合理的查询！" : undefined;
        break;
      case -1:
        a = "找不到创建的语句，确认语句是否已调用过销毁，但业务还持有着句柄！";
        break;
      case -2:
        a = "创建的语句无效或已被释放！";
        break;
      case -3:
        a = "事务繁忙中，查询失败！";
        break;
      case -4:
        a = "执行查询出错！";
    }
    if (a && Log_1.Log.CheckError()) {
      Log_1.Log.Error("CommonDbConnect", 10, a, ["handleId", n], ...t);
    }
    return e;
  }
  static GetValue(n, o, ...t) {
    CommonDbConnectManager.Q9.Start();
    var n = this.afd(n);
    if (n) {
      n = n.HandleId;
      if (!(o = UE.KuroPrepareStatementLib.GetColumnValueBytes(n, o, dataRef))) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonDbConnect", 10, "获取配置表字段数值出错", ["handleId", n], ...t);
        }
      }
      n = o ? new DataView((0, puerts_1.$unref)(dataRef).slice(0)) : undefined;
      CommonDbConnectManager.Q9.Stop();
      return [o, n];
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CommonDbConnect", 10, "[GetValue]未调用InitDataStatement进行初始化");
      }
      return [false, undefined];
    }
  }
  static ClearBind(n) {
    n = this.hfd.Get(n);
    if (n) {
      n.DisConnectStatement();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("CommonDbConnect", 10, "[ClearBind]未调用InitDataStatement进行初始化");
    }
  }
  static CloseAllConnection() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CommonDbConnect", 10, "[CloseAllConnection]关闭所有Db连接");
    }
    this.hfd.Clear();
    UE.KuroPrepareStatementLib.CloseAllConnection();
  }
  static LogConnection() {
    var n = this.hfd.Size;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CommonDbConnect", 10, "[LogConnection]连接Db数量", ["connectionCount", n]);
    }
  }
  static DynamicChangeLruCapacity(n) {
    this.hfd.Capacity = n;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CommonDbConnect", 10, "[DynamicChangeLruCapacity]修改Db连接LRU容量", ["capacity", n]);
    }
  }
}
(exports.CommonDbConnectManager = CommonDbConnectManager).O9 = Stats_1.Stat.Create("CommonDbConnectManager.InitDataStatement");
CommonDbConnectManager.k9 = Stats_1.Stat.Create("CommonDbConnectManager.GetLangStatementId");
CommonDbConnectManager.V9 = Stats_1.Stat.Create("CommonDbConnectManager.BindBigInt");
CommonDbConnectManager.H9 = Stats_1.Stat.Create("CommonDbConnectManager.BindInt");
CommonDbConnectManager.j9 = Stats_1.Stat.Create("CommonDbConnectManager.BindFloat");
CommonDbConnectManager.W9 = Stats_1.Stat.Create("CommonDbConnectManager.BindBool");
CommonDbConnectManager.K9 = Stats_1.Stat.Create("CommonDbConnectManager.BindString");
CommonDbConnectManager.mtl = Stats_1.Stat.Create("CommonDbConnectManager.BindFloat64Stat");
CommonDbConnectManager.Q9 = Stats_1.Stat.Create("CommonDbConnectManager.GetValue");
CommonDbConnectManager.rfd = CommonDbData_1.UNVALID_INCREMENT_ID;
CommonDbConnectManager.F9 = new Map();
CommonDbConnectManager.nfd = new Map();
CommonDbConnectManager.hfd = new Lru_1.Lru(DB_CONNECT_LRU_SIZE, n => CommonDbConnectManager.ofd(n), n => {
  CommonDbConnectManager.sfd(n);
}); //# sourceMappingURL=CommonDbConnectManager.js.map
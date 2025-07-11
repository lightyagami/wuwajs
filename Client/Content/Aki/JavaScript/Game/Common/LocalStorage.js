"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalStorage = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const GlobalData_1 = require("../GlobalData");
const EventDefine_1 = require("./Event/EventDefine");
const EventSystem_1 = require("./Event/EventSystem");
const LocalStorageCache_1 = require("./LocalStorageCache");
const LocalStorageDefine_1 = require("./LocalStorageDefine");
const DBPATH = "LocalStorage/LocalStorage";
const DEVICEDBPATH = "DeviceSaved/DeviceStorage";
const DBSUFFIX = ".db";
const TABLENAME = "LocalStorage";
const DBNUM = 10;
const ISUSEDB = true;
const USE_THREAD = true;
const USE_CACHE = true;
const SQLITE_ERR = -1;
const SQLITE_NO_DATA = 1;
const CHECK_COMPLEX_THRESHOLD = 600;
const USE_JOURNAL_MODE = 2;
function getJournalMode(e) {
  switch (e) {
    case 0:
      return "PRAGMA journal_mode=DELETE";
    case 1:
      return "PRAGMA journal_mode=TRUNCATE";
    case 2:
      return "PRAGMA journal_mode=PERSIST";
    case 3:
      return "PRAGMA journal_mode=MEMORY";
    case 4:
      return "PRAGMA journal_mode=OFF";
  }
}
class LocalStorage {
  static Initialize() {
    if (!this.IC) {
      this.IC = true;
      if (ISUSEDB) {
        LocalStorage.cde();
        LocalStorage.mde();
      }
      LocalStorage.dde();
    }
  }
  static Destroy() {
    LocalStorage.j8 = undefined;
    LocalStorage.ve.Clear();
    LocalStorage.Cde();
  }
  static GetGlobal(e, a = undefined) {
    if (this.IC) {
      var t = LocalStorage.gde(e);
      if (t) {
        if (USE_CACHE) {
          var o = LocalStorage.qLc(t);
          if (o) {
            return LocalStorage.pde(o);
          }
        }
        var r;
        var o = LocalStorage.fde(t, false);
        if (o[0]) {
          if (o = o[1]) {
            r = LocalStorage.pde(o);
            if (USE_CACHE) {
              LocalStorage.GLc(t, o);
            }
            return r;
          } else {
            return a;
          }
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LocalStorage", 16, "GetGlobal LocalStorage未初始化", ["key", e]);
    }
  }
  static SetGlobal(e, a) {
    if (!this.IC) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LocalStorage", 16, "GetGlobal LocalStorage未初始化", ["key", e]);
      }
      return false;
    }
    var t = LocalStorage.gde(e);
    if (!t) {
      return false;
    }
    if (a == null) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LocalStorage", 30, "value值非法", ["keyName", t], ["value", a]);
      }
      return false;
    }
    a = LocalStorage.O8(a);
    if (!a) {
      return false;
    }
    if (USE_CACHE) {
      if (LocalStorage.qLc(t) === a) {
        return true;
      }
      LocalStorage.GLc(t, a);
    }
    LocalStorage.ugl(e, t, a);
    return LocalStorage.vde(t, a, false);
  }
  static GetDeviceSaved(e, a = undefined) {
    e = LocalStorage.O4l(e);
    if (e) {
      if (USE_CACHE) {
        var t = LocalStorage.qLc(e);
        if (t) {
          return LocalStorage.pde(t);
        }
      }
      var o;
      var t = LocalStorage.fde(e, true);
      if (t[0]) {
        if (t = t[1]) {
          o = LocalStorage.pde(t);
          if (USE_CACHE) {
            LocalStorage.GLc(e, t);
          }
          return o;
        } else {
          return a;
        }
      }
    }
  }
  static SetDeviceSaved(e, a) {
    var t = LocalStorage.O4l(e);
    if (!t) {
      return false;
    }
    if (a == null) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LocalStorage", 30, "value值非法", ["keyName", t], ["value", a]);
      }
      return false;
    }
    a = LocalStorage.O8(a);
    if (!a) {
      return false;
    }
    if (USE_CACHE) {
      if (LocalStorage.qLc(t) === a) {
        return true;
      }
      LocalStorage.GLc(t, a);
    }
    LocalStorage.ugl(e, t, a);
    return LocalStorage.vde(t, a, true);
  }
  static GetPlayer(e, a = undefined) {
    e = LocalStorage.Ede(e);
    if (e) {
      if (USE_CACHE) {
        var t = LocalStorage.qLc(e);
        if (t) {
          return LocalStorage.pde(t);
        }
      }
      var o;
      var t = LocalStorage.fde(e, false);
      if (t[0]) {
        if (t = t[1]) {
          o = LocalStorage.pde(t);
          if (USE_CACHE) {
            LocalStorage.GLc(e, t);
          }
          return o;
        } else {
          return a;
        }
      }
    }
  }
  static SetPlayer(e, a) {
    var t = LocalStorage.Ede(e);
    if (!t) {
      return false;
    }
    if (a == null) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LocalStorage", 30, "value值非法", ["keyName", t], ["value", a]);
      }
      return false;
    }
    a = LocalStorage.O8(a);
    if (!a) {
      return false;
    }
    if (USE_CACHE) {
      if (LocalStorage.qLc(t) === a) {
        return true;
      }
      LocalStorage.GLc(t, a);
    }
    LocalStorage.ugl(e, t, a);
    return LocalStorage.vde(t, a, false);
  }
  static cde() {
    var e;
    if (!LocalStorage.Sde) {
      e = UE.KuroLauncherLibrary.GameSavedDir();
      LocalStorage.Sde = e + DBPATH + DBSUFFIX;
      LocalStorage.F4l = e + DEVICEDBPATH + DBSUFFIX;
    }
  }
  static mde() {
    this.yde.Start();
    let a = LocalStorage.Sde;
    let t = UE.KuroSqliteLibrary.OpenCreateDB(a, USE_THREAD);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LocalStorage", 30, "打开DB失败！", ["dbFilePath", a]);
      }
      for (let e = 2; e <= DBNUM; e++) {
        var o = UE.KuroLauncherLibrary.GameSavedDir();
        a = o + DBPATH + e + DBSUFFIX;
        if (t = UE.KuroSqliteLibrary.OpenCreateDB(a, USE_THREAD)) {
          LocalStorage.Sde = a;
          break;
        }
      }
      if (!t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LocalStorage", 30, "创建10次DB都失败！", ["dbFilePath", a]);
        }
        this.yde.Stop();
        return false;
      }
    }
    UE.KuroSqliteLibrary.Execute(a, getJournalMode(USE_JOURNAL_MODE));
    let r = LocalStorage.F4l;
    if (!(t = UE.KuroSqliteLibrary.OpenCreateDB(r, USE_THREAD))) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LocalStorage", 2, "打开DB失败！", ["deviceDbPath", r]);
      }
      for (let e = 2; e <= DBNUM; e++) {
        var _ = UE.KuroLauncherLibrary.GameSavedDir();
        r = _ + DEVICEDBPATH + e + DBSUFFIX;
        if (t = UE.KuroSqliteLibrary.OpenCreateDB(r, USE_THREAD)) {
          LocalStorage.F4l = r;
          break;
        }
      }
      if (!t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LocalStorage", 2, "创建10次DB都失败！", ["deviceDbPath", r]);
        }
        this.yde.Stop();
        return false;
      }
    }
    UE.KuroSqliteLibrary.Execute(r, getJournalMode(USE_JOURNAL_MODE));
    t = LocalStorage.Ide();
    this.yde.Stop();
    return t;
  }
  static Ide() {
    this.Tde.Start();
    var e = LocalStorage.Sde;
    var a = `create table if not exists ${TABLENAME}(key text primary key not null , value text not null)`;
    if (!UE.KuroSqliteLibrary.Execute(e, a)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LocalStorage", 30, "创建DbTable失败！", ["command", a]);
      }
    }
    var e = LocalStorage.F4l;
    if (!(e = UE.KuroSqliteLibrary.Execute(e, a))) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LocalStorage", 2, "创建DeviceDbTable失败！", ["command", a]);
      }
    }
    this.Tde.Stop();
    return e;
  }
  static fde(e, a) {
    if (!ISUSEDB) {
      const o = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetString(GlobalData_1.GlobalData.World, e, "");
      return [true, o];
    }
    var a = a ? LocalStorage.F4l : LocalStorage.Sde;
    var e = `SELECT value FROM ${TABLENAME} WHERE key ='${e}'`;
    var t = (0, puerts_1.$ref)(undefined);
    var a = UE.KuroSqliteLibrary.QueryValue(a, e, t);
    if (a === SQLITE_ERR) {
      return [false, undefined];
    }
    if (a === SQLITE_NO_DATA) {
      return [true, undefined];
    }
    const o = (0, puerts_1.$unref)(t);
    return [true, o];
  }
  static vde(e, a, t) {
    var o;
    if (ISUSEDB) {
      t = t ? LocalStorage.F4l : LocalStorage.Sde;
      o = `insert into ${TABLENAME} (key,value) values('${e}' , '${a}') on CONFLICT(key) do update set value = '${a}'`;
      if (USE_THREAD) {
        UE.KuroSqliteLibrary.ExecuteAsync(t, o);
        return true;
      } else {
        return UE.KuroSqliteLibrary.Execute(t, o);
      }
    } else {
      UE.KuroRenderingRuntimeBPPluginBPLibrary.SetString(GlobalData_1.GlobalData.World, e, a);
      UE.KuroRenderingRuntimeBPPluginBPLibrary.Save(GlobalData_1.GlobalData.World);
      return true;
    }
  }
  static qLc(e) {
    return LocalStorage.ve.Get(e);
  }
  static GLc(e, a) {
    LocalStorage.ve.Set(e, a);
  }
  static dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangePlayerInfoId, this.Lde);
  }
  static Cde() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangePlayerInfoId, this.Lde);
  }
  static gde(e) {
    if (e == null) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LocalStorage", 30, "key值非法", ["key", e]);
      }
    } else {
      var a = LocalStorageDefine_1.ELocalStorageGlobalKey[e];
      if (a) {
        return a;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LocalStorage", 30, "keyName值非法", ["key", e]);
      }
    }
  }
  static O4l(e) {
    if (e == null) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LocalStorage", 30, "key值非法", ["key", e]);
      }
    } else {
      var a = LocalStorageDefine_1.ELocalStorageDeviceKey[e];
      if (a) {
        return a;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LocalStorage", 30, "keyName值非法", ["key", e]);
      }
    }
  }
  static Ede(e) {
    if (e == null) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LocalStorage", 30, "key值非法", ["key", e]);
      }
    } else {
      var a = LocalStorageDefine_1.ELocalStoragePlayerKey[e];
      if (a) {
        if (LocalStorage.j8) {
          return a + "_" + LocalStorage.j8;
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LocalStorage", 30, "尚未获取到playerId，无法操作Player相关的存储值！", ["keyName", a]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LocalStorage", 30, "keyName值非法！", ["key", e], ["keyName", a]);
      }
    }
  }
  static ugl(e, a, t) {
    if (!LocalStorage.cgl.has(e) && !Info_1.Info.IsBuildShipping) {
      if ((t?.length ?? 0) >= CHECK_COMPLEX_THRESHOLD && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LocalStorage", 63, "[存储对象复杂度检查]->存储对象疑似属性过多,请考虑拆分对象", ["storageKey", e], ["keyName", a], ["encodedValue", t]);
      }
    }
  }
  static O8(a) {
    try {
      return JSON.stringify(a, LocalStorage.Dde);
    } catch (e) {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("LocalStorage", 30, "序列化异常", e, ["value", a], ["error", e.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LocalStorage", 30, "序列化异常", ["value", a], ["error", e]);
      }
    }
  }
  static pde(a) {
    try {
      return JSON.parse(a, LocalStorage.Rde);
    } catch (e) {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("LocalStorage", 30, "反序列化异常", e, ["text", a], ["error", e.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LocalStorage", 30, "反序列化异常", ["text", a], ["error", e]);
      }
    }
  }
}
(exports.LocalStorage = LocalStorage).Sde = undefined;
LocalStorage.F4l = undefined;
LocalStorage.j8 = undefined;
LocalStorage.ve = new LocalStorageCache_1.LocalStorageCache();
LocalStorage.IC = false;
LocalStorage.yde = Stats_1.Stat.Create("LocalStorage_OpenOrCreateDb");
LocalStorage.Tde = Stats_1.Stat.Create("LocalStorage_CreateTable");
LocalStorage.Lde = e => {
  LocalStorage.j8 = e;
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LocalStorageInitPlayerId);
};
LocalStorage.cgl = new Set([LocalStorageDefine_1.ELocalStorageGlobalKey.PlayMenuInfo, LocalStorageDefine_1.ELocalStorageGlobalKey.MenuData, LocalStorageDefine_1.ELocalStorageGlobalKey.CombineAction, LocalStorageDefine_1.ELocalStoragePlayerKey.GetItemConfigListSaveKey]);
LocalStorage.Dde = (e, a) => {
  if (a === undefined) {
    return "___undefined___";
  }
  if (Number.isNaN(a)) {
    return "___NaN___";
  }
  if (a === Infinity) {
    return "___Infinity___";
  }
  if (a === -Infinity) {
    return "___-Infinity___";
  }
  if (a === null) {
    return null;
  }
  switch (typeof a) {
    case "boolean":
      if (a) {
        return "___1B___";
      } else {
        return "___0B___";
      }
    case "bigint":
      return a + "___BI___";
    case "object":
      if (a instanceof Map) {
        return {
          ___MetaType___: "___Map___",
          Content: Array.from(a.entries())
        };
      } else if (a instanceof Set) {
        return {
          ___MetaType___: "___Set___",
          Content: Array.from(a.values())
        };
      } else {
        return a;
      }
    default:
      return a;
  }
};
LocalStorage.Rde = (e, a) => {
  if (a == null) {
    return a;
  }
  switch (typeof a) {
    case "string":
      switch (a) {
        case "___undefined___":
          return;
        case "___NaN___":
          return NaN;
        case "___Infinity___":
          return Infinity;
        case "___-Infinity___":
          return -Infinity;
        default:
          {
            let e = a;
            if (e === "___1B___") {
              return true;
            }
            if (e === "___0B___") {
              return false;
            }
            if (e.endsWith("___BI___")) {
              e = e.replace("___BI___", "");
              return BigInt(e);
            }
          }
          return a;
      }
    case "object":
      var t = a;
      if (t?.___MetaType___) {
        if (t.___MetaType___ === "___Map___") {
          return new Map(t.Content);
        }
        if (t.___MetaType___ === "___Set___") {
          return new Set(t.Content);
        }
      }
      return a;
    default:
      return a;
  }
}; //# sourceMappingURL=LocalStorage.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletConfig = exports.BulletDataCacheInfo = exports.PreloadBulletConfig = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CombatLog_1 = require("../../Utils/CombatLog");
const BulletDataMain_1 = require("./BulletConf/BulletDataMain");
const bulletDtPath = [undefined, undefined, "/Game/Aki/Data/Fight/DT_CommonBulletDataMain_Rogue.DT_CommonBulletDataMain_Rogue"];
class PreloadBulletConfig {
  constructor() {
    this.ModelId = 0;
    this.DataTable = undefined;
    this.RowNames = undefined;
    this.CurIndex = 0;
  }
}
exports.PreloadBulletConfig = PreloadBulletConfig;
const preloadCommonBulletRowNames = ["100121", "100122"];
class BulletDataCacheInfo {
  constructor() {
    this.BulletDataMap = new Map();
    this.DataTable = undefined;
    this.DataTableExtraList = undefined;
    this.EntityCount = 0;
  }
}
exports.BulletDataCacheInfo = BulletDataCacheInfo;
class BulletConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.q9o = [];
    this.G9o = undefined;
  }
  static RemoveCacheBulletDataByEntityId(t) {
    var e;
    var l = BulletConfig.N9o.get(t);
    if (l) {
      BulletConfig.N9o.delete(t);
      if (e = BulletConfig.O9o.get(l)) {
        e.EntityCount--;
        if (e.EntityCount === 0) {
          BulletConfig.O9o.delete(l);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 17, "删除实体时，子弹缓存里没有对应的数据", ["entityId", t], ["modelId", l]);
      }
    }
  }
  static ClearBulletDataCache() {
    BulletConfig.O9o.clear();
    BulletConfig.k9o.clear();
    BulletConfig.N9o.clear();
  }
  GetBulletData(t, e, l = true, o = -1) {
    var a = t.GetComponent(42);
    var i = t.Id;
    let n = BulletConfig.N9o.get(i);
    let r = true;
    if (!n) {
      n = t.CheckGetComponent(0).GetModelId();
      r = false;
    }
    let u = BulletConfig.O9o.get(n);
    if (u) {
      var f = u.BulletDataMap.get(e);
      if (f) {
        if (!r) {
          BulletConfig.N9o.set(i, n);
          u.EntityCount++;
        }
        return f;
      }
    }
    let s = this.F9o(o, e);
    if (s) {
      return s;
    }
    let C = undefined;
    let g = undefined;
    if (u) {
      C = u.DataTable;
      g = u.DataTableExtraList;
    } else {
      C = a?.DtBulletInfo;
      if (a?.DtBulletInfoExtraList && a?.DtBulletInfoExtraList.length > 0) {
        g = [];
        for (const _ of a.DtBulletInfoExtraList) {
          g.push(_);
        }
      }
    }
    let B = DataTableUtil_1.DataTableUtil.GetDataTableRow(C, e);
    if (!B && g) {
      for (const d of g) {
        if (B = DataTableUtil_1.DataTableUtil.GetDataTableRow(d, e)) {
          break;
        }
      }
    }
    if (B) {
      const s = new BulletDataMain_1.BulletDataMain(B, e, BulletConfig.rag(n, e));
      if (s.CheckValid()) {
        if (!GlobalData_1.GlobalData.IsPlayInEditor && !(u || ((u = new BulletDataCacheInfo()).DataTable = C, u.DataTableExtraList = g, u.EntityCount = 0, BulletConfig.O9o.set(n, u)), u.BulletDataMap.set(e, s), r)) {
          BulletConfig.N9o.set(i, n);
          u.EntityCount++;
        }
        return s;
      } else {
        CombatLog_1.CombatLog.Error("Bullet", undefined, "子弹配置非法", ["", e]);
        return;
      }
    }
    if (s = this.V9o(o, e, n)) {
      return s;
    }
    if (l && (f = t.CheckGetComponent(1).Owner, Log_1.Log.CheckError())) {
      Log_1.Log.Error("Bullet", 17, "子弹数据未找到!", ["角色:", f?.GetName()], ["子弹名称:", e], ["dtType", o]);
    }
  }
  static rag(t, e) {
    return t === BulletConfig.oag && BulletConfig.nag.has(e);
  }
  F9o(t, e) {
    if (t === -1) {
      for (const a of BulletConfig.k9o.values()) {
        var l = a.BulletDataMap.get(e);
        if (l) {
          return l;
        }
      }
    } else if (t !== 0) {
      const a = BulletConfig.k9o.get(t);
      if (a) {
        var o = a.BulletDataMap.get(e);
        if (o) {
          return o;
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 17, "该子弹的DT表没有加载，请检查触发子弹的玩法是否正确", ["bulletDataName", e], ["dtType", t]);
      }
    }
  }
  V9o(t, e, l) {
    if (t === -1) {
      for (const a of BulletConfig.k9o.values()) {
        const i = DataTableUtil_1.DataTableUtil.GetDataTableRow(a.DataTable, e);
        var o;
        if (i) {
          if ((o = new BulletDataMain_1.BulletDataMain(i, e, BulletConfig.rag(l, e))).CheckValid()) {
            if (!GlobalData_1.GlobalData.IsPlayInEditor) {
              a.BulletDataMap.set(e, o);
            }
            return o;
          } else {
            CombatLog_1.CombatLog.Error("Bullet", undefined, "子弹配置非法", ["", e]);
            return;
          }
        }
      }
    } else {
      const a = BulletConfig.k9o.get(t);
      if (a) {
        const i = DataTableUtil_1.DataTableUtil.GetDataTableRow(a.DataTable, e);
        if (i) {
          if ((t = new BulletDataMain_1.BulletDataMain(i, e, BulletConfig.rag(l, e))).CheckValid()) {
            if (!GlobalData_1.GlobalData.IsPlayInEditor) {
              a.BulletDataMap.set(e, t);
            }
            return t;
          } else {
            CombatLog_1.CombatLog.Error("Bullet", undefined, "子弹配置非法", ["", e]);
            return;
          }
        } else {
          return undefined;
        }
      }
    }
  }
  GetBulletHitData(e, l) {
    if (!FNameUtil_1.FNameUtil.IsNothing(l)) {
      var e = e.GetComponent(42);
      var o = l.toString();
      let t = undefined;
      if (e && !(t = DataTableUtil_1.DataTableUtil.GetDataTableRow(e.DtHitEffect, o)) && e.DtHitEffectExtraList) {
        for (const a of e.DtHitEffectExtraList) {
          if (t = DataTableUtil_1.DataTableUtil.GetDataTableRow(a, o)) {
            break;
          }
        }
      }
      return t = t || DataTableUtil_1.DataTableUtil.GetDataTableRow(ConfigManager_1.ConfigManager.WorldConfig.GetCommonHitEffectData(), o);
    }
  }
  PreloadCommonBulletData() {
    this.H9o(1);
    if (ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelikeOnly()) {
      this.H9o(2);
    }
    var t = ConfigManager_1.ConfigManager.WorldConfig.GetCommonBulletData();
    BulletConfig.j9o.Start();
    this.W9o(t, undefined, 0, 0, preloadCommonBulletRowNames);
    BulletConfig.j9o.Stop();
    return true;
  }
  H9o(e) {
    var l;
    var o = BulletConfig.k9o.get(e);
    if (!o) {
      let t = undefined;
      if (e === 1) {
        t = ConfigManager_1.ConfigManager.WorldConfig.GetCommonBulletData();
      } else if (l = bulletDtPath[e]) {
        t = ResourceSystem_1.ResourceSystem.Load(l, UE.DataTable);
      }
      if (t && ((o = new BulletDataCacheInfo()).DataTable = t, BulletConfig.k9o.set(e, o), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Bullet", 17, "预加载通用子弹DT", ["dtType", e]);
      }
    }
  }
  PreloadBulletData(t) {
    var e;
    var l;
    if (t?.GetComponent(0)?.IsRole()) {
      BulletConfig.j9o.Start();
      e = t.CheckGetComponent(42);
      l = t.CheckGetComponent(0).GetModelId();
      this.W9o(e.DtBulletInfo, e.DtBulletInfoExtraList, l, t.Id);
      BulletConfig.j9o.Stop();
    }
  }
  W9o(e, l, o, a, i = undefined) {
    if (!GlobalData_1.GlobalData.IsPlayInEditor && e && o !== undefined && !BulletConfig.O9o.has(o)) {
      let t = i;
      if (!t) {
        t = [];
        i = new Array();
        DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(e, i);
        for (const r of i) {
          t.push(r);
        }
      }
      var n = new BulletDataCacheInfo();
      n.DataTable = e;
      if (l) {
        n.DataTableExtraList = [];
        for (const u of l) {
          n.DataTableExtraList.push(u);
        }
      }
      if (ModelManager_1.ModelManager.CharacterModel.IsValid(a)) {
        n.EntityCount = 1;
        BulletConfig.N9o.set(a, o);
      }
      BulletConfig.O9o.set(o, n);
      i = new PreloadBulletConfig();
      i.ModelId = o;
      i.DataTable = e;
      i.CurIndex = 0;
      i.RowNames = t;
      if (this.G9o) {
        this.q9o.push(i);
      } else {
        this.G9o = i;
      }
    }
  }
  TickPreload() {
    if (this.G9o) {
      if (this.G9o.RowNames.length <= this.G9o.CurIndex) {
        if (this.q9o.length === 0) {
          this.G9o = undefined;
          return;
        }
        this.G9o = this.q9o.pop();
        if (this.G9o.RowNames.length <= this.G9o.CurIndex) {
          return;
        }
      }
      BulletConfig.K9o.Start();
      var t;
      var e;
      var l = BulletConfig.O9o.get(this.G9o.ModelId);
      if (l) {
        t = this.G9o.RowNames[this.G9o.CurIndex];
        if (e = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.G9o.DataTable, t)) {
          if ((e = new BulletDataMain_1.BulletDataMain(e, t, BulletConfig.rag(this.G9o.ModelId, t))).CheckValid()) {
            e.Preload();
            l.BulletDataMap.set(t, e);
          } else {
            CombatLog_1.CombatLog.Error("Bullet", undefined, "子弹配置非法", ["", t]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 17, "子弹配置为空", ["rowName", t], ["modelId", this.G9o?.ModelId], ["index", this.G9o?.CurIndex]);
        }
        this.G9o.CurIndex++;
      } else {
        this.G9o.CurIndex = this.G9o.RowNames.length;
      }
      BulletConfig.K9o.Stop();
    }
  }
  ClearPreload() {
    this.G9o = undefined;
    this.q9o.length = 0;
  }
}
(exports.BulletConfig = BulletConfig).j9o = Stats_1.Stat.Create("BulletConfigPreload");
BulletConfig.K9o = Stats_1.Stat.Create("BulletConfigTickPreload");
BulletConfig.O9o = new Map();
BulletConfig.k9o = new Map();
BulletConfig.N9o = new Map();
BulletConfig.oag = 391336;
BulletConfig.nag = new Set(["80037001002", "80037103005", "80037103006", "80037103007", "80037103008", "80037103009", "80037103010", "80037103011", "80037103012", "80037103013", "80037103014", "80037103015", "80037103016", "80037103017", "80037103018", "80037103019", "80037103020", "80037103021", "80037103022", "80037103023", "80037103024", "80037103025", "80037103026", "80037103027", "80037103028", "80037103029", "80037103030", "80037103031", "80037103032", "80037103033", "80037103034", "80037103035", "80037103036", "80037103037", "80037103038", "80037103039", "80037103040", "80037103041", "80037103042", "80037103043", "80037103044", "80037001001", "80037001103"]); //# sourceMappingURL=BulletConfig.js.map
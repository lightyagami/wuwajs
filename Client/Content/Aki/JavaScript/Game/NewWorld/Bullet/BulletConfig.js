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
  GetBulletData(t, e, l = true, a = -1) {
    var o = t.GetComponent(40);
    var i = t.Id;
    let n = BulletConfig.N9o.get(i);
    let r = true;
    if (!n) {
      n = t.CheckGetComponent(0).GetModelId();
      r = false;
    }
    let u = BulletConfig.O9o.get(n);
    if (u) {
      var s = u.BulletDataMap.get(e);
      if (s) {
        if (!r) {
          BulletConfig.N9o.set(i, n);
          u.EntityCount++;
        }
        return s;
      }
    }
    let f = this.F9o(a, e);
    if (f) {
      return f;
    }
    let C = undefined;
    let g = undefined;
    if (u) {
      C = u.DataTable;
      g = u.DataTableExtraList;
    } else {
      C = o?.DtBulletInfo;
      if (o?.DtBulletInfoExtraList && o?.DtBulletInfoExtraList.length > 0) {
        g = [];
        for (const _ of o.DtBulletInfoExtraList) {
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
      const f = new BulletDataMain_1.BulletDataMain(B, e);
      if (f.CheckValid()) {
        if (!GlobalData_1.GlobalData.IsPlayInEditor && !(u || ((u = new BulletDataCacheInfo()).DataTable = C, u.DataTableExtraList = g, u.EntityCount = 0, BulletConfig.O9o.set(n, u)), u.BulletDataMap.set(e, f), r)) {
          BulletConfig.N9o.set(i, n);
          u.EntityCount++;
        }
        return f;
      } else {
        CombatLog_1.CombatLog.Error("Bullet", undefined, "子弹配置非法", ["", e]);
        return;
      }
    }
    if (f = this.V9o(a, e)) {
      return f;
    }
    if (l && (s = t.CheckGetComponent(3).Actor, Log_1.Log.CheckError())) {
      Log_1.Log.Error("Bullet", 17, "子弹数据未找到!", ["角色:", s.GetName()], ["子弹名称:", e], ["dtType", a]);
    }
  }
  F9o(t, e) {
    if (t === -1) {
      for (const o of BulletConfig.k9o.values()) {
        var l = o.BulletDataMap.get(e);
        if (l) {
          return l;
        }
      }
    } else if (t !== 0) {
      const o = BulletConfig.k9o.get(t);
      if (o) {
        var a = o.BulletDataMap.get(e);
        if (a) {
          return a;
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 17, "该子弹的DT表没有加载，请检查触发子弹的玩法是否正确", ["bulletDataName", e], ["dtType", t]);
      }
    }
  }
  V9o(t, e) {
    if (t === -1) {
      for (const a of BulletConfig.k9o.values()) {
        const o = DataTableUtil_1.DataTableUtil.GetDataTableRow(a.DataTable, e);
        var l;
        if (o) {
          if ((l = new BulletDataMain_1.BulletDataMain(o, e)).CheckValid()) {
            if (!GlobalData_1.GlobalData.IsPlayInEditor) {
              a.BulletDataMap.set(e, l);
            }
            return l;
          } else {
            CombatLog_1.CombatLog.Error("Bullet", undefined, "子弹配置非法", ["", e]);
            return;
          }
        }
      }
    } else {
      const a = BulletConfig.k9o.get(t);
      if (a) {
        const o = DataTableUtil_1.DataTableUtil.GetDataTableRow(a.DataTable, e);
        if (o) {
          if ((t = new BulletDataMain_1.BulletDataMain(o, e)).CheckValid()) {
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
      var e = e.GetComponent(40);
      var a = l.toString();
      let t = undefined;
      if (e && !(t = DataTableUtil_1.DataTableUtil.GetDataTableRow(e.DtHitEffect, a)) && e.DtHitEffectExtraList) {
        for (const o of e.DtHitEffectExtraList) {
          if (t = DataTableUtil_1.DataTableUtil.GetDataTableRow(o, a)) {
            break;
          }
        }
      }
      return t = t || DataTableUtil_1.DataTableUtil.GetDataTableRow(ConfigManager_1.ConfigManager.WorldConfig.GetCommonHitEffectData(), a);
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
    var a = BulletConfig.k9o.get(e);
    if (!a) {
      let t = undefined;
      if (e === 1) {
        t = ConfigManager_1.ConfigManager.WorldConfig.GetCommonBulletData();
      } else if (l = bulletDtPath[e]) {
        t = ResourceSystem_1.ResourceSystem.Load(l, UE.DataTable);
      }
      if (t && ((a = new BulletDataCacheInfo()).DataTable = t, BulletConfig.k9o.set(e, a), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Bullet", 17, "预加载通用子弹DT", ["dtType", e]);
      }
    }
  }
  PreloadBulletData(t) {
    var e;
    var l;
    if (t?.GetComponent(0)?.IsRole()) {
      BulletConfig.j9o.Start();
      e = t.CheckGetComponent(40);
      l = t.CheckGetComponent(0).GetModelId();
      this.W9o(e.DtBulletInfo, e.DtBulletInfoExtraList, l, t.Id);
      BulletConfig.j9o.Stop();
    }
  }
  W9o(e, l, a, o, i = undefined) {
    if (!GlobalData_1.GlobalData.IsPlayInEditor && e && a !== undefined && !BulletConfig.O9o.has(a)) {
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
      if (ModelManager_1.ModelManager.CharacterModel.IsValid(o)) {
        n.EntityCount = 1;
        BulletConfig.N9o.set(o, a);
      }
      BulletConfig.O9o.set(a, n);
      i = new PreloadBulletConfig();
      i.ModelId = a;
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
          if ((e = new BulletDataMain_1.BulletDataMain(e, t)).CheckValid()) {
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
BulletConfig.N9o = new Map(); //# sourceMappingURL=BulletConfig.js.map
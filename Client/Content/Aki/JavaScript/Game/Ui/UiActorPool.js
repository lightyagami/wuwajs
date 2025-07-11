"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiActorPool = exports.UiPoolActor = undefined;
const ActorSystem_1 = require("../../Core/Actor/ActorSystem");
const CustomPromise_1 = require("../../Core/Common/CustomPromise");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const Time_1 = require("../../Core/Common/Time");
const Queue_1 = require("../../Core/Container/Queue");
const CommonDefine_1 = require("../../Core/Define/CommonDefine");
const ConfigManager_1 = require("../../Game/Manager/ConfigManager");
const UiLayerType_1 = require("./Define/UiLayerType");
const LguiResourceManager_1 = require("./LguiResourceManager");
const UiLayer_1 = require("./UiLayer");
const CACHE_TIME_SECOND = 30;
const CACHE_TIME = CACHE_TIME_SECOND * CommonDefine_1.MILLIONSECOND_PER_SECOND;
const TICK_GARBAGE_MAXCOUNT = 1;
const DEFAULT_CAPACITY = 15;
const prepareConfigList = [{
  ResourceId: "UiItem_NPCIcon_Prefab",
  CacheCount: () => 30
}, {
  ResourceId: "UiItem_Mark_Prefab",
  CacheCount: () => 2
}, {
  ResourceId: "UiItem_MarkMapName_Prefab",
  CacheCount: () => 2
}, {
  ResourceId: "UiItem_MarkArea_Prefab",
  CacheCount: () => 2
}, {
  ResourceId: "UiItem_ProbeArea",
  CacheCount: () => 2
}, {
  ResourceId: "UiItem_MarkChoose_Prefab",
  CacheCount: () => 2
}, {
  ResourceId: "UiItem_MarkOut_Prefab",
  CacheCount: () => 2
}, {
  ResourceId: "UiItem_MarkTrackNia_Prefab",
  CacheCount: () => 2
}, {
  ResourceId: "UiItem_Map_Prefab",
  CacheCount: () => 0
}, {
  ResourceId: "UiItem_MiniMap_Prefab",
  CacheCount: () => 1
}, {
  ResourceId: "UiItem_WorldMapMark_Prefab",
  CacheCount: () => 1
}, {
  ResourceId: "UiView_InteractionHint_Prefab",
  CacheCount: () => 1
}, {
  ResourceId: "UiView_Roulette_Prefab",
  CacheCount: () => 1
}, {
  ResourceId: "UiItem_SuoDing",
  CacheCount: () => 1
}, {
  ResourceId: "UiItem_PartState_Prefab",
  CacheCount: () => 1
}, {
  ResourceId: "UiView_AcquireIntro_Prefab",
  CacheCount: () => 1
}, {
  ResourceId: "UiItem_ItemListA",
  CacheCount: () => 3
}, {
  ResourceId: "UiItem_ItemListB",
  CacheCount: () => 4
}, {
  ResourceId: "UiView_BlackScreen_Prefab",
  CacheCount: () => 1
}, {
  ResourceId: "UiView_BlackFadeScreen_Prefab",
  CacheCount: () => 1
}, {
  ResourceId: "UiItem_InteractionSpot",
  CacheCount: () => 1
}];
class UiPoolActor {
  constructor(o) {
    this.OCe = undefined;
    this.Xdr = "";
    this.$dr = 0;
    this.Xdr = o;
  }
  get Actor() {
    return this.OCe;
  }
  set Actor(o) {
    this.OCe = o;
  }
  get IsValid() {
    return this.OCe?.IsValid() ?? false;
  }
  get UiItem() {
    return this.OCe?.RootComponent;
  }
  get Path() {
    return this.Xdr;
  }
  get EndTime() {
    return this.$dr;
  }
  set EndTime(o) {
    this.$dr = o;
  }
  Clear() {
    if (this.IsValid) {
      ActorSystem_1.ActorSystem.Put("UiPoolActor.Clear", this.OCe);
      this.OCe = undefined;
    }
  }
}
exports.UiPoolActor = UiPoolActor;
class UiActorFactory {
  constructor(o, e) {
    this.Xdr = "";
    this.Ydr = undefined;
    this.Jdr = 0;
    this.IsKeepWhileCleaning = false;
    this.mp = new Queue_1.Queue(DEFAULT_CAPACITY);
    this.zdr = LguiResourceManager_1.LguiResourceManager.InvalidId;
    this.Xdr = o;
    this.Ydr = e;
    this.Jdr = UiActorPool.PrepareConfigMap.get(o)?.() ?? 0;
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Pool", 10, "[UiActorFactory:constructor]初始化缓存池有问题,缓存池挂载根节点为空");
      }
    }
  }
  a7() {
    var o = new UiPoolActor(this.Xdr);
    o.EndTime = Time_1.Time.Now + CACHE_TIME;
    return o;
  }
  h7(o) {
    o.Clear();
  }
  async PreloadActor(o) {
    this.Jdr = o();
    var e = o() - this.mp.Size;
    if (!(e <= 0)) {
      if (this.Ydr) {
        var t = [];
        for (let o = 0; o < e; o++) {
          t.push(this.GetAsync(this.Xdr, this.Ydr));
        }
        (await Promise.all(t)).forEach(o => {
          this.mp.Push(o);
        });
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Pool", 16, "预加载UiPoolActor对象", ["预加载数量", e], ["资源路径", this.Xdr]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Pool", 10, "[UiActorFactory:PreloadActor]初始化缓存池有问题,缓存池挂载根节点为空");
      }
    }
  }
  Release(o) {
    if (o) {
      this.mp.Push(o);
      if (o.IsValid) {
        o.UiItem?.SetUIParent(this.Ydr);
        o.EndTime = Time_1.Time.Now + CACHE_TIME;
      } else {
        o.EndTime = Time_1.Time.Now;
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Pool", 16, "回收UiPoolActor对象", ["目前未使用数量", this.mp.Size], ["资源路径", o.Path]);
      }
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Pool", 16, "回收UiPoolActor对象不存在");
      }
      this.CancelGetAsync();
      return false;
    }
  }
  GarbageCollect(e) {
    if (this.mp.Size <= this.Jdr) {
      return e;
    }
    let t = 0;
    for (let o = 0; o < e && !this.mp.Empty; ++o) {
      var r = this.mp.Front;
      if (r.EndTime > Time_1.Time.Now) {
        break;
      }
      this.mp.Pop();
      this.h7(r);
      t++;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Pool", 16, "缓存池中UiPoolActor未使用对象执行GC", ["目前未使用数量", this.mp.Size], ["资源路径", this.Xdr]);
      }
    }
    return e - t;
  }
  Clear() {
    while (!this.mp.Empty) {
      var o = this.mp.Pop();
      this.h7(o);
    }
    this.mp.Clear();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Pool", 16, "清除操作", ["资源路径", this.Xdr]);
    }
  }
  async Zdr() {
    if (this.Ydr) {
      const e = new CustomPromise_1.CustomPromise();
      this.zdr = LguiResourceManager_1.LguiResourceManager.LoadPrefab(this.Xdr, this.Ydr, o => {
        this.zdr = LguiResourceManager_1.LguiResourceManager.InvalidId;
        e.SetResult(o);
      });
      return e.Promise;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Pool", 10, "[UiActorFactory:TemplateActor]初始化缓存池有问题,缓存池挂载根节点为空");
    }
  }
  async GetAsync(o, e) {
    var t = this.mp.Empty ? this.a7() : this.mp.Pop();
    if (!t.IsValid) {
      t.Actor = await this.Zdr();
    }
    var r = t.UiItem;
    if (r) {
      if (e) {
        r?.SetUIParent(e);
      }
      r?.SetUIActive(true);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Pool", 16, "获取UiPoolActor对象", ["资源路径", o]);
      }
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Pool", 16, "获取UiPoolActor对象失败, 未成功加载Actor", ["资源路径", o]);
    }
  }
  CancelGetAsync() {
    LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.zdr);
    this.zdr = LguiResourceManager_1.LguiResourceManager.InvalidId;
  }
}
class UiActorPool {
  static eCr(o) {
    let e = UiActorPool.tCr.get(o);
    if (!e) {
      e = new UiActorFactory(o, UiActorPool.iCr);
      UiActorPool.tCr.set(o, e);
    }
    return e;
  }
  static oCr(o) {
    return UiActorPool.tCr.get(o);
  }
  static async Init() {
    if (this.IsOpenPool) {
      UiActorPool.iCr = UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pool);
      await UiActorPool.e$e();
    }
  }
  static async e$e() {
    UiActorPool.PrepareConfigMap.clear();
    var o = [];
    for (const r of prepareConfigList) {
      var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(r.ResourceId);
      var t = UiActorPool.eCr(e);
      o.push(t.PreloadActor(r.CacheCount));
      UiActorPool.PrepareConfigMap.set(e, r.CacheCount);
    }
    await Promise.all(o);
  }
  static Tick(o) {
    UiActorPool.xW.Start();
    let e = TICK_GARBAGE_MAXCOUNT;
    for (const t of UiActorPool.tCr.values()) {
      if ((e = t.GarbageCollect(e)) <= 0) {
        break;
      }
    }
    UiActorPool.xW.Stop();
  }
  static ClearPool() {
    for (var [o, e] of UiActorPool.tCr) {
      if (!e.IsKeepWhileCleaning) {
        e.Clear();
        UiActorPool.tCr.delete(o);
      }
    }
  }
  static SetKeepWhileCleaning(o, e) {
    if (this.IsOpenPool && (o = UiActorPool.eCr(o))) {
      o.IsKeepWhileCleaning = e;
    }
  }
  static async GetAsync(o, e) {
    if (this.IsOpenPool) {
      return UiActorPool.eCr(o).GetAsync(o, e);
    } else {
      return UiActorPool.rCr(o, e);
    }
  }
  static async rCr(t, o) {
    const r = new CustomPromise_1.CustomPromise();
    LguiResourceManager_1.LguiResourceManager.LoadPrefab(t, o, o => {
      var e = new UiPoolActor(t);
      e.EndTime = Time_1.Time.Now + CACHE_TIME;
      e.Actor = o;
      r.SetResult(e);
    });
    return r.Promise;
  }
  static RecycleAsync(o, e) {
    e = UiActorPool.oCr(e);
    if (e) {
      e.Release(o);
    } else if (o?.Actor) {
      o.Clear();
    }
  }
}
(exports.UiActorPool = UiActorPool).tCr = new Map();
UiActorPool.xW = Stats_1.Stat.Create("UiActorPool.Tick");
UiActorPool.iCr = undefined;
UiActorPool.PrepareConfigMap = new Map();
UiActorPool.IsOpenPool = true; //# sourceMappingURL=UiActorPool.js.map
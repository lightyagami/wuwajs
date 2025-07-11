"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueActorPool = exports.PROCESSING_INTERVAL = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const LguiResourceManager_1 = require("../../../Ui/LguiResourceManager");
const UiActorPool_1 = require("../../../Ui/UiActorPool");
const UiLayer_1 = require("../../../Ui/UiLayer");
const ACTOR_MAX_CACHE_COUNT = 0;
const TICK_GARBAGE_MAXCOUNT = 10;
exports.PROCESSING_INTERVAL = 100;
class MapUiActorFactory {
  constructor(o, e) {
    this.Xdr = "";
    this.Ydr = undefined;
    this.K7 = [];
    this.r91 = new Set();
    this.Xdr = o;
    this.Ydr = e;
  }
  Clear() {
    this.CancelLoad();
    for (const o of this.K7) {
      o.Clear();
    }
    this.K7.length = 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Pool", 37, "[MapRogueActorPool] 清除Factory", ["Path", this.Xdr]);
    }
  }
  CancelLoad() {
    for (const o of this.r91) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(o);
    }
    this.r91.clear();
  }
  Release(o) {
    return !!o && !!o.IsValid && (o.UiItem?.SetUIActive(false), o.UiItem?.SetUIParent(this.Ydr), this.K7.push(o), true);
  }
  GarbageCollect(e) {
    if (this.K7.length <= ACTOR_MAX_CACHE_COUNT) {
      return 0;
    }
    let t = 0;
    for (let o = 0; o < e; ++o) {
      var r = this.K7.pop();
      if (!r) {
        break;
      }
      r.Clear();
      t++;
    }
    return t;
  }
  async Zdr() {
    const e = new CustomPromise_1.CustomPromise();
    var o = LguiResourceManager_1.LguiResourceManager.LoadPrefab(this.Xdr, this.Ydr, o => {
      e.SetResult(o);
    });
    if (o !== ResourceSystem_1.ResourceSystem.InvalidId) {
      this.r91.add(o);
    }
    var t = await e.Promise;
    this.r91.delete(o);
    return t;
  }
  async GetAsync(o, e) {
    var t = new UiActorPool_1.UiPoolActor(this.Xdr);
    if (!t.IsValid) {
      t.Actor = await this.Zdr();
    }
    var r = t.UiItem;
    if (r) {
      if (e) {
        r.SetUIParent(e);
      }
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Pool", 37, "[MapRogueActorPool] 获取UiPoolActor对象失败", ["资源路径", o]);
    }
  }
}
class MapRogueActorPool {
  constructor() {
    this.tCr = new Map();
    this.iCr = undefined;
    this.o91 = 0;
  }
  Init() {
    this.iCr = UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pool);
    if (!this.iCr) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Pool", 37, "[MapRogueActorPool] 初始缓存池有问题,挂载根节点为空");
      }
    }
  }
  Tick(o) {
    this.o91 += o;
    if (!(this.o91 < exports.PROCESSING_INTERVAL)) {
      let o = this.o91 = 0;
      for (const e of this.tCr.values()) {
        if ((o += e.GarbageCollect(TICK_GARBAGE_MAXCOUNT)) >= TICK_GARBAGE_MAXCOUNT) {
          break;
        }
      }
    }
  }
  Clear() {
    for (const o of this.tCr.values()) {
      o.Clear();
    }
    this.iCr = undefined;
    this.tCr.clear();
  }
  CancelLoad() {
    for (const o of this.tCr.values()) {
      o.CancelLoad();
    }
  }
  eCr(o) {
    let e = this.tCr.get(o);
    if (!e) {
      e = new MapUiActorFactory(o, this.iCr);
      this.tCr.set(o, e);
    }
    return e;
  }
  async GetAsync(o, e) {
    return this.eCr(o).GetAsync(o, e);
  }
  RecycleAsync(o, e) {
    this.eCr(e).Release(o);
  }
}
exports.MapRogueActorPool = MapRogueActorPool;
//# sourceMappingURL=MapRogueActorPool.js.map
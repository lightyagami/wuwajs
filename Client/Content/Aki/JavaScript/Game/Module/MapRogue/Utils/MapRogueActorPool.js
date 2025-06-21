"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MapRogueActorPool = exports.PROCESSING_INTERVAL = void 0;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
  LguiResourceManager_1 = require("../../../Ui/LguiResourceManager"),
  UiActorPool_1 = require("../../../Ui/UiActorPool"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  ACTOR_MAX_CACHE_COUNT = 0,
  TICK_GARBAGE_MAXCOUNT = 10;
exports.PROCESSING_INTERVAL = 100;
class MapUiActorFactory {
  constructor(o, e) {
    this.Xdr = "", this.Ydr = void 0, this.K7 = [], this.M71 = new Set, this.Xdr = o, this.Ydr = e
  }
  Clear() {
    this.CancelLoad();
    for (const o of this.K7) o.Clear();
    this.K7.length = 0, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Pool", 37, "[MapRogueActorPool] 清除Factory", ["Path", this.Xdr])
  }
  CancelLoad() {
    for (const o of this.M71) ResourceSystem_1.ResourceSystem.CancelAsyncLoad(o);
    this.M71.clear()
  }
  Release(o) {
    return !!o && !!o.IsValid && (o.UiItem?.SetUIActive(!1), o.UiItem?.SetUIParent(this.Ydr), this.K7.push(o), !0)
  }
  GarbageCollect(e) {
    if (this.K7.length <= ACTOR_MAX_CACHE_COUNT) return 0;
    let t = 0;
    for (let o = 0; o < e; ++o) {
      var r = this.K7.pop();
      if (!r) break;
      r.Clear(), t++
    }
    return t
  }
  async Zdr() {
    const e = new CustomPromise_1.CustomPromise;
    var o = LguiResourceManager_1.LguiResourceManager.LoadPrefab(this.Xdr, this.Ydr, o => {
        e.SetResult(o)
      }),
      t = (o !== ResourceSystem_1.ResourceSystem.InvalidId && this.M71.add(o), await e.Promise);
    return this.M71.delete(o), t
  }
  async GetAsync(o, e) {
    var t = new UiActorPool_1.UiPoolActor(this.Xdr),
      r = (t.IsValid || (t.Actor = await this.Zdr()), t.UiItem);
    if (r) return e && r.SetUIParent(e), t;
    Log_1.Log.CheckError() && Log_1.Log.Error("Pool", 37, "[MapRogueActorPool] 获取UiPoolActor对象失败", ["资源路径", o])
  }
}
class MapRogueActorPool {
  constructor() {
    this.tCr = new Map, this.iCr = void 0, this.E71 = 0
  }
  Init() {
    this.iCr = UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pool), this.iCr || Log_1.Log.CheckError() && Log_1.Log.Error("Pool", 37, "[MapRogueActorPool] 初始缓存池有问题,挂载根节点为空")
  }
  Tick(o) {
    if (this.E71 += o, !(this.E71 < exports.PROCESSING_INTERVAL)) {
      let o = this.E71 = 0;
      for (const e of this.tCr.values())
        if ((o += e.GarbageCollect(TICK_GARBAGE_MAXCOUNT)) >= TICK_GARBAGE_MAXCOUNT) break
    }
  }
  Clear() {
    for (const o of this.tCr.values()) o.Clear();
    this.iCr = void 0, this.tCr.clear()
  }
  CancelLoad() {
    for (const o of this.tCr.values()) o.CancelLoad()
  }
  eCr(o) {
    let e = this.tCr.get(o);
    return e || (e = new MapUiActorFactory(o, this.iCr), this.tCr.set(o, e)), e
  }
  async GetAsync(o, e) {
    return this.eCr(o).GetAsync(o, e)
  }
  RecycleAsync(o, e) {
    this.eCr(e).Release(o)
  }
}
exports.MapRogueActorPool = MapRogueActorPool;
//# sourceMappingURL=MapRogueActorPool.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ScreenEffectModel = exports.ScreenEffectHandle = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  ScreenEffectSystem_1 = require("./ScreenEffectSystem");
class ScreenEffectHandle {
  constructor() {
    this.HandleIds = new Set, this.Path = void 0, this.EffectData = void 0, this.LoadResId = -1, this.WaitingRootInit = !1, this.RootType = 0
  }
}
exports.ScreenEffectHandle = ScreenEffectHandle;
class ScreenEffectModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.HandleIdGenerator = 1, this.HandleMap = new Map, this.PathToHandleMap = new Map, this.HandlePool = [], this.FightRootInited = !1, this.GeneralRootInited = !1, this.nye = () => {
      this.dmu()
    }, this.mmu = void 0, this.fmu = () => {
      Log_1.Log.CheckInfo() && Log_1.Log.Info("UiCore", 39, "ScreenEffectUiRoot被销毁"), this.mmu?.K2_DetachFromActor(), this.SetGeneralRootInited(!1)
    }
  }
  OnInit() {
    return EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye), !0
  }
  PlayScreenEffect(e) {
    let t = this.PathToHandleMap.get(e);
    t || ((t = this.GetHandle()).Path = e, this.PathToHandleMap.set(e, t));
    var r = this.HandleIdGenerator++;
    return t.HandleIds.add(r), this.HandleMap.set(r, t), Log_1.Log.CheckDebug() && Log_1.Log.Debug("RenderEffect", 17, "调用播放镜头特效接口", ["handleId", r], ["path", e]), 1 === t.HandleIds.size && (t.LoadResId = this.uTa(e)), r
  }
  uTa(r) {
    return ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.EffectScreenPlayData_C, e => {
      var t = this.PathToHandleMap.get(r);
      if (t && 0 !== t.HandleIds.size && e) {
        if (t.EffectData = e, t.RootType = e.RootType, e.bUsedForSequence) t.RootType = 1;
        else switch (e.RootType) {
          case 0:
            if (this.FightRootInited) break;
            return void(t.WaitingRootInit = !0);
          case 2:
            if (this.GeneralRootInited) break;
            return void(t.WaitingRootInit = !0)
        }
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("RenderEffect", 17, "开始播放镜头特效", ["path", r]), ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(e)
      }
    })
  }
  EndScreenEffectByPath(e) {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("RenderEffect", 17, "调用停止镜头特效接口", ["path", e]);
    var t = this.PathToHandleMap.get(e);
    t ? (this.PathToHandleMap.delete(t.Path), this.cTa(t)) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderEffect", 17, "调用停止镜头特效接口时找不到path对应的Handle，尝试直接获取已加载的PlayData来停止特效", ["path", e]), (t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e, UE.EffectScreenPlayData_C)) && ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(t))
  }
  EndScreenEffect(e) {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("RenderEffect", 17, "调用停止镜头特效接口", ["handleId", e]);
    var t = this.HandleMap.get(e);
    t && t.HandleIds.has(e) && (t.HandleIds.delete(e), 0 === t.HandleIds.size) && (this.PathToHandleMap.delete(t.Path), this.cTa(t))
  }
  OnClear() {
    return EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye), this.HandleIdGenerator = 0, this.mTa(), !0
  }
  mTa() {
    for (const e of this.PathToHandleMap.values()) this.cTa(e);
    this.PathToHandleMap.clear(), this.HandleMap.clear()
  }
  cTa(e) {
    e.HandleIds.clear(), e.EffectData && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("RenderEffect", 17, "停止镜头特效", ["path", e.Path]), ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(e.EffectData), e.EffectData = void 0), -1 !== e.LoadResId && (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e.LoadResId), e.LoadResId = -1), e.Path = void 0, e.RootType = 0, e.WaitingRootInit = !1, this.ReleaseHandle(e)
  }
  SetFightRootInited(e) {
    if (Log_1.Log.CheckDebug() && Log_1.Log.Debug("RenderEffect", 17, "设置战斗镜头特效根节点", ["isInit", e]), this.FightRootInited !== e && (this.FightRootInited = e))
      for (const t of this.PathToHandleMap.values()) t.WaitingRootInit && 0 === t.RootType && (t.WaitingRootInit = !1, t.EffectData) && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("RenderEffect", 17, "开始播放镜头特效", ["path", t.Path]), ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(t.EffectData))
  }
  SetGeneralRootInited(e) {
    if (Log_1.Log.CheckDebug() && Log_1.Log.Debug("RenderEffect", 39, "设置通用镜头特效根节点", ["isInit", e]), this.GeneralRootInited !== e && (this.GeneralRootInited = e))
      for (const t of this.PathToHandleMap.values()) t.WaitingRootInit && 2 === t.RootType && (t.WaitingRootInit = !1, t.EffectData) && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("RenderEffect", 17, "开始播放镜头特效", ["path", t.Path]), ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(t.EffectData))
  }
  GetHandle() {
    var e = this.HandlePool.pop();
    return e || new ScreenEffectHandle
  }
  ReleaseHandle(e) {
    this.HandlePool.includes(e) ? Log_1.Log.CheckWarn() && Log_1.Log.Warn("RenderEffect", 17, "镜头特效Handel重复入池") : this.HandlePool.push(e)
  }
  dmu() {
    var e = (0, puerts_1.$ref)(void 0),
      t = ScreenEffectSystem_1.ScreenEffectSystem.GetInstance(),
      r = UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.ScreenEffect);
    t?.IsValid() && r && (t.GetScreenEffectGeneralRoot(e), (e = (0, puerts_1.$unref)(e)) ? e !== this.mmu && (this.mmu?.IsValid() && (Log_1.Log.CheckInfo() && Log_1.Log.Info("UiCore", 39, "ScreenEffectUiRoot被替换"), this.mmu.OnDestroyed.Remove(this.fmu), this.mmu?.K2_DetachFromActor(), this.SetGeneralRootInited(!1)), this.mmu = e, this.mmu.OnDestroyed.Add(this.fmu), this.mmu.K2_AttachRootComponentTo(r), UE.KuroStaticLibrary.SetActorPermanent(t, !0, !1), UE.KuroStaticLibrary.SetActorPermanent(e, !0, !1), this.SetGeneralRootInited(!0)) : Log_1.Log.CheckError() && Log_1.Log.Error("UiCore", 39, "ScreenEffectUiRoot获取失败"))
  }
  GetIsGeneralScreenEffectActive() {
    for (var [, e] of this.PathToHandleMap)
      if (2 === e.RootType) return !0;
    return !1
  }
}
exports.ScreenEffectModel = ScreenEffectModel;
//# sourceMappingURL=ScreenEffectModel.js.map
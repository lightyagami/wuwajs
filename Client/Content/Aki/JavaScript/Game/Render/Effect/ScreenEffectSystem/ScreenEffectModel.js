"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScreenEffectModel = exports.ScreenEffectHandle = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../Ui/UiLayer");
const ScreenEffectSystem_1 = require("./ScreenEffectSystem");
class ScreenEffectHandle {
  constructor() {
    this.HandleIds = new Set();
    this.Path = undefined;
    this.EffectData = undefined;
    this.LoadResId = -1;
    this.WaitingRootInit = false;
    this.RootType = 0;
  }
}
exports.ScreenEffectHandle = ScreenEffectHandle;
class ScreenEffectModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.HandleIdGenerator = 1;
    this.HandleMap = new Map();
    this.PathToHandleMap = new Map();
    this.HandlePool = [];
    this.FightRootInited = false;
    this.GeneralRootInited = false;
    this.CoverLoadingRootInited = false;
    this.nye = () => {
      this.$xu();
      this.d7g();
    };
    this.Wxu = undefined;
    this.Qxu = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 39, "ScreenEffectUiRoot被销毁");
      }
      this.Wxu?.K2_DetachFromActor();
      this.SetGeneralRootInited(false);
    };
    this.m7g = undefined;
    this.f7g = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 39, "CoverLoadingUiRoot被销毁");
      }
      this.m7g?.K2_DetachFromActor();
      this.SetCoverLoadingRootInited(false);
    };
  }
  OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    return true;
  }
  PlayScreenEffect(e, t) {
    let i = this.PathToHandleMap.get(e);
    if (!i) {
      (i = this.GetHandle()).Path = e;
      this.PathToHandleMap.set(e, i);
    }
    var r = this.HandleIdGenerator++;
    i.HandleIds.add(r);
    this.HandleMap.set(r, i);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RenderEffect", 17, "调用播放镜头特效接口", ["handleId", r], ["path", e]);
    }
    if (i.HandleIds.size === 1) {
      i.LoadResId = this.uTa(e, t);
    }
    return r;
  }
  uTa(i, e) {
    return ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.EffectScreenPlayData_C, e => {
      var t = this.PathToHandleMap.get(i);
      if (t && t.HandleIds.size !== 0 && e) {
        t.EffectData = e;
        t.RootType = e.RootType;
        if (e.bUsedForSequence) {
          t.RootType = 1;
        } else {
          switch (e.RootType) {
            case 0:
              if (this.FightRootInited) {
                break;
              }
              t.WaitingRootInit = true;
              return;
            case 2:
              if (this.GeneralRootInited) {
                break;
              }
              t.WaitingRootInit = true;
              return;
            case 3:
              if (this.CoverLoadingRootInited) {
                break;
              }
              t.WaitingRootInit = true;
              return;
          }
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("RenderEffect", 17, "开始播放镜头特效", ["path", i]);
        }
        ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(e);
      }
    }, 102, e);
  }
  EndScreenEffectByPath(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RenderEffect", 17, "调用停止镜头特效接口", ["path", e]);
    }
    var t = this.PathToHandleMap.get(e);
    if (t) {
      this.PathToHandleMap.delete(t.Path);
      this.cTa(t);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RenderEffect", 17, "调用停止镜头特效接口时找不到path对应的Handle，尝试直接获取已加载的PlayData来停止特效", ["path", e]);
      }
      if (t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e, UE.EffectScreenPlayData_C)) {
        ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(t);
      }
    }
  }
  EndScreenEffect(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RenderEffect", 17, "调用停止镜头特效接口", ["handleId", e]);
    }
    var t = this.HandleMap.get(e);
    if (t && t.HandleIds.has(e) && (t.HandleIds.delete(e), t.HandleIds.size === 0)) {
      this.PathToHandleMap.delete(t.Path);
      this.cTa(t);
    }
  }
  OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    this.HandleIdGenerator = 0;
    this.mTa();
    return true;
  }
  mTa() {
    for (const e of this.PathToHandleMap.values()) {
      this.cTa(e);
    }
    this.PathToHandleMap.clear();
    this.HandleMap.clear();
  }
  cTa(e) {
    e.HandleIds.clear();
    if (e.EffectData) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RenderEffect", 17, "停止镜头特效", ["path", e.Path]);
      }
      ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(e.EffectData);
      e.EffectData = undefined;
    }
    if (e.LoadResId !== -1) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e.LoadResId);
      e.LoadResId = -1;
    }
    e.Path = undefined;
    e.RootType = 0;
    e.WaitingRootInit = false;
    this.ReleaseHandle(e);
  }
  SetFightRootInited(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RenderEffect", 17, "设置战斗镜头特效根节点", ["isInit", e]);
    }
    if (this.FightRootInited !== e && (this.FightRootInited = e)) {
      for (const t of this.PathToHandleMap.values()) {
        if (t.WaitingRootInit && t.RootType === 0 && (t.WaitingRootInit = false, t.EffectData)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("RenderEffect", 17, "开始播放镜头特效", ["path", t.Path]);
          }
          ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(t.EffectData);
        }
      }
    }
  }
  SetGeneralRootInited(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RenderEffect", 39, "设置通用镜头特效根节点", ["isInit", e]);
    }
    if (this.GeneralRootInited !== e && (this.GeneralRootInited = e)) {
      for (const t of this.PathToHandleMap.values()) {
        if (t.WaitingRootInit && t.RootType === 2 && (t.WaitingRootInit = false, t.EffectData)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("RenderEffect", 17, "开始播放镜头特效", ["path", t.Path]);
          }
          ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(t.EffectData);
        }
      }
    }
  }
  SetCoverLoadingRootInited(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RenderEffect", 39, "设置通用镜头特效根节点", ["isInit", e]);
    }
    if (this.CoverLoadingRootInited !== e && (this.CoverLoadingRootInited = e)) {
      for (const t of this.PathToHandleMap.values()) {
        if (t.WaitingRootInit && t.RootType === 3 && (t.WaitingRootInit = false, t.EffectData)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("RenderEffect", 17, "开始播放镜头特效", ["path", t.Path]);
          }
          ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(t.EffectData);
        }
      }
    }
  }
  GetHandle() {
    var e = this.HandlePool.pop();
    return e || new ScreenEffectHandle();
  }
  ReleaseHandle(e) {
    if (this.HandlePool.includes(e)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RenderEffect", 17, "镜头特效Handel重复入池");
      }
    } else {
      this.HandlePool.push(e);
    }
  }
  $xu() {
    var e = (0, puerts_1.$ref)(undefined);
    var t = ScreenEffectSystem_1.ScreenEffectSystem.GetInstance();
    var i = UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.ScreenEffect);
    if (t?.IsValid() && i) {
      t.GetScreenEffectGeneralRoot(e);
      if (e = (0, puerts_1.$unref)(e)) {
        if (e !== this.Wxu) {
          if (this.Wxu?.IsValid()) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("UiCore", 39, "ScreenEffectUiRoot被替换");
            }
            this.Wxu.OnDestroyed.Remove(this.Qxu);
            this.Wxu?.K2_DetachFromActor();
            this.SetGeneralRootInited(false);
          }
          this.Wxu = e;
          this.Wxu.OnDestroyed.Add(this.Qxu);
          this.Wxu.K2_AttachRootComponentTo(i);
          UE.KuroStaticLibrary.SetActorPermanent(t, true, false);
          UE.KuroStaticLibrary.SetActorPermanent(e, true, false);
          this.SetGeneralRootInited(true);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 39, "ScreenEffectUiRoot获取失败");
      }
    }
  }
  GetIsGeneralScreenEffectActive() {
    for (var [, e] of this.PathToHandleMap) {
      if (e.RootType === 2) {
        return true;
      }
    }
    return false;
  }
  d7g() {
    var e = (0, puerts_1.$ref)(undefined);
    var t = ScreenEffectSystem_1.ScreenEffectSystem.GetInstance();
    var i = UiLayer_1.UiLayer.GetFloatUnit(UiLayerType_1.ELayerType.Loading, UiLayerType_1.SE_COVER_LOADING_VIEW_NODE_TYPE);
    if (t?.IsValid() && i) {
      t.GetScreenEffectCoverLoadingRoot(e);
      if (e = (0, puerts_1.$unref)(e)) {
        if (e !== this.m7g) {
          if (this.m7g?.IsValid()) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("UiCore", 39, "ScreenEffectUiRoot被替换");
            }
            this.m7g.OnDestroyed.Remove(this.f7g);
            this.m7g?.K2_DetachFromActor();
            this.SetCoverLoadingRootInited(false);
          }
          this.m7g = e;
          this.m7g.OnDestroyed.Add(this.f7g);
          this.m7g.K2_AttachRootComponentTo(i);
          UE.KuroStaticLibrary.SetActorPermanent(t, true, false);
          UE.KuroStaticLibrary.SetActorPermanent(e, true, false);
          this.SetCoverLoadingRootInited(true);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 39, "CoverLoadingUiRoot获取失败");
      }
    }
  }
}
exports.ScreenEffectModel = ScreenEffectModel;
//# sourceMappingURL=ScreenEffectModel.js.map
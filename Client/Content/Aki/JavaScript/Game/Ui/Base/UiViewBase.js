"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiViewBase = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioController_1 = require("../../../Core/Audio/AudioController");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const Queue_1 = require("../../../Core/Container/Queue");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventCSharpBridge_1 = require("../../Common/Event/EventCSharpBridge");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const BlackScreenController_1 = require("../../Module/BlackScreen/BlackScreenController");
const UiBehaviourHomeBtn_1 = require("../../Module/UiComponent/UiHomeButton/UiBehaviourHomeBtn");
const UiSceneManager_1 = require("../../Module/UiComponent/UiSceneManager");
const UiNavigationNewController_1 = require("../../Module/UiNavigation/New/UiNavigationNewController");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
const UiLayerType_1 = require("../Define/UiLayerType");
const InputDistributeController_1 = require("../InputDistribute/InputDistributeController");
const UiLayer_1 = require("../UiLayer");
const UiManager_1 = require("../UiManager");
const UiBehaviorAudio_1 = require("./UiAudioState/UiBehaviorAudio");
const UiBehaviorUiBlur_1 = require("./UiBlur/UiBehaviorUiBlur");
const UiPanelBase_1 = require("./UiPanelBase");
const UiViewSequence_1 = require("./UiViewSequence");
class UiViewBase extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.Info = undefined;
    this.ChildPopView = undefined;
    this.UiViewSequence = undefined;
    this.UiBlurBehaviour = undefined;
    this.UiBehaviourHomeBtn = undefined;
    this.AudioEvent = undefined;
    this.Hur = true;
    this.LastHide = false;
    this.PlayEventResult = new AudioController_1.PlayResult();
    this.jur = false;
    this.IsPreOpening = false;
    this.Wur = undefined;
    this.IsExistInLeaveLevel = false;
    this.OpenPromise = undefined;
    this.ClosePromise = undefined;
    this.ShowPromise = undefined;
    this.HidePromise = undefined;
    this.LoadScenePromise = undefined;
    this.IsDestroyByClear = false;
    this.Kur = false;
    this.MaskTag = "";
    this.Qur = (e, i) => {
      if (i === 0) {
        this.Kur = true;
        if (this.UiViewSequence.HasSequenceNameInPlaying(this.UiViewSequence.StartSequenceName)) {
          this.UiViewSequence.StopSequenceByKey(this.UiViewSequence.StartSequenceName, true, true);
        }
        InputDistributeController_1.InputDistributeController.UnBindActions(this.Info.SkipAnimActions, this.Qur);
      }
    };
    this.gWt = new Queue_1.Queue();
    this.SkipLoadScene = false;
    this.SkipReleaseScene = false;
    this.SceneLoaded = false;
    this.SkipRemoveBlackScreen = false;
    this.Info = e;
    this.MaskTag = e.Name + this.ComponentId;
  }
  get IsQueueView() {
    return this.Info !== undefined && this.Info.SortIndex >= 0;
  }
  GetClosePromiseImplement() {
    return this.ClosePromise;
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  async OnPlayingStartSequenceAsync() {}
  OnAfterPlayStartSequence() {}
  OnBeforePlayCloseSequence() {}
  async OnPlayingCloseSequenceAsync() {}
  OnCheckIfNeedScene() {
    return true;
  }
  OnHandleLoadScene() {}
  async HandlePostLoadSceneAsync(e) {
    await this.OnHandlePostLoadSceneAsync(e);
  }
  async OnHandlePostLoadSceneAsync(e) {}
  OnHandleReleaseScene() {}
  async HandlePreReleaseSceneAsync(e) {
    await this.OnHandlePreReleaseSceneAsync(e);
  }
  async OnHandlePreReleaseSceneAsync(e) {}
  CloseMe(i) {
    this.CloseMeAsync().then(() => {
      i?.(true);
    }, e => {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("UiCore", 16, "[CloseMe]流程执行异常", e, ["error", e.message], ["ViewName", this.Info.Name]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 16, "[CloseMe]流程执行异常", ["ViewName", this.Info.Name], ["error", e]);
      }
      i?.(false);
    });
  }
  async CloseMeAsync() {
    return UiManager_1.UiManager.CloseViewImplementAsync(this);
  }
  GetViewId() {
    return this.ComponentId;
  }
  PlaySequence(e, i = undefined, t = false) {
    this.PlaySequenceAsync(e, t).then(i);
  }
  async PlaySequenceAsync(e, i = false, t = false, s = undefined) {
    var n = new CustomPromise_1.CustomPromise();
    await this.UiViewSequence.PlaySequenceAsync(e, n, i, t, s);
  }
  SetAudioEvent(e) {
    this.AudioEvent = e;
  }
  RegisterUiBehavior() {
    this.Xur();
    this.$ur();
    this.Yur();
    this.sjd();
  }
  Jur(e, i = undefined) {
    this.PlaySequence(e, i, (this.Info.Type & UiLayerType_1.BLOCKCLICK_TYPE) > 0);
  }
  async zur(e) {
    await this.PlaySequenceAsync(e, (this.Info.Type & UiLayerType_1.BLOCKCLICK_TYPE) > 0);
  }
  PauseCurrentSequence() {
    this.UiViewSequence?.PauseSequence();
  }
  ResumeCurrentSequence() {
    this.UiViewSequence?.ResumeSequence();
  }
  Xur() {
    this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.UiViewSequence.SetSequenceName(this.OpenParam);
    this.AddUiBehavior(this.UiViewSequence);
  }
  $ur() {
    var e = new UiBehaviorUiBlur_1.UiBehaviourUiBlur();
    (this.UiBlurBehaviour = e).SetCurrentLayer(this.Info.Type);
    e.SetViewInfo(this);
    this.AddUiBehavior(e);
  }
  Yur() {
    var e = new UiBehaviorAudio_1.UiBehaviorAudio(this);
    this.AddUiBehavior(e);
  }
  sjd() {
    var e = new UiBehaviourHomeBtn_1.UiBehaviourHomeBtn();
    (this.UiBehaviourHomeBtn = e).SetViewInfo(this);
    this.AddUiBehavior(e);
  }
  GetUiAudioComponent() {
    return (this.ChildPopView ? this.ChildPopView.GetPopViewRootActor() : this.RootActor).GetComponentByClass(UE.UIViewAudioEffectComponent.StaticClass());
  }
  GetLoopAudioEventSwitch() {
    return true;
  }
  Zur() {
    var e;
    var i;
    if (this.IsPreOpening) {
      return UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pool);
    } else if ((e = this.GetLayer()) === UiLayerType_1.ELayerType.Float) {
      if ((i = ConfigManager_1.ConfigManager.UiViewConfig.GetUiFloatConfig(this.Info.Name)).OnlyShowInMain) {
        return UiLayer_1.UiLayer.GetFloatUnit(UiLayerType_1.ELayerType.BattleFloat, i.RootItemIndex);
      } else {
        return UiLayer_1.UiLayer.GetFloatUnit(UiLayerType_1.ELayerType.Float, i.RootItemIndex);
      }
    } else {
      return UiLayer_1.UiLayer.GetLayerRootUiItem(e);
    }
  }
  InitRootActorLoadInfo() {
    var e = this.Info;
    this.SetRootActorLoadInfoByPath(e.UiPath, this.Zur(), e.SourceType === 1, e.IsPermanent);
  }
  OnBeforeCreateImplementImplement() {}
  OnBeforeCreateImplement() {
    this.RegisterUiBehavior();
    this.OnBeforeCreateImplementImplement();
  }
  OnAfterCreateImplement() {
    if (this.IsExistInLeaveLevel || UiManager_1.UiManager.IsLockOpen) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 10, "场景切换过程中, 设置无缝加载标记");
      }
      this.tcr();
    }
  }
  tcr() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 16, "SetViewPermanent", ["ViewName", this.Info.Name]);
    }
    LguiUtil_1.LguiUtil.SetActorIsPermanent(this.GetOriginalActor(), true, true);
    if (this.ChildPopView) {
      this.ChildPopView?.SetViewPermanent();
    }
  }
  async OnCreateAsyncImplementImplement() {}
  OnStartImplementImplement() {}
  OnStartImplement() {
    this.SetAudioEvent(this.Info.AudioEvent);
    this.jur = UE.LGUIBPLibrary.GetWorldUISceneRendering(this.GetRootActor());
    this.Hur = true;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnViewLoadCompleted, this.Info.Name);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnViewDone, this.Info.Name, this);
    this.UiViewSequence.AddSequenceStartEvent(this.UiViewSequence.StartSequenceName, () => {
      this.Kur = false;
      TimerSystem_1.GameplayTimerSystem.Next(() => {
        InputDistributeController_1.InputDistributeController.BindActions(this.Info.SkipAnimActions, this.Qur);
      });
    });
    this.UiViewSequence.AddSequenceFinishEvent(this.UiViewSequence.StartSequenceName, () => {
      InputDistributeController_1.InputDistributeController.UnBindActions(this.Info.SkipAnimActions, this.Qur);
    });
    this.OnStartImplementImplement();
  }
  OnBeforeShowImplementImplement() {}
  async OnBeforeShowAsyncImplement() {
    await Promise.all([this.l5d(), this.LoadScene()]);
    this.LoadScenePromise?.SetResult(undefined);
    if (this.SceneLoaded && !this.SkipRemoveBlackScreen) {
      BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", this.Info.Name);
    }
  }
  async OnBeforeShowAsyncImplementImplement() {}
  async l5d() {
    await this.OnBeforeShowAsyncImplementImplement();
    this.AfterOnBeforeShowAsyncImplementImplement();
  }
  OnBeforeShowImplement() {
    this.OnAddEventListener();
    this.OnBeforeShowImplementImplement();
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.ApplyPerformanceLimit(this.Info.Name);
  }
  async OnShowAsyncImplementImplement() {
    if (this.Hur) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 16, "播放界面动画Start(开始)", ["ViewName", this.Info.Name], ["SequenceName", this.UiViewSequence.StartSequenceName]);
      }
      if (!!this.Info.IsPermanent || !this.IsExistInLeaveLevel) {
        await Promise.all([this.zur(this.UiViewSequence.StartSequenceName), this.OnPlayingStartSequenceAsync(), this.y8d()]);
        this.AfterOnPlayingStartSequenceAsync();
      }
      this.OnAfterPlayStartSequence();
      this.UiViewSequence?.PlaySequencePurely("AutoLoop");
      this.Hur = false;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 16, "播放界面动画Show(开始)", ["ViewName", this.Info.Name], ["SequenceName", this.UiViewSequence.ShowSequenceName]);
      }
      await this.zur(this.UiViewSequence.ShowSequenceName);
    }
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.ApplyPerformanceSeqLimit(this.Info.Name);
    if (this.Info.IsFullScreen) {
      UE.LGUIBPLibrary.SetIsFullScreenUIRendering(this.GetRootActor(), true);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 16, "播放界面动画(结束)", ["ViewName", this.Info.Name]);
    }
  }
  TryEmitInterruptOpExitView() {
    if (this.Kur) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 37, "跳过界面动画Start流程,关闭界面", ["ViewName", this.Info.Name]);
      }
      UiNavigationNewController_1.UiNavigationNewController.HotKeyCloseView();
      this.Kur = false;
    }
  }
  OnShowAsyncImplementImplementCompatible() {
    this.LoadScene();
    if (this.Hur) {
      this.Jur(this.UiViewSequence.StartSequenceName);
      this.OnAfterPlayStartSequence();
      this.UiViewSequence?.PlaySequencePurely("AutoLoop");
      this.Hur = false;
    } else {
      this.Jur(this.UiViewSequence.ShowSequenceName);
    }
  }
  OnAfterShowImplement() {
    this.OpenPromise?.SetResult(true);
    this.ShowPromise?.SetResult(undefined);
    this.HandleAllLoadingFinishOperation();
  }
  OnFinishShowImplementImplement() {
    this.OnFinishShowImplementImplementImplement();
  }
  OnFinishShowImplementImplementImplement() {}
  HandleCacheShowActionFailIfIsPair() {
    if (this.Hur) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 10, "界面在首次打开时已经执行了Hide逻辑,Show逻辑不生效", ["ViewName", this.Info.Name], ["ComponentId", this.ComponentId]);
      }
      this.OpenPromise?.SetResult(true);
    }
  }
  async OnHideAsyncImplementImplement() {
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelPerformanceSeqLimit(this.Info.Name);
    if (this.Info.IsFullScreen) {
      UE.LGUIBPLibrary.SetIsFullScreenUIRendering(this.GetRootActor(), this.jur);
    }
    if (!this.WaitToDestroy) {
      if (this.LastHide) {
        this.LastHide = false;
        this.OnBeforePlayCloseSequence();
        await Promise.all([this.icr(), this.OnPlayingCloseSequenceAsync(), this.S8d()]);
        this.AfterOnPlayingCloseSequenceAsync();
      } else {
        await this.zur(this.UiViewSequence.HideSequenceName);
      }
    }
    await this.ReleaseScene();
  }
  OnHideAsyncImplementImplementCompatible() {
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelPerformanceSeqLimit(this.Info.Name);
    if (this.Info.IsFullScreen) {
      UE.LGUIBPLibrary.SetIsFullScreenUIRendering(this.GetRootActor(), this.jur);
    }
    if (this.LastHide) {
      this.LastHide = false;
      this.OnBeforePlayCloseSequence();
      this.Jur(this.UiViewSequence.CloseSequenceName);
    } else {
      this.Jur(this.UiViewSequence.HideSequenceName);
    }
    this.ReleaseScene();
  }
  OnAfterHideImplementImplement() {}
  OnAfterHideImplement() {
    this.OnAfterHideImplementImplement();
    this.OnRemoveEventListener();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnViewHidden, this.Info.Name);
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelPerformanceLimit(this.Info.Name);
    this.HidePromise?.SetResult(undefined);
  }
  async OnDestroyAsyncImplementImplement() {
    this.ChildPopView = undefined;
    this.ResetOperationQueue();
    UiManager_1.UiManager.RemoveView(this.GetViewId());
    return Promise.resolve();
  }
  OnDestroyAsyncImplementImplementCompatible() {
    this.ChildPopView = undefined;
    this.ResetOperationQueue();
    UiManager_1.UiManager.RemoveView(this.GetViewId());
  }
  OnAfterDestroyImplement() {
    this.ClosePromise?.SetResult(undefined);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CloseView, this.Info.Name, this.GetViewId());
    if (this.Info.NeedGc) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 37, "执行Force GC", ["ViewName", this.Info.Name]);
      }
      ControllerHolder_1.ControllerHolder.WorldController.ManuallyGarbageCollection(0);
      ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
    }
  }
  AddChildViewById(e) {
    this.AddChild(UiManager_1.UiManager.GetView(e));
  }
  async icr() {
    var e = this.UiViewSequence.CloseSequenceName;
    if (e) {
      await this.zur(e);
    }
  }
  DeleteCloseSequence() {
    this.UiViewSequence.CloseSequenceName = undefined;
  }
  GetLayer() {
    return this.OnGetLayer();
  }
  OnGetLayer() {
    return this.Info.Type;
  }
  GetTimeDilation() {
    return this.OnGetTimeDilation();
  }
  OnGetTimeDilation() {
    return this.Info.TimeDilation;
  }
  SetLoadingFinishOperation(e) {
    this.gWt.Push(e);
  }
  HandleAllLoadingFinishOperation() {
    while (this.gWt.Size > 0) {
      this.gWt.Pop()?.();
    }
  }
  ResetOperationQueue() {
    this.gWt.Clear();
  }
  GetCsRootItem() {
    var e;
    var i;
    if (this.IsCsViewProxy) {
      e = (this.Info?.Name ?? "") + "CSRootItem";
      i = (0, puerts_1.$ref)(undefined);
      if (UE.KuroVariableFunctionLibrary.GetObject(e, i)) {
        return (0, puerts_1.$unref)(i);
      } else {
        return undefined;
      }
    }
  }
  WillLoadScene() {
    return !this.SkipLoadScene && !StringUtils_1.StringUtils.IsEmpty(this.Info.ScenePath) && this.OnCheckIfNeedScene() && UiSceneManager_1.UiSceneManager.CurUiSceneName !== this.Info.ScenePath;
  }
  WillReleaseScene() {
    return !this.SkipReleaseScene && this.SceneLoaded;
  }
  async LoadScene() {
    if (this.WillLoadScene()) {
      this.SceneLoaded = true;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 16, "开始加载UI场景", ["ViewName", this.Info.Name], ["ScenePath", this.Info.ScenePath]);
      }
      await UiSceneManager_1.UiSceneManager.LoadScene(this.Info.ScenePath, () => {
        this.OnHandleLoadScene();
      });
      await this.HandlePostLoadSceneAsync(true);
    } else {
      this.SkipLoadScene = false;
      await this.HandlePostLoadSceneAsync(false);
    }
  }
  async ReleaseScene() {
    if (this.WillReleaseScene()) {
      this.SceneLoaded = false;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 16, "开始释放UI场景", ["ViewName", this.Info.Name], ["ScenePath", this.Info.ScenePath]);
      }
      await this.HandlePreReleaseSceneAsync(true);
      await UiSceneManager_1.UiSceneManager.ExitScene();
      this.OnHandleReleaseScene();
    } else {
      await this.HandlePreReleaseSceneAsync(false);
      this.SkipReleaseScene = false;
    }
  }
  OnPreOpen() {
    this.IsPreOpening = true;
    this.Wur = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiCore", 16, "[PreOpeningTimerId] 预打开界面超时未调用打开, 自动销毁界面", ["ViewName", this.Info.Name]);
      }
      this.Destroy();
      UiManager_1.UiManager.RemovePreOpenView(this.GetViewId());
      this.Wur = undefined;
    }, 60000);
  }
  OnOpenAfterPreOpened() {
    this.IsPreOpening = false;
    if (TimerSystem_1.GameplayTimerSystem.Has(this.Wur)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.Wur);
    }
    this.Wur = undefined;
    this.GetOriginalItem()?.SetUIParent(this.Zur());
  }
  SetParentUiItem(e) {
    if (this.ParentUiItem !== e && (this.ParentUiItem = e, e = this.GetRootItem())) {
      e.SetUIParent(this.ParentUiItem);
    }
  }
  async ClearAsync() {
    this.IsDestroyByClear = true;
    await this.OpenPromise?.Promise;
    this.Destroy(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 10, "[Clear] 完成销毁的界面", ["Name", this.constructor.name], ["ComponentId", this.ComponentId]);
      }
    });
  }
  AfterOnCreate() {
    super.AfterOnCreate();
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsNotifyCsViewOnCreateAsync, this.Info.Name, this.GetViewId());
  }
  AfterOnBeforeStart() {
    super.AfterOnBeforeStart();
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsNotifyCsBeforeStartAsync, this.Info.Name, this.GetViewId());
  }
  AfterOnBeforeHide() {
    super.AfterOnBeforeHide();
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsNotifyCsOnBeforeHideAsync, this.Info.Name, this.GetViewId());
  }
  AfterOnPlayingStartSequenceAsync() {
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsNotifyCsOnPlayingStartSequenceAsync, this.Info.Name, this.GetViewId());
  }
  AfterOnPlayingCloseSequenceAsync() {
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsNotifyCsOnPlayingCloseSequenceAsync, this.Info.Name, this.GetViewId());
  }
  AfterOnBeforeShowAsyncImplementImplement() {
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsNotifyCsOnBeforeShowAsyncImplementImplement, this.Info.Name, this.GetViewId());
  }
  l$d() {
    this.CsUiLife.OnPlayingStartSequenceAsyncPromise ||= new CustomPromise_1.CustomPromise();
  }
  async y8d() {
    if (this.IsCsViewProxy) {
      this.l$d();
      await this.CsUiLife.OnPlayingStartSequenceAsyncPromise.Promise;
      this.CsUiLife.OnPlayingStartSequenceAsyncPromise = undefined;
    }
  }
  _$d() {
    this.CsUiLife.OnPlayingCloseSequenceAsyncPromise ||= new CustomPromise_1.CustomPromise();
  }
  async S8d() {
    if (this.IsCsViewProxy) {
      this._$d();
      await this.CsUiLife.OnPlayingCloseSequenceAsyncPromise.Promise;
      this.CsUiLife.OnPlayingCloseSequenceAsyncPromise = undefined;
    }
  }
}
exports.UiViewBase = UiViewBase;
//# sourceMappingURL=UiViewBase.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkItemView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const WorldMapDefine_1 = require("../../../WorldMap/WorldMapDefine");
const MarkSpritePool_1 = require("../../Container/MarkSpritePool");
const MapDefine_1 = require("../../MapDefine");
const MarkItemChildIconHandle_1 = require("./Handles/MarkItemChildIconHandle");
const MarkItemGravityReverseIconHandle_1 = require("./Handles/MarkItemGravityReverseIconHandle");
const MarkItemNameHandle_1 = require("./Handles/MarkItemNameHandle");
const MarkItemOutOfBoundHandle_1 = require("./Handles/MarkItemOutOfBoundHandle");
const MarkItemRangeHandle_1 = require("./Handles/MarkItemRangeHandle");
const MarkItemSelectHandle_1 = require("./Handles/MarkItemSelectHandle");
const MarkItemTopRightIconHandle_1 = require("./Handles/MarkItemTopRightIconHandle");
const MarkItemTrackHandle_1 = require("./Handles/MarkItemTrackHandle");
const MarkItemVerticlePointerHandle_1 = require("./Handles/MarkItemVerticlePointerHandle");
const MarkPanelBase_1 = require("./MarkPanelBase");
const SCALE_TWEEN_DURATION = 0.2;
class MarkItemView extends MarkPanelBase_1.MarkPanelBase {
  constructor(e) {
    super();
    this.Holder = undefined;
    this.u1a = false;
    this.c1a = 0;
    this.GOe = undefined;
    this.IsShowIcon = true;
    this.pRi = new UE.Vector();
    this.LevelSequencePlayer = undefined;
    this.AttachParentSocketTransform = undefined;
    this.yRi = false;
    this.MarkComponentContext = undefined;
    this.MarkItemComponentHandleMap = new Map();
    this.zSd = false;
    this.OnLevelSequenceStart = e => {
      this.Holder.OnLevelSequenceStart(e);
    };
    this.OnLevelSequenceStop = e => {
      this.Holder.OnLevelSequenceStop(e);
      if (e === "HideView") {
        e = this.Holder.MarkItemEntity.ViewLifeCircle.IsChildViewVisible(0);
        this.SetUiActive(e);
        this.GetItem(0)?.SetAlpha(1);
      }
    };
    this.kOe = () => {
      var e;
      var t;
      var i;
      if (this.Holder === undefined) {
        this.jm();
      } else {
        t = CommonParamById_1.configCommonParamById.GetFloatConfig("MapMarkSelectedAdditionScale");
        t = this.Holder.MarkScale + t;
        if (this.m1a()) {
          e = (Time_1.Time.NowSeconds - this.c1a) / SCALE_TWEEN_DURATION;
          i = this.u1a ? this.Holder.MarkScale : t;
          t = this.u1a ? t : this.Holder.MarkScale;
          i = MathUtils_1.MathUtils.Lerp(i, t, e);
          this.SetScale(i);
        } else {
          this.jm();
          this.d1a(this.u1a);
        }
      }
    };
    this.Holder = e;
  }
  get MarkItemTopRightIconHandle() {
    return this.MarkItemComponentHandleMap.get(1);
  }
  get MarkItemRangeHandle() {
    return this.MarkItemComponentHandleMap.get(2);
  }
  get MarkItemNameHandle() {
    return this.MarkItemComponentHandleMap.get(3);
  }
  get MarkItemOutOfBoundHandle() {
    return this.MarkItemComponentHandleMap.get(4);
  }
  get MarkItemSelectHandle() {
    return this.MarkItemComponentHandleMap.get(5);
  }
  get MarkItemTrackHandle() {
    return this.MarkItemComponentHandleMap.get(6);
  }
  get MarkItemChildIconHandle() {
    return this.MarkItemComponentHandleMap.get(7);
  }
  get MarkItemVerticalPointerHandle() {
    return this.MarkItemComponentHandleMap.get(8);
  }
  get MarkItemGravityReverseIconHandle() {
    return this.MarkItemComponentHandleMap.get(9);
  }
  get IsSelected() {
    return this.Holder.MarkItemEntity.ViewLifeCircle.IsSelected;
  }
  set IsSelected(e) {
    if (this.Holder.MarkItemEntity.ViewLifeCircle.IsSelectedDirty) {
      this.OnSelectedStateChange(e);
    }
  }
  get ViewInitialized() {
    return this.zSd;
  }
  async InitializeMarkItemViewAsync() {
    this.LoadingPromiseInner = this.CreateThenShowByPoolResourceIdAsync(WorldMapDefine_1.MARK_ITEM_VIEW_PATH, this.Holder.ViewRoot);
    await this.LoadingPromiseInner;
    this.LoadingPromiseInner = undefined;
    this.bRi();
  }
  OnSelectedStateChange(e) {}
  OnInitialize() {
    this.OnIconPathChanged(this.Holder.IconPath);
  }
  RegisterEvents() {}
  UnRegisterEvents() {}
  async InitializeMarkItemViewNewAsync() {
    this.LoadingPromiseInner = this.CreateThenShowByPoolResourceIdAsync(WorldMapDefine_1.MARK_ITEM_VIEW_PATH, this.Holder.ViewRoot);
    await this.LoadingPromiseInner;
    this.LoadingPromiseInner = undefined;
  }
  InitializeData(e) {
    this.Holder = e;
    this.OnDataInitialized(this.Holder);
  }
  InitializeView() {
    if (!this.zSd) {
      this.zSd = true;
      this.GetSprite(2).SetUIActive(false);
      this.GetSprite(1).SetUIActive(false);
      this.RefreshActorLabel();
      this.RefreshParentSocketTransform();
      this.RefreshLevelSequencePlayer();
      this.Xd();
      this.ZWd();
      this.ApplyRootAnchorOffset();
      this.OnViewInitialize();
    }
  }
  RefreshView() {
    this.IsShowIcon = true;
    this.RefreshActorLabel();
    this.ApplyRootAnchorOffset();
    this.GetItem(0)?.SetAlpha(1);
    this.MarkComponentContext.MarkItemEntity = this.Holder.MarkItemEntity;
    this.MarkComponentContext.MarkItem = this.Holder;
    this.MarkComponentContext.MarkParentItem = this.RootItem.GetParentAsUIItem();
    this.MarkComponentContext.MarkRootItem = this.RootItem;
    this.Xd();
    this.xW_();
    this.OnViewRefresh();
    this.RegisterEvents();
  }
  RecycleView(e) {
    this.UnRegisterEvents();
    this.OnViewRecycle();
    if (e) {
      this.RecycleToPool();
    } else {
      this.SetVisible(false);
      MarkSpritePool_1.MarkSpritePool.UnRef(this.ComponentId);
      this.OnRecycle();
    }
  }
  RecycleToPool() {
    if (MapDefine_1.newLifeCycleMarkTypeRecord.get(this.Holder.MarkType)) {
      this.DestroyView();
    }
    super.RecycleToPool();
  }
  DestroyView() {
    this.En_();
    this.LevelSequencePlayer?.Clear();
    this.LevelSequencePlayer = undefined;
    this.LoadingPromiseInner = undefined;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMarkItemViewDestroy, this);
    this.ClearData();
  }
  ClearData() {
    this.AttachParentSocketTransform = undefined;
    this.Holder = undefined;
  }
  OnDataInitialized(e) {}
  OnViewInitialize() {}
  OnViewRefresh() {}
  OnViewRecycle() {}
  GetIconItem() {
    return this.GetSprite(1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UISprite]];
  }
  OnStart() {
    if (MapDefine_1.newLifeCycleMarkTypeRecord.get(this.Holder.MarkType)) {
      this.CreateComponentHandles();
    } else {
      this.GetSprite(2).SetUIActive(false);
      this.GetSprite(1).SetUIActive(false);
      this.RefreshActorLabel();
      this.RefreshParentSocketTransform();
      this.RefreshLevelSequencePlayer();
      this.Xd();
      this.CreateAndInitComponentHandles();
      this.ApplyRootAnchorOffset();
      this.OnInitialize();
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMarkItemViewCreate, this);
  }
  OnAfterHide() {
    this.jm();
  }
  OnBeforeDestroy() {
    this.En_();
    this.LevelSequencePlayer?.Clear();
    this.LevelSequencePlayer = undefined;
    this.LoadingPromiseInner = undefined;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMarkItemViewDestroy, this);
    this.AttachParentSocketTransform = undefined;
    this.Holder = undefined;
  }
  RefreshActorLabel() {
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      this.RootActor.SetActorLabel(`MarkId:${this.Holder.MarkId},MarkType:${this.Holder.MarkType},MapType:${this.Holder.MapType},ComponentId:${this.ComponentId}`);
    }
  }
  RefreshParentSocketTransform() {
    var e = this.RootItem.GetAttachSocketName();
    var t = this.RootItem.GetAttachParent();
    this.AttachParentSocketTransform = t.D_GetSocketTransform(e);
  }
  RefreshLevelSequencePlayer() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.LevelSequencePlayer.BindSequenceStartEvent(this.OnLevelSequenceStart);
    this.LevelSequencePlayer.BindSequenceCloseEvent(this.OnLevelSequenceStop);
  }
  SetScale(e) {
    var t;
    var i;
    if (this.IsHolderValid()) {
      t = 1 / ((i = this.Holder.MapType === 1) ? 1 : ModelManager_1.ModelManager.WorldMapModel.MapScale);
      i = i ? this.AttachParentSocketTransform.GetScale3D() : Vector_1.Vector.OneVectorProxy;
      this.pRi.Set(e * t / i.X, e * t / i.Y, e * t / i.Z);
      this.RootItem.SetUIRelativeScale3D(this.pRi);
    }
  }
  IsHolderValid() {
    return this.Holder !== undefined && this.AttachParentSocketTransform !== undefined;
  }
  get IsViewReady() {
    return !this.IsCreating && !this.IsDestroyOrDestroying && !this.IsHideOrHiding;
  }
  OnUpdate(e, t = false, i = false) {
    var s;
    if (this.Holder === undefined || this.IsRegister) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Map", 63, "Holder is undefined", ["IsDestroyOrDestroying", this.IsDestroyOrDestroying], ["IsRegister", this.IsRegister], ["isCreating", this.IsCreating]);
      }
    } else {
      this.yRi = i;
      this.bRi();
      if (s = this.Holder.IsCanShowView) {
        if (s && !this.RootItem?.bIsUIActive) {
          this.SetUiActive(true);
        }
        if (this.Holder.MapType === 2) {
          this.d1a(this.IsSelected);
        }
        if (this.MarkComponentContext !== undefined && !(this.gth(e, t), this.OnSafeUpdate(e, t, i), this.OnLateUpdate(), s) && !this.Holder.NeedPlayShowOrHideSeq) {
          this.SetUiActive(false);
        }
      }
    }
  }
  ApplyOutOfBoundActive() {
    this.MarkItemOutOfBoundHandle?.ApplyModified();
  }
  gth(e, t = false) {
    this.MarkItemTrackHandle?.SetVisible(this.Holder.IsTracked && !t);
    this.MarkItemSelectHandle?.SetVisible(this.IsSelected);
    this.MarkItemVerticalPointerHandle?.UpdateVerticalPointerType(this.Holder.WorldPosition, e);
    this.wh_();
  }
  OnSafeUpdate(e, t = 0, i) {}
  OnLateUpdate() {
    this.gfc();
    this.Uh_();
  }
  bRi() {
    if (this.Holder === undefined) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Map", 63, "Holder is undefined", ["ComponentState", this.IsDestroyOrDestroying], ["isCreating", this.IsCreating]);
      }
    } else {
      if (this.yRi) {
        if (this.Holder.NeedPlayShowOrHideSeq) {
          switch (this.Holder.NeedPlayShowOrHideSeq) {
            case "ShowView":
              this.PlayInShowScaleRangeSequence();
              break;
            case "HideView":
              this.PlayOutShowScaleRangeSequence();
          }
          this.Holder.NeedPlayShowOrHideSeq = undefined;
        }
      } else {
        this.Holder.NeedPlayShowOrHideSeq = undefined;
        this.Holder.OnLevelSequenceStop("HideView");
      }
      this.yRi = false;
    }
  }
  OnStartTrack() {}
  OnEndTrack() {}
  xW_() {
    this.OnIconPathChanged(this.Holder.IconPath);
    this.gfc();
  }
  gfc() {
    var e;
    var t;
    if (this.Holder.MarkItemEntity.ViewLifeCircle.IsChildViewStateDirty(9)) {
      e = this.GetSprite(1);
      t = this.Holder.MarkItemEntity.GamePlay.InGravityLayer;
      e.SetAlpha(t ? 1 : 0.4);
    }
  }
  OnIconPathChanged(e) {
    var t = this.GetSprite(1);
    this.LoadIcon(t, e);
  }
  LoadIcon(e, t) {
    if (e) {
      if (StringUtils_1.StringUtils.IsEmpty(t)) {
        e.SetUIActive(false);
      } else {
        this.SetSpriteByPath(t, e, false, undefined, () => {
          if (e.IsValid()) {
            e.SetUIActive(this.IsShowIcon);
          }
        });
      }
    }
  }
  GetInteractiveFlag() {
    return this.Holder?.IsCanShowView ?? false;
  }
  PlayInShowScaleRangeSequence() {
    this.LevelSequencePlayer.StopCurrentSequence();
    this.LevelSequencePlayer.PlayLevelSequenceByName("ShowView");
  }
  PlayOutShowScaleRangeSequence() {
    this.LevelSequencePlayer.StopCurrentSequence();
    this.LevelSequencePlayer.PlayLevelSequenceByName("HideView");
  }
  async PlayUnlockSequence() {}
  d1a(e) {
    var t;
    if (this.u1a === e) {
      if (this.m1a()) {
        return undefined;
      } else {
        t = CommonParamById_1.configCommonParamById.GetFloatConfig("MapMarkSelectedAdditionScale");
        t = this.u1a ? t : 0;
        t = this.Holder.MarkScale + t;
        this.SetScale(t);
        return;
      }
    }
    this.u1a = e;
    this.c1a = Time_1.Time.NowSeconds;
    this.jm();
    this.GOe = TimerSystem_1.GameplayTimerSystem.Forever(this.kOe, 50);
  }
  m1a() {
    return this.c1a > 0 && this.c1a + SCALE_TWEEN_DURATION >= Time_1.Time.NowSeconds;
  }
  jm() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.GOe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.GOe);
      this.GOe = undefined;
    }
  }
  Reset() {
    this.IsShowIcon = true;
    this.RefreshActorLabel();
    this.ApplyRootAnchorOffset();
    this.GetItem(0)?.SetAlpha(1);
    this.MarkComponentContext.MarkItemEntity = this.Holder.MarkItemEntity;
    this.MarkComponentContext.MarkItem = this.Holder;
    this.MarkComponentContext.MarkParentItem = this.RootItem.GetParentAsUIItem();
    this.MarkComponentContext.MarkRootItem = this.RootItem;
    this.Xd();
    this.xW_();
    this.OnReset();
  }
  OnReset() {}
  OnRecycle() {
    this.Xpc();
    this.LevelSequencePlayer.StopCurrentSequence();
    MarkSpritePool_1.MarkSpritePool.UnRef(this.ComponentId);
    this.jm();
  }
  ApplyRootAnchorOffset() {
    this.RootItem.SetAnchorOffset(Vector2D_1.Vector2D.Create(this.Holder.InitUiPosition.X, this.Holder.InitUiPosition.Y).ToUeVector2D(true));
  }
  Xd() {
    this.SetScale(this.Holder.MarkScale);
    var e = new UE.Vector(this.Holder.ConfigScale);
    this.GetSprite(1).SetUIItemScale(e);
    this.GetSprite(4).SetUIItemScale(this.Holder.CornerScaleVector);
  }
  CreateAndInitComponentHandles() {
    this.CreateComponentHandles();
    this.ZWd();
  }
  ZWd() {
    for (const e of this.MarkItemComponentHandleMap.values()) {
      e.Init();
    }
  }
  CreateComponentHandles() {
    this.MarkComponentContext = {
      MarkItemEntity: this.Holder.MarkItemEntity,
      TopRightIconSprite: this.GetSprite(4),
      SetSpriteByPathAction: (e, t, i, s = undefined, h = undefined) => {
        this.SetSpriteByPath(e, t, i, s, h);
      },
      MarkComponentContainer: this.GetItem(0),
      MarkParentItem: this.RootItem.GetParentAsUIItem(),
      MarkRootItem: this.RootItem,
      MarkItem: this.Holder
    };
    this.MarkItemComponentHandleMap.set(1, this.CreateTopRightHandle(this.MarkComponentContext));
    this.MarkItemComponentHandleMap.set(2, this.CreateRangeHandle(this.MarkComponentContext));
    this.MarkItemComponentHandleMap.set(3, this.CreateNameHandle(this.MarkComponentContext));
    this.MarkItemComponentHandleMap.set(4, this.CreateOutOfBoundHandle(this.MarkComponentContext));
    this.MarkItemComponentHandleMap.set(5, this.CreateSelectHandle(this.MarkComponentContext));
    this.MarkItemComponentHandleMap.set(6, this.CreateTrackHandle(this.MarkComponentContext));
    this.MarkItemComponentHandleMap.set(7, this.CreateChildIconHandle(this.MarkComponentContext));
    this.MarkItemComponentHandleMap.set(8, this.CreateVerticalPointerHandle(this.MarkComponentContext));
    this.MarkItemComponentHandleMap.set(9, this.CreateGravityReverseIconHandle(this.MarkComponentContext));
  }
  wh_() {
    for (const e of this.MarkItemComponentHandleMap.values()) {
      e.Update();
    }
  }
  Uh_() {
    for (const e of this.MarkItemComponentHandleMap.values()) {
      e.ApplyModified();
    }
  }
  Xpc() {
    for (const e of this.MarkItemComponentHandleMap.values()) {
      e.SetVisible(false);
      e.ApplyModified();
    }
  }
  En_() {
    for (const e of this.MarkItemComponentHandleMap.values()) {
      e.Dispose();
    }
    this.MarkItemComponentHandleMap.clear();
  }
  CreateTopRightHandle(e) {
    return new MarkItemTopRightIconHandle_1.MarkItemTopRightIconHandle(e);
  }
  CreateRangeHandle(e) {
    return new MarkItemRangeHandle_1.MarkItemRangeHandle(e);
  }
  CreateNameHandle(e) {
    return new MarkItemNameHandle_1.MarkItemNameHandle(e);
  }
  CreateOutOfBoundHandle(e) {
    return new MarkItemOutOfBoundHandle_1.MarkItemOutOfBoundHandle(e);
  }
  CreateSelectHandle(e) {
    return new MarkItemSelectHandle_1.MarkItemSelectHandle(e);
  }
  CreateTrackHandle(e) {
    return new MarkItemTrackHandle_1.MarkItemTrackHandle(e);
  }
  CreateChildIconHandle(e) {
    return new MarkItemChildIconHandle_1.MarkItemChildIconHandle(e);
  }
  CreateVerticalPointerHandle(e) {
    return new MarkItemVerticlePointerHandle_1.MarkItemVerticalPointerHandle(e);
  }
  CreateGravityReverseIconHandle(e) {
    return new MarkItemGravityReverseIconHandle_1.MarkItemGravityReverseIconHandle(e);
  }
}
exports.MarkItemView = MarkItemView;
//# sourceMappingURL=MarkItemView.js.map
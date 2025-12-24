"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueMapModule = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../Core/Common/Info");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Macro_1 = require("../../../../../Core/Preprocessor/Macro");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const BuildingMapMoveComponent_1 = require("../../../Activity/ActivityContent/MoonChasing/Main/Build/BuildingMapMoveComponent");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LongPressButton_1 = require("../../../Util/LongPressButton");
const MapRogueGrid_1 = require("./Grid/MapRogueGrid");
const MapRogueGridEvent_1 = require("./Grid/MapRogueGridEvent");
const MapRogueGridFog_1 = require("./Grid/MapRogueGridFog");
const MapRogueGridPath_1 = require("./Grid/MapRogueGridPath");
const MapRogueGridSelectBase_1 = require("./Grid/MapRogueGridSelectBase");
const MapRoguePanelRole_1 = require("./MapRoguePanelRole");
const X_BIAS = 110;
const Y_BIAS = -64;
const CENTER_Y_BIAS = 16;
const RANGE_X = 110;
const RANGE_Y = 62;
const [BG_MIN_SCALE, BG_MAX_SCALE] = [1, 1.3];
const VIEWPORT_PRIORITY_RATIO = 1.3;
const THOUSANDTH_RATIO = 1000;
const PROCESSING_CREATE_COUNT = 120;
const PROCESSING_INTERVAL = 100;
const CACHED_SELECT_PANEL_COUNT = 5;
const RESOURCE_FRONT_PATH = "/Game/Aki/UI/UIResources/UiRogue/Prefabs/RogueMap/PnlMapPieceFront.PnlMapPieceFront";
const RESOURCE_BACK_PATH = "/Game/Aki/UI/UIResources/UiRogue/Prefabs/RogueMap/PnlMapPieceBack.PnlMapPieceBack";
class MapRogueMapModule extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super();
    this.GameInfo = i;
    this.LevelSequencePlayer = undefined;
    this.MoveComponent = undefined;
    this.RolePanel = undefined;
    this.GridItemMap = new Map();
    this.GridEventItemMap = new Map();
    this.GridPathItemMap = new Map();
    this.GridFogItemMap = new Map();
    this.GridPosItemMap = new Map();
    this.GridFogPosItemMap = new Map();
    this.CachedPathItemList = [];
    this.PosTempVector = Vector2D_1.Vector2D.Create();
    this.MapTempPos = Vector2D_1.Vector2D.Create();
    this.MapTempScaleVector = Vector_1.Vector.Create();
    this.DE1 = CommonParamById_1.configCommonParamById.GetIntConfig("MapRogueClickOffsetTolerance") ?? 10;
    this.wk1 = ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().FocusTime / THOUSANDTH_RATIO;
    this.lqt = () => {
      this.KR1();
    };
    this.UiPoolActorHandle = [];
    this.CreatePendingList = [];
    this.a91 = 0;
    this.h91 = 0;
    this.l91 = false;
    this.BE1 = CommonParamById_1.configCommonParamById.GetIntConfig("MapRogueDoubleClickInterval");
    this.kE1 = undefined;
    this.OE1 = -1;
    this.qE1 = false;
    this.GE1 = false;
    this.FE1 = false;
    this.XTt = () => {};
    this.bMe = (i, t) => {
      if (this.NE1 && this.GameInfo.IsStageAvailable) {
        if (t === 0) {
          if (this.VE1) {
            if (this.GE1) {
              this.GameInfo.OnMove(this.OE1);
            }
            this.jE1();
          } else {
            this.jE1();
            this.OE1 = this.GameInfo.CurHoverIndex;
            this.qE1 = false;
            this.kE1 = TimerSystem_1.GameplayTimerSystem.Delay(() => {
              if (this.VE1) {
                if (this.qE1) {
                  this.SetMapGridBgState(this.OE1, true, true);
                }
                this.kE1 = undefined;
                this.OE1 = -1;
              }
            }, this.BE1);
          }
        } else {
          this.qE1 = true;
        }
      }
    };
    this.cFc = (i, t) => !this.VE1 && !this.HE1() && (this.GameInfo.CurHoverIndex !== t.GridIndex && this.GameInfo.HoverOnTarget(t.GridIndex), !i) && this.FE1;
    this.uFc = (i, t) => {
      this.MapTempPos.FromUeVector2D(this.MoveComponent.GetMapItem().GetAnchorOffset());
      this.MoveComponent.EmitPointerDown();
    };
    this.dFc = (i, t) => {
      this.GameInfo.OnCheck(t.GridIndex);
    };
    this.mFc = i => {
      this.SetSelectPanel(i);
      if (this.VE1) {
        this.jE1();
      }
      if (!this.MoveComponent.IsInDrag) {
        this.GameInfo.HoverOnTarget(i.GridIndex, !Info_1.Info.IsInTouch());
      }
    };
    this.fFc = i => {
      if (!Info_1.Info.IsInTouch()) {
        this.GameInfo.UnHoverOnTarget(i.GridIndex);
      }
    };
    this.y01 = () => {
      if (this.VE1) {
        this.jE1();
      }
      this.GameInfo.BlankPlaneEnter();
    };
    this.S01 = () => {
      this.MoveComponent.EmitPointerDown();
    };
    this.MR1 = () => {
      this.GetButton(16).RootUIComp.SetUIActive(true);
      this.GetItem(12).SetUIActive(false);
    };
    this.ER1 = () => {
      this.GetButton(16).RootUIComp.SetUIActive(false);
      this.SetInteractState(this.GE1, this.FE1, this.GameInfo.CurHoverIndex);
    };
    this.ScaleUp = undefined;
    this.ScaleDown = undefined;
    this.gFc = () => {
      this.MoveComponent.LongPressScroll(-this.MoveComponent.ScaleStep);
    };
    this.CFc = () => {
      this.MoveComponent.LongPressScroll(this.MoveComponent.ScaleStep);
    };
    this.CHs = i => {
      this.MoveComponent.SliderScroll(i);
    };
    this.$E1 = i => {
      this.GameInfo.MapScale = this.MoveComponent.MapScale;
      var t = this.GetSlider(9);
      if (i !== 3) {
        t.SetValue(this.MoveComponent.MapScale, false);
      }
      var i = this.MoveComponent.MapScaleSafeArea.Min;
      var t = this.MoveComponent.MapScaleSafeArea.Max;
      var t = (this.MoveComponent.MapScale - i) / (t - i);
      var i = MathUtils_1.MathUtils.Lerp(BG_MIN_SCALE, BG_MAX_SCALE, t);
      this.MapTempScaleVector.Set(i, i, i);
      this.GetTexture(11).SetUIItemScale(this.MapTempScaleVector.ToUeVectorOld());
      var t = 1 / this.MoveComponent.MapScale;
      this.MapTempScaleVector.Set(t, t, t);
      this.GetItem(12).SetUIItemScale(this.MapTempScaleVector.ToUeVectorOld());
      if (this.RolePanel) {
        this.RolePanel.SetListRootItem(this.MapTempScaleVector);
      }
    };
    this.CachedSelectPanelList = [];
    this.cBd = new Array(CACHED_SELECT_PANEL_COUNT).fill(-1);
    this.dBd = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDraggableComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIButtonComponent], [9, UE.UISliderComponent], [10, UE.UIButtonComponent], [11, UE.UITexture], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIButtonComponent], [17, UE.UIItem], [18, UE.UIItem]];
    this.BtnBindInfo = [[5, this.XTt]];
  }
  async OnBeforeStartAsync() {
    var i = [];
    this.S7s();
    this.pFc();
    i.push(this.x3t());
    i.push(this.mBd());
    i.push(this.CreateMapGridPath(0, 34, false, true));
    i.push(this.OKs());
    this.GetButton(5).RootUIComp.SetUIActive(false);
    await Promise.all(i);
    this.ResetPath(0);
    var i = this.GetButton(10);
    i.OnPointEnterCallBack.Bind(this.y01);
    i.OnPointDownCallBack.Bind(this.S01);
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  async x3t() {
    var s = [];
    var e = this.GetItem(17);
    var h = this.GetItem(18);
    var a = this.GetItem(1);
    var r = this.GetItem(2);
    for (let t = 0; t < this.GameInfo.MapHeight; t++) {
      for (let i = this.GameInfo.MapWidth - 1; i >= 0; i--) {
        var o;
        var n = this.GameInfo.GetGridIndex(i, t);
        var _ = this.GameInfo.MapGrids[n];
        if (_.IsValid()) {
          this.GridPosItemMap.set(n, this._91(e, a, _));
          this.GridFogPosItemMap.set(n, this._91(h, r, _));
          if ((o = this.u91(n)) > 0) {
            this.CreatePendingList.push({
              Index: n,
              Priority: o
            });
          } else {
            s.push(this.CreateMapGridBg(_));
          }
        }
      }
    }
    await Promise.all(s);
    this.CreatePendingList.sort((i, t) => t.Priority - i.Priority);
    this.GameInfo.SetInteractAvailable(5, false);
    this.l91 = this.CreatePendingList.length > 0;
    this.Nsd();
  }
  S7s() {
    var i;
    var t;
    var s;
    var e = ConfigManager_1.ConfigManager.MapRogueConfig.GetInsGridConfigByInstId(this.GameInfo.InstanceId);
    if (e) {
      (i = this.GetDraggable(0)).RootUIComp.SetHeight(e.MapHeight);
      i.RootUIComp.SetWidth(e.MapWidth);
      this.MoveComponent = new BuildingMapMoveComponent_1.BuildingMapMoveComponent(this.GetDraggable(0), true, true, true);
      this.KR1();
      this.MoveComponent.PointerBeginDragExtraCallBack = this.MR1;
      this.MoveComponent.PointerUpExtraCallBack = this.ER1;
      i = e.MapScaleMin / THOUSANDTH_RATIO;
      t = e.MapScaleMax / THOUSANDTH_RATIO;
      s = Math.max(Math.min(t, this.GameInfo.MapScale), i);
      this.MoveComponent.SetScaleSafeArea(i, t);
      this.SetTextureByPath(e.MapBackground, this.GetTexture(11));
      this.MoveComponent.SetChangeScaleCallback(this.$E1);
      this.MoveComponent.SetScale(s, 5);
      this.GameInfo.TriggerGuideEventOnFocusStart();
      this.FocusOnGrid(this.GameInfo.PlayerGridIndex, false);
      this.GameInfo.TriggerGuideEventOnFocusEnd();
    }
  }
  KR1() {
    if (Info_1.Info.IsInGamepad()) {
      this.MoveComponent.MoveSpeed = CommonParamById_1.configCommonParamById.GetFloatConfig("MapRogueMapMoveSpeedGamepad");
    } else if (Info_1.Info.IsInKeyBoard()) {
      this.MoveComponent.MoveSpeed = CommonParamById_1.configCommonParamById.GetFloatConfig("MapRogueMapMoveSpeedKeyboard");
    }
  }
  MapShow() {
    this.ResetAllPath();
    this.MoveComponent.BindTouch();
    this.MoveComponent.AddGamepadEvent();
    this.MoveComponent.AddMoveListener(this.GameInfo.CanInteract);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Ui左键点击, this.bMe);
  }
  MapHide() {
    this.MoveComponent.UnbindTouch();
    this.MoveComponent.RemoveGamepadEvent();
    this.MoveComponent.RemoveMoveListener();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Ui左键点击, this.bMe);
  }
  OnBeforeDestroy() {
    this.GridEventItemMap.clear();
    this.GridPosItemMap.clear();
    this.GridFogPosItemMap.clear();
    this.MoveComponent.Destroy();
    this.ScaleUp?.OnDestroy();
    this.ScaleDown?.OnDestroy();
    this.jE1();
  }
  async PlaySequence(i) {
    await this.LevelSequencePlayer?.PlaySequenceAsync(i, new CustomPromise_1.CustomPromise());
  }
  OnTick(i) {
    this.RolePanel?.OnTick(i);
    this.MoveComponent.TickMove();
    this.TickPendingList(i);
  }
  HE1() {
    var i = Vector2D_1.Vector2D.Create(this.MoveComponent.GetMapItem().GetAnchorOffset());
    return !this.MapTempPos.Equals(i, this.DE1);
  }
  vFc(i, t) {
    var [i, s] = this.Bo1(i);
    this.PosTempVector.Set(i, s);
    t.SetAnchorOffset(this.PosTempVector.ToUeVector2D());
  }
  Bo1(i, t = this.GameInfo.Center) {
    var i = this.GameInfo.GetGridPos(i);
    var s = i.Y;
    var i = i.X;
    var s = s - t.Y;
    var i = i - t.X;
    return [X_BIAS * (i + s), Y_BIAS * (s - i)];
  }
  u91(i) {
    var t = this.GameInfo.GetGridPos(this.GameInfo.PlayerGridIndex);
    var [i, t] = this.Bo1(i, t);
    var [i, t] = this.MoveComponent.GetOffsetDisRelativeToViewportCenterRatio(i, t);
    if (i <= VIEWPORT_PRIORITY_RATIO && t <= VIEWPORT_PRIORITY_RATIO) {
      return 0;
    } else {
      return i + t;
    }
  }
  FocusOnGrid(i, t = true, s, e) {
    var [i, h] = this.Bo1(i);
    var t = t ? e ?? this.wk1 : 0;
    this.MoveComponent.MoveToTarget([i, h], 12, t, s);
  }
  SetInteractAvailable(i) {
    this.GetButton(5).RootUIComp.SetUIActive(!i);
    this.MoveComponent.SwitchOnMove(i);
  }
  SetInteractState(i, t, s) {
    this.GE1 = i;
    this.FE1 = t;
    if (s !== undefined) {
      this.vFc(s, this.GetItem(12));
    }
    this.GetItem(13).SetUIActive(i);
    this.GetItem(14).SetUIActive(t);
    this.GetItem(12).SetUIActive((i || t) && !this.MoveComponent.IsInDrag);
  }
  TickPendingList(i) {
    if (this.l91) {
      this.h91 += i;
      if (!(this.h91 < PROCESSING_INTERVAL)) {
        this.h91 = 0;
        i = new UiAsyncTask_1.UiAsyncTask("MapRogueMapModule.TickPendingList", async () => {
          await this.c91();
        });
        this.RunAsyncTask(i);
      }
    }
  }
  async c91() {
    if (this.CreatePendingList.length !== 0) {
      var i = [];
      for (; this.a91 < PROCESSING_CREATE_COUNT;) {
        var t = this.CreatePendingList.pop();
        if (!t) {
          break;
        }
        i.push(this.P2c(t));
      }
      this.a91 = 0;
      this.l91 = this.CreatePendingList.length > 0;
      await Promise.all(i);
      this.Nsd();
    }
  }
  Nsd() {
    if (this.l91) {
      this.GameInfo.SetTipsItemProxy(true, "RogueRes_Map_Loading");
    } else {
      this.GameInfo.SetInteractAvailable(5, true);
      this.GameInfo.ViewLoadPromise?.SetResult();
      this.GameInfo.SetTipsItemProxy(false);
    }
  }
  async P2c(i) {
    this.a91++;
    i = this.GameInfo.MapGrids[i.Index];
    await this.CreateMapGridBg(i);
  }
  async GetActor(i, t) {
    if (this.GameInfo.ActorPool) {
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
      if (i = await this.GameInfo.ActorPool.GetAsync(i, t)) {
        this.UiPoolActorHandle.push(i);
      }
      return i;
    }
  }
  RecycleAllActor() {
    for (const i of this.UiPoolActorHandle) {
      this.RecycleActor(i);
    }
    this.UiPoolActorHandle.length = 0;
  }
  RecycleActor(i) {
    if (this.GameInfo && this.GameInfo.ActorPool && !this.GameInfo.IsEnd) {
      this.GameInfo.ActorPool.RecycleAsync(i, i.Path);
    }
  }
  _91(i, t, s) {
    i = LguiUtil_1.LguiUtil.CopyItem(i, t);
    this.vFc(s.GridIndex, i);
    i.SetUIActive(true);
    return i;
  }
  async CreateMapGridBg(i) {
    var t;
    var s;
    var e;
    if (i.IsValid() && (t = [], s = new MapRogueGrid_1.MapRogueGrid(), this.GridItemMap.set(i.GridIndex, s), (e = await this.GetActor("UiItem_MapBlockBg", this.GridPosItemMap.get(i.GridIndex))) && t.push(s.CreateByActorAsync(e.Actor)), i.HasVision || t.push(this.CreateMapGridFog(i.GridIndex)), await Promise.all(t), s.Refresh(i), s.OnCanExecuteChangeFunc = this.cFc, s.OnExtendToggleStateChanged = this.dFc, s.OnExtendTogglePointerDown = this.uFc, s.OnHoverFunc = this.mFc, s.OnUnHoverFunc = this.fFc, i.HasEvent())) {
      await this.CreateMapGridEvent(i);
    }
  }
  async CreateMapGridFog(i) {
    var t = new MapRogueGridFog_1.MapRogueGridFog();
    this.GridFogItemMap.set(i, t);
    var i = await this.GetActor("UiItem_MapBlockFog", this.GridFogPosItemMap.get(i));
    if (i) {
      await t.CreateThenShowByActorAsync(i.Actor);
    }
  }
  async RefreshMapGridFogVision(i, t) {
    var s = this.GridFogItemMap.get(i);
    if (s) {
      s.SetVision(t, true);
    } else if (!t) {
      await this.CreateMapGridFog(i);
    }
  }
  RefreshMapGrid(t) {
    this.GridItemMap.get(t.GridIndex).Refresh(t);
    var i = new UiAsyncTask_1.UiAsyncTask("MapRogueMapModule.RefreshMapGridTask", async () => {
      var i = [];
      i.push(this.RefreshMapGridFogVision(t.GridIndex, t.HasVision));
      i.push(this.RefreshMapGridEventVision(t, t.HasVision));
      await Promise.all(i);
    });
    this.RunAsyncTask(i);
  }
  SetMapGridBgVision(s, e) {
    var i = new UiAsyncTask_1.UiAsyncTask("MapRogueMapModule.SetMapGridBgVision", async () => {
      var i = this.GameInfo.MapGrids[s];
      this.GridItemMap.get(i.GridIndex).SetVision(e);
      var t = [];
      t.push(this.RefreshMapGridFogVision(s, e));
      t.push(this.RefreshMapGridEventVision(i, e));
      await Promise.all(t);
    });
    this.RunAsyncTask(i);
  }
  SetMapGridBgState(i, t, s) {
    this.GridItemMap.get(i)?.SetGridToggleState(t, s);
  }
  SetMapGridMoveEnable(i, t) {
    this.GridItemMap.get(i)?.SetToggleMoveEnable(t);
  }
  SetPerspectiveMode(i, t) {
    if (!this.MoveComponent.IsInDrag) {
      this.GridItemMap.get(i)?.SetPerspectiveMode(t);
    }
  }
  GetGridRangeInfo(i) {
    var t;
    var i = this.GridItemMap.get(i);
    if (i) {
      i = i.GetOriginalItem().GetLGUISpaceAbsolutePosition();
      t = ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().GridValidRangeTolerance / THOUSANDTH_RATIO * this.MoveComponent.MapScale;
      return {
        CenterX: i.X,
        CenterY: i.Y + CENTER_Y_BIAS * this.MoveComponent.MapScale,
        RadiusX: RANGE_X * this.MoveComponent.MapScale + t,
        RadiusY: RANGE_Y * this.MoveComponent.MapScale + t
      };
    }
  }
  get NE1() {
    return Info_1.Info.IsInKeyBoard();
  }
  get VE1() {
    return this.OE1 >= 0;
  }
  jE1() {
    if (this.kE1 && TimerSystem_1.GameplayTimerSystem.Has(this.kE1)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.kE1);
    }
    this.kE1 = undefined;
    this.OE1 = -1;
  }
  async CreateMapGridEvent(i, t = i.HasVision) {
    var s = new MapRogueGridEvent_1.MapRogueGridEvent();
    this.GridEventItemMap.set(i.GridIndex, s);
    var e = this.GridItemMap.get(i.GridIndex).GetPanelEvent();
    var e = await this.GetActor("UiItem_MapBlockEvent", e);
    if (e) {
      await s.CreateByActorAsync(e.Actor);
    }
    s.Refresh(i);
    s.SetVision(t);
  }
  async RefreshMapGridEventVision(i, t) {
    var s = this.GridEventItemMap.get(i.GridIndex);
    if (s) {
      s.Refresh(i);
      s.SetVision(i.HasEvent(t));
    } else if (i.HasEvent(t)) {
      await this.CreateMapGridEvent(i, t);
    }
  }
  RefreshAllEventLv() {
    for (const i of this.GridEventItemMap.values()) {
      i.RefreshLv();
    }
  }
  CreateAllMapGridPath(i, t) {
    var s = new UiAsyncTask_1.UiAsyncTask("MapRogueMapModule.CreateAllMapGridPath", async () => {
      await this.CreateAllMapGridPathAsync(i, t);
    });
    this.RunAsyncTask(s);
  }
  async CreateAllMapGridPathAsync(t, s) {
    var e = [];
    var i = s[s.length - 1];
    this.ResetPath(i);
    for (let i = 1; i < t.length - 1; i++) {
      var h = t[i];
      if (!s.includes(h)) {
        this.ResetPath(h);
      }
    }
    var a = this.CachedPathItemList.length;
    for (let i = 1; i < s.length - 1; i++) {
      var r = s[i];
      var o = s[i - 1];
      var n = s[i + 1];
      var _ = a < i + 1;
      var p = this.GridPathItemMap.get(r);
      if (p) {
        p.SetShape(this.GetShapeType(r, o, n), i === s.length - 2);
      } else {
        e.push(this.CreateMapGridPath(r, this.GetShapeType(r, o, n), i === s.length - 2, _));
      }
    }
    await Promise.all(e);
  }
  async CreateMapGridPath(i, t, s, e) {
    let h = undefined;
    if (e) {
      h = new MapRogueGridPath_1.MapRogueGridPath();
      this.GridPathItemMap.set(i, h);
      await h.CreateByResourceIdAsync("UiItem_MapBlockSign", this.GetItem(3));
    } else {
      h = this.CachedPathItemList.pop();
      this.GridPathItemMap.set(i, h);
    }
    this.vFc(i, h.GetRootItem());
    h.SetShape(t, s);
    h.SetUiActive(true);
  }
  GetShapeType(i, t, s) {
    var e = (i, t) => i < t ? i + 1 === t ? 2 : 4 : i - 1 === t ? 1 : 3;
    return e(i, t) * 10 + e(i, s);
  }
  ResetPath(i) {
    var t = this.GridPathItemMap.get(i);
    if (t) {
      t.SetUiActive(false);
      this.CachedPathItemList.push(t);
      this.GridPathItemMap.delete(i);
    }
  }
  ResetAllPath() {
    for (const i of this.GridPathItemMap.values()) {
      i.SetUiActive(false);
      this.CachedPathItemList.push(i);
    }
    this.GridPathItemMap.clear();
  }
  async OKs() {
    this.RolePanel = new MapRoguePanelRole_1.MapRoguePanelRole(this.GameInfo);
    await this.RolePanel.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
    var i = 1 / this.MoveComponent.MapScale;
    this.MapTempScaleVector.Set(i, i, i);
    this.RolePanel.SetListRootItem(this.MapTempScaleVector);
  }
  SetRolePos(i) {
    var t = this.GetItem(4);
    this.vFc(i, t);
  }
  SetRolePosByGrid(i, t, s) {
    var e = this.GetItem(4);
    var [t, h] = this.Bo1(t);
    var [s, a] = this.Bo1(s);
    var t = MathUtils_1.MathUtils.Lerp(t, s, i);
    var s = MathUtils_1.MathUtils.Lerp(h, a, i);
    this.PosTempVector.Set(t, s);
    e.SetAnchorOffset(this.PosTempVector.ToUeVector2D());
  }
  pFc() {
    var i = this.GetSlider(9);
    i.SetMinValue(this.MoveComponent.MapScaleSafeArea.Min, false, false);
    i.SetMaxValue(this.MoveComponent.MapScaleSafeArea.Max, false, false);
    i.SetValue(this.MoveComponent.MapScale, true);
    i.OnValueChangeCb.Bind(this.CHs);
    this.ScaleUp = new LongPressButton_1.LongPressButton(this.GetButton(7), this.CFc);
    this.ScaleDown = new LongPressButton_1.LongPressButton(this.GetButton(8), this.gFc);
  }
  async mBd() {
    var t = [];
    for (let i = 0; i < CACHED_SELECT_PANEL_COUNT; i++) {
      var s = new MapRogueGridSelectBase_1.MapRogueGridSelectBase();
      var e = new MapRogueGridSelectBase_1.MapRogueGridSelectBase();
      t.push(s.CreateByPathAsync(RESOURCE_BACK_PATH, this.RootItem));
      t.push(e.CreateByPathAsync(RESOURCE_FRONT_PATH, this.RootItem));
      this.CachedSelectPanelList.push([s, e]);
    }
    await Promise.all(t);
  }
  SetSelectPanel(i) {
    var t;
    var s;
    var e;
    var h = i.GridIndex;
    if (!(this.CachedSelectPanelList.length <= this.dBd) && !!(t = this.GridItemMap.get(h)) && !(t.SelectPanel.length > 0)) {
      if (i.Walkable && ([i, s] = this.CachedSelectPanelList.at(this.dBd), i.SetUiActive(false), s.SetUiActive(false), e = this.cBd.at(this.dBd), (e = this.GridItemMap.get(e)) && e.ClearSelectPanel(), t.SetSelectPanel(i, s), this.cBd[this.dBd] = h, this.dBd++, this.dBd >= this.CachedSelectPanelList.length)) {
        this.dBd = 0;
      }
    }
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (i.length !== 0) {
      var t = i[0];
      if (t === "MapRougeGrid" && i.length === 2) {
        t = Number(i[1]);
        if (t && !isNaN(t) && t > 0) {
          return this.wq1(t);
        }
      }
    }
  }
  wq1(i) {
    var i = this.GridItemMap.get(i);
    if (i = i && i.GetRootItem()) {
      return [i, i];
    } else {
      return undefined;
    }
  }
}
exports.MapRogueMapModule = MapRogueMapModule;
//# sourceMappingURL=MapRogueMapModule.js.map
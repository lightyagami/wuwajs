"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MapRogueMapModule = void 0;
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../../../Core/Common/Info"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Macro_1 = require("../../../../../Core/Preprocessor/Macro"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  BuildingMapMoveComponent_1 = require("../../../Activity/ActivityContent/MoonChasing/Main/Build/BuildingMapMoveComponent"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  LongPressButton_1 = require("../../../Util/LongPressButton"),
  MapRogueGrid_1 = require("./Grid/MapRogueGrid"),
  MapRogueGridEvent_1 = require("./Grid/MapRogueGridEvent"),
  MapRogueGridFog_1 = require("./Grid/MapRogueGridFog"),
  MapRogueGridPath_1 = require("./Grid/MapRogueGridPath"),
  MapRoguePanelRole_1 = require("./MapRoguePanelRole"),
  X_BIAS = 110,
  Y_BIAS = -64,
  CENTER_Y_BIAS = 16,
  RANGE_X = 110,
  RANGE_Y = 62,
  [BG_MIN_SCALE, BG_MAX_SCALE] = [1, 1.3],
  VIEWPORT_PRIORITY_RATIO = 1.3,
  THOUSANDTH_RATIO = 1e3,
  PROCESSING_CREATE_COUNT = 120,
  PROCESSING_INTERVAL = 100;
class MapRogueMapModule extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super(), this.GameInfo = i, this.LevelSequencePlayer = void 0, this.MoveComponent = void 0, this.RolePanel = void 0, this.GridItemMap = new Map, this.GridEventItemMap = new Map, this.GridPathItemMap = new Map, this.GridFogItemMap = new Map, this.GridPosItemMap = new Map, this.GridFogPosItemMap = new Map, this.CachedPathItemList = [], this.PosTempVector = Vector2D_1.Vector2D.Create(), this.MapTempPos = Vector2D_1.Vector2D.Create(), this.MapTempScaleVector = Vector_1.Vector.Create(), this.lE1 = CommonParamById_1.configCommonParamById.GetIntConfig("MapRogueClickOffsetTolerance") ?? 10, this.JB1 = ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().FocusTime / THOUSANDTH_RATIO, this.lqt = () => {
      this.MR1()
    }, this.UiPoolActorHandle = [], this.CreatePendingList = [], this.b71 = 0, this.R71 = 0, this.L71 = !1, this._E1 = CommonParamById_1.configCommonParamById.GetIntConfig("MapRogueDoubleClickInterval"), this.uE1 = void 0, this.cE1 = -1, this.dE1 = !1, this.mE1 = !1, this.fE1 = !1, this.XTt = () => {}, this.bMe = (i, t) => {
      this.gE1 && this.GameInfo.IsStageAvailable && (0 === t ? this.CE1 ? (this.mE1 && this.GameInfo.OnMove(this.cE1), this.pE1()) : (this.pE1(), this.cE1 = this.GameInfo.CurHoverIndex, this.dE1 = !1, this.uE1 = TimerSystem_1.TimerSystem.Delay(() => {
        this.CE1 && (this.dE1 && this.SetMapGridBgState(this.cE1, !0, !0), this.uE1 = void 0, this.cE1 = -1)
      }, this._E1)) : this.dE1 = !0)
    }, this.cFc = (i, t) => !this.CE1 && !this.vE1() && (this.GameInfo.CurHoverIndex !== t.GridIndex && this.GameInfo.HoverOnTarget(t.GridIndex), !i) && this.fE1, this.uFc = (i, t) => {
      this.MapTempPos.FromUeVector2D(this.MoveComponent.GetMapItem().GetAnchorOffset()), this.MoveComponent.EmitPointerDown()
    }, this.dFc = (i, t) => {
      this.GameInfo.OnCheck(t.GridIndex)
    }, this.mFc = i => {
      this.CE1 && this.pE1(), this.MoveComponent.IsInDrag || this.GameInfo.HoverOnTarget(i.GridIndex, !Info_1.Info.IsInTouch())
    }, this.fFc = i => {
      Info_1.Info.IsInTouch() || this.GameInfo.UnHoverOnTarget(i.GridIndex)
    }, this.zC1 = () => {
      this.CE1 && this.pE1(), this.GameInfo.BlankPlaneEnter()
    }, this.JC1 = () => {
      this.MoveComponent.EmitPointerDown()
    }, this.Yb1 = () => {
      this.GetButton(16).RootUIComp.SetUIActive(!0), this.GetItem(12).SetUIActive(!1)
    }, this.zb1 = () => {
      this.GetButton(16).RootUIComp.SetUIActive(!1), this.SetInteractState(this.mE1, this.fE1, this.GameInfo.CurHoverIndex)
    }, this.ScaleUp = void 0, this.ScaleDown = void 0, this.gFc = () => {
      this.MoveComponent.LongPressScroll(-this.MoveComponent.ScaleStep)
    }, this.CFc = () => {
      this.MoveComponent.LongPressScroll(this.MoveComponent.ScaleStep)
    }, this.CHs = i => {
      this.MoveComponent.SliderScroll(i)
    }, this.yE1 = i => {
      var t = this.GetSlider(9),
        i = (3 !== i && t.SetValue(this.MoveComponent.MapScale, !1), this.MoveComponent.MapScaleSafeArea.Min),
        t = this.MoveComponent.MapScaleSafeArea.Max,
        t = (this.MoveComponent.MapScale - i) / (t - i),
        i = MathUtils_1.MathUtils.Lerp(BG_MIN_SCALE, BG_MAX_SCALE, t),
        t = (this.MapTempScaleVector.Set(i, i, i), this.GetTexture(11).SetUIItemScale(this.MapTempScaleVector.ToUeVectorOld()), 1 / this.MoveComponent.MapScale);
      this.MapTempScaleVector.Set(t, t, t), this.GetItem(12).SetUIItemScale(this.MapTempScaleVector.ToUeVectorOld())
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIDraggableComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIItem],
      [7, UE.UIButtonComponent],
      [8, UE.UIButtonComponent],
      [9, UE.UISliderComponent],
      [10, UE.UIButtonComponent],
      [11, UE.UITexture],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIButtonComponent],
      [17, UE.UIItem],
      [18, UE.UIItem]
    ], this.BtnBindInfo = [
      [5, this.XTt]
    ]
  }
  async OnBeforeStartAsync() {
    var i = [],
      i = (this.S7s(), this.pFc(), i.push(this.x3t()), i.push(this.CreateMapGridPath(0, 34, !1, !0)), i.push(this.OKs()), this.GetButton(5).RootUIComp.SetUIActive(!1), await Promise.all(i), this.ResetPath(0), this.GetButton(10));
    i.OnPointEnterCallBack.Bind(this.zC1), i.OnPointDownCallBack.Bind(this.JC1), this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)
  }
  async x3t() {
    var s = [],
      e = this.GetItem(17),
      h = this.GetItem(18),
      a = this.GetItem(1),
      r = this.GetItem(2);
    for (let t = 0; t < this.GameInfo.MapHeight; t++)
      for (let i = this.GameInfo.MapWidth - 1; 0 <= i; i--) {
        var o, n = this.GameInfo.GetGridIndex(i, t),
          _ = this.GameInfo.MapGrids[n];
        _.IsValid() && (this.GridPosItemMap.set(n, this.w71(e, a, _)), this.GridFogPosItemMap.set(n, this.w71(h, r, _)), 0 < (o = this.A71(n)) ? this.CreatePendingList.push({
          Index: n,
          Priority: o
        }) : s.push(this.CreateMapGridBg(_)))
      }
    await Promise.all(s), this.CreatePendingList.sort((i, t) => t.Priority - i.Priority), this.GameInfo.SetInteractAvailable(5, !1), this.L71 = !0
  }
  S7s() {
    var i, t = ConfigManager_1.ConfigManager.MapRogueConfig.GetInsGridConfigByInstId(this.GameInfo.InstanceId);
    t && ((i = this.GetDraggable(0)).RootUIComp.SetHeight(t.MapHeight), i.RootUIComp.SetWidth(t.MapWidth), this.MoveComponent = new BuildingMapMoveComponent_1.BuildingMapMoveComponent(this.GetDraggable(0), !0, !0, !0), this.MR1(), this.MoveComponent.PointerBeginDragExtraCallBack = this.Yb1, this.MoveComponent.PointerUpExtraCallBack = this.zb1, this.MoveComponent.SetScaleSafeArea(t.MapScaleMin / THOUSANDTH_RATIO, t.MapScaleMax / THOUSANDTH_RATIO), this.SetTextureByPath(t.MapBackground, this.GetTexture(11)), this.MoveComponent.SetChangeScaleCallback(this.yE1), this.MoveComponent.SetScale(t.MapInitScale / THOUSANDTH_RATIO, 4), this.GameInfo.TriggerGuideEventOnFocusStart(), this.FocusOnGrid(this.GameInfo.PlayerGridIndex, !1), this.GameInfo.TriggerGuideEventOnFocusEnd())
  }
  MR1() {
    Info_1.Info.IsInGamepad() ? this.MoveComponent.MoveSpeed = CommonParamById_1.configCommonParamById.GetFloatConfig("MapRogueMapMoveSpeedGamepad") : Info_1.Info.IsInKeyBoard() && (this.MoveComponent.MoveSpeed = CommonParamById_1.configCommonParamById.GetFloatConfig("MapRogueMapMoveSpeedKeyboard"))
  }
  MapShow() {
    this.ResetAllPath(), this.MoveComponent.BindTouch(), this.MoveComponent.AddGamepadEvent(), this.MoveComponent.AddMoveListener(this.GameInfo.CanInteract), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt), ControllerHolder_1.ControllerHolder.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Ui左键点击, this.bMe)
  }
  MapHide() {
    this.MoveComponent.UnbindTouch(), this.MoveComponent.RemoveGamepadEvent(), this.MoveComponent.RemoveMoveListener(), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt), ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Ui左键点击, this.bMe)
  }
  OnBeforeDestroy() {
    this.GridPosItemMap.clear(), this.GridFogPosItemMap.clear(), this.MoveComponent.Destroy(), this.pE1()
  }
  async PlaySequence(i) {
    await this.LevelSequencePlayer?.PlaySequenceAsync(i, new CustomPromise_1.CustomPromise)
  }
  OnTick(i) {
    this.RolePanel?.OnTick(i), this.MoveComponent.TickMove(), this.TickPendingList(i)
  }
  vE1() {
    var i = Vector2D_1.Vector2D.Create(this.MoveComponent.GetMapItem().GetAnchorOffset());
    return !this.MapTempPos.Equals(i, this.lE1)
  }
  vFc(i, t) {
    var [i, s] = this.fo1(i);
    this.PosTempVector.Set(i, s), t.SetAnchorOffset(this.PosTempVector.ToUeVector2D())
  }
  fo1(i, t = this.GameInfo.Center) {
    var i = this.GameInfo.GetGridPos(i),
      s = i.Y,
      i = i.X,
      s = s - t.Y,
      i = i - t.X;
    return [X_BIAS * (i + s), Y_BIAS * (s - i)]
  }
  A71(i) {
    var t = this.GameInfo.GetGridPos(this.GameInfo.PlayerGridIndex),
      [i, t] = this.fo1(i, t),
      [i, t] = this.MoveComponent.GetOffsetDisRelativeToViewportCenterRatio(i, t);
    return i <= VIEWPORT_PRIORITY_RATIO && t <= VIEWPORT_PRIORITY_RATIO ? 0 : i + t
  }
  FocusOnGrid(i, t = !0, s) {
    var [i, e] = this.fo1(i), t = t ? this.JB1 : 0;
    this.MoveComponent.MoveToTarget([i, e], 12, t, s)
  }
  SetInteractAvailable(i) {
    this.GetButton(5).RootUIComp.SetUIActive(!i), this.MoveComponent.SwitchOnMove(i)
  }
  SetInteractState(i, t, s) {
    this.mE1 = i, this.fE1 = t, void 0 !== s && this.vFc(s, this.GetItem(12)), this.GetItem(13).SetUIActive(i), this.GetItem(14).SetUIActive(t), this.GetItem(12).SetUIActive((i || t) && !this.MoveComponent.IsInDrag)
  }
  TickPendingList(i) {
    this.L71 && (this.R71 += i, this.R71 < PROCESSING_INTERVAL || (this.R71 = 0, i = new UiAsyncTask_1.UiAsyncTask("MapRogueMapModule.TickPendingList", async () => {
      await this.P71()
    }), this.RunAsyncTask(i)))
  }
  async P71() {
    if (0 !== this.CreatePendingList.length) {
      for (var i = []; this.b71 < PROCESSING_CREATE_COUNT;) {
        var t = this.CreatePendingList.pop();
        if (!t) break;
        i.push(this.P2c(t))
      }
      this.b71 = 0, this.L71 = 0 < this.CreatePendingList.length, await Promise.all(i), this.L71 || (this.GameInfo.SetInteractAvailable(5, !0), this.GameInfo.ViewLoadPromise?.SetResult(), this.GameInfo.SetTipsItemProxy(!1))
    }
  }
  async P2c(i) {
    this.b71++;
    i = this.GameInfo.MapGrids[i.Index];
    await this.CreateMapGridBg(i)
  }
  async GetActor(i, t) {
    if (this.GameInfo.ActorPool) return i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i), (i = await this.GameInfo.ActorPool.GetAsync(i, t)) && this.UiPoolActorHandle.push(i), i
  }
  RecycleAllActor() {
    for (const i of this.UiPoolActorHandle) this.RecycleActor(i);
    this.UiPoolActorHandle.length = 0
  }
  RecycleActor(i) {
    this.GameInfo && this.GameInfo.ActorPool && !this.GameInfo.IsEnd && this.GameInfo.ActorPool.RecycleAsync(i, i.Path)
  }
  w71(i, t, s) {
    i = LguiUtil_1.LguiUtil.CopyItem(i, t);
    return this.vFc(s.GridIndex, i), i.SetUIActive(!0), i
  }
  async CreateMapGridBg(i) {
    var t, s, e;
    i.IsValid() && (t = [], s = new MapRogueGrid_1.MapRogueGrid, this.GridItemMap.set(i.GridIndex, s), (e = await this.GetActor("UiItem_MapBlockBg", this.GridPosItemMap.get(i.GridIndex))) && t.push(s.CreateByActorAsync(e.Actor)), i.HasVision || t.push(this.CreateMapGridFog(i.GridIndex)), await Promise.all(t), s.Refresh(i), s.OnCanExecuteChangeFunc = this.cFc, s.OnExtendToggleStateChanged = this.dFc, s.OnExtendTogglePointerDown = this.uFc, s.OnHoverFunc = this.mFc, s.OnUnHoverFunc = this.fFc, i.HasEvent()) && await this.CreateMapGridEvent(i)
  }
  async CreateMapGridFog(i) {
    var t = new MapRogueGridFog_1.MapRogueGridFog,
      i = (this.GridFogItemMap.set(i, t), await this.GetActor("UiItem_MapBlockFog", this.GridFogPosItemMap.get(i)));
    i && await t.CreateThenShowByActorAsync(i.Actor)
  }
  async RefreshMapGridFogVision(i, t) {
    var s = this.GridFogItemMap.get(i);
    s ? s.SetVision(t, !0) : t || await this.CreateMapGridFog(i)
  }
  RefreshMapGrid(t) {
    this.GridItemMap.get(t.GridIndex).Refresh(t);
    var i = new UiAsyncTask_1.UiAsyncTask("MapRogueMapModule.RefreshMapGridTask", async () => {
      var i = [];
      i.push(this.RefreshMapGridFogVision(t.GridIndex, t.HasVision)), i.push(this.RefreshMapGridEventVision(t, t.HasVision)), await Promise.all(i)
    });
    this.RunAsyncTask(i)
  }
  SetMapGridBgVision(s, e) {
    var i = new UiAsyncTask_1.UiAsyncTask("MapRogueMapModule.SetMapGridBgVision", async () => {
      var i = this.GameInfo.MapGrids[s],
        t = (this.GridItemMap.get(i.GridIndex).SetVision(e), []);
      t.push(this.RefreshMapGridFogVision(s, e)), t.push(this.RefreshMapGridEventVision(i, e)), await Promise.all(t)
    });
    this.RunAsyncTask(i)
  }
  SetMapGridBgState(i, t, s) {
    this.GridItemMap.get(i)?.SetGridToggleState(t, s)
  }
  SetMapGridMoveEnable(i, t) {
    this.GridItemMap.get(i)?.SetToggleMoveEnable(t)
  }
  SetPerspectiveMode(i, t) {
    this.MoveComponent.IsInDrag || this.GridItemMap.get(i)?.SetPerspectiveMode(t)
  }
  GetGridRangeInfo(i) {
    var t, i = this.GridItemMap.get(i);
    if (i) return i = i.GetOriginalItem().GetLGUISpaceAbsolutePosition(), t = ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().GridValidRangeTolerance / THOUSANDTH_RATIO * this.MoveComponent.MapScale, {
      CenterX: i.X,
      CenterY: i.Y + CENTER_Y_BIAS * this.MoveComponent.MapScale,
      RadiusX: RANGE_X * this.MoveComponent.MapScale + t,
      RadiusY: RANGE_Y * this.MoveComponent.MapScale + t
    }
  }
  get gE1() {
    return Info_1.Info.IsInKeyBoard()
  }
  get CE1() {
    return 0 <= this.cE1
  }
  pE1() {
    this.uE1 && TimerSystem_1.TimerSystem.Has(this.uE1) && TimerSystem_1.TimerSystem.Remove(this.uE1), this.uE1 = void 0, this.cE1 = -1
  }
  async CreateMapGridEvent(i, t = i.HasVision) {
    var s = new MapRogueGridEvent_1.MapRogueGridEvent,
      e = (this.GridEventItemMap.set(i.GridIndex, s), this.GridItemMap.get(i.GridIndex).GetPanelEvent()),
      e = await this.GetActor("UiItem_MapBlockEvent", e);
    e && await s.CreateByActorAsync(e.Actor), s.Refresh(i), s.SetVision(t)
  }
  async RefreshMapGridEventVision(i, t) {
    var s = this.GridEventItemMap.get(i.GridIndex);
    s ? (s.Refresh(i), s.SetVision(i.HasEvent(t))) : i.HasEvent(t) && await this.CreateMapGridEvent(i, t)
  }
  CreateAllMapGridPath(i, t) {
    var s = new UiAsyncTask_1.UiAsyncTask("MapRogueMapModule.CreateAllMapGridPath", async () => {
      await this.CreateAllMapGridPathAsync(i, t)
    });
    this.RunAsyncTask(s)
  }
  async CreateAllMapGridPathAsync(t, s) {
    var e = [],
      i = s[s.length - 1];
    this.ResetPath(i);
    for (let i = 1; i < t.length - 1; i++) {
      var h = t[i];
      s.includes(h) || this.ResetPath(h)
    }
    var a = this.CachedPathItemList.length;
    for (let i = 1; i < s.length - 1; i++) {
      var r = s[i],
        o = s[i - 1],
        n = s[i + 1],
        _ = a < i + 1,
        p = this.GridPathItemMap.get(r);
      p ? p.SetShape(this.GetShapeType(r, o, n), i === s.length - 2) : e.push(this.CreateMapGridPath(r, this.GetShapeType(r, o, n), i === s.length - 2, _))
    }
    await Promise.all(e)
  }
  async CreateMapGridPath(i, t, s, e) {
    let h = void 0;
    e ? (h = new MapRogueGridPath_1.MapRogueGridPath, this.GridPathItemMap.set(i, h), await h.CreateByResourceIdAsync("UiItem_MapBlockSign", this.GetItem(3))) : (h = this.CachedPathItemList.pop(), this.GridPathItemMap.set(i, h)), this.vFc(i, h.GetRootItem()), h.SetShape(t, s), h.SetUiActive(!0)
  }
  GetShapeType(i, t, s) {
    var e = (i, t) => i < t ? i + 1 === t ? 2 : 4 : i - 1 === t ? 1 : 3;
    return 10 * e(i, t) + e(i, s)
  }
  ResetPath(i) {
    var t = this.GridPathItemMap.get(i);
    t && (t.SetUiActive(!1), this.CachedPathItemList.push(t), this.GridPathItemMap.delete(i))
  }
  ResetAllPath() {
    for (const i of this.GridPathItemMap.values()) i.SetUiActive(!1), this.CachedPathItemList.push(i);
    this.GridPathItemMap.clear()
  }
  async OKs() {
    this.RolePanel = new MapRoguePanelRole_1.MapRoguePanelRole(this.GameInfo), await this.RolePanel.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())
  }
  SetRolePos(i) {
    var t = this.GetItem(4);
    this.vFc(i, t)
  }
  SetRolePosByGrid(i, t, s) {
    var e = this.GetItem(4),
      [t, h] = this.fo1(t),
      [s, a] = this.fo1(s),
      t = MathUtils_1.MathUtils.Lerp(t, s, i),
      s = MathUtils_1.MathUtils.Lerp(h, a, i);
    this.PosTempVector.Set(t, s), e.SetAnchorOffset(this.PosTempVector.ToUeVector2D())
  }
  pFc() {
    var i = this.GetSlider(9);
    i.SetMinValue(this.MoveComponent.MapScaleSafeArea.Min, !1, !1), i.SetMaxValue(this.MoveComponent.MapScaleSafeArea.Max, !1, !1), i.SetValue(this.MoveComponent.MapScale, !0), i.OnValueChangeCb.Bind(this.CHs), this.ScaleUp = new LongPressButton_1.LongPressButton(this.GetButton(7), this.CFc), this.ScaleDown = new LongPressButton_1.LongPressButton(this.GetButton(8), this.gFc)
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (0 !== i.length) {
      var t = i[0];
      if ("MapRougeGrid" === t && 2 === i.length) {
        t = Number(i[1]);
        if (t && !isNaN(t) && 0 < t) return this.JO1(t)
      }
    }
  }
  JO1(i) {
    var i = this.GridItemMap.get(i);
    return (i = i && i.GetRootItem()) ? [i, i] : void 0
  }
}
exports.MapRogueMapModule = MapRogueMapModule;
//# sourceMappingURL=MapRogueMapModule.js.map
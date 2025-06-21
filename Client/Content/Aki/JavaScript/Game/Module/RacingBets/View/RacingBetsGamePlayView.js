"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RacingBetsGamePlayView = void 0;
const UE = require("ue"),
  Time_1 = require("../../../../Core/Common/Time"),
  ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  CameraController_1 = require("../../../Camera/CameraController"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  GlobalData_1 = require("../../../GlobalData"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  UiCameraAnimationController_1 = require("../../UiCameraAnimation/UiCameraAnimationController"),
  UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  RacingBetsController_1 = require("../RacingBetsController"),
  RacingBetsDefine_1 = require("../RacingBetsDefine"),
  RacingBetsBulletScreenPanel_1 = require("./Item/RacingBetsBulletScreenPanel"),
  RacingBetsDangoDiceItem_1 = require("./Item/RacingBetsDangoDiceItem"),
  RacingBetsDangoOrderItem_1 = require("./Item/RacingBetsDangoOrderItem"),
  RacingBetsDangoRankPanel_1 = require("./Item/RacingBetsDangoRankPanel"),
  RacingBetsIconBulletScreenItem_1 = require("./Item/RacingBetsIconBulletScreenItem"),
  RacingBetsTextBulletScreenItem_1 = require("./Item/RacingBetsTextBulletScreenItem"),
  DANGO_ORDER_ITEM_START_INDEX = 24,
  DANGO_ORDER_ITEM_COUNT = 6,
  DANGO_DICE_ITEM_START_INDEX = 37,
  DANGO_DICE_ITEM_COUNT = 6;
class RacingBetsGamePlayView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.R01 = !1, this.L01 = !1, this.GP1 = !1, this.w01 = 0, this.A01 = 0, this.Pv1 = 0, this.HD1 = !1, this.xv1 = [], this.ke1 = void 0, this.Ckc = [], this.iT1 = void 0, this.ZFc = void 0, this.eNc = void 0, this.IT1 = [], this.DL1 = [], this.tNc = () => {
      var e = new RacingBetsIconBulletScreenItem_1.RacingBetsIconBulletScreenItem;
      return e.BindClickBulletScreenCallBack(this.P01), e
    }, this.iNc = () => {
      var e = new RacingBetsTextBulletScreenItem_1.RacingBetsTextBulletScreenItem;
      return e.BindClickBulletScreenCallBack(this.P01), e
    }, this.TT1 = (e, i, t) => {
      this.bT1(e, i, t)
    }, this.RT1 = (e, i) => {
      this.wT1(e, i)
    }, this.Oe1 = (e, i) => {
      this.ke1.PushBulletScreen(e, i)
    }, this.Fo1 = e => {
      this.rT1(e)
    }, this.mmo = e => {
      "RacingBetsGamePlayView" === e.ViewName && UiCameraAnimationController_1.UiCameraAnimationController.ExitUiCameraMode()
    }, this.Akc = e => {
      this.ke1.SetActive(1 !== e)
    }, this.x01 = () => {
      var e = !this.L01;
      this.GetButton(30).RootUIComp.SetUIActive(e), this.Sk1(e), this.Mk1(!1), this.Ek1(!1)
    }, this.U01 = () => {
      var e = !this.R01;
      this.GetButton(30).RootUIComp.SetUIActive(e), this.Ek1(e), this.Mk1(!1), this.Sk1(!1)
    }, this.D01 = e => {
      this.GetExtendToggle(9).SetToggleStateForce(1);
      this.GetExtendToggle(10).SetToggleStateForce(0);
      var i = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsBulletScreen(2);
      this.eNc.RefreshByData(i)
    }, this.sNc = e => {
      this.GetExtendToggle(9).SetToggleStateForce(0);
      this.GetExtendToggle(10).SetToggleStateForce(1);
      var i = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsBulletScreen(3);
      this.eNc.RefreshByData(i)
    }, this.Ov1 = () => {
      this.Pv1 = (this.Pv1 + 1) % this.xv1.length;
      var e = this.xv1[this.Pv1];
      UE.GameplayStatics.SetGlobalTimeDilation(GlobalData_1.GlobalData.World, e), this.GetText(23).SetText("×" + e.toFixed(1))
    }, this.FP1 = () => {
      this.Mk1(!1), this.Sk1(!1), this.Ek1(!1), this.GetButton(30).RootUIComp.SetUIActive(!1)
    }, this.NP1 = e => {
      e = Math.floor(e);
      ModelManager_1.ModelManager.RacingBetsModel.SetRacingBetsBulletScreenAlpha(e), this.GetText(33).SetText(e + "%"), this.ke1.GetRootItem().SetAlpha(e / 100)
    }, this.VP1 = () => {
      var e = !this.GP1;
      this.GetButton(30).RootUIComp.SetUIActive(e), this.Mk1(e), this.Sk1(!1), this.Ek1(!1)
    }, this.jP1 = e => {
      ModelManager_1.ModelManager.RacingBetsModel.SetRacingBetsBulletScreenShowType(2), this.ke1.SetBulletScreenShowType(2), this.GetExtendToggle(36).SetToggleStateForce(0)
    }, this.HP1 = e => {
      ModelManager_1.ModelManager.RacingBetsModel.SetRacingBetsBulletScreenShowType(1), this.ke1.SetBulletScreenShowType(1), this.GetExtendToggle(35).SetToggleStateForce(0)
    }, this.lyt = () => {
      var e;
      this.HD1 ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Dango_InGame_ExitError") : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(308)).FunctionMap.set(2, () => {
        ModelManager_1.ModelManager.RacingBetsModel.RacingBetsAbortDungeon(), this.HD1 = !0
      }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e))
    }, this.Dkc = () => {
      UiManager_1.UiManager.OpenView("RacingBetsDangoSkillView", this.Ckc)
    }, this.P01 = e => {
      this.A01 > TimeUtil_1.TimeUtil.GetServerTimeStamp() ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Dango_BulletChat_SendError") : (this.A01 = TimeUtil_1.TimeUtil.GetServerTimeStamp() + this.w01, RacingBetsController_1.RacingBetsController.RacingBetsBulletScreenRequest(e.Id))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIExtendToggle],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UIItem],
      [9, UE.UIExtendToggle],
      [10, UE.UIExtendToggle],
      [12, UE.UIScrollViewWithScrollbarComponent],
      [11, UE.UIScrollViewWithScrollbarComponent],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UITexture],
      [16, UE.UIItem],
      [17, UE.UIHorizontalLayout],
      [18, UE.UIItem],
      [19, UE.UIItem],
      [20, UE.UIText],
      [21, UE.UIHorizontalLayout],
      [22, UE.UIButtonComponent],
      [23, UE.UIText],
      [24, UE.UIItem],
      [25, UE.UIItem],
      [26, UE.UIItem],
      [27, UE.UIItem],
      [28, UE.UIItem],
      [29, UE.UIItem],
      [30, UE.UIButtonComponent],
      [31, UE.UIButtonComponent],
      [32, UE.UIItem],
      [33, UE.UIText],
      [34, UE.UISliderComponent],
      [35, UE.UIExtendToggle],
      [36, UE.UIExtendToggle],
      [37, UE.UIItem],
      [38, UE.UIItem],
      [39, UE.UIItem],
      [40, UE.UIItem],
      [41, UE.UIItem],
      [42, UE.UIItem],
      [43, UE.UISprite]
    ], this.BtnBindInfo = [
      [2, this.Akc],
      [3, this.x01],
      [4, this.U01],
      [6, this.lyt],
      [7, this.Dkc],
      [9, this.D01],
      [10, this.sNc],
      [22, this.Ov1],
      [30, this.FP1],
      [31, this.VP1],
      [34, this.NP1],
      [35, this.jP1],
      [36, this.HP1]
    ]
  }
  async OnBeforeStartAsync() {
    var e = [],
      i = (this.Ckc = ModelManager_1.ModelManager.RacingBetsModel.GetDungeonDangoList(), this.iT1 = new RacingBetsDangoRankPanel_1.RacingBetsDangoRankPanel, await this.iT1.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), await this.iT1.InitAsync(this.Ckc), this.ZFc = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(12), this.tNc), ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsBulletScreen(1)),
      i = (e.push(this.ZFc.RefreshByDataAsync(i)), this.eNc = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(11), this.iNc), ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsBulletScreen(2));
    e.push(this.eNc.RefreshByDataAsync(i)), this.ke1 = new RacingBetsBulletScreenPanel_1.RacingBetsBulletScreenPanel, e.push(this.ke1.CreateThenShowByActorAsync(this.GetItem(14).GetOwner())), e.push(this.LT1()), e.push(this.UL1()), await Promise.all(e), this.w01 = CommonParamById_1.configCommonParamById.GetIntConfig("DangoRaceBulletChatCoolDown"), this.xv1 = ConfigCommon_1.ConfigCommon.ToList(CommonParamById_1.configCommonParamById.GetIntArrayConfig("DangoRaceReplaySpeed")), this.$P1(), this.Hqe()
  }
  async LT1() {
    var i = [];
    for (let e = 0; e < DANGO_ORDER_ITEM_COUNT; e++) {
      var t = this.GetItem(DANGO_ORDER_ITEM_START_INDEX + e),
        s = new RacingBetsDangoOrderItem_1.RacingBetsDangoOrderItem;
      i.push(s.CreateThenShowByActorAsync(t.GetOwner())), this.IT1.push(s)
    }
    await Promise.all(i)
  }
  async UL1() {
    var i = [];
    for (let e = 0; e < DANGO_DICE_ITEM_COUNT; e++) {
      var t = this.GetItem(DANGO_DICE_ITEM_START_INDEX + e),
        s = new RacingBetsDangoDiceItem_1.RacingBetsDangoDiceItem;
      i.push(s.CreateThenShowByActorAsync(t.GetOwner())), this.DL1.push(s)
    }
    await Promise.all(i)
  }
  $P1() {
    this.R01 = !1, this.L01 = !1, this.GP1 = !1, this.GetItem(5).SetUIActive(!1), this.GetItem(8).SetUIActive(!1), this.GetItem(32).SetUIActive(!1), this.GetButton(30).RootUIComp.SetUIActive(!1);
    var e = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsBulletScreenAlpha(),
      i = this.GetSlider(34),
      i = (i.MaxValue = RacingBetsDefine_1.RACING_BETS_BULLET_SCREEN_MAX_ALPHA, i.MinValue = RacingBetsDefine_1.RACING_BETS_BULLET_SCREEN_MIN_ALPHA, i.Value = e, this.ke1.GetRootItem().SetAlpha(e / 100), ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsBulletScreenShowType()),
      t = 2 === i,
      s = this.GetExtendToggle(35),
      n = this.GetExtendToggle(36);
    s.SetToggleStateForce(t ? 1 : 0), s.bLockStateOnSelect = !0, n.SetToggleStateForce(t ? 0 : 1), n.bLockStateOnSelect = !0, this.ke1.SetBulletScreenShowType(i), this.GetText(33).SetText(e + "%")
  }
  Hqe() {
    var e = ModelManager_1.ModelManager.RacingBetsModel.IsReplayDungeon;
    this.GetItem(13).SetUIActive(!1), this.GetExtendToggle(9).SetToggleStateForce(1), this.GetExtendToggle(10).SetToggleStateForce(0), this.R01 = !1, this.L01 = !1, this.GetItem(5).SetUIActive(!1), this.GetItem(8).SetUIActive(!1), this.GetButton(22).RootUIComp.SetUIActive(e);
    const i = this.GetSprite(43);
    i.SetUIActive(!1);
    var t = e ? "SP_RaceScheduleTitleBgRec" : "SP_RaceScheduleTitleBg",
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetSpriteByPath(t, i, !1, void 0, e => {
      i.SetUIActive(e)
    }), e && (t = this.xv1[this.Pv1], UE.GameplayStatics.SetGlobalTimeDilation(GlobalData_1.GlobalData.World, t), this.GetText(23).SetText("×" + t.toFixed(1)))
  }
  AT1(i) {
    for (let e = 0; e < i.length; e++) this.IT1[e].Refresh(i[e]), this.IT1[e].SetActive(!0);
    if (this.IT1.length > i.length)
      for (let e = i.length; e < this.IT1.length; e++) this.IT1[e].SetActive(!1)
  }
  BL1(i) {
    for (let e = 0; e < i.length; e++) this.DL1[e].Refresh(i[e]);
    if (this.DL1.length > i.length)
      for (let e = i.length; e < this.DL1.length; e++) this.DL1[e].SetActive(!1)
  }
  Mk1(e) {
    this.GP1 !== e && ((this.GP1 = e) ? (this.UiViewSequence.HasSequenceNameInPlaying("FuncHide03") && this.UiViewSequence.StopSequenceByKey("FuncHide03"), this.PlaySequence("FuncShow03")) : (this.UiViewSequence.HasSequenceNameInPlaying("FuncShow03") && this.UiViewSequence.StopSequenceByKey("FuncShow03"), this.PlaySequence("FuncHide03")))
  }
  Sk1(e) {
    this.L01 !== e && ((this.L01 = e) ? (this.UiViewSequence.HasSequenceNameInPlaying("FuncHide02") && this.UiViewSequence.StopSequenceByKey("FuncHide02"), this.PlaySequence("FuncShow02")) : (this.UiViewSequence.HasSequenceNameInPlaying("FuncShow02") && this.UiViewSequence.StopSequenceByKey("FuncShow02"), this.PlaySequence("FuncHide02")))
  }
  Ek1(e) {
    this.R01 !== e && ((this.R01 = e) ? (this.UiViewSequence.HasSequenceNameInPlaying("FuncHide01") && this.UiViewSequence.StopSequenceByKey("FuncHide01"), this.PlaySequence("FuncShow01")) : (this.UiViewSequence.HasSequenceNameInPlaying("FuncShow01") && this.UiViewSequence.StopSequenceByKey("FuncShow01"), this.PlaySequence("FuncHide01")))
  }
  PushCameraHandle(e, i, t) {
    UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(e, i, !0)
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsDiceAnim, this.RT1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsDangoOrderRefresh, this.TT1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsPushBulletScreen, this.Oe1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsDungeonDangoRankChange, this.Fo1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsDiceAnim, this.RT1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsDangoOrderRefresh, this.TT1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsPushBulletScreen, this.Oe1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsDungeonDangoRankChange, this.Fo1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo)
  }
  PopCameraHandle(e, i, t, s) {
    UiCameraAnimationController_1.UiCameraAnimationController.DeepCopyCamera(CameraController_1.CameraController.FreeCamera.DisplayComponent.CameraActor), CameraController_1.CameraController.SetViewTarget(UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera?.GetCameraActor(), "RacingBetsGamePlayView"), UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(e, i, t, s)
  }
  OnBeforeDestroy() {
    UE.GameplayStatics.SetGlobalTimeDilation(GlobalData_1.GlobalData.World, 1)
  }
  async bT1(e, i, t) {
    this.GetText(20).SetText(e.toString().padStart(2, "0")), this.AT1(i), this.GetItem(18).SetUIActive(!0), i.length === RacingBetsDefine_1.RACING_BETS_FOUR_DANGO ? await this.PlaySequenceAsync("OrderInB", !1, !1, Time_1.Time.TimeDilation) : await this.PlaySequenceAsync("OrderInA", !1, !1, Time_1.Time.TimeDilation), this.GetItem(18).SetUIActive(!1), this.BL1(i), t.SetResult(void 0)
  }
  async wT1(e, i) {
    var t = [];
    t.push(this.PlaySequenceAsync("DiceAnim", !1, !1, Time_1.Time.TimeDilation)), e === RacingBetsDefine_1.RACING_BETS_FOUR_DANGO ? t.push(this.PlaySequenceAsync("OrderOutB", !1, !1, Time_1.Time.TimeDilation)) : t.push(this.PlaySequenceAsync("OrderOutA", !1, !1, Time_1.Time.TimeDilation)), await Promise.all(t), i.SetResult(void 0)
  }
  async rT1(e) {
    await this.iT1.RefreshRankItemAsync(), e.SetResult(void 0)
  }
}
exports.RacingBetsGamePlayView = RacingBetsGamePlayView;
//# sourceMappingURL=RacingBetsGamePlayView.js.map
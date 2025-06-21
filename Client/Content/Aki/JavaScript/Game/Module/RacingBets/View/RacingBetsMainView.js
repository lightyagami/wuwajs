"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RacingBetsMainView = void 0;
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../../Core/Common/Info"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CommonCurrencyItem_1 = require("../../Common/CommonCurrencyItem"),
  DangoManager_1 = require("../../Dango/DangoLogic/DangoManager"),
  InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  UiCameraAnimationController_1 = require("../../UiCameraAnimation/UiCameraAnimationController"),
  UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  UiModelUtil_1 = require("../../UiModel/UiModelUtil"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RacingBetsController_1 = require("../RacingBetsController"),
  RacingBetsDefine_1 = require("../RacingBetsDefine"),
  RacingBetsButtonItem_1 = require("./Item/RacingBetsButtonItem"),
  RacingBetsChampionRewardItem_1 = require("./Item/RacingBetsChampionRewardItem"),
  RacingBetsCostItem_1 = require("./Item/RacingBetsCostItem"),
  RacingBetsDangoBroadcastItem_1 = require("./Item/RacingBetsDangoBroadcastItem"),
  RacingBetsLegMatchResultItem_1 = require("./Item/RacingBetsLegMatchResultItem"),
  RacingBetsLegMatchTabItem_1 = require("./Item/RacingBetsLegMatchTabItem");
class RacingBetsMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.UOt = !0, this.mDc = StringUtils_1.EMPTY_STRING, this.fDc = 2, this.qe1 = 0, this.ETc = void 0, this.wTc = void 0, this.Tr1 = void 0, this.RTc = void 0, this.ATc = void 0, this.A3o = void 0, this.zxc = void 0, this.qS1 = void 0, this.M11 = void 0, this.Gv1 = void 0, this.PTc = void 0, this.Ge1 = [], this.Ik1 = [], this.Fe1 = [], this.pd1 = void 0, this.ha1 = void 0, this.la1 = void 0, this._a1 = void 0, this.ca1 = void 0, this.da1 = void 0, this.ua1 = void 0, this.xTc = () => new RacingBetsLegMatchResultItem_1.RacingBetsLegMatchResultItem, this.GS1 = void 0, this.Ne1 = () => {
      this.CDc(this.Ge1, this.wTc)
    }, this.kL1 = () => {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_fx_spl_rsnt_weapon_cam_in"), UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(this.mDc, !0, !0, "1001")
    }, this.mmo = t => {
      t.HandleName === this.mDc && this.UOt && (RacingBetsController_1.RacingBetsController.TryStartRacingBetsGaming(this.wTc.Id), this.UOt = !1)
    }, this.vd1 = () => {
      this.ewa()
    }, this.Ve1 = (t, i) => {
      this.je1(t, i)
    }, this.DTc = () => {
      var t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(0);
      t && (t = UiSceneManager_1.UiSceneManager.RayTraceDangoActor(t)) && (t = {
        SelectDangoId: (t.Model?.CheckGetComponent(25)).DangoId,
        LegMatchData: this.wTc,
        DangoActorList: this.Ge1
      }, AudioSystem_1.AudioSystem.PostEvent("play_ui_tuanzi_saima_click_large"), UiManager_1.UiManager.OpenView("RacingBetsBettingView", t))
    }, this.lyt = () => {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest()
    }, this.UTc = () => {
      var t = this.ETc?.GetGroupRewardData(1),
        i = this.ETc?.GetGroupRewardData(3);
      UiManager_1.UiManager.OpenView("RacingBetsActivityRewardView", [t, i])
    }, this.BTc = () => {
      var t = this.ETc?.GetGroupRewardData(2);
      UiManager_1.UiManager.OpenView("RacingBetsRewardView", [t])
    }, this.kTc = () => {
      UiManager_1.UiManager.OpenView("RacingBetsHistoryView")
    }, this.OTc = () => {
      RacingBetsController_1.RacingBetsController.RacingBetsRankRequest(this.ETc.Id, () => {
        UiManager_1.UiManager.OpenView("RacingBetsRankView")
      }), ModelManager_1.ModelManager.RacingBetsModel.SetViewRedDotState(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsRankViewRecord)
    }, this.qTc = () => {
      ModelManager_1.ModelManager.RacingBetsModel.SetViewRedDotState(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsMatchViewRecord), UiManager_1.UiManager.OpenView("RacingBetsMatchView")
    }, this.GTc = () => {
      RacingBetsController_1.RacingBetsController.RacingBetMatchActionRequest(this.ETc.Id, this.wTc.Id), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsReplayGameRecord, this.wTc.Id)
    }, this.E11 = () => {
      RacingBetsController_1.RacingBetsController.RacingBetsMatchInfoRequest(this.ETc.Id, this.wTc.Id)
    }, this.FTc = () => {
      var t;
      0 === this.qe1 || 2 === this.qe1 ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Dango_MainPage_MatchNotStart") : 1 === this.qe1 ? (t = {
        SelectDangoId: (this.Ge1[0].Model?.CheckGetComponent(25)).DangoId,
        LegMatchData: this.wTc,
        DangoActorList: this.Ge1
      }, UiManager_1.UiManager.OpenView("RacingBetsBettingView", t)) : (RacingBetsController_1.RacingBetsController.RacingBetMatchActionRequest(this.ETc.Id, this.wTc.Id), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsWatchGameRecord, this.wTc.Id))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [14, UE.UIText],
      [15, UE.UIVerticalLayout],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UIText],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIText],
      [22, UE.UITexture],
      [23, UE.UIItem],
      [24, UE.UIText],
      [25, UE.UIItem],
      [26, UE.UIItem],
      [27, UE.UIItem],
      [28, UE.UIItem],
      [29, UE.UIItem],
      [30, UE.UIItem],
      [31, UE.UIText],
      [32, UE.UIButtonComponent],
      [33, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.DTc],
      [1, this.lyt],
      [32, this.E11]
    ]
  }
  async OnBeforeStartAsync() {
    this.ETc = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    var t = this.ETc.GetCurLegMatchDataIndex();
    this.wTc = this.ETc.GetLegMatchDataByIndex(t), this.Tr1 = this.ETc.GetLegMatchDataByIndex(t + 1), this.qe1 = this.wTc.GetLegMatchState(), this.fDc = this.wTc.GetRacingBetsMainViewActorShowType(this.qe1), this.mDc = this.wTc.GetMainViewCameraHandleName(this.fDc), await Promise.all([this.iqi(), this.gDc()]), this.ma1()
  }
  async iqi() {
    var t = [];
    this.RTc = new RacingBetsLegMatchTabItem_1.RacingBetsLegMatchTabItem, t.push(this.RTc.CreateThenShowByActorAsync(this.GetItem(9).GetOwner())), this.ATc = new RacingBetsLegMatchTabItem_1.RacingBetsLegMatchTabItem, t.push(this.ATc.CreateThenShowByActorAsync(this.GetItem(10).GetOwner())), this.PTc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(15), this.xTc), this.A3o = new CommonCurrencyItem_1.CommonCurrencyItem, t.push(this.A3o.CreateThenShowByActorAsync(this.GetItem(2).GetOwner())), this.zxc = new RacingBetsCostItem_1.RacingBetsCostItem, t.push(this.zxc.CreateThenShowByActorAsync(this.GetItem(23).GetOwner())), this.qS1 = new RacingBetsCostItem_1.RacingBetsCostItem, t.push(this.qS1.CreateThenShowByActorAsync(this.GetItem(33).GetOwner())), this.pd1 = new RacingBetsButtonItem_1.RacingBetsButtonItem, t.push(this.pd1.CreateThenShowByActorAsync(this.GetItem(16).GetOwner())), this.ha1 = new RacingBetsButtonItem_1.RacingBetsButtonItem, t.push(this.ha1.CreateThenShowByActorAsync(this.GetItem(26).GetOwner())), this.la1 = new RacingBetsButtonItem_1.RacingBetsButtonItem, t.push(this.la1.CreateThenShowByActorAsync(this.GetItem(8).GetOwner())), this._a1 = new RacingBetsButtonItem_1.RacingBetsButtonItem, t.push(this._a1.CreateThenShowByActorAsync(this.GetItem(7).GetOwner())), this.ca1 = new RacingBetsButtonItem_1.RacingBetsButtonItem, t.push(this.ca1.CreateThenShowByActorAsync(this.GetItem(11).GetOwner())), this.da1 = new RacingBetsButtonItem_1.RacingBetsButtonItem, t.push(this.da1.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())), this.ua1 = new RacingBetsButtonItem_1.RacingBetsButtonItem, t.push(this.ua1.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())), this.M11 = new RacingBetsChampionRewardItem_1.RacingBetsChampionRewardItem, t.push(this.M11.CreateThenShowByActorAsync(this.GetItem(29).GetOwner())), this.Gv1 = new RacingBetsDangoBroadcastItem_1.RacingBetsDangoBroadcastItem, t.push(this.Gv1.CreateThenShowByActorAsync(this.GetItem(17).GetOwner())), await Promise.all(t)
  }
  ma1() {
    this.da1.BindRedDot("RedDotRacingBetsActivityInternalReward"), this.ua1.BindRedDot("RedDotRacingBetsActivityReward"), this._a1.SetRedDotVisible(!1), this.pd1.SetFunction(this.GTc), this.ha1.SetFunction(this.FTc), this.la1.SetFunction(this.OTc), this._a1.SetFunction(this.kTc), this.ca1.SetFunction(this.qTc), this.da1.SetFunction(this.BTc), this.ua1.SetFunction(this.UTc)
  }
  PushCameraHandle(t, i, e) {
    UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(RacingBetsDefine_1.CAMERA_DANGO_PREVIEW_START, i, e)
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.kL1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsDangoOddsUpdate, this.Ne1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsMatchStateChange, this.Ve1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsRedDotUpdate, this.vd1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo)
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.RacingBetsModel.IsFinalLegMatch(this.wTc.Id) && 4 === this.qe1 && this.PlaySequence("Champion"), this.Hqe()
  }
  OnAfterShow() {
    this.No1(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsViewAfterShow), RacingBetsController_1.RacingBetsController.TryOpenRacingBetsLegMatchResultView() || this.UOt || RacingBetsController_1.RacingBetsController.TryStartRacingBetsGaming(this.wTc.Id)
  }
  Hqe() {
    this.RTc.RefreshUi(this.wTc), this.ATc.RefreshUi(this.Tr1), this.Gv1.Init(this.wTc), this.tBa(this.ETc), this.NTc(this.wTc), this.VTc(this.wTc), this.jTc(this.wTc), this.B01(this.wTc), this.nu1(this.wTc), this.ewa()
  }
  tBa(t) {
    this.A3o.RefreshTemp(t.GetCurrencyItemId(), t.GetCurrencyCount().toString()), this.A3o.SetButtonActive(!1)
  }
  NTc(t) {
    var i = this.qe1,
      e = ModelManager_1.ModelManager.RacingBetsModel.IsFinalLegMatch(t.Id),
      i = 4 === i;
    this.GetItem(27).SetUIActive(!e && i), this.GetItem(28).SetUIActive(e && i), this.GetItem(30).SetUIActive(e && i), this.GetItem(12).SetUIActive(i), i && (e ? this.I11(t) : this.T11(t))
  }
  T11(t) {
    var i = t.GetLegMatchResultList();
    this.GetText(14).ShowTextNew(t.Name), this.PTc.RefreshByData(i)
  }
  I11(t) {
    this.M11.Refresh(this.ETc.GetSeasonConfig().EndReward);
    t = t.GetChampionDangoId(), t = DangoManager_1.DangoManager.GetDangoData(t);
    this.GetText(31).ShowTextNew(t.NameKey)
  }
  VTc(t) {
    var i = this.qe1;
    1 !== i && 2 !== i && 3 !== i ? this.GetItem(19).SetUIActive(!1) : (this.GetItem(19).SetUIActive(!0), t.HasBetting ? (this.GetItem(20).SetUIActive(!0), this.GetItem(25).SetUIActive(!1), this.GetText(24).SetText("×" + t.Odds / 100), i = this.ETc.GetCurrencyItemId(), this.zxc.RefreshUi(i, t.BetGearCash), this.qS1.RefreshUi(i, t.GetOddsRewardCount())) : (this.GetItem(20).SetUIActive(!1), this.GetItem(25).SetUIActive(!0)))
  }
  jTc(t) {
    var i = t.GetLegMatchState(),
      e = this.GetText(3);
    let s = 0;
    3 !== i && (s = t.GetLegRemindTime()), 0 === i || 1 === i ? e.ShowTextNew("Dango_MainPage_StatusTime_Bet") : 2 === i ? e.ShowTextNew("Dango_MainPage_StatusTime_Wait") : 3 === i ? e.ShowTextNew("Dango_MainPage_StatusTime_Race") : 4 === i && (ModelManager_1.ModelManager.RacingBetsModel.IsFinalLegMatch(t.Id) ? e.ShowTextNew("Dango_MainPage_StatusTime_FinalRaceEnd") : e.ShowTextNew("Dango_MainPage_StatusTime_RaceEnd")), 0 < s ? ((i = this.GetText(4)).SetText(TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(s).CountDownText), i.SetUIActive(!0)) : this.GetText(4).SetUIActive(!1)
  }
  B01(t) {
    4 === this.qe1 ? AudioSystem_1.AudioSystem.SetState(RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP, "race_finals") : AudioSystem_1.AudioSystem.SetState(RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP, "none")
  }
  nu1(t) {
    var i = this.qe1,
      e = 1 === i,
      t = 2 === t.Type;
    this.GetButton(0).SetSelfInteractive(e), this.GetButton(32).RootUIComp.SetUIActive(e && t), this.ha1.SetActive(4 !== i)
  }
  ewa() {
    if (this.wTc) {
      var i = this.wTc.GetLegMatchState(),
        e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsMatchViewRecord),
        e = (this.ca1.SetRedDotVisible(!(e?.HasViewed ?? !0)), LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsRankViewRecord)),
        s = this.ETc.CheckRankOpen(),
        e = (this.la1.SetRedDotVisible(!(e?.HasViewed ?? !0) && s), LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsReplayGameRecord) ?? 0);
      this.pd1.SetRedDotVisible(4 === i && this.wTc.Id > e);
      let t = !1;
      s = this.wTc.BetDangoId;
      1 === i ? t = 0 === s : 3 === i && (e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsWatchGameRecord) ?? 0, t = this.wTc.Id > e), this.ha1.SetRedDotVisible(t)
    }
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.kL1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsDangoOddsUpdate, this.Ne1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsMatchStateChange, this.Ve1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsRedDotUpdate, this.vd1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo)
  }
  PopCameraHandle(t, i, e, s) {
    UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(RacingBetsDefine_1.CAMERA_DANGO_PREVIEW_START, i, e, s)
  }
  OnBeforeHide() {
    this.pDc(this.Ge1, !1)
  }
  OnAfterHide() {
    this.GS1 && (UiModelUtil_1.UiModelUtil.SelectDangoActor(this.GS1, !1), this.GS1 = void 0)
  }
  OnBeforeDestroy() {
    this.a3c()
  }
  async gDc() {
    var t;
    0 === this.fDc ? (t = this.wTc.GetChampionDangoActorData(), this.He1(), this.Fe1 = await UiSceneManager_1.UiSceneManager.LoadDangoActorList([t])) : (t = this.wTc.GetDangoActorDataList(), this.Ik1 !== t && (this.$e1(), this.Ik1 = t, this.Ge1 = await UiSceneManager_1.UiSceneManager.LoadDangoActorList(this.Ik1)))
  }
  No1() {
    0 !== this.fDc && (this.CDc(this.Ge1, this.wTc), this.pDc(this.Ge1, !0))
  }
  CDc(i, e) {
    var s = 2 === e.Type;
    for (let t = 0; t < i.length; t++) {
      var a = i[t],
        n = a.Model.CheckGetComponent(25),
        h = e.GetDangoActorData(n.DangoId),
        a = a.Model.CheckGetComponent(26),
        r = s ? t + 1 : 0,
        n = e.BetDangoId === n.DangoId;
      a.SetOffset(h.DangoOffset), a.Refresh(h.Odds / 100, r, n)
    }
  }
  pDc(t, i) {
    for (const e of t) e.Model.CheckGetComponent(26).SetVisible(i)
  }
  a3c() {
    this.$e1(), this.He1()
  }
  $e1() {
    if (0 !== this.Ge1.length) {
      for (const t of this.Ge1) UiSceneManager_1.UiSceneManager.DestroyDangoActor(t);
      this.Ge1 = []
    }
  }
  He1() {
    if (0 !== this.Fe1.length) {
      for (const t of this.Fe1) UiSceneManager_1.UiSceneManager.DestroyDangoActor(t);
      this.Fe1 = []
    }
  }
  OnTick(t) {
    var i;
    this.jTc(this.wTc), this.Gv1.OnTick(t), this.FS1(), ModelManager_1.ModelManager.RacingBetsModel.UseGmState || !(t = this.ETc.GetCurLegMatchData()) || (i = this.wTc.GetLegMatchState()) === this.qe1 && t.Id === this.wTc.Id || this.je1(t.Id, i)
  }
  FS1() {
    var t;
    Info_1.Info.IsInKeyBoard() && (t = this.wTc.GetLegMatchState(), this.IsShowOrShowing && 1 === t ? (t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(0)) && (t = UiSceneManager_1.UiSceneManager.RayTraceDangoActor(t)) !== this.GS1 && (t ? (this.GS1 && UiModelUtil_1.UiModelUtil.SelectDangoActor(this.GS1, !1), this.GS1 = t, UiModelUtil_1.UiModelUtil.SelectDangoActor(this.GS1, !0)) : (this.GS1 && UiModelUtil_1.UiModelUtil.SelectDangoActor(this.GS1, !1), this.GS1 = void 0)) : this.GS1 && (UiModelUtil_1.UiModelUtil.SelectDangoActor(this.GS1, !1), this.GS1 = void 0))
  }
  async je1(t, i) {
    UiLayer_1.UiLayer.SetShowMaskLayer("RacingBetsMainView", !0), this.wTc = this.ETc.GetLegMatchData(t), this.Tr1 = this.ETc.GetNextLegMatchData(t), this.qe1 = i, this.fDc = this.wTc.GetRacingBetsMainViewActorShowType(this.qe1), await this.gDc(), this.Hqe(), this.No1(), this.mDc = this.wTc.GetMainViewCameraHandleName(this.fDc), ModelManager_1.ModelManager.RacingBetsModel.IsFinalLegMatch(t) && 4 === this.qe1 && this.PlaySequence("Champion"), UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(this.mDc, !0, !0, "1001"), UiLayer_1.UiLayer.SetShowMaskLayer("RacingBetsMainView", !1), this.ewa()
  }
}
exports.RacingBetsMainView = RacingBetsMainView;
//# sourceMappingURL=RacingBetsMainView.js.map
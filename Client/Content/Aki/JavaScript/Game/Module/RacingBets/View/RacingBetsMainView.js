"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsMainView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../../Core/Common/Info");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonCurrencyItem_1 = require("../../Common/CommonCurrencyItem");
const DangoManager_1 = require("../../Dango/DangoLogic/DangoManager");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const UiCameraAnimationController_1 = require("../../UiCameraAnimation/UiCameraAnimationController");
const UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../UiModel/UiModelUtil");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RacingBetsController_1 = require("../RacingBetsController");
const RacingBetsDefine_1 = require("../RacingBetsDefine");
const RacingBetsButtonItem_1 = require("./Item/RacingBetsButtonItem");
const RacingBetsChampionRewardItem_1 = require("./Item/RacingBetsChampionRewardItem");
const RacingBetsCostItem_1 = require("./Item/RacingBetsCostItem");
const RacingBetsDangoBroadcastItem_1 = require("./Item/RacingBetsDangoBroadcastItem");
const RacingBetsLegMatchResultItem_1 = require("./Item/RacingBetsLegMatchResultItem");
const RacingBetsLegMatchTabItem_1 = require("./Item/RacingBetsLegMatchTabItem");
class RacingBetsMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.UOt = true;
    this.mDc = StringUtils_1.EMPTY_STRING;
    this.fDc = 2;
    this.rt1 = 0;
    this.ETc = undefined;
    this.wTc = undefined;
    this.$r1 = undefined;
    this.RTc = undefined;
    this.ATc = undefined;
    this.A3o = undefined;
    this.zxc = undefined;
    this.hM1 = undefined;
    this.$11 = undefined;
    this.ly1 = undefined;
    this.PTc = undefined;
    this.ot1 = [];
    this.tO1 = [];
    this.nt1 = [];
    this.Nd1 = undefined;
    this.Pa1 = undefined;
    this.xa1 = undefined;
    this.Da1 = undefined;
    this.Ua1 = undefined;
    this.ka1 = undefined;
    this.Ba1 = undefined;
    this.xTc = () => new RacingBetsLegMatchResultItem_1.RacingBetsLegMatchResultItem();
    this.lM1 = undefined;
    this.st1 = () => {
      this.CDc(this.ot1, this.wTc);
    };
    this.hw1 = () => {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_fx_spl_rsnt_weapon_cam_in");
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(this.mDc, true, true, "1001");
    };
    this.mmo = t => {
      if (t.HandleName === this.mDc && this.UOt) {
        RacingBetsController_1.RacingBetsController.TryStartRacingBetsGaming(this.wTc.Id);
        this.UOt = false;
      }
    };
    this.Vd1 = () => {
      this.ewa();
    };
    this.at1 = (t, i) => {
      this.ht1(t, i);
    };
    this.DTc = () => {
      var t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(0);
      if (t &&= UiSceneManager_1.UiSceneManager.RayTraceDangoActor(t)) {
        t = {
          SelectDangoId: (t.Model?.CheckGetComponent(25)).DangoId,
          LegMatchData: this.wTc,
          DangoActorList: this.ot1
        };
        AudioSystem_1.AudioSystem.PostEvent("play_ui_tuanzi_saima_click_large");
        UiManager_1.UiManager.OpenView("RacingBetsBettingView", t);
      }
    };
    this.lyt = () => {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
    };
    this.UTc = () => {
      var t = this.ETc?.GetGroupRewardData(1);
      var i = this.ETc?.GetGroupRewardData(3);
      UiManager_1.UiManager.OpenView("RacingBetsActivityRewardView", [t, i]);
    };
    this.BTc = () => {
      var t = this.ETc?.GetGroupRewardData(2);
      UiManager_1.UiManager.OpenView("RacingBetsRewardView", [t]);
    };
    this.kTc = () => {
      UiManager_1.UiManager.OpenView("RacingBetsHistoryView");
    };
    this.OTc = () => {
      RacingBetsController_1.RacingBetsController.RacingBetsRankRequest(this.ETc.Id, () => {
        UiManager_1.UiManager.OpenView("RacingBetsRankView");
      });
      ModelManager_1.ModelManager.RacingBetsModel.SetViewRedDotState(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsRankViewRecord);
    };
    this.qTc = () => {
      ModelManager_1.ModelManager.RacingBetsModel.SetViewRedDotState(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsMatchViewRecord);
      UiManager_1.UiManager.OpenView("RacingBetsMatchView");
    };
    this.GTc = () => {
      RacingBetsController_1.RacingBetsController.RacingBetMatchActionRequest(this.ETc.Id, this.wTc.Id);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsReplayGameRecord, this.wTc.Id);
    };
    this.W11 = () => {
      RacingBetsController_1.RacingBetsController.RacingBetsMatchInfoRequest(this.ETc.Id, this.wTc.Id);
    };
    this.FTc = () => {
      var t;
      if (this.rt1 === 0 || this.rt1 === 2) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Dango_MainPage_MatchNotStart");
      } else if (this.rt1 === 1) {
        t = {
          SelectDangoId: (this.ot1[0].Model?.CheckGetComponent(25)).DangoId,
          LegMatchData: this.wTc,
          DangoActorList: this.ot1
        };
        UiManager_1.UiManager.OpenView("RacingBetsBettingView", t);
      } else {
        RacingBetsController_1.RacingBetsController.RacingBetMatchActionRequest(this.ETc.Id, this.wTc.Id);
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsWatchGameRecord, this.wTc.Id);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [14, UE.UIText], [15, UE.UIVerticalLayout], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIText], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIText], [22, UE.UITexture], [23, UE.UIItem], [24, UE.UIText], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIItem], [31, UE.UIText], [32, UE.UIButtonComponent], [33, UE.UIItem]];
    this.BtnBindInfo = [[0, this.DTc], [1, this.lyt], [32, this.W11]];
  }
  async OnBeforeStartAsync() {
    this.ETc = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    var t = this.ETc.GetCurLegMatchDataIndex();
    this.wTc = this.ETc.GetLegMatchDataByIndex(t);
    this.$r1 = this.ETc.GetLegMatchDataByIndex(t + 1);
    this.rt1 = this.wTc.GetLegMatchState();
    this.fDc = this.wTc.GetRacingBetsMainViewActorShowType(this.rt1);
    this.mDc = this.wTc.GetMainViewCameraHandleName(this.fDc);
    await Promise.all([this.iqi(), this.gDc()]);
    this.Oa1();
  }
  async iqi() {
    var t = [];
    this.RTc = new RacingBetsLegMatchTabItem_1.RacingBetsLegMatchTabItem();
    t.push(this.RTc.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()));
    this.ATc = new RacingBetsLegMatchTabItem_1.RacingBetsLegMatchTabItem();
    t.push(this.ATc.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()));
    this.PTc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(15), this.xTc);
    this.A3o = new CommonCurrencyItem_1.CommonCurrencyItem();
    t.push(this.A3o.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    this.zxc = new RacingBetsCostItem_1.RacingBetsCostItem();
    t.push(this.zxc.CreateThenShowByActorAsync(this.GetItem(23).GetOwner()));
    this.hM1 = new RacingBetsCostItem_1.RacingBetsCostItem();
    t.push(this.hM1.CreateThenShowByActorAsync(this.GetItem(33).GetOwner()));
    this.Nd1 = new RacingBetsButtonItem_1.RacingBetsButtonItem();
    t.push(this.Nd1.CreateThenShowByActorAsync(this.GetItem(16).GetOwner()));
    this.Pa1 = new RacingBetsButtonItem_1.RacingBetsButtonItem();
    t.push(this.Pa1.CreateThenShowByActorAsync(this.GetItem(26).GetOwner()));
    this.xa1 = new RacingBetsButtonItem_1.RacingBetsButtonItem();
    t.push(this.xa1.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    this.Da1 = new RacingBetsButtonItem_1.RacingBetsButtonItem();
    t.push(this.Da1.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    this.Ua1 = new RacingBetsButtonItem_1.RacingBetsButtonItem();
    t.push(this.Ua1.CreateThenShowByActorAsync(this.GetItem(11).GetOwner()));
    this.ka1 = new RacingBetsButtonItem_1.RacingBetsButtonItem();
    t.push(this.ka1.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    this.Ba1 = new RacingBetsButtonItem_1.RacingBetsButtonItem();
    t.push(this.Ba1.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()));
    this.$11 = new RacingBetsChampionRewardItem_1.RacingBetsChampionRewardItem();
    t.push(this.$11.CreateThenShowByActorAsync(this.GetItem(29).GetOwner()));
    this.ly1 = new RacingBetsDangoBroadcastItem_1.RacingBetsDangoBroadcastItem();
    t.push(this.ly1.CreateThenShowByActorAsync(this.GetItem(17).GetOwner()));
    await Promise.all(t);
  }
  Oa1() {
    this.ka1.BindRedDot("RedDotRacingBetsActivityInternalReward");
    this.Ba1.BindRedDot("RedDotRacingBetsActivityReward");
    this.Da1.SetRedDotVisible(false);
    this.Nd1.SetFunction(this.GTc);
    this.Pa1.SetFunction(this.FTc);
    this.xa1.SetFunction(this.OTc);
    this.Da1.SetFunction(this.kTc);
    this.Ua1.SetFunction(this.qTc);
    this.ka1.SetFunction(this.BTc);
    this.Ba1.SetFunction(this.UTc);
  }
  PushCameraHandle(t, i, e) {
    UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(RacingBetsDefine_1.CAMERA_DANGO_PREVIEW_START, i, e);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.hw1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsDangoOddsUpdate, this.st1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsMatchStateChange, this.at1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsRedDotUpdate, this.Vd1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
  }
  OnBeforeShow() {
    if (ModelManager_1.ModelManager.RacingBetsModel.IsFinalLegMatch(this.wTc.Id) && this.rt1 === 4) {
      this.PlaySequence("Champion");
    }
    this.Hqe();
  }
  OnAfterShow() {
    this.hn1();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsViewAfterShow);
    if (!RacingBetsController_1.RacingBetsController.TryOpenRacingBetsLegMatchResultView() && !this.UOt) {
      RacingBetsController_1.RacingBetsController.TryStartRacingBetsGaming(this.wTc.Id);
    }
  }
  Hqe() {
    this.RTc.RefreshUi(this.wTc);
    this.ATc.RefreshUi(this.$r1);
    this.ly1.Init(this.wTc);
    this.tBa(this.ETc);
    this.NTc(this.wTc);
    this.VTc(this.wTc);
    this.jTc(this.wTc);
    this.np1(this.wTc);
    this.Lu1(this.wTc);
    this.ewa();
  }
  tBa(t) {
    this.A3o.RefreshTemp(t.GetCurrencyItemId(), t.GetCurrencyCount().toString());
    this.A3o.SetButtonActive(false);
  }
  NTc(t) {
    var i = this.rt1;
    var e = ModelManager_1.ModelManager.RacingBetsModel.IsFinalLegMatch(t.Id);
    var i = i === 4;
    this.GetItem(27).SetUIActive(!e && i);
    this.GetItem(28).SetUIActive(e && i);
    this.GetItem(30).SetUIActive(e && i);
    this.GetItem(12).SetUIActive(i);
    if (i) {
      if (e) {
        this.Q11(t);
      } else {
        this.K11(t);
      }
    }
  }
  K11(t) {
    var i = t.GetLegMatchResultList();
    this.GetText(14).ShowTextNew(t.Name);
    this.PTc.RefreshByData(i);
  }
  Q11(t) {
    this.$11.Refresh(this.ETc.GetSeasonConfig().EndReward);
    t = t.GetChampionDangoId();
    t = DangoManager_1.DangoManager.GetDangoData(t);
    this.GetText(31).ShowTextNew(t.NameKey);
  }
  VTc(t) {
    var i = this.rt1;
    if (i !== 1 && i !== 2 && i !== 3) {
      this.GetItem(19).SetUIActive(false);
    } else {
      this.GetItem(19).SetUIActive(true);
      if (t.HasBetting) {
        this.GetItem(20).SetUIActive(true);
        this.GetItem(25).SetUIActive(false);
        this.GetText(24).SetText("×" + t.Odds / 100);
        i = this.ETc.GetCurrencyItemId();
        this.zxc.RefreshUi(i, t.BetGearCash);
        this.hM1.RefreshUi(i, t.GetOddsRewardCount());
      } else {
        this.GetItem(20).SetUIActive(false);
        this.GetItem(25).SetUIActive(true);
      }
    }
  }
  jTc(t) {
    var i = t.GetLegMatchState();
    var e = this.GetText(3);
    let s = 0;
    if (i !== 3) {
      s = t.GetLegRemindTime();
    }
    if (i === 0 || i === 1) {
      e.ShowTextNew("Dango_MainPage_StatusTime_Bet");
    } else if (i === 2) {
      e.ShowTextNew("Dango_MainPage_StatusTime_Wait");
    } else if (i === 3) {
      e.ShowTextNew("Dango_MainPage_StatusTime_Race");
    } else if (i === 4) {
      if (ModelManager_1.ModelManager.RacingBetsModel.IsFinalLegMatch(t.Id)) {
        e.ShowTextNew("Dango_MainPage_StatusTime_FinalRaceEnd");
      } else {
        e.ShowTextNew("Dango_MainPage_StatusTime_RaceEnd");
      }
    }
    if (s > 0) {
      (i = this.GetText(4)).SetText(TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(s).CountDownText);
      i.SetUIActive(true);
    } else {
      this.GetText(4).SetUIActive(false);
    }
  }
  np1(t) {
    if (this.rt1 === 4) {
      AudioSystem_1.AudioSystem.SetState(RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP, "race_finals");
    } else {
      AudioSystem_1.AudioSystem.SetState(RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP, "none");
    }
  }
  Lu1(t) {
    var i = this.rt1;
    var e = i === 1;
    var t = t.Type === 2;
    this.GetButton(0).SetSelfInteractive(e);
    this.GetButton(32).RootUIComp.SetUIActive(e && t);
    this.Pa1.SetActive(i !== 4);
  }
  ewa() {
    if (this.wTc) {
      var i = this.wTc.GetLegMatchState();
      var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsMatchViewRecord);
      this.Ua1.SetRedDotVisible(!(e?.HasViewed ?? true));
      var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsRankViewRecord);
      var s = this.ETc.CheckRankOpen();
      this.xa1.SetRedDotVisible(!(e?.HasViewed ?? true) && s);
      var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsReplayGameRecord) ?? 0;
      this.Nd1.SetRedDotVisible(i === 4 && this.wTc.Id > e);
      let t = false;
      s = this.wTc.BetDangoId;
      if (i === 1) {
        t = s === 0;
      } else if (i === 3) {
        e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsWatchGameRecord) ?? 0;
        t = this.wTc.Id > e;
      }
      this.Pa1.SetRedDotVisible(t);
    }
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.hw1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsDangoOddsUpdate, this.st1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsMatchStateChange, this.at1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsRedDotUpdate, this.Vd1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
  }
  PopCameraHandle(t, i, e, s) {
    UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(RacingBetsDefine_1.CAMERA_DANGO_PREVIEW_START, i, e, s);
  }
  OnBeforeHide() {
    this.pDc(this.ot1, false);
  }
  OnAfterHide() {
    if (this.lM1) {
      UiModelUtil_1.UiModelUtil.SelectDangoActor(this.lM1, false);
      this.lM1 = undefined;
    }
  }
  OnBeforeDestroy() {
    this.a3c();
  }
  async gDc() {
    var t;
    if (this.fDc === 0) {
      t = this.wTc.GetChampionDangoActorData();
      this.lt1();
      this.nt1 = await UiSceneManager_1.UiSceneManager.LoadDangoActorList([t]);
    } else {
      t = this.wTc.GetDangoActorDataList();
      if (this.tO1 !== t) {
        this._t1();
        this.tO1 = t;
        this.ot1 = await UiSceneManager_1.UiSceneManager.LoadDangoActorList(this.tO1);
      }
    }
  }
  hn1() {
    if (this.fDc !== 0) {
      this.CDc(this.ot1, this.wTc);
      this.pDc(this.ot1, true);
    }
  }
  CDc(i, e) {
    var s = e.Type === 2;
    for (let t = 0; t < i.length; t++) {
      var a = i[t];
      var n = a.Model.CheckGetComponent(25);
      var h = e.GetDangoActorData(n.DangoId);
      var a = a.Model.CheckGetComponent(26);
      var r = s ? t + 1 : 0;
      var n = e.BetDangoId === n.DangoId;
      a.SetOffset(h.DangoOffset);
      a.Refresh(h.Odds / 100, r, n);
    }
  }
  pDc(t, i) {
    for (const e of t) {
      e.Model.CheckGetComponent(26).SetVisible(i);
    }
  }
  a3c() {
    this._t1();
    this.lt1();
  }
  _t1() {
    if (this.ot1.length !== 0) {
      for (const t of this.ot1) {
        UiSceneManager_1.UiSceneManager.DestroyDangoActor(t);
      }
      this.ot1 = [];
    }
  }
  lt1() {
    if (this.nt1.length !== 0) {
      for (const t of this.nt1) {
        UiSceneManager_1.UiSceneManager.DestroyDangoActor(t);
      }
      this.nt1 = [];
    }
  }
  OnTick(t) {
    var i;
    this.jTc(this.wTc);
    this.ly1.OnTick(t);
    this._M1();
    if (!ModelManager_1.ModelManager.RacingBetsModel.UseGmState && !!(t = this.ETc.GetCurLegMatchData()) && ((i = this.wTc.GetLegMatchState()) !== this.rt1 || t.Id !== this.wTc.Id)) {
      this.ht1(t.Id, i);
    }
  }
  _M1() {
    var t;
    if (Info_1.Info.IsInKeyBoard()) {
      t = this.wTc.GetLegMatchState();
      if (this.IsShowOrShowing && t === 1) {
        if ((t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(0)) && (t = UiSceneManager_1.UiSceneManager.RayTraceDangoActor(t)) !== this.lM1) {
          if (t) {
            if (this.lM1) {
              UiModelUtil_1.UiModelUtil.SelectDangoActor(this.lM1, false);
            }
            this.lM1 = t;
            UiModelUtil_1.UiModelUtil.SelectDangoActor(this.lM1, true);
          } else {
            if (this.lM1) {
              UiModelUtil_1.UiModelUtil.SelectDangoActor(this.lM1, false);
            }
            this.lM1 = undefined;
          }
        }
      } else if (this.lM1) {
        UiModelUtil_1.UiModelUtil.SelectDangoActor(this.lM1, false);
        this.lM1 = undefined;
      }
    }
  }
  async ht1(t, i) {
    UiLayer_1.UiLayer.SetShowMaskLayer("RacingBetsMainView", true);
    this.wTc = this.ETc.GetLegMatchData(t);
    this.$r1 = this.ETc.GetNextLegMatchData(t);
    this.rt1 = i;
    this.fDc = this.wTc.GetRacingBetsMainViewActorShowType(this.rt1);
    await this.gDc();
    this.Hqe();
    this.hn1();
    this.mDc = this.wTc.GetMainViewCameraHandleName(this.fDc);
    if (ModelManager_1.ModelManager.RacingBetsModel.IsFinalLegMatch(t) && this.rt1 === 4) {
      this.PlaySequence("Champion");
    }
    UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(this.mDc, true, true, "1001");
    UiLayer_1.UiLayer.SetShowMaskLayer("RacingBetsMainView", false);
    this.ewa();
  }
}
exports.RacingBetsMainView = RacingBetsMainView;
//# sourceMappingURL=RacingBetsMainView.js.map
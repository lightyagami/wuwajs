"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaMapDropDownTitleItem = exports.PhantomArenaMapDropDownItem = exports.PhantomArenaMapEntrancePanel = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonDropDown_1 = require("../../../Common/DropDown/CommonDropDown");
const DropDownItemBase_1 = require("../../../Common/DropDown/Item/DropDownItemBase");
const TitleItemBase_1 = require("../../../Common/DropDown/Item/TitleItemBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LongPressButton_1 = require("../../../Util/LongPressButton");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const WorldMapExtraUiPanel_1 = require("../../../WorldMap/SubViews/WorldMapExtraUiPanel");
const WorldMapDefine_1 = require("../../../WorldMap/WorldMapDefine");
const PhantomArenaMapEntranceDetailPanel_1 = require("./PhantomArenaMapEntranceDetailPanel");
const PhantomArenaMapEntranceDifficultItem_1 = require("./PhantomArenaMapEntranceDifficultItem");
const PhantomArenaMapEntranceNpcListItem_1 = require("./PhantomArenaMapEntranceNpcListItem");
class PhantomArenaMapEntrancePanel extends WorldMapExtraUiPanel_1.WorldMapExtraUiPanel {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.Msf = undefined;
    this.Esf = undefined;
    this.cs1 = undefined;
    this.Isf = undefined;
    this.b3o = undefined;
    this.q3o = undefined;
    this.Tsf = -1;
    this.bsf = 0;
    this.Rsf = 0;
    this._Sf = false;
    this.EPf = undefined;
    this.IPf = undefined;
    this.hbi = undefined;
    this.cIg = [];
    this.OpenParam = undefined;
    this.YUi = 0;
    this.wsf = e => {
      var t;
      if (this.Rsf !== e) {
        this.Rsf = e;
        this.IPf?.PlaySequence("Hide");
        this.cs1?.ShowPanel(e);
        this.lqe?.SetUiActive(false);
        this.hbi?.SetActive(false);
        if ((t = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallenge(e).MarkId) === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("PhantomArena", 87, "找不到challenge对应的MarkId", ["challengeId", e]);
          }
        } else if (!ModelManager_1.ModelManager.WorldMapModel?.GetIsMarkFocal(t, 45)) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapNavigate, {
            MarkId: t,
            MarkType: 45,
            Focal: true
          });
        }
      }
    };
    this.dIg = () => this.YUi;
    this.Lsf = e => {
      this.Tsf = e;
      this.Isf?.PlayOrReplaySequenceByName("Switch");
    };
    this.Psf = () => {
      this.Asf();
      this.lqe?.SetUiActive(true);
    };
    this.c8e = e => new PhantomArenaMapDropDownTitleItem(e);
    this.m8e = e => new PhantomArenaMapDropDownItem(e);
    this.C8e = (e, t) => {
      ModelManager_1.ModelManager.PhantomArenaModel?.SaveMapUnlockRedDotById(t, false);
      var i = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentDefaultChallengeIdAndMarkId(t);
      if (i) {
        ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaMapEntrance(i.ChallengeId);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 87, "找不到对应地图的默认挑战数据", ["mapId", t]);
      }
    };
    this.Ewu = (e, t) => e !== t;
    this.$Du = e => {
      return e;
    };
    this.Usa = () => {
      this.CloseMe();
    };
    this.ZW1 = () => {
      var e = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentPhantomArenaActivityData();
      if (e) {
        e = {
          ChallengeId: 0,
          OpenView: "PhantomArenaDeckOverviewTabView",
          ActivityId: e.Id
        };
        UiManager_1.UiManager.OpenView("PhantomArenaMainView", e);
      }
    };
    this.Ath = () => {
      var e = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentPhantomArenaActivityData();
      if (e) {
        e = {
          ChallengeId: 0,
          OpenView: "PhantomArenaRoleSelectTabView",
          ActivityId: e.Id
        };
        UiManager_1.UiManager.OpenView("PhantomArenaMainView", e);
      }
    };
    this.tQ1 = () => {
      var e = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentPhantomArenaActivityData();
      if (e) {
        UiManager_1.UiManager.OpenView("PhantomArenaCollectViewNew", e.Id);
      }
    };
    this.R2e = () => {
      var e = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentPhantomArenaActivityData();
      if (e) {
        UiManager_1.UiManager.OpenView("PhantomArenaRewardView", e.Id);
      }
    };
    this.Dsf = t => {
      this._Sf = t === 1;
      this.Gsf();
      if (this._Sf) {
        this.GetItem(17)?.SetUIActive(true);
        this.Isf?.StopPrevSequence(false, true);
        this.Isf?.PlaySequence("Show");
      } else {
        this.Isf?.StopPrevSequence(false, true);
        this.Isf?.PlaySequence("Hide");
      }
      if (this.Rsf === 0) {
        t = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentSortedDifficultList(this.YUi);
        if (!t) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("PhantomArena", 87, "difficultList为空");
          }
          return;
        }
        let e = -1;
        for (const i of t) {
          e = i;
          if (!ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentIsDifficultCompleted(this.YUi, i)) {
            break;
          }
        }
        if (e !== -1) {
          this.Esf?.SelectGridProxyByKey(e, true);
        }
      }
      this.uSf();
    };
    this.TPf = e => {
      if (e === "Hide") {
        this.GetItem(17)?.SetUIActive(false);
      }
    };
    this.bPf = e => {
      if (e === "Hide") {
        this.GetItem(16)?.SetUIActive(false);
      }
    };
    this.wPf = e => {
      if (e === "Hide") {
        this.GetItem(25)?.SetUIActive(false);
      }
    };
    this.Wpu = (e, t) => {
      if (e === "Switch" && t === "Switch") {
        this.Usf();
      }
    };
    this.P4o = () => {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_com_slider_tick");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapZoomBtnInput, -WorldMapDefine_1.SCALE_STEP, 1);
    };
    this.w4o = () => {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_com_slider_tick");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapZoomBtnInput, WorldMapDefine_1.SCALE_STEP, 1);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISliderComponent], [3, UE.UIButtonComponent], [2, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIExtendToggle], [6, UE.UIText], [7, UE.UIText], [8, UE.UIText], [9, UE.UIButtonComponent], [10, UE.UIText], [11, UE.UIButtonComponent], [12, UE.UIButtonComponent], [13, UE.UIButtonComponent], [14, UE.UIText], [15, UE.UISprite], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIVerticalLayout], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIText], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIItem]];
    this.BtnBindInfo = [[9, this.R2e], [11, this.ZW1], [12, this.Ath], [13, this.tQ1], [5, this.Dsf]];
  }
  OnBeforeCreate() {
    var e = this.OpenParam?.ChallengeId;
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 87, "PhantomArenaMapEntrancePanel:OpenParam.challengeId undefined");
      }
    } else {
      this.YUi = this.mIg(e);
    }
  }
  mIg(e) {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallenge(e).MapId ?? 0;
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.xsf(), this.Bsf(), this.SIi()]);
  }
  OnStart() {
    this.U3e();
    this.ksf();
    this.qsf();
    this.kyr();
    this.K8e();
  }
  ksf() {
    var e = this.GetButton(2);
    if (e) {
      this.b3o = new LongPressButton_1.LongPressButton(e, this.w4o);
    }
    var e = this.GetButton(3);
    if (e) {
      this.q3o = new LongPressButton_1.LongPressButton(e, this.P4o);
    }
  }
  qsf() {
    this.GetExtendToggle(5)?.SetToggleState(0, false);
    this.GetItem(17)?.SetUIActive(false);
    this.Isf = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(17));
    this.Isf.BindOnEndSequenceEvent(this.TPf);
    var e = this.GetItem(20)?.GetOwner();
    e?.OnSequencePlayEvent.Bind(this.Wpu);
    var e = e.GetComponentByClass(UE.UILoopScrollViewComponent.StaticClass());
    this.Msf = new LoopScrollView_1.LoopScrollView(e, this.GetItem(21)?.GetOwner(), () => {
      var e = new PhantomArenaMapEntranceNpcListItem_1.PhantomArenaMapEntranceNpcListItem();
      e.SelectCallBack = this.wsf;
      return e;
    });
    this.GetItem(21)?.SetUIActive(false);
  }
  kyr() {
    this.EPf = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(16));
    this.EPf.BindOnEndSequenceEvent(this.bPf);
    this.IPf = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(25));
    this.IPf.BindOnEndSequenceEvent(this.wPf);
  }
  async Bsf() {
    this.Esf ||= new GenericLayout_1.GenericLayout(this.GetVerticalLayout(18), () => {
      var e = new PhantomArenaMapEntranceDifficultItem_1.PhantomArenaMapEntranceDifficultItem();
      e.SelectCallBack = this.Lsf;
      e.GetCurrentMapId = this.dIg;
      return e;
    });
    await this.fIg();
  }
  async fIg() {
    this.Esf?.DeselectCurrentGridProxy();
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentPhantomArenaActivityData()?.GetDifficultChallengeIdsMap(this.YUi);
    if (e) {
      this.uSf();
      (e = Array.from(e.keys())).sort((e, t) => e - t);
      await this.Esf?.RefreshByDataAsync(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 87, "difficultChallengeIdsMap为空");
    }
  }
  async xsf() {
    this.cs1 = new PhantomArenaMapEntranceDetailPanel_1.PhantomArenaMapEntranceDetailPanel();
    await this.cs1?.CreateThenShowByResourceIdAsync("UiItem_SoundRemnantArenaMapTips", this.RootItem);
    this.cs1.BaseCloseCallBack = this.Psf;
    this.cs1.Close(undefined, false);
  }
  Asf() {
    this.Rsf = 0;
    this.GetItem(25)?.SetUIActive(true);
    this.IPf?.PlaySequence("Show");
    this.Msf?.DeselectCurrentGridProxy(true);
    this.ExtraUiPanelComponent.ClearClickItem();
    this.hbi?.SetActive(true);
  }
  async SIi() {
    this.hbi = new CommonDropDown_1.CommonDropDown(this.GetItem(29), this.m8e, this.c8e);
    await this.hbi.Init();
    this.hbi.SetOnSelectCall(this.C8e);
    this.hbi.SetOnCanChangeCall(this.Ewu);
    this.hbi.SetShowType(0);
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetAllPhantomBattleMapParams();
    if (e) {
      for (const t of e) {
        this.cIg.push(t.Id);
      }
      this.hbi.InitScroll(this.cIg, this.$Du, this.cIg.indexOf(this.YUi));
    }
  }
  U3e() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.Usa);
    this.lqe.SetTitleLocalText("PhantomBattle_1151");
    ControllerHolder_1.ControllerHolder.HomeBtnController.CreateHomeBtnFromUiItem(this.GetItem(28), "WorldMapView");
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapExtraMarkTypeVisibleChange, 45, true);
    this.nOe();
    this.Gsf();
    this.TDf();
    this.ExtraUiPanelComponent.WorldMapUiComponent?.MultiFloorComponent.DeSelectMultiMapFloor();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuideTriggerEvent, "BvbMapPanelShow");
  }
  nOe() {
    var e;
    var t;
    var i = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentPhantomArenaActivityData();
    if (i && (t = ModelManager_1.ModelManager.PhantomArenaModel?.GetMasterLevel(i.Id), this.GetText(6)?.SetText(t.toString()), e = ModelManager_1.ModelManager.PhantomArenaModel?.GetMasterExpNow(i.Id), t = ModelManager_1.ModelManager.PhantomArenaModel?.GetMasterLevelConfig(t, i.Id))) {
      i = e - t.ExpNeed;
      e = t.ExpNext;
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(7), "PhantomBattle_1152", i, e);
      t = t.TitleId;
      t = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleMasterTitleById(t);
      i = i / e;
      this.GetSprite(15).SetFillAmount(i);
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(8), t?.Name);
    }
  }
  uSf() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentFinishedChallengeCount(this.YUi);
    var t = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentAllChallengeCount(this.YUi);
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(26), this._Sf ? "PhantomBattle_1160" : "PhantomBattle_1159", e, t);
  }
  Gsf() {
    var e;
    var t = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentPhantomArenaActivityData();
    if (t) {
      this.GetItem(16)?.SetUIActive(true);
      e = ModelManager_1.ModelManager.PhantomArenaModel?.GetAllTaskProgress(t.Id);
      t = ModelManager_1.ModelManager.PhantomArenaModel?.GetAllTaskSecondCurrencyNum(t.Id);
      this.GetText(14)?.SetText(t.toString());
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(10), "PhantomBattle_1153", e.Current, e.Target);
      this.EPf?.StopPrevSequence(false, true);
      if (this._Sf) {
        this.EPf?.PlaySequence("Hide");
      } else {
        this.GetItem(16)?.SetUIActive(true);
        this.EPf?.PlaySequence("Show");
      }
    }
  }
  TDf() {
    this.GetButton(11)?.RootUIComp.SetUIActive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10137));
    this.GetButton(12)?.RootUIComp.SetUIActive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10136));
    this.GetButton(13)?.RootUIComp.SetUIActive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10135));
  }
  Usf() {
    var i = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentPhantomArenaActivityData()?.GetDifficultChallengeIdsMap(this.YUi)?.get(this.Tsf);
    if (i) {
      let e = -1;
      let t = false;
      if (this.bsf === 0) {
        e = i.indexOf(this.Rsf);
      } else {
        e = i.indexOf(this.bsf);
        this.bsf = 0;
        t = true;
      }
      this.Msf?.DeselectCurrentGridProxy(false);
      this.Msf?.RefreshByData(i, undefined, () => {
        if (e !== -1) {
          this.Msf?.SelectGridProxy(e, t);
          if (!this.Msf?.IsGridDisplaying(e)) {
            this.Msf?.ScrollToGridIndex(e);
          }
        }
      });
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 87, "RefreshNpcList:当前难度对应的ChallengeIdList为空", ["difficult", this.Tsf]);
    }
  }
  K8e() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentPhantomArenaActivityData();
    if (e) {
      RedDotController_1.RedDotController.BindRedDot("RedDotPhantomArenaCollect", this.GetItem(24), undefined, e.Id);
      RedDotController_1.RedDotController.BindRedDot("RedDotPhantomArenaRole", this.GetItem(23), undefined, e.Id);
      this.GetItem(22).SetUIActive(false);
      RedDotController_1.RedDotController.BindRedDot("RedDotPhantomArenaTaskReward", this.GetItem(27), undefined, e.Id);
      RedDotController_1.RedDotController.BindRedDot("RedDotPhantomArenaMapUnlock", this.GetItem(30), undefined, e.Id);
    }
  }
  Ovt() {
    RedDotController_1.RedDotController.UnBindGivenUi("RedDotPhantomArenaCollect", this.GetItem(24));
    RedDotController_1.RedDotController.UnBindGivenUi("RedDotPhantomArenaRole", this.GetItem(23));
    RedDotController_1.RedDotController.UnBindGivenUi("RedDotPhantomArenaTaskReward", this.GetItem(27));
    RedDotController_1.RedDotController.UnBindGivenUi("RedDotPhantomArenaMapUnlock", this.GetItem(30));
  }
  OnBeforeDestroy() {
    this.b3o?.OnDestroy();
    this.q3o?.OnDestroy();
    this.Ovt();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapExtraMarkTypeVisibleChange, 45, false);
  }
  GetScaleSlider() {
    return this.GetSlider(1);
  }
  OnHandleShowParam(e) {
    this.OpenParam = e;
    if (this.OpenParam?.ChallengeId) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 87, "PhantomArenaMapEntrancePanel:OnHandleShowParam", ["ChallengeId", this.OpenParam.ChallengeId]);
      }
      this.o71(this.OpenParam.ChallengeId, this.OpenParam.IsNeedSelect ?? false);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 87, "PhantomArenaMapEntrancePanel:OnHandleShowParam challengeId undefined");
    }
  }
  async o71(e, t) {
    var i;
    var a;
    if (this.Rsf !== e) {
      if (i = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallenge(e)) {
        if (t) {
          this.bsf = e;
        }
        a = this.mIg(e);
        i = i.Difficult;
        if (this.YUi !== a) {
          this.YUi = a;
          this.ExtraUiPanelComponent.RefreshDragAndScaleParam();
          await this.fIg();
          this.Esf?.SelectGridProxyByKey(i, true);
        } else if (this.Tsf !== i) {
          this.Esf?.SelectGridProxyByKey(i, true);
        } else if (a = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentPhantomArenaActivityData()?.GetDifficultChallengeIdsMap(this.YUi)?.get(i)) {
          if ((a = a.indexOf(e)) !== -1 && t) {
            this.Msf?.SelectGridProxy(a, true);
            if (!this.Msf?.IsGridDisplaying(a)) {
              this.Msf?.ScrollToGridIndexWithTween(a);
            }
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PhantomArena", 87, "SelectChallenge:当前难度对应的ChallengeIdList为空", ["difficult", i]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 87, "对应ChallengeId的Challenge为空", ["challengeId", e]);
      }
    }
  }
  OnClickEmpty(e) {
    if (this.Fsf) {
      this.u4o();
    }
  }
  OnClickMarkItem(e) {
    var t;
    var e = e.MarkId;
    if (e) {
      if (t = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallengeByMarkId(e)) {
        this.o71(t.Id, true);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 87, "对应markId的Challenge为空", ["markId", e]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 87, "markItem.MarkId为空");
    }
  }
  OnClickMarks(e, t) {
    this.u4o?.(() => {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_ia_spl_map_click_com");
    });
  }
  u4o(e, t = true) {
    if (this.Fsf) {
      this.cs1?.Close(e, t);
    } else {
      e?.();
    }
  }
  get Fsf() {
    return !this.cs1?.IsUiCloseComplete;
  }
  GetIsEnableMapScale() {
    return !this.Fsf;
  }
  GetIsEnableMapCursorButton() {
    return !this.Fsf;
  }
  OnPointerDrag(e) {
    if (this.Fsf) {
      this.u4o();
    }
  }
  GetDefaultMapScale() {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleMapParamById(this.YUi)?.BigMapDefaultScale ?? 0;
  }
  GetMaxMapScale() {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleMapParamById(this.YUi)?.BigMapMaxScale ?? 0;
  }
  GetMinMapScale() {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleMapParamById(this.YUi)?.BigMapMinScale ?? 0;
  }
  GetTileNum() {
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleMapParamById(this.YUi);
    if (e && !(e.TileRange.length < 4)) {
      var t = {
        MaxX: -1,
        MinX: 1,
        MaxY: -1,
        MinY: 1
      };
      for (const n of e.TileRange) {
        var i = n.split("_");
        var a = Number(i[0]);
        var i = Number(i[1]);
        t.MaxX = Math.max(a, t.MaxX);
        t.MinX = Math.min(a, t.MinX);
        t.MaxY = Math.max(i, t.MaxY);
        t.MinY = Math.min(i, t.MinY);
      }
      return t;
    }
  }
}
exports.PhantomArenaMapEntrancePanel = PhantomArenaMapEntrancePanel;
class PhantomArenaMapDropDownItem extends DropDownItemBase_1.DropDownItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem]];
  }
  GetDropDownToggle() {
    return this.GetExtendToggle(0);
  }
  OnShowDropDownItemBase(e) {
    var t;
    var i;
    var a = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleMapParamById(e);
    if (a) {
      a = a?.MapName;
      t = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentFinishedChallengeCount(e);
      i = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentAllChallengeCount(e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), a, t, i);
      this.SVg(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 87, "对应mapId的MapParam为空", ["mapId", e]);
    }
  }
  SVg(e) {
    RedDotController_1.RedDotController.BindRedDot("RedDotPhantomArenaMapUnlockDropDownItem", this.GetItem(2), undefined, e);
  }
  Ovt() {
    RedDotController_1.RedDotController.UnBindGivenUi("RedDotPhantomArenaMapUnlockDropDownItem", this.GetItem(2));
  }
  OnBeforeDestroy() {
    this.Ovt();
  }
}
exports.PhantomArenaMapDropDownItem = PhantomArenaMapDropDownItem;
class PhantomArenaMapDropDownTitleItem extends TitleItemBase_1.TitleItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  ShowTemp(e) {
    var t;
    var i;
    var a = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleMapParamById(e);
    if (a) {
      a = a.MapName;
      t = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentFinishedChallengeCount(e);
      i = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentAllChallengeCount(e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), a, t, i);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 87, "对应mapId的MapParam为空", ["mapId", e]);
    }
  }
}
exports.PhantomArenaMapDropDownTitleItem = PhantomArenaMapDropDownTitleItem;
//# sourceMappingURL=PhantomArenaMapEntrancePanel.js.map
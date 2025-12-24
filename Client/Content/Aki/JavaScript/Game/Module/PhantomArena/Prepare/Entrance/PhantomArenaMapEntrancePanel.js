"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaMapEntrancePanel = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
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
    this.iof = undefined;
    this.rof = undefined;
    this.cs1 = undefined;
    this.oof = undefined;
    this.b3o = undefined;
    this.q3o = undefined;
    this.nof = -1;
    this.sof = 0;
    this.aof = 0;
    this.wpf = false;
    this.MTf = undefined;
    this.ETf = undefined;
    this.hof = e => {
      var t;
      if (this.aof !== e) {
        this.aof = e;
        this.ETf?.PlaySequence("Hide");
        this.cs1?.ShowPanel(e);
        this.lqe?.SetUiActive(false);
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
    this.lof = e => {
      this.nof = e;
      this.oof?.PlayOrReplaySequenceByName("Switch");
    };
    this._of = () => {
      this.uof();
      this.lqe?.SetUiActive(true);
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
    this.cof = t => {
      this.wpf = t === 1;
      this.vof();
      if (this.wpf) {
        this.GetItem(17)?.SetUIActive(true);
        this.oof?.StopPrevSequence(false, true);
        this.oof?.PlaySequence("Show");
      } else {
        this.oof?.StopPrevSequence(false, true);
        this.oof?.PlaySequence("Hide");
      }
      if (this.aof === 0) {
        t = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentSortedDifficultList();
        if (!t) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("PhantomArena", 87, "difficultList为空");
          }
          return;
        }
        let e = 0;
        for (const i of t) {
          e = i;
          if (!ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentIsDifficultCompleted(i)) {
            break;
          }
        }
        if (e !== 0) {
          this.rof?.SelectGridProxyByKey(e, true);
        }
      }
      this.Rpf();
    };
    this.ITf = e => {
      if (e === "Hide") {
        this.GetItem(17)?.SetUIActive(false);
      }
    };
    this.TTf = e => {
      if (e === "Hide") {
        this.GetItem(16)?.SetUIActive(false);
      }
    };
    this.bTf = e => {
      if (e === "Hide") {
        this.GetItem(25)?.SetUIActive(false);
      }
    };
    this.Wpu = (e, t) => {
      if (e === "Switch" && t === "Switch") {
        this.dof();
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
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISliderComponent], [3, UE.UIButtonComponent], [2, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIExtendToggle], [6, UE.UIText], [7, UE.UIText], [8, UE.UIText], [9, UE.UIButtonComponent], [10, UE.UIText], [11, UE.UIButtonComponent], [12, UE.UIButtonComponent], [13, UE.UIButtonComponent], [14, UE.UIText], [15, UE.UISprite], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIVerticalLayout], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIText], [27, UE.UIItem], [28, UE.UIItem]];
    this.BtnBindInfo = [[9, this.R2e], [11, this.ZW1], [12, this.Ath], [13, this.tQ1], [5, this.cof]];
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.mof(), this.fof()]);
  }
  OnStart() {
    this.U3e();
    this.gof();
    this.Cof();
    this.kyr();
    this.K8e();
  }
  gof() {
    var e = this.GetButton(2);
    if (e) {
      this.b3o = new LongPressButton_1.LongPressButton(e, this.w4o);
    }
    var e = this.GetButton(3);
    if (e) {
      this.q3o = new LongPressButton_1.LongPressButton(e, this.P4o);
    }
  }
  Cof() {
    this.GetExtendToggle(5)?.SetToggleState(0, false);
    this.GetItem(17)?.SetUIActive(false);
    this.oof = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(17));
    this.oof.BindOnEndSequenceEvent(this.ITf);
    var e = this.GetItem(20)?.GetOwner();
    e?.OnSequencePlayEvent.Bind(this.Wpu);
    var e = e.GetComponentByClass(UE.UILoopScrollViewComponent.StaticClass());
    this.iof = new LoopScrollView_1.LoopScrollView(e, this.GetItem(21)?.GetOwner(), () => {
      var e = new PhantomArenaMapEntranceNpcListItem_1.PhantomArenaMapEntranceNpcListItem();
      e.SelectCallBack = this.hof;
      return e;
    });
    this.GetItem(21)?.SetUIActive(false);
  }
  kyr() {
    this.MTf = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(16));
    this.MTf.BindOnEndSequenceEvent(this.TTf);
    this.ETf = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(25));
    this.ETf.BindOnEndSequenceEvent(this.bTf);
  }
  async fof() {
    this.rof = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(18), () => {
      var e = new PhantomArenaMapEntranceDifficultItem_1.PhantomArenaMapEntranceDifficultItem();
      e.SelectCallBack = this.lof;
      return e;
    });
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentPhantomArenaActivityData()?.GetDifficultChallengeIdsMap();
    if (e) {
      const t = new CustomPromise_1.CustomPromise();
      e = Array.from(e.keys());
      e.sort((e, t) => e - t);
      this.rof.RefreshByData(e, () => {
        t.SetResult();
      });
      await t.Promise;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 87, "difficultChallengeIdsMap为空");
    }
  }
  async mof() {
    this.cs1 = new PhantomArenaMapEntranceDetailPanel_1.PhantomArenaMapEntranceDetailPanel();
    await this.cs1?.CreateThenShowByResourceIdAsync("UiItem_SoundRemnantArenaMapTips", this.RootItem);
    this.cs1.BaseCloseCallBack = this._of;
    this.cs1.Close(undefined, false);
  }
  uof() {
    this.aof = 0;
    this.GetItem(25)?.SetUIActive(true);
    this.ETf?.PlaySequence("Show");
    this.iof?.DeselectCurrentGridProxy(true);
    this.ExtraUiPanelComponent.ClearClickItem();
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
    this.vof();
    this.ewf();
    this.ExtraUiPanelComponent.WorldMapUiComponent?.MultiFloorComponent.DeSelectMultiMapFloor();
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
      this.Rpf();
    }
  }
  Rpf() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentFinishedChallengeCount();
    var t = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentAllChallengeCount();
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(26), this.wpf ? "PhantomBattle_1160" : "PhantomBattle_1159", e, t);
  }
  vof() {
    var e;
    var t = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentPhantomArenaActivityData();
    if (t) {
      this.GetItem(16)?.SetUIActive(true);
      e = ModelManager_1.ModelManager.PhantomArenaModel?.GetAllTaskProgress(t.Id);
      t = ModelManager_1.ModelManager.PhantomArenaModel?.GetAllTaskSecondCurrencyNum(t.Id);
      this.GetText(14)?.SetText(t.toString());
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(10), "PhantomBattle_1153", e.Current, e.Target);
      this.MTf?.StopPrevSequence(false, true);
      if (this.wpf) {
        this.MTf?.PlaySequence("Hide");
      } else {
        this.GetItem(16)?.SetUIActive(true);
        this.MTf?.PlaySequence("Show");
      }
    }
  }
  ewf() {
    this.GetButton(11)?.RootUIComp.SetUIActive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10137));
    this.GetButton(12)?.RootUIComp.SetUIActive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10136));
    this.GetButton(13)?.RootUIComp.SetUIActive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10135));
  }
  dof() {
    var i = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentPhantomArenaActivityData()?.GetDifficultChallengeIdsMap()?.get(this.nof);
    if (i) {
      let e = -1;
      let t = false;
      if (this.sof === 0) {
        e = i.indexOf(this.aof);
      } else {
        e = i.indexOf(this.sof);
        this.sof = 0;
        t = true;
      }
      this.iof?.DeselectCurrentGridProxy(false);
      this.iof?.RefreshByData(i, undefined, () => {
        if (e !== -1) {
          this.iof?.SelectGridProxy(e, t);
          if (!this.iof?.IsGridDisplaying(e)) {
            this.iof?.ScrollToGridIndex(e);
          }
        }
      });
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 87, "RefreshNpcList:当前难度对应的ChallengeIdList为空", ["difficult", this.nof]);
    }
  }
  K8e() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentPhantomArenaActivityData();
    if (e) {
      RedDotController_1.RedDotController.BindRedDot("RedDotPhantomArenaCollect", this.GetItem(24), undefined, e.Id);
      RedDotController_1.RedDotController.BindRedDot("RedDotPhantomArenaRole", this.GetItem(23), undefined, e.Id);
      this.GetItem(22).SetUIActive(false);
      RedDotController_1.RedDotController.BindRedDot("RedDotPhantomArenaTaskReward", this.GetItem(27), undefined, e.Id);
    }
  }
  Ovt() {
    RedDotController_1.RedDotController.UnBindGivenUi("RedDotPhantomArenaCollect", this.GetItem(24));
    RedDotController_1.RedDotController.UnBindGivenUi("RedDotPhantomArenaRole", this.GetItem(23));
    RedDotController_1.RedDotController.UnBindGivenUi("RedDotPhantomArenaTaskReward", this.GetItem(27));
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
    if (e) {
      e = e;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 87, "PhantomArenaMapEntrancePanel:OnHandleShowParam", ["targetChallengeId", e]);
      }
      this.o71(e);
    }
  }
  o71(e) {
    var t;
    var i;
    if (this.aof !== e) {
      if (t = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallenge(e)) {
        t = t.Difficult;
        if (this.nof === t) {
          if (i = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentPhantomArenaActivityData()?.GetDifficultChallengeIdsMap()?.get(t)) {
            if ((i = i.indexOf(e)) !== -1) {
              this.iof?.SelectGridProxy(i, true);
              if (!this.iof?.IsGridDisplaying(i)) {
                this.iof?.ScrollToGridIndexWithTween(i);
              }
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("PhantomArena", 87, "SelectChallenge:当前难度对应的ChallengeIdList为空", ["difficult", t]);
          }
        } else {
          this.sof = e;
          this.rof?.SelectGridProxyByKey(t, true);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 87, "对应ChallengeId的Challenge为空", ["challengeId", e]);
      }
    }
  }
  OnClickEmpty(e) {
    if (this.yof) {
      this.u4o();
    }
  }
  OnClickMarkItem(e) {
    var t;
    var e = e.MarkId;
    if (e) {
      if (t = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallengeByMarkId(e)) {
        this.o71(t.Id);
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
    if (this.yof) {
      this.cs1?.Close(e, t);
    } else {
      e?.();
    }
  }
  get yof() {
    return !this.cs1?.IsUiCloseComplete;
  }
  GetIsEnableMapScale() {
    return !this.yof;
  }
  GetIsEnableMapCursorButton() {
    return !this.yof;
  }
  OnPointerDrag(e) {
    if (this.yof) {
      this.u4o();
    }
  }
  GetDefaultMapScale(e) {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleMapParamByMapId(e)?.BigMapDefaultScale ?? 0;
  }
  GetMaxMapScale(e) {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleMapParamByMapId(e)?.BigMapMaxScale ?? 0;
  }
  GetMinMapScale(e) {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleMapParamByMapId(e)?.BigMapMinScale ?? 0;
  }
  GetTileNum(e) {
    e = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleMapParamByMapId(e);
    if (e) {
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
//# sourceMappingURL=PhantomArenaMapEntrancePanel.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewSoundAreaView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const DetectionTabTypeById_1 = require("../../../../Core/Define/ConfigQuery/DetectionTabTypeById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ActivityDoubleRewardController_1 = require("../../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController");
const ActivityControllerHolder_1 = require("../../Activity/ActivityControllerHolder");
const CommonDropDown_1 = require("../../Common/DropDown/CommonDropDown");
const OneTextDropDownItem_1 = require("../../Common/DropDown/Item/OneText/OneTextDropDownItem");
const OneTextTitleItem_1 = require("../../Common/DropDown/Item/OneText/OneTextTitleItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const RoguelikeDefine_1 = require("../../Roguelike/Define/RoguelikeDefine");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const AdventureDefine_1 = require("../AdventureDefine");
const AdventureGuideController_1 = require("../AdventureGuideController");
const NewSoundDetectItem_1 = require("./NewSoundDetectItem");
const NewSoundDetectTabItem_1 = require("./NewSoundDetectTabItem");
const NewSoundSuitDropDownItem_1 = require("./NewSoundSuitDropDownItem");
const NewSoundSuitDropDownTitle_1 = require("./NewSoundSuitDropDownTitle");
const NewSoundTypeItem_1 = require("./NewSoundTypeItem");
class NewSoundAreaView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this.r8e = undefined;
    this.n8e = undefined;
    this.hY1 = undefined;
    this.s8e = [];
    this.a8e = 4;
    this.H6e = undefined;
    this.ODu = undefined;
    this.qDu = undefined;
    this.GDu = 0;
    this.l8e = undefined;
    this._8e = undefined;
    this.u8e = 0;
    this.t5e = 0;
    this.i7i = new Array();
    this.Anl = false;
    this.p4f = undefined;
    this.si_ = i => {
      if (this.s8e) {
        for (let e = 0; e < this.s8e.length; e++) {
          if (this.s8e[e] === i) {
            this.r8e?.UnsafeGetGridProxy(e)?.RefreshRedDotState();
          }
        }
      }
    };
    this.FDu = e => new OneTextTitleItem_1.OneTextTitleItem(e);
    this.NDu = e => new OneTextDropDownItem_1.OneTextDropDownItem(e);
    this.VDu = e => new NewSoundSuitDropDownTitle_1.NewSoundSuitDropDownTitle(e);
    this.jDu = e => {
      return new NewSoundSuitDropDownItem_1.NewSoundSuitDropDownItem(e);
    };
    this.Pnl = () => {
      this.wnl();
      this.n8e?.SetAnimFinishDelegate(undefined);
    };
    this.Wid = e => {
      ModelManager_1.ModelManager.AdventureGuideModel.CurrentShowLevel = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NewSoundAreaRefreshReward, e);
      if (this._8e?.GetCurrentSequence()) {
        this._8e?.ReplaySequenceByKey("Switch");
      } else {
        this._8e?.PlayLevelSequenceByName("Switch");
      }
    };
    this.Qid = e => {
      ModelManager_1.ModelManager.AdventureGuideModel.CurrentSelectSuitIndex = e;
      this.HDu();
      if (this._8e?.GetCurrentSequence()) {
        this._8e?.ReplaySequenceByKey("Switch");
      } else {
        this._8e?.PlayLevelSequenceByName("Switch");
      }
    };
    this.Kid = (e, i) => {
      this.Wid(i);
    };
    this.Xid = (e, i) => {
      this.Qid(i);
    };
    this.$Du = e => {
      var i = e === ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel ? "Text_WorldCurrentLevelTag_Text" : "Text_WorldLevelTag_Text";
      return new LguiUtil_1.TableTextArgNew(i, e);
    };
    this.WDu = e => {
      return Number(e);
    };
    this.f8e = () => {
      UiManager_1.UiManager.OpenView("LordGymChallengeRecordView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UILoopScrollViewComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIItem], [15, UE.UIButtonComponent], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIText], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIText], [24, UE.UITexture], [25, UE.UIText], [26, UE.UIScrollViewWithScrollbarComponent], [27, UE.UIVerticalLayout], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIText], [31, UE.UIItem]];
    this.BtnBindInfo = [[15, this.f8e]];
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RedDotAdventureSecondaryUpdate, this.si_);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RedDotAdventureSecondaryUpdate, this.si_);
  }
  OnBeforeDestroy() {
    this.r8e?.ClearGridProxies();
    this.n8e?.ClearGridProxies();
    this.l8e?.Clear();
    this.l8e = undefined;
    this._8e?.Clear();
    this._8e = undefined;
    this.qDu?.Destroy();
    this.ODu?.Destroy();
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.ODu = new CommonDropDown_1.CommonDropDown(this.GetItem(17), this.NDu, this.FDu);
    e.push(this.ODu.Init());
    this.qDu = new CommonDropDown_1.CommonDropDown(this.GetItem(29), this.jDu, this.VDu);
    e.push(this.qDu.Init());
    this.p4f = new RegressPanel();
    e.push(this.p4f.CreateByActorAsync(this.GetItem(31).GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    const i = (e, i) => {
      if (this.a8e === 6) {
        var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleTutorialNew) ?? new Map();
        var [, r] = ModelManager_1.ModelManager.AdventureGuideModel.GetCanShowDungeonRecordsByType(this.a8e);
        for (const n of r) {
          t.set(n.Conf.Id, true);
        }
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleTutorialNew, t);
      }
      this.a8e = e;
      var s;
      var o;
      var r = AdventureGuideController_1.AdventureGuideController.GetPlayerType();
      this.p4f?.SetUiActive((r.includes(2) || r.includes(1)) && this.a8e === 22);
      var r = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(e);
      this.GDu = r?.DropDownTypeId ?? 0;
      this.QDu();
      this.H6e?.SetToggleState(0, false);
      this.H6e = i;
      var i = this.s8e.indexOf(e);
      if (i >= 0) {
        this.r8e.SelectGridProxy(i, false);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AdventureHelpBtn, r.HelpGroupId);
      this.t5e = r.HelpGroupId;
      this.RefreshDungeonType();
      if (this.GDu !== 2) {
        this.p8e();
      }
      if (this.GDu === 1) {
        this.Wid(ModelManager_1.ModelManager.AdventureGuideModel.CurrentShowLevel);
      } else if (this.GDu === 2) {
        if (ModelManager_1.ModelManager.AdventureGuideModel.HandleShowNightMareParam) {
          ModelManager_1.ModelManager.AdventureGuideModel.CurrentSelectSuitIndex = 0;
          this.qDu?.SetSelectedIndex(0);
        }
        this.Qid(ModelManager_1.ModelManager.AdventureGuideModel.CurrentSelectSuitIndex);
      }
      if (this._8e?.GetCurrentSequence()) {
        this._8e?.ReplaySequenceByKey("Switch");
      } else {
        this._8e?.PlayLevelSequenceByName("Switch");
      }
      var e = ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetAdventureUpActivity(this.a8e);
      if (e) {
        this.GetItem(18).SetUIActive(true);
        i = e.GetNumTxtAndParam();
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(25), i[1] > 0 ? "Reward_doubling_tips" : "Reward_doubling_end_tips", i[1], i[2]);
        this.GetText(19).SetUIActive(false);
      } else {
        [r, e, i, s, o] = ModelManager_1.ModelManager.ActivityRegressModel.GetDetectionDoubleDropTuple(this.a8e);
        if (r) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(19), s, e, i);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(25), o);
          this.GetText(19).SetUIActive(true);
        }
        this.GetItem(18).SetUIActive(r);
      }
    };
    const t = e => this.a8e !== e;
    this.r8e = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(4).GetOwner(), () => {
      var e = new NewSoundTypeItem_1.NewSoundTypeItem();
      e.BindOnToggleFunc(i);
      e.BindCanToggleExecuteChange(t);
      return e;
    });
    this.n8e = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(3), this.GetItem(2).GetOwner(), () => new NewSoundDetectItem_1.NewSoundDetectItem(), true);
    this.n8e.SetAnimFinishDelegate(this.Pnl);
    this.hY1 = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(26), () => new NewSoundDetectTabItem_1.NewSoundDetectTabItem());
    ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupArray().forEach(e => {
      this.i7i.push(e.Id);
    });
    this.i7i.sort((e, i) => e - i);
    this.i7i.unshift(0);
    this.qDu.SetOnSelectCall(this.Xid);
    this.qDu.SetShowType(0);
    this.qDu.InitScroll(this.i7i, this.WDu, this.i7i.indexOf(ModelManager_1.ModelManager.AdventureGuideModel.CurrentSelectSuitIndex));
    this.u8e = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel - 1;
    var r = [];
    for (let e = AdventureDefine_1.WORLD_LEVEL_MIN; e <= AdventureDefine_1.WORLD_LEVEL_MAX; e++) {
      r.push(e);
    }
    this.ODu.SetOnSelectCall(this.Kid);
    this.ODu.SetShowType(0);
    this.ODu.InitScroll(r, this.$Du, this.u8e);
    var e = ModelManager_1.ModelManager.AdventureGuideModel.GetAllCanShowDungeonTypeList();
    this.s8e = e;
    this.l8e = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this._8e = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Bnl();
  }
  Bnl() {
    var e = this.ExtraParams;
    var e = e.OpenTabViewName === "NewSoundAreaView" ? Number(e.OpenParam) : undefined;
    if (e !== undefined && e > 0) {
      this.Anl = true;
    }
  }
  wnl() {
    var e;
    if (this.Anl && (this.Anl = false, e = this.n8e.UnsafeGetGridProxy(0))) {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForViewByRootItem(e.GetRootItem(), "Group3", true);
    }
  }
  p8e() {
    var [e, i] = ModelManager_1.ModelManager.AdventureGuideModel.GetCanShowDungeonRecordsByType(this.a8e);
    if (e) {
      this.lY1(i);
    } else {
      this._Y1(i);
    }
    this.$8i = undefined;
  }
  _Y1(e) {
    var i = e.length;
    this.hY1?.SetActive(false);
    this.n8e.SetTargetRootComponentActive(true);
    if (i) {
      const n = this.$8i?.NewSoundDetectTracingIdList;
      var t;
      var r = e.sort((e, i) => {
        e = n?.includes(e.Conf.Id);
        i = n?.includes(i.Conf.Id);
        if (e && !i) {
          return -1;
        } else if (i && !e) {
          return 1;
        } else {
          return 0;
        }
      });
      var s = new Array();
      var o = ModelManager_1.ModelManager.WeeklyRogueModel.CycleId;
      for (let e = 0; e < i; e++) {
        if (r[e]?.Conf?.Secondary !== 29 || o !== 0) {
          (t = new NewSoundDetectItem_1.NewSoundDetectItemData()).DetectRecordData = r[e];
          t.TracingList = n;
          s.push(t);
        }
      }
      this.n8e.RefreshByData(s, false, () => {
        this.n8e?.ScrollToGridIndex(0);
      });
    }
  }
  lY1(e) {
    this.hY1?.SetActive(true);
    this.n8e.SetTargetRootComponentActive(false);
    var i = new Map();
    const t = this.$8i?.NewSoundDetectTracingIdList;
    var r = ModelManager_1.ModelManager.AdventureGuideModel.HandleShowNightMareParam;
    ModelManager_1.ModelManager.AdventureGuideModel.HandleShowNightMareParam = 0;
    var e = e.sort((e, i) => {
      e = t?.includes(e.Conf.Id);
      i = t?.includes(i.Conf.Id);
      if (e && !i) {
        return -1;
      } else if (i && !e) {
        return 1;
      } else {
        return 0;
      }
    });
    for (const n of e) {
      var s = n.DungeonDetectionRecord ? n.DungeonDetectionRecord.Conf.DetectionTabType : n.SilentAreaDetectionRecord?.Conf.DetectionTabType ?? 0;
      if (s) {
        if (!i.has(s)) {
          var o = DetectionTabTypeById_1.configDetectionTabTypeById.GetConfig(s);
          if (!o) {
            continue;
          }
          o = {
            Id: s,
            TabTextId: o.Text,
            IconPath: o.Icon,
            Sort: o.Order,
            DungeonList: [],
            IsVisible: true
          };
          i.set(s, o);
        }
        o = new NewSoundDetectItem_1.NewSoundDetectItemData();
        o.DetectRecordData = n;
        o.TracingList = t;
        o.NightMareParam = r;
        i.get(s).DungeonList.push(o);
      }
    }
    e = Array.from(i.values()).sort((e, i) => i.Sort - e.Sort);
    this.hY1?.RefreshByData(e, () => {
      if (this.hY1?.GetItemByIndex(0)) {
        this.hY1?.BindLateUpdate(() => {
          TimerSystem_1.GameplayTimerSystem.Next(() => {
            if (this?.IsShowOrShowing) {
              this.hY1?.ScrollToTop(0);
            }
          });
          this.hY1?.UnBindLateUpdate();
        });
      }
    });
  }
  OnBeforeShow() {
    this.$8i = this.ExtraParams;
    var e = this.$8i;
    var e = e?.OpenTabViewName === "NewSoundAreaView" || e?.OpenTabViewName === "DisposableChallengeView" ? Number(e?.OpenParam) : this.a8e;
    let i = 0;
    if (e !== undefined && (e = this.s8e.indexOf(Number(e))) >= 0) {
      i = e;
    }
    var t = this.GetViewName();
    var r = this.s8e.length;
    var s = new Array();
    for (let e = 0; e < r; e++) {
      var o = ModelManager_1.ModelManager.WeeklyRogueModel.CycleId;
      if (this.s8e[e] !== 29 || o !== 0) {
        o = {
          FromTabViewName: t,
          TypeId: this.s8e[e]
        };
        s.push(o);
      }
    }
    this.r8e.RefreshByData(s, undefined, () => {
      this.r8e.SelectGridProxy(i, false);
      this.r8e.ScrollToGridIndex(i);
      this.r8e.UnsafeGetGridProxy(i)?.SetSelectToggle();
    });
    this.l8e?.PlayLevelSequenceByName("Start");
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AdventureHelpBtn, this.t5e);
    if (t === "NewSoundAreaView" && (e = ModelManager_1.ModelManager.RedDotModel.GetRedDot("AdventureNewSoundAreaTab")) && e.IsRedDotActive()) {
      AdventureGuideController_1.AdventureGuideController.RecordAdventureNewSoundAreaTabClick();
    }
  }
  RefreshDungeonType() {
    this.GetItem(5).SetUIActive(false);
    this.GetItem(8).SetUIActive(false);
    this.GetItem(12).SetUIActive(false);
    this.GetItem(14).SetUIActive(false);
    this.GetItem(16).SetUIActive(false);
    this.GetItem(11).SetUIActive(false);
    this.GetItem(20).SetUIActive(false);
    this.GetItem(22).SetUIActive(false);
    switch (this.a8e) {
      case 18:
        this.v8e();
        break;
      case 5:
        this.M8e();
        this.E8e();
        break;
      case 28:
        this.M8e();
        this.bV_();
        break;
      case 7:
        this.M8e();
        break;
      case 61:
        this.S8e();
        break;
      case 62:
        this.y8e();
        break;
      case 6:
        this.I8e();
        break;
      case 29:
        this.M8e();
        this.J4_();
    }
  }
  J4_() {
    this.GetItem(11).SetUIActive(true);
    this.GetItem(22).SetUIActive(true);
    var e = ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData?.GetCycleConfig();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(23), e.CycleName);
  }
  v8e() {
    this.GetItem(5).SetUIActive(true);
    var e = ModelManager_1.ModelManager.InventoryModel?.GetItemCountByConfigId(RoguelikeDefine_1.OUTSIDE_CURRENCY_ID) ?? 0;
    var i = ModelManager_1.ModelManager.RoguelikeModel?.GetParamConfigBySeasonId();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "Roguelike_ActivityMain_Score", e, i);
  }
  E8e() {
    this.GetItem(11).SetUIActive(true);
    this.GetItem(12).SetUIActive(true);
    var e = ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty();
    var e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetNewTowerDifficultTitle(e);
    this.GetText(13)?.SetText(e);
    this.SetTowerBg("T_DevelopmentFrame7");
  }
  bV_() {
    this.GetItem(11).SetUIActive(true);
    this.GetItem(12).SetUIActive(true);
    var e = ModelManager_1.ModelManager.ShipTowerModel.GetCurrentStageSeasonName2();
    this.GetText(13)?.SetText(e);
    this.SetTowerBg("T_DevelopmentTitle6");
  }
  SetTowerBg(e) {
    var i = this.GetTexture(24);
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.SetTextureShowUntilLoaded(e, i);
  }
  S8e() {
    this.GetItem(11).SetUIActive(true);
    this.GetItem(14).SetUIActive(true);
  }
  y8e() {
    this.GetItem(11).SetUIActive(true);
    this.GetItem(20).SetUIActive(true);
  }
  I8e() {
    this.GetItem(11).SetUIActive(true);
    this.GetItem(16).SetUIActive(true);
  }
  M8e() {
    var i = this.GetItem(8);
    i?.SetUIActive(true);
    var t = this.GetText(10);
    var r = this.GetText(9);
    if (this.a8e === 7) {
      r.SetUIActive(false);
      var s = ModelManager_1.ModelManager.AdventureGuideModel.GetCanShowDungeonRecordsByType(this.a8e)[1];
      let e = 0;
      if (s[0].Type === 1) {
        var o = s[0].Conf.MarkId;
        if (!o) {
          i.SetUIActive(false);
          return;
        }
        e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(o)?.Reward;
      } else {
        if (!s[0].Conf.DungeonId) {
          i.SetUIActive(false);
          return;
        }
        e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(s[0].Conf.SubDungeonId)?.RewardId;
      }
      t.SetUIActive(true);
      var o = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(e)?.SharedId;
      if (o) {
        s = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareConfig(o);
        o = ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(o);
        o = (s = s.MaxCount) - o;
        LguiUtil_1.LguiUtil.SetLocalText(t, AdventureGuideController_1.RECEIVED_COUNT, o + "/" + s);
      } else {
        i.SetUIActive(false);
      }
    } else if (this.a8e === 5) {
      t?.SetUIActive(false);
      r.SetUIActive(true);
      o = ModelManager_1.ModelManager.TowerModel.GetSeasonCountDownData().CountDownText;
      r.SetText(o);
    } else if (this.a8e === 28) {
      t?.SetUIActive(false);
      r.SetUIActive(true);
      s = ModelManager_1.ModelManager.ShipTowerModel.GetSeasonCountDownData().CountDownText;
      r.SetText(s);
    } else if (this.a8e === 29) {
      t?.SetUIActive(false);
      r.SetUIActive(true);
      i = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetCycleCountDownData().CountDownText;
      r.SetText(i);
    }
  }
  OnBeforeHide() {
    if (UiManager_1.UiManager.IsViewShow("PowerView")) {
      UiManager_1.UiManager.CloseView("PowerView");
    }
    this.SetExtraParams(undefined);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 1 || isNaN(Number(e[0]))) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 53, "聚焦引导extraParam项配置有误", ["configParams", e]);
      }
    } else {
      e = Number(e[0]);
      if (e === 0) {
        if (i = this.n8e.GetGridByDisplayIndex(0)) {
          return [i, i];
        } else {
          return undefined;
        }
      }
      var i = this.s8e.indexOf(e);
      if (i >= 0) {
        e = this.r8e?.UnsafeGetGridProxy(i);
        if (e) {
          e = e.GetButtonItem();
          if (e) {
            this.r8e?.ScrollToGridIndexWithTween(i);
            return [e, e];
          }
        }
      }
    }
  }
  QDu() {
    if (this.GDu === 0) {
      this.GetItem(21).SetUIActive(false);
    } else {
      this.GetItem(21).SetUIActive(true);
      this.GetItem(17)?.SetUIActive(this.GDu === 1);
      this.GetItem(29)?.SetUIActive(this.GDu === 2);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(30), ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropDownConfig(this.GDu)?.Text ?? "");
    }
  }
  HDu() {
    var [e, i] = ModelManager_1.ModelManager.AdventureGuideModel.GetCanShowDungeonRecordsByType(this.a8e);
    let t = [];
    if (ModelManager_1.ModelManager.AdventureGuideModel.CurrentSelectSuitIndex) {
      for (const r of i) {
        if (r.Conf.PhantomFetterGroup.includes(ModelManager_1.ModelManager.AdventureGuideModel.CurrentSelectSuitIndex)) {
          t.push(r);
        }
      }
    } else {
      t = i;
    }
    if (e) {
      this.lY1(t);
    } else {
      this._Y1(t);
    }
    this.$8i = undefined;
  }
}
exports.NewSoundAreaView = NewSoundAreaView;
class RegressPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Ftl = "";
    this.tFe = undefined;
    this.GOe = undefined;
    this.CNe = undefined;
    this.kOe = () => {
      var e;
      if (this.CNe && this.CNe.CheckIfInShowTime()) {
        e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(this.CNe.EndShowTime, this.Ftl);
        this.GetText(0).SetText(e);
      }
    };
    this.nFe = () => {
      return new RoleItem();
    };
    this.Wpa = () => {
      var e = {
        SubView: 3,
        OpenType: ModelManager_1.ModelManager.ActivityRegressModel.CheckIfInShowTime ? 0 : 1
      };
      UiManager_1.UiManager.OpenView("ActivityRegressMainView", e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.Wpa]];
  }
  OnStart() {
    this.Ftl = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityRemainingTime");
    this.tFe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.nFe);
    var e = ModelManager_1.ModelManager.ActivityRegressModel.GetGachaPoolUpRole();
    this.tFe.RefreshByData(e);
    var e = ModelManager_1.ModelManager.ActivityRegressModel.CheckIfInShowTime;
    this.CNe = e ? this.CNe = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData : ActivityControllerHolder_1.ActivityControllerHolder.ActivityNewPlayerSupportController.ActivityData;
    this.GOe = TimerSystem_1.GameplayTimerSystem.Forever(this.kOe, TimeUtil_1.TimeUtil.InverseMillisecond);
    this.kOe();
  }
  jm() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.GOe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.GOe);
      this.GOe = undefined;
    }
  }
  OnBeforeDestroy() {
    this.jm();
  }
}
class RoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  Refresh(e, i, t) {
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    if (e) {
      this.SetTextureShowUntilLoaded(e.RoleHeadIcon, this.GetTexture(0));
    }
  }
}
//# sourceMappingURL=NewSoundAreaView.js.map
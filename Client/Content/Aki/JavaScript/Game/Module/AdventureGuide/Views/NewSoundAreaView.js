"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewSoundAreaView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const DetectionTabTypeById_1 = require("../../../../Core/Define/ConfigQuery/DetectionTabTypeById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ActivityDoubleRewardController_1 = require("../../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController");
const CommonDropDown_1 = require("../../Common/DropDown/CommonDropDown");
const OneTextDropDownItem_1 = require("../../Common/DropDown/Item/OneText/OneTextDropDownItem");
const OneTextTitleItem_1 = require("../../Common/DropDown/Item/OneText/OneTextTitleItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const RoguelikeDefine_1 = require("../../Roguelike/Define/RoguelikeDefine");
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
    this.kX1 = undefined;
    this.s8e = [];
    this.a8e = 4;
    this.H6e = undefined;
    this.nDu = undefined;
    this.sDu = undefined;
    this.aDu = 0;
    this.l8e = undefined;
    this._8e = undefined;
    this.u8e = 0;
    this.t5e = 0;
    this.i7i = new Array();
    this.si_ = t => {
      if (this.s8e) {
        for (let e = 0; e < this.s8e.length; e++) {
          if (this.s8e[e] === t) {
            this.r8e?.UnsafeGetGridProxy(e)?.RefreshRedDotState();
          }
        }
      }
    };
    this.hDu = e => new OneTextTitleItem_1.OneTextTitleItem(e);
    this.lDu = e => new OneTextDropDownItem_1.OneTextDropDownItem(e);
    this._Du = e => new NewSoundSuitDropDownTitle_1.NewSoundSuitDropDownTitle(e);
    this.uDu = e => {
      return new NewSoundSuitDropDownItem_1.NewSoundSuitDropDownItem(e);
    };
    this.d8e = e => {
      if (this.aDu === 1) {
        ModelManager_1.ModelManager.AdventureGuideModel.CurrentShowLevel = e;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NewSoundAreaRefreshReward, e);
      } else if (this.aDu === 2) {
        ModelManager_1.ModelManager.AdventureGuideModel.CurrentSelectSuitIndex = e;
        this.cDu();
      }
      if (this._8e?.GetCurrentSequence()) {
        this._8e?.ReplaySequenceByKey("Switch");
      } else {
        this._8e?.PlayLevelSequenceByName("Switch");
      }
    };
    this.C8e = (e, t) => {
      this.d8e(t);
    };
    this.dDu = e => {
      var t = e === ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel ? "Text_WorldCurrentLevelTag_Text" : "Text_WorldLevelTag_Text";
      return new LguiUtil_1.TableTextArgNew(t, e);
    };
    this.mDu = e => {
      return Number(e);
    };
    this.f8e = () => {
      UiManager_1.UiManager.OpenView("LordGymChallengeRecordView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UILoopScrollViewComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIItem], [15, UE.UIButtonComponent], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIText], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIText], [24, UE.UITexture], [25, UE.UIText], [26, UE.UIScrollViewWithScrollbarComponent], [27, UE.UIVerticalLayout], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIText]];
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
  }
  async OnBeforeStartAsync() {
    this.nDu = new CommonDropDown_1.CommonDropDown(this.GetItem(17), this.lDu, this.hDu);
    await this.nDu.Init();
    if (ModelManager_1.ModelManager.TowerModel.GetSeasonCountDownData().RemainingTime < 2) {
      await ControllerHolder_1.ControllerHolder.TowerController.RefreshTower();
    }
    this.sDu = new CommonDropDown_1.CommonDropDown(this.GetItem(29), this.uDu, this._Du);
    await this.sDu.Init();
  }
  OnStart() {
    const t = (e, t) => {
      if (this.a8e === 6) {
        var i = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleTutorialNew) ?? new Map();
        var [, r] = ModelManager_1.ModelManager.AdventureGuideModel.GetCanShowDungeonRecordsByType(this.a8e);
        for (const s of r) {
          i.set(s.Conf.Id, true);
        }
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleTutorialNew, i);
      }
      this.a8e = e;
      var o;
      var n;
      var r = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(e);
      this.aDu = r?.DropDownTypeId ?? 0;
      this.fDu();
      this.H6e?.SetToggleState(0, false);
      this.H6e = t;
      var t = this.s8e.indexOf(e);
      if (t >= 0) {
        this.r8e.SelectGridProxy(t, false);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AdventureHelpBtn, r.HelpGroupId);
      this.t5e = r.HelpGroupId;
      this.RefreshDungeonType();
      this.p8e();
      if (this.aDu === 1) {
        this.d8e(ModelManager_1.ModelManager.AdventureGuideModel.CurrentShowLevel);
      } else if (this.aDu === 2) {
        this.d8e(ModelManager_1.ModelManager.AdventureGuideModel.CurrentSelectSuitIndex);
      }
      if (this._8e?.GetCurrentSequence()) {
        this._8e?.ReplaySequenceByKey("Switch");
      } else {
        this._8e?.PlayLevelSequenceByName("Switch");
      }
      var e = ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetAdventureUpActivity(this.a8e);
      if (e) {
        this.GetItem(18).SetUIActive(true);
        t = e.GetNumTxtAndParam();
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(25), t[1] > 0 ? "Reward_doubling_tips" : "Reward_doubling_end_tips", t[1], t[2]);
        this.GetText(19).SetUIActive(false);
      } else {
        [r, e, t, o, n] = ModelManager_1.ModelManager.ActivityRegressModel.GetDetectionDoubleDropTuple(this.a8e);
        if (r) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(19), o, e, t);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(25), n);
          this.GetText(19).SetUIActive(true);
        }
        this.GetItem(18).SetUIActive(r);
      }
    };
    const i = e => this.a8e !== e;
    this.r8e = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(4).GetOwner(), () => {
      var e = new NewSoundTypeItem_1.NewSoundTypeItem();
      e.BindOnToggleFunc(t);
      e.BindCanToggleExecuteChange(i);
      return e;
    });
    this.n8e = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(3), this.GetItem(2).GetOwner(), () => new NewSoundDetectItem_1.NewSoundDetectItem(), true);
    this.kX1 = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(26), () => new NewSoundDetectTabItem_1.NewSoundDetectTabItem());
    ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupArray().forEach(e => {
      this.i7i.push(e.Id);
    });
    this.i7i.sort((e, t) => e - t);
    this.i7i.unshift(0);
    this.sDu.SetOnSelectCall(this.C8e);
    this.sDu.SetShowType(0);
    this.sDu.InitScroll(this.i7i, this.mDu, ModelManager_1.ModelManager.AdventureGuideModel.CurrentSelectSuitIndex);
    this.u8e = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel - 1;
    var r = [];
    for (let e = AdventureDefine_1.WORLD_LEVEL_MIN; e <= AdventureDefine_1.WORLD_LEVEL_MAX; e++) {
      r.push(e);
    }
    this.nDu.SetOnSelectCall(this.C8e);
    this.nDu.SetShowType(0);
    this.nDu.InitScroll(r, this.dDu, this.u8e);
    var e = ModelManager_1.ModelManager.AdventureGuideModel.GetAllCanShowDungeonTypeList();
    this.s8e = e;
    this.l8e = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this._8e = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  p8e() {
    var [e, t] = ModelManager_1.ModelManager.AdventureGuideModel.GetCanShowDungeonRecordsByType(this.a8e);
    if (e) {
      this.OX1(t);
    } else {
      this.qX1(t);
    }
  }
  qX1(e) {
    var t = e.length;
    this.kX1?.SetActive(false);
    this.n8e.SetTargetRootComponentActive(true);
    if (t) {
      const s = this.$8i?.NewSoundDetectTracingIdList;
      var i;
      var r = e.sort((e, t) => {
        e = s?.includes(e.Conf.Id);
        t = s?.includes(t.Conf.Id);
        if (e && !t) {
          return -1;
        } else if (t && !e) {
          return 1;
        } else {
          return 0;
        }
      });
      var o = new Array();
      var n = ModelManager_1.ModelManager.WeeklyRogueModel.CycleId;
      for (let e = 0; e < t; e++) {
        if (r[e]?.Conf?.Secondary !== 29 || n !== 0) {
          (i = new NewSoundDetectItem_1.NewSoundDetectItemData()).DetectRecordData = r[e];
          i.TracingList = s;
          o.push(i);
        }
      }
      this.n8e.RefreshByData(o);
    }
  }
  OX1(e) {
    this.kX1?.SetActive(true);
    this.n8e.SetTargetRootComponentActive(false);
    var t = new Map();
    const i = this.$8i?.NewSoundDetectTracingIdList;
    for (const n of e.sort((e, t) => {
      e = i?.includes(e.Conf.Id);
      t = i?.includes(t.Conf.Id);
      if (e && !t) {
        return -1;
      } else if (t && !e) {
        return 1;
      } else {
        return 0;
      }
    })) {
      var r = n.DungeonDetectionRecord ? n.DungeonDetectionRecord.Conf.DetectionTabType : n.SilentAreaDetectionRecord?.Conf.DetectionTabType ?? 0;
      if (r) {
        if (!t.has(r)) {
          var o = DetectionTabTypeById_1.configDetectionTabTypeById.GetConfig(r);
          if (!o) {
            continue;
          }
          o = {
            Id: r,
            TabTextId: o.Text,
            IconPath: o.Icon,
            Sort: o.Order,
            DungeonList: [],
            IsVisible: true
          };
          t.set(r, o);
        }
        o = new NewSoundDetectItem_1.NewSoundDetectItemData();
        o.DetectRecordData = n;
        o.TracingList = i;
        t.get(r).DungeonList.push(o);
      }
    }
    e = Array.from(t.values()).sort((e, t) => t.Sort - e.Sort);
    this.kX1?.RefreshByData(e);
  }
  OnBeforeShow() {
    this.$8i = this.ExtraParams;
    var e = this.$8i;
    var e = e.OpenTabViewName === "NewSoundAreaView" || e.OpenTabViewName === "DisposableChallengeView" ? Number(e.OpenParam) : this.a8e;
    let t = 0;
    if (e !== undefined && (e = this.s8e.indexOf(Number(e))) >= 0) {
      t = e;
    }
    var i = this.GetViewName();
    var r = this.s8e.length;
    var o = new Array();
    for (let e = 0; e < r; e++) {
      var n = ModelManager_1.ModelManager.WeeklyRogueModel.CycleId;
      if (this.s8e[e] !== 29 || n !== 0) {
        n = {
          FromTabViewName: i,
          TypeId: this.s8e[e]
        };
        o.push(n);
      }
    }
    this.r8e.RefreshByData(o, undefined, () => {
      this.r8e.SelectGridProxy(t, true);
      this.r8e.UnsafeGetGridProxy(t)?.SetSelectToggle();
    });
    this.l8e?.PlayLevelSequenceByName("Start");
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AdventureHelpBtn, this.t5e);
    if (i === "NewSoundAreaView" && (e = ModelManager_1.ModelManager.RedDotModel.GetRedDot("AdventureNewSoundAreaTab")) && e.IsRedDotActive()) {
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
    var t = ModelManager_1.ModelManager.RoguelikeModel?.GetParamConfigBySeasonId();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "Roguelike_ActivityMain_Score", e, t);
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
    var t = this.GetTexture(24);
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.SetTextureShowUntilLoaded(e, t);
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
    var t = this.GetItem(8);
    t?.SetUIActive(true);
    var i = this.GetText(10);
    var r = this.GetText(9);
    if (this.a8e === 7) {
      r.SetUIActive(false);
      var o = ModelManager_1.ModelManager.AdventureGuideModel.GetCanShowDungeonRecordsByType(this.a8e)[1];
      let e = 0;
      if (o[0].Type === 1) {
        var n = o[0].Conf.MarkId;
        if (!n) {
          t.SetUIActive(false);
          return;
        }
        e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(n)?.Reward;
      } else {
        if (!o[0].Conf.DungeonId) {
          t.SetUIActive(false);
          return;
        }
        e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(o[0].Conf.SubDungeonId)?.RewardId;
      }
      i.SetUIActive(true);
      var n = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(e)?.SharedId;
      if (n) {
        o = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareConfig(n);
        n = ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(n);
        n = (o = o.MaxCount) - n;
        LguiUtil_1.LguiUtil.SetLocalText(i, AdventureGuideController_1.RECEIVED_COUNT, n + "/" + o);
      } else {
        t.SetUIActive(false);
      }
    } else if (this.a8e === 5) {
      i?.SetUIActive(false);
      r.SetUIActive(true);
      n = ModelManager_1.ModelManager.TowerModel.GetSeasonCountDownData().CountDownText;
      r.SetText(n);
    } else if (this.a8e === 28) {
      i?.SetUIActive(false);
      r.SetUIActive(true);
      o = ModelManager_1.ModelManager.ShipTowerModel.GetSeasonCountDownData().CountDownText;
      r.SetText(o);
    } else if (this.a8e === 29) {
      i?.SetUIActive(false);
      r.SetUIActive(true);
      t = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetCycleCountDownData().CountDownText;
      r.SetText(t);
    }
  }
  OnBeforeHide() {
    if (UiManager_1.UiManager.IsViewShow("PowerView")) {
      UiManager_1.UiManager.CloseView("PowerView");
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 1 || isNaN(Number(e[0]))) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 53, "聚焦引导extraParam项配置有误", ["configParams", e]);
      }
    } else {
      e = Number(e[0]);
      if (e === 0) {
        if (t = this.n8e.GetGridByDisplayIndex(0)) {
          return [t, t];
        } else {
          return undefined;
        }
      }
      var t = this.s8e.indexOf(e);
      if (t >= 0) {
        e = this.r8e?.UnsafeGetGridProxy(t);
        if (e) {
          e = e.GetButtonItem();
          if (e) {
            this.r8e?.ScrollToGridIndexWithTween(t);
            return [e, e];
          }
        }
      }
    }
  }
  fDu() {
    if (this.aDu === 0) {
      this.GetItem(21).SetUIActive(false);
    } else {
      this.GetItem(21).SetUIActive(true);
      this.GetItem(17)?.SetUIActive(this.aDu === 1);
      this.GetItem(29)?.SetUIActive(this.aDu === 2);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(30), ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropDownConfig(this.aDu)?.Text ?? "");
    }
  }
  cDu() {
    var [e, t] = ModelManager_1.ModelManager.AdventureGuideModel.GetCanShowDungeonRecordsByType(this.a8e);
    let i = [];
    if (ModelManager_1.ModelManager.AdventureGuideModel.CurrentSelectSuitIndex) {
      for (const r of t) {
        if (r.SilentAreaDetectionRecord && r.SilentAreaDetectionRecord.Conf.PhantomFetterGroup.includes(ModelManager_1.ModelManager.AdventureGuideModel.CurrentSelectSuitIndex)) {
          i.push(r);
        }
      }
    } else {
      i = t;
    }
    if (e) {
      this.OX1(i);
    } else {
      this.qX1(i);
    }
  }
}
exports.NewSoundAreaView = NewSoundAreaView;
//# sourceMappingURL=NewSoundAreaView.js.map
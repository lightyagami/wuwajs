"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NewSoundAreaView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  DetectionTabTypeById_1 = require("../../../../Core/Define/ConfigQuery/DetectionTabTypeById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ActivityDoubleRewardController_1 = require("../../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  CommonDropDown_1 = require("../../Common/DropDown/CommonDropDown"),
  OneTextDropDownItem_1 = require("../../Common/DropDown/Item/OneText/OneTextDropDownItem"),
  OneTextTitleItem_1 = require("../../Common/DropDown/Item/OneText/OneTextTitleItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  RoguelikeDefine_1 = require("../../Roguelike/Define/RoguelikeDefine"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  AdventureDefine_1 = require("../AdventureDefine"),
  AdventureGuideController_1 = require("../AdventureGuideController"),
  NewSoundDetectItem_1 = require("./NewSoundDetectItem"),
  NewSoundDetectTabItem_1 = require("./NewSoundDetectTabItem"),
  NewSoundTypeItem_1 = require("./NewSoundTypeItem");
class NewSoundAreaView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments), this.$8i = void 0, this.r8e = void 0, this.n8e = void 0, this.jK1 = void 0, this.s8e = [], this.a8e = 4, this.H6e = void 0, this.h8e = void 0, this.l8e = void 0, this._8e = void 0, this.u8e = 0, this.t5e = 0, this.UKs = 1, this.si_ = i => {
      if (this.s8e)
        for (let e = 0; e < this.s8e.length; e++) this.s8e[e] === i && this.r8e?.UnsafeGetGridProxy(e)?.RefreshRedDotState()
    }, this.c8e = e => new OneTextTitleItem_1.OneTextTitleItem(e), this.m8e = e => new OneTextDropDownItem_1.OneTextDropDownItem(e), this.d8e = e => {
      this.UKs = e, ModelManager_1.ModelManager.AdventureGuideModel.CurrentShowLevel = e, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NewSoundAreaRefreshReward, e), this._8e?.GetCurrentSequence() ? this._8e?.ReplaySequenceByKey("Switch") : this._8e?.PlayLevelSequenceByName("Switch")
    }, this.C8e = (e, i) => {
      this.d8e(i)
    }, this.g8e = e => {
      var i = e === ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel ? "Text_WorldCurrentLevelTag_Text" : "Text_WorldLevelTag_Text";
      return new LguiUtil_1.TableTextArgNew(i, e)
    }, this.f8e = () => {
      UiManager_1.UiManager.OpenView("LordGymChallengeRecordView")
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UILoopScrollViewComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIText],
      [14, UE.UIItem],
      [15, UE.UIButtonComponent],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIText],
      [20, UE.UIItem],
      [21, UE.UIItem],
      [22, UE.UIItem],
      [23, UE.UIText],
      [24, UE.UITexture],
      [25, UE.UIText],
      [26, UE.UIScrollViewWithScrollbarComponent],
      [27, UE.UIVerticalLayout],
      [28, UE.UIItem]
    ], this.BtnBindInfo = [
      [15, this.f8e]
    ]
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RedDotAdventureSecondaryUpdate, this.si_)
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RedDotAdventureSecondaryUpdate, this.si_)
  }
  OnBeforeDestroy() {
    this.r8e?.ClearGridProxies(), this.n8e?.ClearGridProxies(), this.l8e?.Clear(), this.l8e = void 0, this._8e?.Clear(), this._8e = void 0
  }
  async OnBeforeStartAsync() {
    this.h8e = new CommonDropDown_1.CommonDropDown(this.GetItem(17), this.m8e, this.c8e), await this.h8e.Init(), ModelManager_1.ModelManager.TowerModel.GetSeasonCountDownData().RemainingTime < 2 && await ControllerHolder_1.ControllerHolder.TowerController.RefreshTower()
  }
  OnStart() {
    const i = (e, i) => {
        this.a8e = e;
        var t, r = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(e),
          n = r?.ShowDropDown ?? !1,
          i = (this.GetItem(21)?.SetUIActive(n), this.H6e?.SetToggleState(0, !1), this.H6e = i, this.s8e.indexOf(e)),
          e = (0 <= i && this.r8e.SelectGridProxy(i, !1), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AdventureHelpBtn, r.HelpGroupId), this.t5e = r.HelpGroupId, this.RefreshDungeonType(), this.p8e(), n && this.d8e(this.UKs), this._8e?.GetCurrentSequence() ? this._8e?.ReplaySequenceByKey("Switch") : this._8e?.PlayLevelSequenceByName("Switch"), ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetAdventureUpActivity(this.a8e));
        e ? (this.GetItem(18).SetUIActive(!0), i = e.GetNumTxtAndParam(), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(25), 0 < i[1] ? "Reward_doubling_tips" : "Reward_doubling_end_tips", i[1], i[2]), this.GetText(19).SetUIActive(!1)) : ([r, n, e, i, t] = ModelManager_1.ModelManager.ActivityRegressModel.GetDetectionDoubleDropTuple(this.a8e), r && (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(19), i, n, e), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(25), t), this.GetText(19).SetUIActive(!0)), this.GetItem(18).SetUIActive(r))
      },
      t = e => this.a8e !== e;
    this.r8e = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(4).GetOwner(), () => {
      var e = new NewSoundTypeItem_1.NewSoundTypeItem;
      return e.BindOnToggleFunc(i), e.BindCanToggleExecuteChange(t), e
    }), this.n8e = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(3), this.GetItem(2).GetOwner(), () => new NewSoundDetectItem_1.NewSoundDetectItem, !0), this.jK1 = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(26), () => new NewSoundDetectTabItem_1.NewSoundDetectTabItem);
    var r = [];
    for (let e = AdventureDefine_1.WORLD_LEVEL_MIN; e <= AdventureDefine_1.WORLD_LEVEL_MAX; e++) r.push(e);
    this.u8e = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel - 1, this.UKs = this.u8e, this.h8e.SetOnSelectCall(this.C8e), this.h8e.SetShowType(0), this.h8e.InitScroll(r, this.g8e, this.u8e);
    var e = ModelManager_1.ModelManager.AdventureGuideModel.GetAllCanShowDungeonTypeList();
    this.s8e = e, this.l8e = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), this._8e = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)
  }
  p8e() {
    var [e, i] = ModelManager_1.ModelManager.AdventureGuideModel.GetCanShowDungeonRecordsByType(this.a8e);
    e ? this.HK1(i) : this.$K1(i)
  }
  $K1(e) {
    var i = e.length;
    if (this.jK1?.SetActive(!1), this.n8e.SetTargetRootComponentActive(!0), i) {
      const s = this.$8i?.NewSoundDetectTracingIdList;
      var t, r = e.sort((e, i) => {
          e = s?.includes(e.Conf.Id), i = s?.includes(i.Conf.Id);
          return e && !i ? -1 : i && !e ? 1 : 0
        }),
        n = new Array,
        o = ModelManager_1.ModelManager.WeeklyRogueModel.CycleId;
      for (let e = 0; e < i; e++) 29 === r[e]?.Conf?.Secondary && 0 === o || ((t = new NewSoundDetectItem_1.NewSoundDetectItemData).DetectRecordData = r[e], t.TracingList = s, n.push(t));
      this.n8e.RefreshByData(n)
    }
  }
  HK1(e) {
    var i = e.length;
    if (this.jK1?.SetActive(!0), this.n8e.SetTargetRootComponentActive(!1), i) {
      var t = new Map;
      const o = this.$8i?.NewSoundDetectTracingIdList;
      for (const s of e.sort((e, i) => {
          e = o?.includes(e.Conf.Id), i = o?.includes(i.Conf.Id);
          return e && !i ? -1 : i && !e ? 1 : 0
        }))
        if (s.DungeonDetectionRecord && 0 !== s.DungeonDetectionRecord.Conf.DetectionTabType) {
          var r = s.DungeonDetectionRecord.Conf.DetectionTabType;
          if (!t.has(r)) {
            var n = DetectionTabTypeById_1.configDetectionTabTypeById.GetConfig(r);
            if (!n) continue;
            n = {
              Id: r,
              TabTextId: n.Text,
              IconPath: n.Icon,
              Sort: n.Order,
              DungeonList: [],
              IsVisible: !0
            };
            t.set(r, n)
          }
          n = new NewSoundDetectItem_1.NewSoundDetectItemData;
          n.DetectRecordData = s, n.TracingList = o, t.get(r).DungeonList.push(n)
        } i = Array.from(t.values()).sort((e, i) => i.Sort - e.Sort);
      this.jK1?.RefreshByData(i)
    }
  }
  OnBeforeShow() {
    this.$8i = this.ExtraParams;
    var e = this.$8i,
      e = "NewSoundAreaView" === e.OpenTabViewName || "DisposableChallengeView" === e.OpenTabViewName ? Number(e.OpenParam) : this.a8e;
    let i = 0;
    void 0 !== e && 0 <= (e = this.s8e.indexOf(Number(e))) && (i = e);
    var t = this.GetViewName(),
      r = this.s8e.length,
      n = new Array;
    for (let e = 0; e < r; e++) {
      var o = ModelManager_1.ModelManager.WeeklyRogueModel.CycleId;
      29 === this.s8e[e] && 0 === o || (o = {
        FromTabViewName: t,
        TypeId: this.s8e[e]
      }, n.push(o))
    }
    this.r8e.RefreshByData(n, void 0, () => {
      this.r8e.SelectGridProxy(i, !0), this.r8e.UnsafeGetGridProxy(i)?.SetSelectToggle()
    }), this.l8e?.PlayLevelSequenceByName("Start"), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AdventureHelpBtn, this.t5e), "NewSoundAreaView" === t && (e = ModelManager_1.ModelManager.RedDotModel.GetRedDot("AdventureNewSoundAreaTab")) && e.IsRedDotActive() && AdventureGuideController_1.AdventureGuideController.RecordAdventureNewSoundAreaTabClick()
  }
  RefreshDungeonType() {
    switch (this.GetItem(5).SetUIActive(!1), this.GetItem(8).SetUIActive(!1), this.GetItem(12).SetUIActive(!1), this.GetItem(14).SetUIActive(!1), this.GetItem(16).SetUIActive(!1), this.GetItem(11).SetUIActive(!1), this.GetItem(20).SetUIActive(!1), this.GetItem(22).SetUIActive(!1), this.a8e) {
      case 18:
        this.v8e();
        break;
      case 5:
        this.M8e(), this.E8e();
        break;
      case 28:
        this.M8e(), this.bV_();
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
        this.M8e(), this.J4_()
    }
  }
  J4_() {
    this.GetItem(11).SetUIActive(!0), this.GetItem(22).SetUIActive(!0);
    var e = (ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData)?.GetCycleConfig();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(23), e.CycleName)
  }
  v8e() {
    this.GetItem(5).SetUIActive(!0);
    var e = ModelManager_1.ModelManager.InventoryModel?.GetItemCountByConfigId(RoguelikeDefine_1.OUTSIDE_CURRENCY_ID) ?? 0,
      i = ModelManager_1.ModelManager.RoguelikeModel?.GetParamConfigBySeasonId();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "Roguelike_ActivityMain_Score", e, i)
  }
  E8e() {
    this.GetItem(11).SetUIActive(!0), this.GetItem(12).SetUIActive(!0);
    var e = ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty(),
      e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetNewTowerDifficultTitle(e);
    this.GetText(13)?.SetText(e), this.SetTowerBg("T_DevelopmentFrame7")
  }
  bV_() {
    this.GetItem(11).SetUIActive(!0), this.GetItem(12).SetUIActive(!0);
    var e = ModelManager_1.ModelManager.ShipTowerModel.GetCurrentStageSeasonName2();
    this.GetText(13)?.SetText(e), this.SetTowerBg("T_DevelopmentTitle6")
  }
  SetTowerBg(e) {
    var i = this.GetTexture(24),
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.SetTextureShowUntilLoaded(e, i)
  }
  S8e() {
    this.GetItem(11).SetUIActive(!0), this.GetItem(14).SetUIActive(!0)
  }
  y8e() {
    this.GetItem(11).SetUIActive(!0), this.GetItem(20).SetUIActive(!0)
  }
  I8e() {
    this.GetItem(11).SetUIActive(!0), this.GetItem(16).SetUIActive(!0)
  }
  M8e() {
    var i = this.GetItem(8),
      t = (i?.SetUIActive(!0), this.GetText(10)),
      r = this.GetText(9);
    if (7 === this.a8e) {
      r.SetUIActive(!1);
      var n = ModelManager_1.ModelManager.AdventureGuideModel.GetCanShowDungeonRecordsByType(this.a8e)[1];
      let e = 0;
      if (1 === n[0].Type) {
        var o = n[0].Conf.MarkId;
        if (!o) return void i.SetUIActive(!1);
        e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(o)?.Reward
      } else {
        if (!n[0].Conf.DungeonId) return void i.SetUIActive(!1);
        e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(n[0].Conf.SubDungeonId)?.RewardId
      }
      t.SetUIActive(!0);
      var o = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(e)?.SharedId;
      o ? (n = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareConfig(o), o = ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(o), o = (n = n.MaxCount) - o, LguiUtil_1.LguiUtil.SetLocalText(t, AdventureGuideController_1.RECEIVED_COUNT, o + "/" + n)) : i.SetUIActive(!1)
    } else 5 === this.a8e ? (t?.SetUIActive(!1), r.SetUIActive(!0), o = ModelManager_1.ModelManager.TowerModel.GetSeasonCountDownData().CountDownText, r.SetText(o)) : 28 === this.a8e ? (t?.SetUIActive(!1), r.SetUIActive(!0), n = ModelManager_1.ModelManager.ShipTowerModel.GetSeasonCountDownData().CountDownText, r.SetText(n)) : 29 === this.a8e && (t?.SetUIActive(!1), r.SetUIActive(!0), i = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetCycleCountDownData().CountDownText, r.SetText(i))
  }
  OnBeforeHide() {
    UiManager_1.UiManager.IsViewShow("PowerView") && UiManager_1.UiManager.CloseView("PowerView")
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (1 !== e.length || isNaN(Number(e[0]))) Log_1.Log.CheckError() && Log_1.Log.Error("Guide", 53, "聚焦引导extraParam项配置有误", ["configParams", e]);
    else {
      e = Number(e[0]);
      if (0 === e) return (i = this.n8e.GetGridByDisplayIndex(0)) ? [i, i] : void 0;
      var i = this.s8e.indexOf(e);
      if (0 <= i) {
        e = this.r8e?.UnsafeGetGridProxy(i);
        if (e) {
          e = e.GetButtonItem();
          if (e) return this.r8e?.ScrollToGridIndexWithTween(i), [e, e]
        }
      }
    }
  }
}
exports.NewSoundAreaView = NewSoundAreaView;
//# sourceMappingURL=NewSoundAreaView.js.map
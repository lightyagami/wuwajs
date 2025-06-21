"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ItemRewardController = void 0;
const AudioController_1 = require("../../../Core/Audio/AudioController"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  FlySkinConfigById_1 = require("../../../Core/Define/ConfigQuery/FlySkinConfigById"),
  PropRewardConfById_1 = require("../../../Core/Define/ConfigQuery/PropRewardConfById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  UiModel_1 = require("../../Ui/UiModel"),
  ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  FriendController_1 = require("../Friend/FriendController"),
  GachaController_1 = require("../Gacha/GachaController"),
  ItemExchangeController_1 = require("../ItemExchange/ItemExchangeController"),
  RoleLevelUpSuccessController_1 = require("../RoleUi/RoleLevel/RoleLevelUpSuccessController"),
  ItemRewardDefine_1 = require("./ItemRewardDefine"),
  RewardItemData_1 = require("./RewardData/RewardItemData"),
  FLY_STRENGTH_MAX_ATTRIBUTE_INDEX = 138;
class ItemRewardController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return this.qKl = CommonParamById_1.configCommonParamById.GetIntConfig("FlyStrengthItemId"), !0
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(25880, this.mMa)
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25880)
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemRewardNotify, this.b0i)
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemRewardNotify, this.b0i)
  }
  static GetRewardViewReasonArray() {
    if (!this.RewardViewReasonArray) {
      this.RewardViewReasonArray = [];
      for (const e of ConfigManager_1.ConfigManager.ItemRewardConfig?.GetAllRewardViewFromSourceConfig()) this.RewardViewReasonArray.push(e.RewardSourceId)
    }
    return this.RewardViewReasonArray
  }
  static OpenCommonRewardView(e, r, o) {
    e = ModelManager_1.ModelManager.ItemRewardModel.RefreshCommonRewardDataFromConfig(e, "CommonRewardView", r, o);
    e && this.Open(e)
  }
  static OpenQuestRewardView(e, r, o) {
    e = ModelManager_1.ModelManager.ItemRewardModel.RefreshCommonRewardDataFromConfig(e, "QuestRewardView", r, o);
    e && this.Open(e)
  }
  static OpenExploreLevelRewardView(e) {
    var r = ModelManager_1.ModelManager.ExploreLevelModel.GetCurrentCountryExploreLevelData();
    r && (r = r.GetExploreLevel(), r = ModelManager_1.ModelManager.ItemRewardModel.RefreshExploreLevelRewardData("ExploreLevelRewardView", r, r + 1, e), this.Open(r))
  }
  static OpenCompositeRewardView(e, r = !0, o, t) {
    e = ModelManager_1.ModelManager.ItemRewardModel.RefreshCompositeRewardDataFromConfig(e, r, o, t);
    e && this.Open(e)
  }
  static OpenExploreRewardView(e, r = !0, o, t, a, n, i, l, d, _, s, g, C, m, w, M, I) {
    e = ModelManager_1.ModelManager.ItemRewardModel.RefreshExploreRewardDataFromConfig(e, r, o, t, a, n, i, l, d, _, g, C, m, w, M, I);
    return !!e && (this.Open(e, s), !0)
  }
  static OpenExploreRewardViewNew(e) {
    var r = ModelManager_1.ModelManager.ItemRewardModel.RefreshExploreRewardDataFromConfigNew(e);
    return !!r && (this.Open(r, e.FinishCallback), !0)
  }
  static OpenBattlePassExtraRewardView(e) {
    e = ControllerHolder_1.ControllerHolder.BattlePassController.BuildExtraRewardData(e);
    return this.Open(e, e.GetRewardInfo().FinishCallback), !0
  }
  static Open(e, o) {
    var r;
    UiManager_1.UiManager.IsViewOpen("DrawMainView") || (r = e.GetRewardInfo(), UiManager_1.UiManager.IsViewOpen(r.ViewName) ? EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshRewardView, e) : (r = r.ViewName, UiManager_1.UiManager.OpenView(r, e, (e, r) => {
      o?.(e), e && UiModel_1.UiModel.NormalStack.Peek().AddChildViewById(r)
    })))
  }
  static Close(e) {
    e ? (e = e.GetRewardInfo().ViewName, UiManager_1.UiManager.IsViewShow(e) && UiManager_1.UiManager.CloseView(e)) : (UiManager_1.UiManager.IsViewShow("CommonRewardView") && UiManager_1.UiManager.CloseView("CommonRewardView"), UiManager_1.UiManager.IsViewShow("CompositeRewardView") && UiManager_1.UiManager.CloseView("CompositeRewardView"), UiManager_1.UiManager.IsViewShow("ExploreRewardView") && UiManager_1.UiManager.CloseView("ExploreRewardView"))
  }
  static SetItemList(e) {
    ModelManager_1.ModelManager.ItemRewardModel.SetItemList(e)
  }
  static AddItemList(e) {
    ModelManager_1.ModelManager.ItemRewardModel.AddItemList(e)
  }
  static SetProgressQueue(e) {
    ModelManager_1.ModelManager.ItemRewardModel.SetProgressQueue(e)
  }
  static SetExploreBarDataList(e) {
    ModelManager_1.ModelManager.ItemRewardModel.SetExploreBarDataList(e)
  }
  static SetExploreRecordInfo(e) {
    ModelManager_1.ModelManager.ItemRewardModel.SetExploreRecordInfo(e)
  }
  static SetButtonList(e) {
    ModelManager_1.ModelManager.ItemRewardModel.SetButtonList(e)
  }
  static SetExploreFriendDataList(e) {
    ModelManager_1.ModelManager.ItemRewardModel.SetExploreFriendDataList(e)
  }
  static BuildExploreFriendDataList() {
    var e, r, o, t, a = [],
      n = ModelManager_1.ModelManager.FriendModel,
      i = ModelManager_1.ModelManager.OnlineModel;
    for (const l of i.GetTeamList()) l.IsSelf || (t = l.PlayerId, r = (e = i.GetCurrentTeamListById(t)) ? ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(l.HeadId, !1).GetRoleHeadIconCircle() : "", o = e ? ItemRewardController.$zs(e.PlayerNumber) : "", t = {
      PlayerId: t,
      PlayerLevel: l.Level,
      IsMyFriend: n.IsMyFriend(t),
      PlayerName: e?.PlayerName ?? "",
      PlayerDesc: e?.Signature ?? "",
      PlayerIconPath: r,
      PlayerIndexPath: o,
      OnClickCallback: e => {
        FriendController_1.FriendController.RequestFriendApplyAddSend(e, Protocol_1.Aki.Protocol.D6s.Proto_RecentlyTeam)
      }
    }, a.push(t));
    return a
  }
  static $zs(e) {
    e = `FormationOnline${e}PIcon`;
    return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e)
  }
  static BuildExploreFriendIdList() {
    var e = [];
    for (const r of ModelManager_1.ModelManager.OnlineModel.GetTeamList()) r.IsSelf || e.push(r.PlayerId);
    return e
  }
  static PlayAudio(e, r) {
    var o;
    StringUtils_1.StringUtils.IsEmpty(e) || (o = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e)) && (AudioController_1.AudioController.PostEventByUi(o.Path, r), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("Test", 37, "[ItemReward]播放结算音频", ["audioId", e])
  }
  static OpenSoarStrengthUpView(r) {
    var o = CommonParamById_1.configCommonParamById.GetIntConfig("FlyStrengthItemId"),
      o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(o);
    if (o && o.Parameters) {
      let e = 0;
      for (var [, t] of o.Parameters) {
        e = t;
        break
      }
      if (0 !== e) {
        var o = PropRewardConfById_1.configPropRewardConfById.GetConfig(e);
        if (o) {
          let e = 0;
          for (const a of o.Props)
            if (10 === a.Id) {
              e = a.Value;
              break
            } 0 !== e && (e *= r, o = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetMax(10), r = {
            Name: (r = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(FLY_STRENGTH_MAX_ATTRIBUTE_INDEX)).Name,
            IconPath: r.Icon,
            ShowArrow: !0,
            PreText: Math.floor((o - e) / 100).toString(),
            CurText: Math.floor(o / 100).toString()
          }, o = {
            Title: "Flying_EnergyUp",
            StrengthUpgradeData: {
              AttributeId: 10,
              SingleStrengthValue: CommonParamById_1.configCommonParamById.GetIntConfig("FlySingleStrengthValue"),
              MaxSingleStrengthItemCount: CommonParamById_1.configCommonParamById.GetIntConfig("FlyMaxSingleStrengthItemCount"),
              MaxStrength: o
            },
            AttributeInfo: [r]
          }, RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(o))
        }
      }
    }
  }
}
exports.ItemRewardController = ItemRewardController, (_a = ItemRewardController).RewardViewReasonArray = void 0, ItemRewardController.qKl = 0, ItemRewardController.b0i = r => {
  var o = r.gws,
    t = Object.keys(o);
  if (o && t) {
    var a = [],
      n = [],
      i = [];
    let e = 0;
    for (const I of t) {
      var l = o[I]?.O9n;
      if (l && 0 !== l.length) {
        var d = Number(I);
        for (const f of l) {
          var _ = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(f.L8n),
            s = new RewardItemData_1.RewardItemData(f.L8n, f.m9n, f.b9n, d);
          f.L8n === _a.qKl && (e += f.m9n), (11 === _ ? n : 14 === _ && FlySkinConfigById_1.configFlySkinConfigById.GetConfig(f.L8n).IsSpecialViewAfterObtain ? i : a).push(s)
        }
      }
    }
    var t = ModelManager_1.ModelManager.ItemRewardModel,
      g = r.x9n;
    if (Log_1.Log.CheckInfo() && Log_1.Log.Info("Test", 37, "[ItemRewardController]当掉落协议通知时", ["reasonId", g]), t.CurrentReasonId !== g && t.ClearCurrentRewardData(), t.CurrentReasonId = g, !ItemRewardDefine_1.blockReasonIdList.includes(g))
      if (g === ItemRewardDefine_1.EXPLORE_LEVEL_RESON) ItemRewardController.OpenExploreLevelRewardView(a);
      else if (g === ItemRewardDefine_1.ROGUE_INST_FIRST_REWARD) ModelManager_1.ModelManager.RoguelikeModel.ShowRewardList = a, KuroSdkReport_1.KuroSdkReport.OnRougeFinish();
    else if (g === ItemRewardDefine_1.BLACK_STONE_RESON) {
      t = [];
      t.push({
        ButtonTextId: "ConfirmBox_45_ButtonText_1",
        DescriptionTextId: void 0,
        DescriptionArgs: void 0,
        IsTimeDownCloseView: !1,
        IsClickedCloseView: !1,
        OnClickedCallback: e => {
          UiManager_1.UiManager.IsViewShow("ExploreRewardView") && UiManager_1.UiManager.CloseView("ExploreRewardView")
        }
      });
      let e = 1 < r.B9n ? ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivityFullTip([3], !1) : void 0;
      var C, m, w, r = ModelManager_1.ModelManager.ActivityRegressModel.LastUnGetRewardLevelPlayId;
      0 !== r && ([r, C, m, w, M] = ModelManager_1.ModelManager.ActivityRegressModel.GetLevelPlayDoubleDropTuple(r), e = r ? "" + ConfigManager_1.ConfigManager.TextConfig.GetMultiText(M) + ConfigManager_1.ConfigManager.TextConfig.GetMultiText(w, C, m) : void 0, ModelManager_1.ModelManager.ActivityRegressModel.LastUnGetRewardLevelPlayId = 0), void ItemRewardController.OpenExploreRewardView(ItemRewardDefine_1.BLACK_STONE_CONFIG, !0, a, void 0, void 0, t, void 0, void 0, void 0, e, void 0, void 0, void 0, void 0, !0)
    } else {
      var M, r = _a.GetRewardViewReasonArray().includes(g) ? ConfigManager_1.ConfigManager.ItemRewardConfig.GetRewardViewFromSourceConfig(g) : void 0;
      if (g !== ItemRewardDefine_1.QUEST_SPECIAL_REWARD || !r) return r ? 0 < n.length ? void ControllerHolder_1.ControllerHolder.SkinController.OpenObtainSkinView(n, a) : 0 < i.length ? void ControllerHolder_1.ControllerHolder.SkinController.OpenObtainFlySkinView(i, a) : (M = r.RewardViewId, 0 < e ? void ItemRewardController.OpenCommonRewardView(M, a, () => {
        _a.OpenSoarStrengthUpView(e)
      }) : void ItemRewardController.OpenCommonRewardView(M, a)) : void ItemRewardController.AddItemList(a);
      ItemRewardController.OpenQuestRewardView(r.RewardViewId, a)
    }
  }
}, ItemRewardController.mMa = e => {
  _a.OnItemObtainNotify(e)
}, ItemRewardController.OnItemObtainNotify = (r, o) => {
  var t = r.Rb_;
  if (!(t.length <= 0)) {
    var a = [],
      n = [],
      i = [];
    const s = [];
    let e = 0;
    for (const g of t) {
      var l, d = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(g.wb_.s5n);
      1 === d ? s.push(g) : 11 === d ? (l = new RewardItemData_1.RewardItemData(g.wb_.s5n, g.wb_.m9n, g.wb_.b9n), n.push(l)) : 14 === d ? (l = new RewardItemData_1.RewardItemData(g.wb_.s5n, g.wb_.m9n, g.wb_.b9n), (FlySkinConfigById_1.configFlySkinConfigById.GetConfig(g.wb_.s5n).IsSpecialViewAfterObtain ? i : a).push(l)) : (d = new RewardItemData_1.RewardItemData(g.wb_.s5n, g.wb_.m9n, g.wb_.b9n), g.wb_.s5n === _a.qKl && (e += g.wb_.m9n), a.push(d))
    }
    var t = ModelManager_1.ModelManager.ItemRewardModel,
      _ = r.x9n,
      t = (Log_1.Log.CheckInfo() && Log_1.Log.Info("Test", 37, "[ItemRewardController]当服务端通知奖励获得时", ["reasonId", _]), t.CurrentReasonId !== _ && t.ClearCurrentRewardData(), t.CurrentReasonId = _, _a.GetRewardViewReasonArray().includes(_) ? ConfigManager_1.ConfigManager.ItemRewardConfig.GetRewardViewFromSourceConfig(_) : void 0);
    if (t) {
      _ = t.RewardViewId, t = t.RewardSourceId;
      if (t !== ItemRewardDefine_1.ITEM_EXCHANGE_RESON || ItemExchangeController_1.ItemExchangeController.NeedPop)
        if (t === ItemRewardDefine_1.QUEST_SPECIAL_REWARD) ItemRewardController.OpenQuestRewardView(_, a, o);
        else if (t === ItemRewardDefine_1.FISHING_ITEM_AUTO_CONVERT) ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Fishing_AutoMaterial");
      else if (0 < e) ItemRewardController.OpenCommonRewardView(_, a, () => {
        _a.OpenSoarStrengthUpView(e)
      });
      else if (t === ItemRewardDefine_1.BATTLE_PASS_REWARD_REASON && ControllerHolder_1.ControllerHolder.BattlePassController.IsNeedExtraRewardView()) ItemRewardController.OpenBattlePassExtraRewardView(a);
      else if (0 === s.length && 0 === n.length && 0 === i.length) ItemRewardController.OpenCommonRewardView(_, a, o);
      else if (0 === a.length && 0 < s.length)
        for (const C of s) GachaController_1.GachaController.CommonShowRoleResult(C, !0, !1);
      else 0 < n.length ? ControllerHolder_1.ControllerHolder.SkinController.OpenObtainSkinView(n, a) : 0 < i.length ? ControllerHolder_1.ControllerHolder.SkinController.OpenObtainFlySkinView(i, a) : ItemRewardController.OpenCommonRewardView(_, a, () => {
        for (const e of s) GachaController_1.GachaController.CommonShowRoleResult(e, !0, !1);
        o?.()
      })
    } else ItemRewardController.AddItemList(a), void 0 !== o && Log_1.Log.CheckError() && Log_1.Log.Error("Test", 8, "OnItemObtainNotify err", ["notify", r])
  }
};
//# sourceMappingURL=ItemRewardController.js.map
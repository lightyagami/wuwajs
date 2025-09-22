"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemRewardController = undefined;
const AudioController_1 = require("../../../Core/Audio/AudioController");
const Log_1 = require("../../../Core/Common/Log");
const Queue_1 = require("../../../Core/Container/Queue");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const FlySkinConfigById_1 = require("../../../Core/Define/ConfigQuery/FlySkinConfigById");
const PropRewardConfById_1 = require("../../../Core/Define/ConfigQuery/PropRewardConfById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const UiModel_1 = require("../../Ui/UiModel");
const ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController");
const FriendController_1 = require("../Friend/FriendController");
const GachaController_1 = require("../Gacha/GachaController");
const ItemExchangeController_1 = require("../ItemExchange/ItemExchangeController");
const RoleLevelUpSuccessController_1 = require("../RoleUi/RoleLevel/RoleLevelUpSuccessController");
const ItemRewardDefine_1 = require("./ItemRewardDefine");
const RewardItemData_1 = require("./RewardData/RewardItemData");
const FLY_STRENGTH_MAX_ATTRIBUTE_INDEX = 138;
class ItemRewardController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    this.qKl = CommonParamById_1.configCommonParamById.GetIntConfig("FlyStrengthItemId");
    return true;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(22293, this.mMa);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(22293);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemRewardNotify, this.b0i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnExploreRewardShowEnd, this.F8u);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemRewardNotify, this.b0i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnExploreRewardShowEnd, this.F8u);
  }
  static GetRewardViewReasonArray() {
    if (!this.RewardViewReasonArray) {
      this.RewardViewReasonArray = [];
      for (const e of ConfigManager_1.ConfigManager.ItemRewardConfig?.GetAllRewardViewFromSourceConfig()) {
        this.RewardViewReasonArray.push(e.RewardSourceId);
      }
    }
    return this.RewardViewReasonArray;
  }
  static OpenCommonRewardView(e, r, o) {
    e = ModelManager_1.ModelManager.ItemRewardModel.RefreshCommonRewardDataFromConfig(e, "CommonRewardView", r, o);
    if (e) {
      this.Open(e);
    }
  }
  static OpenQuestRewardView(e, r, o) {
    e = ModelManager_1.ModelManager.ItemRewardModel.RefreshCommonRewardDataFromConfig(e, "QuestRewardView", r, o);
    if (e) {
      this.Open(e);
    }
  }
  static OpenExploreLevelRewardView(e) {
    var r = ModelManager_1.ModelManager.ExploreLevelModel.GetCurrentCountryExploreLevelData();
    if (r && (r = r.GetExploreLevel(), this.N8u.Push([e ?? [], r]), this.N8u.Size === 1)) {
      this.V8u();
    }
  }
  static OpenCompositeRewardView(e, r = true, o, t) {
    e = ModelManager_1.ModelManager.ItemRewardModel.RefreshCompositeRewardDataFromConfig(e, r, o, t);
    if (e) {
      this.Open(e);
    }
  }
  static OpenExploreRewardView(e, r = true, o, t, a, n, i, l, d, _, s, C, m, g, w, I, f) {
    e = ModelManager_1.ModelManager.ItemRewardModel.RefreshExploreRewardDataFromConfig(e, r, o, t, a, n, i, l, d, _, C, m, g, w, I, f);
    return !!e && (this.Open(e, s), true);
  }
  static OpenExploreRewardViewNew(e) {
    var r = ModelManager_1.ModelManager.ItemRewardModel.RefreshExploreRewardDataFromConfigNew(e);
    return !!r && (this.Open(r, e.FinishCallback), true);
  }
  static OpenBattlePassExtraRewardView(e) {
    e = ControllerHolder_1.ControllerHolder.BattlePassController.BuildExtraRewardData(e);
    this.Open(e, e.GetRewardInfo().FinishCallback);
    return true;
  }
  static Open(e, o) {
    var r;
    if (!UiManager_1.UiManager.IsViewOpen("DrawMainView")) {
      r = e.GetRewardInfo();
      if (UiManager_1.UiManager.IsViewOpen(r.ViewName)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshRewardView, e);
      } else {
        r = r.ViewName;
        UiManager_1.UiManager.OpenView(r, e, (e, r) => {
          o?.(e);
          if (e) {
            UiModel_1.UiModel.NormalStack.Peek().AddChildViewById(r);
          }
        });
      }
    }
  }
  static Close(e) {
    if (e) {
      e = e.GetRewardInfo().ViewName;
      if (UiManager_1.UiManager.IsViewShow(e)) {
        UiManager_1.UiManager.CloseView(e);
      }
    } else {
      if (UiManager_1.UiManager.IsViewShow("CommonRewardView")) {
        UiManager_1.UiManager.CloseView("CommonRewardView");
      }
      if (UiManager_1.UiManager.IsViewShow("CompositeRewardView")) {
        UiManager_1.UiManager.CloseView("CompositeRewardView");
      }
      if (UiManager_1.UiManager.IsViewShow("ExploreRewardView")) {
        UiManager_1.UiManager.CloseView("ExploreRewardView");
      }
    }
  }
  static SetItemList(e) {
    ModelManager_1.ModelManager.ItemRewardModel.SetItemList(e);
  }
  static AddItemList(e) {
    ModelManager_1.ModelManager.ItemRewardModel.AddItemList(e);
  }
  static SetProgressQueue(e) {
    ModelManager_1.ModelManager.ItemRewardModel.SetProgressQueue(e);
  }
  static SetExploreBarDataList(e) {
    ModelManager_1.ModelManager.ItemRewardModel.SetExploreBarDataList(e);
  }
  static SetExploreRecordInfo(e) {
    ModelManager_1.ModelManager.ItemRewardModel.SetExploreRecordInfo(e);
  }
  static SetButtonList(e) {
    ModelManager_1.ModelManager.ItemRewardModel.SetButtonList(e);
  }
  static SetExploreFriendDataList(e) {
    ModelManager_1.ModelManager.ItemRewardModel.SetExploreFriendDataList(e);
  }
  static BuildExploreFriendDataList() {
    var e;
    var r;
    var o;
    var t;
    var a = [];
    var n = ModelManager_1.ModelManager.FriendModel;
    var i = ModelManager_1.ModelManager.OnlineModel;
    for (const l of i.GetTeamList()) {
      if (!l.IsSelf) {
        t = l.PlayerId;
        r = (e = i.GetCurrentTeamListById(t)) ? ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(l.HeadId, false).GetRoleHeadIconCircle() : "";
        o = e ? ItemRewardController.$zs(e.PlayerNumber) : "";
        t = {
          PlayerId: t,
          PlayerLevel: l.Level,
          IsMyFriend: n.IsMyFriend(t),
          PlayerName: e?.PlayerName ?? "",
          PlayerDesc: e?.Signature ?? "",
          PlayerIconPath: r,
          PlayerIndexPath: o,
          OnClickCallback: e => {
            FriendController_1.FriendController.RequestFriendApplyAddSend(e, Protocol_1.Aki.Protocol.D6s.Proto_RecentlyTeam);
          }
        };
        a.push(t);
      }
    }
    return a;
  }
  static $zs(e) {
    e = `FormationOnline${e}PIcon`;
    return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
  }
  static BuildExploreFriendIdList() {
    var e = [];
    for (const r of ModelManager_1.ModelManager.OnlineModel.GetTeamList()) {
      if (!r.IsSelf) {
        e.push(r.PlayerId);
      }
    }
    return e;
  }
  static PlayAudio(e, r) {
    var o;
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      if ((o = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e)) && (AudioController_1.AudioController.PostEventByUi(o.Path, r), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Test", 37, "[ItemReward]播放结算音频", ["audioId", e]);
      }
    }
  }
  static OpenSoarStrengthUpView(r) {
    var o = CommonParamById_1.configCommonParamById.GetIntConfig("FlyStrengthItemId");
    var o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(o);
    if (o && o.Parameters) {
      let e = 0;
      for (var [, t] of o.Parameters) {
        e = t;
        break;
      }
      if (e !== 0) {
        var o = PropRewardConfById_1.configPropRewardConfById.GetConfig(e);
        if (o) {
          let e = 0;
          for (const a of o.Props) {
            if (a.Id === 10) {
              e = a.Value;
              break;
            }
          }
          if (e !== 0) {
            e *= r;
            o = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetMax(10);
            r = {
              Name: (r = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(FLY_STRENGTH_MAX_ATTRIBUTE_INDEX)).Name,
              IconPath: r.Icon,
              ShowArrow: true,
              PreText: Math.floor((o - e) / 100).toString(),
              CurText: Math.floor(o / 100).toString()
            };
            o = {
              Title: "Flying_EnergyUp",
              StrengthUpgradeData: {
                AttributeId: 10,
                SingleStrengthValue: CommonParamById_1.configCommonParamById.GetIntConfig("FlySingleStrengthValue"),
                MaxSingleStrengthItemCount: CommonParamById_1.configCommonParamById.GetIntConfig("FlyMaxSingleStrengthItemCount"),
                MaxStrength: o
              },
              AttributeInfo: [r]
            };
            RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(o);
          }
        }
      }
    }
  }
}
exports.ItemRewardController = ItemRewardController;
(_a = ItemRewardController).RewardViewReasonArray = undefined;
ItemRewardController.qKl = 0;
ItemRewardController.N8u = new Queue_1.Queue();
ItemRewardController.b0i = r => {
  var o = r.gws;
  var t = Object.keys(o);
  if (o && t) {
    var a = [];
    var n = [];
    var i = [];
    let e = 0;
    for (const f of t) {
      var l = o[f]?.O9n;
      if (l && l.length !== 0) {
        var d = Number(f);
        for (const M of l) {
          var _ = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(M.L8n);
          var s = new RewardItemData_1.RewardItemData(M.L8n, M.m9n, M.b9n, d);
          if (M.L8n === _a.qKl) {
            e += M.m9n;
          }
          (_ === 11 ? n : _ === 14 && FlySkinConfigById_1.configFlySkinConfigById.GetConfig(M.L8n).IsSpecialViewAfterObtain ? i : a).push(s);
        }
      }
    }
    var t = ModelManager_1.ModelManager.ItemRewardModel;
    var C = r.x9n;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 37, "[ItemRewardController]当掉落协议通知时", ["reasonId", C]);
    }
    if (t.CurrentReasonId !== C) {
      t.ClearCurrentRewardData();
    }
    t.CurrentReasonId = C;
    if (!ItemRewardDefine_1.blockReasonIdList.includes(C)) {
      if (C === ItemRewardDefine_1.EXPLORE_LEVEL_RESON) {
        ItemRewardController.OpenExploreLevelRewardView(a);
      } else if (C === ItemRewardDefine_1.ROGUE_INST_FIRST_REWARD) {
        ModelManager_1.ModelManager.RoguelikeModel.ShowRewardList = a;
        KuroSdkReport_1.KuroSdkReport.OnRougeFinish();
      } else if (C === ItemRewardDefine_1.BLACK_STONE_RESON) {
        t = [];
        t.push({
          ButtonTextId: "ConfirmBox_45_ButtonText_1",
          DescriptionTextId: undefined,
          DescriptionArgs: undefined,
          IsTimeDownCloseView: false,
          IsClickedCloseView: false,
          OnClickedCallback: e => {
            if (UiManager_1.UiManager.IsViewShow("ExploreRewardView")) {
              UiManager_1.UiManager.CloseView("ExploreRewardView");
            }
          }
        });
        let e = r.B9n > 1 ? ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivityFullTip([3], false) : undefined;
        var m;
        var g;
        var r = ModelManager_1.ModelManager.ActivityRegressModel.LastUnGetRewardLevelPlayId;
        if (r !== 0) {
          [r, m, g, I, w] = ModelManager_1.ModelManager.ActivityRegressModel.GetLevelPlayDoubleDropTuple(r);
          e = r ? "" + ConfigManager_1.ConfigManager.TextConfig.GetMultiText(w) + ConfigManager_1.ConfigManager.TextConfig.GetMultiText(I, m, g) : undefined;
          ModelManager_1.ModelManager.ActivityRegressModel.LastUnGetRewardLevelPlayId = 0;
        }
        ItemRewardController.OpenExploreRewardView(ItemRewardDefine_1.BLACK_STONE_CONFIG, true, a, undefined, undefined, t, undefined, undefined, undefined, e, undefined, undefined, undefined, undefined, true);
      } else {
        var w;
        var I;
        var r = _a.GetRewardViewReasonArray().includes(C) ? ConfigManager_1.ConfigManager.ItemRewardConfig.GetRewardViewFromSourceConfig(C) : undefined;
        if (C !== ItemRewardDefine_1.QUEST_SPECIAL_REWARD || !r) {
          if (r) {
            if (n.length > 0) {
              ControllerHolder_1.ControllerHolder.SkinController.OpenObtainSkinView(n, a);
              return;
            } else if (i.length > 0) {
              ControllerHolder_1.ControllerHolder.SkinController.OpenObtainFlySkinView(i, a);
              return;
            } else {
              w = r.RewardViewId;
              if (e > 0) {
                ItemRewardController.OpenCommonRewardView(w, a, () => {
                  _a.OpenSoarStrengthUpView(e);
                });
                return;
              } else {
                ItemRewardController.OpenCommonRewardView(w, a);
                return;
              }
            }
          } else {
            if (C > ItemRewardDefine_1.DEFAULT_REWARD_UI) {
              if (I = CommonParamById_1.configCommonParamById.GetIntConfig("DefaultConfigId")) {
                ItemRewardController.OpenCommonRewardView(I, a);
              }
            } else {
              ItemRewardController.AddItemList(a);
            }
            return;
          }
        }
        ItemRewardController.OpenQuestRewardView(r.RewardViewId, a);
      }
    }
  }
};
ItemRewardController.mMa = e => {
  _a.OnItemObtainNotify(e);
};
ItemRewardController.OnItemObtainNotify = (r, o) => {
  var t = r.Rb_;
  if (!(t.length <= 0)) {
    var a = [];
    var n = [];
    var i = [];
    const C = [];
    let e = 0;
    for (const m of t) {
      var l;
      var d = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(m.wb_.s5n);
      if (d === 1) {
        C.push(m);
      } else if (d === 11) {
        l = new RewardItemData_1.RewardItemData(m.wb_.s5n, m.wb_.m9n, m.wb_.b9n);
        n.push(l);
      } else if (d === 14) {
        l = new RewardItemData_1.RewardItemData(m.wb_.s5n, m.wb_.m9n, m.wb_.b9n);
        (FlySkinConfigById_1.configFlySkinConfigById.GetConfig(m.wb_.s5n).IsSpecialViewAfterObtain ? i : a).push(l);
      } else {
        d = new RewardItemData_1.RewardItemData(m.wb_.s5n, m.wb_.m9n, m.wb_.b9n);
        if (m.wb_.s5n === _a.qKl) {
          e += m.wb_.m9n;
        }
        a.push(d);
      }
    }
    var t = ModelManager_1.ModelManager.ItemRewardModel;
    var _ = r.x9n;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 37, "[ItemRewardController]当服务端通知奖励获得时", ["reasonId", _]);
    }
    if (t.CurrentReasonId !== _) {
      t.ClearCurrentRewardData();
    }
    t.CurrentReasonId = _;
    var t = _a.GetRewardViewReasonArray().includes(_) ? ConfigManager_1.ConfigManager.ItemRewardConfig.GetRewardViewFromSourceConfig(_) : undefined;
    if (t) {
      var s = t.RewardViewId;
      var t = t.RewardSourceId;
      if (t !== ItemRewardDefine_1.ITEM_EXCHANGE_RESON || ItemExchangeController_1.ItemExchangeController.NeedPop) {
        if (t === ItemRewardDefine_1.QUEST_SPECIAL_REWARD) {
          ItemRewardController.OpenQuestRewardView(s, a, o);
        } else if (t === ItemRewardDefine_1.FISHING_ITEM_AUTO_CONVERT) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Fishing_AutoMaterial");
        } else if (e > 0) {
          ItemRewardController.OpenCommonRewardView(s, a, () => {
            _a.OpenSoarStrengthUpView(e);
          });
        } else if (t !== ItemRewardDefine_1.BATTLE_PASS_REWARD_REASON && t !== ItemRewardDefine_1.BATTLE_PASS_REWARD_REASON1 && t !== ItemRewardDefine_1.BATTLE_PASS_REWARD_REASON2 || !ControllerHolder_1.ControllerHolder.BattlePassController.IsNeedExtraRewardView()) {
          if (C.length === 0 && n.length === 0 && i.length === 0) {
            ItemRewardController.OpenCommonRewardView(s, a, o);
          } else if (a.length === 0 && C.length > 0) {
            for (const g of C) {
              GachaController_1.GachaController.CommonShowRoleResult(g, true, false);
            }
          } else if (n.length > 0) {
            ControllerHolder_1.ControllerHolder.SkinController.OpenObtainSkinView(n, a);
          } else if (i.length > 0) {
            ControllerHolder_1.ControllerHolder.SkinController.OpenObtainFlySkinView(i, a);
          } else {
            ItemRewardController.OpenCommonRewardView(s, a, () => {
              for (const e of C) {
                GachaController_1.GachaController.CommonShowRoleResult(e, true, false);
              }
              o?.();
            });
          }
        } else {
          ItemRewardController.OpenBattlePassExtraRewardView(a);
        }
      }
    } else if (_ > ItemRewardDefine_1.DEFAULT_REWARD_UI) {
      if (t = CommonParamById_1.configCommonParamById.GetIntConfig("DefaultConfigId")) {
        ItemRewardController.OpenCommonRewardView(t, a, o);
      }
    } else {
      ItemRewardController.AddItemList(a);
      if (o !== undefined && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Reward", 8, "OnItemObtainNotify err", ["notify", r]);
      }
    }
  }
};
ItemRewardController.F8u = () => {
  _a.N8u.Pop();
  _a.V8u();
};
ItemRewardController.V8u = () => {
  var e;
  var r;
  if (!_a.N8u.Empty) {
    [e, r] = _a.N8u.Front;
    r = ModelManager_1.ModelManager.ItemRewardModel.GetExploreLevelRewardData("ExploreLevelRewardView", r, r + 1, e);
    _a.Open(r);
  }
}; //# sourceMappingURL=ItemRewardController.js.map
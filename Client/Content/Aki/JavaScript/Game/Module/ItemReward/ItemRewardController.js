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
const FormationPropertyById_1 = require("../../../Core/Define/ConfigQuery/FormationPropertyById");
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
const ActivityControllerHolder_1 = require("../Activity/ActivityControllerHolder");
const FriendController_1 = require("../Friend/FriendController");
const GachaController_1 = require("../Gacha/GachaController");
const ItemDefine_1 = require("../Item/ItemDefine");
const ItemExchangeController_1 = require("../ItemExchange/ItemExchangeController");
const RoleLevelUpSuccessController_1 = require("../RoleUi/RoleLevel/RoleLevelUpSuccessController");
const ItemRewardDefine_1 = require("./ItemRewardDefine");
const RewardItemData_1 = require("./RewardData/RewardItemData");
class ItemRewardController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    this.qKl = CommonParamById_1.configCommonParamById.GetIntConfig("FlyStrengthItemId");
    return true;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(28204, this.mMa);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28204);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemRewardNotify, this.b0i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnExploreRewardShowEnd, this.F8u);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsSyncItemTipsData, this.Fdf);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemRewardNotify, this.b0i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnExploreRewardShowEnd, this.F8u);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsSyncItemTipsData, this.Fdf);
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
  static OpenCommonRewardView(e, r, t) {
    e = ModelManager_1.ModelManager.ItemRewardModel.RefreshCommonRewardDataFromConfig(e, "CommonRewardView", r, t);
    if (e) {
      this.Open(e);
    }
  }
  static OpenQuestRewardView(e, r, t) {
    e = ModelManager_1.ModelManager.ItemRewardModel.RefreshCommonRewardDataFromConfig(e, "QuestRewardView", r, t);
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
  static OpenCompositeRewardView(e, r = true, t, o) {
    e = ModelManager_1.ModelManager.ItemRewardModel.RefreshCompositeRewardDataFromConfig(e, r, t, o);
    if (e) {
      this.Open(e);
    }
  }
  static OpenExploreRewardView(e, r = true, t, o, a, n, i, l, d, _, s, C, m, w, g, f, I) {
    e = ModelManager_1.ModelManager.ItemRewardModel.RefreshExploreRewardDataFromConfig(e, r, t, o, a, n, i, l, d, _, C, m, w, g, f, I);
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
  static OpenRegressBpRewardView(e) {
    e = ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.BuildExtraRewardData(e);
    this.Open(e, e.GetRewardInfo().FinishCallback);
    return true;
  }
  static OpenEncircleRewardView(e) {
    e = ActivityControllerHolder_1.ActivityControllerHolder.ActivityEncircleController.BuildRewardData(e);
    this.Open(e);
    return true;
  }
  static OpenMotorItemRewardView(e, r, t) {
    var o = ModelManager_1.ModelManager.FunctionModel?.IsOpen(10098);
    var a = o ? "MotorBike_Shop_CloseButton" : undefined;
    var n = o ? "MotorBike_Shop_EquipButton" : undefined;
    let i = 0;
    if (UiManager_1.UiManager.IsViewOpen("MotorSkinBuyDetailView") && (l = UiManager_1.UiManager.GetViewByName("MotorSkinBuyDetailView").GetViewData()) && (l = l.GetCurrentGoodsData()?.GetMotorSkinData()?.GetMotorSkinShow())) {
      i = l.JumpDiyRoot;
    }
    var l = o ? () => {
      ControllerHolder_1.ControllerHolder.MotorcycleDiyController.OpenRootViewByReward(t, i);
    } : undefined;
    var o = ModelManager_1.ModelManager.ItemRewardModel.RefreshCommonRewardDataFromConfig(e, "CommonRewardView", r, undefined, a, n, () => {
      if (ModelManager_1.ModelManager.MotorcycleDiyModel.IsEquipFrameLockedByPlayer()) {
        ModelManager_1.ModelManager.MotorcycleDiyModel.ResetSelectedItemInfo();
      }
    }, l, false);
    return !!o && (this.Open(o), true);
  }
  static Open(e, t) {
    var r;
    if (!UiManager_1.UiManager.IsViewOpen("DrawMainView")) {
      r = e.GetRewardInfo();
      if (UiManager_1.UiManager.IsViewOpen(r.ViewName)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshRewardView, e);
      } else {
        r = r.ViewName;
        UiManager_1.UiManager.OpenView(r, e, (e, r) => {
          t?.(e);
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
    var t;
    var o;
    var a = [];
    var n = ModelManager_1.ModelManager.FriendModel;
    var i = ModelManager_1.ModelManager.OnlineModel;
    for (const l of i.GetTeamList()) {
      if (!l.IsSelf) {
        o = l.PlayerId;
        r = (e = i.GetCurrentTeamListById(o)) ? ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(l.HeadId, false).GetRoleHeadIconCircle() : "";
        t = e ? ItemRewardController.$zs(e.PlayerNumber) : "";
        o = {
          PlayerId: o,
          PlayerLevel: l.Level,
          IsMyFriend: n.IsMyFriend(o),
          PlayerName: e?.PlayerName ?? "",
          PlayerDesc: e?.Signature ?? "",
          PlayerIconPath: r,
          PlayerIndexPath: t,
          OnClickCallback: e => {
            FriendController_1.FriendController.RequestFriendApplyAddSend(e, Protocol_1.Aki.Protocol.D6s.Proto_RecentlyTeam);
          }
        };
        a.push(o);
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
    var t;
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      if ((t = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e)) && (AudioController_1.AudioController.PostEventByUi(t.Path, r), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Test", 37, "[ItemReward]播放结算音频", ["audioId", e]);
      }
    }
  }
  static OpenSoarStrengthUpView(r) {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("FlyStrengthItemId");
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t);
    if (t && t.Parameters) {
      let e = 0;
      for (var [, o] of t.Parameters) {
        e = o;
        break;
      }
      if (e !== 0) {
        var t = PropRewardConfById_1.configPropRewardConfById.GetConfig(e);
        if (t) {
          let e = 0;
          for (const a of t.Props) {
            if (a.Id === 10) {
              e = a.Value;
              break;
            }
          }
          if (e !== 0) {
            e *= r;
            t = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetMax(10);
            r = {
              Name: (r = FormationPropertyById_1.configFormationPropertyById.GetConfig(10)).Name,
              IconPath: r.Icon,
              ShowArrow: true,
              PreText: Math.floor((t - e) / 100).toString(),
              CurText: Math.floor(t / 100).toString()
            };
            t = {
              Title: "Flying_EnergyUp",
              StrengthUpgradeData: {
                AttributeId: 10,
                SingleStrengthValue: CommonParamById_1.configCommonParamById.GetIntConfig("FlySingleStrengthValue"),
                MaxSingleStrengthItemCount: CommonParamById_1.configCommonParamById.GetIntConfig("FlyMaxSingleStrengthItemCount"),
                MaxStrength: t
              },
              AttributeInfo: [r]
            };
            RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(t);
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
  var t = r.gws;
  var o = Object.keys(t);
  if (t && o) {
    var a = r.x9n;
    var n = _a.GetRewardViewReasonArray().includes(a) ? ConfigManager_1.ConfigManager.ItemRewardConfig.GetRewardViewFromSourceConfig(a) : undefined;
    if (n && n.RewardNotifyNotTrick) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Reward", 5, "[ItemRewardController]当掉落协议通知时,配置上不触发后续处理", ["rewardViewConfig", n.Id]);
      }
    } else {
      var i = [];
      var l = [];
      var d = [];
      let e = 0;
      for (const R of o) {
        var _ = t[R]?.O9n;
        if (_ && _.length !== 0) {
          var s = Number(R);
          for (const v of _) {
            var C = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(v.L8n);
            var m = new RewardItemData_1.RewardItemData(v.L8n, v.m9n, v.b9n, s);
            if (v.L8n === _a.qKl) {
              e += v.m9n;
            }
            (C === 11 ? l : C === 14 && FlySkinConfigById_1.configFlySkinConfigById.GetConfig(v.L8n).IsSpecialViewAfterObtain ? d : i).push(m);
          }
        }
      }
      o = ModelManager_1.ModelManager.ItemRewardModel;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Test", 37, "[ItemRewardController]当掉落协议通知时", ["reasonId", a]);
      }
      if (o.CurrentReasonId !== a) {
        o.ClearCurrentRewardData();
      }
      o.CurrentReasonId = a;
      if (!ItemRewardDefine_1.blockReasonIdList.includes(a)) {
        if (a === ItemRewardDefine_1.EXPLORE_LEVEL_RESON) {
          ItemRewardController.OpenExploreLevelRewardView(i);
        } else if (a === ItemRewardDefine_1.ENCIRCLE_REWARD_REASON) {
          ItemRewardController.OpenEncircleRewardView(i);
        } else if (a === ItemRewardDefine_1.ROGUE_INST_FIRST_REWARD) {
          ModelManager_1.ModelManager.RoguelikeModel.ShowRewardList = i;
          KuroSdkReport_1.KuroSdkReport.OnRougeFinish();
        } else if (a === ItemRewardDefine_1.BLACK_STONE_RESON) {
          o = [];
          o.push({
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
          let e = undefined;
          if (r.B9n > 1) {
            switch (r.J1m) {
              case Protocol_1.Aki.Protocol.Z1m.Proto_DoubleActivity:
                e = ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivityFullTip([3], false);
                break;
              case Protocol_1.Aki.Protocol.Z1m.Proto_FromRegress:
                var w;
                var g;
                var f;
                var I;
                var M = ModelManager_1.ModelManager.ActivityRegressModel.LastUnGetRewardLevelPlayId;
                if (M !== 0 && (ModelManager_1.ModelManager.ActivityRegressModel.LastUnGetRewardLevelPlayId = 0, [M, w, g, f, I] = ModelManager_1.ModelManager.ActivityRegressModel.GetLevelPlayDoubleDropTuple(M), M)) {
                  M = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(I);
                  I = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(f, w, g);
                  e = "" + M + I;
                }
            }
          }
          ItemRewardController.OpenExploreRewardView(ItemRewardDefine_1.BLACK_STONE_CONFIG, true, i, undefined, undefined, o, undefined, undefined, undefined, e, undefined, undefined, undefined, undefined, true);
        } else {
          if (a !== ItemRewardDefine_1.QUEST_SPECIAL_REWARD || !n) {
            if (n) {
              if (l.length > 0) {
                ControllerHolder_1.ControllerHolder.SkinController.OpenObtainSkinView(l, i);
                return;
              } else if (d.length > 0) {
                ControllerHolder_1.ControllerHolder.SkinController.OpenObtainFlySkinView(d, i);
                return;
              } else {
                r = n.RewardViewId;
                if (e > 0) {
                  ItemRewardController.OpenCommonRewardView(r, i, () => {
                    _a.OpenSoarStrengthUpView(e);
                  });
                  return;
                } else {
                  ItemRewardController.OpenCommonRewardView(r, i);
                  return;
                }
              }
            } else {
              ItemRewardController.AddItemList(i);
              return;
            }
          }
          ItemRewardController.OpenQuestRewardView(n.RewardViewId, i);
        }
      }
    }
  }
};
ItemRewardController.mMa = e => {
  _a.OnItemObtainNotify(e);
};
ItemRewardController.OnItemObtainNotify = (r, t) => {
  var o = r.Rb_;
  if (!(o.length <= 0)) {
    var a = [];
    var n = [];
    var i = [];
    var l = [];
    const m = [];
    let e = 0;
    for (const w of o) {
      var d;
      var _ = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(w.wb_.s5n);
      if (_ === 1) {
        m.push(w);
      } else if (_ === 11) {
        d = new RewardItemData_1.RewardItemData(w.wb_.s5n, w.wb_.m9n, w.wb_.b9n);
        n.push(d);
      } else if (_ === 14) {
        d = new RewardItemData_1.RewardItemData(w.wb_.s5n, w.wb_.m9n, w.wb_.b9n);
        (FlySkinConfigById_1.configFlySkinConfigById.GetConfig(w.wb_.s5n).IsSpecialViewAfterObtain ? i : a).push(d);
      } else if (_ === 25 || _ === 21 || _ === 26 || _ === 27) {
        _ = new RewardItemData_1.RewardItemData(w.wb_.s5n, w.wb_.m9n, w.wb_.b9n);
        l.push(_);
        a.push(_);
      } else {
        _ = new RewardItemData_1.RewardItemData(w.wb_.s5n, w.wb_.m9n, w.wb_.b9n);
        if (w.wb_.s5n === _a.qKl) {
          e += w.wb_.m9n;
        }
        a.push(_);
      }
    }
    var o = ModelManager_1.ModelManager.ItemRewardModel;
    var s = r.x9n;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 37, "[ItemRewardController]当服务端通知奖励获得时", ["reasonId", s]);
    }
    if (!ItemRewardDefine_1.blockObtainReasonIdList.includes(s) && !a.some(e => e.ConfigId === ItemRewardDefine_1.REGRESS_BP_PAY_ITEM_ID)) {
      if (o.CurrentReasonId !== s) {
        o.ClearCurrentRewardData();
      }
      o.CurrentReasonId = s;
      o = _a.GetRewardViewReasonArray().includes(s) ? ConfigManager_1.ConfigManager.ItemRewardConfig.GetRewardViewFromSourceConfig(s) : undefined;
      if (o) {
        var C = o.RewardViewId;
        var o = o.RewardSourceId;
        if (o !== ItemRewardDefine_1.ITEM_EXCHANGE_RESON || ItemExchangeController_1.ItemExchangeController.NeedPop) {
          if (o === ItemRewardDefine_1.QUEST_SPECIAL_REWARD) {
            ItemRewardController.OpenQuestRewardView(C, a, t);
          } else if (o === ItemRewardDefine_1.FISHING_ITEM_AUTO_CONVERT) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Fishing_AutoMaterial");
          } else if (e > 0) {
            ItemRewardController.OpenCommonRewardView(C, a, () => {
              _a.OpenSoarStrengthUpView(e);
            });
          } else if (o !== ItemRewardDefine_1.BATTLE_PASS_REWARD_REASON && o !== ItemRewardDefine_1.BATTLE_PASS_REWARD_REASON1 && o !== ItemRewardDefine_1.BATTLE_PASS_REWARD_REASON2 || !ControllerHolder_1.ControllerHolder.BattlePassController.IsNeedExtraRewardView()) {
            if (o === ItemRewardDefine_1.REGRESS_BP_REASON && !ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.IsPayRewardUnlock() && ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.IsNeedExtraRewardView()) {
              ItemRewardController.OpenRegressBpRewardView(a);
            } else if (l.length > 0 && s === ItemRewardDefine_1.PAY_REASON) {
              ItemRewardController.OpenMotorItemRewardView(C, a, l);
            } else if (m.length === 0 && n.length === 0 && i.length === 0) {
              ItemRewardController.OpenCommonRewardView(C, a, t);
            } else if (a.length === 0 && m.length > 0) {
              for (const g of m) {
                GachaController_1.GachaController.CommonShowRoleResult(g, true, false);
              }
            } else if (n.length > 0) {
              ControllerHolder_1.ControllerHolder.SkinController.OpenObtainSkinView(n, a);
            } else if (i.length > 0) {
              ControllerHolder_1.ControllerHolder.SkinController.OpenObtainFlySkinView(i, a);
            } else {
              ItemRewardController.OpenCommonRewardView(C, a, () => {
                for (const e of m) {
                  GachaController_1.GachaController.CommonShowRoleResult(e, true, false);
                }
                t?.();
              });
            }
          } else {
            ItemRewardController.OpenBattlePassExtraRewardView(a);
          }
        }
      } else if (s > ItemRewardDefine_1.DEFAULT_REWARD_UI) {
        if (o = CommonParamById_1.configCommonParamById.GetIntConfig("DefaultConfigId")) {
          ItemRewardController.OpenCommonRewardView(o, a, t);
        }
      } else {
        ItemRewardController.AddItemList(a);
        if (t !== undefined && Log_1.Log.CheckError()) {
          Log_1.Log.Error("Reward", 8, "OnItemObtainNotify err", ["notify", r]);
        }
      }
    }
  }
};
ItemRewardController.F8u = () => {
  _a.N8u.Pop();
  _a.V8u();
};
ItemRewardController.Fdf = (e, r) => {
  var t = new ItemDefine_1.ItemTipsParam();
  t.ItemId = e;
  t.CanSkip = r;
  ModelManager_1.ModelManager.ItemTipsModel.SharpTempOpenParam = t;
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
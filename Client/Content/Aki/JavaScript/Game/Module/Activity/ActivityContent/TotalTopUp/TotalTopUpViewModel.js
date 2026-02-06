"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpPickRoleViewModel = exports.TotalTopUpPageRewardViewModel = exports.TotalTopUpPageViewModel = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const InventoryGiftController_1 = require("../../../Inventory/InventoryGiftController");
const ItemController_1 = require("../../../Item/ItemController");
const ActivityControllerHolder_1 = require("../../ActivityControllerHolder");
const RoleController_1 = require("../../../RoleUi/RoleController");
const TotalTopUpDefine_1 = require("./TotalTopUpDefine");
class TotalTopUpPageViewModel {
  constructor() {
    this.ActData = undefined;
    this.RewardViewModels = [];
    this.E9g = undefined;
  }
  get CurrentScore() {
    return this.ActData?.ProgressData.CurrentScore ?? 0;
  }
  get NextScore() {
    return this.ActData?.ProgressData.NextScore ?? 0;
  }
  get ProgressPercent() {
    var e = this.CurrentScore;
    var t = this.NextScore;
    if (t <= 0) {
      return 1;
    } else {
      return Math.min(e / t, 1);
    }
  }
  InitData(t) {
    TotalTopUpDefine_1.TotalTopUpUtil.Debug("初始化数据");
    this.RewardViewModels.length = 0;
    t = (this.ActData = t).RewardDataList;
    if (t.length <= 1) {
      TotalTopUpDefine_1.TotalTopUpUtil.Debug("数据数量异常");
    } else {
      let e = 0;
      for (const o of t) {
        TotalTopUpDefine_1.TotalTopUpUtil.Debug("初始化奖励", ["RewardId", o.Id], ["Score", o.Score], ["State", o.State], ["ButtonSlot", o.PreviewButtonRegistry]);
        var i = new TotalTopUpPageRewardViewModel(o, this, e);
        i.InitData();
        this.RewardViewModels.push(i);
        e++;
      }
    }
  }
  Claim(e) {
    if (e.State === 1) {
      if (e.ClaimFunction !== 0) {
        this.Mxg(e);
      } else {
        TotalTopUpDefine_1.TotalTopUpUtil.Debug("请求领取奖励", ["RewardId", e.RewardConfigId]);
        ActivityControllerHolder_1.ActivityControllerHolder.TotalTopUpController?.RequestClaim(e.RewardConfigId);
      }
    }
  }
  Mxg(e) {
    var t;
    var i = e.ClaimFunction;
    if (i === 1) {
      (t = new TotalTopUpPickRoleViewModel()).LoadFromActivityData(this.ActData, e.Index);
      UiManager_1.UiManager.OpenView("TotalTopUpPickRoleRewardView", t);
    } else {
      TotalTopUpDefine_1.TotalTopUpUtil.Error("未知的特殊领奖功能", ["Function", i]);
    }
  }
  Preview(e) {
    var t = ConfigManager_1.ConfigManager.TotalTopUpConfig?.GetRewardConfigById(e.RewardConfigId);
    if (t) {
      if (e.PreviewFunction === 4) {
        TotalTopUpDefine_1.TotalTopUpUtil.Debug("打开摩托车定制界面", ["PreviewId", t.MotorPreviewId]);
        ControllerHolder_1.ControllerHolder.MotorcycleDiyController.OpenMotorGeneralPreviewView(t.MotorPreviewId);
      } else if (e.PreviewFunction === 0) {
        ItemController_1.ItemController.OpenItemTipsByItemId(e.RewardItemId, false);
      } else {
        t = {
          RewardConfig: t,
          RewardData: this.ActData.RewardDataList[e.Index]
        };
        UiManager_1.UiManager.OpenView("TotalTopUpPreviewView", t);
      }
    } else {
      TotalTopUpDefine_1.TotalTopUpUtil.Error("[打开预览界面]预览奖励配置不存在", ["RewardId", e.RewardConfigId]);
    }
  }
  GotoStore() {
    const i = this.ActData;
    if (i && !this.E9g) {
      this.E9g = ActivityControllerHolder_1.ActivityControllerHolder.TotalTopUpController?.RequestScoreInfoAsync();
      this.E9g?.then(() => {
        this.E9g = undefined;
        let e = 100;
        let t = 0;
        if (TotalTopUpPageViewModel.Exg()) {
          e = 1;
          t = 1;
        } else if (this.Ixg()) {
          e = 3;
          t = 0;
        }
        i.HasRequestedScoreInfo = true;
        TotalTopUpDefine_1.TotalTopUpUtil.Debug("跳转商店", ["ShopId", e], ["TabIndex", t]);
        ActivityControllerHolder_1.ActivityControllerHolder.TotalTopUpController?.SkipToPayShop(e, t);
      });
    }
  }
  static Exg() {
    var e = ModelManager_1.ModelManager.WeekCardModel;
    return !!e && !!e.GetIsWeekCardBuyOpen() && !e.GetHasBuyWeekCard() && (e = ModelManager_1.ModelManager.WeekCardModel.GetWeekCardGiftData(), (ActivityControllerHolder_1.ActivityControllerHolder.TotalTopUpController?.GetGoodsScore(e?.GetPayShopGoods()?.GetGoodsId() ?? 0) ?? 0) > 0);
  }
  Ixg() {
    var e = ModelManager_1.ModelManager.PayShopModel?.GetPayShopTabData(3, 1);
    if (e && !(e.length <= 0)) {
      for (const i of e) {
        if (i && !i.IsSoldOut() && i.IsShowInShop() && !i.CheckIfMonthCardItem()) {
          var t = this.ActData?.GoodsScoreMap.get(i.GetGoodsId()) ?? 0;
          if (t > 0) {
            TotalTopUpDefine_1.TotalTopUpUtil.Debug("发现可购买礼包", ["GoodsId", i.GetGoodsId()], ["Score", t], ["SoldOut", i.IsSoldOut()], ["BoughtCount", i.GetGoodsData()?.BoughtCount], ["Limit", i.GetGoodsData()?.BuyLimit], ["ShowInShop", i.IsShowInShop()]);
            return true;
          }
        }
      }
    }
    return false;
  }
}
exports.TotalTopUpPageViewModel = TotalTopUpPageViewModel;
class TotalTopUpPageRewardViewModel {
  constructor(e, t, i = 0) {
    this.$Tt = e;
    this.Txg = t;
    this.Index = i;
    this.ActivityId = 0;
    this.IconPath = "";
    this.PreviewFunction = 0;
    this.PreviewContentId = "";
    this.ShowCheckItem = false;
    this.ClaimFunction = 0;
    this.ActivityId = t.ActData?.Id ?? 0;
  }
  get Score() {
    return this.$Tt?.Score ?? 0;
  }
  get State() {
    return this.$Tt?.State ?? 0;
  }
  get RewardConfigId() {
    return this.$Tt?.Id ?? 0;
  }
  get RewardItemId() {
    return this.$Tt?.FirstItemId ?? 0;
  }
  get RewardCount() {
    return this.$Tt?.FirstItemCount ?? 0;
  }
  InitData() {
    var e;
    var t = ConfigManager_1.ConfigManager.InventoryConfig?.GetItemConfigData(this.$Tt?.FirstItemId ?? 0);
    if (t) {
      if (this.$Tt) {
        this.IconPath = t.Icon;
        t = this.$Tt.Id;
        e = ConfigManager_1.ConfigManager.TotalTopUpConfig.GetRewardConfigById(t);
        this.PreviewContentId = e?.PreviewContentId ?? "";
        this.PreviewFunction = e?.PreviewFunction ?? 0;
        this.ClaimFunction = e?.ClaimFunction ?? 0;
        this.ShowCheckItem = e?.ShowPreviewIcon ?? false;
        TotalTopUpDefine_1.TotalTopUpUtil.Debug("初始化奖励Config", ["ConfigMain", ConfigManager_1.ConfigManager.TotalTopUpConfig === undefined ? "null" : "exist"], ["ConfigId", t], ["PreviewFunction", e?.PreviewFunction], ["ClaimFunction", e?.ClaimFunction], ["ShowPreview", e?.ShowPreviewIcon]);
      } else {
        TotalTopUpDefine_1.TotalTopUpUtil.Error("奖励数据不存在");
      }
    } else {
      TotalTopUpDefine_1.TotalTopUpUtil.Error("奖励物品配置不存在", ["ItemId", this.$Tt?.FirstItemId]);
    }
  }
  Claim() {
    this.Txg?.Claim(this);
  }
  PreviewReward() {
    this.Txg?.Preview(this);
  }
}
exports.TotalTopUpPageRewardViewModel = TotalTopUpPageRewardViewModel;
const FULL_CHAIN = 6;
class TotalTopUpPickRoleViewModel {
  constructor() {
    this.$Tt = undefined;
    this.$Gg = new Map();
    this.eqg = 0;
    this.ItemDataList = [];
    this.SelectedIndex = -1;
    this.CanClaim = false;
    this.IsRole = false;
    this.CurrentRoleId = 0;
    this.CurrentRoleOwned = false;
    this.CurrentRoleChainNum = 0;
    this.CurrentIsFullChain = false;
    this.CurrentItemId = 0;
    this.CurrentItemCount = 0;
    this.CurrentSelectItemConfigData = undefined;
    this.FirstCanClaimIndex = -1;
    this.tqg = undefined;
    this.iqg = (e, t) => {
      ActivityControllerHolder_1.ActivityControllerHolder.TotalTopUpController?.RequestClaim(e, t);
    };
    this.rqg = (e, t) => {
      InventoryGiftController_1.InventoryGiftController.SendItemGiftUseRequest(this.eqg, 1, [t]);
    };
    this.PreviewAllRoles = () => {
      if (!(this.CurrentRoleId <= 0)) {
        var e = [];
        for (const i of this.ItemDataList) {
          if (i.RoleId > 0) {
            e.push(i.RoleId);
          }
        }
        if (e.length === 0) {
          TotalTopUpDefine_1.TotalTopUpUtil.Error("[PreviewAllRoles]预览角色失败，未找到角色数据");
        } else {
          let i = 0;
          var t = e.map(e => {
            var t = ConfigManager_1.ConfigManager.GachaConfig?.GetGachaTextureInfo(e);
            if (t) {
              if (e === this.CurrentRoleId) {
                i = t.TrialId;
              }
              return t.TrialId;
            }
            TotalTopUpDefine_1.TotalTopUpUtil.Error("[PreviewAllRoles]预览角色失败，找不到角色Trial配置", ["RoleId", e]);
          }).filter(e => e !== undefined);
          RoleController_1.RoleController.OpenRoleMainView(1, i, t);
        }
      }
    };
  }
  LoadFromActivityData(e, t) {
    this.$Tt = e.RewardDataList[t];
    var i;
    var e = e.RewardDataList[t];
    if (e && e.TotalTopUpRolePackageData !== undefined) {
      i = e.TotalTopUpRolePackageData;
      this.oqg(i);
      this.tqg = this.iqg;
    } else {
      TotalTopUpDefine_1.TotalTopUpUtil.Error("加载角色选择数据失败，奖励数据不存在", ["RewardIndex", t], ["PackageData", e.TotalTopUpRolePackageData ? "exist" : "null"]);
    }
  }
  LoadFromGiftPackageInBag(e) {
    this.oqg(e);
    this.tqg = this.rqg;
  }
  oqg(e) {
    this.$Gg.clear();
    this.eqg = e.GiftBagItemId;
    for (const a of e.RoleList) {
      var t = this.nkg(a);
      var i = this.WGg(a);
      var i = {
        Index: this.ItemDataList.length,
        ItemCount: 1,
        ItemId: 0,
        RoleId: a,
        RoleChain: t,
        RoleOwned: i,
        CanClaim: t < FULL_CHAIN
      };
      this.ItemDataList.push(i);
      const r = ConfigManager_1.ConfigManager.InventoryConfig?.GetItemConfigData(a);
      if (r) {
        this.$Gg.set(a, r);
      }
    }
    var o = {
      Index: this.ItemDataList.length,
      ItemId: e.ItemId,
      ItemCount: e.ItemCount,
      RoleId: 0,
      RoleChain: 0,
      RoleOwned: false,
      CanClaim: true
    };
    this.ItemDataList.push(o);
    const r = ConfigManager_1.ConfigManager.InventoryConfig?.GetItemConfigData(e.ItemId);
    if (r) {
      this.$Gg.set(e.ItemId, r);
    }
    for (let e = 0; e < this.ItemDataList.length; e++) {
      if (this.ItemDataList[e].CanClaim) {
        this.FirstCanClaimIndex = e;
        break;
      }
    }
  }
  SelectItem(e) {
    this.SelectedIndex = e;
    e = this.ItemDataList[e];
    this.IsRole = e.RoleId > 0;
    this.CurrentRoleId = e.RoleId;
    this.CurrentRoleChainNum = e.RoleChain;
    this.CurrentIsFullChain = this.CurrentRoleChainNum >= FULL_CHAIN;
    this.CurrentRoleOwned = e.RoleOwned;
    this.CurrentItemId = e.ItemId;
    this.CurrentItemCount = e.ItemCount;
    this.CanClaim = e.CanClaim;
    this.CurrentSelectItemConfigData = this.$Gg.get(e.RoleId > 0 ? e.RoleId : e.ItemId);
  }
  Claim(t) {
    if (this.CanClaim) {
      var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(449);
      var o = this.ItemDataList[this.SelectedIndex];
      const r = o.RoleId > 0 ? o.RoleId : o.ItemId;
      const a = this.$Tt?.Id ?? 0;
      let e = undefined;
      e = (o.RoleId > 0 ? ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(o.RoleId) : ConfigManager_1.ConfigManager.InventoryConfig?.GetItemConfigData(o.ItemId))?.Name;
      o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e ?? "");
      i.SetTextArgs(o);
      i.FunctionMap.set(2, () => {
        this.tqg?.(a, r);
        t();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
    }
  }
  nkg(e) {
    var t = ModelManager_1.ModelManager.RoleModel;
    if (t?.IsRoleOwned(e) && t?.GetRoleInstanceById(e)) {
      t = ModelManager_1.ModelManager.RoleModel?.GetRoleLeftResonantCountWithInventoryItem(e) ?? 0;
      return (ConfigManager_1.ConfigManager.RoleResonanceConfig?.GetResonanceMaxLevel() ?? 0) - t;
    } else {
      return 0;
    }
  }
  WGg(e) {
    return ModelManager_1.ModelManager.RoleModel?.IsRoleOwned(e) ?? false;
  }
}
exports.TotalTopUpPickRoleViewModel = TotalTopUpPickRoleViewModel;
//# sourceMappingURL=TotalTopUpViewModel.js.map
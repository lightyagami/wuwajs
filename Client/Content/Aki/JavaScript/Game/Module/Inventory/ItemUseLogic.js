"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemUseLogic = undefined;
const Log_1 = require("../../../Core/Common/Log");
const GiftType_1 = require("../../../Core/Define/Config/SubType/GiftType");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const UiPlayItemById_1 = require("../../../Core/Define/ConfigQuery/UiPlayItemById");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const CipherController_1 = require("../../LevelGamePlay/Cipher/CipherController");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const UiManager_1 = require("../../Ui/UiManager");
const AcquireData_1 = require("../Acquire/AcquireData");
const TotalTopUpData_1 = require("../Activity/ActivityContent/TotalTopUp/TotalTopUpData");
const TotalTopUpViewModel_1 = require("../Activity/ActivityContent/TotalTopUp/TotalTopUpViewModel");
const BirthdayController_1 = require("../Birthday/BirthdayController");
const BuffItemControl_1 = require("../BuffItem/BuffItemControl");
const CalabashController_1 = require("../Calabash/CalabashController");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
const PayShopViewData_1 = require("../PayShop/PayShopData/PayShopViewData");
const PowerController_1 = require("../Power/PowerController");
const RoleDefine_1 = require("../RoleUi/RoleDefine");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const InventoryGiftController_1 = require("./InventoryGiftController");
class ItemUseLogic {
  static Imi(e, r = 1, o = 0) {
    var n = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(o, {
      ParamType: 0
    });
    if (!n) {
      return false;
    }
    if (n.GetConfigId > RoleDefine_1.ROBOT_DATA_MIN_ID) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NoneRole");
    } else {
      n = n?.EntityHandle?.Entity?.GetComponent(184);
      if (!n) {
        return false;
      }
      var t = Math.ceil(n.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life));
      if (Math.ceil(n.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n)) <= t) {
        n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("HpFull");
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(n);
      } else {
        BuffItemControl_1.BuffItemControl.RequestUseBuffItem(e, r, o);
      }
    }
    return true;
  }
}
exports.ItemUseLogic = ItemUseLogic;
(_a = ItemUseLogic).TryUseParameterItem = (e, r = 1) => {
  var o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
  return !!o && (o.Parameters.size === 0 ? (Log_1.Log.CheckError() && Log_1.Log.Error("Inventory", 37, "使用道具失败,使用参数为空", ["ItemId", e]), false) : (ControllerHolder_1.ControllerHolder.InventoryController.RequestItemUse(e, r), true));
};
ItemUseLogic.TryUseUiPlayItem = (e, r = 0) => {
  if (!ItemInfoById_1.configItemInfoById.GetConfig(e).UiPlayItem) {
    return false;
  }
  var o = UiPlayItemById_1.configUiPlayItemById.GetConfig(e);
  if (!o) {
    return false;
  }
  switch (o.Type) {
    case "Cipher":
      CipherController_1.CipherController.OpenCipherView(o.UiPlayKey);
      break;
    case "SignalBreak":
      UiManager_1.UiManager.OpenView("SignalDecodeView", o.UiPlayKey);
  }
  return true;
};
ItemUseLogic.TryUseBattlePassItem = (e, r = 0) => {
  var o;
  return (e === ModelManager_1.ModelManager.BattlePassModel.PrimaryItemId || e === ModelManager_1.ModelManager.BattlePassModel.AdvanceItemId) && ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(ModelManager_1.ModelManager.BattlePassModel.GetBattlePassItemConfirmId(e))).FunctionMap.set(2, () => {
    ControllerHolder_1.ControllerHolder.InventoryController.RequestItemUse(e, 1);
  }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o), true);
};
ItemUseLogic.TryUseBuffItem = (e, r = 1, o = false, n = 0) => {
  if (ConfigManager_1.ConfigManager.BuffItemConfig.IsBuffItem(e)) {
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t);
      if (t && t.CanUseItem === 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Dungeon_BanItem"));
        return true;
      }
    }
    if (ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(e) > 0) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("UseBuffCdText");
      return true;
    } else if (ConfigManager_1.ConfigManager.BuffItemConfig.IsTeamBuffItem(e)) {
      BuffItemControl_1.BuffItemControl.RequestUseBuffItem(e, 1, -1);
      return true;
    } else {
      BuffItemControl_1.BuffItemControl.InitializeAllUseBuffItemRoleFromPlayerFormationInstance(e);
      if (ModelManager_1.ModelManager.BuffItemModel.GetAllUseBuffItemRole().size <= 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NoneRole");
        return true;
      } else if (o) {
        return _a.Imi(e, r, n);
      } else {
        UiManager_1.UiManager.OpenView("UseBuffItemView", e);
        return true;
      }
    }
  }
  return false;
};
ItemUseLogic.TryUsePowerItem = (e, r = 0) => e === 10800 && (PowerController_1.PowerController.OpenPowerRecoveryExchangeView(e), true);
ItemUseLogic.TryUseMonthCardItem = (e, r = 0) => {
  var o;
  var n;
  var t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
  let i = t.Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenMonthCard);
  return !!(i = i || t.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenMonthCard)) && (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(132), t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name), n = ConfigManager_1.ConfigManager.MonthCardConfig.GetConfig(i).Days, o.SetTextArgs(t, n.toString()), o.FunctionMap.set(2, () => {
    ControllerHolder_1.ControllerHolder.InventoryController.RequestItemUse(e, 1);
  }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o), true);
};
ItemUseLogic.TryUseGiftItem = (e, r = 0) => {
  const o = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(e);
  if (!o) {
    return false;
  }
  if (o.GetType() !== 11) {
    return false;
  }
  var n = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
  let t = n.Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenGift);
  let i = false;
  if (!t) {
    t = n.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenGift);
    i = true;
  }
  var a = ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(t);
  if (!i) {
    if (a.Type === GiftType_1.GiftType.Fixed || a.Type === GiftType_1.GiftType.Random || a.Type === GiftType_1.GiftType.RandomPhantom || a.Type === GiftType_1.GiftType.CaptureMonster) {
      var l = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
      var _ = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.Name);
      var g = [];
      const o = [{
        IncId: 0,
        ItemId: n.Id
      }, l];
      g.push(o);
      if (l > 1) {
        const f = new AcquireData_1.AcquireData();
        f.SetAcquireViewType(0);
        f.SetAmount(1);
        f.SetMaxAmount(l);
        f.SetRemainItemCount(l);
        f.SetItemData(g);
        f.SetNameText(_);
        f.SetConfigId(e);
        f.SetRightButtonFunction(() => {
          ItemUseLogic.Tmi(e, f.GetAmount());
        });
        InventoryGiftController_1.InventoryGiftController.ShowAcquireView(f);
      } else {
        InventoryGiftController_1.InventoryGiftController.SendItemGiftUseRequest(e, 1, undefined);
      }
    } else {
      InventoryGiftController_1.InventoryGiftController.SendGiftPackPreviewRequest(e, a, undefined);
    }
  }
  return true;
};
ItemUseLogic.TryUseGiftItemWithSelectedItem = (e, r, o = 1) => {
  var n = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(e);
  return !!n && n.GetType() === 11 && !!(n = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e).Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenGift)) && (n = ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(n)).Type === GiftType_1.GiftType.Optional && (InventoryGiftController_1.InventoryGiftController.SendGiftPackPreviewRequest(e, n, r, o), true);
};
ItemUseLogic.TryUseShipTowerItem = e => {
  e = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(e);
  return !!e && e.GetType() === 60005 && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenActivityViewShipTower), true);
};
ItemUseLogic.TryUseStudentCardItem = e => e === 70290000 && (UiManager_1.UiManager.OpenView("AdmissionStudentCardView"), true);
ItemUseLogic.TryUsePayShopCouponItem = e => {
  var e = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(e);
  return !!e && e.GetType() === 60008 && ((e = new PayShopViewData_1.PayShopViewData()).PayShopId = 6, ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(e), true);
};
ItemUseLogic.Tmi = (e, r) => {
  if (r > 0) {
    InventoryGiftController_1.InventoryGiftController.SendItemGiftUseRequest(e, r, undefined);
  } else {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NotEnoughItem");
  }
};
ItemUseLogic.TryUseBirthdayItem = e => {
  var r = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(e);
  return !!r && r.GetType() === 60007 && (BirthdayController_1.BirthdayController.UseBirthdayItem(e), true);
};
ItemUseLogic.TryUseVisionRefineItem = e => {
  e = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(e);
  return !!e && !!e.GetConfig().ShowTypes.includes(54) && (CalabashController_1.CalabashController.JumpToCalabashRootView("VisionRefineTabView", {
    ViewState: 1,
    RefineType: 0
  }), true);
};
ItemUseLogic.TryUseVisionRefineSubItem = e => {
  e = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(e);
  return !!e && !!e.GetConfig().ShowTypes.includes(58) && (CalabashController_1.CalabashController.JumpToCalabashRootView("VisionRefineTabView", {
    ViewState: 1,
    RefineType: 1
  }), true);
};
ItemUseLogic.TryUseBuffEquipItem = e => {
  var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
  if (!r) {
    return false;
  }
  if (r.Parameters.size === 0) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Inventory", 37, "使用道具失败,使用参数为空", ["ItemId", e]);
    }
    return false;
  }
  var r = ConfigManager_1.ConfigManager.BuffItemConfig;
  var o = ModelManager_1.ModelManager.BuffItemModel;
  if (r.IsEquipBuffItem(e) && !o.IsEquippedBuffItem(e)) {
    var r = r.GetBuffEquipItemCategory(e);
    var o = o.GetEquippedBuffItemId(r);
    if (o) {
      (r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(402)).FunctionMap.set(1, () => {});
      r.FunctionMap.set(2, () => {
        ControllerHolder_1.ControllerHolder.InventoryController.RequestItemUse(e, 1);
      });
      o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(o).Name;
      r.SetTextArgs(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o));
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
      return true;
    }
  }
  ControllerHolder_1.ControllerHolder.InventoryController.RequestItemUse(e, 1);
  return true;
};
ItemUseLogic.TryUseTotalTopUpRolePickItem = e => {
  var r;
  var e = TotalTopUpData_1.TotalTopUpRolePackageData.TryParsePackageData(e);
  return !!e && ((r = new TotalTopUpViewModel_1.TotalTopUpPickRoleViewModel()).LoadFromGiftPackageInBag(e), UiManager_1.UiManager.OpenView("TotalTopUpPickRoleRewardView", r), true);
};
ItemUseLogic.TryUseBrochureItem = e => {
  var r = CommonParamById_1.configCommonParamById.GetIntArrayConfig("SpringManorBrochureItemId");
  return !!r && r[0] === e && (e = {
    IsHideReward: true,
    ActivityId: r[1]
  }, UiManager_1.UiManager.OpenView("Spring26BrochureView", e), true);
}; //# sourceMappingURL=ItemUseLogic.js.map
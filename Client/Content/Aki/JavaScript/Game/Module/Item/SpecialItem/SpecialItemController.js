"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialItemController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const RouletteController_1 = require("../../Roulette/RouletteController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const ItemDefines_1 = require("../Data/ItemDefines");
const SpecialItemDefine_1 = require("./SpecialItemDefine");
class SpecialItemController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemUse, this.e9e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSpecialItemUse, this.YCi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddCommonItemNotify, this.JCi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSpecialItemUpdate, this.$di);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EquipAndSwitchSpecialItem, this.zCi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UnEquipSpecialItem, this.ZCi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeModeFinish, this.zYe);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemUse, this.e9e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSpecialItemUse, this.YCi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddCommonItemNotify, this.JCi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSpecialItemUpdate, this.$di);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EquipAndSwitchSpecialItem, this.zCi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UnEquipSpecialItem, this.ZCi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeModeFinish, this.zYe);
  }
  static IsSpecialItem(e) {
    return !!ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e)?.SpecialItem;
  }
  static AllowReqUseSpecialItem(e) {
    e = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(e);
    if (!e) {
      return false;
    }
    if (!e.UseInstance && ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      return false;
    }
    if (!e.UseInMultiMode && ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      return false;
    }
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity.GetComponent(209);
    if (!t) {
      return e.AllowTags.length === 0;
    }
    for (const o of e.AllowTags) {
      var r = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(o);
      if (!r || !t.HasTag(r)) {
        return false;
      }
    }
    for (const n of e.BanTags) {
      var l = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(n);
      if (l && t.HasTag(l)) {
        return false;
      }
    }
    return true;
  }
  static ListenSpecialItemRelatedTags(e, t) {
    if (SpecialItemController.IsSpecialItem(e)) {
      var r = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(e);
      if (r) {
        var l = t?.Entity?.GetComponent(209);
        SpecialItemController.StopListenSpecialItemRelatedTags();
        for (const a of r.AllowTags) {
          var o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(a);
          if (o) {
            l?.AddTagAddOrRemoveListener(o, SpecialItemController.egi);
            ModelManager_1.ModelManager.SpecialItemModel.WatchedAllowTagIds.add(o);
          }
        }
        for (const i of r.BanTags) {
          var n = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i);
          if (n) {
            l?.AddTagAddOrRemoveListener(n, SpecialItemController.egi);
            ModelManager_1.ModelManager.SpecialItemModel.WatchedBanTagIds.add(n);
          }
        }
        ModelManager_1.ModelManager.SpecialItemModel.TagWatchedItemId = e;
        ModelManager_1.ModelManager.SpecialItemModel.TagWatchedEntityHandle = t;
      }
    }
  }
  static StopListenSpecialItemRelatedTags() {
    var e = ModelManager_1.ModelManager.SpecialItemModel?.TagWatchedEntityHandle?.Entity?.GetComponent(209);
    if (e) {
      for (const t of ModelManager_1.ModelManager.SpecialItemModel.WatchedAllowTagIds) {
        e.RemoveTagAddOrRemoveListener(t, SpecialItemController.egi);
      }
    }
    ModelManager_1.ModelManager.SpecialItemModel.WatchedAllowTagIds.clear();
    if (e) {
      for (const r of ModelManager_1.ModelManager.SpecialItemModel.WatchedBanTagIds) {
        e.RemoveTagAddOrRemoveListener(r, SpecialItemController.egi);
      }
    }
    ModelManager_1.ModelManager.SpecialItemModel.WatchedBanTagIds.clear();
    ModelManager_1.ModelManager.SpecialItemModel.TagWatchedItemId = 0;
    ModelManager_1.ModelManager.SpecialItemModel.TagWatchedEntityHandle = undefined;
  }
  static EquipSpecialItem(t, r = true, l = true, o = 0) {
    var e;
    return !!ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen() && !((e = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(t)) ? e.SpecialItemType !== 0 ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("Item", 37, "特殊道具配置类型无法装备", ["Id", t], ["SpecialItemType", e.SpecialItemType]), 1) : ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t) <= 0 ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("Item", 37, "背包中没有对应特殊道具,无法切换", ["Id", t]), 1) : (ModelManager_1.ModelManager.SpecialItemModel.GetEquipSpecialItemId() !== t ? RouletteController_1.RouletteController.SaveCurrentRouletteData(undefined, undefined, t, false, e => {
      if (e && (r && RouletteController_1.RouletteController.EquipItemSetRequest(t, undefined, o), l)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ItemEquiped");
      }
    }) : r && RouletteController_1.RouletteController.EquipItemSetRequest(t, undefined, o), 0) : (Log_1.Log.CheckError() && Log_1.Log.Error("Item", 37, "特殊道具不存在,请检查是否配置t.特殊道具", ["Id", t]), 1));
  }
  static UnEquipSpecialItem(e) {
    if (ModelManager_1.ModelManager.SpecialItemModel.GetEquipSpecialItemId() === e) {
      RouletteController_1.RouletteController.SaveCurrentRouletteData(undefined, undefined, 0);
    }
  }
  static AutoEquipOrUnEquipSpecialItem(e) {
    var t = e === ModelManager_1.ModelManager.SpecialItemModel.GetEquipSpecialItemId();
    if (t) {
      SpecialItemController.UnEquipSpecialItem(e);
    } else {
      SpecialItemController.EquipSpecialItem(e);
    }
    return !t;
  }
  static tgi(e, t, r) {
    var l = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity;
    if (l?.Valid && (l = l.GetComponent(40)).Valid) {
      l.BeginSkillAsync(r, {
        Reason: "Explore skill item: UseSkill"
      });
    }
  }
}
exports.SpecialItemController = SpecialItemController;
(_a = SpecialItemController).$di = e => {
  var t;
  if (e === undefined) {
    SpecialItemController.StopListenSpecialItemRelatedTags();
  } else {
    t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    SpecialItemController.ListenSpecialItemRelatedTags(e, t);
  }
};
SpecialItemController.xie = (e, t) => {
  var r = ModelManager_1.ModelManager.SpecialItemModel.TagWatchedItemId;
  if (r) {
    SpecialItemController.StopListenSpecialItemRelatedTags();
    SpecialItemController.ListenSpecialItemRelatedTags(r, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshSpecialItemAllowReqUse, r, e);
  }
};
SpecialItemController.zYe = () => {
  var e = ModelManager_1.ModelManager.SpecialItemModel.TagWatchedItemId;
  var t = ModelManager_1.ModelManager.SpecialItemModel.TagWatchedEntityHandle;
  if (e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshSpecialItemAllowReqUse, e, t);
  }
};
SpecialItemController.egi = (e, t) => {
  var r = ModelManager_1.ModelManager.SpecialItemModel.TagWatchedItemId;
  var l = ModelManager_1.ModelManager.SpecialItemModel.TagWatchedEntityHandle;
  if (r) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshSpecialItemAllowReqUse, r, l);
  }
};
SpecialItemController.JCi = e => {
  for (const t of e) {
    if (SpecialItemController.IsSpecialItem(t.s5n)) {
      SpecialItemController.EquipSpecialItem(t.s5n);
    }
  }
};
SpecialItemController.YCi = (e, t) => {
  var r;
  if (SpecialItemController.IsSpecialItem(e)) {
    if (SpecialItemDefine_1.specialItemIdSet.has(e) && (r = e, (r = ModelManager_1.ModelManager.SpecialItemModel.GetSpecialItemLogic(r)).CheckUseCondition())) {
      r.OnUse();
    }
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Item", 37, "特殊道具不存在,请检查是否配置t.特殊道具", ["Id", e]);
  }
};
SpecialItemController.zCi = (e, t = true) => {
  SpecialItemController.EquipSpecialItem(e, t);
};
SpecialItemController.ZCi = e => {
  SpecialItemController.UnEquipSpecialItem(e);
};
SpecialItemController.e9e = (e, t) => {
  var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
  if (r.Parameters.size && SpecialItemController.IsSpecialItem(e) && (r = r.Parameters.get(ItemDefines_1.EItemFunctionType.UseExploreSkill))) {
    _a.tgi(e, t, r);
  }
}; //# sourceMappingURL=SpecialItemController.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemController = undefined;
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ItemDefine_1 = require("./ItemDefine");
class ItemController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, this.Q5e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddCommonItem, ItemController.KCi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddWeaponItem, ItemController.QCi);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, this.Q5e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddCommonItem, ItemController.KCi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddWeaponItem, ItemController.QCi);
  }
  static OpenItemTipsByItemId(e, t = true, i = undefined) {
    var n = new ItemDefine_1.ItemTipsParam();
    n.ItemId = e;
    n.CanSkip = t;
    UiManager_1.UiManager.OpenView("ItemTipsView", n, i);
  }
  static OpenTitleTipsByItemId(e) {
    var t = new ItemDefine_1.ItemTipsParam();
    t.ItemId = e;
    t.CanSkip = true;
    t.ExtraParam = "OpenTitlePreviewView";
    UiManager_1.UiManager.OpenView("ItemTipsView", t, undefined);
  }
  static OpenItemTipsByItemUid(e, t, i = true, n = undefined) {
    var r = new ItemDefine_1.ItemTipsParam();
    r.ItemUid = e;
    r.ItemId = t;
    r.CanSkip = i;
    UiManager_1.UiManager.OpenView("ItemTipsView", r, n);
  }
  static OpenItemTipsByExtraParam(e, t, i, n = true, r = undefined) {
    var o = new ItemDefine_1.ItemTipsParam();
    o.ItemUid = e;
    o.ItemId = t;
    o.ExtraParam = i;
    o.CanSkip = n;
    UiManager_1.UiManager.OpenView("ItemTipsView", o, r);
  }
  static AddNewItemTip(e) {
    ModelManager_1.ModelManager.ItemModel.PushWaitItemList(e);
  }
  static CheckNewItemTips() {
    var e;
    if (ModelManager_1.ModelManager.ItemModel.IsWaitItemListEmpty() && ModelManager_1.ModelManager.ItemModel.IsWaitPhantomListEmpty()) {
      if (this.IsPrintNoRewardReason && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ItemHint", 37, "[NoRewardReason][CheckNewItemTips]当前状态不允许显示入包列表:ItemHint的入包列表为空");
      }
    } else if (!UiManager_1.UiManager.IsViewOpen("NewItemTipsView") && !UiManager_1.UiManager.IsViewOpen("PhantomTipsView") && UiManager_1.UiManager.IsViewShow("BattleView")) {
      if (ModelManager_1.ModelManager.SundryModel.IsBlockTips) {
        if (this.IsPrintNoRewardReason && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("ItemHint", 37, "[NoRewardReason][CheckNewItemTips]当前状态不允许显示入包列表:已经屏蔽弹窗");
        }
      } else {
        e = CommonParamById_1.configCommonParamById.GetIntConfig("next_new_item_show_time");
        if (!(TimeUtil_1.TimeUtil.GetServerTimeStamp() < ModelManager_1.ModelManager.ItemModel.LastCloseTimeStamp + e)) {
          if (ModelManager_1.ModelManager.ItemModel.IsWaitItemListEmpty()) {
            if (!ModelManager_1.ModelManager.ItemModel.IsWaitPhantomListEmpty()) {
              e = ModelManager_1.ModelManager.ItemModel.ShiftWaitPhantomList();
              UiManager_1.UiManager.OpenView("PhantomTipsView", e);
            }
          } else {
            e = ModelManager_1.ModelManager.ItemModel.ShiftWaitItemList();
            UiManager_1.UiManager.OpenView("NewItemTipsView", e);
          }
          AudioSystem_1.AudioSystem.PostEvent("play_ui_item_hint_get_item_first_time");
          ItemController.LastItemHintAudioPlayedTime = Time_1.Time.Now;
          ItemController.LastItemHintAudioLevel = 3;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Audio", 55, "[Item] 播放新物品提示音效");
          }
        }
      }
    } else if (this.IsPrintNoRewardReason && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ItemHint", 37, "[NoRewardReason][CheckNewItemTips]当前状态不允许显示入包列表:NewItemTipsView在打开中，或BattleView不在显示中", ["IsNewItemTipsViewOpen", UiManager_1.UiManager.IsViewOpen("NewItemTipsView")], ["IsBattleViewShow", UiManager_1.UiManager.IsViewShow("BattleView")]);
    }
  }
}
(exports.ItemController = ItemController).LastItemHintAudioPlayedTime = undefined;
ItemController.LastItemHintAudioLevel = 0;
ItemController.IsPrintNoRewardReason = false;
ItemController.Q5e = () => {
  ModelManager_1.ModelManager.ItemModel.LoadGetItemConfigIdList();
};
ItemController.KCi = (e, t) => {
  var i = ModelManager_1.ModelManager.ItemModel;
  var e = e.s5n;
  if (!i.IsGotItem(e)) {
    if (ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e)?.ObtainedShow !== 0) {
      if (t) {
        ItemController.AddNewItemTip(e);
      }
      i.AddGetItemConfigIdList(e);
    }
  }
};
ItemController.QCi = (e, t, i) => {
  var e = e.s5n;
  var n = ModelManager_1.ModelManager.ItemModel;
  if (!n.IsGotItem(e)) {
    if (i) {
      ItemController.AddNewItemTip(e);
    }
    n.AddGetItemConfigIdList(e);
  }
}; //# sourceMappingURL=ItemController.js.map
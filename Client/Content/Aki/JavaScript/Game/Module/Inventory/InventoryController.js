"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InventoryController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
const SpecialItemController_1 = require("../Item/SpecialItem/SpecialItemController");
const ItemHintController_1 = require("../ItemHint/ItemHintController");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const InventoryDefine_1 = require("./InventoryDefine");
const ItemUseLogic_1 = require("./ItemUseLogic");
const VISION_CATCH_REASON = 19000;
const GACHA_REASON = 14000;
class InventoryController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShowTypeChange, this.lEa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, this.Q5e);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShowTypeChange, this.lEa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, this.Q5e);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(29310, InventoryController.Tci);
    Net_1.Net.Register(19354, InventoryController.Lci);
    Net_1.Net.Register(22233, InventoryController.Dci);
    Net_1.Net.Register(26618, InventoryController.Rci);
    Net_1.Net.Register(22603, InventoryController.Uci);
    Net_1.Net.Register(24171, InventoryController.Aci);
    Net_1.Net.Register(20231, InventoryController.Pci);
    Net_1.Net.Register(16371, InventoryController.xci);
    Net_1.Net.Register(15454, InventoryController.wci);
    Net_1.Net.Register(26230, InventoryController.Bci);
    Net_1.Net.Register(24954, InventoryController.bci);
    Net_1.Net.Register(18531, InventoryController.qci);
    Net_1.Net.Register(20095, InventoryController.Lzu);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29310);
    Net_1.Net.UnRegister(19354);
    Net_1.Net.UnRegister(22233);
    Net_1.Net.UnRegister(26618);
    Net_1.Net.UnRegister(22603);
    Net_1.Net.UnRegister(24171);
    Net_1.Net.UnRegister(20231);
    Net_1.Net.UnRegister(16371);
    Net_1.Net.UnRegister(15454);
    Net_1.Net.UnRegister(26230);
    Net_1.Net.UnRegister(24954);
    Net_1.Net.UnRegister(18531);
    Net_1.Net.UnRegister(20095);
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("InventoryView", InventoryController.iVe, "InventoryController.CanOpenView");
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("InventoryView", InventoryController.iVe);
  }
  static ItemLockRequest(t, o) {
    if (!(t <= 0)) {
      var e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(t);
      if (e && e.CanLock()) {
        var n = new Protocol_1.Aki.Protocol.hns();
        n.b9n = e.GetUniqueId();
        n.q9n = o ? 1 : 2;
        ModelManager_1.ModelManager.InventoryModel.SetCurrentLockItemUniqueId(t);
        const r = e.GetIsDeprecated();
        Net_1.Net.Call(21030, n, e => {
          if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 25532);
          } else {
            if (o) {
              if (r) {
                ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("EchoAbandonToLock");
              } else {
                ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ItemLockSuccess");
              }
            } else {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ItemUnlockSuccess");
            }
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnItemLock, t, o);
          }
        });
      }
    }
  }
  static ItemDeprecateRequest(e, t) {
    if (!(e <= 0)) {
      var o = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(e);
      if (o && o.CanDeprecate()) {
        var n = new Protocol_1.Aki.Protocol.jm_();
        n.b9n = e;
        n.q9n = t ? 1 : 2;
        const r = o.GetIsLock();
        Net_1.Net.Call(25301, n, e => {
          if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 24591);
          } else if (t) {
            if (r) {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("EchoLockToAbandon");
            } else {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("EchoAbandonSuccess");
            }
          } else {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("EchoAbandonRelease");
          }
        });
      }
    }
  }
  static RequestItemUse(t, o) {
    const n = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t);
    if (n.SpecialItem) {
      var e = n.Parameters.get(ItemDefines_1.EItemFunctionType.UseExploreSkill);
      if (e) {
        if (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity.GetComponent(40)?.IsSkillInCd(e)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Inventory", 17, "特殊道具对应的技能处于CD中", ["skillId", e], ["configId", t]);
          }
          return;
        }
      }
    }
    if (n.SpecialItem && !SpecialItemController_1.SpecialItemController.AllowReqUseSpecialItem(t)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Inventory", 39, "试图请求使用的特殊道具被禁用", ["configId", t]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSpecialItemNotAllow);
    } else {
      (e = new Protocol_1.Aki.Protocol._ns()).L8n = t;
      e.m9n = o;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Inventory", 37, "5207_客户端请求使用物品:massage", ["massage", e]);
      }
      Net_1.Net.Call(20660, e, e => {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Inventory", 37, "5208_服务端返回使用道具结果:massage", ["massage", e]);
        }
        if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 26249);
        } else if (n.SpecialItem && n && n.Parameters.size === 0) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSpecialItemUse, t, o);
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnItemUse, t, o);
        }
      });
    }
  }
  static NormalItemRequest() {
    var e = new Protocol_1.Aki.Protocol.gns();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Inventory", 37, "NormalItemRequest 获取所有普通道具请求");
    }
    Net_1.Net.Call(22687, Protocol_1.Aki.Protocol.gns.create(e), this.Gci);
  }
  static ValidTimeItemRequest() {
    var e = new Protocol_1.Aki.Protocol.qns();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Inventory", 37, "ValidTimeItemRequest 获取所有特殊限时道具请求");
    }
    Net_1.Net.Call(28044, Protocol_1.Aki.Protocol.gns.create(e), this.Nci);
  }
  static WeaponItemRequest() {
    var e = new Protocol_1.Aki.Protocol.Sns();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Inventory", 37, "WeaponItemRequest 获取所有武器道具请求");
    }
    Net_1.Net.Call(19721, Protocol_1.Aki.Protocol.Sns.create(e), this.Oci);
  }
  static PhantomItemRequest() {
    var e = new Protocol_1.Aki.Protocol.Tns();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Inventory", 37, "PhantomItemRequest 获取所有幻象道具请求");
    }
    Net_1.Net.Call(23543, Protocol_1.Aki.Protocol.Tns.create(e), this.kci);
  }
  static TryOpenPhantomFullConfirmBox(e) {
    var t;
    if (!this.Azu) {
      this.Azu = true;
      (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(350)).FunctionMap.set(1, e);
      t.FunctionMap.set(2, () => {
        ControllerHolder_1.ControllerHolder.CalabashController.JumpToCalabashRootView("VisionRecoveryTabView");
      });
      t.SetCloseFunction(() => {
        this.Azu = false;
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    }
  }
  static ItemDestructPreviewRequest(a) {
    var e = new Protocol_1.Aki.Protocol.sns();
    e.O9n = a;
    Net_1.Net.Call(27523, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29293);
        } else {
          var t = [];
          for (const i of a) {
            var o = [{
              IncId: i.b9n,
              ItemId: i.L8n
            }, i.m9n];
            t.push(o);
          }
          var n = [];
          for (const l of Object.keys(e._vs)) {
            var r = [{
              IncId: 0,
              ItemId: Number.parseInt(l)
            }, e._vs[l]];
            n.push(r);
          }
          n.sort((e, t) => e[0].ItemId - t[0].ItemId);
          var _ = {
            OriginList: t,
            ResultList: n
          };
          UiManager_1.UiManager.OpenView("DestroyPreviewView", _);
        }
      }
    });
  }
  static ItemDestructRequest(t) {
    var e = new Protocol_1.Aki.Protocol.ons();
    e.O9n = t;
    Net_1.Net.Call(17169, e, e => {
      if (e) {
        if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 28549);
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Inventory", 37, "执行道具销毁成功", ["ItemList", t]);
        }
      }
    });
  }
  static InvalidItemRemoveRequest() {
    var e;
    if (!this.Fci) {
      this.Fci = true;
      e = new Protocol_1.Aki.Protocol.wns();
      Net_1.Net.Call(25957, e, e => {
        this.Fci = false;
        if (e && e.zws && UiManager_1.UiManager.IsViewOpen("InventoryView")) {
          this.InvalidItemCheckRequest();
        }
      });
    }
  }
  static InvalidItemCheckRequest() {
    var e = new Protocol_1.Aki.Protocol.bns();
    Net_1.Net.Call(26826, e, e => {
      if (e && e.Zws.length !== 0) {
        var t = new Map();
        for (const a of e.Zws) {
          var o = t.get(a.L8n) ?? 0;
          t.set(a.L8n, o + a.m9n);
        }
        var n;
        var r;
        var _ = [];
        for ([n, r] of t.entries()) {
          var i = [{
            IncId: 0,
            ItemId: n
          }, r];
          _.push(i);
        }
        _.sort((e, t) => e[0].ItemId - t[0].ItemId);
        var l = new Map();
        for (const v of _) {
          l.set(v[0].ItemId, v[1]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NotifyInvalidItem, l);
      }
    });
  }
  static TryUseItem(e, t = 1) {
    for (const o of InventoryController.Vci) {
      if (o(e, t)) {
        return true;
      }
    }
    return false;
  }
  static TryUseGiftItemWithSelectedItem(e, t, o = 1) {
    return ItemUseLogic_1.ItemUseLogic.TryUseGiftItemWithSelectedItem(e, t, o);
  }
  static async PhantomFuncValueBatchRequest(e, t) {
    var o = new Protocol_1.Aki.Protocol.Rxu();
    o.b9n = e;
    o.q9n = t;
    var o = await Net_1.Net.CallAsync(25209, o);
    if (!o) {
      return false;
    }
    if (o.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.G9n, 28161);
      return false;
    }
    let n = 0;
    if (t === Protocol_1.Aki.Protocol.Fxu.Z6n) {
      n = 1;
    } else if (t === Protocol_1.Aki.Protocol.Fxu.Proto_Disuse) {
      n = 2;
    }
    for (const _ of e) {
      var r = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(_);
      if (r) {
        r.SetFunctionValue(n);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnItemFuncValueBatchChange, e);
    return true;
  }
  static PhantomManageConfigRequest(t) {
    var e = new Protocol_1.Aki.Protocol.Exu();
    Net_1.Net.Call(27201, e, e => {
      if (e && (ModelManager_1.ModelManager.InventoryModel.InitPhantomManageConfig(e), t)) {
        t();
      }
    });
  }
  static async PhantomSettingBatchUpdateRequestAsync(e) {
    var t = new Protocol_1.Aki.Protocol.p8u();
    t.qju = e;
    var t = await Net_1.Net.CallAsync(21821, t);
    return !!t && (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 23366), false) : (ModelManager_1.ModelManager.InventoryModel.CoverAllPhantomManageConfig(e), true));
  }
  static OpenManageConfigView() {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(InventoryDefine_1.MANAGE_CONFIG_FUNCTION_ID)) {
      if (ModelManager_1.ModelManager.InventoryModel.GetPhantomManageConfigClear()) {
        InventoryController.PhantomManageConfigRequest(() => {
          UiManager_1.UiManager.OpenView("PhantomManageConfigView");
        });
      } else {
        UiManager_1.UiManager.OpenView("PhantomManageConfigView");
      }
    }
  }
}
exports.InventoryController = InventoryController;
(_a = InventoryController).Q5e = () => {
  InventoryController.NormalItemRequest();
  InventoryController.WeaponItemRequest();
  InventoryController.PhantomItemRequest();
  InventoryController.ValidTimeItemRequest();
};
InventoryController.lEa = (e, t) => {
  if (UiManager_1.UiManager.IsViewShow("InventoryView")) {
    UiManager_1.UiManager.CloseView("InventoryView");
    UiManager_1.UiManager.OpenView("InventoryView");
  }
};
InventoryController.Gci = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Inventory", 37, "NormalItemResponse 获取所有普通道具返回", ["response", e]);
  }
  var t = ModelManager_1.ModelManager.InventoryModel;
  t.ClearCommonItemData();
  var e = e.Dws;
  if (e && e.length !== 0) {
    for (const _ of e) {
      var o = _.s5n;
      var n = _.m9n;
      var r = Number(MathUtils_1.MathUtils.LongToBigInt(_.Xws));
      t.NewCommonItemData(o, n, 0, r);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnResponseCommonItem, _);
    }
    t.RefreshItemRedDotSet();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnResponseCommonItemFinished);
  }
};
InventoryController.Tci = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Inventory", 37, "NormalItemUpdateNotify 普通道具更新通知", ["notify", e]);
  }
  var t = e.Dws;
  if (t && t.length !== 0) {
    var o = ModelManager_1.ModelManager.InventoryModel;
    var n = !e.Aws;
    for (const a of t) {
      var r;
      var _ = a.s5n;
      var i = a.m9n;
      var l = o.GetCommonItemData(_);
      if (l && (r = l.GetCount(), l.SetCount(i), r < i && n ? o.TryAddRedDotCommonItem(_) : o.RemoveRedDotCommonItem(_), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCommonItemCountRefresh, a, i, r), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCommonItemCountAnyChange, _, i), o.IsNewCommonItem(_))) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGetNewItem, _);
      }
    }
    if (n) {
      ItemHintController_1.ItemHintController.AddCommonItemList(t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddCommonItemList, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotRefreshItemData);
  }
};
InventoryController.Lci = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Inventory", 37, "NormalItemRemoveNotify 普通道具通知删除", ["notify", e]);
  }
  e = e.Pws;
  if (e && e.length !== 0) {
    var t = [];
    for (const n of e) {
      var o = {
        ItemId: n,
        IncId: 0
      };
      t.push(o);
    }
    ModelManager_1.ModelManager.InventoryModel.RemoveCommonItemDataAndSaveNewList(t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRemoveCommonItem, e);
    for (const r of e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCommonItemCountAnyChange, r, 0);
    }
  }
};
InventoryController.Dci = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Inventory", 37, "NormalItemAddNotify 添加普通道具通知", ["notify", e]);
  }
  var t = e.Dws;
  if (t && t.length !== 0) {
    var o = ModelManager_1.ModelManager.InventoryModel;
    var n = !e.Aws;
    var r = e.x9n !== GACHA_REASON;
    for (const a of t) {
      var _ = a.s5n;
      var i = a.m9n;
      var l = Number(MathUtils_1.MathUtils.LongToBigInt(a.Xws));
      o.NewCommonItemData(_, i, 0, l);
      if (n) {
        o.TryAddNewCommonItem(_);
        o.TryAddRedDotCommonItem(_);
      } else {
        o.RemoveRedDotCommonItem(_);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddCommonItem, a, r);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCommonItemCountAnyChange, _, i);
    }
    if (n && r) {
      ItemHintController_1.ItemHintController.AddCommonItemList(t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddCommonItemList, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddCommonItemNotify, t);
    o.SaveNewCommonItemConfigIdList();
    o.SaveRedDotCommonItemConfigIdList();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotRefreshItemData);
  }
};
InventoryController.Nci = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Inventory", 37, "ValidTimeItemRequest 获取所有特殊限时道具返回", ["response", e]);
  }
  if (e) {
    e = e.O9n;
    if (e && e.length !== 0) {
      for (const _ of e) {
        var t = _.s5n;
        var o = _.m9n;
        var n = _.b9n;
        var r = Number(MathUtils_1.MathUtils.LongToBigInt(_.Xws));
        ModelManager_1.ModelManager.InventoryModel.NewCommonItemData(t, o, n, r);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnResponseCommonItem, _);
      }
    }
  }
};
InventoryController.Rci = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Inventory", 37, "ValidTimeItemUpdateNotify 特殊限时道具更新通知", ["notify", e]);
  }
  e = e.O9n;
  if (e && e.length !== 0) {
    var t = ModelManager_1.ModelManager.InventoryModel;
    for (const i of e) {
      var o = i.s5n;
      var n = i.m9n;
      var r = i.b9n;
      var _ = Number(MathUtils_1.MathUtils.LongToBigInt(i.Xws));
      var r = t.GetCommonItemData(o, r);
      if (r && (r.SetCount(n), r.SetEndTime(_), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCommonItemCountAnyChange, o, n), ModelManager_1.ModelManager.InventoryModel.IsNewCommonItem(o))) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGetNewItem, o);
      }
    }
    ItemHintController_1.ItemHintController.AddCommonItemList(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddCommonItemList, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotRefreshItemData);
  }
};
InventoryController.Uci = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Inventory", 37, "ValidTimeItemRemoveNotify 特殊限时道具通知删除", ["notify", e]);
  }
  e = e.O9n;
  if (e && e.length !== 0) {
    var t = [];
    var o = [];
    for (const r of e) {
      var n = {
        ItemId: r.L8n,
        IncId: r.b9n
      };
      t.push(n);
      o.push(r.L8n);
    }
    ModelManager_1.ModelManager.InventoryModel.RemoveCommonItemDataAndSaveNewList(t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRemoveCommonItem, o);
    for (const _ of e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCommonItemCountAnyChange, _.L8n, 0);
    }
  }
};
InventoryController.Aci = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Inventory", 37, "ValidTimeItemAddNotify 添加特殊限时道具通知", ["notify", e]);
  }
  e = e.O9n;
  if (e && e.length !== 0) {
    var t = ModelManager_1.ModelManager.InventoryModel;
    for (const i of e) {
      var o = i.s5n;
      var n = i.m9n;
      var r = i.b9n;
      var _ = Number(MathUtils_1.MathUtils.LongToBigInt(i.Xws));
      t.NewCommonItemData(o, n, r, _);
      t.TryAddNewCommonItem(o);
      t.TryAddRedDotCommonItem(o);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCommonItemCountAnyChange, o, n);
    }
    ItemHintController_1.ItemHintController.AddCommonItemList(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddCommonItemList, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddCommonItemNotify, e);
    t.SaveNewCommonItemConfigIdList();
    t.SaveRedDotCommonItemConfigIdList();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotRefreshItemData);
  }
};
InventoryController.Oci = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Inventory", 37, "WeaponItemResponse 获取所有武器道具返回", ["response", e]);
  }
  var t = ModelManager_1.ModelManager.InventoryModel;
  t.ClearWeaponItemData();
  var e = e.Uws;
  if (e && e.length !== 0) {
    for (const _ of e) {
      var o = _.s5n;
      var n = _.b9n;
      var r = _.Vws;
      t.NewWeaponItemData(o, n, r);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnResponseWeaponItem, _);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnResponseWeaponAll);
  }
};
InventoryController.Pci = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Inventory", 37, "WeaponItemAddNotify 添加武器道具通知", ["notify", e]);
  }
  var t = ModelManager_1.ModelManager.InventoryModel;
  var o = e.Uws;
  if (o && o.length !== 0) {
    var n = e.x9n !== GACHA_REASON;
    for (const l of o) {
      var r = l.s5n;
      var _ = l.b9n;
      var i = l.Vws;
      t.NewWeaponItemData(r, _, i);
      t.TryAddNewAttributeItem(_);
      t.TryAddRedDotAttributeItem(_);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddWeaponItem, l, e.wws, n);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddWeaponItemList, o, e.wws, n);
    t.SaveNewAttributeItemUniqueIdList();
    t.SaveRedDotAttributeItemUniqueIdList();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotRefreshItemData);
  }
};
InventoryController.xci = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Inventory", 37, "WeaponItemRemoveNotify 删除武器道具通知", ["notify", e]);
  }
  e = e.xws;
  if (e && e.length !== 0) {
    ModelManager_1.ModelManager.InventoryModel.RemoveWeaponItemDataAndSaveNewList(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRemoveWeaponItem, e);
  }
};
InventoryController.kci = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Inventory", 37, "PhantomItemResponse 获取所有幻象道具返回", ["response", e]);
  }
  ModelManager_1.ModelManager.PhantomBattleModel.SetMaxCost(e.kws);
  var t = e?.Nws;
  if (t) {
    ModelManager_1.ModelManager.PhantomBattleModel.SetUnlockSkinList(t);
  }
  var o = ModelManager_1.ModelManager.InventoryModel;
  o.ClearPhantomItemData();
  var t = e.qws;
  if (t && t.length !== 0) {
    for (const i of t) {
      var n = i.s5n;
      var r = i.b9n;
      var _ = i.Vws;
      o.NewPhantomItemData(n, r, _);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnResponsePhantomItem, i);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEquipPhantomItem, e);
  }
};
InventoryController.wci = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Inventory", 37, "PhantomItemAddNotify 获取幻象道具通知", ["notify", e]);
  }
  const t = e.qws;
  if (t && t.length !== 0) {
    var o = ModelManager_1.ModelManager.InventoryModel;
    for (const i of t) {
      var n = i.s5n;
      var r = i.b9n;
      var _ = i.Vws;
      o.NewPhantomItemData(n, r, _);
      o.TryAddNewAttributeItem(r);
      o.TryAddRedDotAttributeItem(r);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddPhantomItem, i);
    }
    if (e.x9n === VISION_CATCH_REASON) {
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddPhantomItemList, t, true);
      }, ConfigManager_1.ConfigManager.CalabashConfig.DelayTime);
    } else {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddPhantomItemList, t, false);
    }
    o.SaveNewAttributeItemUniqueIdList();
    o.SaveRedDotAttributeItemUniqueIdList();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotRefreshItemData);
  }
};
InventoryController.Bci = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Inventory", 37, "PhantomItemRemoveNotify 删除幻象道具通知", ["notify", e]);
  }
  e = e.Fws;
  if (e && e.length !== 0) {
    ModelManager_1.ModelManager.InventoryModel.RemovePhantomItemDataAndSaveNewList(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRemovePhantomItem, e);
  }
};
InventoryController.bci = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Inventory", 37, "ItemFuncValueUpdateNotify 物品FunctionValue改变通知", ["notify", e]);
  }
  var t = e.b9n;
  var o = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(t);
  if (o) {
    e = e.Vws;
    o.SetFunctionValue(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnItemFuncValueChange, t);
  }
};
InventoryController.qci = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Inventory", 37, "ItemPkgOpenNotify 背包开启列表通知", ["notify", e]);
  }
  ModelManager_1.ModelManager.InventoryModel.SetInventoryTabOpenIdList(e.Jws);
};
InventoryController.Lzu = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Inventory", 37, "ItemPkgFullNotify 背包已满通知", ["Type", e.N8u]);
  }
  if (e.N8u === 3) {
    _a.TryOpenPhantomFullConfirmBox();
  }
};
InventoryController.iVe = e => ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhantomFormationEnterInventoryTip"), false) : ModelManager_1.ModelManager.FunctionModel.IsOpen(10002);
InventoryController.Azu = false;
InventoryController.Fci = false;
InventoryController.Vci = [ItemUseLogic_1.ItemUseLogic.TryUseVisionRefineItem, ItemUseLogic_1.ItemUseLogic.TryUseUiPlayItem, ItemUseLogic_1.ItemUseLogic.TryUseBuffItem, ItemUseLogic_1.ItemUseLogic.TryUsePowerItem, ItemUseLogic_1.ItemUseLogic.TryUseGiftItem, ItemUseLogic_1.ItemUseLogic.TryUseMonthCardItem, ItemUseLogic_1.ItemUseLogic.TryUseBattlePassItem, ItemUseLogic_1.ItemUseLogic.TryUseBirthdayItem, ItemUseLogic_1.ItemUseLogic.TryUsePayShopCouponItem, ItemUseLogic_1.ItemUseLogic.TryUseParameterItem, ItemUseLogic_1.ItemUseLogic.TryUseShipTowerItem];
InventoryController.PhantomManageConfigUpdateRequest = async (e, t) => {
  var o = new Protocol_1.Aki.Protocol.Txu();
  o.Pxu = e;
  o.Axu = t;
  var t = await Net_1.Net.CallAsync(22440, o);
  if (t) {
    if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 28934);
    } else {
      ModelManager_1.ModelManager.InventoryModel.UpdatePhantomManageConfig(e, t);
    }
    return t.Q4n;
  } else {
    return Protocol_1.Aki.Protocol.Q4n.Proto_UnKnownError;
  }
}; //# sourceMappingURL=InventoryController.js.map
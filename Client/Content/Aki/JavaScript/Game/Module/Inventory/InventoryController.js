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
    Net_1.Net.Register(26139, InventoryController.Tci);
    Net_1.Net.Register(27286, InventoryController.Lci);
    Net_1.Net.Register(15572, InventoryController.Dci);
    Net_1.Net.Register(15896, InventoryController.Rci);
    Net_1.Net.Register(29574, InventoryController.Uci);
    Net_1.Net.Register(21811, InventoryController.Aci);
    Net_1.Net.Register(21785, InventoryController.Pci);
    Net_1.Net.Register(29280, InventoryController.xci);
    Net_1.Net.Register(15872, InventoryController.wci);
    Net_1.Net.Register(19488, InventoryController.Bci);
    Net_1.Net.Register(23013, InventoryController.bci);
    Net_1.Net.Register(25109, InventoryController.qci);
    Net_1.Net.Register(25190, InventoryController.WQc);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(26139);
    Net_1.Net.UnRegister(27286);
    Net_1.Net.UnRegister(15572);
    Net_1.Net.UnRegister(15896);
    Net_1.Net.UnRegister(29574);
    Net_1.Net.UnRegister(21811);
    Net_1.Net.UnRegister(21785);
    Net_1.Net.UnRegister(29280);
    Net_1.Net.UnRegister(15872);
    Net_1.Net.UnRegister(19488);
    Net_1.Net.UnRegister(23013);
    Net_1.Net.UnRegister(25109);
    Net_1.Net.UnRegister(25190);
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
        Net_1.Net.Call(15789, n, e => {
          if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 17178);
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
        Net_1.Net.Call(23079, n, e => {
          if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 29150);
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
        if (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity.GetComponent(43)?.IsSkillInCd(e)) {
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
      Net_1.Net.Call(19011, e, e => {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Inventory", 37, "5208_服务端返回使用道具结果:massage", ["massage", e]);
        }
        if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 17524);
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
    Net_1.Net.Call(29737, Protocol_1.Aki.Protocol.gns.create(e), this.Gci);
  }
  static ValidTimeItemRequest() {
    var e = new Protocol_1.Aki.Protocol.qns();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Inventory", 37, "ValidTimeItemRequest 获取所有特殊限时道具请求");
    }
    Net_1.Net.Call(15373, Protocol_1.Aki.Protocol.gns.create(e), this.Nci);
  }
  static WeaponItemRequest() {
    var e = new Protocol_1.Aki.Protocol.Sns();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Inventory", 37, "WeaponItemRequest 获取所有武器道具请求");
    }
    Net_1.Net.Call(15767, Protocol_1.Aki.Protocol.Sns.create(e), this.Oci);
  }
  static PhantomItemRequest() {
    var e = new Protocol_1.Aki.Protocol.Tns();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Inventory", 37, "PhantomItemRequest 获取所有幻象道具请求");
    }
    Net_1.Net.Call(21254, Protocol_1.Aki.Protocol.Tns.create(e), this.kci);
  }
  static InitCalabashSkinItemData(e) {
    var t = ModelManager_1.ModelManager.InventoryModel;
    for (const o of e) {
      t.NewCalabashSkinItemData(o);
    }
    t.RefreshItemRedDotSet();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnResponseCommonItemFinished);
  }
  static AddCalabashSkinItemData(e) {
    var t = ModelManager_1.ModelManager.InventoryModel;
    for (const o of e) {
      t.NewCalabashSkinItemData(o);
      t.TryAddNewCommonItem(o);
      t.TryAddRedDotCommonItem(o);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCommonItemCountAnyChange, o, 1);
    }
    t.SaveNewCommonItemConfigIdList();
    t.SaveRedDotCommonItemConfigIdList();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotRefreshItemData);
  }
  static TryOpenPhantomFullConfirmBox(e) {
    var t;
    if (!this.QQc) {
      this.QQc = true;
      (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(350)).FunctionMap.set(1, e);
      t.FunctionMap.set(2, () => {
        ControllerHolder_1.ControllerHolder.CalabashController.JumpToCalabashRootView("VisionRecoveryTabView");
      });
      t.SetCloseFunction(() => {
        this.QQc = false;
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    }
  }
  static ItemDestructPreviewRequest(l) {
    var e = new Protocol_1.Aki.Protocol.sns();
    e.O9n = l;
    Net_1.Net.Call(19853, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20343);
        } else {
          var t = [];
          for (const i of l) {
            var o = [{
              IncId: i.b9n,
              ItemId: i.L8n
            }, i.m9n];
            t.push(o);
          }
          var n = [];
          for (const a of Object.keys(e._vs)) {
            var r = [{
              IncId: 0,
              ItemId: Number.parseInt(a)
            }, e._vs[a]];
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
    Net_1.Net.Call(26259, e, e => {
      if (e) {
        if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 23551);
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
      Net_1.Net.Call(23027, e, e => {
        this.Fci = false;
        if (e && e.zws && UiManager_1.UiManager.IsViewOpen("InventoryView")) {
          this.InvalidItemCheckRequest();
        }
      });
    }
  }
  static InvalidItemCheckRequest() {
    var e = new Protocol_1.Aki.Protocol.bns();
    Net_1.Net.Call(27007, e, e => {
      if (e && e.Zws.length !== 0) {
        var t = new Map();
        for (const l of e.Zws) {
          var o = t.get(l.L8n) ?? 0;
          t.set(l.L8n, o + l.m9n);
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
        var a = new Map();
        for (const v of _) {
          a.set(v[0].ItemId, v[1]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NotifyInvalidItem, a);
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
    var o = await Net_1.Net.CallAsync(17511, o);
    if (!o) {
      return false;
    }
    if (o.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.G9n, 25577);
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
    Net_1.Net.Call(26237, e, e => {
      if (e && (ModelManager_1.ModelManager.InventoryModel.InitPhantomManageConfig(e), t)) {
        t();
      }
    });
  }
  static async PhantomManageConfigRequestAsync() {
    var e = new Protocol_1.Aki.Protocol.Exu();
    var e = await Net_1.Net.CallAsync(26237, e);
    if (e) {
      ModelManager_1.ModelManager.InventoryModel.InitPhantomManageConfig(e);
    }
  }
  static async PhantomSettingBatchUpdateRequestAsync(e) {
    var t = new Protocol_1.Aki.Protocol.JJu();
    t.eZu = e;
    var t = await Net_1.Net.CallAsync(29095, t);
    return !!t && (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 28785), false) : (ModelManager_1.ModelManager.InventoryModel.CoverAllPhantomManageConfig(e), true));
  }
  static OpenManageConfigView() {
    var e;
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(InventoryDefine_1.MANAGE_CONFIG_FUNCTION_ID)) {
      e = {
        TabViewName: "PhantomManageConfigView",
        Param: undefined
      };
      UiManager_1.UiManager.OpenView("CalabashRootView", e);
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
    for (const l of t) {
      var r;
      var _ = l.s5n;
      var i = l.m9n;
      var a = o.GetCommonItemData(_);
      if (a && (r = a.GetCount(), a.SetCount(i), r < i && n ? o.TryAddRedDotCommonItem(_) : o.RemoveRedDotCommonItem(_), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCommonItemCountRefresh, l, i, r), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCommonItemCountAnyChange, _, i), o.IsNewCommonItem(_))) {
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
    for (const l of t) {
      var _ = l.s5n;
      var i = l.m9n;
      var a = Number(MathUtils_1.MathUtils.LongToBigInt(l.Xws));
      o.NewCommonItemData(_, i, 0, a);
      if (n) {
        o.TryAddNewCommonItem(_);
        o.TryAddRedDotCommonItem(_);
      } else {
        o.RemoveRedDotCommonItem(_);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddCommonItem, l, r);
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
    for (const a of o) {
      var r = a.s5n;
      var _ = a.b9n;
      var i = a.Vws;
      t.NewWeaponItemData(r, _, i);
      t.TryAddNewAttributeItem(_);
      t.TryAddRedDotAttributeItem(_);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddWeaponItem, a, e.wws, n);
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
  ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTime = e.fyg;
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
InventoryController.WQc = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Inventory", 37, "ItemPkgFullNotify 背包已满通知", ["Type", e.OQc]);
  }
};
InventoryController.iVe = e => ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhantomFormationEnterInventoryTip"), false) : ModelManager_1.ModelManager.FunctionModel.IsOpen(10002);
InventoryController.QQc = false;
InventoryController.Fci = false;
InventoryController.Vci = [ItemUseLogic_1.ItemUseLogic.TryUseVisionRefineItem, ItemUseLogic_1.ItemUseLogic.TryUseVisionRefineSubItem, ItemUseLogic_1.ItemUseLogic.TryUseUiPlayItem, ItemUseLogic_1.ItemUseLogic.TryUseBuffItem, ItemUseLogic_1.ItemUseLogic.TryUsePowerItem, ItemUseLogic_1.ItemUseLogic.TryUseTotalTopUpRolePickItem, ItemUseLogic_1.ItemUseLogic.TryUseGiftItem, ItemUseLogic_1.ItemUseLogic.TryUseMonthCardItem, ItemUseLogic_1.ItemUseLogic.TryUseBattlePassItem, ItemUseLogic_1.ItemUseLogic.TryUseBirthdayItem, ItemUseLogic_1.ItemUseLogic.TryUseBrochureItem, ItemUseLogic_1.ItemUseLogic.TryUseBuffEquipItem, ItemUseLogic_1.ItemUseLogic.TryUsePayShopCouponItem, ItemUseLogic_1.ItemUseLogic.TryUseStudentCardItem, ItemUseLogic_1.ItemUseLogic.TryUseParameterItem, ItemUseLogic_1.ItemUseLogic.TryUseShipTowerItem];
InventoryController.PhantomManageConfigUpdateRequest = async (e, t) => {
  var o = new Protocol_1.Aki.Protocol.Txu();
  o.Pxu = e;
  o.Axu = t;
  var t = await Net_1.Net.CallAsync(22080, o);
  if (t) {
    if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 21513);
    } else {
      ModelManager_1.ModelManager.InventoryModel.UpdatePhantomManageConfig(e, t);
    }
    return t.Q4n;
  } else {
    return Protocol_1.Aki.Protocol.Q4n.Proto_UnKnownError;
  }
}; //# sourceMappingURL=InventoryController.js.map
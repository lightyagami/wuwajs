"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemDeliverController = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const DeliverData_1 = require("./DeliverData");
class ItemDeliverController extends UiControllerBase_1.UiControllerBase {
  static HandInItemRequest(e, r, t) {
    var o;
    var a;
    if (e.Type !== 6) {
      if (t) {
        t(false);
      }
    } else {
      o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(e.TreeIncId);
      (a = Protocol_1.Aki.Protocol.nJn.create()).d9n = o;
      a.C9n = MathUtils_1.MathUtils.BigIntToLong(e.TreeIncId);
      a.b5n = e.NodeId;
      a.k9n = r;
      Net_1.Net.Call(23078, a, e => {
        if (e) {
          if (e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 18079);
            if (t) {
              t(false);
            }
          } else if (t) {
            t(true);
          }
        } else if (t) {
          t(false);
        }
      });
    }
  }
  static ItemUseRequest(e, r, t, o) {
    if (e.Type !== 1) {
      if (o) {
        o(false);
      }
    } else {
      const a = Protocol_1.Aki.Protocol._ns.create();
      a.m9n = 1;
      a.L8n = r;
      a.m9n = t;
      Net_1.Net.Call(21827, a, e => {
        if (e) {
          if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 18651);
            if (o) {
              o(false);
            }
          } else {
            if (o) {
              o(true);
            }
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnDeliveryProps, a.L8n);
          }
        } else if (o) {
          o(false);
        }
      });
    }
  }
  static async OpenItemDeliverView(e) {
    return !!UiManager_1.UiManager.IsViewOpen("ItemDeliverView") || (ModelManager_1.ModelManager.ItemDeliverModel.SetItemDeliverData(e), (await UiManager_1.UiManager.OpenViewAsync("ItemDeliverView", e)) !== undefined);
  }
  static async OpenItemDeliverViewByHandInItem(e, r, t, o, a) {
    if (!e || e.length <= 0) {
      return false;
    }
    if (UiManager_1.UiManager.IsViewOpen("ItemDeliverView")) {
      return false;
    }
    var i = ModelManager_1.ModelManager.InventoryModel;
    var n = new DeliverData_1.DeliverData(r, t, o, a);
    for (const g of e) {
      var l = g.HandInType;
      if (l === "ItemIds") {
        var s;
        var _ = g.ItemIds;
        var v = g.Count;
        var M = n.AddSlotData(_, v, l);
        if (_.length === 1) {
          _ = _[0];
          s = i.GetItemCountByConfigId(_);
          M?.SetItem(_, Math.min(v, s));
        }
      } else if (l === "ItemType") {
        var M = g.ItemIds;
        var f = [];
        var m = ConfigManager_1.ConfigManager.ItemConfig;
        for (const D of M) {
          for (const I of m.GetConfigListByItemType(D)) {
            var c = I.Id;
            f.push(c);
          }
        }
        n.AddSlotData(f, g.Count, l);
      }
    }
    return ItemDeliverController.OpenItemDeliverView(n);
  }
  static OpenItemDeliverViewByHandInGroup(r, e, t, o, a) {
    if (r && !UiManager_1.UiManager.IsViewOpen("ItemDeliverView")) {
      var i = ModelManager_1.ModelManager.InventoryModel;
      var n = new DeliverData_1.DeliverData(e, t, o, a);
      var l = r.HandInType;
      var s = r.ItemIds;
      var _ = r.Count;
      for (let e = 0; e < r.Slot; e++) {
        if (l === "ItemIds") {
          var v;
          var M;
          var f = n.AddSlotData(s, _, l);
          if (s.length === 1) {
            v = s[0];
            M = i.GetItemCountByConfigId(v);
            f?.SetItem(v, Math.min(_, M));
          }
        } else if (l === "ItemType") {
          var m = [];
          var c = ConfigManager_1.ConfigManager.ItemConfig;
          for (const D of s) {
            for (const I of c.GetConfigListByItemType(D)) {
              var g = I.Id;
              m.push(g);
            }
          }
          n.AddSlotData(m, _, l);
        }
      }
      ItemDeliverController.OpenItemDeliverView(n);
    }
  }
}
exports.ItemDeliverController = ItemDeliverController;
//# sourceMappingURL=ItemDeliverController.js.map
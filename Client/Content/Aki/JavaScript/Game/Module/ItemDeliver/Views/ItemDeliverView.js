"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemDeliverView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const ItemInteractionPanel_1 = require("../../Common/ItemInteractionPanel/View/ItemInteractionPanel");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const ItemDeliverController_1 = require("../ItemDeliverController");
const DeliverMediumItemGrid_1 = require("./DeliverMediumItemGrid");
class ItemDeliverView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ugi = undefined;
    this.cgi = undefined;
    this.mgi = undefined;
    this.n6t = undefined;
    this.dgi = false;
    this.sOt = () => {
      if (!this.dgi) {
        if (this.Cgi()) {
          var t = this.ugi.Context;
          if (t) {
            this.dgi = true;
            var i = this.ugi.GetSlotDataList();
            if (t.Type === 6) {
              var e = [];
              for (const o of i) {
                if (o.HasItem()) {
                  var r = {
                    F9n: [{
                      w5n: 0,
                      L8n: o.GetCurrentItemConfigId(),
                      D8n: o.GetCurrentCount()
                    }],
                    m9n: o.GetNeedCount(),
                    V9n: Protocol_1.Aki.Protocol.V9n.Proto_ItemIds
                  };
                  switch (o.HandInType) {
                    case "ItemIds":
                      r.V9n = Protocol_1.Aki.Protocol.V9n.Proto_ItemIds;
                      break;
                    case "ItemType":
                      r.V9n = Protocol_1.Aki.Protocol.V9n.H9n;
                  }
                  e.push(r);
                }
              }
              ItemDeliverController_1.ItemDeliverController.HandInItemRequest(t, e, this.ggi);
            } else if (t.Type === 1 && (i = i[0]).HasItem()) {
              ItemDeliverController_1.ItemDeliverController.ItemUseRequest(t, i.GetCurrentItemConfigId(), i.GetCurrentCount(), this.ggi);
            }
          }
        } else {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("DeliverNoMaterial");
        }
      }
    };
    this.ggi = t => {
      this.dgi = false;
      if (t) {
        this.CloseMe();
      }
    };
    this.txt = t => {
      var i;
      if (t.IsEnable()) {
        if (this.fgi(t.ItemConfigId, 1)) {
          this.pgi();
          i = Math.min(t.GetCurrentCount() + 1, t.GetItemCount());
          t.SetCurrentCount(i);
          this.mgi.RefreshItemGrid(t);
        } else {
          this.mgi.SetItemGridSelected(false, t);
        }
      } else {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(t.ItemConfigId);
        this.mgi.SetItemGridSelected(false, t);
      }
    };
    this.gke = t => !!this.ugi && this.ugi.HasEmptySlot();
    this.vgi = t => {
      var i = Math.max(t.GetCurrentCount() - 1, 0);
      t.SetCurrentCount(i);
      this.mgi.RefreshItemGrid(t);
      this.fgi(t.ItemConfigId, -1);
      this.pgi();
      if (i <= 0) {
        this.mgi.SetItemGridSelected(false, t);
      }
    };
    this.Vgt = () => {
      ModelManager_1.ModelManager.ItemDeliverModel?.SetItemDeliverData(undefined);
      this.CloseMe();
    };
    this.Mgi = () => {
      var t = new DeliverMediumItemGrid_1.DeliverMediumItemGrid();
      t.BindReduceButtonCallback(this.Egi);
      return t;
    };
    this.Egi = t => {
      var t = t.Data;
      var i = t.GetCurrentCount() - 1;
      t.SetCurrentCount(Math.max(i, 0));
      var e = this.mgi.GetItemData(t.GetCurrentItemConfigId());
      if (e && (e.SetCurrentCount(e.GetCurrentCount() - 1), this.mgi.RefreshItemGrid(e), i <= 0)) {
        this.mgi.SetItemGridSelected(false, e);
      }
      if (i <= 0) {
        t.ClearItem();
      }
      this.pgi();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [3, UE.UIText], [2, UE.UIButtonComponent], [4, UE.UIScrollViewWithScrollbarComponent], [5, UE.UIHorizontalLayout], [6, UE.UIText]];
    this.BtnBindInfo = [[2, this.sOt]];
  }
  Cgi() {
    for (const t of this.ugi.GetSlotDataList()) {
      if (t.GetCurrentCount() < t.GetNeedCount()) {
        return false;
      }
    }
    return true;
  }
  async OnBeforeStartAsync() {
    this.cgi = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(5), this.Mgi);
    this.n6t = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.n6t.SetCloseCallBack(this.Vgt);
    this.mgi = new ItemInteractionPanel_1.ItemInteractionPanel();
    this.mgi.BindOnItemExtendToggleStateChanged(this.txt);
    this.mgi.BindOnCanExecuteChange(this.gke);
    this.mgi.BindOnReduceButtonTrigger(this.vgi);
    await this.mgi.CreateByActorAsync(this.GetItem(1).GetOwner());
  }
  OnStart() {
    this.ugi = this.OpenParam;
    if (this.ugi) {
      this.n6t.SetCloseBtnActive(true);
      this.n6t.SetHelpBtnActive(false);
      this.Nft();
      this.Sgi();
      this.pgi(() => {
        var t = this.ugi.GetSlotDataList()[0];
        if (t && (this.ygi(t, t.GetNeedCount()), t = t.GetItemRangeList().length <= 1, this.n6t.SetTitleIconVisible(t), this.n6t.SetTitleTextActive(t), t)) {
          t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_IconDeliver");
          this.n6t.SetTitleIcon(t);
        }
      });
    }
  }
  OnBeforeDestroy() {
    this.ugi?.Clear();
    this.ugi = undefined;
    this.cgi = undefined;
    this.mgi = undefined;
  }
  Nft() {
    var t = this.ugi.TitleTextId;
    if (t) {
      t = t === undefined ? "" : PublicUtil_1.PublicUtil.GetConfigTextByKey(t);
      this.GetText(6)?.SetText(t);
    }
  }
  Sgi() {
    var t = this.ugi.DescriptionTextId;
    var t = t === undefined ? "" : PublicUtil_1.PublicUtil.GetConfigTextByKey(t);
    this.GetText(3)?.SetText(t);
  }
  fgi(i, e) {
    var r = this.ugi.GetSlotDataList();
    if (e > 0) {
      if (this.ugi?.IsSlotEnough(i)) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RepeatedDeliveryItem");
        return false;
      }
      for (const h of r) {
        var t = h.GetCurrentCount() + e;
        var t = MathUtils_1.MathUtils.Clamp(t, 0, h.GetNeedCount());
        if (!h.IsEnough()) {
          if (t <= 0) {
            h.ClearItem();
            return true;
          }
          if (h.SetItem(i, t)) {
            return true;
          }
        }
      }
    } else {
      for (let t = r.length - 1; t >= 0; t--) {
        var o = r[t];
        if (o.GetCurrentItemConfigId() === i) {
          var s = o.GetCurrentCount() + e;
          var s = MathUtils_1.MathUtils.Clamp(s, 0, o.GetNeedCount());
          if (o.HasItem()) {
            if (s <= 0) {
              o.ClearItem();
              return true;
            }
            if (o.SetItem(i, s)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  pgi(t) {
    var i = this.ugi.GetSlotDataList();
    this.cgi?.RefreshByData(i, t);
  }
  ygi(t, i) {
    var e = [];
    var t = t.GetItemRangeList();
    if (t.length <= 1) {
      this.mgi.SetActive(false);
    } else {
      for (const o of t) {
        var r = {
          ItemConfigId: o,
          CurrentCount: 0,
          NeedCount: i
        };
        e.push(r);
      }
      this.mgi.Refresh({
        ItemInfoList: e
      }).then(() => {
        var t;
        var i;
        var e = this.mgi.GetItemDataMainTypeMap();
        var r = this.ugi.GetSlotDataList()[0].GetNeedCount();
        var o = this.mgi.GetMainTypeIdList()[0];
        for ([t, i] of e) {
          for (const s of i) {
            if (s.GetItemCount() >= r && t !== o) {
              this.mgi?.SetMainTypeRedDotVisible(t, true);
              break;
            }
          }
        }
      }, () => {});
      this.mgi.SetActive(true);
    }
  }
}
exports.ItemDeliverView = ItemDeliverView;
//# sourceMappingURL=ItemDeliverView.js.map
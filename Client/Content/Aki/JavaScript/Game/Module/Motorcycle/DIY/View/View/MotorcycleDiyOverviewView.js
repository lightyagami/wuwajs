"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyOverviewView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const TabComponent_1 = require("../../../../Common/TabComponent/TabComponent");
const LoopScrollView_1 = require("../../../../Util/ScrollView/LoopScrollView");
const MotorcycleDiyStickerDecoItem_1 = require("../../Item/MotorcycleDiyStickerDecoItem");
const MotorcycleDiyDefine_1 = require("../../MotorcycleDiyDefine");
const MotorcycleDiyPartTabItem_1 = require("../../TabItem/MotorcycleDiyPartTabItem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
class MotorcycleDiyOverviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.Eyf = undefined;
    this.eIg = undefined;
    this.Tyf = [];
    this.tIg = [];
    this.ebl = undefined;
    this.iIg = 0;
    this.rIg = 0;
    this.oIg = (e, t) => {
      return new MotorcycleDiyPartTabItem_1.MotorcycleDiyPartTabItem();
    };
    this.pqe = e => {
      e = this.Tyf[e];
      this.iIg = e.PartId;
      this.kfo(e.PartId, true);
    };
    this.nIg = () => {
      var e = new MotorcycleDiyStickerDecoItem_1.MotorcycleDiyStickerDecoItem();
      e.OnClickToggleBack = this.sIg;
      return e;
    };
    this.aIg = (e, t) => {
      var i = ModelManager_1.ModelManager.MotorcycleDiyModel.GetItemState(this.rIg, e.ItemId);
      var r = ModelManager_1.ModelManager.MotorcycleDiyModel.GetItemState(this.rIg, t.ItemId);
      if (i !== r) {
        return i - r;
      } else if ((i = e.QualityId) !== (r = t.QualityId)) {
        return r - i;
      } else {
        r = e.SortIndex;
        return t.SortIndex - r;
      }
    };
    this.sIg = (i, r, o) => {
      var a;
      var n = ModelManager_1.ModelManager.MotorcycleDiyModel.GetItemState(this.rIg, i);
      if (n === 4) {
        r.SetToggleState(0);
        if (a = ModelManager_1.ModelManager.MotorcycleDiyModel.GetBanTips(this.rIg, i)) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorDIYWarning01", a[0], a[1]);
        }
      } else {
        if (this.ebl) {
          this.ebl.SetToggleState(0);
        }
        this.ebl = r;
        this.ebl.SetToggleState(1);
        if (ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotHasNewItem(i)) {
          ModelManager_1.ModelManager.MotorcycleDiyModel.UpdateItemNewUnlocked(i, false);
          o.SetUIActive(false);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDiyInfoRedDotUpdate);
        let e = false;
        let t = false;
        if (this.rIg === 2) {
          ModelManager_1.ModelManager.MotorcycleDiyModel.SetSelectStickerInfo(this.iIg, i);
          e = ModelManager_1.ModelManager.MotorcycleDiyModel.IsEquipDefaultSticker(this.iIg);
          t = i === 0 && !e;
          if (n === 2 || !!t) {
            a = ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedStickerIdList(true);
            ControllerHolder_1.ControllerHolder.MotorcycleDiyController.EquipMotorStickerRequest(a, () => {
              this.kfo(this.iIg, false);
            });
          }
        } else if (this.rIg === 3) {
          ModelManager_1.ModelManager.MotorcycleDiyModel.SetSelectDecorationInfo(this.iIg, i);
          e = ModelManager_1.ModelManager.MotorcycleDiyModel.IsEquipDefaultDecoration(this.iIg);
          t = i === 0 && !e;
          if (n === 2 || !!t) {
            r = ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedDecorationIdList(true);
            ControllerHolder_1.ControllerHolder.MotorcycleDiyController.EquipMotorDecorationRequest(r, () => {
              this.kfo(this.iIg, false);
            });
          }
        }
      }
    };
    this.xpt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [2, UE.UIHorizontalLayout], [4, UE.UILoopScrollViewComponent], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    const r = e[0];
    var t;
    var i;
    var e = e[1];
    this.rIg = r;
    this.iIg = e;
    let o = [];
    let a = "MotorcycleDiyStickerPartTab";
    let n = "MotorcycleDiyStickerPrePartTab";
    if (r === 2) {
      o = MotorcycleDiyDefine_1.MOTORCYCLE_DIY_STICKER_PART;
      a = "MotorcycleDiyStickerPartTab";
      n = "MotorcycleDiyStickerPrePartTab";
    } else if (r === 3) {
      o = MotorcycleDiyDefine_1.MOTORCYCLE_DIY_DECORATION_PART;
      a = "MotorcycleDiyDecorationPartTab";
      n = "MotorcycleDiyDecorationPrePartTab";
    }
    o.forEach((e, t) => {
      var i = new MotorcycleDiyPartTabItem_1.MotorcycleDiyPartTabItemData();
      i.OutlookType = r;
      i.PartId = e;
      i.IsShowLine = t !== o.length - 1;
      this.Tyf.push(i);
    });
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetHelpBtnActive(false);
    this.lqe.SetCloseCallBack(this.xpt);
    this.Eyf = new TabComponent_1.TabComponent(this.GetHorizontalLayout(2).RootUIComp, this.oIg, this.pqe, undefined);
    this.eIg = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(4), this.GetItem(5).GetOwner(), this.nIg, true);
    await this.Eyf.RefreshTabItemAsync(this.Tyf);
    for ([t, i] of this.Eyf.GetTabItemMap()) {
      i.BindRedDot(a, this.Tyf[t].PartId);
      i.BindPreviewRedDot(n, this.Tyf[t].PartId);
    }
  }
  OnBeforeShow() {
    var e = this.iIg - 1;
    this.Eyf.SelectToggleByIndex(e);
  }
  C01(e) {
    if (this.rIg === 2) {
      return this.Uyf(e);
    } else if (this.rIg === 3) {
      return this.FEg(e);
    } else {
      return [];
    }
  }
  Uyf(e) {
    var t;
    var i;
    var r = [];
    var o = new MotorcycleDiyDefine_1.MotorcycleDiyStickerDecoItemData();
    o.Part = e;
    o.ItemId = 0;
    o.IsSticker = true;
    r.push(o);
    var o = ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedStickerId(e);
    if (o) {
      t = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(o);
      (i = new MotorcycleDiyDefine_1.MotorcycleDiyStickerDecoItemData()).Part = e;
      i.ItemId = o;
      i.QualityId = t ? t.QualityId : 0;
      i.SortIndex = t ? t.SortIndex : 0;
      i.IsSticker = true;
      r.push(i);
    }
    var o = ModelManager_1.ModelManager.MotorcycleDiyModel.GetCanUseStickerIdsInRegion();
    for (const s of o) {
      var a;
      var n = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(s);
      if (n && n.PartId === e && (a = ModelManager_1.ModelManager.MotorcycleDiyModel.GetStickerState(s)) !== 0 && a !== 1) {
        (a = new MotorcycleDiyDefine_1.MotorcycleDiyStickerDecoItemData()).Part = e;
        a.ItemId = s;
        a.QualityId = n.QualityId;
        a.SortIndex = n.SortIndex;
        a.IsSticker = true;
        r.push(a);
      }
    }
    return r;
  }
  FEg(e) {
    var t;
    var i;
    var r = [];
    var o = new MotorcycleDiyDefine_1.MotorcycleDiyStickerDecoItemData();
    o.Part = e;
    o.ItemId = 0;
    o.IsSticker = false;
    r.push(o);
    var o = ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedDecorationId(e);
    if (o) {
      t = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationConfig(o);
      (i = new MotorcycleDiyDefine_1.MotorcycleDiyStickerDecoItemData()).Part = e;
      i.ItemId = o;
      i.QualityId = t ? t.QualityId : 0;
      i.SortIndex = t ? t.SortIndex : 0;
      i.IsSticker = false;
      r.push(i);
    }
    var o = ModelManager_1.ModelManager.MotorcycleDiyModel.GetCanUseDecorationsIdsInRegion();
    for (const s of o) {
      var a;
      var n = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationConfig(s);
      if (n && n.PartId === e && (a = ModelManager_1.ModelManager.MotorcycleDiyModel.GetDecorationState(s)) !== 0 && a !== 1) {
        (a = new MotorcycleDiyDefine_1.MotorcycleDiyStickerDecoItemData()).Part = e;
        a.ItemId = s;
        a.QualityId = n.QualityId;
        a.SortIndex = n.SortIndex;
        a.IsSticker = false;
        r.push(a);
      }
    }
    return r;
  }
  kfo(e, t) {
    if (t) {
      const i = this.C01(e);
      i.sort(this.aIg);
      this.eIg.RefreshByData(i, true, () => {
        this.xyf(e, i);
      });
      this.tIg = i;
    } else {
      this.eIg.RefreshByData(this.tIg, true);
    }
  }
  xyf(e, t) {
    let i = 0;
    let r = 0;
    var o = ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedItemId(this.rIg, e);
    r = o !== 0 ? o : ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedItemId(this.rIg, e);
    var o = t.find(e => e.ItemId === r);
    if (o) {
      i = t.indexOf(o);
    }
    if (!this.eIg.IsGridDisplaying(i)) {
      this.eIg.ScrollToGridIndex(i, false);
    }
    this.eIg.DeselectCurrentGridProxy();
    this.eIg.SelectGridProxy(i);
  }
}
exports.MotorcycleDiyOverviewView = MotorcycleDiyOverviewView;
//# sourceMappingURL=MotorcycleDiyOverviewView.js.map
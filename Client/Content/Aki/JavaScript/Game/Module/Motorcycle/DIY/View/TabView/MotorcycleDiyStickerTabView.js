"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyStickerTabView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const TabComponent_1 = require("../../../../Common/TabComponent/TabComponent");
const SkipTaskManager_1 = require("../../../../SkipInterface/SkipTaskManager");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../../Util/ScrollView/LoopScrollView");
const MotorcycleUiModelUtil_1 = require("../../../Model/MotorcycleUiModelUtil");
const MotorcycleDiyStickerDecoItem_1 = require("../../Item/MotorcycleDiyStickerDecoItem");
const MotorcycleDiyDefine_1 = require("../../MotorcycleDiyDefine");
const MotorcycleDiyPartTabItem_1 = require("../../TabItem/MotorcycleDiyPartTabItem");
class MotorcycleDiyStickerTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.OnTabCameraClick = undefined;
    this.Eyf = undefined;
    this.Iyf = undefined;
    this.Tyf = [];
    this._8f = [];
    this.ebl = undefined;
    this.byf = 0;
    this.Uou = 0;
    this.Ryf = (e, i) => {
      return new MotorcycleDiyPartTabItem_1.MotorcycleDiyPartTabItem();
    };
    this.pqe = e => {
      e = this.Tyf[e];
      this.byf = e.PartId;
      this.kfo(e.PartId, true);
      this.OnTabCameraClick?.(this.byf);
    };
    this.Lyf = () => {
      var e = new MotorcycleDiyStickerDecoItem_1.MotorcycleDiyStickerDecoItem();
      e.OnClickToggleBack = this.Pyf;
      return e;
    };
    this.Ayf = (e, i) => {
      var t = ModelManager_1.ModelManager.MotorcycleDiyModel.GetStickerState(e.ItemId);
      var r = ModelManager_1.ModelManager.MotorcycleDiyModel.GetStickerState(i.ItemId);
      if (t !== r) {
        return t - r;
      } else if ((t = e.QualityId) !== (r = i.QualityId)) {
        return r - t;
      } else {
        r = e.SortIndex;
        return i.SortIndex - r;
      }
    };
    this.Dyf = () => {
      this.kfo(this.byf, false);
    };
    this.Pyf = (e, i, t) => {
      var r;
      var o;
      var a;
      var s;
      var n;
      var h;
      var l;
      var c = ModelManager_1.ModelManager.MotorcycleDiyModel.GetStickerState(e);
      if (c === 4) {
        i.SetToggleState(0);
        if (r = ModelManager_1.ModelManager.MotorcycleDiyModel.GetBanTips(2, e)) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorDIYWarning01", r[0], r[1]);
        }
      } else {
        if (this.ebl) {
          this.ebl.SetToggleState(0);
        }
        this.ebl = i;
        this.ebl.SetToggleState(1);
        this.UiViewSequence.StopSequenceByKey("Switch");
        this.UiViewSequence.PlaySequencePurely("Switch");
        if (e === 0) {
          MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.SetEmptySticker(this.byf);
        } else {
          MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.AddMaterialByStickerId(e);
        }
        r = ModelManager_1.ModelManager.MotorcycleDiyModel.IsEquipDefaultSticker(this.byf);
        i = e === 0 && !r;
        ModelManager_1.ModelManager.MotorcycleDiyModel.SetSelectStickerInfo(this.byf, e);
        if (c === 2 || !!i) {
          r = ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedStickerIdList(true);
          ControllerHolder_1.ControllerHolder.MotorcycleDiyController.EquipMotorStickerRequest(r);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDiyOnSelectToggleClick, 2, this.byf, e);
        if (ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotHasNewItem(e)) {
          ModelManager_1.ModelManager.MotorcycleDiyModel.UpdateItemNewUnlocked(e, false);
          t.SetUIActive(false);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDiyInfoRedDotUpdate);
        i = this.GetItem(7);
        r = this.GetItem(10);
        t = this.GetItem(12);
        o = this.GetText(11);
        a = this.GetButton(9);
        s = this.GetText(13);
        n = this.GetText(6);
        l = this.GetText(8);
        i.SetUIActive(false);
        r.SetUIActive(false);
        t.SetUIActive(false);
        a.RootUIComp.SetUIActive(false);
        if (e <= 0) {
          i = CommonParamById_1.configCommonParamById.GetStringConfig("MotorEmptyStickerName");
          h = CommonParamById_1.configCommonParamById.GetStringConfig("MotorEmptyStickerType");
          l.SetUIActive(true);
          LguiUtil_1.LguiUtil.SetLocalTextNew(l, h);
          LguiUtil_1.LguiUtil.SetLocalTextNew(n, i);
        } else {
          h = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(e);
          LguiUtil_1.LguiUtil.SetLocalTextNew(l, h.SubTitle);
          LguiUtil_1.LguiUtil.SetLocalTextNew(n, h.Title);
          this.GetItem(7).SetUIActive(c === 3);
          if (i = h.ItemAccess[0]) {
            e = ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(i);
            this.Uou = i;
            l = e.SkipName;
            a.RootUIComp.SetUIActive(l !== -1 && c === 3);
            t.SetUIActive(c === 3);
            r.SetUIActive(l === -1 && c === 3);
            LguiUtil_1.LguiUtil.SetLocalTextNew(o, e.Description);
            LguiUtil_1.LguiUtil.SetLocalTextNew(s, e.Description);
          }
        }
      }
    };
    this.rmf = () => {
      if (!(this.Uou <= 0)) {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Uou);
      }
    };
    this.WEg = () => {
      var e = [];
      e.push(2);
      e.push(this.byf);
      UiManager_1.UiManager.OpenView("MotorcycleDiyOverviewView", e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIButtonComponent], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIButtonComponent]];
    this.BtnBindInfo = [[9, this.rmf], [14, this.WEg]];
  }
  async OnBeforeStartAsync() {
    var e;
    var i;
    this.byf = this.ExtraParams ?? 0;
    this.Eyf = new TabComponent_1.TabComponent(this.GetHorizontalLayout(0).RootUIComp, this.Ryf, this.pqe, undefined);
    this.Iyf = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), this.GetItem(4).GetOwner(), this.Lyf, true);
    MotorcycleDiyDefine_1.MOTORCYCLE_DIY_STICKER_PART.forEach((e, i) => {
      var t = new MotorcycleDiyPartTabItem_1.MotorcycleDiyPartTabItemData();
      t.OutlookType = 2;
      t.PartId = e;
      t.IsShowLine = i !== MotorcycleDiyDefine_1.MOTORCYCLE_DIY_STICKER_PART.length - 1;
      this.Tyf.push(t);
    });
    await this.Eyf.RefreshTabItemAsync(this.Tyf);
    for ([e, i] of this.Eyf.GetTabItemMap()) {
      i.BindRedDot("MotorcycleDiyStickerPartTab", this.Tyf[e].PartId);
      i.BindPreviewRedDot("MotorcycleDiyStickerPrePartTab", this.Tyf[e].PartId);
    }
    this.GetButton(14).RootUIComp.SetUIActive(true);
  }
  OnBeforeShow() {
    var e = this.byf > 0 ? this.byf - 1 : 0;
    this.Eyf.SelectToggleByIndex(e, true);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorDiyInfoUpdate, this.Dyf);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorDiyInfoUpdate, this.Dyf);
  }
  RefreshItemScrollView() {
    if (this.Iyf !== undefined) {
      this.kfo(this.byf, true);
    }
  }
  Uyf(e) {
    var i;
    var t;
    var r = [];
    var o = new MotorcycleDiyDefine_1.MotorcycleDiyStickerDecoItemData();
    o.Part = e;
    o.ItemId = 0;
    o.IsSticker = true;
    r.push(o);
    var o = ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedStickerId(e);
    if (o) {
      i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(o);
      (t = new MotorcycleDiyDefine_1.MotorcycleDiyStickerDecoItemData()).Part = e;
      t.ItemId = o;
      t.QualityId = i ? i.QualityId : 0;
      t.SortIndex = i ? i.SortIndex : 0;
      t.IsSticker = true;
      r.push(t);
    }
    var o = ModelManager_1.ModelManager.MotorcycleDiyModel.GetCanUseStickerIdsInRegion();
    for (const n of o) {
      var a;
      var s = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(n);
      if (s && s.PartId === e && (a = ModelManager_1.ModelManager.MotorcycleDiyModel.GetStickerState(n)) !== 0 && a !== 1) {
        (a = new MotorcycleDiyDefine_1.MotorcycleDiyStickerDecoItemData()).Part = e;
        a.ItemId = n;
        a.QualityId = s ? s.QualityId : 0;
        a.SortIndex = s ? s.SortIndex : 0;
        a.IsSticker = true;
        r.push(a);
      }
    }
    return r;
  }
  kfo(e, i) {
    if (i) {
      const t = this.Uyf(e);
      t.sort(this.Ayf);
      this.Iyf.RefreshByData(t, true, () => {
        this.xyf(e, t);
      });
      this._8f = t;
    } else {
      this.Iyf.RefreshByData(this._8f, true);
    }
  }
  xyf(e, i) {
    let t = 0;
    let r = 0;
    var o = ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedStickerId(e);
    r = o !== 0 ? o : ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedStickerId(e);
    var o = i.find(e => e.ItemId === r);
    if (o) {
      t = i.indexOf(o);
    }
    if (!this.Iyf.IsGridDisplaying(t)) {
      this.Iyf.ScrollToGridIndex(t, false);
    }
    this.Iyf.DeselectCurrentGridProxy();
    this.Iyf.SelectGridProxy(t);
  }
}
exports.MotorcycleDiyStickerTabView = MotorcycleDiyStickerTabView;
//# sourceMappingURL=MotorcycleDiyStickerTabView.js.map
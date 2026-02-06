"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyDecorationTabView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../../Ui/Base/UiTabViewBase");
const TabComponent_1 = require("../../../../Common/TabComponent/TabComponent");
const SkipTaskManager_1 = require("../../../../SkipInterface/SkipTaskManager");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../../Util/ScrollView/LoopScrollView");
const MotorcycleUiModelUtil_1 = require("../../../Model/MotorcycleUiModelUtil");
const MotorcycleDiyStickerDecoItem_1 = require("../../Item/MotorcycleDiyStickerDecoItem");
const MotorcycleDiyDefine_1 = require("../../MotorcycleDiyDefine");
const MotorcycleDiyPartTabItem_1 = require("../../TabItem/MotorcycleDiyPartTabItem");
class MotorcycleDiyDecorationTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.OnTabCameraClick = undefined;
    this.Eyf = undefined;
    this.DEg = undefined;
    this.Tyf = [];
    this.UEg = [];
    this.ebl = undefined;
    this.xEg = 0;
    this.Uou = 0;
    this.BEg = (e, t) => {
      return new MotorcycleDiyPartTabItem_1.MotorcycleDiyPartTabItem();
    };
    this.pqe = e => {
      e = this.Tyf[e];
      this.xEg = e.PartId;
      this.kfo(e.PartId, true);
      this.OnTabCameraClick?.(this.xEg);
    };
    this.kEg = () => {
      var e = new MotorcycleDiyStickerDecoItem_1.MotorcycleDiyStickerDecoItem();
      e.OnClickToggleBack = this.qEg;
      return e;
    };
    this.OEg = (e, t) => {
      var i = ModelManager_1.ModelManager.MotorcycleDiyModel.GetDecorationState(e.ItemId);
      var o = ModelManager_1.ModelManager.MotorcycleDiyModel.GetDecorationState(t.ItemId);
      if (i !== o) {
        return i - o;
      } else if ((i = e.QualityId) !== (o = t.QualityId)) {
        return o - i;
      } else {
        o = e.SortIndex;
        return t.SortIndex - o;
      }
    };
    this.GEg = () => {
      this.kfo(this.xEg, false);
    };
    this.qEg = (e, t, i) => {
      var o;
      var r;
      var a;
      var s;
      var n;
      var h;
      var l = ModelManager_1.ModelManager.MotorcycleDiyModel.GetDecorationState(e);
      if (l === 4) {
        t.SetToggleState(0);
        if (o = ModelManager_1.ModelManager.MotorcycleDiyModel.GetBanTips(3, e)) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorDIYWarning01", o[0], o[1]);
        }
      } else {
        if (this.ebl) {
          this.ebl.SetToggleState(0);
        }
        this.ebl = t;
        this.ebl.SetToggleState(1);
        this.UiViewSequence.StopSequenceByKey("Switch");
        this.UiViewSequence.PlaySequencePurely("Switch");
        if (e === 0) {
          MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.SetEmptyDecoration(this.xEg);
        } else {
          MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.AddDecoration(e);
        }
        o = ModelManager_1.ModelManager.MotorcycleDiyModel.IsEquipDefaultDecoration(this.xEg);
        t = e === 0 && !o;
        ModelManager_1.ModelManager.MotorcycleDiyModel.SetSelectDecorationInfo(this.xEg, e);
        if (l === 2 || !!t) {
          o = ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedDecorationIdList(true);
          ControllerHolder_1.ControllerHolder.MotorcycleDiyController.EquipMotorDecorationRequest(o);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDiyOnSelectToggleClick, 3, this.xEg, e);
        if (ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotHasNewItem(e)) {
          ModelManager_1.ModelManager.MotorcycleDiyModel.UpdateItemNewUnlocked(e, false);
          i.SetUIActive(false);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDiyInfoRedDotUpdate);
        t = this.GetItem(7);
        o = this.GetItem(10);
        i = this.GetItem(12);
        r = this.GetText(11);
        a = this.GetButton(9);
        s = this.GetText(13);
        h = this.GetText(6);
        n = this.GetText(8);
        t.SetUIActive(false);
        o.SetUIActive(false);
        i.SetUIActive(false);
        a.RootUIComp.SetUIActive(false);
        if (e <= 0) {
          t = CommonParamById_1.configCommonParamById.GetStringConfig("MotorEmptyDecorationName");
          n.SetUIActive(false);
          LguiUtil_1.LguiUtil.SetLocalTextNew(h, t);
        } else {
          n.SetUIActive(true);
          t = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationConfig(e);
          LguiUtil_1.LguiUtil.SetLocalTextNew(n, t.SubTitle);
          LguiUtil_1.LguiUtil.SetLocalTextNew(h, t.Title);
          this.GetItem(7).SetUIActive(l === 3);
          if (e = t.ItemAccess[0]) {
            n = ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(e);
            this.Uou = e;
            h = n.SkipName;
            a.RootUIComp.SetUIActive(h !== -1 && l === 3);
            i.SetUIActive(l === 3);
            o.SetUIActive(h === -1 && l === 3);
            LguiUtil_1.LguiUtil.SetLocalTextNew(r, n.Description);
            LguiUtil_1.LguiUtil.SetLocalTextNew(s, n.Description);
          }
        }
      }
    };
    this.rmf = () => {
      if (!(this.Uou <= 0)) {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Uou);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIButtonComponent], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIButtonComponent], [15, UE.UIItem], [16, UE.UIItem]];
    this.BtnBindInfo = [[9, this.rmf]];
  }
  async OnBeforeStartAsync() {
    var e;
    var t;
    this.xEg = this.ExtraParams ?? 0;
    this.Eyf = new TabComponent_1.TabComponent(this.GetHorizontalLayout(0).RootUIComp, this.BEg, this.pqe, undefined);
    this.DEg = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), this.GetItem(4).GetOwner(), this.kEg, true);
    MotorcycleDiyDefine_1.MOTORCYCLE_DIY_DECORATION_PART.forEach((e, t) => {
      var i = new MotorcycleDiyPartTabItem_1.MotorcycleDiyPartTabItemData();
      i.OutlookType = 3;
      i.PartId = e;
      i.IsShowLine = t !== MotorcycleDiyDefine_1.MOTORCYCLE_DIY_DECORATION_PART.length - 1;
      this.Tyf.push(i);
    });
    await this.Eyf.RefreshTabItemAsync(this.Tyf);
    for ([e, t] of this.Eyf.GetTabItemMap()) {
      t.BindRedDot("MotorcycleDiyDecorationPartTab", this.Tyf[e].PartId);
      t.BindPreviewRedDot("MotorcycleDiyDecorationPrePartTab", this.Tyf[e].PartId);
    }
    this.GetButton(14).RootUIComp.SetUIActive(false);
    this.GetItem(16).SetUIActive(true);
    this.GetItem(15).SetUIActive(false);
  }
  OnBeforeShow() {
    var e = this.xEg > 0 ? this.xEg - 1 : 0;
    this.Eyf.SelectToggleByIndex(e, true);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorDiyInfoUpdate, this.GEg);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorDiyInfoUpdate, this.GEg);
  }
  RefreshItemScrollView() {
    if (this.DEg !== undefined) {
      this.kfo(this.xEg, true);
    }
  }
  FEg(e) {
    var t;
    var i;
    var o = [];
    var r = new MotorcycleDiyDefine_1.MotorcycleDiyStickerDecoItemData();
    r.Part = e;
    o.push(r);
    var r = ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedDecorationId(e);
    if (r) {
      t = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationConfig(r);
      (i = new MotorcycleDiyDefine_1.MotorcycleDiyStickerDecoItemData()).Part = e;
      i.ItemId = r;
      i.QualityId = t ? t.QualityId : 0;
      i.SortIndex = t ? t.SortIndex : 0;
      o.push(i);
    }
    var r = ModelManager_1.ModelManager.MotorcycleDiyModel.GetCanUseDecorationsIdsInRegion();
    for (const n of r) {
      var a;
      var s = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationConfig(n);
      if (s && s.PartId === e && (a = ModelManager_1.ModelManager.MotorcycleDiyModel.GetDecorationState(n)) !== 0 && a !== 1) {
        (a = new MotorcycleDiyDefine_1.MotorcycleDiyStickerDecoItemData()).Part = e;
        a.ItemId = n;
        a.QualityId = s.QualityId;
        a.SortIndex = s.SortIndex;
        o.push(a);
      }
    }
    return o;
  }
  kfo(e, t) {
    if (t) {
      const i = this.FEg(e);
      i.sort(this.OEg);
      this.DEg.RefreshByData(i, true, () => {
        this.xyf(e, i);
      });
      this.UEg = i;
    } else {
      this.DEg.RefreshByData(this.UEg, true);
    }
  }
  xyf(e, t) {
    let i = 0;
    let o = 0;
    var r = ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedDecorationId(e);
    o = r !== 0 ? r : ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedDecorationId(e);
    var r = t.find(e => e.ItemId === o);
    if (r) {
      i = t.indexOf(r);
    }
    if (!this.DEg.IsGridDisplaying(i)) {
      this.DEg.ScrollToGridIndex(i, false);
    }
    this.DEg.DeselectCurrentGridProxy();
    this.DEg.SelectGridProxy(i);
  }
}
exports.MotorcycleDiyDecorationTabView = MotorcycleDiyDecorationTabView;
//# sourceMappingURL=MotorcycleDiyDecorationTabView.js.map
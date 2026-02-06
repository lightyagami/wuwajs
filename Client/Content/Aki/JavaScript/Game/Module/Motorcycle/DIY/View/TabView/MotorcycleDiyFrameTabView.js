"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyFrameTabView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../../Ui/Base/UiTabViewBase");
const SkipTaskManager_1 = require("../../../../SkipInterface/SkipTaskManager");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../../Util/ScrollView/LoopScrollView");
const MotorcycleUiModelUtil_1 = require("../../../Model/MotorcycleUiModelUtil");
const MotorcycleDiyFrameItem_1 = require("../../Item/MotorcycleDiyFrameItem");
const MotorcycleDiyDefine_1 = require("../../MotorcycleDiyDefine");
class MotorcycleDiyFrameTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.OnTabCameraClick = undefined;
    this.Syf = undefined;
    this.NEg = [];
    this.ebl = undefined;
    this.Uou = 0;
    this.Myf = () => {
      var e = new MotorcycleDiyFrameItem_1.MotorcycleDiyFrameItem();
      e.OnClickToggleBack = this.VEg;
      return e;
    };
    this.HEg = (e, i) => {
      var t = e.IsDefault ? 0 : 1;
      var r = i.IsDefault ? 0 : 1;
      if (t != r || (t = ModelManager_1.ModelManager.MotorcycleDiyModel.GetFrameState(e.ItemId)) !== (r = ModelManager_1.ModelManager.MotorcycleDiyModel.GetFrameState(i.ItemId))) {
        return t - r;
      } else if ((t = e.QualityId) !== (r = i.QualityId)) {
        return r - t;
      } else {
        r = e.SortIndex;
        return i.SortIndex - r;
      }
    };
    this.jEg = () => {
      this.kfo(false);
    };
    this.VEg = (e, i, t) => {
      var r;
      var o;
      var a;
      var s;
      var n;
      var l;
      var M = ModelManager_1.ModelManager.MotorcycleDiyModel.GetFrameState(e);
      if (M === 4) {
        i.SetToggleState(0);
        if (r = ModelManager_1.ModelManager.MotorcycleDiyModel.GetBanTips(1, e)) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorDIYWarning01", r[0], r[1]);
        }
      } else if (ModelManager_1.ModelManager.MotorcycleDiyModel.IsEquipFrameLockedByPlayer() && M === 2) {
        i.SetToggleState(0);
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorDIYWarning02");
      } else {
        if (this.ebl) {
          this.ebl.SetToggleState(0);
        }
        this.ebl = i;
        this.ebl.SetToggleState(1);
        this.UiViewSequence.StopSequenceByKey("Switch");
        this.UiViewSequence.PlaySequencePurely("Switch");
        r = {
          FrameId: e,
          StickerIds: ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedStickerIdList(),
          DecorationIds: ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedDecorationIdList()
        };
        MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.LoadMotorByParam(r);
        ModelManager_1.ModelManager.MotorcycleDiyModel.SetSelectFrame(e);
        if (M === 2) {
          ControllerHolder_1.ControllerHolder.MotorcycleDiyController.EquipMotorFrameRequest(e);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDiyOnSelectToggleClick, 1, 0, e);
        if (ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotHasNewItem(e)) {
          ModelManager_1.ModelManager.MotorcycleDiyModel.UpdateItemNewUnlocked(e, false);
          t.SetUIActive(false);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDiyInfoRedDotUpdate);
        i = this.GetItem(5);
        r = this.GetItem(9);
        t = this.GetItem(7);
        o = this.GetText(10);
        a = this.GetButton(8);
        s = this.GetText(11);
        l = this.GetText(4);
        n = this.GetText(6);
        i.SetUIActive(false);
        r.SetUIActive(false);
        t.SetUIActive(false);
        a.RootUIComp.SetUIActive(false);
        e = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorFrameConfig(e);
        LguiUtil_1.LguiUtil.SetLocalTextNew(n, e.SubTitle);
        LguiUtil_1.LguiUtil.SetLocalTextNew(l, e.Title);
        i.SetUIActive(M === 3);
        if (n = e.ItemAccess[0]) {
          l = ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(n);
          this.Uou = n;
          i = l.SkipName;
          a.RootUIComp.SetUIActive(i !== -1 && M === 3);
          t.SetUIActive(M === 3);
          r.SetUIActive(i === -1 && M === 3);
          LguiUtil_1.LguiUtil.SetLocalTextNew(o, l.Description);
          LguiUtil_1.LguiUtil.SetLocalTextNew(s, l.Description);
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
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIText]];
    this.BtnBindInfo = [[8, this.rmf]];
  }
  OnStart() {
    this.Syf = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(2).GetOwner(), this.Myf, true);
    this.GetButton(3).SetActive(false);
  }
  OnBeforeShow() {
    this.kfo(true);
    this.OnTabCameraClick?.(0);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorDiyInfoUpdate, this.jEg);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorDiyInfoUpdate, this.jEg);
  }
  RefreshItemScrollView() {
    if (this.Syf !== undefined) {
      this.kfo(true);
    }
  }
  $Eg() {
    var e = [];
    for (const r of ModelManager_1.ModelManager.MotorcycleDiyModel.GetCanUseFrameIdsInRegion()) {
      var i;
      var t = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorFrameConfig(r);
      if (t && ModelManager_1.ModelManager.MotorcycleDiyModel.GetFrameState(r) !== 0) {
        (i = new MotorcycleDiyDefine_1.MotorcycleDiyFrameItemData()).ItemId = r;
        i.QualityId = t.QualityId;
        i.SortIndex = t.SortIndex;
        t = r === ModelManager_1.ModelManager.MotorcycleDiyModel.GetDefaultFrameId();
        i.IsDefault = t;
        e.push(i);
      }
    }
    return e;
  }
  kfo(e) {
    if (e) {
      const i = this.$Eg();
      i.sort(this.HEg);
      this.Syf.RefreshByData(i, true, () => {
        this.xyf(i);
      });
      this.NEg = i;
    } else {
      this.Syf.RefreshByData(this.NEg, true);
    }
  }
  xyf(e) {
    let i = 0;
    let t = 0;
    var r = ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedFrameId();
    t = r !== 0 ? r : ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedFrameId();
    var r = e.findIndex(e => e.ItemId === t);
    if (r >= 0) {
      i = r;
    }
    if (!this.Syf.IsGridDisplaying(i)) {
      this.Syf.ScrollToGridIndex(i, false);
    }
    this.Syf.DeselectCurrentGridProxy();
    this.Syf.SelectGridProxy(i);
  }
}
exports.MotorcycleDiyFrameTabView = MotorcycleDiyFrameTabView;
//# sourceMappingURL=MotorcycleDiyFrameTabView.js.map
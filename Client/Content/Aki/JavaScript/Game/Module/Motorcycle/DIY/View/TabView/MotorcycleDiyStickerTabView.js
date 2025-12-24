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
const TabComponent_1 = require("../../../../Common/TabComponent/TabComponent");
const SkipTaskManager_1 = require("../../../../SkipInterface/SkipTaskManager");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../../Util/ScrollView/LoopScrollView");
const MotorcycleDiyStickerItem_1 = require("../../Item/MotorcycleDiyStickerItem");
const MotorcycleDiyDefine_1 = require("../../MotorcycleDiyDefine");
const MotorcycleDiyStickerTabItem_1 = require("../../TabItem/MotorcycleDiyStickerTabItem");
const MotorcycleUiModelUtil_1 = require("../../../Model/MotorcycleUiModelUtil");
const StringBuilder_1 = require("../../../../../../Core/Utils/StringBuilder");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
class MotorcycleDiyStickerTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.FCf = undefined;
    this.NCf = undefined;
    this.VCf = [];
    this.tOf = [];
    this.ebl = undefined;
    this.HCf = 0;
    this.Uou = 0;
    this.$Cf = (e, i) => {
      return new MotorcycleDiyStickerTabItem_1.MotorcycleDiyStickerTabItem();
    };
    this.pqe = e => {
      e = this.VCf[e];
      this.HCf = e.StickerPart;
      this.kfo(e.StickerPart, true);
    };
    this.WCf = () => {
      var e = new MotorcycleDiyStickerItem_1.MotorcycleDiyStickerItem();
      e.OnClickToggleBack = this.QCf;
      return e;
    };
    this.KCf = (e, i) => {
      var t = ModelManager_1.ModelManager.MotorcycleDiyModel.GetStickerState(e.StickerId);
      var r = ModelManager_1.ModelManager.MotorcycleDiyModel.GetStickerState(i.StickerId);
      if (t !== r) {
        return t - r;
      } else {
        t = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(e.StickerId);
        r = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(i.StickerId);
        if ((e = t ? t.QualityId : 0) !== (i = r ? r.QualityId : 0)) {
          return i - e;
        } else {
          i = t ? t.SortIndex : 0;
          return (r ? r.SortIndex : 0) - i;
        }
      }
    };
    this.XCf = () => {
      this.kfo(this.HCf, false);
    };
    this.QCf = (e, i, t) => {
      var r = ModelManager_1.ModelManager.MotorcycleDiyModel.GetStickerState(e);
      if (r === 4) {
        i.SetToggleState(0);
        var o;
        var n;
        var a = new StringBuilder_1.StringBuilder();
        var s = new StringBuilder_1.StringBuilder();
        var l = [1, 2, 3];
        var _ = [];
        var h = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(e);
        var M = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorComponentGroupConfig(h.GroupId);
        var h = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(h.Title);
        a.Append("\"");
        a.Append(h ?? "");
        a.Append("\"");
        _.push(M.Id);
        for (const u of l) {
          if (u !== this.HCf && (n = ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedStickerId(u) ?? 0) !== 0 && (o = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(n), n = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorComponentGroupConfig(o.GroupId)) && !_.includes(n.Id)) {
            n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o.Title);
            s.Append("\"");
            s.Append(n ?? "");
            s.Append("\"");
          }
        }
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorDIYWarning01", a.ToString(), s.ToString());
      } else {
        if (this.ebl) {
          this.ebl.SetToggleState(0);
        }
        this.ebl = i;
        this.ebl.SetToggleState(1);
        this.UiViewSequence.StopSequenceByKey("Switch");
        this.UiViewSequence.PlaySequencePurely("Switch");
        if (e === 0) {
          MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.SetEmptySticker(this.HCf);
        } else {
          MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.ChangeMaterialByStickerId(e);
        }
        var c;
        var h = ModelManager_1.ModelManager.MotorcycleDiyModel.IsEquipDefaultSticker(this.HCf);
        var M = e === 0 && !h;
        ModelManager_1.ModelManager.MotorcycleDiyModel.SetSelectStickerInfo(this.HCf, e);
        if (r === 2 || !!M) {
          l = ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedStickerIdList(true);
          ControllerHolder_1.ControllerHolder.MotorcycleDiyController.EquipMotorStickerRequest(l);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDiyOnSelectToggleClick, this.HCf, e);
        var a = ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotHasNewItem(e);
        if (a) {
          ModelManager_1.ModelManager.MotorcycleDiyModel.UpdateItemNewUnlocked(e, false);
          t.SetUIActive(false);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDiyInfoRedDotUpdate);
        }
        var i = this.GetItem(7);
        var h = this.GetItem(10);
        var M = this.GetItem(12);
        var l = this.GetText(11);
        var a = this.GetButton(9);
        var t = this.GetText(13);
        var g = this.GetText(6);
        var y = this.GetText(8);
        i.SetUIActive(false);
        h.SetUIActive(false);
        M.SetUIActive(false);
        a.RootUIComp.SetUIActive(false);
        if (e <= 0) {
          i = CommonParamById_1.configCommonParamById.GetStringConfig("MotorEmptyStickerName");
          c = CommonParamById_1.configCommonParamById.GetStringConfig("MotorEmptyStickerType");
          y.SetUIActive(true);
          LguiUtil_1.LguiUtil.SetLocalTextNew(y, c);
          LguiUtil_1.LguiUtil.SetLocalTextNew(g, i);
        } else {
          c = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(e);
          LguiUtil_1.LguiUtil.SetLocalTextNew(y, c.SubTitle);
          LguiUtil_1.LguiUtil.SetLocalTextNew(g, c.Title);
          this.GetItem(7).SetUIActive(r === 3);
          if (i = c.ItemAccess[0]) {
            e = ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(i);
            this.Uou = i;
            y = e.SkipName;
            a.RootUIComp.SetUIActive(y !== -1 && r === 3);
            M.SetUIActive(r === 3);
            h.SetUIActive(y === -1 && r === 3);
            LguiUtil_1.LguiUtil.SetLocalTextNew(l, e.Description);
            LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.Description);
          }
        }
      }
    };
    this.scf = () => {
      if (!(this.Uou <= 0)) {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Uou);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIButtonComponent], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIText]];
    this.BtnBindInfo = [[9, this.scf]];
  }
  async OnBeforeStartAsync() {
    this.FCf = new TabComponent_1.TabComponent(this.GetHorizontalLayout(0).RootUIComp, this.$Cf, this.pqe, undefined);
    this.NCf = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), this.GetItem(4).GetOwner(), this.WCf, true);
    [1, 2, 3].forEach((e, i) => {
      var t = new MotorcycleDiyStickerTabItem_1.MotorcycleDiyStickerTabItemData();
      t.StickerPart = e;
      this.VCf.push(t);
    });
    await this.FCf.RefreshTabItemAsync(this.VCf);
    var e;
    var i;
    var t = this.FCf.GetTabItemMap();
    for ([e, i] of t) {
      i.BindRedDot("MotorcycleDiyStickerPartTab", this.VCf[e].StickerPart);
    }
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.MotorcycleDiyModel.GetJumpStickerIndex();
    this.FCf.SelectToggleByIndex(e, true);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorDiyInfoUpdate, this.XCf);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorDiyInfoUpdate, this.XCf);
  }
  RefreshPartScrollView() {
    this.kfo(this.HCf, true);
  }
  YCf(e) {
    var i = ModelManager_1.ModelManager.MotorcycleDiyModel;
    var t = [];
    t.push(new MotorcycleDiyDefine_1.MotorcycleDiyStickerItemData(e, 0));
    var r = i.GetEquippedStickerId(e);
    if (r) {
      t.push(new MotorcycleDiyDefine_1.MotorcycleDiyStickerItemData(e, r));
    }
    for (const n of i.CurCanUseStickerIds) {
      var o = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(n);
      if (o && o.PartId === e && (o = i.GetStickerState(n)) !== 0 && o !== 1) {
        t.push(new MotorcycleDiyDefine_1.MotorcycleDiyStickerItemData(e, n));
      }
    }
    return t;
  }
  kfo(e, i) {
    if (i) {
      const t = this.YCf(e);
      t.sort(this.KCf);
      this.NCf.RefreshByData(t, true, () => {
        this.zCf(e, t);
      });
      this.tOf = t;
    } else {
      this.NCf.RefreshByData(this.tOf, true);
    }
  }
  zCf(e, i) {
    let t = 0;
    let r = 0;
    var o = ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedStickerId(e);
    r = o !== undefined ? o : ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedStickerId(e);
    var o = i.find(e => e.StickerId === r);
    if (o) {
      t = i.indexOf(o);
    }
    if (!this.NCf.IsGridDisplaying(t)) {
      this.NCf.ScrollToGridIndex(t, false);
    }
    this.NCf.DeselectCurrentGridProxy();
    this.NCf.SelectGridProxy(t);
  }
}
exports.MotorcycleDiyStickerTabView = MotorcycleDiyStickerTabView;
//# sourceMappingURL=MotorcycleDiyStickerTabView.js.map
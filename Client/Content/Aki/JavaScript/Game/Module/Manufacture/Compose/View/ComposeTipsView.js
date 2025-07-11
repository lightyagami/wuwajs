"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmButtonCompose = exports.ComposeTipsView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CommonItemView_1 = require("../../Common/CommonItemView");
const ComposeController_1 = require("../ComposeController");
class ComposeTipsView extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.fGt = undefined;
    this.iOt = undefined;
    this.oOt = undefined;
    this.XTi = undefined;
    this.nOt = (e, i, t) => {
      i = new CommonItemView_1.MaterialItem(i);
      i.Update(e);
      i.BindOnClickedCallback(this.jYe);
      return {
        Key: t,
        Value: i
      };
    };
    this.jYe = e => {
      if (e.K6n) {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e.L8n);
      }
    };
    this.sOt = () => {
      switch (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType) {
        case 1:
          var e = this.fGt;
          if (e.SubType === 35) {
            i = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByFormulaItemId(e.ConfigId);
            ComposeController_1.ComposeController.SendSynthesisFormulaUnlockRequest(i.Id);
          } else {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenCompose, e.ConfigId);
          }
          break;
        case 2:
          var i = this.fGt;
          if (i.SubType === 37) {
            e = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByFormulaItemId(i.ConfigId);
            ComposeController_1.ComposeController.SendSynthesisFormulaUnlockRequest(e.Id);
          } else {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenCompose, i.ConfigId);
          }
          break;
        case 3:
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenCompose, this.fGt.ConfigId);
      }
    };
    this.iNt = () => {
      if (this.XTi) {
        this.XTi();
      }
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [6, UE.UIItem], [8, UE.UIItem], [12, UE.UIText], [14, UE.UIText], [15, UE.UIText], [16, UE.UIText], [17, UE.UIItem], [18, UE.UIHorizontalLayout], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIVerticalLayout], [22, UE.UIText], [23, UE.UIButtonComponent]];
    this.BtnBindInfo = [[23, this.iNt]];
  }
  OnStart() {
    this.iOt = new ConfirmButtonCompose(this.GetItem(8));
    this.iOt.BindClickFunction(this.sOt);
    this.oOt = new GenericLayoutNew_1.GenericLayoutNew(this.GetHorizontalLayout(18), this.nOt);
  }
  OnBeforeDestroy() {
    if (this.oOt) {
      this.oOt.ClearChildren();
      this.oOt = undefined;
    }
    this.XTi = undefined;
  }
  RefreshTips(e) {
    switch ((this.fGt = e).MainType) {
      case 1:
        this.$Ti();
        break;
      case 2:
        this.RefreshStructureData();
        break;
      case 3:
        this.RefreshPurificationData();
    }
  }
  $Ti() {
    var e = this.fGt;
    switch (e.SubType) {
      case 35:
        this.YTi();
        this.JTi(e);
        break;
      case 0:
        this.zTi();
        this.LTi(e);
    }
  }
  JTi(e) {
    var i = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByFormulaItemId(e.ConfigId);
    this.dOt(1);
    var t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Formula");
    this.COt(t);
    var t = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(i.Name);
    this.gOt(t);
    var t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.ConfigId);
    this.fOt(t.Icon);
    var e = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(i.ComposeContent);
    this.pOt(e);
    var t = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(i.ComposeBackground);
    this.vOt(t);
    this.MOt(true);
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Study");
    this.M3e(e, true);
  }
  LTi(e) {
    var i = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(e.ConfigId);
    var t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(i.ItemId);
    this.dOt(t);
    var t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Medicament");
    this.COt(t);
    var t = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(i.Name);
    this.gOt(t);
    var t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.ItemId);
    this.fOt(t.Icon);
    var s = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(t.AttributesDescription);
    this.pOt(s);
    var s = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(t.BgDescription);
    this.vOt(s);
    var t = i.Proficiency;
    var s = i.MaxProficiencyCount;
    this.EOt(e.ComposeCount, t, s);
    var i = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Making");
    var t = ComposeController_1.ComposeController.CheckCanReagentProduction(e.ConfigId);
    this.M3e(i, t);
    this.MOt(t);
    this.SOt(e.ConfigId);
  }
  YTi() {
    this.GetText(3).SetUIActive(true);
    this.GetText(12).SetUIActive(true);
    this.GetItem(17).SetUIActive(false);
    this.GetItem(19).SetUIActive(true);
    this.GetItem(20).SetUIActive(false);
    this.GetText(2).SetUIActive(false);
    this.GetText(16).SetUIActive(false);
  }
  zTi() {
    this.GetText(3).SetUIActive(true);
    this.GetText(12).SetUIActive(true);
    this.GetItem(17).SetUIActive(true);
    this.GetItem(19).SetUIActive(true);
    this.GetItem(20).SetUIActive(false);
    this.GetText(2).SetUIActive(true);
    this.GetText(16).SetUIActive(true);
  }
  RefreshStructureData() {
    var e = this.fGt;
    switch (e.SubType) {
      case 37:
        this.ZTi();
        this.RefreshStructureMenu(e);
        break;
      case 0:
        this.eLi();
        this.RefreshStructure(e);
    }
  }
  RefreshStructure(e) {
    var i = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(e.ConfigId);
    var t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(i.ItemId);
    this.dOt(t);
    var t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Prop");
    this.COt(t);
    var t = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(i.Name);
    this.gOt(t);
    var t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.ItemId);
    this.fOt(t.Icon);
    var i = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(t.AttributesDescription);
    this.pOt(i);
    var i = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(t.BgDescription);
    this.vOt(i);
    var t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Making");
    var i = ComposeController_1.ComposeController.CheckCanStructure(e.ConfigId);
    this.M3e(t, i);
    this.MOt(i);
    this.SOt(e.ConfigId);
  }
  RefreshStructureMenu(e) {
    var i = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByFormulaItemId(e.ConfigId);
    this.dOt(1);
    var t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Formula");
    this.COt(t);
    var t = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(i.Name);
    this.gOt(t);
    var t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.ConfigId);
    this.fOt(t.Icon);
    var e = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(i.ComposeContent);
    this.pOt(e);
    var t = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(i.ComposeBackground);
    this.vOt(t);
    this.MOt(true);
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Study");
    this.M3e(e, true);
  }
  eLi() {
    this.GetText(3).SetUIActive(true);
    this.GetText(12).SetUIActive(true);
    this.GetItem(17).SetUIActive(true);
    this.GetItem(19).SetUIActive(true);
    this.GetItem(20).SetUIActive(false);
    this.GetText(2).SetUIActive(false);
    this.GetText(16).SetUIActive(false);
  }
  ZTi() {
    this.GetText(3).SetUIActive(true);
    this.GetText(12).SetUIActive(true);
    this.GetItem(17).SetUIActive(false);
    this.GetItem(19).SetUIActive(true);
    this.GetItem(20).SetUIActive(false);
    this.GetText(2).SetUIActive(false);
    this.GetText(16).SetUIActive(false);
  }
  RefreshPurificationData() {
    var e = this.fGt;
    this.SetPurificationHide();
    this.RefreshPurification(e);
  }
  RefreshPurification(e) {
    var i = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(e.ConfigId);
    var t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(i.ItemId);
    this.dOt(t);
    var t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Material");
    this.COt(t);
    var t = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(i.Name);
    this.gOt(t);
    var t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.ItemId);
    this.fOt(t.Icon);
    var s = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(t.AttributesDescription);
    this.pOt(s);
    var s = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(t.BgDescription);
    this.vOt(s);
    let r = "";
    let a = false;
    if (e.IsUnlock === 1) {
      r = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Making");
      a = ComposeController_1.ComposeController.CheckCanPurification(e.ConfigId);
      this.MOt(a);
    } else {
      t = ConfigManager_1.ConfigManager.ComposeConfig.GetConditionInfo(i.UnlockCondition);
      r = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(t.HintText);
      a = false;
      this.MOt(true);
    }
    this.M3e(r, a);
    this.SOt(e.ConfigId);
  }
  SetPurificationHide() {
    this.GetText(3).SetUIActive(true);
    this.GetText(12).SetUIActive(true);
    this.GetItem(17).SetUIActive(true);
    this.GetItem(19).SetUIActive(true);
    this.GetItem(20).SetUIActive(false);
    this.GetText(2).SetUIActive(false);
    this.GetText(16).SetUIActive(false);
  }
  gOt(e) {
    this.GetText(0).SetText(e);
  }
  fOt(e) {
    this.SetTextureByPath(e, this.GetTexture(1));
  }
  pOt(e) {
    this.GetText(3).SetText(e);
  }
  vOt(e) {
    this.GetText(12).SetText(e);
  }
  COt(e) {
    this.GetText(15).SetText(e);
  }
  dOt(e) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(14), "Have", e);
  }
  EOt(e, i, t) {
    t *= i;
    e *= i;
    if (e != t) {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "AddProficiency", "+" + i);
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "Proficiency");
    }
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(16), "CumulativeProficiency", e, t);
  }
  M3e(e, i) {
    this.iOt.UpdateText(e);
    this.iOt.RefreshButton(i);
  }
  MOt(e) {
    this.GetButton(23).GetOwner().GetUIItem().SetUIActive(!e);
  }
  SOt(e) {
    this.oOt.RebuildLayoutByDataNew(ModelManager_1.ModelManager.ComposeModel.GetComposeMaterialList(e));
  }
  BindOnDisable(e) {
    this.XTi = e;
  }
}
exports.ComposeTipsView = ComposeTipsView;
class ConfirmButtonCompose extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.GGt = undefined;
    this.eTt = () => {
      this.GGt();
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  UpdateText(e) {
    this.GetText(1).SetText(e);
  }
  RefreshButton(e) {
    this.GetButton(0).GetOwner().GetComponentByClass(UE.UIInteractionGroup.StaticClass()).SetInteractable(e);
  }
  BindClickFunction(e) {
    this.GGt = e;
  }
}
exports.ConfirmButtonCompose = ConfirmButtonCompose;
//# sourceMappingURL=ComposeTipsView.js.map
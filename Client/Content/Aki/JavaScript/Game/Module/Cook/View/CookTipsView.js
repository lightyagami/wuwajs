"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookTipsView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Util/LguiUtil");
const CookController_1 = require("../CookController");
const CookItemView_1 = require("./CookItemView");
class CookTipsView extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.fGt = undefined;
    this.iOt = undefined;
    this.oOt = undefined;
    this.rOt = undefined;
    this.nOt = (e, i, t) => {
      i = new CookItemView_1.MaterialItem(i);
      i.Update(e, t);
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
    this.pGt = (e, i, t) => {
      i = new CookItemView_1.MachiningClueItem(i);
      i.Update(e.IsUnlock, e.ContentText);
      return {
        Key: t,
        Value: i
      };
    };
    this.sOt = () => {
      if (ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0) {
        var e = this.fGt;
        switch (e.SubType) {
          case 60000:
            var i = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaByFormulaItemId(e.ItemId);
            CookController_1.CookController.SendCookFormulaRequest(i.Id);
            break;
          case 0:
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenCook, e.ItemId);
        }
      } else {
        var t = this.fGt;
        if (t.IsUnLock) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenCook, t.ItemId);
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenProcessedStudy, t.ItemId);
        }
      }
    };
    this.aOt = () => {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("MaterialShort");
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [6, UE.UIItem], [8, UE.UIItem], [12, UE.UIText], [14, UE.UIText], [15, UE.UIText], [16, UE.UIText], [17, UE.UIItem], [18, UE.UIHorizontalLayout], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIVerticalLayout], [22, UE.UIText], [23, UE.UIButtonComponent]];
    this.BtnBindInfo = [[23, this.aOt]];
  }
  OnBeforeDestroy() {
    this.oOt.ClearChildren();
    this.oOt = undefined;
    this.rOt.ClearChildren();
    this.rOt = undefined;
  }
  OnStart() {
    this.iOt = new CookItemView_1.ConfirmButtonCompose(this.GetItem(8));
    this.iOt.BindClickFunction(this.sOt);
    this.oOt = new GenericLayoutNew_1.GenericLayoutNew(this.GetHorizontalLayout(18), this.nOt);
    this.rOt = new GenericLayoutNew_1.GenericLayoutNew(this.GetVerticalLayout(21), this.pGt);
  }
  RefreshTips(e) {
    switch ((this.fGt = e).MainType) {
      case 0:
        this.hOt();
        break;
      case 1:
        this.lOt();
    }
  }
  hOt() {
    var e = this.fGt;
    switch (e.SubType) {
      case 60000:
        this._Ot();
        this.uOt(e);
        break;
      case 0:
        this.cOt();
        this.mOt(e);
    }
  }
  uOt(e) {
    var i = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaByFormulaItemId(e.ItemId);
    this.dOt(1);
    var t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Recipe");
    this.COt(t);
    var t = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(i.Name);
    this.gOt(t);
    var t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.ItemId);
    this.fOt(t.Icon);
    var e = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(i.FoodContent);
    this.pOt(e);
    var t = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(i.FoodBackground);
    this.vOt(t);
    this.MOt(true);
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Study");
    this.M3e(e, true);
  }
  mOt(e) {
    var i = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(e.ItemId);
    var t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(i.FoodItemId);
    this.dOt(t);
    var t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Dishes");
    this.COt(t);
    var t = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(i.Name);
    this.gOt(t);
    var t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.FoodItemId);
    this.fOt(t.Icon);
    var s = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(t.AttributesDescription);
    this.pOt(s);
    var s = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(t.BgDescription);
    this.vOt(s);
    var t = i.Proficiency;
    var s = i.MaxProficiencyCount;
    this.EOt(e.CookCount, t, s);
    var i = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Cooking");
    var t = CookController_1.CookController.CheckCanCook(e.ItemId);
    this.M3e(i, t);
    this.MOt(t);
    this.SOt(e.ItemId, 0);
  }
  _Ot() {
    this.GetText(3).SetUIActive(true);
    this.GetText(12).SetUIActive(true);
    this.GetItem(17).SetUIActive(false);
    this.GetItem(19).SetUIActive(true);
    this.GetItem(20).SetUIActive(false);
    this.GetText(2).SetUIActive(false);
    this.GetText(16).SetUIActive(false);
  }
  cOt() {
    this.GetText(3).SetUIActive(true);
    this.GetText(12).SetUIActive(true);
    this.GetItem(17).SetUIActive(true);
    this.GetItem(19).SetUIActive(true);
    this.GetItem(20).SetUIActive(false);
    this.GetText(2).SetUIActive(true);
    this.GetText(16).SetUIActive(true);
  }
  lOt() {
    this.yOt();
    var e = this.fGt;
    var i = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(e.ItemId);
    var t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(i.FinalItemId);
    this.dOt(t);
    var t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Accessory");
    this.COt(t);
    var t = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(i.Name);
    this.gOt(t);
    var t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.FinalItemId);
    this.fOt(t.Icon);
    this.IOt();
    var i = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(t.BgDescription);
    this.TOt(i);
    let s = undefined;
    let r = true;
    if (e.IsUnLock) {
      s = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Cooking");
      r = CookController_1.CookController.CheckCanProcessed(e.ItemId);
    } else {
      s = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Research");
    }
    this.M3e(s, r);
    this.MOt(r);
    this.SOt(e.ItemId, 1);
  }
  yOt() {
    this.GetText(3).SetUIActive(false);
    this.GetText(12).SetUIActive(false);
    this.GetItem(19).SetUIActive(false);
    this.GetItem(20).SetUIActive(true);
    this.GetItem(17).SetUIActive(true);
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
  TOt(e) {
    this.GetText(22).SetText(e);
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
  SOt(e, i) {
    e = ModelManager_1.ModelManager.CookModel.GetCookMaterialList(e, i);
    this.oOt.RebuildLayoutByDataNew(e);
  }
  IOt() {
    var e = this.fGt;
    var i = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(e.ItemId);
    var t = new Array();
    for (const n of i.InterationId) {
      var s;
      var r = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessMsgById(n);
      if (e.InteractiveList.includes(n)) {
        s = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(r.Introduce);
        t.push({
          IsUnlock: true,
          ContentText: s
        });
      } else {
        s = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(r.Description);
        t.push({
          IsUnlock: false,
          ContentText: s
        });
      }
    }
    this.rOt.RebuildLayoutByDataNew(t);
  }
}
exports.CookTipsView = CookTipsView;
//# sourceMappingURL=CookTipsView.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksMenuPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiLayer_1 = require("../../../../../Ui/UiLayer");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const DrinksMenuFlavorItem_1 = require("./DrinksMenuFlavorItem");
const DrinksMenuOrnamentItem_1 = require("./DrinksMenuOrnamentItem");
class DrinksMenuPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.FlavorScroll = undefined;
    this.CurrentSelectedDrinks = 0;
    this.OrnamentScroll = undefined;
    this.CurrentSelectedBatching = new Set();
    this.CurrentSelectedOrnament = 0;
    this.OrnamentList = [];
    this.DrinksList = [];
    this.BatchingList = [];
    this.BatchingKey = "";
    this.MXf = () => {
      var e = new DrinksMenuFlavorItem_1.DrinksMenuFlavorItem();
      e.IsSelectOnCb = this.fDf;
      e.IsEnableCb = this.JLg;
      e.OnToggleStateChangeFunction = this.Yai;
      return e;
    };
    this.EXf = () => {
      var e = new DrinksMenuOrnamentItem_1.DrinksMenuOrnamentItem();
      e.IsSelectOnCb = this.fDf;
      e.OnToggleStateChangeFunction = this.IXf;
      return e;
    };
    this.fDf = e => {
      var i = ModelManager_1.ModelManager.DrinksModel.GetCurStep();
      if (i === 0 || i === 1) {
        return this.CurrentSelectedDrinks === e;
      } else if (i === 4) {
        return this.CurrentSelectedOrnament === e;
      } else {
        return this.CurrentSelectedBatching.has(e);
      }
    };
    this.JLg = e => {
      return ModelManager_1.ModelManager.DrinksModel.GetCurStep() !== 2 || this.CurrentSelectedBatching.size < 2 || this.CurrentSelectedBatching.has(e);
    };
    this.Yai = (e, i, t, s) => {
      var r = ModelManager_1.ModelManager.DrinksModel.GetCurStep();
      if (r === 0 || r === 1) {
        this.CurrentSelectedDrinks = s ? t : 0;
        this.GetButton(7)?.SetSelfInteractive(this.CurrentSelectedDrinks !== 0);
        ModelManager_1.ModelManager.DrinksModel.UpdateDrinkBase(this.CurrentSelectedDrinks);
        this.FlavorScroll.RefreshByData(this.DrinksList);
      } else if (s && this.CurrentSelectedBatching.size >= 2) {
        e.SetToggleState(0, false);
        i.RootUIComp.SetUIActive(false);
      } else {
        if (s) {
          if (this.CurrentSelectedBatching.size >= 2) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Drinks", 77, "CurrentSelectedBatching Size Error");
            }
            return;
          }
          this.CurrentSelectedBatching.add(t);
        } else {
          if (!this.CurrentSelectedBatching.has(t)) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Drinks", 77, "CurrentSelectedBatching includes Error", ["id", t]);
            }
            return;
          }
          this.CurrentSelectedBatching.delete(t);
        }
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), this.BatchingKey, this.CurrentSelectedBatching.size);
        this.FlavorScroll.RefreshByData(this.BatchingList);
        ModelManager_1.ModelManager.DrinksModel.UpdateBatching(this.CurrentSelectedBatching);
      }
    };
    this.IXf = e => {
      this.CurrentSelectedOrnament = e;
      this.OrnamentScroll?.RefreshByData(this.OrnamentList);
      ModelManager_1.ModelManager.DrinksModel.UpdateOrnament(this.CurrentSelectedOrnament);
    };
    this.iGu = () => {
      var e = ModelManager_1.ModelManager.DrinksModel?.GetCurStep();
      if (e === 4) {
        ModelManager_1.ModelManager.DrinksModel.UpdateOrnament(this.CurrentSelectedOrnament, true);
      } else if (e === 2) {
        if (this.CurrentSelectedBatching.size > 2) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Drinks", 77, "Batching Select Size Error", ["set", this.CurrentSelectedBatching]);
          }
        } else {
          if (this.CurrentSelectedBatching.size > 0) {
            UiLayer_1.UiLayer.SetShowMaskLayer("DrinksGameplayView", true);
          }
          ModelManager_1.ModelManager.DrinksModel.UpdateBatching(this.CurrentSelectedBatching, true);
        }
      } else if (this.CurrentSelectedDrinks !== 0) {
        ModelManager_1.ModelManager.DrinksModel.UpdateDrinkBase(this.CurrentSelectedDrinks, true);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIVerticalLayout], [3, UE.UIItem], [4, UE.UIScrollViewWithScrollbarComponent], [5, UE.UIGridLayout], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIText]];
    this.BtnBindInfo = [[7, this.iGu]];
  }
  OnStart() {
    this.FlavorScroll = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.MXf);
    this.OrnamentScroll = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(4), this.EXf);
    this.OrnamentList.length = 0;
    for (const e of ConfigManager_1.ConfigManager.DrinksConfig.GetAllOrnament()) {
      this.OrnamentList.push(e.Id);
    }
    this.OrnamentList.sort((e, i) => e - i);
    this.OrnamentScroll.RefreshByData(this.OrnamentList);
  }
  SetRaycastOnStepEnd() {
    this.GetButton(7)?.RootUIComp.SetRaycastTarget(false);
  }
  UpdateOnStepStart() {
    this.GetButton(7)?.RootUIComp.SetRaycastTarget(true);
    var e = ModelManager_1.ModelManager.DrinksModel.GetCurStep();
    this.GetScrollViewWithScrollbar(1)?.RootUIComp.SetUIActive(e !== 4);
    this.GetScrollViewWithScrollbar(4)?.RootUIComp.SetUIActive(e === 4);
    var i = ConfigManager_1.ConfigManager.DrinksConfig.GetStepConfig(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), i.MenuButtonTxt);
    if (e === 4) {
      this.CurrentSelectedOrnament = 0;
      this.OrnamentScroll?.RefreshByData(this.OrnamentList, () => {
        this.OrnamentScroll?.ScrollToTop(0);
      }, true);
    } else {
      if (e === 2) {
        var t = ModelManager_1.ModelManager.DrinksModel.GetCurrentPlayData();
        this.CurrentSelectedBatching.clear();
        if (t.Batching) {
          for (const s of t.Batching) {
            this.CurrentSelectedBatching.add(s);
          }
        }
      } else {
        t = ModelManager_1.ModelManager.DrinksModel.GetCurrentPlayData();
        this.CurrentSelectedDrinks = e === 0 ? t.DrinkBase[0] : t.DrinkBase[1];
      }
      this.RefreshFlavor(e);
    }
    if (e === 2) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.MenuTitle, this.CurrentSelectedBatching.size);
      this.BatchingKey = i.MenuTitle;
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.MenuTitle);
    }
    t = e === 4 || e === 2;
    i = !t && this.CurrentSelectedDrinks !== 0;
    this.GetButton(7)?.SetSelfInteractive(t || i);
    if (e === 2) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuideTriggerEvent, "MakeDrinkBatchingShow");
    }
    if (e === 4) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuideTriggerEvent, "MakeDrinkClickOrnament");
    }
  }
  RefreshFlavor(e) {
    if (e === 2) {
      if (this.BatchingList.length === 0) {
        for (const i of ConfigManager_1.ConfigManager.DrinksConfig.GetAllBatching()) {
          this.BatchingList.push(i.Id);
        }
      }
      this.FlavorScroll.RefreshByData(this.BatchingList, () => {
        if (this.CurrentSelectedBatching.size > 0) {
          var e = Array.from(this.CurrentSelectedBatching)[0];
          for (const i of this.FlavorScroll.GetScrollItemList()) {
            if (i.Id === e) {
              this.FlavorScroll?.ScrollTo(i.GetRootItem());
              break;
            }
          }
        } else {
          this.FlavorScroll?.ScrollToTop(0);
        }
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty();
      }, true);
    } else {
      e = ConfigManager_1.ConfigManager.DrinksConfig.GetAllDrinkBase();
      if (this.DrinksList.length === 0) {
        for (const t of e) {
          if (t.QTENum === 1) {
            this.DrinksList.push(t.Id);
          }
        }
      }
      this.FlavorScroll.RefreshByData(this.DrinksList, () => {
        if (this.CurrentSelectedDrinks !== 0) {
          for (const e of this.FlavorScroll.GetScrollItemList()) {
            if (e.Id === this.CurrentSelectedDrinks) {
              this.FlavorScroll?.ScrollTo(e.GetRootItem());
              break;
            }
          }
        } else {
          this.FlavorScroll?.ScrollToTop(0);
        }
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty();
      }, true);
    }
  }
  GuideGetOrnamentItem(e) {
    e = this.OrnamentList.indexOf(e);
    e = this.OrnamentScroll?.GetItemByIndex(e);
    if (e) {
      this.OrnamentScroll?.LateScrollTo(e);
      return e;
    }
  }
}
exports.DrinksMenuPanel = DrinksMenuPanel;
//# sourceMappingURL=DrinksMenuPanel.js.map
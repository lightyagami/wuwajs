"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleMapFetterTabItem = exports.RogueBattleMapFetterTabChildItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleMapFetterTabChildItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.vE1 = 0;
    this.CanExecuteChangeFunction = undefined;
    this.CanExecuteChange = () => !this.CanExecuteChangeFunction || this.CanExecuteChangeFunction(this.vE1, this.GetExtendToggle(0).GetToggleState());
    this.kqe = () => {
      ModelManager_1.ModelManager.RogueBattleModel.CurrentMapSummaryBond = this.vE1;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueResMapSummaryBondUpdate, this.vE1);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.CanExecuteChange);
  }
  SetSelected(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t);
  }
  Refresh(t, e, i) {
    this.vE1 = t;
    this.SetSelected(t === ModelManager_1.ModelManager.RogueBattleModel.CurrentMapSummaryBond);
    var s = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(t);
    var t = ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(t);
    var r = ConfigManager_1.ConfigManager.RogueBattleConfig.GetBondLvConfigByLv(t.F6n);
    var r = UE.Color.FromHex(r.LvColor);
    var h = this.GetText(1);
    var n = this.GetText(2);
    h.SetColor(r);
    LguiUtil_1.LguiUtil.SetLocalTextNew(h, s.Name);
    if (t && t.F6n > 0) {
      n.SetColor(r);
      LguiUtil_1.LguiUtil.SetLocalTextNew(n, "RogueResSynergyLV", t.F6n);
      this.GetText(2).SetUIActive(true);
    } else {
      this.GetText(2).SetUIActive(false);
    }
  }
}
exports.RogueBattleMapFetterTabChildItem = RogueBattleMapFetterTabChildItem;
class RogueBattleMapFetterTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.yE1 = undefined;
    this.eGe = undefined;
    this.Uy1 = undefined;
    this.kqe = () => {
      this.yE1.IsSelected = !this.yE1.IsSelected;
      this.eGe?.SetActive(this.yE1.IsSelected);
    };
    this.sGe = () => {
      var t = new RogueBattleMapFetterTabChildItem();
      t.CanExecuteChangeFunction = this.CanExecuteChangeFunction;
      return t;
    };
    this.Dy1 = t => {
      var e = this.Uy1;
      this.Uy1 = this.yE1.Config.includes(t) ? t : undefined;
      if (e !== undefined) {
        this.eGe.GetLayoutItemByIndex(this.yE1.Config.indexOf(e))?.SetSelected(false);
      }
      if (this.Uy1) {
        this.eGe.SelectGridProxy(this.yE1.Config.indexOf(t));
        this.eGe.GetSelectedProxy()?.SetSelected(true);
      }
    };
    this.CanExecuteChangeFunction = (t, e) => e !== 1 || this.Uy1 !== t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIVerticalLayout], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.sGe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResMapSummaryBondUpdate, this.Dy1);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResMapSummaryBondUpdate, this.Dy1);
  }
  Refresh(t, e, i) {
    this.yE1 = t;
    this.eGe.RefreshByData(t.Config, () => {
      this.eGe.BindLateUpdate(() => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueResMapSummaryFettersSubTabUpdate);
        this.eGe.UnBindLateUpdate();
      });
    });
    this.eGe?.SetActive(t.IsSelected);
    this.cu1(t.IsSelected);
    t = t.Config[0];
    t = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(t);
    t = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondTypeById(t.Rarity);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.SynergyTypeName);
  }
  cu1(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t);
  }
}
exports.RogueBattleMapFetterTabItem = RogueBattleMapFetterTabItem;
//# sourceMappingURL=RogueBattleMapFetterTabItem.js.map
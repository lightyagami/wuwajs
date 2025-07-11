"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingGridBig = exports.SettingGridSmall = exports.SettingGridLayout = exports.SettingGridBase = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const InventoryDefine_1 = require("../InventoryDefine");
class SettingGridBase extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.CallbackOnClicked = undefined;
  }
  Refresh(t, i, e) {}
  GetKey(t, i) {
    return this.GridIndex;
  }
}
exports.SettingGridBase = SettingGridBase;
class SettingGridLayout extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super();
    this.pDt = 0;
    this.fqu = undefined;
    this.Tei = undefined;
    this.CallbackOnClicked = undefined;
    this.Oho = () => {
      let t = new SettingGridSmall();
      (t = this.fqu !== 1 ? new SettingGridBig() : t).CallbackOnClicked = this.CallbackOnClicked;
      return t;
    };
    this.pDt = t;
    this.fqu = i;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIGridLayout], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.Tei = new GenericLayout_1.GenericLayout(this.GetGridLayout(0), this.Oho);
    return Promise.resolve();
  }
  async RefreshAsync(t) {
    await this.Tei.RefreshByDataAsync(t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Inventory", 75, "" + this.pDt);
    }
  }
}
exports.SettingGridLayout = SettingGridLayout;
class SettingGridSmall extends SettingGridBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.dwu = () => this.Pe !== undefined && this.Pe.IsEditing;
    this.gqu = t => {
      if (this.CallbackOnClicked) {
        this.CallbackOnClicked(this.Pe, t === 1);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIExtendToggle]];
    this.BtnBindInfo = [[1, this.gqu]];
  }
  OnStart() {
    this.GetExtendToggle(1).CanExecuteChange.Bind(this.dwu);
  }
  Refresh(t, i, e) {
    this.Pe = t;
    if (this.Cqu()) {
      this.SetUiActive(true);
      if (t.IsEmpty) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), InventoryDefine_1.EMPTY_RULE_TEXT_ID);
        this.GetExtendToggle(1).SetToggleStateForce(2);
      } else {
        this.pqu();
      }
    } else {
      this.SetUiActive(false);
    }
  }
  Cqu() {
    var t = this.Pe;
    if (t.IsFirst) {
      return t.IsEmpty && !t.IsEditing;
    } else {
      return !!t.IsEditing || !!t.IsSelect;
    }
  }
  pqu() {
    var t = this.Pe;
    var i = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(t.RuleId).FilterType;
    var i = ModelManager_1.ModelManager.FilterModel.GetFilterDataFuncByFilterType(i)([t.Value])[0];
    var e = t.IsSelect ? 1 : 0;
    this.GetExtendToggle(1).SetToggleStateForce(t.IsEditing ? e : 2);
    this.GetText(0).SetText(i.Content ?? "");
  }
}
exports.SettingGridSmall = SettingGridSmall;
class SettingGridBig extends SettingGridBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.gqu = t => {
      if (this.CallbackOnClicked && this.Pe) {
        this.CallbackOnClicked(this.Pe, this.Pe.IsAdd);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.gqu]];
  }
  Refresh(t, i, e) {
    this.Pe = t;
    if (this.Cqu()) {
      this.SetUiActive(true);
      if (t.IsEmpty) {
        this.U$l();
      } else {
        this.GetButton(4).SetSelfInteractive(t.IsEditing);
        if (t.IsAdd) {
          this.vqu();
        } else {
          this.pqu();
        }
      }
    } else {
      this.SetUiActive(false);
    }
  }
  Cqu() {
    var t = this.Pe;
    if (t.IsFirst) {
      return t.IsEditing || t.IsEmpty && !t.IsEditing;
    } else {
      return !!t.IsSelect;
    }
  }
  U$l() {
    this.GetTexture(2).SetUIActive(false);
    this.GetTexture(3).SetUIActive(false);
    this.GetTexture(0).SetUIActive(false);
    this.GetButton(4).SetSelfInteractive(false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), InventoryDefine_1.EMPTY_RULE_TEXT_ID);
  }
  vqu() {
    this.GetTexture(2).SetUIActive(true);
    this.GetTexture(3).SetUIActive(false);
    this.GetTexture(0).SetUIActive(false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "PhantomProject_AddChose");
  }
  pqu() {
    var t = this.Pe;
    this.GetTexture(2).SetUIActive(false);
    this.GetTexture(3).SetUIActive(true);
    var i = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(t.RuleId).FilterType;
    var i = ModelManager_1.ModelManager.FilterModel.GetFilterDataFuncByFilterType(i)([t.Value])[0];
    this.GetText(1).SetText(i.Content ?? "");
    this.Ost(i);
  }
  Ost(t) {
    var i = t.GetIconPath();
    var e = this.GetTexture(0);
    if (StringUtils_1.StringUtils.IsBlank(i)) {
      e.SetUIActive(false);
    } else {
      e.SetUIActive(true);
      this.SetTextureByPath(i, e);
      e.SetChangeColor(t.NeedChangeColor, e.changeColor);
    }
  }
}
exports.SettingGridBig = SettingGridBig;
//# sourceMappingURL=PhantomManageSettingGrid.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScrollSettingButtonItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine");
const GameSettingsDeviceRender_1 = require("../../../GameSettings/GameSettingsDeviceRender");
const GlobalData_1 = require("../../../GlobalData");
const UiManager_1 = require("../../../Ui/UiManager");
const ChannelController_1 = require("../../Channel/ChannelController");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MenuController_1 = require("../MenuController");
const MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingButtonItem extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
  constructor() {
    super(...arguments);
    this.HBi = "{0}x{1}";
    this.jBi = "Account,";
    this.p4e = undefined;
    this.KBi = () => {
      var t;
      var e;
      if (!this.GetItemClickLimit(this.p4e.GetBtn())) {
        if ((t = this.Data.ButtonViewName).includes(this.jBi)) {
          if ((e = Number(t.substring(this.jBi.length))) !== undefined) {
            ChannelController_1.ChannelController.ProcessAccountSetting(e);
          }
        } else if (e = MenuController_1.MenuController.OpenViewFuncMap.get(t)) {
          e();
        } else {
          UiManager_1.UiManager.OpenView(t, [this.Data, this.QBi]);
        }
      }
    };
    this.QBi = (t, e) => {
      if (this.Data !== undefined && t === this.Data.FunctionId) {
        if (t === GameSettingsDefine_1.EFunction.RESOLUTION) {
          this.XBi(e, true);
        } else if (t === GameSettingsDefine_1.EFunction.BRIGHTNESS) {
          this.FireSaveMenuChange(e);
        } else {
          this.SetButtonText(this.Data.OptionsNameList[e], e, true);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UISprite]];
  }
  OnStart() {
    this.p4e = new ButtonItem_1.ButtonItem(this.GetItem(1));
    this.p4e.GetBtn().SetCanClickWhenDisable(true);
    this.p4e.SetFunction(this.KBi);
  }
  OnBeforeDestroy() {
    this.Data &&= undefined;
  }
  Update(t) {
    this.Data = t;
    this.RefreshTitle();
    this.ZGe();
    this.sxi();
    this.cHa();
    this.SetInteractionActive(t.GetEnable());
    this.Data.OnRefresh();
    this.BNe();
  }
  RefreshTitle() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), this.Data.FunctionName, ...(this.Data.CustomTitleArgs ?? []));
  }
  ZGe() {
    this.GetRootItem().SetUIActive(true);
    var t = MenuController_1.MenuController.GetTargetConfig(this.Data.FunctionId);
    if (this.Data.FunctionId === GameSettingsDefine_1.EFunction.RESOLUTION) {
      this.XBi(t);
    } else {
      this.SetButtonText(this.Data.OptionsNameList[t], t);
    }
  }
  sxi() {
    var t;
    var e;
    if (this.Data && this.Data.HasDetailText()) {
      t = this.GetText(4);
      e = this.Data.GetDetailTextId();
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, e);
    }
  }
  cHa() {
    if (this.Data) {
      this.GetSprite(5)?.SetUIActive(this.Data.HasDetailText());
    }
  }
  XBi(t, e = false) {
    let i = "";
    var s = MenuController_1.MenuController.GetTargetConfig(GameSettingsDefine_1.EFunction.DISPLAYMODE);
    i = s === 0 ? (s = UE.WidgetLayoutLibrary.GetViewportSize(GlobalData_1.GlobalData.World), StringUtils_1.StringUtils.FormatStaticBuilder(this.HBi, s.X, s.Y)) : (s = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionByList(t), StringUtils_1.StringUtils.FormatStaticBuilder(this.HBi, s.X, s.Y));
    this.GetText(2).SetText(i);
    if (e) {
      this.FireSaveMenuChange(t);
    }
  }
  SetButtonText(t, e, i = false) {
    var s = this.Data.ButtonTextId;
    var r = this.GetText(2);
    if (s) {
      r.ShowTextNew(s);
    } else {
      r.ShowTextNew(t ?? "");
    }
    if (i) {
      this.FireSaveMenuChange(e);
    }
  }
  SetInteractionActive(t) {
    this.p4e.SetEnableClick(t && this.Data.GetButtonEnable());
  }
  OnSetDetailVisible(t) {
    this.GetItem(3)?.SetUIActive(t);
  }
  BNe() {
    this.p4e?.SetRedDotVisible(this.Data.EnableRedDot);
  }
}
exports.MenuScrollSettingButtonItem = MenuScrollSettingButtonItem;
//# sourceMappingURL=MenuScrollSettingButtonItem.js.map
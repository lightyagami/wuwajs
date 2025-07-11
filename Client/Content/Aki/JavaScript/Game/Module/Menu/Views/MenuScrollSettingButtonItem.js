"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScrollSettingButtonItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine");
const GameSettingsDeviceRender_1 = require("../../../GameSettings/GameSettingsDeviceRender");
const UiManager_1 = require("../../../Ui/UiManager");
const ChannelController_1 = require("../../Channel/ChannelController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MenuController_1 = require("../MenuController");
const MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingButtonItem extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
  constructor() {
    super(...arguments);
    this.HBi = "{0}x{1}";
    this.jBi = "Account,";
    this.KBi = () => {
      var t;
      var e;
      if (!this.GetItemClickLimit(this.GetButton(1))) {
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
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UISprite]];
    this.BtnBindInfo = [[1, this.KBi]];
  }
  OnStart() {
    this.GetButton(1).SetCanClickWhenDisable(true);
  }
  OnBeforeDestroy() {
    this.Data &&= undefined;
  }
  OnClear() {
    this.GetButton(1)?.OnClickCallBack.Unbind();
  }
  Update(t) {
    this.Data = t;
    this.RefreshTitle();
    this.ZGe();
    this.sxi();
    this.cHa();
    this.SetInteractionActive(t.GetEnable());
  }
  RefreshTitle() {
    this.GetText(0).ShowTextNew(this.Data.FunctionName ?? "");
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
    var i = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionByList(t);
    this.GetText(2).SetText(StringUtils_1.StringUtils.FormatStaticBuilder(this.HBi, i.X, i.Y));
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
    this.GetButton(1).SetSelfInteractive(t);
  }
  OnSetDetailVisible(t) {
    this.GetItem(3)?.SetUIActive(t);
  }
}
exports.MenuScrollSettingButtonItem = MenuScrollSettingButtonItem;
//# sourceMappingURL=MenuScrollSettingButtonItem.js.map
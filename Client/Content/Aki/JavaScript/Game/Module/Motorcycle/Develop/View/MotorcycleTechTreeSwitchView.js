"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTechTreeSwitchView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const MotorcycleTechTreeSwitchItem_1 = require("../Item/MotorcycleTechTreeSwitchItem");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
class MotorcycleTechTreeSwitchView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.PDd = undefined;
    this.Ywg = undefined;
    this.ebl = undefined;
    this.zwg = 0;
    this.Jwg = 0;
    this.sGe = () => {
      var e = new MotorcycleTechTreeSwitchItem_1.MotorcycleTechTreeSwitchItem();
      e.OnClickToggleBack = this.jbe;
      return e;
    };
    this.jbe = (e, t) => {
      if (this.ebl) {
        this.ebl.SetToggleState(0);
      }
      this.ebl = t;
      this.ebl.SetToggleState(1);
      this.zwg = e;
      t = this.zwg !== this.Jwg;
      this.PDd.SetEnableClick(t);
    };
    this.xpt = () => {
      this.CloseMe();
    };
    this.zmf = () => {
      var e;
      if (this.kAg) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorBike_TechTree_ChangeFail_Time");
      } else if (!this.BAg) {
        e = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurTreeType();
        if (this.zwg === e) {
          this.CloseMe();
        } else {
          ControllerHolder_1.ControllerHolder.MotorcycleDevelopController.RequestMotorTechTreeSwitch(this.zwg, () => {
            var e = CommonParamById_1.configCommonParamById.GetIntConfig("SwitchMotorTechTreeCD");
            if (e) {
              ModelManager_1.ModelManager.MotorcycleDevelopModel.StartSwitchTechTreeLockTimer(e);
            }
            var e = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(this.zwg);
            var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name);
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorBike_TechTree_ChangeSuccess", e);
            this.CloseMe();
          });
        }
      }
    };
  }
  get kAg() {
    return ModelManager_1.ModelManager.MotorcycleDevelopModel.IsSwitchTechTreeTimeLocked();
  }
  get BAg() {
    return ModelManager_1.ModelManager.MotorcycleDevelopModel.IsSwitchTechTreePlayerLocked();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UIButtonComponent]];
  }
  async OnBeforeStartAsync() {
    var e = CommonParamById_1.configCommonParamById.GetStringConfig("MotorTechTreeSwitchIcon");
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.xpt);
    this.lqe.SetHelpBtnActive(false);
    if (e) {
      this.lqe.SetTitleIcon(e);
    }
    this.PDd = new ButtonItem_1.ButtonItem();
    await this.PDd.CreateThenShowByActorAsync(this.GetButton(3).GetOwner());
    this.PDd.SetFunction(this.zmf);
    this.Ywg = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.sGe);
    var e = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurTreeType();
    var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetActivatedTreeTypeList();
    this.Jwg = e;
    await this.Ywg.RefreshByDataAsync(t);
    this.Ywg.SelectGridProxy(t.indexOf(e));
  }
  OnBeforeShow() {
    this.GetHorizontalLayout(1).GetOwner().GetComponentByClass(UE.UIInturnAnimController.StaticClass())?.Play();
  }
  OnBeforeDestroy() {
    this.lqe.Destroy();
  }
}
exports.MotorcycleTechTreeSwitchView = MotorcycleTechTreeSwitchView;
//# sourceMappingURL=MotorcycleTechTreeSwitchView.js.map
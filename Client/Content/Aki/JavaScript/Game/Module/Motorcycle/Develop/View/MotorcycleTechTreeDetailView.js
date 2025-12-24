"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTechTreeDetailView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const MotorcycleTechTreeListScrollItem_1 = require("../Item/MotorcycleTechTreeListScrollItem");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class MotorcycleTechTreeDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.eGe = undefined;
    this.Ncf = () => new MotorcycleTechTreeListScrollItem_1.MotorcycleTechTreeListScrollItem();
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIVerticalLayout]];
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.AMo);
    this.eGe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.Ncf);
    var e = this.OpenParam;
    var i = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(e);
    this.SetTextureByPath(i.Icon, this.GetTexture(1));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Name);
    var t = [];
    for (const o of ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfigList(e)) {
      var r = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(o.Id);
      if (r && r.Status === 1) {
        r = {
          TechId: o.Id,
          Level: r.NodeLevel
        };
        t.push(r);
      }
    }
    t.sort((e, i) => {
      e = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfig(e.TechId);
      i = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfig(i.TechId);
      return e.DetailOrder - i.DetailOrder;
    });
    this.eGe.RefreshByData(t);
  }
}
exports.MotorcycleTechTreeDetailView = MotorcycleTechTreeDetailView;
//# sourceMappingURL=MotorcycleTechTreeDetailView.js.map
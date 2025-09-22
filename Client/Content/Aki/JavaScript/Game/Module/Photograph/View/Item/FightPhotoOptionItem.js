"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoOptionItem = undefined;
const UE = require("ue");
const GlobalData_1 = require("../../../../GlobalData");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MenuDefine_1 = require("../../../Menu/MenuDefine");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FightPhotoOptionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.OnToggleClick = e => {};
    this.kqe = () => {
      this.OnToggleClick(this.GridIndex);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  Refresh(e, i, t) {
    this.Pe = e;
    this.SetTextureByPath(e.Picture, this.GetTexture(1));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Name);
  }
  OnSelected(e) {
    ModelManager_1.ModelManager.PhotographModel.SetFightPhotoOption(this.Pe.Id);
    UE.KuroGISystem.SetKuroAdvancedModeScreenFilter(GlobalData_1.GlobalData.World, this.Pe.FilterIndex, this.Pe.FilterParamX, this.Pe.FilterParamY, this.Pe.FilterIntensity, MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE);
    this.GetExtendToggle(0).SetToggleStateForce(1);
  }
  OnDeselected(e) {
    this.GetExtendToggle(0).SetToggleStateForce(0);
  }
}
exports.FightPhotoOptionItem = FightPhotoOptionItem;
//# sourceMappingURL=FightPhotoOptionItem.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotographValueSetup = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PhotographController_1 = require("../PhotographController");
class PhotographValueSetup extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RKi = 0;
    this.UKi = undefined;
    this.SPe = undefined;
    this.pQi = (e, t = 0) => {
      var i;
      if (this.UKi.IsReverseSet) {
        i = this.UKi.ValueRange;
        i = MathUtils_1.MathUtils.RangeClamp(e, i[0], i[1], i[1], i[0]);
        PhotographController_1.PhotographController.SetPhotographOption(this.UKi.ValueType, i);
      } else {
        PhotographController_1.PhotographController.SetPhotographOption(this.UKi.ValueType, e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISliderComponent], [2, UE.UIItem]];
  }
  OnStart() {
    this.GetSlider(1).OnValueChangeCb.Bind(this.pQi);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    this.GetSlider(1).OnValueChangeCb.Unbind();
    this.SPe = undefined;
  }
  OnBeforeShow() {
    this.SPe?.PlayLevelSequenceByName("Start01");
  }
  Initialize(e) {
    this.RKi = e;
    this.Refresh();
  }
  Refresh() {
    this.UKi = ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoSetupConfig(this.RKi);
    if (this.UKi.Type !== 0) {
      var t = this.UKi.Name;
      var i = this.GetText(0);
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, t);
      var i = this.GetSlider(1);
      var t = this.UKi.ValueRange;
      i.SetMinValue(t[0], false, false);
      i.SetMaxValue(t[1], false, false);
      let e = ModelManager_1.ModelManager.PhotographModel.GetPhotographOption(this.RKi);
      if (this.UKi.IsReverseSet) {
        e = MathUtils_1.MathUtils.RangeClamp(e ?? t[2], t[0], t[1], t[1], t[0]);
      }
      i.SetValue(e ?? t[2], false);
    }
  }
  SetEnable(e) {
    this.SetActive(e);
  }
  GetSetupId() {
    return this.RKi;
  }
  GetSetupConfig() {
    return this.UKi;
  }
}
exports.PhotographValueSetup = PhotographValueSetup;
//# sourceMappingURL=PhotographValueSetup.js.map
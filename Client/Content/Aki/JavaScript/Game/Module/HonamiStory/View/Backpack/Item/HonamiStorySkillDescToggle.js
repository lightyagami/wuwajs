"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStorySkillDescToggle = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class HonamiStorySkillDescToggle extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.EXu = () => {
      var e = this.GetExtendToggle(0)?.GetToggleState() === 1;
      ModelManager_1.ModelManager.HonamiStoryModel.SetSkillDescMode(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.EXu]];
  }
  OnStart() {
    this.RefreshState();
  }
  RefreshState() {
    var e = ModelManager_1.ModelManager.HonamiStoryModel.GetSkillDescMode() ? 1 : 0;
    this.GetExtendToggle(0)?.SetToggleState(e);
  }
}
exports.HonamiStorySkillDescToggle = HonamiStorySkillDescToggle;
//# sourceMappingURL=HonamiStorySkillDescToggle.js.map
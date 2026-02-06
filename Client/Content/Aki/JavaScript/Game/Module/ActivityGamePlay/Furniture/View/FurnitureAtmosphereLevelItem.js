"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureAtmosphereLevelItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const SpringManorDefine_1 = require("../../../Activity/ActivityContent/SpringManor/SpringManorDefine");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FurnitureAtmosphereLevelItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.aFi = () => {
      UiManager_1.UiManager.OpenView("Spring26AtmosphereLevelView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIArtText], [4, UE.UIText], [5, UE.UISliderComponent], [6, UE.UIText], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[7, this.aFi]];
  }
  Refresh(e) {
    this.Pe = e;
    this.jeg();
    this.Nqe();
    this.RefreshBg(this.Pe.Level);
  }
  jeg() {
    if (this.Pe) {
      this.GetArtText(3).SetText(this.Pe.Level.toString());
    }
  }
  Nqe() {
    var e;
    if (this.Pe) {
      if (e = ConfigManager_1.ConfigManager.SpringManorConfig?.GetLevelConfigById(this.Pe.Level)) {
        e = MathUtils_1.MathUtils.Clamp((this.Pe.CurLevelAtmosphere - e.AtmosphereNeed) / e.AtmosphereNext, 0, 1);
        this.GetSlider(5).SetValue(e);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "Spring26_MainHud_PassProgress", this.Pe.CurLevelAtmosphere, this.Pe.CurLevelMaxAtmosphere);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SpringManor", 90, "获取不到等级配置！" + this.Pe.Level);
      }
    }
  }
  RefreshBg(e) {
    let i = 1;
    for (const r of SpringManorDefine_1.atmosphereLevelList) {
      if (e < r) {
        break;
      }
      i++;
    }
    this.GetItem(0)?.SetUIActive(i === 1);
    this.GetItem(1)?.SetUIActive(i === 2);
    this.GetItem(2)?.SetUIActive(i === 3);
  }
}
exports.FurnitureAtmosphereLevelItem = FurnitureAtmosphereLevelItem;
//# sourceMappingURL=FurnitureAtmosphereLevelItem.js.map
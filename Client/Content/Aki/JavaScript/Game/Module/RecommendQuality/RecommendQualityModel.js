"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecommendQualityModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Platform_1 = require("../../../Launcher/Platform/Platform");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
const GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager");
const CloudGameManager_1 = require("../../Manager/CloudGameManager");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiManager_1 = require("../../Ui/UiManager");
class RecommendQualityModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.QualityRangeMap = undefined;
    this.nml = undefined;
    this.sml = 0;
    this.aml = false;
    this.IsNeedApply = false;
    this.NeedApplyQuality = 2;
  }
  OnInit() {
    var e;
    if (CloudGameManager_1.CloudGameManager.IsCloudGame) {
      this.aml = true;
      return (e = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetRecommendQualityLv()) !== undefined && (this.SaveApply(e), true);
    } else if (Platform_1.Platform.IsPs5Platform()) {
      return this.aml = true;
    } else {
      this.aml = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.IsFinishRecommendQuality, false);
      if (!this.aml) {
        this.InitQualityRangeMap();
        this.InitQualityList();
      }
      return true;
    }
  }
  OnClear() {
    return true;
  }
  InitQualityRangeMap() {
    this.QualityRangeMap = new Map([[0, [0, 1, 2]], [1, [1, 2, 3]], [2, [2, 3]], [3, [3]], [4, [2, 3, 4]], [5, [3, 4, 5]]]);
  }
  InitQualityList() {
    var e = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetQualityRange();
    var e = this.QualityRangeMap?.get(e);
    if (e) {
      this.nml = [];
      const r = GameSettingsManager_1.GameSettingsManager.ValidApplyConfigMap.get(GameSettingsDefine_1.EFunction.IMAGEQUALITY);
      const n = r?.OptionsName ?? [];
      const o = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetRecommendQualityLv();
      e.forEach((e, t) => {
        var a = "T_LoginSetQuality" + (e + 1);
        var a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(a);
        var i = r?.OptionsValue.indexOf(e) ?? 0;
        var i = {
          Quality: e,
          Name: n[i] ?? n[0],
          IsRecommend: o === e,
          Bg: a
        };
        this.nml.push(i);
        if (i.IsRecommend) {
          this.sml = t;
        }
      });
    }
  }
  GetQualityList() {
    return this.nml ?? [];
  }
  GetRecommendQualityIndex() {
    return this.sml;
  }
  SaveApply(e) {
    this.IsNeedApply = true;
    this.NeedApplyQuality = e;
  }
  FinishRecommendQualityShow() {
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.IsFinishRecommendQuality, true);
  }
  CheckOpenRecommendQuality() {
    if (this.aml) {
      UiManager_1.UiManager.CloseView("CreateCharacterView");
    } else {
      UiManager_1.UiManager.OpenView("RecommendQualityView");
    }
  }
}
exports.RecommendQualityModel = RecommendQualityModel;
//# sourceMappingURL=RecommendQualityModel.js.map
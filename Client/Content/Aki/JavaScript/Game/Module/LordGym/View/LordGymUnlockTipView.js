"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymUnlockTipView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LordGymController_1 = require("../LordGymController");
class LordGymUnlockTipView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    this._yi(e);
  }
  _yi(e) {
    var r = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(e);
    if (r.IsNew) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Text_LordGymNewDifficultyUnlock_Text");
    } else {
      r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.GymTitle);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "LordGymUnLock", r);
    }
    if (!ModelManager_1.ModelManager.LordGymModel.GetLordGymHasRead(e)) {
      LordGymController_1.LordGymController.ReadLordGym(e);
    }
  }
  OnAfterPlayStartSequence() {
    this.CloseMe();
  }
}
exports.LordGymUnlockTipView = LordGymUnlockTipView;
//# sourceMappingURL=LordGymUnlockTipView.js.map
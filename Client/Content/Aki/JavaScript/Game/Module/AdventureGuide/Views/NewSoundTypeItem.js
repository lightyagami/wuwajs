"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewSoundTypeItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActivityDoubleRewardController_1 = require("../../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class NewSoundTypeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.q8e = 4;
    this.md_ = undefined;
    this.G8e = undefined;
    this.W5e = undefined;
    this.H5e = undefined;
    this.D4l = false;
    this.A5e = () => !this.W5e || this.W5e(this.q8e);
    this.N8e = t => {
      if (t === 1) {
        this.G8e(this.q8e, this.H5e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [2, UE.UIText], [0, UE.UISprite], [3, UE.UIExtendToggle], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[3, this.N8e]];
  }
  OnStart() {
    this.H5e = this.GetExtendToggle(3);
    this.H5e?.CanExecuteChange.Bind(this.A5e);
  }
  BindOnToggleFunc(i) {
    this.G8e = (t, e) => {
      i(t, e);
      if (this.GetRedDotState() && (ModelManager_1.ModelManager.AdventureGuideModel.RecordAllDetectionBySecondary(this.q8e), this.RefreshRedDotState(), this.md_)) {
        if (this.md_ === "NewSoundAreaView") {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotNewSoundAreaTabUpdate);
        } else if (this.md_ === "DisposableChallengeView") {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotAdventureChallengeTabUpdate);
        }
      }
    };
  }
  BindCanToggleExecuteChange(t) {
    this.W5e = t;
  }
  Refresh(t, e, i) {
    this.q8e = t.TypeId;
    this.md_ = t.FromTabViewName;
    var t = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(this.q8e);
    var s = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(s, t.Text);
    var s = this.GetText(2);
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(s, t.SubText);
    this.SetSpriteByPath(t.Icon, this.GetSprite(0), false);
    this.H5e.SetToggleState(0, false);
    this.RefreshDoubleIcon();
    this.RefreshRedDotState();
  }
  RefreshDoubleIcon() {
    var t = ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetAdventureUpActivity(this.q8e);
    var e = ModelManager_1.ModelManager.ActivityRegressModel.IsHasDoubleDrop(this.q8e);
    var t = t !== undefined || e;
    this.GetItem(4).SetUIActive(t);
  }
  RefreshRedDotState() {
    var t = ModelManager_1.ModelManager.AdventureGuideModel.CheckRedDotSecondary(this.q8e);
    var e = ModelManager_1.ModelManager.AdventureGuideModel.CheckExtraRedDotSecondary(this.q8e);
    this.D4l = t || e;
    this.GetItem(5)?.SetUIActive(this.D4l);
  }
  GetRedDotState() {
    return this.D4l;
  }
  OnSelected(t) {
    if (t) {
      this.SetSelectToggle(1);
    }
  }
  SetSelectToggle(t = 1) {
    this.GetExtendToggle(3).SetToggleStateForce(t, false, true);
    this.G8e(this.q8e, this.H5e);
  }
  GetSelfToggle() {
    return this.GetExtendToggle(3);
  }
  GetButtonItem() {
    return this.GetExtendToggle(3)?.RootUIComp;
  }
}
exports.NewSoundTypeItem = NewSoundTypeItem;
//# sourceMappingURL=NewSoundTypeItem.js.map
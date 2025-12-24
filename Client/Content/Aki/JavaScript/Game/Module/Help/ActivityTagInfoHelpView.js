"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityTagInfoHelpView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../Util/LguiUtil");
class ActivityTagInfoHelpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.t6m = undefined;
    this.i6m = undefined;
    this.GetExtraPopFrameType = i => 3;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.t6m = new ActivityTagInfoItem();
    this.i6m = new ActivityTagInfoItem();
    var i = [];
    i.push(this.t6m.CreateByActorAsync(this.GetItem(2).GetOwner()));
    i.push(this.i6m.CreateByActorAsync(this.GetItem(3).GetOwner()));
    await Promise.all(i);
  }
  OnStart() {
    this.AU();
  }
  AU() {
    var [i, t] = this.OpenParam;
    if (i <= 0) {
      this.GetItem(2).SetUIActive(false);
    } else {
      var i = ConfigManager_1.ConfigManager.ActivityConfig.GetActivityTitleTags(i);
      if (!i.DescInTip) {
        this.GetItem(2).SetUIActive(false);
        return;
      }
      this.GetItem(2).SetUIActive(true);
      this.t6m.SetView(i);
    }
    if (!(t <= 0) && (i = ConfigManager_1.ConfigManager.ActivityConfig.GetActivityTitleTags(t)).DescInTip) {
      this.GetItem(3).SetUIActive(true);
      this.i6m.SetView(i);
    } else {
      this.GetItem(3).SetUIActive(false);
    }
  }
}
exports.ActivityTagInfoHelpView = ActivityTagInfoHelpView;
class ActivityTagInfoItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIText]];
  }
  SetView(i) {
    this.GetSprite(0).SetUIActive(!!i.DescInTip);
    this.GetText(1).SetUIActive(!!i.DescInTip);
    this.GetText(2).SetUIActive(!!i.DescInTip);
    if (i.DescInTip) {
      this.SetSpriteByPath(i.TogIcon, this.GetSprite(0), false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.TagName);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.DescInTip);
    }
  }
}
//# sourceMappingURL=ActivityTagInfoHelpView.js.map
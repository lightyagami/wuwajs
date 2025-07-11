"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResolutionToggle = exports.ResolutionListView = undefined;
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine");
const GameSettingsDeviceRender_1 = require("../../../GameSettings/GameSettingsDeviceRender");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MenuController_1 = require("../MenuController");
const LanguageSettingViewBase_1 = require("./LanguageSettingViewBase");
class ResolutionListView extends LanguageSettingViewBase_1.LanguageSettingViewBase {
  constructor() {
    super(...arguments);
    this.Hve = [];
    this.DoRefreshScrollView = (e, t) => {
      var i = MenuController_1.MenuController.GetTargetConfig(GameSettingsDefine_1.EFunction.RESOLUTION) === e;
      var t = this.CreateToggle(t, e, i);
      if (t) {
        if (i) {
          this.SelectedToggle = t;
        } else {
          t.UnSelect();
        }
        t.SetSelectedCallBack(this.DoSelected);
        this.OnRefreshView(t);
      }
    };
  }
  CreateToggle(e, t, i) {
    var s = new ResolutionToggle();
    s.Initialize(e, t, i);
    return s;
  }
  OnRefreshView(e) {
    var t = this.Hve[e.GetIndex()];
    e.SetMainRawText(t.X + "x" + t.Y);
  }
  OnSelected(e, t) {}
  InitScrollViewData() {
    var i = ModelManager_1.ModelManager.MenuModel.AllowResolutionList;
    if (i) {
      let e = 0;
      let t = 1;
      var s = new Set();
      for (; t < i.length;) {
        var n = i[e];
        var r = i[t];
        s.add(n / r);
        e += 2;
        t += 2;
      }
      this.Hve = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionList();
      var a = [];
      for (let e = 0; e < this.Hve.length; e++) {
        var o = this.Hve[e];
        var o = o.X / o.Y;
        if (s.has(o)) {
          a.push(e);
        }
      }
      this.ScrollView.RefreshByData(a);
    }
  }
}
exports.ResolutionListView = ResolutionListView;
class ResolutionToggle extends LanguageSettingViewBase_1.LanguageToggleBase {
  OnRegisterComponent() {
    super.OnRegisterComponent();
  }
  SetMainRawText(e) {
    this.MainText.SetText(e);
  }
  OnStart() {
    super.OnStart();
    this.GetText(2).SetUIActive(false);
  }
}
exports.ResolutionToggle = ResolutionToggle;
//# sourceMappingURL=ResolutionListView.js.map
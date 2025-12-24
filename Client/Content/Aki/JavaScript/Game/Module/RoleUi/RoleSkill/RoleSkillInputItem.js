"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillInputItem = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringBuilder_1 = require("../../../../Core/Utils/StringBuilder");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const InputKeyDisplayData_1 = require("../../../InputSettings/InputKeyDisplayData");
const InputKeyUtils_1 = require("../../../InputSettings/InputKeyUtils");
const InputSettings_1 = require("../../../InputSettings/InputSettings");
const InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const KeyUtil_1 = require("../../Util/KeyUtil");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoleSkillTreeSkillSpriteItem_1 = require("./RoleSkillTreeSkillSpriteItem");
class RoleSkillInputItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Imo = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem]];
  }
  Refresh(t, e, i) {
    this.Imo = t.InputId;
    var r = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillInputConfigById(this.Imo);
    if (r) {
      this.tV1(t.InputIndex % 2 != 0);
      if (Info_1.Info.IsInKeyBoard()) {
        this.HandlePcInputText(r);
      } else if (Info_1.Info.IsInTouch()) {
        this.HandleMobileInputText(r);
      } else if (Info_1.Info.IsInGamepad()) {
        this.HandleGamepadInputText(r);
      }
    }
  }
  tV1(t) {
    var e = this.GetItem(1);
    e?.SetChangeColor(!t, e.changeColor);
  }
  HandlePcInputText(e) {
    var i = [];
    var r = e.InputArray.length;
    for (let t = 0; t < r; t++) {
      var n = e.InputArray[t];
      var n = KeyUtil_1.KeyUtil.GetPcKeyNameByAction(n);
      if (n) {
        var l = n[0];
        var s = n[1];
        var u = new StringBuilder_1.StringBuilder();
        var a = l.length;
        var o = s.length;
        var g = a + o;
        for (let t = 0; t < g; t++) {
          var _ = t < a ? l[t] : s[t - a];
          var _ = InputKeyUtils_1.InputKeyUtils.GetPcKeyIconPathByCurrentPlatform(_);
          if (_) {
            u.Append("<texture=");
            u.Append(_);
            u.Append("/>");
          }
          if (t === a - 1 && o > 0) {
            u.Append("/");
          } else if (t < g - 1) {
            u.Append("+");
          }
        }
        i.push(u.ToString());
      }
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Description, ...i);
  }
  HandleGamepadInputText(e) {
    var i = [];
    const r = e.InputArray.length;
    for (let t = 0; t < r; t++) {
      var n = e.InputArray[t];
      var l = new InputKeyDisplayData_1.InputKeyDisplayData();
      if (InputSettingsManager_1.InputSettingsManager.GetActionKeyDisplayData(l, n)) {
        var s = l.GetDisplayKeyNameList();
        if (s) {
          var u = new StringBuilder_1.StringBuilder();
          const r = s.length;
          for (let t = 0; t < r; t++) {
            var a = s[t];
            var a = InputSettings_1.InputSettings.GetKeyIconPath(a);
            if (!StringUtils_1.StringUtils.IsEmpty(a)) {
              u.Append(`<texture=${a}>`);
            }
            if (t < r - 1) {
              u.Append("+");
            }
          }
          i.push(u.ToString());
        }
      }
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Description, ...i);
  }
  HandleMobileInputText(t) {
    var e = t.SkillArray;
    var i = [];
    var r = [];
    var n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("UiItem_RoleSkillIcon");
    var l = new RegExp("{[0-9]+}", "g");
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Description);
    var s = t.match(l);
    if (s) {
      const a = [];
      for (let t = 0; t < s.length; t++) {
        var u = s[t];
        var u = parseInt(u.substring(1, u.length - 1));
        i.push(`<snidx=${t}/>`);
        r.push(n);
        a.push(e[u]);
      }
      l = StringUtils_1.StringUtils.FormatStaticBuilder(t, ...i);
      LguiUtil_1.LguiUtil.LoadAndSetText(this.GetText(0), l, r, e => {
        for (let t = 0; t < e.length; t++) {
          var i = e[t];
          new RoleSkillTreeSkillSpriteItem_1.RoleSkillTreeSkillSpriteItem(i).Update(a[t]);
        }
      });
    } else {
      this.GetText(0).SetText(t);
    }
  }
}
exports.RoleSkillInputItem = RoleSkillInputItem;
//# sourceMappingURL=RoleSkillInputItem.js.map
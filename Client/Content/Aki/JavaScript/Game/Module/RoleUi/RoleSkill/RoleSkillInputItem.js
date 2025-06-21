"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RoleSkillInputItem = void 0;
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringBuilder_1 = require("../../../../Core/Utils/StringBuilder"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  InputKeyDisplayData_1 = require("../../../InputSettings/InputKeyDisplayData"),
  InputSettings_1 = require("../../../InputSettings/InputSettings"),
  InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  KeyUtil_1 = require("../../Util/KeyUtil"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoleSkillTreeSkillSpriteItem_1 = require("./RoleSkillTreeSkillSpriteItem"),
  InputKeyUtils_1 = require("../../../InputSettings/InputKeyUtils");
class RoleSkillInputItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Imo = 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem]
    ]
  }
  Refresh(t, e, i) {
    this.Imo = t;
    t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillInputConfigById(this.Imo);
    t && (this.I41(i % 2 == 0), Info_1.Info.IsInKeyBoard() ? this.HandlePcInputText(t) : Info_1.Info.IsInTouch() ? this.HandleMobileInputText(t) : Info_1.Info.IsInGamepad() && this.HandleGamepadInputText(t))
  }
  I41(t) {
    var e = this.GetItem(1);
    e?.SetChangeColor(!t, e.changeColor)
  }
  HandlePcInputText(e) {
    var i = [],
      r = e.InputArray.length;
    for (let t = 0; t < r; t++) {
      var n = e.InputArray[t],
        n = KeyUtil_1.KeyUtil.GetPcKeyNameByAction(n),
        l = n[0],
        s = n[1],
        u = new StringBuilder_1.StringBuilder,
        a = l.length,
        o = s.length,
        g = a + o;
      for (let t = 0; t < g; t++) {
        var _ = t < a ? l[t] : s[t - a],
          _ = InputKeyUtils_1.InputKeyUtils.GetPcKeyIconPathByCurrentPlatform(_);
        _ && (u.Append("<texture="), u.Append(_), u.Append("/>")), t === a - 1 && 0 < o ? u.Append("/") : t < g - 1 && u.Append("+")
      }
      i.push(u.ToString())
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Description, ...i)
  }
  HandleGamepadInputText(e) {
    var i = [];
    const r = e.InputArray.length;
    for (let t = 0; t < r; t++) {
      var n = e.InputArray[t],
        l = new InputKeyDisplayData_1.InputKeyDisplayData;
      if (InputSettingsManager_1.InputSettingsManager.GetActionKeyDisplayData(l, n)) {
        var s = l.GetDisplayKeyNameList();
        if (s) {
          var u = new StringBuilder_1.StringBuilder;
          const r = s.length;
          for (let t = 0; t < r; t++) {
            var a = s[t],
              a = InputSettings_1.InputSettings.GetKeyIconPath(a);
            StringUtils_1.StringUtils.IsEmpty(a) || u.Append(`<texture=${a}>`), t < r - 1 && u.Append("+")
          }
          i.push(u.ToString())
        }
      }
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Description, ...i)
  }
  HandleMobileInputText(t) {
    var e = t.SkillArray,
      i = [],
      r = [],
      n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("UiItem_RoleSkillIcon"),
      l = new RegExp("{[0-9]+}", "g"),
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Description),
      s = t.match(l);
    if (s) {
      const a = [];
      for (let t = 0; t < s.length; t++) {
        var u = s[t],
          u = parseInt(u.substring(1, u.length - 1));
        i.push(`<snidx=${t}/>`), r.push(n), a.push(e[u])
      }
      l = StringUtils_1.StringUtils.FormatStaticBuilder(t, ...i);
      LguiUtil_1.LguiUtil.LoadAndSetText(this.GetText(0), l, r, e => {
        for (let t = 0; t < e.length; t++) {
          var i = e[t];
          new RoleSkillTreeSkillSpriteItem_1.RoleSkillTreeSkillSpriteItem(i).Update(a[t])
        }
      })
    } else this.GetText(0).SetText(t)
  }
}
exports.RoleSkillInputItem = RoleSkillInputItem;
//# sourceMappingURL=RoleSkillInputItem.js.map
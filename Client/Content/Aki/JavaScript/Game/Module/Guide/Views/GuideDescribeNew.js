"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideDescribeNew = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const InputKeyDisplayData_1 = require("../../../InputSettings/InputKeyDisplayData");
const InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LINKER = "+";
class GuideDescribeNew {
  constructor(t) {
    this.Uzt = undefined;
    this.Azt = 1.6;
    this.Uwa = new InputKeyDisplayData_1.InputKeyDisplayData();
    this.Uzt = t;
    this.Uzt.SetRichText(true);
  }
  SetUpText(t, ...e) {
    var i = this.Uzt;
    var r = ConfigManager_1.ConfigManager.GuideConfig.GetGuideText(t);
    if (e.length === 0) {
      const g = r.split("\n").length - 1;
      i.SetHeight(i.Height + i.size * g);
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, t);
    } else {
      var n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
      var s = n.match(/\{[0-9]+\}/g);
      var s = s ? s.length : 0;
      if (s !== e.length) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 16, "按钮的数量与通配符的数量不一致！", ["出错的文本", n], ["通配符数量", s], ["按钮数量", e.length]);
        }
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, t);
      } else {
        var u;
        var a = [];
        for (const o of e) {
          let t = "";
          let e = 0;
          t = o.search("#") >= 0 ? (u = o.split("#"), e = Number(u[0]), u[1]) : o;
          let i = "";
          let r = undefined;
          let n = undefined;
          if (InputSettingsManager_1.InputSettingsManager.GetActionKeyDisplayData(this.Uwa, t) || InputSettingsManager_1.InputSettingsManager.GetAxisKeyDisplayData(this.Uwa, t)) {
            r = this.Uwa.GetDisplayKeyNameList(e);
            n = this.Uwa.GetDisplayKeyIconPathList(e);
          }
          if (r === undefined || n === undefined) {
            return;
          }
          if (r.length === 1) {
            i = this.xwa(r[0], n[0]);
          } else if (r.length === 2) {
            i = "" + this.xwa(r[0], n[0]) + LINKER + this.xwa(r[1], n[1]);
          }
          a.push(i);
        }
        const g = r.split("\n").length - 1;
        n = a.length ? this.Azt : 1;
        i.SetHeight(i.Height + i.size * g * n);
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, t, ...a);
      }
    }
  }
  xwa(t, e) {
    if (StringUtils_1.StringUtils.IsEmpty(e)) {
      return `(${t})`;
    } else {
      return `<texture=${e}/>`;
    }
  }
}
exports.GuideDescribeNew = GuideDescribeNew;
//# sourceMappingURL=GuideDescribeNew.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelpView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../Util/LguiUtil");
const Paragraph_1 = require("./Paragraph");
const HelpStylizeDefine_1 = require("./Stylize/HelpStylizeDefine");
class HelpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.cti = new Array();
    this.GetExtraPopFrameType = e => {
      if (e) {
        e = ConfigManager_1.ConfigManager.HelpConfig.GetHelpContentInfoByGroupId(e);
        if (e.length > 0) {
          return HelpStylizeDefine_1.helpStylizeType2PopFrameType[e[0].Style];
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnStart() {
    this.GetItem(2).SetUIActive(false);
    this.AU();
  }
  AU() {
    var e = this.OpenParam;
    var r = ConfigManager_1.ConfigManager.HelpConfig.GetHelpContentInfoByGroupId(e);
    if (r.length > 0) {
      this.GetText(0).ShowTextNew(r[0].Title);
      var a;
      var s = r.length;
      this.cti.forEach(e => {
        e.SetActive(false);
      });
      var n = this.GetItem(2);
      var l = this.GetItem(1);
      let t = 0;
      for (let i = 0; i < s; i++) {
        let e = undefined;
        if (t > this.cti.length - 1) {
          a = LguiUtil_1.LguiUtil.CopyItem(n, l);
          e = new Paragraph_1.Paragraph(a.GetOwner());
          this.cti.push(e);
        } else {
          e = this.cti[t];
        }
        e.Refresh(r[i]);
        e.SetActive(true);
        t++;
      }
    }
  }
  OnGetTimeDilation() {
    var e = this.OpenParam;
    return ConfigManager_1.ConfigManager.HelpConfig.GetHelpContentInfoByGroupId(e)[0].TimeDilation;
  }
}
exports.HelpView = HelpView;
//# sourceMappingURL=HelpView.js.map
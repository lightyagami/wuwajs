"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EncircleSelectLevelView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const ActivityEncircleController_1 = require("../ActivityEncircleController");
const EncircleSelectLevelItemGrid_1 = require("./EncircleSelectLevelItemGrid");
class EncircleSelectLevelView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.Kbg = [];
    this.Vgt = () => {
      this.CloseMe();
    };
    this.pcr = () => {
      var e = ActivityEncircleController_1.ActivityEncircleController.GetEncircleData();
      if (e) {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e.LocalConfig.HelpId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetTitle(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Activity_107900002_Title") ?? "");
    this.lqe.SetHelpBtnActive(true);
    this.lqe.SetCloseCallBack(this.Vgt);
    this.lqe.SetHelpCallBack(this.pcr);
    var i = [];
    let r = 0;
    for (let e = 2; e <= 8; e++) {
      var t = new EncircleSelectLevelItemGrid_1.EncircleSelectLevelItemGrid();
      t.SetIndex(r);
      var o = this.GetItem(e);
      i.push(t.CreateThenShowByActorAsync(o.GetOwner()));
      r++;
      this.Kbg.push(t);
    }
    await Promise.all(i);
    this.FNu();
  }
  OnBeforeShow() {
    this.RefreshView();
  }
  RefreshView() {
    var i = [];
    var e = ActivityEncircleController_1.ActivityEncircleController.ActivityId;
    for (const l of ConfigManager_1.ConfigManager.ActivityEncircleConfig.GetEncircleGroups(e)) {
      var r = {
        GroupId: l.Id
      };
      i.push(r);
    }
    var t = i.length;
    var o = this.Kbg.length;
    for (let e = 0; e < o; e++) {
      if (e < t) {
        this.Kbg[e].RefreshView(i[e]);
        this.Kbg[e].SetUiActive(true);
      } else {
        this.Kbg[e].SetUiActive(false);
      }
    }
  }
  FNu() {
    var e = ActivityEncircleController_1.ActivityEncircleController.GetEncircleData();
    if (e) {
      var i = ActivityEncircleController_1.ActivityEncircleController.ActivityId;
      var i = ConfigManager_1.ConfigManager.ActivityEncircleConfig?.GetEncircleGroups(i);
      const r = e.GetCurrentGroup();
      if (r !== 0 && i) {
        const t = this.GetScrollViewWithScrollbar(1);
        const o = r / i.length;
        if (!(o < 0)) {
          t.OnLateUpdate.Bind(() => {
            var e = 2 + r - 1;
            var e = this.GetItem(e);
            t.SetScrollProgress(1 - o + 0.15);
            t.OnLateUpdate.Unbind();
            ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(e, true);
          });
        }
      }
    }
  }
}
exports.EncircleSelectLevelView = EncircleSelectLevelView;
//# sourceMappingURL=EncircleSelectLevelView.js.map
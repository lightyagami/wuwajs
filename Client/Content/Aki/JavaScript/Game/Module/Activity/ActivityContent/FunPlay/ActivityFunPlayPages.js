"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityFunPlayPages = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class ActivityFunPlayPages extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.tPe = undefined;
    this.wrd = 0;
    this.Lrd = 0;
    this.Ard = undefined;
    this.Prd = () => new ActivityFunPlayPage();
    this.rHt = () => {
      if (!(this.wrd - 1 < 0)) {
        this.wrd--;
        this.I3e();
        this.Drd(this.wrd);
        this.tPe?.SelectGridProxy(this.wrd, true);
      }
    };
    this.nHt = () => {
      var t = ModelManager_1.ModelManager.ActivityFunPlayModel.GetCurrentChallengeData();
      if (t) {
        t = t.GetSharpComments();
        if (!(this.wrd + 1 > t.length - 1)) {
          this.wrd++;
          this.I3e();
          this.Drd(this.wrd);
          this.tPe?.SelectGridProxy(this.wrd, true);
        }
      }
    };
    this.Drd = t => {
      var i;
      var s = ModelManager_1.ModelManager.ActivityFunPlayModel.GetCurrentChallengeData();
      if (s) {
        i = s.GetSharpComments();
        this.xrd(t, i.length);
        i = i[t];
        this.Lrd = i.CommentId;
        this.SetTextureByPath(i.RoleHeadPath, this.GetTexture(7));
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), i.RoleName);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), i.Comment);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), i.TimeTxt, s.GetFinishTime());
        this.SetTextureByPath(i.PhotoPath, this.GetTexture(12));
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[11, UE.UIHorizontalLayout], [0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UITexture], [8, UE.UIText], [9, UE.UIText], [10, UE.UIText], [12, UE.UITexture], [13, UE.UIItem]];
    this.BtnBindInfo = [[3, this.rHt], [4, this.nHt]];
  }
  OnStart() {
    this.HOe();
  }
  HOe() {
    this.tPe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(11), this.Prd);
  }
  Refresh(t) {
    var i = ModelManager_1.ModelManager.ActivityFunPlayModel.GetCurrentChallengeData();
    if (i) {
      const e = i.GetSharpComments();
      var s = e.length <= 0;
      this.GetItem(1).SetUIActive(!s);
      this.GetItem(5).SetUIActive(s);
      this.GetItem(6).SetUIActive(!s);
      this.GetText(10).SetUIActive(!s);
      this.GetItem(13).SetUIActive(s);
      if (s) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), "Activity_105900001_Lock");
      } else {
        const e = i.GetSharpComments();
        this.wrd = t ? 0 : e.findIndex(t => t.CommentId === this.Lrd);
        if (this.wrd === -1) {
          this.wrd = 0;
        }
        this.Drd(this.wrd);
        this.RefreshPageDotLayout(e);
      }
    }
  }
  RefreshPageDotLayout(t) {
    this.GetHorizontalLayout(11).RootUIComp.SetUIActive(t.length > 1);
    if (t.length > 1) {
      this.tPe?.RefreshByData(t, () => {
        this.tPe?.SelectGridProxy(this.wrd, true);
      });
    }
  }
  xrd(t, i) {
    this.GetButton(3).RootUIComp.SetUIActive(t > 0);
    this.GetButton(4).RootUIComp.SetUIActive(t < i - 1);
  }
  SetParentSequence(t) {
    this.Ard = t;
  }
  I3e() {
    if (this.Ard?.HasSequenceNameInPlaying("Switch1")) {
      this.Ard?.StopSequenceByKey("Switch1", false, true);
    }
    this.Ard?.PlaySequence("Switch1");
  }
}
exports.ActivityFunPlayPages = ActivityFunPlayPages;
class ActivityFunPlayPage extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  Refresh() {
    this.OnDeselected();
  }
  OnSelected() {
    this.GetItem(0).SetUIActive(true);
  }
  OnDeselected() {
    this.GetItem(0).SetUIActive(false);
  }
}
//# sourceMappingURL=ActivityFunPlayPages.js.map
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
    this.gnd = 0;
    this.Cnd = 0;
    this.pnd = undefined;
    this.vnd = () => new ActivityFunPlayPage();
    this.rHt = () => {
      if (!(this.gnd - 1 < 0)) {
        this.gnd--;
        this.I3e();
        this.ynd(this.gnd);
        this.tPe?.SelectGridProxy(this.gnd, true);
      }
    };
    this.nHt = () => {
      var t = ModelManager_1.ModelManager.ActivityFunPlayModel.GetCurrentChallengeData();
      if (t) {
        t = t.GetSharpComments();
        if (!(this.gnd + 1 > t.length - 1)) {
          this.gnd++;
          this.I3e();
          this.ynd(this.gnd);
          this.tPe?.SelectGridProxy(this.gnd, true);
        }
      }
    };
    this.ynd = t => {
      var i;
      var s = ModelManager_1.ModelManager.ActivityFunPlayModel.GetCurrentChallengeData();
      if (s) {
        i = s.GetSharpComments();
        this.Snd(t, i.length);
        i = i[t];
        this.Cnd = i.CommentId;
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
    this.tPe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(11), this.vnd);
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
        this.gnd = t ? 0 : e.findIndex(t => t.CommentId === this.Cnd);
        if (this.gnd === -1) {
          this.gnd = 0;
        }
        this.ynd(this.gnd);
        this.RefreshPageDotLayout(e);
      }
    }
  }
  RefreshPageDotLayout(t) {
    this.GetHorizontalLayout(11).RootUIComp.SetUIActive(t.length > 1);
    if (t.length > 1) {
      this.tPe?.RefreshByData(t, () => {
        this.tPe?.SelectGridProxy(this.gnd, true);
      });
    }
  }
  Snd(t, i) {
    this.GetButton(3).RootUIComp.SetUIActive(t > 0);
    this.GetButton(4).RootUIComp.SetUIActive(t < i - 1);
  }
  SetParentSequence(t) {
    this.pnd = t;
  }
  I3e() {
    if (this.pnd?.HasSequenceNameInPlaying("Switch1")) {
      this.pnd?.StopSequenceByKey("Switch1", false, true);
    }
    this.pnd?.PlaySequence("Switch1");
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
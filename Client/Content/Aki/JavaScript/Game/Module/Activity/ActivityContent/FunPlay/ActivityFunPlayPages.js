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
    this.psd = 0;
    this.vsd = 0;
    this.ysd = undefined;
    this.Ssd = () => new ActivityFunPlayPage();
    this.rHt = () => {
      if (!(this.psd - 1 < 0)) {
        this.psd--;
        this.I3e();
        this.Msd(this.psd);
        this.tPe?.SelectGridProxy(this.psd, true);
      }
    };
    this.nHt = () => {
      var t = ModelManager_1.ModelManager.ActivityFunPlayModel.GetCurrentChallengeData();
      if (t) {
        t = t.GetSharpComments();
        if (!(this.psd + 1 > t.length - 1)) {
          this.psd++;
          this.I3e();
          this.Msd(this.psd);
          this.tPe?.SelectGridProxy(this.psd, true);
        }
      }
    };
    this.Msd = t => {
      var i;
      var s = ModelManager_1.ModelManager.ActivityFunPlayModel.GetCurrentChallengeData();
      if (s) {
        i = s.GetSharpComments();
        this.Esd(t, i.length);
        i = i[t];
        this.vsd = i.CommentId;
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
    this.tPe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(11), this.Ssd);
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
        this.psd = t ? 0 : e.findIndex(t => t.CommentId === this.vsd);
        if (this.psd === -1) {
          this.psd = 0;
        }
        this.Msd(this.psd);
        this.RefreshPageDotLayout(e);
      }
    }
  }
  RefreshPageDotLayout(t) {
    this.GetHorizontalLayout(11).RootUIComp.SetUIActive(t.length > 1);
    if (t.length > 1) {
      this.tPe?.RefreshByData(t, () => {
        this.tPe?.SelectGridProxy(this.psd, true);
      });
    }
  }
  Esd(t, i) {
    this.GetButton(3).RootUIComp.SetUIActive(t > 0);
    this.GetButton(4).RootUIComp.SetUIActive(t < i - 1);
  }
  SetParentSequence(t) {
    this.ysd = t;
  }
  I3e() {
    if (this.ysd?.HasSequenceNameInPlaying("Switch1")) {
      this.ysd?.StopSequenceByKey("Switch1", false, true);
    }
    this.ysd?.PlaySequence("Switch1");
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityMotorLinkageSubView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityControllerHolder_1 = require("../../ActivityControllerHolder");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../View/SubView/ActivitySubViewGeneralInfo");
const MotorLinkageButtonItem_1 = require("./Component/MotorLinkageButtonItem");
const roleAnimNameDefine = [["RoleLDark", "RoleLBright"], ["RoleMDark", "RoleMBright"], ["RoleRDark", "RoleRBright"]];
const fxDefineList = [6, 7, 5];
const buttonDefineList = [2, 3, 4];
const RESET_TIME_MS = 2000;
class ActivityMotorLinkageSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.n2f = undefined;
    this.ActivityBaseData = undefined;
    this.Het = [];
    this.sNf = undefined;
    this.aNf = undefined;
    this.DIf = e => {
      if (e === this.ActivityBaseData?.Id) {
        this.OnRefreshView();
      }
    };
    this.UOe = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetActivityViewState, false, 0);
      this.ActivityBaseData?.ReadSkipRedDot();
    };
    this.Fr = e => {
      UiManager_1.UiManager.OpenView("MotoLinkageRewardView", e);
      this.ZNf();
      this.ActivityBaseData?.SetCanSubViewPlayShowView(true);
    };
    this.CGf = e => {
      const r = this.o2f(e);
      if (!this.sNf) {
        this.sNf = [];
        this.sNf.fill(true, 0, roleAnimNameDefine.length);
      }
      this.hNf();
      let n = true;
      for (const t of this.sNf) {
        if (!t) {
          n = false;
          break;
        }
      }
      roleAnimNameDefine.forEach((e, t) => {
        var i = r === t;
        if (i) {
          this.GetItem(fxDefineList[t])?.SetUIActive(true);
          this.GetItem(fxDefineList[t])?.SetAlpha(1);
        }
        var s = this.sNf[t];
        if (s !== i || !!n) {
          this.sNf[t] = i;
          this.LevelSequencePlayer?.PlaySequencePurely(e[i ? 1 : 0]);
        }
      });
    };
    this.lNf = () => {
      this.hNf();
      this._Nf();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    e.push(this.tUm());
    this.n2f = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.n2f?.SetData(this.ActivityBaseData);
    this.n2f?.SetClickFunc(this.UOe);
    e.push(this.n2f.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    this.n2f?.SetBtnText("MotorLinkage_Go");
    this.ActivityBaseData?.ReadRedDot();
  }
  OnRefreshView() {
    for (const e of this.Het) {
      e.Refresh();
    }
    this.Nqe();
    this.BNe();
    this.f4e();
  }
  OnBeforeDestroy() {
    this.hNf();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.DIf);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.DIf);
  }
  f4e() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshActivityTab, this.ActivityBaseData.Id);
  }
  PlaySubViewSequence(e, t) {
    let i = e;
    if (e === "ShowView") {
      i = this.ActivityBaseData?.CanSubViewPlayShowView() ? "ShowView02" : "ShowView01";
    }
    super.PlaySubViewSequence(i, t);
  }
  Nqe() {
    var e = this.ActivityBaseData.GetAllIpCurrentProgress();
    var t = this.ActivityBaseData.GetAllIpTotalProgress();
    this.GetText(1)?.SetText(e + "/" + t);
  }
  BNe() {
    var e = this.ActivityBaseData.HasAnyRewardCanReceive();
    var t = this.ActivityBaseData.HasSkipRedDot();
    this.n2f?.SetFunctionRedDotVisible(t || e);
  }
  async tUm() {
    const s = this.ActivityBaseData.GetSortedIpList();
    const r = [];
    buttonDefineList.forEach((e, t) => {
      var i = new MotorLinkageButtonItem_1.MotorLinkageButton();
      this.Het.push(i);
      i.SetIpId(s[t]);
      i.SetClickCallback(this.Fr);
      i.SetEnterCallback(this.CGf);
      i.SetExitCallback(this.lNf);
      r.push(i.CreateThenShowByActorAsync(this.GetItem(e).GetOwner()));
    });
    await Promise.all(r);
  }
  OnCommonViewStateChange(e) {
    this.LevelSequencePlayer?.StopPlayingSequence();
    this.LevelSequencePlayer?.PlaySequencePurely(e ? "ShowView01" : "HideView01", true);
    if (e) {
      this.ZNf();
    }
  }
  ZNf() {
    this.hNf();
    this.Sbo();
  }
  Sbo() {
    if (this.sNf) {
      roleAnimNameDefine.forEach((e, t) => {
        var i = fxDefineList[t];
        this.GetItem(i)?.SetUIActive(false);
        var i = this.sNf[t];
        if (!i) {
          this.sNf[t] = true;
          this.LevelSequencePlayer?.PlaySequencePurely(e[1]);
        }
      });
    }
  }
  hNf() {
    if (this.aNf) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.aNf);
      this.aNf = undefined;
    }
  }
  _Nf() {
    this.aNf = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.Sbo();
      this.aNf = undefined;
    }, RESET_TIME_MS);
  }
  o2f(t) {
    return ActivityControllerHolder_1.ActivityControllerHolder.ActivityMotorLinkageController.ActivityData.GetSortedIpList().findIndex(e => e === t);
  }
}
exports.ActivityMotorLinkageSubView = ActivityMotorLinkageSubView;
//# sourceMappingURL=ActivityMotorLinkageSubView.js.map
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
    this.e4f = undefined;
    this.ActivityBaseData = undefined;
    this.Het = [];
    this.j9f = undefined;
    this.$9f = undefined;
    this.MRf = e => {
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
      this.VHf();
      this.ActivityBaseData?.SetCanSubViewPlayShowView(true);
    };
    this.A6f = e => {
      const r = this.Z3f(e);
      if (!this.j9f) {
        this.j9f = [];
        this.j9f.fill(true, 0, roleAnimNameDefine.length);
      }
      this.W9f();
      let n = true;
      for (const t of this.j9f) {
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
        var s = this.j9f[t];
        if (s !== i || !!n) {
          this.j9f[t] = i;
          this.LevelSequencePlayer?.StopSequenceByKey(e[i ? 0 : 1]);
          this.LevelSequencePlayer?.PlaySequencePurely(e[i ? 1 : 0]);
        }
      });
    };
    this.Q9f = () => {
      this.W9f();
      this.K9f();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    e.push(this.CDm());
    this.e4f = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.e4f?.SetData(this.ActivityBaseData);
    this.e4f?.SetClickFunc(this.UOe);
    e.push(this.e4f.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    this.e4f?.SetBtnText("MotorLinkage_Go");
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
    this.W9f();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.MRf);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.MRf);
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
    this.e4f?.SetFunctionRedDotVisible(t || e);
  }
  async CDm() {
    const s = this.ActivityBaseData.GetSortedIpList();
    const r = [];
    buttonDefineList.forEach((e, t) => {
      var i = new MotorLinkageButtonItem_1.MotorLinkageButton();
      this.Het.push(i);
      i.SetIpId(s[t]);
      i.SetClickCallback(this.Fr);
      i.SetEnterCallback(this.A6f);
      i.SetExitCallback(this.Q9f);
      r.push(i.CreateThenShowByActorAsync(this.GetItem(e).GetOwner()));
    });
    await Promise.all(r);
  }
  OnCommonViewStateChange(e) {
    this.LevelSequencePlayer?.StopPlayingSequence();
    this.LevelSequencePlayer?.PlaySequencePurely(e ? "ShowView01" : "HideView01", true);
    if (e) {
      this.VHf();
    }
  }
  VHf() {
    this.W9f();
    this.Sbo();
  }
  Sbo() {
    if (this.j9f) {
      roleAnimNameDefine.forEach((e, t) => {
        var i = fxDefineList[t];
        this.GetItem(i)?.SetUIActive(false);
        var i = this.j9f[t];
        if (!i) {
          this.j9f[t] = true;
          this.LevelSequencePlayer?.StopSequenceByKey(e[0]);
          this.LevelSequencePlayer?.PlaySequencePurely(e[1]);
        }
      });
    }
  }
  W9f() {
    if (this.$9f) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.$9f);
      this.$9f = undefined;
    }
  }
  K9f() {
    this.$9f = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.Sbo();
      this.$9f = undefined;
    }, RESET_TIME_MS);
  }
  Z3f(t) {
    return ActivityControllerHolder_1.ActivityControllerHolder.ActivityMotorLinkageController.ActivityData.GetSortedIpList().findIndex(e => e === t);
  }
}
exports.ActivityMotorLinkageSubView = ActivityMotorLinkageSubView;
//# sourceMappingURL=ActivityMotorLinkageSubView.js.map
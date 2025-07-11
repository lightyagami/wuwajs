"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeTrackControlView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LongPressButtonItem_1 = require("../../Module/Common/Button/LongPressButtonItem");
const SceneTeamEvent_1 = require("../../Module/SceneTeam/SceneTeamEvent");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const TimeTrackControlPoint_1 = require("./TimeTrackControlPoint");
const ANGLE_RANGE = 26;
const ANGLE_MIN = -13;
const ANGLE_MAX = 13;
const LOOP_AKEVENT = "play_ui_com_time_loop";
const HIGHLIGHT_AKEVENT = "play_ui_com_time_bell";
class TimeTrackControlView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.lwe = undefined;
    this._we = 0;
    this.uwe = undefined;
    this.cwe = 0;
    this.mwe = -0;
    this.dwe = 0;
    this.Cwe = 0;
    this.gwe = -0;
    this.fwe = -0;
    this.pwe = -0;
    this.vwe = false;
    this.Mwe = false;
    this.$Ar = false;
    this.Ewe = -0;
    this.Swe = undefined;
    this.ywe = undefined;
    this.Iwe = undefined;
    this.Twe = undefined;
    this.Lwe = (t, e) => {
      if (t.CalculateType === 0) {
        ControllerHolder_1.ControllerHolder.TimeTrackController.HandleTimeTrackControlViewClose();
        this.$Ar = true;
        this.CloseMe();
      }
    };
    this.Dwe = (t, e) => {
      if (e === Protocol_1.Aki.Protocol.Q4n.Proto_ErrTimelineMove) {
        this.Rwe();
      } else if (this.dwe !== t) {
        if (this.uwe) {
          this.uwe[this.dwe].ToggleSelected(false);
        }
        this.dwe = t;
        this.fwe = this.Uwe(t);
        this.pwe = (this.fwe - this.gwe) / this.Ewe / CommonDefine_1.MILLIONSECOND_PER_SECOND;
        this.vwe = true;
        AudioSystem_1.AudioSystem.PostEvent(LOOP_AKEVENT);
      }
    };
    this.Awe = () => {
      ControllerHolder_1.ControllerHolder.TimeTrackController.HandleTimeTrackControlViewClose();
      this.Mwe = true;
      this.CloseMe();
    };
    this.Pwe = () => {
      this.xwe(true);
    };
    this.wwe = () => {
      this.xwe(false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UISprite]];
    this.BtnBindInfo = [[7, this.Awe]];
  }
  OnStart() {
    this.cwe = ANGLE_RANGE;
    this.Cwe = ModelManager_1.ModelManager.TimeTrackControlModel.GetConfigStatesCounts();
    this.Ewe = ModelManager_1.ModelManager.TimeTrackControlModel.GetConfigSegmentTime();
    this._we = this.Cwe - 2 ? this.Cwe - 2 : 0;
    if (this._we) {
      this.Bwe();
    } else {
      this.mwe = this.cwe;
      this._we = 0;
    }
    this.dwe = ModelManager_1.ModelManager.TimeTrackControlModel.ControlPoint;
    this.gwe = this.Uwe(this.dwe);
    this.Swe = this.GetItem(5);
    this.ywe = Rotator_1.Rotator.Create(0, this.gwe, 0);
    this.Swe.SetUIRelativeRotation(this.ywe.ToUeRotator());
    this.vwe = false;
    var e = this.GetItem(4);
    this.lwe = this.GetItem(3);
    this.uwe = new Array();
    e.SetUIActive(false);
    for (let t = 0; t < this.Cwe; t++) {
      var i = LguiUtil_1.LguiUtil.CopyItem(e, this.lwe);
      i.SetUIActive(true);
      var s = this.Uwe(t);
      var i = new TimeTrackControlPoint_1.TimeTrackControlPoint(i, t, s);
      i.UpdateState(ModelManager_1.ModelManager.TimeTrackControlModel.IsControlPointUsable(t));
      this.uwe.push(i);
    }
    this.uwe[this.dwe].ToggleSelected(true);
    this.bwe();
    this.Iwe = new LongPressButtonItem_1.LongPressButtonItem(this.GetButton(0), 4, () => {
      this.wwe();
    });
    this.Twe = new LongPressButtonItem_1.LongPressButtonItem(this.GetButton(1), 4, () => {
      this.Pwe();
    });
  }
  Bwe() {
    this.mwe = this.cwe / (this._we + 1);
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTimeTrackControlUpdate, this.Dwe);
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTimeTrackControlUpdate, this.Dwe);
  }
  OnAddEventListener() {
    if (!EventSystem_1.EventSystem.HasWithTarget(SceneTeamEvent_1.SceneTeam.Local, EventDefine_1.EEventName.CharBeHitLocal, this.Lwe)) {
      EventSystem_1.EventSystem.AddWithTarget(SceneTeamEvent_1.SceneTeam.Local, EventDefine_1.EEventName.CharBeHitLocal, this.Lwe);
    }
  }
  OnRemoveEventListener() {
    if (EventSystem_1.EventSystem.HasWithTarget(SceneTeamEvent_1.SceneTeam.Local, EventDefine_1.EEventName.CharBeHitLocal, this.Lwe)) {
      EventSystem_1.EventSystem.RemoveWithTarget(SceneTeamEvent_1.SceneTeam.Local, EventDefine_1.EEventName.CharBeHitLocal, this.Lwe);
    }
  }
  OnBeforeDestroy() {
    this.Iwe?.Clear();
    this.Twe?.Clear();
    this.uwe.forEach(t => {
      t.Destroy();
    });
    this.uwe = undefined;
    AudioSystem_1.AudioSystem.ExecuteAction(LOOP_AKEVENT, 0);
    if (!this.Mwe && !this.$Ar) {
      ControllerHolder_1.ControllerHolder.TimeTrackController.HandleTimeTrackControlViewClose();
    }
  }
  OnTick(t) {
    if (this.vwe) {
      t = t * this.pwe;
      this.gwe += t;
      if (Math.abs(this.fwe - this.gwe) < Math.abs(t)) {
        this.qwe();
      }
      this.ywe.Yaw = this.gwe;
      this.Swe.SetUIRelativeRotation(this.ywe.ToUeRotator());
    }
  }
  qwe() {
    this.gwe = this.fwe;
    this.ywe.Yaw = this.gwe;
    this.Swe.SetUIRelativeRotation(this.ywe.ToUeRotator());
    AudioSystem_1.AudioSystem.ExecuteAction(LOOP_AKEVENT, 0);
    this.vwe = false;
    if (this.uwe) {
      this.uwe[this.dwe].ToggleSelected(true);
      for (const e of this.uwe) {
        var t = ModelManager_1.ModelManager.TimeTrackControlModel.IsControlPointUsable(e.Index);
        e.UpdateState(t);
        if (t) {
          AudioSystem_1.AudioSystem.PostEvent(HIGHLIGHT_AKEVENT);
        }
      }
      this.bwe();
    }
  }
  Uwe(t) {
    return MathUtils_1.MathUtils.RangeClamp(t * this.mwe, 0, ANGLE_RANGE, ANGLE_MIN, ANGLE_MAX);
  }
  xwe(t) {
    if (!this.vwe) {
      if (ModelManager_1.ModelManager.TimeTrackControlModel.CanUpdated) {
        if (t) {
          if (this.dwe < this.Cwe - 1) {
            ControllerHolder_1.ControllerHolder.TimeTrackController.TimelineTraceControlRequest(true);
          }
        } else if (this.dwe > 0) {
          ControllerHolder_1.ControllerHolder.TimeTrackController.TimelineTraceControlRequest(false);
        }
      }
    }
  }
  Rwe() {
    this.UiViewSequence.PlaySequencePurely("Shake", true, false);
  }
  bwe() {
    let t = this.dwe;
    let e = this.dwe;
    for (t -= 1; t >= 0 && ModelManager_1.ModelManager.TimeTrackControlModel.IsControlPointUsable(t); t--);
    var i;
    if (t >= 0) {
      i = (t + 1) / (this.Cwe - 1);
      this.GetSprite(2).SetUIActive(true);
      this.GetSprite(2).SetFillAmount(i);
    } else {
      this.GetSprite(2).SetUIActive(false);
    }
    e += 1;
    for (; e < this.Cwe && ModelManager_1.ModelManager.TimeTrackControlModel.IsControlPointUsable(e); e++);
    if (e < this.Cwe) {
      i = (this.Cwe - e) / (this.Cwe - 1);
      this.GetSprite(8).SetUIActive(true);
      this.GetSprite(8).SetFillAmount(i);
    } else {
      this.GetSprite(8).SetUIActive(false);
    }
  }
}
exports.TimeTrackControlView = TimeTrackControlView;
//# sourceMappingURL=TimeTrackControlView.js.map
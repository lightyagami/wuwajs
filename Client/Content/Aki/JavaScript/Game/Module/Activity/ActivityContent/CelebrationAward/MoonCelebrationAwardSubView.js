"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoonCelebrationAwardSubView = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityTimePointRewardController_1 = require("../TimePointReward/ActivityTimePointRewardController");
class MoonCelebrationAwardSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityTimePointRewardData = undefined;
    this.orm = 0;
    this.nrm = 0;
    this.L11 = () => {
      var e = this.ActivityTimePointRewardData.GetRewardDataList();
      if (e[0].RewardState === 1) {
        ActivityTimePointRewardController_1.ActivityTimePointRewardController.GetRewardById(this.ActivityTimePointRewardData.Id, e[0].Id);
      }
    };
    this.srm = () => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.orm);
    };
    this.arm = () => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.nrm);
    };
    this.wNe = e => {
      if (this.ActivityBaseData.Id === e) {
        this.sqe();
        this.Nda();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[4, UE.UIButtonComponent], [6, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIText], [10, UE.UIText], [0, UE.UIButtonComponent], [1, UE.UIText], [5, UE.UIText], [7, UE.UIText], [8, UE.UITexture], [9, UE.UITexture], [11, UE.UIItem]];
    this.BtnBindInfo = [[0, this.L11], [4, this.srm], [6, this.arm]];
  }
  OnSetData() {
    this.ActivityTimePointRewardData = this.ActivityBaseData;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
  }
  OnStart() {
    this.GetText(10).SetText(this.ActivityBaseData.GetTitle());
    this.gxl();
    this.sqe();
    this.Nda();
  }
  sqe() {
    var e;
    var i;
    var t = this.ActivityTimePointRewardData.GetRewardDataList();
    let r = false;
    for ([e, i] of ConfigManager_1.ConfigManager.ActivityTimePointRewardConfig.GetTimePointRewardById(t[0].Id).RewardItem) {
      var o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
      if (o) {
        if (r) {
          this.SetTextureByPath(o.Icon, this.GetTexture(9));
          this.GetText(7).SetText("X" + i);
          this.nrm = e;
        } else {
          this.SetTextureByPath(o.Icon, this.GetTexture(8));
          this.GetText(5).SetText("X" + i);
          r = true;
          this.orm = e;
        }
      }
    }
  }
  Nda() {
    var e = this.ActivityTimePointRewardData.GetRewardDataList();
    var i = e[0].RewardState === 0;
    this.GetText(2).SetUIActive(i);
    if (i) {
      i = e[0].RewardTime - TimeUtil_1.TimeUtil.GetServerTimeStamp();
      this.w11(i);
      if (i <= 1) {
        e[0].HasUnlock = true;
      }
      this.GetButton(0).SetSelfInteractive(false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Moon_Reward_Lock");
      this.GetItem(11).SetUIActive(true);
    } else {
      i = e[0].RewardState === 1;
      this.GetButton(0).SetSelfInteractive(i);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i ? "Moon_Reward_Unlock" : "Moon_Reward_Finish");
      this.GetItem(11).SetUIActive(false);
      if (!i) {
        this.GetButton(4).SetSelfInteractive(false);
        this.GetButton(6).SetSelfInteractive(false);
      }
    }
  }
  w11(e) {
    var i;
    var t;
    var e = e * TimeUtil_1.TimeUtil.Millisecond;
    if (e >= CommonDefine_1.SECOND_PER_DAY) {
      t = e / TimeUtil_1.TimeUtil.Hour;
      i = Math.floor(t / TimeUtil_1.TimeUtil.OneDayHourCount);
      t = Math.ceil(t - i * TimeUtil_1.TimeUtil.OneDayHourCount);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "CelebrationAwardLeftTimeDay", `<color=#f39233>${i}</color>`, `<color=#f39233>${t}</color>`);
    } else if (e >= CommonDefine_1.SECOND_PER_HOUR) {
      i = e / TimeUtil_1.TimeUtil.Minute;
      t = Math.floor(i / TimeUtil_1.TimeUtil.Minute);
      i = Math.ceil(i - t * TimeUtil_1.TimeUtil.Minute);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "CelebrationAwardLeftTimeHour", `<color=#f39233>${t}</color>`, `<color=#f39233>${i}</color>`);
    } else if (e >= CommonDefine_1.SECOND_PER_MINUTE) {
      t = e;
      i = Math.floor(e / TimeUtil_1.TimeUtil.Minute);
      t = Math.ceil(t - i * TimeUtil_1.TimeUtil.Minute);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "CelebrationAwardLeftTimeSecond", `<color=#f39233>${i}</color>`, `<color=#f39233>${t}</color>`);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "CelebrationAwardLeftTimeLessSecond", `<color=#f39233>${Math.max(Math.floor(e), 1)}</color>`);
    }
  }
  gxl() {
    var [e, i] = ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(this.ActivityTimePointRewardData);
    this.GetText(3).SetUIActive(e);
    if (e) {
      this.GetText(3).SetText(i);
    }
  }
  OnTimer(e) {
    this.Nda();
    this.gxl();
  }
}
exports.MoonCelebrationAwardSubView = MoonCelebrationAwardSubView;
//# sourceMappingURL=MoonCelebrationAwardSubView.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CelebrationAwardSubView = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityTimePointRewardController_1 = require("../TimePointReward/ActivityTimePointRewardController");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
class CelebrationAwardSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityTimePointRewardData = undefined;
    this.LNe = undefined;
    this.b11 = undefined;
    this.R11 = undefined;
    this.wM1 = false;
    this.qO1 = false;
    this.L11 = () => {
      var i = this.ActivityTimePointRewardData.GetRewardDataList();
      if (i[0].RewardState === 1) {
        ActivityTimePointRewardController_1.ActivityTimePointRewardController.GetRewardById(this.ActivityTimePointRewardData.Id, i[0].Id);
      }
    };
    this.u6e = i => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(i.Data[0].ItemId);
    };
    this.wNe = i => {
      if (this.ActivityBaseData.Id === i) {
        this.sqe();
        this.Nda();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [3, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UIText], [0, UE.UIItem], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.SpineSkeletonAnimationComponent], [12, UE.SpineSkeletonAnimationComponent]];
    this.BtnBindInfo = [[7, this.L11]];
  }
  OnSetData() {
    this.ActivityTimePointRewardData = this.ActivityBaseData;
  }
  async OnBeforeStartAsync() {
    var i = [];
    var e = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    i.push(this.LNe.CreateThenShowByActorAsync(e.GetOwner()));
    this.b11 = new SmallItemGrid_1.SmallItemGrid();
    i.push(this.b11.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()));
    this.b11.BindOnExtendToggleClicked(this.u6e);
    this.R11 = new SmallItemGrid_1.SmallItemGrid();
    i.push(this.R11.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()));
    this.R11.BindOnExtendToggleClicked(this.u6e);
    await Promise.all(i);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
  }
  OnStart() {
    var i = this.ActivityTimePointRewardData.LocalConfig;
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    this.gxl();
    var e = !StringUtils_1.StringUtils.IsEmpty(i?.DescTheme);
    this.LNe.SetSubTitleVisible(e);
    if (e) {
      this.LNe.SetSubTitleByTextId(i.DescTheme);
    }
    this.GetSpine(11).SetAnimation(0, "start", false).AnimationComplete.Add(() => {
      this.GetSpine(11).SetAnimation(0, "idle", true);
    });
    this.sqe();
    this.Nda();
  }
  OnBeforeShow() {
    if (this.qO1) {
      this.PlaySubViewSequence("ShowView");
    } else {
      this.PlaySubViewSequence("Start1");
      this.qO1 = true;
    }
  }
  sqe() {
    var i;
    var e;
    var t = this.ActivityTimePointRewardData.GetRewardDataList();
    var r = [];
    for ([i, e] of ConfigManager_1.ConfigManager.ActivityTimePointRewardConfig.GetTimePointRewardById(t[0].Id).RewardItem) {
      var s = [{
        IncId: 0,
        ItemId: i
      }, e];
      var s = {
        Data: s,
        Type: 4,
        ItemConfigId: s[0].ItemId,
        BottomText: s[1].toString(),
        IsLockVisible: t[0].RewardState === 0,
        IsReceivedVisible: t[0].RewardState === 2
      };
      r.push(s);
    }
    this.b11.Apply(r[0]);
    this.b11.BindOnCanExecuteChange(() => false);
    this.R11.Apply(r[1]);
    this.R11.BindOnCanExecuteChange(() => false);
  }
  Nda() {
    var i = this.ActivityTimePointRewardData.GetRewardDataList();
    var e = i[0].RewardState === 0;
    this.GetText(4).SetUIActive(e);
    this.GetText(5).SetUIActive(e);
    this.GetText(3).SetUIActive(e);
    this.GetItem(6).SetUIActive(!e);
    if (e) {
      e = i[0].RewardTime - TimeUtil_1.TimeUtil.GetServerTimeStamp();
      this.w11(e);
      if (e <= 1) {
        i[0].HasUnlock = true;
      }
    } else {
      e = i[0].RewardState === 1;
      this.GetText(8).SetUIActive(!e);
      this.GetButton(7).RootUIComp.SetUIActive(e);
      if (!this.wM1) {
        this.GetSpine(12).SetAnimation(0, "start", false).AnimationComplete.Add(() => {
          this.GetSpine(12).SetAnimation(0, "idle", true);
        });
        this.wM1 = true;
      }
    }
  }
  w11(i) {
    var e;
    var t;
    var i = i * TimeUtil_1.TimeUtil.Millisecond;
    if (i >= CommonDefine_1.SECOND_PER_DAY) {
      t = i / TimeUtil_1.TimeUtil.Hour;
      e = Math.floor(t / TimeUtil_1.TimeUtil.OneDayHourCount);
      t = Math.ceil(t - e * TimeUtil_1.TimeUtil.OneDayHourCount);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "CelebrationAwardLeftTimeDay", `<color=#f39233>${e}</color>`, `<color=#f39233>${t}</color>`);
    } else if (i >= CommonDefine_1.SECOND_PER_HOUR) {
      e = i / TimeUtil_1.TimeUtil.Minute;
      t = Math.floor(e / TimeUtil_1.TimeUtil.Minute);
      e = Math.ceil(e - t * TimeUtil_1.TimeUtil.Minute);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "CelebrationAwardLeftTimeHour", `<color=#f39233>${t}</color>`, `<color=#f39233>${e}</color>`);
    } else if (i >= CommonDefine_1.SECOND_PER_MINUTE) {
      t = i;
      e = Math.floor(i / TimeUtil_1.TimeUtil.Minute);
      t = Math.ceil(t - e * TimeUtil_1.TimeUtil.Minute);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "CelebrationAwardLeftTimeSecond", `<color=#f39233>${e}</color>`, `<color=#f39233>${t}</color>`);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "CelebrationAwardLeftTimeLessSecond", `<color=#f39233>${Math.max(Math.floor(i), 1)}</color>`);
    }
  }
  gxl() {
    var [i, e] = ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(this.ActivityTimePointRewardData);
    this.LNe.SetTimeTextVisible(i);
    if (i) {
      this.LNe.SetTimeTextByText(e);
    }
  }
  OnTimer(i) {
    this.Nda();
    this.gxl();
  }
}
exports.CelebrationAwardSubView = CelebrationAwardSubView;
//# sourceMappingURL=CelebrationAwardSubView.js.map
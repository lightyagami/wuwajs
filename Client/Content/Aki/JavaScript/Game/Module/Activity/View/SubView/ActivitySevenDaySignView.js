"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySevenDaySignView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const RoleController_1 = require("../../../RoleUi/RoleController");
const WeaponTrialData_1 = require("../../../Weapon/Data/WeaponTrialData");
const ActivitySevenDaySignController_1 = require("../../ActivityContent/SevenDaySign/ActivitySevenDaySignController");
const ActivitySevenDaySignDefine_1 = require("../../ActivityContent/SevenDaySign/ActivitySevenDaySignDefine");
const ActivitySubViewBase_1 = require("./ActivitySubViewBase");
const ITEM_START_INDEX = 4;
const SIGN_DAY_COUNT = 7;
class ActivitySevenDaySignView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.x5e = undefined;
    this.w5e = undefined;
    this.k3e = e => {
      if (this.F3e(e)) {
        ActivitySevenDaySignController_1.ActivitySevenDaySignController.GetRewardByDay(this.w5e.Id, e);
      } else if (e === this.w5e.GetImportantItemIndex()) {
        this.B5e();
      }
    };
    this.B5e = () => {
      var e = ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig?.GetActivitySignById(this.w5e.Id);
      switch (e.ImportantRewardType) {
        case 1:
          RoleController_1.RoleController.OpenRoleMainView(1, 0, e.PreviewList);
          break;
        case 2:
          var i = [];
          for (const n of e.PreviewList) {
            var t = new WeaponTrialData_1.WeaponTrialData();
            t.SetTrialId(n);
            i.push(t);
          }
          var r = {
            WeaponDataList: i,
            SelectedIndex: 0
          };
          UiManager_1.UiManager.OpenView("WeaponPreviewView", r);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[3, this.B5e]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.x5e = [];
    var r = this.w5e.GetImportantItemIndex();
    for (let i = 0; i < SIGN_DAY_COUNT; i++) {
      let e = undefined;
      var n = this.GetItem(ITEM_START_INDEX + i);
      if (r >= 0 && r === i) {
        (e = new ActivitySevenDaySignDefine_1.ImportantRewardItem()).BigIconPath = this.w5e?.GetBigRewardIcon(this.w5e.Id) ?? "";
      } else {
        e = new ActivitySevenDaySignDefine_1.NormalRewardItem();
      }
      this.x5e.push(e);
      e.SkipDestroyActor = true;
      e.OnClickToGet = this.k3e;
      t.push(e.CreateThenShowByActorAsync(n.GetOwner()));
    }
    await Promise.all(t);
  }
  OnBeforeShow() {
    for (const e of this.x5e) {
      this.AddChild(e);
    }
  }
  OnSetData() {
    this.w5e = this.ActivityBaseData;
  }
  OnTimer(e) {
    var [i, t] = this.GetTimeVisibleAndRemainTime();
    this.GetText(1).SetUIActive(i);
    if (i) {
      this.GetText(1).SetText(t);
    }
  }
  OnBeforeDestroy() {
    for (const e of this.x5e) {
      this.AddChild(e);
    }
  }
  b5e() {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.w5e.LocalConfig.Desc);
  }
  OnRefreshView() {
    this.GetText(0).SetText(this.w5e.GetTitle());
    this.GetText(2).SetText(this.b5e());
    this.jqe();
  }
  jqe() {
    this.OnTimer(1);
    for (let e = 0; e < SIGN_DAY_COUNT; e++) {
      var i = this.w5e.GetRewardByDay(e);
      var t = this.w5e.GetRewardStateByDay(e);
      var i = i[0];
      var r = this.x5e[e];
      if (r) {
        r.RefreshByData(i, t, e);
      }
    }
    var e = this.w5e.GetImportantRewardType() !== 0;
    this.GetButton(3)?.RootUIComp.SetUIActive(e);
    this.GetButton(3)?.RootUIComp.SetRaycastTarget(e);
  }
  F3e(e) {
    return this.w5e.GetRewardStateByDay(e) === Protocol_1.Aki.Protocol.zps.CMs;
  }
}
exports.ActivitySevenDaySignView = ActivitySevenDaySignView;
//# sourceMappingURL=ActivitySevenDaySignView.js.map
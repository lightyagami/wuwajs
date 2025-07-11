"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonMowingDropDownItem = undefined;
const ue_1 = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const KillMonstersScoresByInstanceID_1 = require("../../../../Core/Define/ConfigQuery/KillMonstersScoresByInstanceID");
const TakeWeedsDifficultyById_1 = require("../../../../Core/Define/ConfigQuery/TakeWeedsDifficultyById");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ActivityMowingController_1 = require("../../Activity/ActivityContent/Mowing/ActivityMowingController");
const CommonDropDown_1 = require("../../Common/DropDown/CommonDropDown");
const MowingDifficultyDropDownPanel_1 = require("../MowingDifficultyDropDownPanel");
class InstanceDungeonMowingDropDownItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Uth = undefined;
    this.NUe = undefined;
    this.u_i = [];
    this.c_i = undefined;
    this.m_i = undefined;
    this.d_i = (i, t) => new MowingDifficultyDropDownPanel_1.DropDownItem(i);
    this.C_i = i => new MowingDifficultyDropDownPanel_1.DropDownTitle(i);
    this.g_i = i => i;
    this.f_i = (i, t) => {
      var e = ActivityMowingController_1.ActivityMowingController.GetMowingActivityData();
      if (e) {
        if (this.m_i) {
          ActivityMowingController_1.ActivityMowingController.RequestSetDifficultyAll(e.Id, t.Id);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Activity", 37, "当前没有割草活动副本数据");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Activity", 37, "当前没有割草活动数据");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIItem]];
    this.BtnBindInfo = [];
  }
  async OnBeforeStartAsync() {
    await this.p_i();
  }
  async p_i() {
    this.c_i = new CommonDropDown_1.CommonDropDown(this.GetItem(0), this.d_i, this.C_i);
    this.c_i.SetOnSelectCall(this.f_i);
    await this.c_i.Init();
  }
  OnStart() {
    this.AddChild(this.c_i);
    if (this.Uth) {
      this.RefreshItem(this.Uth.InstanceId);
    }
  }
  v_i() {
    var i = KillMonstersScoresByInstanceID_1.configKillMonstersScoresByInstanceID.GetConfig(this.NUe);
    if (!i || i.DifficultyOptions.length === 0) {
      return this.u_i;
    }
    var t = [];
    for (const e of i.DifficultyOptions) {
      t.push(TakeWeedsDifficultyById_1.configTakeWeedsDifficultyById.GetConfig(e));
    }
    return t;
  }
  RefreshItem(i) {
    if (this.InAsyncLoading()) {
      this.Uth = {
        InstanceId: i
      };
    } else {
      this.NUe = i;
      this.m_i = KillMonstersScoresByInstanceID_1.configKillMonstersScoresByInstanceID.GetConfig(this.NUe);
      if (i = ActivityMowingController_1.ActivityMowingController.GetMowingActivityData()) {
        this.c_i?.InitScroll(this.v_i(), this.g_i, i.GetLevelDiffIndex(this.NUe));
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Activity", 37, "当前没有割草活动数据");
      }
    }
  }
}
exports.InstanceDungeonMowingDropDownItem = InstanceDungeonMowingDropDownItem;
//# sourceMappingURL=InstanceDungeonMowingDropDownItem.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeginnerCarnivalSubView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const BeginnerCarnivalController_1 = require("./BeginnerCarnivalController");
const ROLE_TAB_INDEX = 5;
const CARNIVAL_SHOP_TAB_ID = 5;
class BeginnerCarnivalSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.E$1 = undefined;
    this.uxl = undefined;
    this.LNe = undefined;
    this.UNe = undefined;
    this.qy1 = () => {
      var i;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        UiManager_1.UiManager.OpenView("BeginnerCarnivalMainView");
      } else {
        i = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", i);
      }
    };
    this.S$1 = () => {
      var i;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        UiManager_1.UiManager.OpenView("BeginnerCarnivalRoleTaskView");
      } else {
        i = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", i);
      }
    };
    this.zDo = () => {
      var i;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        i = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData();
        ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewWithTab(3, CARNIVAL_SHOP_TAB_ID);
        i.SetShopEnter();
      } else {
        i = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", i);
      }
    };
    this.Lsu = () => {
      var i;
      var e;
      var t;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        i = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData();
        e = ModelManager_1.ModelManager.GachaModel.GetGachaInfo(i.GachaId[0]);
        t = ModelManager_1.ModelManager.GachaModel.GetGachaInfo(i.GachaId[1]);
        if (e || t) {
          ControllerHolder_1.ControllerHolder.GachaController.OpenGachaView(e ? i.GachaId[0] : i.GachaId[1]);
        } else {
          ControllerHolder_1.ControllerHolder.GachaController.OpenGachaView();
        }
        i.SetGachaEnter();
      } else {
        t = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [9, UE.UIText], [7, UE.UIItem], [6, UE.UITexture], [5, UE.UITexture], [14, UE.UIItem], [10, UE.UIButtonComponent], [11, UE.UIItem], [13, UE.UIItem], [12, UE.UIButtonComponent], [8, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem]];
    this.BtnBindInfo = [[4, this.S$1], [12, this.Lsu], [10, this.zDo]];
  }
  OnSetData() {
    this.E$1 = this.ActivityBaseData;
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(3);
    this.uxl = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.E$1);
    await this.uxl.CreateThenShowByActorAsync(i.GetOwner());
    this.uxl.FunctionButton.SetFunction(this.qy1);
    var i = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    await this.LNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(2);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    await this.UNe.CreateThenShowByActorAsync(i.GetOwner());
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
    var i = this.ActivityBaseData.GetPreviewReward();
    this.UNe.RefreshItemLayout(i);
  }
  OnStart() {
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    this.GetItem(15).SetUIActive(i === 1);
    this.GetItem(16).SetUIActive(i === 0);
    this.Pqe();
  }
  Pqe() {
    var i = this.ActivityBaseData.LocalConfig;
    var e = i.DescTheme;
    var i = i.Desc;
    var t = !StringUtils_1.StringUtils.IsEmpty(e);
    this.LNe.SetSubTitleVisible(t);
    if (t) {
      this.LNe.SetSubTitleByTextId(e);
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i);
  }
  mGe() {
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    var [i, e] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i);
    if (i) {
      this.LNe.SetTimeTextByText(e);
    }
  }
  OnRefreshView() {
    this.mGe();
    const e = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData();
    var t = e.GetTaskDataById(e.GetRoleTaskId);
    if (t) {
      var t = t.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken;
      this.GetItem(7).SetUIActive(t);
      this.GetTexture(6).SetUIActive(t);
      var t = e.ChoseRoleId;
      var r = t > 0;
      this.GetItem(8).SetUIActive(!r);
      this.GetTexture(5).SetUIActive(r);
      if (r) {
        r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
        this.SetTextureByPath(r.RoleHeadIcon, this.GetTexture(5));
        this.SetTextureByPath(r.RoleHeadIcon, this.GetTexture(6));
      }
      var t = ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalParam(BeginnerCarnivalController_1.BeginnerCarnivalController.ActivityId);
      this.GetText(9).SetText(`<color=#f5cf47>${e.GetCurrentItemCount()}</color>/${t?.AllCount}`);
      this.GetItem(14).SetUIActive(e.GetRoleGetTaskTabRedDotShow(ROLE_TAB_INDEX));
      var r = ModelManager_1.ModelManager.FunctionModel.IsOpen(10009);
      if (r) {
        t = ModelManager_1.ModelManager.GachaModel.GetGachaInfo(e.GachaId[0]);
        r = ModelManager_1.ModelManager.GachaModel.GetGachaInfo(e.GachaId[1]);
        this.GetButton(12).RootUIComp.SetUIActive(t !== undefined || r !== undefined);
      } else {
        this.GetButton(12).RootUIComp.SetUIActive(false);
      }
      let i = false;
      for (const n of ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(3, CARNIVAL_SHOP_TAB_ID)) {
        const e = n.GetRemainingData();
        if (e && e.Count > 0) {
          i = true;
          break;
        }
      }
      t = ModelManager_1.ModelManager.FunctionModel.IsOpen(10010);
      this.GetButton(10).RootUIComp.SetUIActive(i && t);
      this.GetItem(11).SetUIActive(!e.GetHaveShopEnter());
      this.GetItem(13).SetUIActive(!e.GetHaveGachaEnter());
      this.uxl?.SetFunctionRedDotVisible(e.GetAnyTaskRedDotShow());
    }
  }
}
exports.BeginnerCarnivalSubView = BeginnerCarnivalSubView;
//# sourceMappingURL=BeginnerCarnivalSubView.js.map
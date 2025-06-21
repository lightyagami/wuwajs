"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BeginnerCarnivalSubView = void 0;
const UE = require("ue"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA"),
  BeginnerCarnivalController_1 = require("./BeginnerCarnivalController"),
  ROLE_TAB_INDEX = 5,
  CARNIVAL_SHOP_TAB_ID = 5;
class BeginnerCarnivalSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments), this.FH1 = void 0, this.uxl = void 0, this.LNe = void 0, this.UNe = void 0, this.my1 = () => {
      var i;
      this.ActivityBaseData.GetPreGuideQuestFinishState() ? UiManager_1.UiManager.OpenView("BeginnerCarnivalMainView") : (i = this.ActivityBaseData.GetUnFinishPreGuideQuestId(), UiManager_1.UiManager.OpenView("QuestView", i))
    }, this.qH1 = () => {
      var i;
      this.ActivityBaseData.GetPreGuideQuestFinishState() ? UiManager_1.UiManager.OpenView("BeginnerCarnivalRoleTaskView") : (i = this.ActivityBaseData.GetUnFinishPreGuideQuestId(), UiManager_1.UiManager.OpenView("QuestView", i))
    }, this.zDo = () => {
      var i;
      this.ActivityBaseData.GetPreGuideQuestFinishState() ? (i = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData(), ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewWithTab(3, CARNIVAL_SHOP_TAB_ID), i.SetShopEnter()) : (i = this.ActivityBaseData.GetUnFinishPreGuideQuestId(), UiManager_1.UiManager.OpenView("QuestView", i))
    }, this.Fiu = () => {
      var i, e, t;
      this.ActivityBaseData.GetPreGuideQuestFinishState() ? (i = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData(), e = ModelManager_1.ModelManager.GachaModel.GetGachaInfo(i.GachaId[0]), t = ModelManager_1.ModelManager.GachaModel.GetGachaInfo(i.GachaId[1]), e || t ? UiManager_1.UiManager.OpenView("GachaMainView", e ? i.GachaId[0] : i.GachaId[1]) : UiManager_1.UiManager.OpenView("GachaMainView"), i.SetGachaEnter()) : (t = this.ActivityBaseData.GetUnFinishPreGuideQuestId(), UiManager_1.UiManager.OpenView("QuestView", t))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [9, UE.UIText],
      [7, UE.UIItem],
      [6, UE.UITexture],
      [5, UE.UITexture],
      [14, UE.UIItem],
      [10, UE.UIButtonComponent],
      [11, UE.UIItem],
      [13, UE.UIItem],
      [12, UE.UIButtonComponent],
      [8, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem]
    ], this.BtnBindInfo = [
      [4, this.qH1],
      [12, this.Fiu],
      [10, this.zDo]
    ]
  }
  OnSetData() {
    this.FH1 = this.ActivityBaseData
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(3),
      i = (this.uxl = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.FH1), await this.uxl.CreateThenShowByActorAsync(i.GetOwner()), this.uxl.FunctionButton.SetFunction(this.my1), this.GetItem(0)),
      i = (this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA, await this.LNe.CreateThenShowByActorAsync(i.GetOwner()), this.GetItem(2)),
      i = (this.UNe = new ActivityRewardList_1.ActivityRewardList, await this.UNe.CreateThenShowByActorAsync(i.GetOwner()), this.UNe.InitGridLayout(this.UNe.InitCommonGridItem), this.ActivityBaseData.GetPreviewReward());
    this.UNe.RefreshItemLayout(i)
  }
  OnStart() {
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    this.GetItem(15).SetUIActive(1 === i), this.GetItem(16).SetUIActive(0 === i), this.Pqe()
  }
  Pqe() {
    var i = this.ActivityBaseData.LocalConfig,
      e = i.DescTheme,
      i = i.Desc,
      t = !StringUtils_1.StringUtils.IsEmpty(e);
    this.LNe.SetSubTitleVisible(t), t && this.LNe.SetSubTitleByTextId(e), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i)
  }
  mGe() {
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    var [i, e] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i), i && this.LNe.SetTimeTextByText(e)
  }
  OnRefreshView() {
    this.mGe();
    const e = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData();
    var t = e.GetTaskDataById(e.GetRoleTaskId);
    if (t) {
      var t = t.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken,
        t = (this.GetItem(7).SetUIActive(t), this.GetTexture(6).SetUIActive(t), e.ChoseRoleId),
        r = 0 < t,
        t = (this.GetItem(8).SetUIActive(!r), this.GetTexture(5).SetUIActive(r), r && (r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t), this.SetTextureByPath(r.RoleHeadIcon, this.GetTexture(5)), this.SetTextureByPath(r.RoleHeadIcon, this.GetTexture(6))), ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalParam(BeginnerCarnivalController_1.BeginnerCarnivalController.ActivityId)),
        r = (this.GetText(9).SetText(`<color=#f5cf47>${e.GetCurrentItemCount()}</color>/` + t?.AllCount), this.GetItem(14).SetUIActive(e.GetRoleGetTaskTabRedDotShow(ROLE_TAB_INDEX)), ModelManager_1.ModelManager.FunctionModel.IsOpen(10009));
      r ? (t = ModelManager_1.ModelManager.GachaModel.GetGachaInfo(e.GachaId[0]), r = ModelManager_1.ModelManager.GachaModel.GetGachaInfo(e.GachaId[1]), this.GetButton(12).RootUIComp.SetUIActive(void 0 !== t || void 0 !== r)) : this.GetButton(12).RootUIComp.SetUIActive(!1);
      let i = !1;
      for (const a of ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(3, CARNIVAL_SHOP_TAB_ID)) {
        const e = a.GetRemainingData();
        if (e && 0 < e.Count) {
          i = !0;
          break
        }
      }
      t = ModelManager_1.ModelManager.FunctionModel.IsOpen(10010);
      this.GetButton(10).RootUIComp.SetUIActive(i && t), this.GetItem(11).SetUIActive(!e.GetHaveShopEnter()), this.GetItem(13).SetUIActive(!e.GetHaveGachaEnter()), this.uxl?.SetFunctionRedDotVisible(e.GetAnyTaskRedDotShow())
    }
  }
}
exports.BeginnerCarnivalSubView = BeginnerCarnivalSubView;
//# sourceMappingURL=BeginnerCarnivalSubView.js.map
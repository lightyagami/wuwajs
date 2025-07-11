"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueSeasonEntranceView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const RogueResDungeonConfigById_1 = require("../../../../Core/Define/ConfigQuery/RogueResDungeonConfigById");
const RogueResThemeById_1 = require("../../../../Core/Define/ConfigQuery/RogueResThemeById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const ActivityManager_1 = require("../../Activity/ActivityManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const HelpController_1 = require("../../Help/HelpController");
const MapRogueController_1 = require("../../MapRogue/MapRogueController");
const PayShopViewData_1 = require("../../PayShop/PayShopData/PayShopViewData");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ActivityPermanentRogueController_1 = require("../ActivityPermanentRogueController");
const RogueResOutDefine_1 = require("../Define/RogueResOutDefine");
const RogueOutButtonItem_1 = require("./RogueOutButtonItem");
class RogueSeasonEntranceView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.Y5c = 0;
    this.z5c = undefined;
    this.J5c = undefined;
    this.Z5c = undefined;
    this.e8c = undefined;
    this.t8c = undefined;
    this.zL1 = undefined;
    this.Lx1 = false;
    this._5e = () => {
      this.CloseMe();
    };
    this.i8c = () => {
      var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSeasonHelpId(this.Y5c);
      if (e) {
        HelpController_1.HelpController.OpenHelpById(e);
      }
    };
    this.r8c = () => {
      UiManager_1.UiManager.OpenView("RogueIllustratedView");
    };
    this.Z6c = () => {
      if (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheTaskOpen() <= TimeUtil_1.TimeUtil.GetServerTime()) {
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCacheTaskOpen();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueRewardUpdate);
      }
      UiManager_1.UiManager.OpenView("RogueTaskView");
    };
    this.iyi = () => {
      if (ModelManager_1.ModelManager.ActivityPermanentRogueModel.CheckShopRedDot(this.Y5c)) {
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.RefreshShopRedDot(this.Y5c);
      }
      var e = RogueResThemeById_1.configRogueResThemeById.GetConfig(this.Y5c).ShopId;
      var i = new PayShopViewData_1.PayShopViewData();
      i.PayShopId = e;
      i.ShowShopIdList = [e];
      ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(i, () => {
        var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetShopCount(this.Y5c);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshShopAccumulateCurrency, "Item_Cumulative_Acquisition", e[0] + "/" + e[1]);
      });
    };
    this.o8c = () => {
      UiManager_1.UiManager.OpenView("RogueResSkillView", this.Y5c);
    };
    this.n8c = () => {
      UiManager_1.UiManager.OpenView("RogueResEndingView", this.Y5c);
    };
    this.rki = () => {
      var e;
      if (!this.Lx1) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(310)).IsEscViewTriggerCallBack = false;
        e.FunctionMap.set(2, this.Aq1);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      }
    };
    this.Aq1 = () => {
      this.Lx1 = true;
      MapRogueController_1.MapRogueController.RequestInstResultEnd().then(() => {
        this.GetItem(10)?.SetUIActive(false);
        this.Lx1 = false;
        this.zL1 = 0;
      });
    };
    this.s8c = () => {
      var e;
      var i;
      if (this.Lx1) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RogueBattle", 77, "肉鸽进度请求中，未返回。");
        }
      } else if (this.zL1 && this.zL1 > 0) {
        (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(306)).IsEscViewTriggerCallBack = false;
        i.FunctionMap.set(1, this.rki);
        i.FunctionMap.set(2, this.JL1);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
      } else {
        i = RogueResThemeById_1.configRogueResThemeById.GetConfig(this.Y5c);
        (e = new RogueResOutDefine_1.RogueDungeonParam()).SeasonId = this.Y5c;
        e.DungeonList = i.Insts;
        if (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheDungeonNewest(this.Y5c) !== (i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetLatestDungeon(this.Y5c))) {
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCacheDungeonNewest(this.Y5c);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate, this.Y5c);
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCurrentSelectedInst(i);
        }
        UiManager_1.UiManager.OpenView("RogueDungeonEntryView", e);
      }
    };
    this.sm1 = () => {
      this.GetItem(15)?.SetUIActive(false);
      if (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTrailEndTime(this.Y5c) !== ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheTrailOpen(this.Y5c)) {
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCacheTrailOpen(this.Y5c);
      }
      UiManager_1.UiManager.OpenView("RogueResTrialView", this.Y5c);
    };
    this.JL1 = () => {
      ActivityManager_1.ActivityManager.GetActivityController(Protocol_1.Aki.Protocol.uks.Proto_RogueRes).RequestEnterDungeon(this.zL1);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIButtonComponent], [10, UE.UIItem], [11, UE.UIButtonComponent], [12, UE.UIButtonComponent], [13, UE.UITexture], [14, UE.SpineSkeletonAnimationComponent], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem]];
    this.BtnBindInfo = [[1, this.i8c], [9, this.rki], [11, this.s8c], [12, this.sm1]];
  }
  async OnBeforeStartAsync() {
    this.Y5c = this.OpenParam;
    var e = [];
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate, this.Y5c);
    this.z5c = new RogueOutButtonItem_1.RogueButtonItemA();
    this.z5c.SetOnClickCall(this.r8c);
    e.push(this.z5c.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    this.J5c = new RogueOutButtonItem_1.RogueButtonItemA();
    this.J5c?.SetOnClickCall(this.Z6c);
    e.push(this.J5c.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.Z5c = new RogueOutButtonItem_1.RogueButtonItemA();
    this.Z5c?.SetOnClickCall(this.iyi);
    e.push(this.Z5c.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    this.e8c = new RogueOutButtonItem_1.RogueButtonItemA();
    this.e8c?.SetOnClickCall(this.o8c);
    e.push(this.e8c.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()));
    this.t8c = new RogueOutButtonItem_1.RogueButtonItemA();
    this.t8c?.SetOnClickCall(this.n8c);
    e.push(this.t8c.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    e.push(this.CheckDungeonProgress());
    await Promise.all(e);
  }
  async CheckDungeonProgress() {
    var e = this.GetItem(10);
    e?.SetUIActive(false);
    var i = await ActivityPermanentRogueController_1.ActivityPermanentRogueController.RequestRogueResLastInstInfo();
    this.zL1 = i ? i.r6n : undefined;
    if (!this.zL1 || this.zL1 <= 0) {
      i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetLatestDungeon(this.Y5c);
      if ((i = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(i)) && !StringUtils_1.StringUtils.IsBlank(i.SpineMainF)) {
        await this.SetSpineAssetByPath(i.SpineAtlasF, i.SpineMainF, this.GetSpine(14));
      }
    } else {
      i = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(this.zL1);
      i = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(i.Title, i.Title);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "RogueRes_Challenge_Progress", i);
      e?.SetUIActive(true);
      if ((i = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(this.zL1)) && !StringUtils_1.StringUtils.IsBlank(i.SpineMainF)) {
        await this.SetSpineAssetByPath(i.SpineAtlasF, i.SpineMainF, this.GetSpine(14));
      }
    }
    this.GetSpine(14)?.SetAnimation(0, "idle", true);
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this._5e);
    this.lqe.SetTitleTextActive(false);
    this.lqe.SetTitleIconVisible(false);
    this.lqe.SetHelpBtnActive(false);
    var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTrailEndTime(this.Y5c);
    var i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheTrailOpen(this.Y5c);
    this.GetItem(15)?.SetUIActive(e !== i);
  }
  OnBeforeShow() {
    var e = RogueResThemeById_1.configRogueResThemeById.GetConfig(this.Y5c);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Name);
    this.ZGe();
    this.K8e();
    RedDotController_1.RedDotController.BindRedDot("RogueResInst", this.GetItem(16), undefined, this.Y5c);
  }
  async OnBeforeShowAsyncImplement() {
    var e = RogueResThemeById_1.configRogueResThemeById.GetConfig(this.Y5c);
    var e = ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() === 0 ? e.CoverF : e.CoverM;
    await this.SetTextureAsync(e, this.GetTexture(13));
  }
  OnBeforeHide() {
    this.W8e();
    RedDotController_1.RedDotController.UnBindGivenUi("RogueResInst", this.GetItem(16));
  }
  OnBeforeDestroy() {
    this.lqe = undefined;
    this.z5c = undefined;
    this.J5c = undefined;
    this.Z5c = undefined;
    this.e8c = undefined;
    this.t8c = undefined;
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnTick(e) {
    var i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTaskIsEnd();
    this.GetItem(18)?.SetUIActive(!i);
    if (!i) {
      this.J5c?.SetLimitTime(this.GetRemainTime());
    }
  }
  GetRemainTime() {
    var e = MathUtils_1.MathUtils.LongToNumber(ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTaskEndTime());
    return ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(e, "{0}") ?? "";
  }
  ZGe() {
    var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel;
    this.z5c?.SetNum("");
    var i = e.GetTaskCount();
    var t = e.GetTaskIsEnd();
    this.GetItem(18)?.SetUIActive(!t);
    if (!t) {
      this.J5c?.SetNum(i[0] + "/" + i[1]);
      this.J5c?.SetLimitTime(this.GetRemainTime());
    }
    var t = e.GetShopCount(this.Y5c);
    this.Z5c?.SetNum(t[0] + "/" + t[1]);
    var i = e.GetSkillTreeLevel(this.Y5c);
    this.e8c?.SetNum("Lv." + i);
    var t = e.GetEndingCount(this.Y5c);
    this.t8c?.SetNum(t[0] + "/" + t[1]);
  }
  K8e() {
    this.z5c?.BindRedDot("RogueResIllustrated");
    this.J5c?.BindRedDot("RogueResTask");
    this.Z5c?.BindRedDot("RogueResShop", this.Y5c);
    this.e8c?.BindRedDot("RogueResSkillTree", this.Y5c);
    this.t8c?.BindRedDot("RogueResEnding", this.Y5c);
  }
  W8e() {
    this.z5c?.UnBindRedDot();
    this.J5c?.UnBindRedDot();
    this.Z5c?.UnBindRedDot();
    this.t8c?.UnBindRedDot();
    this.e8c?.UnBindRedDot();
  }
}
exports.RogueSeasonEntranceView = RogueSeasonEntranceView;
//# sourceMappingURL=RogueSeasonMainView.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RogueSeasonEntranceView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  RogueResDungeonConfigById_1 = require("../../../../Core/Define/ConfigQuery/RogueResDungeonConfigById"),
  RogueResThemeById_1 = require("../../../../Core/Define/ConfigQuery/RogueResThemeById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ActivityManager_1 = require("../../Activity/ActivityManager"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  HelpController_1 = require("../../Help/HelpController"),
  MapRogueController_1 = require("../../MapRogue/MapRogueController"),
  PayShopViewData_1 = require("../../PayShop/PayShopData/PayShopViewData"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ActivityPermanentRogueController_1 = require("../ActivityPermanentRogueController"),
  RogueResOutDefine_1 = require("../Define/RogueResOutDefine"),
  RogueOutButtonItem_1 = require("./RogueOutButtonItem");
class RogueSeasonEntranceView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.lqe = void 0, this.Y5c = 0, this.z5c = void 0, this.J5c = void 0, this.Z5c = void 0, this.e8c = void 0, this.t8c = void 0, this.TL1 = void 0, this.ZP1 = !1, this._5e = () => {
      this.CloseMe()
    }, this.i8c = () => {
      var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSeasonHelpId(this.Y5c);
      e && HelpController_1.HelpController.OpenHelpById(e)
    }, this.r8c = () => {
      UiManager_1.UiManager.OpenView("RogueIllustratedView")
    }, this.Z6c = () => {
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheTaskOpen() <= TimeUtil_1.TimeUtil.GetServerTime() && (ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCacheTaskOpen(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueRewardUpdate)), UiManager_1.UiManager.OpenView("RogueTaskView")
    }, this.iyi = () => {
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.CheckShopRedDot(this.Y5c) && ModelManager_1.ModelManager.ActivityPermanentRogueModel.RefreshShopRedDot(this.Y5c);
      var e = RogueResThemeById_1.configRogueResThemeById.GetConfig(this.Y5c).ShopId,
        t = new PayShopViewData_1.PayShopViewData;
      t.PayShopId = e, t.ShowShopIdList = [e], ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(t, () => {
        var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetShopCount(this.Y5c);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshShopAccumulateCurrency, "Item_Cumulative_Acquisition", e[0] + "/" + e[1])
      })
    }, this.o8c = () => {
      UiManager_1.UiManager.OpenView("RogueResSkillView", this.Y5c)
    }, this.n8c = () => {
      UiManager_1.UiManager.OpenView("RogueResEndingView", this.Y5c)
    }, this.rki = () => {
      var e;
      this.ZP1 || ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(310)).IsEscViewTriggerCallBack = !1, e.FunctionMap.set(2, this.ZO1), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e))
    }, this.ZO1 = () => {
      this.ZP1 = !0, MapRogueController_1.MapRogueController.RequestInstResultEnd().then(() => {
        this.GetItem(10)?.SetUIActive(!1), this.ZP1 = !1, this.TL1 = 0
      })
    }, this.s8c = () => {
      var e, t;
      this.ZP1 ? Log_1.Log.CheckInfo() && Log_1.Log.Info("RogueBattle", 77, "肉鸽进度请求中，未返回。") : this.TL1 && 0 < this.TL1 ? ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(306)).IsEscViewTriggerCallBack = !1, t.FunctionMap.set(1, this.rki), t.FunctionMap.set(2, this.bL1), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t)) : (t = RogueResThemeById_1.configRogueResThemeById.GetConfig(this.Y5c), (e = new RogueResOutDefine_1.RogueDungeonParam).SeasonId = this.Y5c, e.DungeonList = t.Insts, ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheDungeonNewest(this.Y5c) !== (t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetLatestDungeon(this.Y5c)) && (ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCacheDungeonNewest(this.Y5c), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate, this.Y5c), ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCurrentSelectedInst(t)), UiManager_1.UiManager.OpenView("RogueDungeonEntryView", e))
    }, this.Od1 = () => {
      this.GetItem(15)?.SetUIActive(!1), ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTrailEndTime(this.Y5c) !== ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheTrailOpen(this.Y5c) && ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCacheTrailOpen(this.Y5c), UiManager_1.UiManager.OpenView("RogueResTrialView", this.Y5c)
    }, this.bL1 = () => {
      ActivityManager_1.ActivityManager.GetActivityController(Protocol_1.Aki.Protocol.uks.Proto_RogueRes).RequestEnterDungeon(this.TL1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIButtonComponent],
      [10, UE.UIItem],
      [11, UE.UIButtonComponent],
      [12, UE.UIButtonComponent],
      [13, UE.UITexture],
      [14, UE.SpineSkeletonAnimationComponent],
      [15, UE.UIItem],
      [16, UE.UIItem]
    ], this.BtnBindInfo = [
      [1, this.i8c],
      [9, this.rki],
      [11, this.s8c],
      [12, this.Od1]
    ]
  }
  async OnBeforeStartAsync() {
    this.Y5c = this.OpenParam;
    var e = [];
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate, this.Y5c), this.z5c = new RogueOutButtonItem_1.RogueButtonItemA, this.z5c.SetOnClickCall(this.r8c), e.push(this.z5c.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())), this.J5c = new RogueOutButtonItem_1.RogueButtonItemA, this.J5c?.SetOnClickCall(this.Z6c), e.push(this.J5c.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())), this.Z5c = new RogueOutButtonItem_1.RogueButtonItemA, this.Z5c?.SetOnClickCall(this.iyi), e.push(this.Z5c.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())), this.e8c = new RogueOutButtonItem_1.RogueButtonItemA, this.e8c?.SetOnClickCall(this.o8c), e.push(this.e8c.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())), this.t8c = new RogueOutButtonItem_1.RogueButtonItemA, this.t8c?.SetOnClickCall(this.n8c), e.push(this.t8c.CreateThenShowByActorAsync(this.GetItem(7).GetOwner())), e.push(this.CheckDungeonProgress()), await Promise.all(e)
  }
  async CheckDungeonProgress() {
    var e = this.GetItem(10),
      t = (e?.SetUIActive(!1), await ActivityPermanentRogueController_1.ActivityPermanentRogueController.RequestRogueResLastInstInfo());
    this.TL1 = t ? t.r6n : void 0, !this.TL1 || this.TL1 <= 0 ? (t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetLatestDungeon(this.Y5c), (t = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(t)) && !StringUtils_1.StringUtils.IsBlank(t.SpineMainF) && await this.SetSpineAssetByPath(t.SpineAtlasF, t.SpineMainF, this.GetSpine(14))) : (t = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(this.TL1), t = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(t.Title, t.Title), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "RogueRes_Challenge_Progress", t), e?.SetUIActive(!0), (t = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(this.TL1)) && !StringUtils_1.StringUtils.IsBlank(t.SpineMainF) && await this.SetSpineAssetByPath(t.SpineAtlasF, t.SpineMainF, this.GetSpine(14))), this.GetSpine(14)?.SetAnimation(0, "idle", !0)
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0)), this.lqe.SetCloseCallBack(this._5e), this.lqe.SetTitleTextActive(!1), this.lqe.SetTitleIconVisible(!1), this.lqe.SetHelpBtnActive(!1);
    var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTrailEndTime(this.Y5c),
      t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheTrailOpen(this.Y5c);
    this.GetItem(15)?.SetUIActive(e !== t)
  }
  OnBeforeShow() {
    var e = RogueResThemeById_1.configRogueResThemeById.GetConfig(this.Y5c);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Name), this.ZGe(), this.K8e(), RedDotController_1.RedDotController.BindRedDot("RogueResInst", this.GetItem(16), void 0, this.Y5c)
  }
  async OnBeforeShowAsyncImplement() {
    var e = RogueResThemeById_1.configRogueResThemeById.GetConfig(this.Y5c),
      e = 0 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() ? e.CoverF : e.CoverM;
    await this.SetTextureAsync(e, this.GetTexture(13))
  }
  OnBeforeHide() {
    this.W8e(), RedDotController_1.RedDotController.UnBindGivenUi("RogueResInst", this.GetItem(16))
  }
  OnBeforeDestroy() {
    this.lqe = void 0, this.z5c = void 0, this.J5c = void 0, this.Z5c = void 0, this.e8c = void 0, this.t8c = void 0
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  ZGe() {
    var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel,
      t = (this.z5c?.SetNum(""), e.GetTaskCount()),
      t = (this.J5c?.SetNum(t[0] + "/" + t[1]), e.GetShopCount(this.Y5c)),
      t = (this.Z5c?.SetNum(t[0] + "/" + t[1]), e.GetSkillTreeLevel(this.Y5c)),
      t = (this.e8c?.SetNum("Lv." + t), e.GetEndingCount(this.Y5c));
    this.t8c?.SetNum(t[0] + "/" + t[1])
  }
  K8e() {
    this.z5c?.BindRedDot("RogueResIllustrated"), this.J5c?.BindRedDot("RogueResTask"), this.Z5c?.BindRedDot("RogueResShop", this.Y5c), this.e8c?.BindRedDot("RogueResSkillTree", this.Y5c), this.t8c?.BindRedDot("RogueResEnding", this.Y5c)
  }
  W8e() {
    this.z5c?.UnBindRedDot(), this.J5c?.UnBindRedDot(), this.Z5c?.UnBindRedDot(), this.t8c?.UnBindRedDot(), this.e8c?.UnBindRedDot()
  }
}
exports.RogueSeasonEntranceView = RogueSeasonEntranceView;
//# sourceMappingURL=RogueSeasonMainView.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaMasterInfoView = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  NoCircleAttachView_1 = require("../../../AutoAttach/NoCircleAttachView"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  HelpController_1 = require("../../../Help/HelpController"),
  LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  PhantomArenaController_1 = require("../../PhantomArenaController"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine"),
  PhantomArenaMasterLevelItem_1 = require("./PhantomArenaMasterLevelItem");
class PhantomArenaMasterInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.Mj1 = -1, this.oiu = void 0, this.lqe = void 0, this.RewardLayout = void 0, this.Siu = void 0, this.Pj1 = (e, t, i) => {
      var r = new PhantomArenaMasterLevelItem_1.MasterLevelItem;
      return r.CreateThenShowByActor(e), r.CallbackOnSelect = this.niu, r
    }, this.rOe = () => {
      var e = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid;
      return e.ShowReceivedCallBack = this.s_u, e
    }, this.Miu = () => {
      return new MasterLevelDescItem
    }, this.siu = () => {
      var e;
      ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelRewardCanTake(this.Mj1) && (e = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelConfig(this.Mj1), PhantomArenaController_1.PhantomArenaController.MasterLevelRewardRequest(e.Id))
    }, this.niu = (e, t) => {
      this.Mj1 !== e && (this.Mj1 = e, this.oiu.GetCurrentSelectIndex() !== e - 1 && this.oiu.AttachToIndex(e - 1), this.Cvt())
    }, this.aiu = () => {
      this.pO()
    }, this.fFo = () => {
      HelpController_1.HelpController.OpenHelpById(PhantomArenaDefine_1.HELP_ID_LEVEL)
    }, this.I5t = () => {
      this.CloseMe()
    }, this.s_u = () => {
      return ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelRewardIfTaken(this.Mj1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UITexture],
      [4, UE.UITexture],
      [5, UE.UIText],
      [6, UE.UIScrollViewWithScrollbarComponent],
      [7, UE.UIItem],
      [8, UE.UIHorizontalLayout],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIButtonComponent],
      [13, UE.UIItem],
      [14, UE.UIItem]
    ], this.BtnBindInfo = [
      [12, this.siu]
    ]
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(13)), this.lqe.SetHelpCallBack(this.fFo), this.lqe.SetCloseCallBack(this.I5t), this.oiu = new NoCircleAttachView_1.NoCircleAttachView(this.GetItem(0).GetOwner());
    var e = this.GetItem(1);
    e.SetUIActive(!1), this.oiu.CreateItems(e.GetOwner(), 0, this.Pj1), this.RewardLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(8), this.rOe), this.Siu = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.Miu)
  }
  async OnCreateAsync() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("MasterLevelCurve_Scale"),
      e = new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.CurveFloat),
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("MasterLevelCurve_Alpha"),
      t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat);
    await Promise.all([e.Promise, t.Promise]).then(e => {
      PhantomArenaMasterLevelItem_1.MasterLevelItem.ScaleCurve = e[0], PhantomArenaMasterLevelItem_1.MasterLevelItem.AlphaCurve = e[1]
    })
  }
  OnBeforeShow() {
    this.WLl(!0), this.mGe(), this.jqe()
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaMasterInfoUpdate, this.aiu)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaMasterInfoUpdate, this.aiu)
  }
  pO() {
    this.WLl(), this.mGe(), this.Pqe(), this.jqe()
  }
  WLl(e) {
    var t = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelData(),
      i = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevel();
    if (e) this.oiu.ReloadView(t.length, t), this.oiu.AttachToIndex(i - 1, !0);
    else
      for (const r of this.oiu.GetItems()) r.SetData(t), r.RefreshItem()
  }
  mGe() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel,
      t = e.GetMasterLevel(),
      t = e.GetMasterLevelConfig(t);
    t && (t = t.TitleId, t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterTitleById(t), this.SetTextureByPath(t.Icon, this.GetTexture(3)), this.SetTextureByPath(t.IconBg, this.GetTexture(4)), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t.Name), t = e.GetMasterExpNextNeed().toString(), e = e.GetMasterExpNow().toString(), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), PhantomArenaDefine_1.ENTRANCE_MASTER_INFO_EXP_TEXT_ID, e, t))
  }
  Pqe() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelDescData(this.Mj1);
    this.Siu?.RefreshByData(e)
  }
  jqe() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelRewardList(this.Mj1),
      e = (this.RewardLayout.RefreshByData(e), 0 === e.length),
      t = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelRewardIfTaken(this.Mj1),
      i = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelRewardCanTake(this.Mj1);
    this.GetItem(10).SetUIActive(t && !e), this.GetItem(11).SetUIActive(!t && !i && !e), this.SetButtonUiActive(12, !t && i && !e), this.GetItem(14).SetUIActive(!e)
  }
  Cvt() {
    this.pO()
  }
}
exports.PhantomArenaMasterInfoView = PhantomArenaMasterInfoView;
class MasterLevelDescItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UISprite]
    ]
  }
  Refresh(e, t, i) {
    this.GetSprite(0).SetUIActive(e.IsDone), this.GetSprite(2).SetUIActive(!e.IsDone), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.StringId)
  }
}
//# sourceMappingURL=PhantomArenaMasterInfoView.js.map
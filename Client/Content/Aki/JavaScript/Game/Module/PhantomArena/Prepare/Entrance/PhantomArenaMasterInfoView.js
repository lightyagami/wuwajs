"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaMasterInfoView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const NoCircleAttachView_1 = require("../../../AutoAttach/NoCircleAttachView");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const HelpController_1 = require("../../../Help/HelpController");
const LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const PhantomArenaController_1 = require("../../PhantomArenaController");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
const PhantomArenaMasterLevelItem_1 = require("./PhantomArenaMasterLevelItem");
class PhantomArenaMasterInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ActivityId = 0;
    this.r71 = -1;
    this.Wnu = undefined;
    this.lqe = undefined;
    this.RewardLayout = undefined;
    this.lsu = undefined;
    this.c71 = (e, t, i) => {
      var r = new PhantomArenaMasterLevelItem_1.MasterLevelItem();
      r.CreateThenShowByActor(e);
      r.CallbackOnSelect = this.Qnu;
      r.ActivityId = this.ActivityId;
      return r;
    };
    this.rOe = () => {
      var e = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      e.ShowReceivedCallBack = this.L0u;
      return e;
    };
    this._su = () => {
      return new MasterLevelDescItem();
    };
    this.Knu = () => {
      var e = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelData(this.ActivityId).filter(e => ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelRewardCanTake(e.Level, this.ActivityId)).map(e => e.Level);
      if (e.length > 0) {
        PhantomArenaController_1.PhantomArenaController.MasterLevelMultiRewardRequest(e, this.ActivityId);
      }
    };
    this.Qnu = (e, t) => {
      if (this.r71 !== e) {
        this.r71 = e;
        if (this.Wnu.GetCurrentSelectIndex() !== e - 1) {
          this.Wnu.AttachToIndex(e - 1);
        }
        this.Cvt();
      }
    };
    this.Xnu = () => {
      this.pO();
    };
    this.fFo = () => {
      HelpController_1.HelpController.OpenHelpById(PhantomArenaDefine_1.HELP_ID_LEVEL);
    };
    this.I5t = () => {
      this.CloseMe();
    };
    this.L0u = () => {
      return ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelRewardIfTaken(this.r71, this.ActivityId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UITexture], [4, UE.UITexture], [5, UE.UIText], [6, UE.UIScrollViewWithScrollbarComponent], [7, UE.UIItem], [8, UE.UIHorizontalLayout], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIButtonComponent], [13, UE.UIItem], [14, UE.UIItem]];
    this.BtnBindInfo = [[12, this.Knu]];
  }
  OnStart() {
    this.ActivityId = this.OpenParam;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(13));
    this.lqe.SetHelpCallBack(this.fFo);
    this.lqe.SetCloseCallBack(this.I5t);
    this.Wnu = new NoCircleAttachView_1.NoCircleAttachView(this.GetItem(0).GetOwner());
    var e = this.GetItem(1);
    e.SetUIActive(false);
    this.Wnu.CreateItems(e.GetOwner(), 0, this.c71);
    this.RewardLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(8), this.rOe);
    this.lsu = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this._su);
  }
  async OnCreateAsync() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("MasterLevelCurve_Scale");
    var e = new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.CurveFloat);
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("MasterLevelCurve_Alpha");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat);
    await Promise.all([e.Promise, t.Promise]).then(e => {
      PhantomArenaMasterLevelItem_1.MasterLevelItem.ScaleCurve = e[0];
      PhantomArenaMasterLevelItem_1.MasterLevelItem.AlphaCurve = e[1];
    });
  }
  OnBeforeShow() {
    this.WLl(true);
    this.mGe();
    this.jqe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaMasterInfoUpdate, this.Xnu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaMasterInfoUpdate, this.Xnu);
  }
  pO() {
    this.WLl();
    this.mGe();
    this.Pqe();
    this.jqe();
  }
  WLl(e) {
    var t = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelData(this.ActivityId);
    var i = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevel(this.ActivityId);
    if (e) {
      this.Wnu.ReloadView(t.length, t);
      this.Wnu.AttachToIndex(i - 1, true);
    } else {
      for (const r of this.Wnu.GetItems()) {
        r.SetData(t);
        r.RefreshItem();
      }
    }
  }
  mGe() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel;
    var t = e.GetMasterLevel(this.ActivityId);
    var t = e.GetMasterLevelConfig(t, this.ActivityId);
    if (t) {
      t = t.TitleId;
      t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterTitleById(t);
      this.SetTextureByPath(t.Icon, this.GetTexture(3));
      this.SetTextureByPath(t.IconBg, this.GetTexture(4));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t.Name);
      t = e.GetMasterExpNextNeed(this.ActivityId).toString();
      e = e.GetMasterExpNow(this.ActivityId).toString();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), PhantomArenaDefine_1.ENTRANCE_MASTER_INFO_EXP_TEXT_ID, e, t);
    }
  }
  Pqe() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelDescData(this.r71, this.ActivityId);
    this.lsu?.RefreshByData(e);
  }
  jqe() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelRewardList(this.r71, this.ActivityId);
    this.RewardLayout.RefreshByData(e);
    var e = e.length === 0;
    var t = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelRewardIfTaken(this.r71, this.ActivityId);
    var i = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelRewardCanTake(this.r71, this.ActivityId);
    this.GetItem(10).SetUIActive(t && !e);
    this.GetItem(11).SetUIActive(!t && !i && !e);
    this.SetButtonUiActive(12, !t && i && !e);
    this.GetItem(14).SetUIActive(!e);
  }
  Cvt() {
    this.pO();
  }
}
exports.PhantomArenaMasterInfoView = PhantomArenaMasterInfoView;
class MasterLevelDescItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UISprite]];
  }
  Refresh(e, t, i) {
    this.GetSprite(0).SetUIActive(e.IsDone);
    this.GetSprite(2).SetUIActive(!e.IsDone);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.StringId);
  }
}
//# sourceMappingURL=PhantomArenaMasterInfoView.js.map
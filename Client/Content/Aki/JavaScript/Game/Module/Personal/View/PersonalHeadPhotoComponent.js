"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalHeadPhotoComponent = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const PersonalController_1 = require("../Controller/PersonalController");
const PersonalRoleSmallItemGrid_1 = require("./PersonalRoleSmallItemGrid");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class PersonalHeadPhotoComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.PlayerHeadDataList = [];
    this.P7e = undefined;
    this.OnClickConfirm = () => {
      PersonalController_1.PersonalController.SendChangeHeadPhotoRequest(this.p3l.Id);
    };
    this.Og = () => {
      this.PlayerHeadDataList = this.jTd();
      this.xqe.RefreshByData(this.PlayerHeadDataList);
      for (let e = 0; e < this.PlayerHeadDataList.length; e++) {
        this.xqe.GetScrollItemByIndex(e).RefreshEquipHeadIconItem();
      }
      this.xqe.ScrollTo(this.xqe.GetItemByIndex(0));
      this.aVi(this.PlayerHeadDataList[0]);
    };
    this.Y5i = () => {
      var e = new PersonalRoleSmallItemGrid_1.PersonalRoleSmallItemGrid();
      e.BindToggleClickCallBack(this.sVi);
      return e;
    };
    this.sVi = e => {
      this.aVi(e);
    };
  }
  get p3l() {
    var e = this.xqe.GetGenericLayout().GetSelectedGridIndex();
    if (!(e < 0) && !(e >= this.PlayerHeadDataList.length)) {
      return this.PlayerHeadDataList[e];
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText]];
  }
  OnStart() {
    this.PlayerHeadDataList = ModelManager_1.ModelManager.PersonalModel.GetPlayerShowHeadDataList();
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.Y5i);
    this.AddEventListener();
  }
  async OnBeforeShowAsyncImplement() {
    this.PlayerHeadDataList = this.jTd();
    if (this.PlayerHeadDataList.length > 0) {
      await this.xqe.RefreshByDataAsync(this.PlayerHeadDataList);
      this.xqe.ScrollTo(this.xqe.GetItemByIndex(0));
      this.aVi(this.PlayerHeadDataList[0]);
    }
  }
  OnBeforeDestroy() {
    this.RemoveEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHeadIconChange, this.Og);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHeadIconChange, this.Og);
  }
  SetRefreshConfirmBtn(e) {
    this.P7e = e;
  }
  aVi(t) {
    var e = this.PlayerHeadDataList.findIndex(e => e === t);
    this.xqe?.GetGenericLayout()?.SelectGridProxy(e);
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(this.xqe.GetItemByIndex(e), true);
    var e = ModelManager_1.ModelManager.PersonalModel.GetHeadPhotoId();
    var i = !t.Lock && e !== t.Id;
    if (this.P7e) {
      this.P7e(i, e === t.Id);
    }
    const r = this.GetTexture(1);
    r.SetUIActive(false);
    this.SetTextureShowUntilLoaded(t.GetRoleHeadIconCircle(), r, () => {
      r.SetUIActive(true);
    });
    this.GetText(2).ShowTextNew(t.GetName());
    i = this.GetText(3);
    i.SetUIActive(t.Lock);
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, t.Config.Tips);
  }
  jTd() {
    var t = [...ModelManager_1.ModelManager.PersonalModel.GetPlayerShowHeadDataList()];
    var i = t.findIndex(e => e.Id === ModelManager_1.ModelManager.PersonalModel.GetHeadPhotoId());
    if (!(i <= 0) && !(t.length <= i)) {
      var e = t[i];
      for (let e = i; e > 0; e--) {
        t[e] = t[e - 1];
      }
      t[0] = e;
    }
    return t;
  }
}
exports.PersonalHeadPhotoComponent = PersonalHeadPhotoComponent;
//# sourceMappingURL=PersonalHeadPhotoComponent.js.map
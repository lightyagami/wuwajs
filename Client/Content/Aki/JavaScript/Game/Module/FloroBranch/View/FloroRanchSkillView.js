"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchSkillView = undefined;
const UE = require("ue");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const FloroRanchSkillCardItem_1 = require("./Item/FloroRanchSkillCardItem");
class FloroRanchSkillView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.jEu = 0;
    this.jlo = undefined;
    this.gke = e => this.jEu !== e;
    this.GZt = e => {
      this.jEu = e;
      this.jlo.SelectGridProxyByKey(e);
    };
    this.HEu = () => {
      var e = new FloroRanchSkillCardItem_1.FloroRanchSkillCardItem();
      e.OnCanExecuteChangeFunc = this.gke;
      e.OnToggleCallBack = this.GZt;
      e.CanSelect = this.OpenParam;
      return e;
    };
    this.tWt = () => {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSkillId, this.jEu);
      ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().SaveSkillRedDot();
      var e = UiManager_1.UiManager.GetViewByName("FloroRanchDungeonSelectView");
      if (e?.IsShowOrShowing) {
        e.RefreshSkillItem(this.jEu);
      }
      this.CloseMe();
    };
    this.AMo = () => {
      ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().SaveSkillRedDot();
      var e = UiManager_1.UiManager.GetViewByName("FloroRanchDungeonSelectView");
      if (e?.IsShowOrShowing) {
        e.RefreshSkillItemRedDot();
      }
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[2, UE.SpineSkeletonAnimationComponent], [4, UE.UIHorizontalLayout], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.tWt], [7, this.AMo]];
  }
  async OnBeforeStartAsync() {
    this.GetButton(6)?.RootUIComp.SetUIActive(this.OpenParam);
    this.GetSpine(2)?.SetAnimation(0, "idle", true);
    this.jlo = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.HEu);
    var e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().GetFloroRanchSkillDataList();
    await this.jlo.RefreshByDataAsync(e, true);
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSkillId);
    if (e) {
      this.jEu = e;
      this.jlo.SelectGridProxyByKey(e);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (!(e.length <= 0) && e[0] === "SkillCard" && !(e.length < 2) && (e = parseInt(e[1]), e = this.jlo?.GetItemByIndex(e))) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.FloroRanchSkillView = FloroRanchSkillView;
//# sourceMappingURL=FloroRanchSkillView.js.map
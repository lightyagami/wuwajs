"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfluenceSearchView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollView_1 = require("../../../Util/ScrollView/GenericScrollView");
class InfluenceSearchView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CurrentCountryId = 0;
    this.yAt = "";
    this.xqe = undefined;
    this.xsi = () => {
      this.GetInputText(0).SetText("", true);
    };
    this.Rvt = () => {
      this.CloseMe();
    };
    this.sGe = (e, t, i) => {
      if (this.CurrentCountryId === e[0]) {
        const s = new InfluenceSearchGrid(t);
        s.UpdateGrid(e[0], e[1]);
        return {
          Key: i,
          Value: s
        };
      }
      if (e[1].length > 0) {
        const s = new InfluenceSearchGrid(t);
        s.UpdateGrid(e[0], e[1]);
        return {
          Key: i,
          Value: s
        };
      }
      t.SetUIActive(false);
    };
    this.wsi = e => {
      this.yAt = e;
      this.RefreshSearchResult();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITextInputComponent], [1, UE.UIButtonComponent], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.xsi], [4, this.Rvt]];
  }
  OnBeforeCreate() {
    this.CurrentCountryId = this.OpenParam;
  }
  OnStart() {
    this.xqe = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(2), this.sGe);
    this.GetInputText(0).OnTextChange.Bind(this.wsi);
  }
  OnAfterShow() {
    this.RefreshSearchResult();
  }
  RefreshSearchResult() {
    let e = [];
    if (this.yAt) {
      (e = ModelManager_1.ModelManager.InfluenceReputationModel.GetUnLockCountry()).sort((e, t) => e === this.CurrentCountryId ? -1 : t === this.CurrentCountryId ? 1 : e - t);
    } else {
      e.push(this.CurrentCountryId);
    }
    var t = ModelManager_1.ModelManager.InfluenceReputationModel.FilterUnLockInfluenceList(e, this.yAt);
    var i = t.HasResult;
    this.GetItem(3).SetUIActive(!i);
    this.xqe.SetActive(i);
    if (i) {
      this.xqe.RefreshByData(t.InfluenceList);
    }
  }
  OnBeforeDestroy() {
    this.xqe.ClearChildren();
    this.xqe = undefined;
  }
}
exports.InfluenceSearchView = InfluenceSearchView;
class InfluenceSearchGrid extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.eGe = undefined;
    this.z5t = 0;
    this.sGe = (e, t, i) => {
      t = new InfluenceSearchItem(t);
      t.UpdateItem(e, this.z5t);
      return {
        Key: i,
        Value: t
      };
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIVerticalLayout], [3, UE.UIItem]];
  }
  OnStart() {
    this.eGe = new GenericLayoutNew_1.GenericLayoutNew(this.GetVerticalLayout(2), this.sGe, this.GetItem(3));
  }
  UpdateGrid(e, t) {
    this.z5t = e;
    var e = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Title);
    var e = this.GetItem(1);
    var i = t.length > 0;
    e.SetUIActive(!i);
    this.eGe.RebuildLayoutByDataNew(t);
  }
  OnBeforeDestroy() {
    this.eGe.ClearChildren();
    this.eGe = undefined;
  }
}
class InfluenceSearchItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.z5t = 0;
    this.Lsi = 0;
    this.ije = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SearchInfluence, this.Lsi, this.z5t);
      UiManager_1.UiManager.CloseView("InfluenceSearchView");
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[7, this.ije]];
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindRedDot("InfluenceReward");
  }
  UpdateItem(e, t) {
    this.Lsi = e;
    this.z5t = t;
    var t = ModelManager_1.ModelManager.InfluenceReputationModel.GetInfluenceInstance(e);
    var e = ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(t.Id);
    this.SetTextureByPath(e.Logo, this.GetTexture(0));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title);
    var i = this.GetText(2);
    if (e.ExtraDesc) {
      i.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.ExtraDesc);
    } else {
      i.SetUIActive(false);
    }
    this.Usi(t.Relation);
    this.K8e(t.Id);
  }
  Usi(e) {
    this.GetItem(3).SetUIActive(e === 2);
    this.GetItem(4).SetUIActive(e === 3);
    this.GetItem(5).SetUIActive(e === 1);
  }
  K8e(e) {
    RedDotController_1.RedDotController.BindRedDot("InfluenceReward", this.GetItem(6), undefined, e);
  }
}
//# sourceMappingURL=InfluenceSearchView.js.map
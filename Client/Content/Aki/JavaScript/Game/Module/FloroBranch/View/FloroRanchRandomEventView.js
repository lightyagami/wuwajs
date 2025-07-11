"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchRandomEventItem = exports.FloroRanchRandomEventView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const FloroRanchController_1 = require("../FloroRanchController");
class FloroRanchRandomEventView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.pIa = undefined;
    this.PNo = undefined;
    this.iO1 = undefined;
    this.WUu = 0;
    this.QUu = () => {
      var t = new FloroRanchRandomEventItem();
      t.BindClickCallback(this.KUu);
      return t;
    };
    this.sOt = () => {
      var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().Id;
      var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
      FloroRanchController_1.FloroRanchController.SendFloroRanchPlayEventChoiceRequest(t, e, this.pIa.J2s, this.WUu, t => {
        this.CloseMe();
        this.PNo?.();
      });
    };
    this.KUu = (t, e) => {
      if (this.WUu !== e) {
        this.WUu = e;
        this.iO1.SelectGridProxy(t);
      }
    };
    this.odu = () => {
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.HideRecordView();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[7, UE.SpineSkeletonAnimationComponent], [0, UE.UIText], [1, UE.UIText], [2, UE.UIGridLayout], [3, UE.UIButtonComponent], [8, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[4, this.sOt], [5, this.odu]];
  }
  async OnBeforeStartAsync() {}
  OnStart() {
    var t = this.OpenParam;
    this.PNo = t.CloseCallback;
    this.pIa = t.EventData;
    this.iO1 = new GenericLayout_1.GenericLayout(this.GetGridLayout(2), this.QUu, this.GetItem(3).GetOwner());
  }
  OnBeforeShow() {
    var t = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchRandomEvent(this.pIa.J2s);
    this.GetText(0)?.ShowTextNew(t.GetEventTitle());
    this.GetText(1)?.ShowTextNew(t.GetEventDesc());
    var t = this.pIa.Iru;
    this.iO1?.RefreshByData(t);
    this.GetSpine(7).SetAnimation(0, "idle", true);
  }
}
exports.FloroRanchRandomEventView = FloroRanchRandomEventView;
class FloroRanchRandomEventItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.NTt = undefined;
    this.XUu = 0;
    this.kqe = () => {
      this.NTt(this.GridIndex, this.XUu);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  Refresh(t, e, i) {
    this.XUu = t;
    t = ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchTagConfig(this.XUu);
    if (t) {
      this.GetText(1)?.ShowTextNew(t.Name);
    } else {
      this.GetText(1)?.ShowTextNew("Farm_Skip");
    }
  }
  BindClickCallback(t) {
    this.NTt = t;
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleStateForce(1);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleStateForce(0);
  }
}
exports.FloroRanchRandomEventItem = FloroRanchRandomEventItem;
//# sourceMappingURL=FloroRanchRandomEventView.js.map
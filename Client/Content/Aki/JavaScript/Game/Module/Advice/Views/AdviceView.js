"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviceView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const AdviceItem_1 = require("./AdviceItem");
const WAITUPDATECOUNT = 1;
class AdviceView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.uje = undefined;
    this.cje = false;
    this.mje = 0;
    this.dje = () => {
      this.Cje();
      this.gje();
      this.Qbe();
    };
    this.sGe = (e, t, i) => {
      t = new AdviceItem_1.AdviceItem(t);
      t.Update(e);
      return {
        Key: i,
        Value: t
      };
    };
    this.fje = e => {
      var t;
      if (this.cje && this.mje >= WAITUPDATECOUNT) {
        this.cje = false;
        t = this.pje(this.uje);
        this.GetScrollViewWithScrollbar(1).SetScrollProgress(t);
        this.xqe.UnBindLateUpdate();
      }
      this.mje++;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIText]];
  }
  OnStart() {
    this.xqe = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(1), this.sGe);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnDeleteAdviceSuccess, this.dje);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCreateAdviceSuccess, this.dje);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnDeleteAdviceSuccess, this.dje);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCreateAdviceSuccess, this.dje);
  }
  OnAfterShow() {
    this.Cje();
    this.gje();
    this.Qbe();
  }
  Cje() {
    this.uje = new Array();
    var t = ModelManager_1.ModelManager.AdviceModel.GetAdviceArray();
    for (let e = t.length - 1; e >= 0; e--) {
      this.uje.push(t[e]);
    }
    this.xqe.RefreshByData(this.uje);
    this.xqe.UnBindLateUpdate();
    this.cje = true;
    this.mje = 0;
    this.xqe.BindLateUpdate(this.fje);
  }
  Qbe() {
    var e = ModelManager_1.ModelManager.AdviceModel.GetAdviceArray();
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("AdviceCreateLimit") ?? 0;
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "ReputationNormalValue", e.length, t);
  }
  pje(t) {
    let i = 0;
    for (let e = 0; e < t.length; e++) {
      if (ModelManager_1.ModelManager.AdviceModel.AdviceViewShowId === t[e].GetAdviceBigId()) {
        i = e;
        break;
      }
    }
    return i / (t.length - 1);
  }
  gje() {
    var e = ModelManager_1.ModelManager.AdviceModel.GetAdviceArray().length === 0;
    this.GetItem(2).SetUIActive(e);
    this.GetScrollViewWithScrollbar(1).GetRootComponent().SetUIActive(!e);
  }
  OnBeforeDestroy() {
    this.xqe.ClearChildren();
  }
}
exports.AdviceView = AdviceView;
//# sourceMappingURL=AdviceView.js.map
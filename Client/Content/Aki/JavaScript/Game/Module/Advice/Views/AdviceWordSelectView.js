"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviceWordSelectView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const AdviceWordSelectItem_1 = require("./AdviceWordSelectItem");
const WAITUPDATECOUNT = 1;
class AdviceWordSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.cje = false;
    this.mje = 0;
    this.Mje = new Array();
    this.sGe = (e, i, t) => {
      i = new AdviceWordSelectItem_1.AdviceWordSelectItem(i);
      i.Update(e, ModelManager_1.ModelManager.AdviceModel.CurrentChangeWordType);
      return {
        Key: t,
        Value: i
      };
    };
    this.L3e = () => {
      var e;
      var i;
      if (ModelManager_1.ModelManager.AdviceModel.CurrentChangeWordType === 0) {
        e = ModelManager_1.ModelManager.AdviceModel.CurrentPreSelectWordId;
        i = ModelManager_1.ModelManager.AdviceModel.CurrentPreSelectSentenceIndex;
        ModelManager_1.ModelManager.AdviceModel.CurrentSentenceWordMap.set(i, e);
        ModelManager_1.ModelManager.AdviceModel.OnChangeSentence(i);
      } else {
        ModelManager_1.ModelManager.AdviceModel.CurrentConjunctionId = ModelManager_1.ModelManager.AdviceModel.CurrentPreSelectWordId;
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangeAdviceWord);
      this.CloseMe();
    };
    this.uHe = () => {
      this.CloseMe();
    };
    this.fje = e => {
      var i;
      if (this.cje && this.mje >= WAITUPDATECOUNT) {
        this.cje = false;
        i = this.pje(this.Mje);
        this.GetScrollViewWithScrollbar(0).SetScrollProgress(i);
        this.xqe.UnBindLateUpdate();
      }
      this.mje++;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem], [3, UE.UIButtonComponent], [2, UE.UIButtonComponent], [4, UE.UIText]];
    this.BtnBindInfo = [[3, this.uHe], [2, this.L3e]];
  }
  OnStart() {
    this.xqe = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(0), this.sGe);
  }
  OnAfterShow() {
    ModelManager_1.ModelManager.AdviceModel.CurrentPreSelectWordId = ModelManager_1.ModelManager.AdviceModel.CurrentSelectWordId;
    this.bqe();
    this.mGe();
  }
  mGe() {
    if (ModelManager_1.ModelManager.AdviceModel.CurrentChangeWordType === 0) {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), "AdvicePutSentence");
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), "AdvicePutWord");
    }
  }
  bqe() {
    var e = ModelManager_1.ModelManager.AdviceModel.CurrentChangeWordType;
    this.Mje = new Array();
    if (e === 0) {
      ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceConfigs().forEach(e => {
        this.Mje.push(e.Id);
      });
    } else {
      ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceConjunctionConfigs().forEach(e => {
        this.Mje.push(e.Id);
      });
    }
    this.xqe.RefreshByData(this.Mje);
    this.xqe.UnBindLateUpdate();
    this.cje = true;
    this.mje = 0;
    this.xqe.BindLateUpdate(this.fje);
  }
  pje(i) {
    let t = 0;
    for (let e = 0; e < i.length; e++) {
      if (ModelManager_1.ModelManager.AdviceModel.CurrentSelectWordId === i[e]) {
        t = e;
        break;
      }
    }
    return t / (i.length - 1);
  }
  OnBeforeDestroy() {
    this.xqe.ClearChildren();
  }
}
exports.AdviceWordSelectView = AdviceWordSelectView;
//# sourceMappingURL=AdviceWordSelectView.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviceMutiSentenceSelectView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const AdviceSentenceSelectItem_1 = require("./AdviceSentenceSelectItem");
const AdviceSentenceSelectItemContent_1 = require("./AdviceSentenceSelectItemContent");
const WAITUPDATECOUNT = 1;
class AdviceMutiSentenceSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OHe = undefined;
    this.kHe = undefined;
    this.FHe = false;
    this.VHe = 0;
    this.HHe = false;
    this.jHe = 0;
    this.WHe = (e, t, i) => {
      t = new AdviceSentenceSelectItem_1.AdviceSentenceSelectItem(t);
      t.UpdateItem(e);
      return {
        Key: i,
        Value: t
      };
    };
    this.KHe = (e, t, i) => {
      t = new AdviceSentenceSelectItemContent_1.AdviceSentenceSelectItemContent(t);
      t.UpdateItem(e);
      return {
        Key: i,
        Value: t
      };
    };
    this.L3e = () => {
      ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.forEach((e, t) => {
        if (ModelManager_1.ModelManager.AdviceModel.CurrentSentenceWordMap.get(t) !== e) {
          ModelManager_1.ModelManager.AdviceModel.OnChangeSentence(t);
        }
      });
      ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.forEach((e, t) => {
        ModelManager_1.ModelManager.AdviceModel.CurrentSentenceWordMap.set(t, e);
      });
      this.CloseMe();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangeAdviceWord);
    };
    this.uHe = () => {
      this.CloseMe();
    };
    this.QHe = () => {
      var e = new Array();
      e.push(0);
      e.push(1);
      this.OHe.RefreshByData(e);
      this.XHe();
      this.jHe = 0;
      this.OHe.UnBindLateUpdate();
      this.HHe = true;
      this.OHe.BindLateUpdate(this.$He);
    };
    this.$He = e => {
      var t;
      if (this.HHe && this.jHe >= WAITUPDATECOUNT) {
        this.HHe = false;
        t = this.YHe();
        this.GetScrollViewWithScrollbar(0).SetScrollProgress(t);
        this.OHe.UnBindLateUpdate();
      }
      this.jHe++;
    };
    this.XHe = () => {
      const t = new Array();
      ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceConfigs().forEach(e => {
        t.push(e.Id);
      });
      this.kHe.RefreshByData(t);
      this.VHe = 0;
      this.kHe.UnBindLateUpdate();
      this.FHe = true;
      this.kHe.BindLateUpdate(this.JHe);
    };
    this.JHe = e => {
      var t;
      if (this.FHe && this.VHe >= WAITUPDATECOUNT) {
        this.FHe = false;
        t = this.zHe();
        this.GetScrollViewWithScrollbar(2).SetScrollProgress(t);
      }
      if (this.VHe >= WAITUPDATECOUNT + 1) {
        t = this.zHe();
        this.GetScrollScrollbar(6).SetValue(t);
        this.kHe.UnBindLateUpdate();
      }
      this.VHe++;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [5, UE.UIButtonComponent], [4, UE.UIButtonComponent], [6, UE.UIScrollbarComponent], [7, UE.UIText]];
    this.BtnBindInfo = [[4, this.uHe], [5, this.L3e]];
  }
  OnStart() {
    this.OHe = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(0), this.WHe);
    this.kHe = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(2), this.KHe);
    var e;
    var t = this.kHe.TempOriginalItem;
    if (t && (e = (t = t.GetOwner()).GetComponentByClass(UE.UIButtonComponent.StaticClass()))) {
      t.K2_DestroyComponent(e);
    }
    ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex = 0;
    ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.clear();
    ModelManager_1.ModelManager.AdviceModel.CurrentSentenceWordMap.forEach((e, t) => {
      ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.set(t, e);
    });
    this.QHe();
    this.mGe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnClickAdviceSort, this.QHe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnClickAdviceSort, this.QHe);
  }
  mGe() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(7), "AdvicePutSentence");
  }
  YHe() {
    var t = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordTypeConfigs();
    let i = 0;
    for (let e = 0; e < t.length; e++) {
      if (t[e].Id === ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId) {
        i = e;
        break;
      }
    }
    return i / (t.length - 1);
  }
  zHe() {
    var t = ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.get(ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex);
    var i = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceConfigs();
    let s = 0;
    for (let e = 0; e < i.length; e++) {
      if (i[e].Id === t) {
        s = e;
        break;
      }
    }
    return s / (i.length - 1);
  }
  OnBeforeDestroy() {
    if (this.OHe) {
      this.OHe.ClearChildren();
      this.OHe = undefined;
    }
    if (this.kHe) {
      this.kHe.ClearChildren();
      this.kHe = undefined;
    }
  }
}
exports.AdviceMutiSentenceSelectView = AdviceMutiSentenceSelectView;
//# sourceMappingURL=AdviceMutiSentenceSelectView.js.map
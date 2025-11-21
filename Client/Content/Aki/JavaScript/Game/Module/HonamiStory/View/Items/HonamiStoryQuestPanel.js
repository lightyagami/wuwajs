"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryQuestPanel = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const HonamiStoryDefine_1 = require("../../HonamiStoryDefine");
const HonamiStoryUtil_1 = require("../../HonamiStoryUtil");
class HonamiStoryQuestPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.E_m = undefined;
    this.I_m = undefined;
    this.T_m = () => new HonamiStoryQuestItem();
    this.b_m = () => {
      UiManager_1.UiManager.OpenView("HonamiStoryQuestView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIVerticalLayout], [7, UE.UIItem]];
    this.BtnBindInfo = [[1, this.b_m]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.E_m = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.T_m);
    this.I_m = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(6), this.T_m);
  }
  Refresh(e = true) {
    var i = HonamiStoryUtil_1.HonamiStoryUtil.CheckInActivityQuest();
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetQuestDataListByQuestType(1);
    if (i && t.length > 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t[0].GetNameKey());
      this.E_m?.RefreshByData(t);
    }
    this.GetItem(0).SetUIActive(i && t.length > 0);
    var i = ModelManager_1.ModelManager.FunctionModel?.IsOpen(10113) ?? false;
    let r = e && i;
    if (r) {
      if ((t = ModelManager_1.ModelManager.HonamiStoryModel.GetQuestDataListByQuestType(2)).length === 0) {
        r = false;
      } else {
        this.I_m?.RefreshByData(t);
      }
    }
    this.GetItem(5).SetUIActive(r);
  }
}
exports.HonamiStoryQuestPanel = HonamiStoryQuestPanel;
class HonamiStoryQuestItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[2, UE.UISprite], [1, UE.UISprite], [0, UE.UIText]];
  }
  Refresh(i, e, t) {
    var r = i.TaskType;
    var n = this.GetText(0);
    if (r === 1) {
      n?.SetRichText(true);
      r = i.GetTreeShowData()?.MainStepInfo;
      let e = "";
      if (r) {
        e = PublicUtil_1.PublicUtil.GetConfigTextByKey(r.TidTitle);
      }
      n?.SetText(StringUtils_1.StringUtils.Format(HonamiStoryDefine_1.RICHTXT_QUEST, e));
    } else {
      r = i.Config;
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.GetNameKey());
      if (r.TaskType !== 1) {
        n?.SetRichText(false);
        n?.SetText(i);
      } else {
        n?.SetRichText(true);
        n?.SetText(StringUtils_1.StringUtils.Format(HonamiStoryDefine_1.RICHTXT_QUEST, i));
      }
    }
    this.GetSprite(2).SetUIActive(false);
    this.GetSprite(1).SetUIActive(true);
  }
}
//# sourceMappingURL=HonamiStoryQuestPanel.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipMainQuestWindowView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../../../Common/Button/ButtonItem");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityDirectTrainHelper_1 = require("../ActivityDirectTrainHelper");
class SkipMainQuestWindowView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.I8a = undefined;
    this.vKt = undefined;
    this.vxl = undefined;
    this.Sxl = undefined;
    this.LOe = 0;
    this.dxl = () => {
      this.CloseMe();
      this.vxl?.();
    };
    this.Mxl = () => {
      this.CloseMe();
      this.Sxl?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIText]];
  }
  OnStart() {
    var t = this.OpenParam;
    var i = ModelManager_1.ModelManager.ActivityDirectTrainModel;
    this.vxl = t?.GotoCallBack;
    this.Sxl = t?.SkipCallBack;
    this.LOe = t?.ActivityId;
    this.I8a = new ButtonItem_1.ButtonItem(this.GetButton(2).RootUIComp);
    this.I8a.SetFunction(this.dxl);
    this.vKt = new ButtonItem_1.ButtonItem(this.GetButton(3).RootUIComp);
    this.vKt.SetFunction(this.Mxl);
    this.PPl(i.GetSkipTipTitleTextId(this.LOe));
    this.xPl(i.GetSkipTipContentTextId(this.LOe));
    this.wPl();
  }
  xPl(t, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t, i);
  }
  PPl(t, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t, i);
  }
  wPl() {
    var t;
    var i;
    var e = ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.GetRecommendQuestLinkId(this.LOe);
    var r = ModelManager_1.ModelManager.QuestNewModel?.GetQuestConfig(e);
    if (r && (i = ConfigManager_1.ConfigManager.QuestNewConfig.GetChapterConfig(r.ChapterId))) {
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.ChapterNum);
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.SectionNum);
      e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e)?.Name ?? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.TidName);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "DirectTrainActivity_ChapterName", t, i, e);
    }
  }
}
exports.SkipMainQuestWindowView = SkipMainQuestWindowView;
//# sourceMappingURL=SkipMainQuestWindowView.js.map
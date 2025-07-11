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
    var i = this.OpenParam;
    this.vxl = i?.GotoCallBack;
    this.Sxl = i?.SkipCallBack;
    this.I8a = new ButtonItem_1.ButtonItem(this.GetButton(2).RootUIComp);
    this.I8a.SetFunction(this.dxl);
    this.vKt = new ButtonItem_1.ButtonItem(this.GetButton(3).RootUIComp);
    this.vKt.SetFunction(this.Mxl);
    this.PPl("DirectTrainActivity_Tip_Title");
    this.xPl("DirectTrainActivity_Tip_Content");
    this.wPl();
  }
  xPl(i, ...t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i, t);
  }
  PPl(i, ...t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i, t);
  }
  wPl() {
    var i;
    var t;
    var e = ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.GetRecommendQuestLinkId();
    var r = ModelManager_1.ModelManager.QuestNewModel?.GetQuestConfig(e);
    if (r && (t = ConfigManager_1.ConfigManager.QuestNewConfig.GetChapterConfig(r.ChapterId))) {
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.ChapterNum);
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.SectionNum);
      e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e)?.Name ?? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.TidName);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "DirectTrainActivity_ChapterName", i, t, e);
    }
  }
}
exports.SkipMainQuestWindowView = SkipMainQuestWindowView;
//# sourceMappingURL=SkipMainQuestWindowView.js.map
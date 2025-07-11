"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskMainLineModule = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class MainLineItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.Xy = 0;
    this.OnSkipToTask = () => {
      var i;
      var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(this.Data.TaskId);
      if (t === 0) {
        i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.Data.UnlockTip);
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(i);
      } else if (t !== 3) {
        if (ModelManager_1.ModelManager.MoonChasingModel.ReadQuestIdUnlockFlag(this.Data.TaskId)) {
          this.RefreshRedDot();
        }
        ControllerHolder_1.ControllerHolder.QuestNewController.TryTrackAndOpenWorldMap(this.Data.TaskId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIButtonComponent], [5, UE.UITexture], [4, UE.UIItem], [6, UE.UIItem], [7, UE.UIText], [8, UE.UITexture], [9, UE.UITexture], [10, UE.UITexture]];
    this.BtnBindInfo = [[3, this.OnSkipToTask]];
  }
  OnBeforeShow() {
    this.Refresh();
  }
  RefreshRedDot() {
    var i = ModelManager_1.ModelManager.MoonChasingModel.CheckQuestIdRedDotState(this.Data.TaskId);
    this.GetItem(4).SetUIActive(i);
  }
  SetData(i, t) {
    this.Data = i;
    this.Xy = t;
  }
  RefreshName() {
    var i = ConfigManager_1.ConfigManager.TaskConfig.GetMainLineTaskById(this.Data.Id);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.TaskName);
    this.GetText(7)?.SetText((this.Xy + 1).toString());
  }
  RefreshState() {
    var i = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(this.Data.TaskId);
    this.GetItem(2).SetUIActive(i === 0);
    this.GetItem(1).SetUIActive(i === 3);
    if (i === 0) {
      this.GetTexture(5).SetColor(UE.Color.FromHex("#8C836DFF"));
    } else {
      this.GetTexture(5).SetColor(UE.Color.FromHex("#FFFFFFFF"));
    }
    for (const e of [8, 9, 10]) {
      var t = this.GetTexture(e);
      t.SetChangeColor(i === 0, t.changeColor);
    }
  }
  RefreshImage() {
    if (!StringUtils_1.StringUtils.IsEmpty(this.Data.Icon)) {
      this.SetTextureByPath(this.Data.Icon, this.GetTexture(5));
    }
  }
  IsPrevTaskActive() {
    return this.Data.PrevTaskId === 0 || ModelManager_1.ModelManager.QuestNewModel.GetQuestState(this.Data.PrevTaskId) !== 0;
  }
  Refresh() {
    this.RefreshName();
    if (this.IsPrevTaskActive()) {
      this.RefreshState();
      this.RefreshImage();
      this.RefreshRedDot();
    } else {
      this.SetActive(false);
    }
  }
}
class MainLineBranchItem extends MainLineItem {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIButtonComponent], [5, UE.UITexture], [4, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[3, this.OnSkipToTask]];
  }
  SetData(i, t) {
    this.Data = i;
  }
  RefreshName() {
    var i = ConfigManager_1.ConfigManager.TaskConfig.GetMainLineTaskById(this.Data.Id);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.TaskName);
  }
  RefreshState() {
    var i = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(this.Data.TaskId);
    this.GetItem(2).SetUIActive(i === 0);
    this.GetItem(1).SetUIActive(i === 3);
    if (i === 0) {
      this.GetTexture(5).SetColor(UE.Color.FromHex("#8C836DFF"));
    } else {
      this.GetTexture(5).SetColor(UE.Color.FromHex("#FFFFFFFF"));
    }
  }
  Refresh() {
    this.RefreshName();
    if (this.IsPrevTaskActive()) {
      this.RefreshState();
      this.RefreshImage();
      this.RefreshRedDot();
    } else {
      this.SetActive(false);
    }
  }
}
const QUEST_ON_MAINLINE_LAST_INDEX = 5;
class TaskMainLineModule extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.wno = [];
    this.Jva = 0;
    this.B3a = false;
    this.Lbt = true;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIHorizontalLayout]];
  }
  OnStart() {}
  async OnBeforeShowAsyncImplement() {
    var t;
    var e = [];
    var s = ConfigManager_1.ConfigManager.TaskConfig.GetAllMainLineTask();
    for (let i = 0; i < s.length; i++) {
      if (!this.wno[i]) {
        if (s[i].TaskType === 0) {
          this.wno[i] = new MainLineItem();
        } else {
          this.wno[i] = new MainLineBranchItem();
        }
        this.wno[i].SetData(s[i], i);
        e.push(this.wno[i].CreateThenShowByActorAsync(this.GetItem(i + 1).GetOwner()));
      }
      if (i === QUEST_ON_MAINLINE_LAST_INDEX) {
        t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(s[i].TaskId);
        this.GetItem(9).SetUIActive(t === 3);
      }
    }
    await Promise.all(e);
    let r = -1;
    if (this.B3a) {
      for (let i = this.wno.length - 1; i >= 0; i--) {
        if (this.wno[i].IsPrevTaskActive()) {
          r = i;
          break;
        }
      }
    } else {
      r = s.findIndex(i => i.Id === this.Jva);
    }
    if (r >= 0) {
      let i = this.wno[r].GetRootItem();
      if (s[r].TaskType === 1) {
        i = this.GetItem(9);
      }
      const h = this.GetHorizontalLayout(10);
      const n = this.GetScrollViewWithScrollbar(0);
      h.OnLateUpdate.Bind(() => {
        if (this.Lbt) {
          this.Lbt = false;
        } else {
          n?.ScrollTo(i);
          h?.OnLateUpdate.Unbind();
        }
      });
    }
  }
  SetSelectTaskId(i, t) {
    this.Jva = i;
    this.B3a = t;
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    var t;
    var e;
    if (!(i.length < 2)) {
      if ((e = i[1]) === "Start") {
        if (this.wno.length < 1) {
          return undefined;
        } else {
          return [t = this.wno[0].GetRootItem(), t];
        }
      } else if (e !== "End" || i.length < 3 || (t = i[2], e = this.GetScrollViewWithScrollbar(0), this.wno.length < 1) || (i = this.wno[this.wno.length - 1], e.ScrollTo(i.GetRootItem()), (e = this.GetGuideUiItem(t)) === undefined)) {
        return undefined;
      } else {
        return [e, e];
      }
    }
  }
}
exports.TaskMainLineModule = TaskMainLineModule;
//# sourceMappingURL=TaskMainLineModule.js.map
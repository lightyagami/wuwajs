"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityTurntableDailyItem = exports.ActivityTurntableDailyPanel = exports.ActivityTurntableToggleItem = exports.ActivityTurntableToggleGroupItem = exports.ActivityTurntableQuestItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivitySmallItemGrid_1 = require("../UniversalComponents/ActivitySmallItemGrid");
class ActivityTurntableQuestItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.FRe = 0;
    this.LOe = 0;
    this.gOe = undefined;
    this.uLn = () => {
      if (this.FRe) {
        UiManager_1.UiManager.OpenView("QuestView", this.FRe);
        this.t2n()?.ReadCurrentUnlockQuest();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIItem]];
    this.BtnBindInfo = [[3, this.uLn]];
  }
  async OnBeforeStartAsync() {
    var t = new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
    await t.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
    this.gOe = t;
  }
  Refresh(t, i, e, s) {
    this.gOe.Refresh({
      Item: i,
      HasClaimed: t
    });
    this.GetButton(3).RootUIComp.SetUIActive(!t);
    this.FRe = e;
    this.LOe = s;
  }
  SetTitle(t, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t, ...i);
  }
  SetTxtById(t, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, ...i);
  }
  SetTxt(t) {
    this.GetText(1).SetText(t);
  }
  SetRedDot(t) {
    this.GetItem(4).SetUIActive(t);
  }
  t2n() {
    if (this.LOe) {
      return ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.LOe);
    }
  }
}
exports.ActivityTurntableQuestItem = ActivityTurntableQuestItem;
class ActivityTurntableToggleGroupItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.cLn = undefined;
    this.mLn = undefined;
    this.zji = undefined;
    this.CanToggleExecuteChange = undefined;
    this.ToggleCallBack = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(0);
    this.cLn = new ActivityTurntableToggleItem();
    await this.cLn.CreateThenShowByActorAsync(t.GetOwner());
    this.cLn.ToggleCallBack = this.ToggleCallBack;
    this.cLn.CanToggleExecuteChange = this.CanToggleExecuteChange;
    var t = this.GetItem(1);
    this.mLn = new ActivityTurntableToggleItem();
    await this.mLn.CreateThenShowByActorAsync(t.GetOwner());
    this.mLn.ToggleCallBack = this.ToggleCallBack;
    this.mLn.CanToggleExecuteChange = this.CanToggleExecuteChange;
  }
  OnStart() {
    this.SetToggleDisable(false);
  }
  SetToggleDisable(t) {
    var i = this.GetToggleState();
    this.zji = t ? this.mLn : this.cLn;
    if (i !== undefined) {
      this.zji.SetToggleState(i === 1);
    }
    this.GetItem(0)?.SetUIActive(!t);
    this.GetItem(1)?.SetUIActive(t);
  }
  Refresh(t) {
    this.cLn.Refresh(t);
    this.mLn.Refresh(t);
  }
  GetToggleState() {
    return this.zji?.GetToggleState();
  }
  SetToggleState(t, i = false) {
    this.zji?.SetToggleState(t, i);
  }
}
exports.ActivityTurntableToggleGroupItem = ActivityTurntableToggleGroupItem;
class ActivityTurntableToggleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RoundId = 0;
    this.Toggle = undefined;
    this.CanToggleExecuteChange = undefined;
    this.ToggleCallBack = undefined;
    this.uFe = () => !this.CanToggleExecuteChange || this.CanToggleExecuteChange(this.RoundId);
    this.cFe = () => {
      if (this.ToggleCallBack) {
        this.ToggleCallBack(this.RoundId, this.Toggle.GetToggleState() === 1);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UISprite]];
    this.BtnBindInfo = [[0, this.cFe]];
  }
  OnStart() {
    this.Toggle = this.GetExtendToggle(0);
    if (this.Toggle) {
      this.Toggle.CanExecuteChange.Unbind();
      this.Toggle.CanExecuteChange.Bind(this.uFe);
    }
  }
  Refresh(t) {
    this.RoundId = t;
    this.dLn();
  }
  dLn() {
    var t = this.RoundId + 1;
    var i = "SP_TurntableSelect_Index0" + t;
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetSpriteByPath(i, this.GetSprite(2), false);
    var i = "SP_TurntableNormal_Index0" + t;
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetSpriteByPath(t, this.GetSprite(1), false);
  }
  GetToggleState() {
    return this.Toggle.GetToggleState();
  }
  SetToggleState(t, i = false) {
    this.Toggle.SetToggleState(t ? 1 : 0, i);
  }
}
exports.ActivityTurntableToggleItem = ActivityTurntableToggleItem;
class ActivityTurntableDailyPanel extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.ActivityBaseData = t;
    this.tLl = undefined;
    this.iLl = () => new ActivityTurntableDailyItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem]];
  }
  OnStart() {
    this.tLl = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.iLl);
  }
  Refresh() {
    this.tLl.RefreshByData(this.ActivityBaseData.GetAllTurntableDailyQuestData());
  }
}
exports.ActivityTurntableDailyPanel = ActivityTurntableDailyPanel;
class ActivityTurntableDailyItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText]];
  }
  Refresh(t, i, e) {
    this.GetSprite(0).SetUIActive(t.Status === 2);
    var s = ConfigManager_1.ConfigManager.ActivityTurntableConfig.GetTurntableTaskByTaskId(t.Id);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.TaskDescription, t.Current, t.Target);
  }
}
exports.ActivityTurntableDailyItem = ActivityTurntableDailyItem;
//# sourceMappingURL=ActivityTurntableItem.js.map
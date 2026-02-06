"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleChildViewPanel = undefined;
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class BattleChildViewPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.sJe = [];
    this.i$e = [];
    this.ChildViewData = undefined;
    this.ChildType = 0;
    this.Visible = false;
    this.IsEnable = false;
    this.IsShowOnce = false;
    this.iJe = () => {
      var i = this.Visible;
      this.Visible = this.ChildViewData.GetChildVisible(this.ChildType);
      this.nJe(i);
    };
  }
  async InitializeAsync() {}
  InitializeTemp() {}
  async OnBeforeStartAsync() {
    if (this.OpenParam !== undefined) {
      this.ChildType = this.OpenParam;
    }
    this.ChildViewData = ModelManager_1.ModelManager.BattleUiModel.ChildViewData;
    this.InitializeTemp();
    await this.InitializeAsync();
    if (!this.IsDestroyOrDestroying) {
      this.Visible = this.ChildViewData.GetChildVisible(this.ChildType);
      this.ChildViewData.AddCallback(this.ChildType, this.iJe);
      this.AddEvents();
    }
  }
  ShowBattleChildViewPanel() {
    if (this.CheckBattleChildViewPanelShowCondition() && (this.IsEnable = true, this.rJe(0, true), this.SetActive(this.Visible), this.Visible)) {
      this.aJe();
    }
  }
  HideBattleChildViewPanel() {
    this.IsEnable = false;
    var i = this.Visible;
    this.rJe(0, false);
    this.SetActive(this.Visible);
    if (i) {
      this.OnHideBattleChildViewPanel();
    }
  }
  Reset() {
    this.rJe(0, false);
    this.hJe();
    this.RemoveEvents();
    this.ClearAllTagSignificantChangedCallback();
    if (this.ChildViewData) {
      this.ChildViewData.RemoveCallback(this.ChildType, this.iJe);
      this.ChildViewData = undefined;
    }
  }
  SetActive(i) {
    if (this.Visible !== i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "战斗子界面不要直接调用SetActive, 请调用SetVisible");
      }
    } else {
      super.SetActive(i);
    }
  }
  GetVisible() {
    return this.Visible;
  }
  SetVisible(i, t) {
    var e = this.Visible;
    this.rJe(i, t);
    this.nJe(e);
  }
  nJe(i) {
    if (this.IsEnable && i !== (i = this.GetVisible())) {
      this.SetActive(i);
      if (i) {
        this.aJe();
      } else {
        this.OnHideBattleChildViewPanel();
      }
    }
  }
  rJe(i, t) {
    if (this.ChildType !== 0) {
      this.Visible = this.ChildViewData.SetChildVisible(i, this.ChildType, t, false);
    }
  }
  aJe() {
    if (this.IsShowOnce) {
      this.OnShowBattleChildViewPanel(false);
    } else {
      this.IsShowOnce = true;
      this.OnShowBattleChildViewPanel(true);
    }
  }
  OnShowBattleChildViewPanel(i) {}
  OnHideBattleChildViewPanel() {}
  OnTickBattleChildViewPanel(i) {}
  OnAfterTickBattleChildViewPanel(i) {}
  AddEvents() {}
  RemoveEvents() {}
  async NewStaticChildViewAsync(i, t, e) {
    t = new t();
    await t.NewByRootActorAsync(i, e);
    this.sJe.push(t);
    return t;
  }
  hJe() {
    for (const i of this.sJe) {
      if (i) {
        i.DestroyCompatible();
      }
    }
    this.sJe.length = 0;
  }
  async NewDynamicChildViewByResourceId(i, t, e, s = false, h) {
    e = new e();
    try {
      await e.NewByResourceId(i, t, s, h);
    } catch (i) {
      if (i instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("UiCommon", 17, "战斗界面子界面创建失败", i, ["资源名", t], ["错误", i.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCommon", 17, "战斗界面子界面创建失败", ["资源名", t], ["错误", i]);
      }
    }
    return e;
  }
  NewDynamicChildViewByResourceIdWithCallback(i, t, e, s = false, h, n) {
    const a = new e();
    try {
      a.NewByResourceId(i, t, s, n).then(() => {
        if (h) {
          h(a);
        }
      }, () => {});
    } catch (i) {
      if (i instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("UiCommon", 17, "战斗界面子界面创建失败", i, ["资源名", t], ["错误", i.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCommon", 17, "战斗界面子界面创建失败", ["资源名", t], ["错误", i]);
      }
    }
    return a;
  }
  async NewDynamicChildViewAsync(i, t, e) {
    t = new t();
    await t.NewByRootActorAsync(i, e);
    return t;
  }
  GetOperationType() {
    return Info_1.Info.OperationType;
  }
  ListenForTagSignificantChanged(i, t, e) {
    var i = i.Entity.GetComponent(217);
    if (i) {
      i = i.ListenForTagAddOrRemove(t, e);
      this.i$e.push(i);
    }
  }
  ClearAllTagSignificantChangedCallback() {
    if (this.i$e) {
      for (const i of this.i$e) {
        i.EndTask();
      }
      this.i$e.length = 0;
    }
  }
  ContainsTag(i, t) {
    i = i.Entity.GetComponent(217);
    return !!i && i.HasTag(t);
  }
  GetItem(i) {
    return super.GetItem(i);
  }
  GetUiActorForGuide() {}
  OnSeamlessTravelFinish() {}
  RefreshPureMode(i) {
    this.RootItem?.SetAlpha(i ? 0 : 1);
  }
  IsChildType(i) {
    return this.ChildType === i;
  }
  CheckBattleChildViewPanelShowCondition() {
    return this.OnCheckBattleChildViewPanelShowCondition();
  }
  OnCheckBattleChildViewPanelShowCondition() {
    return true;
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Guide", 74, "主界面子面板聚焦引导获取方法未实现");
    }
  }
}
exports.BattleChildViewPanel = BattleChildViewPanel;
//# sourceMappingURL=BattleChildViewPanel.js.map
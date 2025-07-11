"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingTowerBuffView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const MowingTowerModel_1 = require("./MowingTowerModel");
class MowingTowerBuffView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.aSn = undefined;
    this.hSn = undefined;
    this.lSn = true;
    this.vVt = undefined;
    this.SPe = undefined;
    this.Jal = true;
    this.I2i = () => {
      return new BuffGridItem();
    };
    this.sOt = () => {
      var t;
      var i = [];
      let e = 1;
      for (const o of this.hSn) {
        if (o.Selected) {
          (t = new MowingTowerModel_1.MowingTowerBuffInfo()).BuffId = o.BuffId;
          t.ChangeAble = true;
          t.Slot = e;
          e++;
          i.push(t);
        }
      }
      var s = this._Sn();
      if (s < this.aSn.GetBuffMaxCount()) {
        for (let t = s; t < this.aSn.GetBuffMaxCount(); t++) {
          var r = this.aSn.GetIndexPrepareSelectBuff(t);
          var h = new MowingTowerModel_1.MowingTowerBuffInfo();
          h.BuffId = 0;
          h.ChangeAble = r.ChangeAble;
          h.Slot = e;
          e++;
          i.push(h);
        }
      }
      this.aSn.SetPrepareSelectBuff(i);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeMowingTowerBuff);
      this.CloseMe();
    };
    this.kqe = t => {
      if (this.Jal && !t.Selected) {
        for (const i of this.hSn) {
          i.Selected = false;
        }
      }
      t.Selected = !t.Selected;
      this.Esi();
      this.Jbi();
    };
    this.uSn = t => !!this.lSn || !!t.Selected || !!this.cSn();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIItem]];
    this.BtnBindInfo = [[3, this.sOt]];
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.lqe.SetTitleByTextIdAndArgNew("MowingTowerBuffViewTitle");
    this.vVt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(4).GetOwner(), this.I2i);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    this.ROn();
    this.aSn = ModelManager_1.ModelManager.MowingTowerModel.CurrentTeamInfo;
    this.hSn = [];
    for (const i of this.aSn.GetOptionBuff()) {
      var t = new BuffScrollItemData();
      t.BuffId = i.BuffId;
      t.Selected = this.aSn.GetPrepareSelectBuff().findIndex(t => t.BuffId === i.BuffId) !== -1;
      t.SelectedAtStart = t.Selected;
      t.OnClickToggle = this.kqe;
      t.CheckClickAble = this.uSn;
      this.hSn.push(t);
    }
    this.Esi();
    this.Jbi();
    this.Jal = this.aSn.LevelInfo.GetMaxBuffCount() === 1;
  }
  ROn() {
    let t = "Start";
    if (ModelManager_1.ModelManager.MowingTowerModel.PlayBackAnimation) {
      t = "ShowView";
    }
    this.SPe?.PlaySequencePurely(t);
    ModelManager_1.ModelManager.MowingTowerModel.PlayBackAnimation = false;
  }
  cSn() {
    return !!this.lSn || !!this.Jal || !!(this.aSn.LevelInfo.GetMaxBuffCount() > this._Sn()) || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("BossRushMaxBuffText"), false);
  }
  _Sn() {
    let t = 0;
    for (const i of this.hSn) {
      if (i.Selected) {
        t++;
      }
    }
    return t;
  }
  Esi() {
    if (this.vVt) {
      var i = [];
      this.lSn = true;
      for (let t = 0; t < this.hSn.length; t += 2) {
        var e = new BuffGridItemData();
        e.BuffScrollItemData1 = this.hSn[t];
        if (t + 1 >= this.hSn.length) {
          i.push(e);
          break;
        }
        e.BuffScrollItemData2 = this.hSn[t + 1];
        i.push(e);
      }
      this.vVt.RefreshByData(i, false, () => {
        this.lSn = false;
      });
      this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(i.length > 0);
    }
  }
  OnBeforeHide() {
    this.vVt?.ClearGridProxies();
  }
  Jbi() {
    this.GetText(2)?.SetUIActive(false);
  }
}
exports.MowingTowerBuffView = MowingTowerBuffView;
class BuffScrollItemData {
  constructor() {
    this.BuffId = 0;
    this.ChangeAble = true;
    this.Selected = false;
    this.SelectedAtStart = false;
    this.OnClickToggle = () => {};
    this.CheckClickAble = undefined;
  }
}
class BuffGridItemData {
  constructor() {
    this.BuffScrollItemData1 = undefined;
    this.BuffScrollItemData2 = undefined;
  }
}
class BuffGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.mSn = undefined;
    this.dSn = undefined;
    this.uat = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    this.sGe();
  }
  async sGe() {
    this.uat = new CustomPromise_1.CustomPromise();
    this.mSn = new BuffScrollItem();
    await this.mSn.CreateByActorAsync(this.GetItem(0).GetOwner());
    this.mSn.SetActive(true);
    this.dSn = new BuffScrollItem();
    await this.dSn.CreateByActorAsync(this.GetItem(1).GetOwner());
    this.dSn.SetActive(true);
    this.uat.SetResult();
  }
  Refresh(t, i, e) {
    this.CSn(t, i, e);
  }
  async CSn(t, i, e) {
    await this.uat?.Promise;
    this.mSn.Refresh(t.BuffScrollItemData1, i, e);
    this.GetItem(0).SetAlpha(1);
    this.mSn.SetToggleActiveState(true);
    if (t.BuffScrollItemData2) {
      this.GetItem(1).SetAlpha(1);
      this.dSn.SetToggleActiveState(true);
      this.dSn.Refresh(t.BuffScrollItemData2, i, e);
    } else {
      this.GetItem(1).SetAlpha(0);
      this.GetItem(1).SetRaycastTarget(false);
      this.dSn.SetToggleActiveState(false);
    }
  }
}
class BuffScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this.pHe = () => !!this.$8i && this.$8i.CheckClickAble(this.$8i);
    this.kqe = () => {
      this.$8i.OnClickToggle(this.$8i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Unbind();
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.pHe);
    this.GetExtendToggle(0).SetToggleState(0);
  }
  SetToggleActiveState(t) {
    this.GetExtendToggle(0).RootUIComp.SetUIActive(t);
  }
  Refresh(t, i, e) {
    this.$8i = t;
    this.wke();
    this.Oqe();
    this.P5e();
    this.Pqe();
    this.gSn();
    this.gFn();
  }
  gFn() {
    this.GetItem(5).SetUIActive(this.$8i.SelectedAtStart);
  }
  Oqe() {
    var t = this.$8i.Selected ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t);
  }
  wke() {
    this.GetItem(4).SetUIActive(false);
  }
  P5e() {
    var t = ConfigManager_1.ConfigManager.MowingTowerConfig.GetMowingTowerBuffById(this.$8i.BuffId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.Name);
  }
  Pqe() {
    var t = ConfigManager_1.ConfigManager.MowingTowerConfig.GetMowingTowerBuffById(this.$8i.BuffId);
    var i = [];
    for (const s of t.DescriptionParam) {
      var e = RegExp(/\[(.*?)\]/g).exec(s);
      if (e && e.length > 1) {
        i.push(...e[1].split(","));
      }
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.Description, ...i);
  }
  gSn() {
    var t = ConfigManager_1.ConfigManager.MowingTowerConfig.GetMowingTowerBuffById(this.$8i.BuffId).Texture;
    this.SetTextureByPath(t, this.GetTexture(1));
  }
}
//# sourceMappingURL=MowingTowerBuffView.js.map
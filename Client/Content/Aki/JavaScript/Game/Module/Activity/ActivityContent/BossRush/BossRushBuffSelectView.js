"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BossRushBuffSelectView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const BossRushModel_1 = require("./BossRushModel");
class BossRushBuffSelectView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.aSn = undefined;
    this.hSn = undefined;
    this.vVt = undefined;
    this.lSn = true;
    this.SPe = undefined;
    this.Jal = false;
    this.I2i = () => {
      return new BuffGridItem();
    };
    this.sOt = () => {
      var t;
      var e = [];
      let i = 1;
      for (const h of this.hSn) {
        if (h.Selected) {
          (t = new BossRushModel_1.BossRushBuffInfo()).BuffId = h.BuffId;
          t.ChangeAble = true;
          t.State = h.State;
          t.Slot = i;
          i++;
          e.push(t);
        }
      }
      var s = this._Sn();
      if (s < this.aSn.GetBuffMaxCount()) {
        for (let t = s; t < this.aSn.GetBuffMaxCount(); t++) {
          var r = ModelManager_1.ModelManager.BossRushModel.CurrentSelectBuffTabName === 0 ? this.aSn.GetIndexPrepareSelectBuff(t) : this.aSn.GetIndexPrepareSelectScoreBuff(t);
          var o = new BossRushModel_1.BossRushBuffInfo();
          o.BuffId = 0;
          o.ChangeAble = r.ChangeAble;
          o.State = o.BuffId === 0 && r.State === Protocol_1.Aki.Protocol.Iks.Proto_BuffSelected ? Protocol_1.Aki.Protocol.Iks.Proto_BuffEmpty : r.State;
          o.Slot = i;
          i++;
          e.push(o);
        }
      }
      if (ModelManager_1.ModelManager.BossRushModel.CurrentSelectBuffTabName === 0) {
        this.aSn.SetPrepareSelectBuff(e);
      } else if (ModelManager_1.ModelManager.BossRushModel.CurrentSelectBuffTabName === 1) {
        this.aSn.SetPrepareSelectScoreBuff(e);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangeBossRushBuff);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RequestChangeBossRushView, "BossRushLevelDetailView");
    };
    this.kqe = t => {
      if (this.Jal && !t.Selected) {
        for (const e of this.hSn) {
          e.Selected = false;
        }
      }
      t.Selected = !t.Selected;
      this.Esi();
      this.Jbi();
    };
    this.uSn = t => {
      if (this.lSn) {
        return true;
      }
      if (t.State !== Protocol_1.Aki.Protocol.Iks.Proto_BuffLocked) {
        if (t.Selected) {
          return true;
        }
        if (this.cSn()) {
          return true;
        }
      }
      return false;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.sOt]];
  }
  OnStart() {
    this.vVt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.I2i);
    this.GetItem(1).SetUIActive(false);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBossRushBuffViewOpened);
  }
  OnBeforeShow() {
    this.ROn();
    this.aSn = ModelManager_1.ModelManager.BossRushModel.CurrentTeamInfo;
    this.hSn = [];
    for (const e of this.aSn.GetOptionBuff()) {
      var t = new BuffScrollItemData();
      t.BuffId = e.BuffId;
      t.State = e.State;
      t.Selected = (ModelManager_1.ModelManager.BossRushModel.CurrentSelectBuffTabName === 0 ? this.aSn.GetPrepareSelectBuff().findIndex(t => t.BuffId === e.BuffId) : this.aSn.GetPrepareSelectScoreBuff().findIndex(t => t.BuffId === e.BuffId)) !== -1;
      t.SelectedAtStart = t.Selected;
      t.OnClickToggle = this.kqe;
      t.CheckClickAble = this.uSn;
      this.hSn.push(t);
    }
    this.Esi(true);
    this.Jbi();
    this.Jal = this.aSn.LevelInfo.GetMaxBuffCount() === 1;
  }
  ROn() {
    let t = "Start";
    if (ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation) {
      t = "ShowView";
    }
    this.SPe?.PlaySequencePurely(t);
    ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation = false;
  }
  cSn() {
    return !!this.lSn || !!this.Jal || !!(this.aSn.LevelInfo.GetMaxBuffCount() > this._Sn()) || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("BossRushMaxBuffText"), false);
  }
  _Sn() {
    let t = 0;
    for (const e of this.hSn) {
      if (e.Selected) {
        t++;
      }
    }
    return t;
  }
  Esi(t = false) {
    if (this.vVt) {
      var e = [];
      this.lSn = true;
      var i = this.hSn.length;
      for (let t = 0; t < i; t++) {
        var s = new BuffGridItemData();
        s.BuffScrollItemData1 = this.hSn[t];
        e.push(s);
      }
      this.vVt.RefreshByData(e, false, () => {
        this.lSn = false;
      }, t);
      this.GetLoopScrollViewComponent(0).RootUIComp.SetUIActive(e.length > 0);
    }
  }
  OnBeforeHide() {
    this.vVt?.ClearGridProxies();
  }
  Jbi() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "BossRushSelectBuffText", this._Sn().toString(), this.aSn.LevelInfo.GetMaxBuffCount().toString());
  }
}
exports.BossRushBuffSelectView = BossRushBuffSelectView;
class BuffScrollItemData {
  constructor() {
    this.BuffId = 0;
    this.ChangeAble = true;
    this.State = Protocol_1.Aki.Protocol.Iks.Proto_BuffEmpty;
    this.Selected = false;
    this.SelectedAtStart = false;
    this.OnClickToggle = () => {};
    this.CheckClickAble = undefined;
  }
}
class BuffGridItemData {
  constructor() {
    this.BuffScrollItemData1 = undefined;
  }
}
class BuffGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this.pHe = () => {
      if (!this.$8i) {
        return false;
      }
      if (this.$8i.State === Protocol_1.Aki.Protocol.Iks.Proto_BuffLocked && this.GetExtendToggle(0).GetToggleState() === 0) {
        return true;
      }
      return this.$8i.CheckClickAble(this.$8i);
    };
    this.kqe = () => {
      this.$8i.OnClickToggle(this.$8i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem]];
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
  Refresh(t, e, i) {
    this.$8i = t.BuffScrollItemData1;
    if (t.BuffScrollItemData1.State !== Protocol_1.Aki.Protocol.Iks.Proto_BuffInactive) {
      t = t.BuffScrollItemData1?.Selected ? 1 : 0;
      this.GetExtendToggle(0).SetToggleState(t);
      this.P5e();
      this.Pqe();
      this.gSn();
      this.gFn();
    }
  }
  gFn() {
    this.GetItem(4).SetUIActive(this.$8i.SelectedAtStart);
  }
  P5e() {
    var t = ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffConfigById(this.$8i.BuffId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.Name);
  }
  Pqe() {
    var t = ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffConfigById(this.$8i.BuffId);
    var e = [];
    for (const s of t.DescriptionParam) {
      var i = RegExp(/\[(.*?)\]/g).exec(s);
      if (i && i.length > 1) {
        e.push(...i[1].split(","));
      }
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.Description, ...e);
  }
  gSn() {
    var t = ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffConfigById(this.$8i.BuffId).Texture;
    this.SetTextureByPath(t, this.GetTexture(1));
  }
}
//# sourceMappingURL=BossRushBuffSelectView.js.map
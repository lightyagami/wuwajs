"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityIconItem = exports.EntityInfoItem = exports.PhotographEntityPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PhotographController_1 = require("../PhotographController");
class PhotographEntityPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.MKi = undefined;
    this.EKi = undefined;
    this.SKi = new Map();
    this.Uh1 = new Map();
    this.yKi = new Map();
    this.qxt = (t, i, e) => {
      var s = new EntityInfoItem();
      s.SetRootActor(i.GetOwner(), true);
      s.InitSpr();
      s.Refresh(t);
      return {
        Key: e,
        Value: s
      };
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {
    this.MKi = new GenericLayoutNew_1.GenericLayoutNew(this.GetVerticalLayout(1), this.qxt);
    this.EKi = this.GetItem(5);
    PhotographController_1.PhotographController.CloseBlackScreen();
  }
  OnBeforeDestroy() {
    if (this.MKi) {
      this.MKi.ClearChildren();
      this.MKi = undefined;
    }
    this.Uh1.clear();
    this.SKi.clear();
    this.yKi.clear();
    this.EKi = undefined;
  }
  Refresh(i) {
    this.SKi.clear();
    for (let t = 0; t < i.length; t++) {
      this.SKi.set(i[t].Text, t);
    }
    this.MKi.RebuildLayoutByDataNew(i);
  }
  SetInfoPanelVisible(t) {
    this.GetVerticalLayout(1).RootUIComp.SetUIActive(t);
  }
  UpdateIcons(t, i) {
    if (t.length <= 0) {
      this.yKi.forEach(t => {
        this.Move(t, new UE.Vector2D(0, 0), true, false, false, i);
      });
    }
    for (const h of t) {
      var e;
      var s;
      if (this.yKi.has(h.Id)) {
        e = this.yKi.get(h.Id);
        this.Move(e, h.Vector, h.NotShow, h.IsOptional, h.IsOptionalFinished, i);
      } else {
        (e = new EntityIconItem(LguiUtil_1.LguiUtil.CopyItem(this.EKi, this.GetItem(0)))).CreateByActorAsync(e.GetItsItem().GetOwner());
        if (e) {
          e.SetUiActive(true);
          e.InitSpr();
          this.yKi.set(h.Id, e);
          if (this.Uh1.has(i)) {
            if ((s = this.Uh1.get(i)) && !s.includes(e)) {
              s.push(e);
              this.Uh1.set(i, s);
            }
          } else {
            (s = new Array()).push(e);
            this.Uh1.set(i, s);
          }
          this.Move(e, h.Vector, true, h.IsOptional, h.IsOptionalFinished, i);
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Photo", 45, "tempUiItem为空", ["名称：", h.Id]);
        }
      }
    }
  }
  Move(t, i, e, s, h, o) {
    var r = t.GetItsItem();
    r.SetUIActive(true);
    r.SetAnchorOffset(new UE.Vector2D(i.X, i.Y));
    if (h || e) {
      t.UpdateNowIcon(0);
    } else if (s) {
      t.UpdateNowIcon(2);
    } else {
      t.UpdateNowIcon(PhotographController_1.PhotographController.PhotoMissionFinishMap.get(o.TakePlace.RangeEntity) ? 2 : 1);
    }
  }
  GetInfoItemByDesc(t) {
    t = this.SKi.get(t);
    if (t !== undefined) {
      return this.MKi.GetLayoutItemByIndex(t);
    }
  }
}
exports.PhotographEntityPanel = PhotographEntityPanel;
class EntityInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
    this.UiSequencePlayer = undefined;
    this.EDr = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText]];
  }
  InitSpr() {
    this.UiSequencePlayer ||= new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.UiSequencePlayer.StopCurrentSequence(false, true);
    this.UiSequencePlayer.PlayLevelSequenceByName("Fail");
    this.EDr = false;
  }
  Refresh(t) {
    var i = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.Text);
    if (i) {
      if (t.IsOptionFinished) {
        this.SetTextLine(t.Text);
      } else {
        this.GetText(2).SetText(i);
      }
    } else {
      this.RefreshFinishState(t.IsFinish);
    }
  }
  RefreshFinishState(t) {
    if (t && !this.EDr) {
      this.UiSequencePlayer.StopCurrentSequence(false, true);
      this.UiSequencePlayer.PlayLevelSequenceByName("Complete");
      this.EDr = true;
    } else if (!t && this.EDr) {
      this.UiSequencePlayer.StopCurrentSequence(false, true);
      this.UiSequencePlayer.PlayLevelSequenceByName("Fail");
      this.EDr = false;
    }
  }
  SetTextLine(t) {
    t = PublicUtil_1.PublicUtil.GetConfigTextByKey(t);
    if (t) {
      this.GetText(2).SetText("<s>" + t + "</s>");
      this.UiSequencePlayer.StopCurrentSequence(false, true);
      this.UiSequencePlayer.PlayLevelSequenceByName("Complete");
      this.UiSequencePlayer.StopCurrentSequence(false, true);
      this.EDr = true;
    }
  }
}
exports.EntityInfoItem = EntityInfoItem;
class EntityIconItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.UiSequencePlayer = undefined;
    this.Item = undefined;
    this.ItsColor = 0;
    this.Item = t;
    this.UiSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(t);
  }
  GetItsItem() {
    return this.Item;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  InitSpr() {
    this.GetItem(0)?.SetUIActive(false);
    this.GetItem(1)?.SetUIActive(false);
  }
  UpdateNowIcon(t) {
    switch (t) {
      case 2:
        if (this.ItsColor === 0) {
          this.UiSequencePlayer.StopCurrentSequence(false, true);
          this.UiSequencePlayer.PlayLevelSequenceByName("NtoG");
          this.ItsColor = 2;
        } else if (this.ItsColor === 1) {
          this.UiSequencePlayer.StopCurrentSequence(false, true);
          this.UiSequencePlayer.PlayLevelSequenceByName("YtoG");
          this.ItsColor = 2;
        }
        break;
      case 1:
        if (this.ItsColor === 0) {
          this.UiSequencePlayer.StopCurrentSequence(false, true);
          this.UiSequencePlayer.PlayLevelSequenceByName("NtoY");
          this.ItsColor = 1;
        } else if (this.ItsColor === 2) {
          this.UiSequencePlayer.StopCurrentSequence(false, true);
          this.UiSequencePlayer.PlayLevelSequenceByName("GtoY");
          this.ItsColor = 1;
        }
        break;
      case 0:
        if (this.ItsColor === 2) {
          this.UiSequencePlayer.StopCurrentSequence(false, true);
          this.UiSequencePlayer.PlayLevelSequenceByName("GtoN");
          this.ItsColor = 0;
        } else if (this.ItsColor === 1) {
          this.UiSequencePlayer.StopCurrentSequence(false, true);
          this.UiSequencePlayer.PlayLevelSequenceByName("YtoN");
          this.ItsColor = 0;
        }
    }
  }
}
exports.EntityIconItem = EntityIconItem;
//# sourceMappingURL=PhotographEntityPanel.js.map
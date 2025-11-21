"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTypeItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const QuestChapterItem_1 = require("./QuestChapterItem");
const QuestItem_1 = require("./QuestItem");
class QuestItemData {
  constructor(t, s) {
    this.QuestId = t;
    this.QuestType = s;
  }
}
class QuestTypeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Cno = undefined;
    this.QuestType = 0;
    this.Pno = undefined;
    this.xno = undefined;
    this.wno = undefined;
    this.Bno = undefined;
    this.bno = () => {
      var t = this.GetItem(1);
      t.SetUIActive(!t.bIsUIActive);
    };
  }
  Init(t, s, e) {
    this.QuestType = s;
    this.Cno = e;
    t.SetUIActive(true);
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UISprite]];
    this.BtnBindInfo = [[0, this.bno]];
  }
  OnStart() {
    this.GetItem(4).SetUIActive(true);
    var t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(this.QuestType);
    if (!StringUtils_1.StringUtils.IsEmpty(t?.TypeColor)) {
      this.GetSprite(7).SetColor(UE.Color.FromHex(t?.TypeColor ?? ""));
    }
    this.GetText(2).SetText(ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeName(this.QuestType));
    var s;
    var t = t.QuestTypeTitleIcon;
    if (t?.length !== 0) {
      s = this.GetSprite(3);
      this.SetSpriteByPath(t, s, false);
    }
    this.Pno = [];
    this.xno = [];
    this.UpdateList();
  }
  OnTick(t) {
    if (this.xno) {
      for (const s of this.xno) {
        s.OnTick(t);
      }
    }
    if (this.Pno) {
      for (const e of this.Pno) {
        e.OnTick(t);
      }
    }
  }
  UpdateList() {
    this.qno();
    const e = this.wno;
    const i = this.Bno;
    let s = 0;
    for (const h of i) {
      let t = undefined;
      var r;
      if (s < this.xno.length) {
        (t = this.xno[s]).UpdateItem(h.ChapterId, h.QuestType, h.QuestList);
      } else {
        r = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(6), this.GetItem(1));
        (t = new QuestChapterItem_1.QuestChapterItem()).Init(r, h.ChapterId, h.QuestType, h.QuestList, this.Cno);
        this.xno.push(t);
      }
      s++;
    }
    this.xno.forEach((t, s) => {
      t.SetActive(s < i.length);
    });
    s = 0;
    for (const a of e) {
      let t = undefined;
      var o;
      if (s < this.Pno.length) {
        t = this.Pno[s];
      } else {
        o = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(5), this.GetItem(1));
        (t = new QuestItem_1.QuestItem(this.Cno)).SetRootActor(o.GetOwner(), true);
        this.Pno.push(t);
      }
      t.UpdateItem(a.QuestId, a.QuestType);
      s++;
    }
    this.Pno.forEach((t, s) => {
      t.SetActiveItem(s < e.length);
    });
  }
  UpdateItem(s) {
    let t = this.Pno.find(t => t.QuestId === s);
    if (!t) {
      for (const i of this.xno) {
        var e = i.FindByQuestId(s);
        if (e) {
          t = e;
          break;
        }
      }
    }
    if (t) {
      t.UpdateItem(t.QuestId, t.QuestType);
    }
  }
  UpdateAllItem() {
    for (const t of this.xno) {
      for (const s of t.QuestList ?? []) {
        s.UpdateItem(s.QuestId, s.QuestType);
      }
    }
  }
  OnSelect(t) {
    let e = t;
    if (!t) {
      t = this.GetDefaultItem();
      e = t?.QuestId ?? 0;
    }
    this.Pno.forEach(t => {
      t.SetSelected(t.QuestId === e);
      t.SetNotAllowNoneSelect();
    });
    for (const i of this.xno) {
      let s = false;
      i.QuestList.forEach(t => {
        t.SetSelected(t.QuestId === e);
        t.SetNotAllowNoneSelect();
        if (t.QuestId === e) {
          s = true;
        }
      });
      i.SetSelected(s);
    }
  }
  GetDefaultItem() {
    if (this.Pno.length !== 0 || this.xno.length !== 0) {
      return (this.xno.length !== 0 ? this.xno[0].QuestList : this.Pno)[0];
    }
  }
  IsQuestEmpty() {
    return this.wno?.length === 0 && this.xno?.length === 0;
  }
  UpdateListTrackState() {
    for (const e of this.Pno) {
      e.UpdateTrackIconActive();
      var t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.QuestId);
      if (t) {
        e.UpdateFunctionIcon(t);
      }
    }
    for (const i of this.xno) {
      for (const r of i.QuestList) {
        r.UpdateTrackIconActive();
        var s = ModelManager_1.ModelManager.QuestNewModel.GetQuest(r.QuestId);
        if (s) {
          r.UpdateFunctionIcon(s);
        }
      }
    }
  }
  GetQuestItem(s) {
    for (const e of this.xno) {
      var t = e.QuestList.find(t => t.QuestId === s);
      if (t) {
        return t;
      }
    }
    return this.Pno.find(t => t.QuestId === s);
  }
  qno() {
    this.wno = [];
    this.Bno = [];
    var t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuesTypesByMainType(this.QuestType);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Quest", 18, "任务界面打开时，开始收集可显示的任务");
    }
    for (const e of t) {
      var s = ModelManager_1.ModelManager.QuestNewModel.GetQuestsByType(e.Id);
      if (s) {
        s.sort(ModelManager_1.ModelManager.QuestNewModel.SortQuestInView);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Quest", 18, "任务界面打开时，任务数量", ["type", e.Id], ["quests", s.length]);
        }
        for (const i of s) {
          if (i.CanShowInUiPanel()) {
            if (i.ChapterId) {
              this.Gno(i.ChapterId, i.Type, i.Id);
            } else {
              this.wno.push(new QuestItemData(i.Id, i.Type));
            }
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Quest", 18, "任务界面打开时，可显示的任务", ["questId", i.Id]);
            }
          } else if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Quest", 18, "任务界面打开时，不可显示的任务", ["questId", i.Id]);
          }
        }
      }
    }
  }
  Gno(t, s, e) {
    for (const i of this.Bno) {
      if (i.ChapterId === t) {
        i.QuestList.push(e);
        return;
      }
    }
    this.Bno.push({
      ChapterId: t,
      QuestType: s,
      QuestList: [e]
    });
  }
}
exports.QuestTypeItem = QuestTypeItem;
//# sourceMappingURL=QuestTypeItem.js.map
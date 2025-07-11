"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RbTree = undefined;
const Json_1 = require("../Common/Json");
const Log_1 = require("../Common/Log");
const Queue_1 = require("./Queue");
class RbNode {
  constructor() {
    this.Parent = undefined;
    this.Left = undefined;
    this.Right = undefined;
    this.Item = undefined;
    this.IsRed = false;
  }
  BreakChildLink(i) {
    if (this.Left === i) {
      this.Left = undefined;
    } else if (this.Right === i) {
      this.Right = undefined;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Core", 6, "待移除的节点并非其子节点");
    }
  }
  Clear() {
    this.Parent = undefined;
    this.Left = undefined;
    this.Right = undefined;
    this.Item = undefined;
    this.IsRed = false;
  }
}
class RbTree {
  constructor(i) {
    this.E7 = i;
    this.q7 = new Array();
    this.G7 = new Map();
    this.t6 = 0;
    this.gc = undefined;
    this.N7 = undefined;
  }
  Clear() {
    for (var [, i] of this.G7) {
      i.Clear();
      this.q7.push(i);
    }
    this.G7.clear();
    this.t6 = 0;
    this.gc = undefined;
    this.N7 = undefined;
  }
  get IsEmpty() {
    return !this.gc;
  }
  get Size() {
    return this.t6;
  }
  get ExtremelyLeft() {
    return this.N7?.Item;
  }
  RemoveExtremelyLeft() {
    this.O7(this.N7);
  }
  Insert(t) {
    if (this.G7.has(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Core", 6, "Item已经在RbTree里面了", ["Item", t]);
      }
    } else {
      let i = this.q7.pop();
      (i = i || new RbNode()).Item = t;
      i.IsRed = true;
      this.k7(i);
    }
  }
  Remove(i) {
    var t = this.G7.get(i);
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Core", 6, "Item不在RbTree里面", ["Item", i]);
      }
    } else {
      this.O7(t);
    }
  }
  k7(t) {
    ++this.t6;
    this.G7.set(t.Item, t);
    if (this.gc) {
      let i = this.gc;
      while (true) {
        if (this.E7(t.Item, i.Item) < 0) {
          if (!i.Left) {
            (i.Left = t).Parent = i;
            break;
          }
          i = i.Left;
        } else {
          if (!i.Right) {
            (i.Right = t).Parent = i;
            break;
          }
          i = i.Right;
        }
      }
      this.F7(t);
      this.V7();
    } else {
      this.gc = t;
      this.gc.IsRed = false;
      this.N7 = t;
    }
  }
  O7(i) {
    --this.t6;
    this.G7.delete(i.Item);
    let r = i;
    while (r.Left || r.Right) {
      let i = 0;
      let t = r.Left;
      if (t) {
        for (i = 1; t.Right;) {
          i++;
          t = t.Right;
        }
      }
      let e = 0;
      let s = r.Right;
      if (s) {
        for (e = 1; s.Left;) {
          ++e;
          s = s.Left;
        }
      }
      r = i >= e ? (r.Item = t.Item, this.G7.set(r.Item, r), t) : (r.Item = s.Item, this.G7.set(r.Item, r), s);
    }
    var t;
    var i = r.Parent;
    if (i) {
      if (this.N7 === r) {
        this.N7 = i;
      }
      if (r.IsRed) {
        i.BreakChildLink(r);
        r.Clear();
        this.q7.push(r);
      } else {
        t = i.Left === r;
        i.BreakChildLink(r);
        r.Clear();
        this.q7.push(r);
        this.H7(i, t);
        this.V7();
      }
    } else {
      this.gc = undefined;
      this.N7 = undefined;
      r.Clear();
      this.q7.push(r);
    }
  }
  F7(i) {
    this.gc.IsRed = false;
    let t = i;
    while (t.IsRed && t.Parent) {
      var e = t.Parent;
      if (!e.IsRed) {
        if (e.Left?.IsRed && e.Right?.IsRed) {
          e.Left.IsRed = false;
          e.Right.IsRed = false;
          e.IsRed = true;
          t = e;
          continue;
        }
        break;
      }
      var s = e.Parent;
      if (s.Left?.IsRed && s.Right?.IsRed) {
        s.Left.IsRed = false;
        s.Right.IsRed = false;
        s.IsRed = true;
        t = s;
      } else if (t === e.Left) {
        if (s.Left === e) {
          t.IsRed = false;
          this.j7(s);
          t = e;
        } else {
          e.IsRed = false;
          this.j7(e);
          this.W7(s);
        }
      } else if (s.Left === e) {
        e.IsRed = false;
        this.W7(e);
        this.j7(s);
      } else {
        t.IsRed = false;
        this.W7(s);
        t = e;
      }
    }
  }
  H7(i, t) {
    let e = t;
    let s = i;
    while (s) {
      if (s.IsRed) {
        if (e) {
          s.IsRed = false;
          s.Right.IsRed = true;
          if (s.Right.Left?.IsRed) {
            this.F7(s.Right.Left);
          } else if (s.Right.Right?.IsRed) {
            this.F7(s.Right.Right);
          }
        } else {
          s.IsRed = false;
          s.Left.IsRed = true;
          if (s.Left.Left?.IsRed) {
            this.F7(s.Left.Left);
          } else if (s.Left.Right?.IsRed) {
            this.F7(s.Left.Right);
          }
        }
        break;
      }
      if (e) {
        if (s.Right.IsRed) {
          s.Right.IsRed = false;
          var r = s.Right.Left;
          r.IsRed = true;
          this.W7(s);
          if (r.Left?.IsRed) {
            this.F7(r.Left);
          } else if (r.Right?.IsRed) {
            this.F7(r.Right);
          }
          break;
        }
        if (s.Right.Right?.IsRed) {
          s.Right.Right.IsRed = false;
          this.W7(s);
          break;
        }
        if (s.Right.Left?.IsRed) {
          s.Right.Left.IsRed = false;
          this.j7(s.Right);
          this.W7(s);
          break;
        }
        s.Right.IsRed = true;
      } else {
        if (s.Left.IsRed) {
          s.Left.IsRed = false;
          r = s.Left.Right;
          r.IsRed = true;
          this.j7(s);
          if (r.Right?.IsRed) {
            this.F7(r.Right);
          } else if (r.Left?.IsRed) {
            this.F7(r.Left);
          }
          break;
        }
        if (s.Left.Left?.IsRed) {
          s.Left.Left.IsRed = false;
          this.j7(s);
          break;
        }
        if (s.Left.Right?.IsRed) {
          s.Left.Right.IsRed = false;
          this.W7(s.Left);
          this.j7(s);
          break;
        }
        s.Left.IsRed = true;
      }
      if (!s.Parent) {
        break;
      }
      e = s.Parent.Left === s;
      s = s.Parent;
    }
  }
  V7() {
    while (this.gc.Parent) {
      this.gc = this.gc.Parent;
    }
    for (this.gc.IsRed = false; this.N7.Parent?.Right === this.N7;) {
      this.N7 = this.N7.Parent;
    }
    while (this.N7.Left) {
      this.N7 = this.N7.Left;
    }
  }
  j7(i) {
    var t = i.Parent;
    var e = i.Left;
    var s = e.Right;
    e.Parent = t;
    (e.Right = i).Parent = e;
    if (i.Left = s) {
      s.Parent = i;
    }
    if (t) {
      if (t.Left === i) {
        t.Left = e;
      } else {
        t.Right = e;
      }
    }
  }
  W7(i) {
    var t = i.Parent;
    var e = i.Right;
    var s = e.Left;
    e.Parent = t;
    (e.Left = i).Parent = e;
    if (i.Right = s) {
      s.Parent = i;
    }
    if (t) {
      if (t.Left === i) {
        t.Left = e;
      } else {
        t.Right = e;
      }
    }
  }
  ForEach(t) {
    if (this.gc) {
      let i = this.N7;
      while (i) {
        if (!t(i.Item)) {
          return;
        }
        if (i.Right) {
          for (i = i.Right; i.Left;) {
            i = i.Left;
          }
        } else {
          if (!i.Parent) {
            break;
          }
          while (i.Parent) {
            if (i === i.Parent.Left) {
              i = i.Parent;
              break;
            }
            i = i.Parent;
            if (this.gc === i) {
              return;
            }
          }
        }
      }
    }
  }
  CheckRbTree() {
    if (this.gc) {
      if (this.gc.Parent || this.gc.IsRed) {
        return false;
      }
      let i = this.gc;
      while (i.Left) {
        i = i.Left;
      }
      if (i !== this.N7) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Core", 6, "Extremely Left Error.");
        }
        return false;
      }
      var e = new Queue_1.Queue();
      e.Push(this.gc);
      var s = new Queue_1.Queue();
      s.Push(1);
      let t = -1;
      while (!e.Empty) {
        var r = e.Pop();
        var h = s.Pop();
        if (!r.Left || !r.Right) {
          if (t < 0) {
            t = h;
          } else if (t !== h) {
            return false;
          }
        }
        if (r.Left) {
          if (r.Left.IsRed && r.IsRed) {
            return false;
          }
          e.Push(r.Left);
          s.Push(r.Left.IsRed ? h : h + 1);
        }
        if (r.Right) {
          if (r.Right.IsRed && r.IsRed) {
            return false;
          }
          e.Push(r.Right);
          s.Push(r.Right.IsRed ? h : h + 1);
        }
      }
    }
    return true;
  }
  PrintRbTree() {
    if (this.gc) {
      let t = new Queue_1.Queue();
      t.Push(this.gc);
      let e = 1;
      let s = new Queue_1.Queue();
      while (e > 0) {
        e = 0;
        let i = "";
        while (!t.Empty) {
          var r = t.Pop();
          if (r) {
            if (r.IsRed) {
              i += `		(${Json_1.Json.Encode(r.Item)})`;
            } else {
              i += `		${Json_1.Json.Encode(r.Item)}`;
            }
            s.Push(r.Left);
            s.Push(r.Right);
            if (r.Left) {
              e++;
            }
            if (r.Right) {
              e++;
            }
          } else {
            i += "\t\tNA";
            s.Push(undefined);
            s.Push(undefined);
          }
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Core", 6, i);
        }
        var h = t;
        t = s;
        s = h;
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Core", 6, "EmptyTree");
    }
  }
}
exports.RbTree = RbTree;
//# sourceMappingURL=RbTree.js.map
"use strict";

function ignoreUnderScore(e) {
  return e.startsWith("_");
}
function isGuid(e) {
  return e === "Guid" || e === "ActionGuid";
}
function isActionId(e) {
  return e === "ActionId";
}
function isTemplateOnly(e) {
  return e === "EdIsLocked";
}
function entityDataIgnoreFunc(e) {
  return ignoreUnderScore(e) || isGuid(e) || isActionId(e) || isTemplateOnly(e);
}
function treeDataIgnoreFunc(e) {
  return ignoreUnderScore(e) || isGuid(e) || isActionId(e);
}
function flowDataIgnoreFunc(e) {
  return ignoreUnderScore(e) || isGuid(e) || isActionId(e);
}
function editorFieldIgnoreFunc(e) {
  return ignoreUnderScore(e) || /^Ed[A-Z].*/.test(e);
}
function deepEquals(r, t, o) {
  if (r !== t) {
    var e = typeof r;
    if (e != typeof t) {
      return false;
    }
    if (e != "object" || r === undefined || t === undefined || r === null || t === null) {
      return false;
    }
    if (r instanceof Array) {
      if (r.length !== t.length) {
        return false;
      }
      for (let e = 0; e < r.length; e++) {
        if (!deepEquals(r[e], t[e], o)) {
          return false;
        }
      }
    } else {
      for (const n in r) {
        if (!o?.(n) && !deepEquals(r[n], t[n], o)) {
          return false;
        }
      }
      for (const i in t) {
        if (!o?.(i) && r[i] === undefined && t[i] !== undefined) {
          return false;
        }
      }
    }
  }
  return true;
}
function clearIgnoreField(r, t) {
  if (!t || r === null) {
    return r;
  }
  if (r instanceof Array) {
    var o = [];
    for (let e = 0; e < r.length; e++) {
      o[e] = clearIgnoreField(r[e], t);
    }
    return o;
  }
  if (typeof r != "object") {
    return r;
  }
  var e;
  var n = {};
  for (const i in r) {
    if (t(i)) {
      n[i] = undefined;
    } else {
      e = r[i];
      n[i] = clearIgnoreField(e, t);
    }
  }
  return n;
}
function createDiff(e, r, t) {
  if (r === undefined) {
    return clearIgnoreField(e, t);
  }
  if (e === undefined) {
    return null;
  }
  if (typeof e != "object" || typeof r != "object") {
    return e;
  }
  if (r instanceof Array) {
    if (r.length === e.length && deepEquals(r, e, t)) {
      return undefined;
    } else {
      return clearIgnoreField(e, t);
    }
  }
  let o = 0;
  var n;
  var i;
  var f;
  var u;
  var c = {};
  for (const l in e) {
    if (!t?.(l)) {
      if (r[l] === undefined) {
        n = e[l];
        c[l] = clearIgnoreField(n, t);
        o++;
      }
    }
  }
  for (const a in r) {
    if (!t?.(a)) {
      i = e[a];
      f = r[a];
      if (i !== undefined) {
        if ((u = typeof i) == typeof f && u == "object") {
          u = createDiff(i, f, t);
          if ((c[a] = u) !== undefined) {
            o++;
          }
        } else if (i !== f) {
          c[a] = clearIgnoreField(i, t);
          o++;
        }
      } else {
        c[a] = null;
        o++;
      }
    }
  }
  if (o !== 0) {
    return c;
  } else {
    return undefined;
  }
}
function containsNullField(e) {
  if (e !== undefined) {
    if (e === null) {
      return true;
    }
    if (typeof e == "object") {
      if (e instanceof Array) {
        for (const r of e) {
          if (containsNullField(r)) {
            return true;
          }
        }
      } else {
        for (const t in e) {
          if (containsNullField(e[t])) {
            return true;
          }
        }
      }
    }
  }
  return false;
}
function removeNullField(e) {
  if (e != null) {
    if (typeof e != "object") {
      return e;
    }
    if (e instanceof Array) {
      var r = [];
      for (const n of e) {
        r.push(removeNullField(n));
      }
      return r;
    }
    var t = {};
    for (const i in e) {
      var o = removeNullField(e[i]);
      t[i] = o;
    }
    return t;
  }
}
function applyDiff(e, r, t) {
  if (e === undefined) {
    return r;
  }
  if (e !== null) {
    if (r === undefined) {
      return e;
    }
    if (r === null) {
      throw new Error("Base can not be null");
    }
    if (typeof e != "object") {
      return e;
    }
    if (typeof r != "object") {
      return e;
    }
    if (r instanceof Array) {
      return e;
    }
    var o;
    var n;
    var i;
    var f;
    var u = {};
    for (const c in e) {
      if (!t?.(c)) {
        if (r[c] === undefined && (o = e[c]) !== null) {
          u[c] = removeNullField(o);
        }
      }
    }
    for (const l in r) {
      if (!t?.(l)) {
        n = e[l];
        i = r[l];
        if (n === undefined) {
          u[l] = i;
        } else if (n !== null) {
          f = typeof n;
          u[l] = f == typeof i && f == "object" ? applyDiff(n, i, t) : n;
        }
      }
    }
    return u;
  }
}
function diffArrays(r, t) {
  if (t && r) {
    return {
      Added: t.filter(e => !r.includes(e)),
      Removed: r.filter(e => !t.includes(e))
    };
  } else {
    return {
      Added: [],
      Removed: []
    };
  }
}
function matchCategory(e, r) {
  for (const n in e) {
    var t = e[n];
    var o = r[n];
    if (o === undefined || o !== t) {
      return false;
    }
  }
  return true;
}
function matchCategoryType(e, r) {
  return e === undefined || r[e] !== undefined;
}
function isEntitiyMatch(e, r) {
  var t;
  return !!e && !!r && (e.Category === undefined && e.CategoryType === undefined || (t = (t = e.Category) !== undefined && matchCategory(t, r), e = (e = e.CategoryType) !== undefined && matchCategoryType(e, r), t) || e);
}
function isMatchCategory(r, e) {
  if (!e.Categories) {
    return false;
  }
  let t = false;
  e.Categories.forEach(e => {
    t = t || matchCategory(e, r);
  });
  return t;
}
function mergeOp(e, r, t) {
  if (t?.Type === e) {
    return {
      Type: e,
      Length: t.Length + r,
      PreOp: t.PreOp
    };
  } else {
    return {
      Type: e,
      Length: r,
      PreOp: t
    };
  }
}
function diffChars(n, i) {
  var f = n.length;
  var u = i.length;
  var c = {
    0: {
      X: 0
    }
  };
  let l = undefined;
  let a = 0;
  e: for (; a <= f + u; a++) {
    for (let o = -a; o <= a; o += 2) {
      let e = 0;
      let r = 0;
      var s;
      var d = c[o] ?? {
        X: e
      };
      if (a > 0) {
        if (o === -a || o !== a && c[o - 1].X < c[o + 1].X) {
          s = c[o + 1];
          e = s.X;
          d.Head = mergeOp(1, 1, s.Head);
        } else {
          s = c[o - 1];
          e = s.X + 1;
          d.Head = mergeOp(2, 1, s.Head);
        }
        r = e - o;
      }
      let t = 0;
      while (e < f && r < u && n[e] === i[r]) {
        e++;
        r++;
        t++;
      }
      d.X = e;
      if (t > 0) {
        d.Head = mergeOp(0, t, d.Head);
      }
      c[o] = d;
      if (e >= f && r >= u) {
        l = d.Head;
        break e;
      }
    }
  }
  var e = [];
  let r = l;
  while (r) {
    e.push(r);
    r = r.PreOp;
  }
  e.reverse();
  var t = [];
  let o = 0;
  let p = 0;
  for (const y of e) {
    var v = y.Length;
    switch (y.Type) {
      case 0:
        t.push({
          Value: i.slice(o, o + v),
          DiffOp: 0
        });
        o += v;
        p += v;
        break;
      case 1:
        t.push({
          Value: i.slice(o, o + v),
          DiffOp: 1
        });
        o += v;
        break;
      case 2:
        t.push({
          Value: n.slice(p, p + v),
          DiffOp: 2
        });
        p += v;
    }
  }
  return t;
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diffChars = exports.isMatchCategory = exports.isEntitiyMatch = exports.matchCategory = exports.diffArrays = exports.applyDiff = exports.removeNullField = exports.containsNullField = exports.createDiff = exports.clearIgnoreField = exports.deepEquals = exports.editorFieldIgnoreFunc = exports.flowDataIgnoreFunc = exports.treeDataIgnoreFunc = exports.entityDataIgnoreFunc = exports.isTemplateOnly = exports.isActionId = exports.isGuid = exports.ignoreUnderScore = undefined;
exports.ignoreUnderScore = ignoreUnderScore;
exports.isGuid = isGuid;
exports.isActionId = isActionId;
exports.isTemplateOnly = isTemplateOnly;
exports.entityDataIgnoreFunc = entityDataIgnoreFunc;
exports.treeDataIgnoreFunc = treeDataIgnoreFunc;
exports.flowDataIgnoreFunc = flowDataIgnoreFunc;
exports.editorFieldIgnoreFunc = editorFieldIgnoreFunc;
exports.deepEquals = deepEquals;
exports.clearIgnoreField = clearIgnoreField;
exports.createDiff = createDiff;
exports.containsNullField = containsNullField;
exports.removeNullField = removeNullField;
exports.applyDiff = applyDiff;
exports.diffArrays = diffArrays;
exports.matchCategory = matchCategory;
exports.isEntitiyMatch = isEntitiyMatch;
exports.isMatchCategory = isMatchCategory;
exports.diffChars = diffChars; //# sourceMappingURL=IUtil.js.map
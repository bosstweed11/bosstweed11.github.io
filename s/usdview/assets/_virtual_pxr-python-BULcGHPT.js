var u=Object.defineProperty;var p=(e,n)=>u(e,"name",{value:n,configurable:!0});import{ho as _,jc as h,jd as y,je as g,jf as P,jg as S,jh as b,ji as T,jj as N,jk as I,jl as A,jm as x,jn as v,jo as w,j3 as C,jp as G,jq as k,hn as E,eq as D}from"./usd-core-DUbHzUpd.js";function d(e){const n=new D;try{let t;try{t=e()}catch(r){const o=n.getErrors().map(a=>a.getCommentary());n.clear();const s=r instanceof Error?r.constructor.name:"Error";return[[...o,r instanceof Error?r.message:String(r)],void 0,s]}const i=n.getErrors().map(r=>r.getCommentary());return n.clear(),[i.length>0?i:void 0,t,void 0]}finally{n.dispose()}}p(d,"guarded");const f=new WeakMap;let j=1;const U={Gf:{...k},Sdf:{...G,Path:C,sdfPathFindLongestPrefix:w,sdfPathFindLongestStrictPrefix:v,sdfPathFindPrefixedRange:x},Tf:{...A},Usd:{...I},UsdGeom:{...N},UsdLux:{...T},UsdMedia:{...b},UsdShade:{...S},UsdUI:{...P},UsdUtils:{...g},Sdr:{...y},Vt:{...h},UsdSchemaRegistry:_,callMethod(e,n,...t){return d(()=>e[n](...t))},callFunction(e,...n){return d(()=>e(...n))},construct(e,...n){return d(()=>new e(...n))},getProperty(e,n){return d(()=>e[n])},kindOf(e){return e===null?"null":Array.isArray(e)?"array":typeof e=="object"&&typeof e.then=="function"?"promise":typeof e=="object"&&typeof e[Symbol.iterator]=="function"&&Object.getPrototypeOf(e)!==Object.prototype?"iterable":typeof e=="object"&&Object.getPrototypeOf(e)===Object.prototype?"record":typeof e},ctorOf(e){return e.constructor},same(e,n){return e===n},objectId(e){let n=f.get(e);return n===void 0&&f.set(e,n=j++),n},schemaTypeName(e){if(typeof e!="function"||!(e.prototype instanceof E))return;const n=e.typeName;return typeof n=="string"?n:void 0},superclassOf(e){return Object.getPrototypeOf(e)},isInstance(e,n){return e instanceof n},arrayFrom(e){return Array.from(e)},toNumber(e){return Number(e)},toString(e){return String(e)},setCwd(e){process.chdir(e)},functionApply:Function.prototype.apply},F=`
import sys, io, os, runpy, traceback
def _run_script(script, argv, workdir):
    os.chdir(workdir)
    sys.argv = [script] + list(argv)
    script_dir = os.path.dirname(script)
    sys.path.insert(0, script_dir)
    out = io.StringIO()
    old_out, old_err = sys.stdout, sys.stderr
    sys.stdout = sys.stderr = out
    code = 0
    outputs = None
    try:
        ns = runpy.run_path(script, run_name='__not_main__')
        if 'main' in ns:
            outputs = ns['main'](list(argv))
        else:
            runpy.run_path(script, run_name='__main__')
    except SystemExit as e:
        code = e.code if isinstance(e.code, int) else (0 if e.code is None else 1)
    except BaseException:
        traceback.print_exc()
        code = 1
    finally:
        sys.stdout, sys.stderr = old_out, old_err
        sys.path.remove(script_dir)
    return {'exitCode': code, 'output': out.getvalue(), 'outputs': outputs}
`,L=`
import sys, keyword, re
from code import InteractiveInterpreter

class _Interpreter(InteractiveInterpreter):
    """pythonInterpreter.py:146-175 Interpreter: the output brush is a style."""
    def __init__(self, locals=None):
        InteractiveInterpreter.__init__(self, locals)
        self._outputBrush = None

    def showsyntaxerror(self, filename=None, **kwargs):
        self._outputBrush = 'syntaxError'
        try:
            InteractiveInterpreter.showsyntaxerror(self, filename, **kwargs)
        finally:
            self._outputBrush = None

    def showtraceback(self):
        self._outputBrush = 'traceback'
        try:
            InteractiveInterpreter.showtraceback(self)
        finally:
            self._outputBrush = None

    def GetOutputBrush(self):
        return self._outputBrush


class _Helper(object):
    """pythonInterpreter.py:177-192 _Helper."""
    def __init__(self, input, output):
        import pydoc
        self._helper = pydoc.Helper(input, output)

    def __repr__(self):
        return "Type help() for interactive help, " \\
               "or help(object) for help about object."

    def __call__(self, *args, **kwds):
        return self._helper(*args, **kwds)


def _GetClassMembers(cls):
    ret = dir(cls)
    if hasattr(cls, '__bases__'):
        for base in cls.__bases__:
            ret = ret + _GetClassMembers(base)
    return ret


class _Completer(object):
    """pythonInterpreter.py:39-144 _Completer."""
    def __init__(self, locals):
        self.locals = locals

    def Complete(self, text, state):
        if state == 0:
            if "." in text:
                self.matches = self._AttrMatches(text)
            else:
                self.matches = self._GlobalMatches(text)
        try:
            return self.matches[state]
        except IndexError:
            return None

    def _GlobalMatches(self, text):
        import builtins
        import __main__
        matches = set()
        n = len(text)
        for l in [keyword.kwlist, builtins.__dict__.keys(),
                  __main__.__dict__.keys(), self.locals.keys()]:
            for word in l:
                if word[:n] == text and word != "__builtins__":
                    matches.add(word)
        return list(matches)

    def _AttrMatches(self, text):
        import __main__
        assert len(text)
        splitChars = ' )(;,+=*/-%!<>'
        index = -1
        for char in splitChars:
            index = max(text.rfind(char), index)
        if index >= len(text)-1:
            return []
        prefix = ''
        suffix = text
        if index >= 0:
            prefix = text[:index+1]
            suffix = text[index+1:]
        m = re.match(r"([^.]+(\\.[^.]+)*)\\.(.*)", suffix)
        if not m:
            return []
        expr, attr = m.group(1, 3)
        try:
            myobject = eval(expr, __main__.__dict__, self.locals)
        except (AttributeError, NameError, SyntaxError):
            return []
        words = set(dir(myobject))
        if hasattr(myobject, '__class__'):
            words.add('__class__')
        words = words.union(set(_GetClassMembers(myobject.__class__)))
        words = list(words)
        matches = set()
        n = len(attr)
        for word in words:
            if word[:n] == attr and word != "__builtins__":
                matches.add("%s%s.%s" % (prefix, expr, word))
        return list(matches)


class _Session(object):
    """The Controller's interpreter, completer and redirected streams
    (pythonInterpreter.py:194-283, 322-420). Writes are collected as
    (text, style) chunks for the console to show."""
    def __init__(self):
        self.interpreter = _Interpreter({'__name__': '__console__', '__doc__': None})
        self.completer = _Completer(self.interpreter.locals)
        self.chunks = []
        # :240-245: the prompts, unless the host set them.
        try:
            sys.ps1
        except AttributeError:
            sys.ps1 = ">>> "
        try:
            sys.ps2
        except AttributeError:
            sys.ps2 = "... "
        # :218: help writes into the console.
        self.interpreter.locals['help'] = _Helper(self, self)

    # ---- stdin, stdout and stderr (:322-420) ----
    def write(self, text):
        self.chunks.append((str(text), self.interpreter.GetOutputBrush() or 'output'))

    def flush(self):
        pass

    def isatty(self):
        return 1

    def readline(self):
        # input(): see usdview-python-readline in interactive.ts.
        raise RuntimeError("input() is not supported in the browser interpreter.")

    def _redirected(self, run):
        """_Redirected (:28-37)."""
        old = sys.stdin, sys.stdout, sys.stderr
        sys.stdin, sys.stdout, sys.stderr = self, self, self
        try:
            return run()
        finally:
            sys.stdin, sys.stdout, sys.stderr = old

    def take(self):
        chunks, self.chunks = self.chunks, []
        return [list(c) for c in chunks]

    def runsource(self, source):
        """The Controller's runsource of the entered lines (:608): True
        when the source is incomplete."""
        more = self._redirected(lambda: self.interpreter.runsource(source))
        return [bool(more), self.take()]

    def complete(self, token):
        """_CompleteSlot's loop (:422-441)."""
        def run():
            completions = []
            try:
                p = self.completer.Complete(token, len(completions))
                while p is not None:
                    completions.append(p)
                    p = self.completer.Complete(token, len(completions))
            except Exception:
                return []
            return completions
        completions = self._redirected(run)
        self.chunks = []
        return completions
`;function M(e){e.runPython(L);const n=e.globals.get("_Session")(),t=n.interpreter.locals,i=e.pyimport("sys"),r=n.runsource,o=n.complete;return{banner:`Python ${i.version} on ${i.platform}.`,ps1:String(i.ps1),ps2:String(i.ps2),async runSource(s){const a=await r.callPromising(s),[l,m]=a.toJs();return a.destroy(),{more:l,output:m}},complete(s){const a=o(s),l=a.toJs();return a.destroy(),l},async exec(s){const a=e.runPython("lambda source, ns: exec(source, ns)");try{await a.callPromising(s,t)}finally{a.destroy()}},locals:t}}p(M,"createPxrInteractive");function V(){return typeof WebAssembly.Suspending=="function"}p(V,"jspiSupported");async function B(e){const n=performance.now(),t=await e.loadPyodide({indexURL:e.indexURL}),i=performance.now()-n;for(const[o,s]of Object.entries(e.files))t.FS.mkdirTree(o.slice(0,o.lastIndexOf("/"))),t.FS.writeFile(o,s);t.registerJsModule("_tsusd",{...U,openusdSrc:e.openusdSrc}),t.runPython(`import sys; sys.dont_write_bytecode = True; sys.path.insert(0, ${JSON.stringify(e.pythonDir)})`),t.runPython(F);const r=t.globals.get("_run_script");return{pyodide:t,loadMs:i,async run(o,s=[]){const a=await r.callPromising(o,t.toPy([...s]),"/home/pyodide"),l=a.get("exitCode"),m=a.get("output"),c=a.get("outputs");return a.destroy(),{exitCode:l,output:m,outputs:c}}}}p(B,"loadPxrPythonInBrowser");const z={"/pxr-python/pxr/Gf/_gf.py":`"""Gf: the parts of pxr/base/gf's Python module the ported tests use.

Each class mirrors its wrap*.cpp; comments cite the \`.def\` lines forwarded.
"""
from pyodide.ffi import to_js

from pxr._bridge import (Wrapped, register, construct, call_method, wrap,
                         define_operators, comparisons, is_real, ts as _ts)

_Gf = _ts.Gf


def _float(x):
    return float(x)


class _DoubleValue(Wrapped):
    """GfTimeCode / GfDuration: an immutable double with a Python repr."""
    __slots__ = ()

    def __init__(self, value=0.0):
        if not is_real(value):
            raise TypeError('%s(): expected a float, got %s'
                            % (type(self).__name__, type(value).__name__))
        self._js = construct(self._jsclass, float(value))

    def GetValue(self):
        return float(call_method(self._js, 'GetValue'))

    def __repr__(self):
        return call_method(self._js, 'repr')

    def __str__(self):
        return _ts.toString(self._js)

    def __float__(self):
        return float(_ts.toNumber(self._js))

    def __bool__(self):
        return self.GetValue() != 0.0

    def __hash__(self):
        return hash(self.GetValue())


# wrapDuration.cpp:44-80
class Duration(_DoubleValue):
    __slots__ = ()


register(_Gf.Duration, Duration)


# wrapTimeCode.cpp:44-93
class TimeCode(_DoubleValue):
    __slots__ = ()


register(_Gf.TimeCode, TimeCode)


def _is(cls):
    return lambda o: isinstance(o, cls)


_dbl = is_real
_js = lambda o: o._js if hasattr(o, '_js') else float(o)

comparisons(Duration, lambda o: isinstance(o, Duration) or _dbl(o),
            lambda s, o: call_method(s._js, 'compare', _js(o)))
define_operators(Duration, {
    '__mul__': [(_dbl, lambda s, o: call_method(s._js, 'multiply', float(o)))],
    '__rmul__': [(_dbl, lambda s, o: call_method(s._js, 'multiply', float(o)))],
    '__truediv__': [
        (_dbl, lambda s, o: call_method(s._js, 'divide', float(o))),
        (_is(Duration), lambda s, o: _float(call_method(s._js, 'divide', o._js))),
    ],
    '__add__': [(lambda o: isinstance(o, Duration) or _dbl(o),
                 lambda s, o: call_method(s._js, 'add', _js(o)))],
    '__radd__': [(_dbl, lambda s, o: call_method(s._js, 'add', float(o)))],
    '__sub__': [(lambda o: isinstance(o, Duration) or _dbl(o),
                 lambda s, o: call_method(s._js, 'subtract', _js(o)))],
    '__rsub__': [(_dbl, lambda s, o: call_method(
        call_method(s._js, 'getNegated')._js, 'add', float(o)))],
    '__neg__': [(lambda: True, lambda s: call_method(s._js, 'getNegated'))],
})

comparisons(TimeCode, lambda o: isinstance(o, TimeCode) or _dbl(o),
            lambda s, o: call_method(s._js, 'compare', _js(o)))
define_operators(TimeCode, {
    '__mul__': [(_dbl, lambda s, o: call_method(s._js, 'multiply', float(o)))],
    '__rmul__': [(_dbl, lambda s, o: call_method(s._js, 'multiply', float(o)))],
    '__truediv__': [
        (_dbl, lambda s, o: call_method(s._js, 'divide', float(o))),
        (_is(TimeCode), lambda s, o: _float(call_method(s._js, 'divide', o._js))),
    ],
    '__add__': [(lambda o: isinstance(o, (TimeCode, Duration)) or _dbl(o),
                 lambda s, o: call_method(s._js, 'add', _js(o)))],
    '__radd__': [(lambda o: isinstance(o, Duration) or _dbl(o),
                  lambda s, o: call_method(s._js, 'add', _js(o)))],
    '__sub__': [(lambda o: isinstance(o, (TimeCode, Duration)) or _dbl(o),
                 lambda s, o: call_method(s._js, 'subtract', _js(o)))],
    '__rsub__': [(lambda o: isinstance(o, Duration) or _dbl(o),
                  lambda s, o: call_method(
                      call_method(s._js, 'getNegated')._js, 'add', _js(o)))],
    '__neg__': [(lambda: True, lambda s: call_method(s._js, 'getNegated'))],
})


# ---- Vec{2,3,4}{d,f,h,i} (wrapVec.template.cpp) -------------------------------

def _repr_component(x, integral):
    # TfPyRepr of the scalar: Python's repr of a float (or int).
    return repr(int(x)) if integral else repr(float(x))


class _Vec(Wrapped):
    """GfVec<N><s>: forwards to the core's GfVec<N><s> (gf/src/vec.ts).
    Components are read with get(i) and written with setComponent(i, v);
    arithmetic follows wrapVec.template.cpp's operator .defs."""
    __slots__ = ()
    _dim = 0
    _integral = False

    def __init__(self, *args):
        if len(args) == 1 and isinstance(args[0], (list, tuple)):
            args = tuple(args[0])
        conv = []
        for a in args:
            if isinstance(a, _Vec):
                conv.append(a._js)
            elif is_real(a) or isinstance(a, bool):
                conv.append(float(a))
            else:
                raise TypeError('%s(): unexpected argument %r'
                                % (type(self).__name__, a))
        self._js = construct(self._jsclass, *conv)

    def __len__(self):
        return self._dim

    def _index(self, i):
        if not isinstance(i, int):
            raise TypeError('indices must be integers')
        if i < 0:
            i += self._dim
        if not 0 <= i < self._dim:
            raise IndexError('index out of range')
        return i

    def __getitem__(self, i):
        if isinstance(i, slice):
            return [self[j] for j in range(*i.indices(self._dim))]
        v = self._js.get(self._index(i))
        return int(v) if self._integral else float(v)

    def __setitem__(self, i, value):
        call_method(self._js, 'setComponent', self._index(i), float(value))

    def __iter__(self):
        for i in range(self._dim):
            yield self[i]

    def __contains__(self, value):
        return value in list(self)

    def __repr__(self):
        return 'Gf.%s(%s)' % (type(self).__name__, ', '.join(
            _repr_component(x, self._integral) for x in self))

    def __str__(self):
        return _ts.toString(self._js)

    def __hash__(self):
        return hash(tuple(self))

    def _same(self, o):
        return isinstance(o, type(self))

    def __eq__(self, o):
        if isinstance(o, _Vec) and len(o) == self._dim:
            return list(self) == list(o)
        return NotImplemented

    def __ne__(self, o):
        r = self.__eq__(o)
        return r if r is NotImplemented else not r

    def __add__(self, o):
        return call_method(self._js, 'add', o._js) if self._same(o) else NotImplemented

    def __sub__(self, o):
        return call_method(self._js, 'subtract', o._js) if self._same(o) else NotImplemented

    def __mul__(self, o):
        if is_real(o):
            return call_method(self._js, 'getScaled', float(o))
        if self._same(o):
            return float(call_method(self._js, 'dot', o._js))
        return NotImplemented

    def __rmul__(self, o):
        return call_method(self._js, 'getScaled', float(o)) if is_real(o) else NotImplemented

    def __truediv__(self, o):
        return call_method(self._js, 'getDivided', float(o)) if is_real(o) else NotImplemented

    def __neg__(self):
        return call_method(self._js, 'getNegated')

    def __iadd__(self, o):
        if not self._same(o):
            return NotImplemented
        call_method(self._js, 'addInPlace', o._js)
        return self

    def __isub__(self, o):
        if not self._same(o):
            return NotImplemented
        call_method(self._js, 'subtractInPlace', o._js)
        return self

    def __imul__(self, o):
        if not is_real(o):
            return NotImplemented
        call_method(self._js, 'scaleInPlace', float(o))
        return self

    def __itruediv__(self, o):
        if not is_real(o):
            return NotImplemented
        call_method(self._js, 'divideInPlace', float(o))
        return self


for _n in (2, 3, 4):
    for _s in 'dfhi':
        _name = 'Vec%d%s' % (_n, _s)
        _cls = type(_name, (_Vec,), {'__slots__': (), '_dim': _n,
                                      '_integral': _s == 'i',
                                      '__module__': __name__})
        register(getattr(_Gf, _name), _cls)
        globals()[_name] = _cls
del _n, _s, _name, _cls


# ---- Matrix{2,3,4}{d,f} (wrapMatrix{2,3,4}.template.cpp) ----------------------

def _matrix_args(args):
    """Constructor arguments as the core's GfMatrix takes them: scalars,
    a diagonal vector, a list of rows, another matrix (matrixData.ts)."""
    out = []
    for a in args:
        if isinstance(a, (_Vec, _Matrix, _Quat)):
            out.append(a._js)
        elif isinstance(a, (list, tuple)):
            out.append(to_js([list(r) if isinstance(r, (list, tuple, _Vec)) else float(r)
                              for r in a]))
        elif is_real(a) or isinstance(a, bool):
            out.append(float(a))
        else:
            out.append(a)
    return out


class _Matrix(Wrapped):
    """GfMatrix<N><s>: forwards to the core's GfMatrix<N><s>
    (gf/src/matrixData.ts). m[i] is row i as a vector, m[i, j] an element;
    * multiplies matrices, scales by a number, and applies to a vector
    (matrix * column vector, row vector * matrix) as wrapMatrix does."""
    __slots__ = ()
    _dim = 0

    def __init__(self, *args):
        self._js = construct(self._jsclass, *_matrix_args(args))

    def __len__(self):
        return self._dim

    def _row_class(self):
        return globals()['Vec%d%s' % (self._dim, self._scalar)]

    def __getitem__(self, i):
        if isinstance(i, tuple):
            r, c = i
            return float(call_method(self._js, 'getElement', int(r), int(c)))
        if not isinstance(i, int):
            raise TypeError('indices must be integers')
        if i < 0:
            i += self._dim
        if not 0 <= i < self._dim:
            raise IndexError('index out of range')
        return self._row_class()(*[float(call_method(self._js, 'getElement', i, j))
                                   for j in range(self._dim)])

    def __setitem__(self, i, value):
        if isinstance(i, tuple):
            call_method(self._js, 'SetElement', int(i[0]), int(i[1]), float(value))
        else:
            call_method(self._js, 'setRow', int(i), to_js([float(x) for x in value]))

    def __iter__(self):
        for i in range(self._dim):
            yield self[i]

    def __contains__(self, value):
        return any(value in row for row in self) if is_real(value) else value in list(self)

    def GetArray(self):
        return [float(x) for x in call_method(self._js, 'GetArray')]

    def __repr__(self):
        return 'Gf.%s(%s)' % (type(self).__name__, ', '.join(
            repr(float(x)) for x in self.GetArray()))

    def __str__(self):
        return _ts.toString(self._js)

    def __eq__(self, o):
        if isinstance(o, _Matrix) and o._dim == self._dim:
            return self.GetArray() == o.GetArray()
        return NotImplemented

    def __ne__(self, o):
        r = self.__eq__(o)
        return r if r is NotImplemented else not r

    __hash__ = None

    def __mul__(self, o):
        if isinstance(o, _Matrix) and o._dim == self._dim:
            return call_method(self._js, 'getMultiply', o._js)
        if is_real(o):
            return call_method(self._js, 'getScalarMultiply', float(o))
        if isinstance(o, _Vec) and len(o) == self._dim:
            return call_method(self._js, 'multMatrixVec', o._js)
        return NotImplemented

    def __rmul__(self, o):
        if is_real(o):
            return call_method(self._js, 'getScalarMultiply', float(o))
        if isinstance(o, _Vec) and len(o) == self._dim:
            return call_method(self._js, 'multVecMatrix', o._js)
        return NotImplemented

    def __imul__(self, o):
        if isinstance(o, _Matrix) and o._dim == self._dim:
            call_method(self._js, 'multiplyInPlace', o._js)
            return self
        if is_real(o):
            call_method(self._js, 'scalarMultiplyInPlace', float(o))
            return self
        return NotImplemented

    def __add__(self, o):
        return call_method(self._js, 'getAdd', o._js) if isinstance(o, type(self)) else NotImplemented

    def __sub__(self, o):
        return call_method(self._js, 'getSubtract', o._js) if isinstance(o, type(self)) else NotImplemented

    def __neg__(self):
        return call_method(self._js, 'getNegated')

    def __truediv__(self, o):
        if isinstance(o, _Matrix):
            return call_method(self._js, 'getDivide', o._js)
        if is_real(o):
            return call_method(self._js, 'getScalarMultiply', 1.0 / float(o))
        return NotImplemented

    def Transform(self, v):
        return call_method(self._js, 'Transform', v._js)

    def TransformDir(self, v):
        return call_method(self._js, 'transformDir', v._js)

    def TransformAffine(self, v):
        return call_method(self._js, 'transformAffine', v._js)

    def GetRow(self, i):
        return self[i]

    def GetColumn(self, j):
        return self._row_class()(*[self[i, j] for i in range(self._dim)])


for _n in (2, 3, 4):
    for _s in 'df':
        _name = 'Matrix%d%s' % (_n, _s)
        _cls = type(_name, (_Matrix,), {'__slots__': (), '_dim': _n, '_scalar': _s,
                                         '__module__': __name__})
        register(getattr(_Gf, _name), _cls)
        globals()[_name] = _cls
del _n, _s, _name, _cls


# ---- Quat{d,f,h} (wrapQuat.template.cpp) --------------------------------------

class _Quat(Wrapped):
    """GfQuat<s>(real, imaginary) over the core's GfQuat<s>
    (gf/src/quaternion.ts)."""
    __slots__ = ()

    def __init__(self, *args):
        conv = []
        for a in args:
            if isinstance(a, (_Vec, _Quat)):
                conv.append(a._js)
            elif isinstance(a, (list, tuple)):
                conv.append(to_js([float(x) for x in a]))
            else:
                conv.append(float(a))
        self._js = construct(self._jsclass, *conv)

    def GetReal(self):
        return float(call_method(self._js, 'GetReal'))

    def GetImaginary(self):
        return call_method(self._js, 'GetImaginary')

    def __repr__(self):
        i = self.GetImaginary()
        return 'Gf.%s(%r, Gf.Vec3%s(%s))' % (type(self).__name__, self.GetReal(), self._scalar,
                                           ', '.join(repr(float(x)) for x in i))

    def __str__(self):
        return _ts.toString(self._js)

    def __eq__(self, o):
        if isinstance(o, _Quat):
            return self.GetReal() == o.GetReal() and list(self.GetImaginary()) == list(o.GetImaginary())
        return NotImplemented

    def __ne__(self, o):
        r = self.__eq__(o)
        return r if r is NotImplemented else not r

    __hash__ = None

    def __mul__(self, o):
        if isinstance(o, _Quat):
            return call_method(self._js, 'getMultiply', o._js)
        if is_real(o):
            return call_method(self._js, 'getScaled', float(o))
        return NotImplemented

    def __rmul__(self, o):
        return call_method(self._js, 'getScaled', float(o)) if is_real(o) else NotImplemented

    def __add__(self, o):
        return call_method(self._js, 'add', o._js) if isinstance(o, _Quat) else NotImplemented

    def __sub__(self, o):
        return call_method(self._js, 'subtract', o._js) if isinstance(o, _Quat) else NotImplemented

    def __neg__(self):
        return call_method(self._js, 'getNegated')


for _s in 'dfh':
    _name = 'Quat%s' % _s
    _cls = type(_name, (_Quat,), {'__slots__': (), '_scalar': _s, '__module__': __name__})
    register(getattr(_Gf, _name), _cls)
    globals()[_name] = _cls
del _s, _name, _cls


def IsClose(a, b, epsilon):
    """GfIsClose (math.h:42-45 for scalars; vec.template.h GfIsClose:
    |a - b|^2 <= epsilon^2 for vectors; matrix.template.h: every element)."""
    if is_real(a) and is_real(b):
        return abs(float(a) - float(b)) < float(epsilon)
    if isinstance(a, _Vec) and isinstance(b, _Vec):
        return sum((x - y) ** 2 for x, y in zip(a, b)) <= float(epsilon) ** 2
    if isinstance(a, _Matrix) and isinstance(b, _Matrix):
        return bool(_ts.callFunction(_Gf.IsCloseMatrix, a._js, b._js, float(epsilon))[1])
    rows_a, rows_b = list(a), list(b)
    flat_a = [float(x) for r in rows_a for x in (r if hasattr(r, '__iter__') else [r])]
    flat_b = [float(x) for r in rows_b for x in (r if hasattr(r, '__iter__') else [r])]
    return len(flat_a) == len(flat_b) and all(
        abs(x - y) <= float(epsilon) for x, y in zip(flat_a, flat_b))
`,"/pxr-python/pxr/Sdf/_sdf.py":`"""_sdf: the forwarding module upstream's pxr/usd/sdf/__init__.py loads.

Only the classes the ported tests use: Path (wrapPath.cpp) and LayerOffset
(wrapLayerOffset.cpp), forwarding to typescript-usd's SdfPath and
sdfLayerOffset* functions.
"""
import js
from pyodide.ffi import to_js

from pxr._bridge import (Wrapped, register, call_method, call_function, construct,
                         wrap, unwrap, define_operators, comparisons, is_real,
                         bind, REQUIRED, AnnotatedBoolResult, ts as _ts)
from pxr import Gf

_Sdf = _ts.Sdf
_SdfPath = _Sdf.Path


# ---- Path (wrapPath.cpp:149-354) ---------------------------------------------

def _path_js(x):
    """An SdfPath argument: a Path, or a str by implicitly_convertible<string,
    SdfPath> (wrapPath.cpp:340)."""
    if isinstance(x, Path):
        return x._js
    if isinstance(x, str):
        return call_method(_SdfPath, 'fromString', x)._js
    raise TypeError('expected Sdf.Path, got %s' % type(x).__name__)


def _paths_js(xs):
    return to_js([_path_js(x) for x in xs])


def _same(x):
    return x


def _method(name, core, params=(), ret=None):
    """One forwarded method: \`params\` are (name, convert, default)."""
    sig = [(p, d) for p, _, d in params]
    convs = [c for _, c, _ in params]

    def fwd(self, *args, **kwargs):
        vals = bind(name, sig, args, kwargs)
        r = call_method(self._js, core, *[c(v) for c, v in zip(convs, vals)])
        return ret(r) if ret else r
    fwd.__name__ = name
    return fwd


def _static(name, core, params=(), ret=None, target=None):
    sig = [(p, d) for p, _, d in params]
    convs = [c for _, c, _ in params]

    def fwd(*args, **kwargs):
        vals = bind(name, sig, args, kwargs)
        args = [c(v) for c, v in zip(convs, vals)]
        if target is None:
            r = call_method(_SdfPath, core, *args)
        else:
            r = call_function(getattr(_Sdf, target), *args)
        return ret(r) if ret else r
    fwd.__name__ = name
    return staticmethod(fwd)


_P = lambda n, d=REQUIRED: (n, _path_js, d)
_S = lambda n, d=REQUIRED: (n, str, d)
_B = lambda n, d=REQUIRED: (n, bool, d)
_I = lambda n, d=REQUIRED: (n, int, d)


class Path(Wrapped):
    __slots__ = ()
    # add_property (wrapPath.cpp:166-191, 220)
    _properties = {'pathElementCount': None, 'pathString': None,
                   'name': None, 'elementString': None,
                   'targetPath': 'getTargetPath', 'isEmpty': None}

    def __init__(self, path=None):
        if path is None:
            self._js = _SdfPath.emptyPath
        elif isinstance(path, Path):
            self._js = path._js
        elif isinstance(path, str):
            self._js = _path_js(path)
        else:
            raise TypeError('Sdf.Path(): expected str or Sdf.Path, got %s'
                            % type(path).__name__)

    GetPrefixes = _method('GetPrefixes', 'getPrefixes', [_I('numPrefixes', 0)])
    GetAncestorsRange = _method('GetAncestorsRange', 'getAncestorsRange')
    HasPrefix = _method('HasPrefix', 'hasPrefix', [_P('prefix')])
    MakeAbsolutePath = _method('MakeAbsolutePath', 'makeAbsolutePath', [_P('anchor')])
    MakeRelativePath = _method('MakeRelativePath', 'makeRelativePath', [_P('anchor')])
    AppendPath = _method('AppendPath', 'appendPath', [_P('newSuffix')])
    AppendTarget = _method('AppendTarget', 'appendTarget', [_P('targetPath')])
    AppendMapper = _method('AppendMapper', 'appendMapper', [_P('targetPath')])
    ReplacePrefix = _method('ReplacePrefix', 'replacePrefix',
                            [_P('oldPrefix'), _P('newPrefix'),
                             _B('fixTargetPaths', True)])
    GetCommonPrefix = _method('GetCommonPrefix', 'getCommonPrefix', [_P('path')])
    # return_value_policy<TfPyPairToTuple>
    RemoveCommonSuffix = _method('RemoveCommonSuffix', 'removeCommonSuffix',
                                 [_P('otherPath'), _B('stopAtRootPrim', False)],
                                 ret=tuple)
    GetVariantSelection = _method('GetVariantSelection', 'getVariantSelection',
                                  ret=tuple)
    ReplaceTargetPath = _method('ReplaceTargetPath', 'replaceTargetPath',
                                [_P('newTargetPath')])

    GetConciseRelativePaths = _static(
        'GetConciseRelativePaths', 'getConciseRelativePaths',
        [('paths', _paths_js, REQUIRED)])
    RemoveDescendentPaths = _static(
        'RemoveDescendentPaths', 'removeDescendentPaths',
        [('paths', _paths_js, REQUIRED)])
    RemoveAncestorPaths = _static(
        'RemoveAncestorPaths', 'removeAncestorPaths',
        [('paths', _paths_js, REQUIRED)])
    IsValidIdentifier = _static('IsValidIdentifier', 'isValidIdentifier', [_S('name')])
    IsValidNamespacedIdentifier = _static(
        'IsValidNamespacedIdentifier', 'isValidNamespacedIdentifier', [_S('name')])
    TokenizeIdentifier = _static('TokenizeIdentifier', 'tokenizeIdentifier', [_S('name')])
    StripNamespace = _static('StripNamespace', 'stripNamespace', [_S('name')])
    StripPrefixNamespace = _static('StripPrefixNamespace', 'stripPrefixNamespace',
                                   [_S('name'), _S('matchNamespace')], ret=tuple)

    @staticmethod
    def JoinIdentifier(*args):
        # Two overloads (wrapPath.cpp:264-271): a sequence, or lhs and rhs.
        if len(args) == 1:
            return call_method(_SdfPath, 'joinIdentifier', to_js([str(a) for a in args[0]]))
        lhs, rhs = args
        return call_method(_SdfPath, 'joinIdentifier', str(lhs), str(rhs))

    @staticmethod
    def IsValidPathString(pathString):
        # _IsValidPathString (wrapPath.cpp:76-84): Sdf_PathIsValidPathStringResult.
        err = to_js({}, dict_converter=js.Object.fromEntries)
        ok = call_method(_SdfPath, 'isValidPathString', str(pathString), err)
        msg = getattr(err, 'value', None)
        return AnnotatedBoolResult(ok, msg if isinstance(msg, str) else '',
                                   'errorMessage')

    @staticmethod
    def FindPrefixedRange(paths, prefix):
        # _FindPrefixedRange (wrapPath.cpp:42-51): a slice of \`paths\`.
        begin, end = call_function(_Sdf.sdfPathFindPrefixedRange,
                                   _paths_js(paths), _path_js(prefix))
        return slice(begin, end)

    @staticmethod
    def FindLongestPrefix(paths, path):
        # _FindLongestPrefix (wrapPath.cpp:53-61): the path, or None.
        paths = list(paths)
        i = call_function(_Sdf.sdfPathFindLongestPrefix, _paths_js(paths),
                          _path_js(path))
        return None if i == len(paths) else paths[i]

    @staticmethod
    def FindLongestStrictPrefix(paths, path):
        paths = list(paths)
        i = call_function(_Sdf.sdfPathFindLongestStrictPrefix,
                          _paths_js(paths), _path_js(path))
        return None if i == len(paths) else paths[i]

    def __str__(self):
        return self._js.pathString

    def __bool__(self):
        return not self._js.isEmpty()

    def __repr__(self):
        # _Repr (wrapPath.cpp:22-31)
        if self._js.isEmpty():
            return 'Sdf.Path.emptyPath'
        return 'Sdf.Path(%r)' % self._js.pathString

    def __hash__(self):
        return hash(self._js.pathString)


register(_SdfPath, Path)


def _is_path_like(o):
    return isinstance(o, (Path, str))


comparisons(Path, _is_path_like,
            lambda s, o: _SdfPath.compare(s._js, _path_js(o)))

# def_readonly constants (wrapPath.cpp:157-164) and SdfPathTokens
# (wrapPath.cpp:325-334).
Path.absoluteRootPath = Path._from_js(_SdfPath.absoluteRootPath)
Path.reflexiveRelativePath = Path._from_js(_SdfPath.reflexiveRelativePath)
Path.emptyPath = Path._from_js(_SdfPath.emptyPath)
for _token in ('absoluteIndicator', 'childDelimiter', 'propertyDelimiter',
               'relationshipTargetStart', 'relationshipTargetEnd',
               'parentPathElement', 'mapperIndicator', 'expressionIndicator',
               'mapperArgDelimiter', 'namespaceDelimiter'):
    setattr(Path, _token, getattr(_SdfPath, _token))
del _token


def _PathGetDebuggerPathText(path):
    # Sdf_PathGetDebuggerPathText (path.cpp): the path's text.
    return Path(path).pathString


def _DumpPathStats():
    # Sdf_DumpPathStats prints node-table statistics; typescript-usd keeps
    # no path node tables, so there is nothing to report.
    print('Sdf path stats: not tracked by typescript-usd')


# ---- LayerOffset (wrapLayerOffset.cpp:56-92) ---------------------------------

def _offset_js(offset, scale):
    return to_js({'offset': float(offset), 'scale': float(scale)},
                 dict_converter=js.Object.fromEntries)


class LayerOffset(object):
    """An immutable SdfLayerOffset; the core's is a plain {offset, scale}
    record with free functions (pxr/usd/sdf/src/layerOffset.ts)."""
    __slots__ = ('_js',)

    def __init__(self, offset=0.0, scale=1.0):
        if isinstance(offset, LayerOffset):
            self._js = offset._js
        else:
            self._js = _offset_js(offset, scale)

    @classmethod
    def _from_js(cls, value):
        self = cls.__new__(cls)
        self._js = value
        return self

    @property
    def offset(self):
        return float(self._js.offset)

    @property
    def scale(self):
        return float(self._js.scale)

    def IsIdentity(self):
        return call_function(_Sdf.sdfLayerOffsetIsIdentity, self._js)

    def GetInverse(self):
        inv = call_function(_Sdf.sdfLayerOffsetInverse, self._js)
        if inv is None:
            # layerOffset.cpp:37-50: a zero scale inverts to an infinite one.
            return LayerOffset(-self.offset * float('inf'), float('inf'))
        return LayerOffset._from_js(inv)

    def __repr__(self):
        # _Repr (wrapLayerOffset.cpp:28-41)
        offset, scale = self.offset, self.scale
        args = ''
        if offset != 0.0 or scale != 1.0:
            args = _ts.toString(offset)
            if scale != 1.0:
                args += ', ' + _ts.toString(scale)
        return 'Sdf.LayerOffset(%s)' % args

    def __hash__(self):
        return hash((self.offset, self.scale))


define_operators(LayerOffset, {
    '__eq__': [(lambda o: isinstance(o, LayerOffset),
                lambda s, o: call_function(_Sdf.sdfLayerOffsetEquals, s._js, o._js))],
    '__ne__': [(lambda o: isinstance(o, LayerOffset),
                lambda s, o: not call_function(_Sdf.sdfLayerOffsetEquals, s._js, o._js))],
    # Overload order matters (wrapLayerOffset.cpp:80-85).
    '__mul__': [
        (lambda o: isinstance(o, LayerOffset),
         lambda s, o: LayerOffset._from_js(
             call_function(_Sdf.sdfLayerOffsetCompose, s._js, o._js))),
        (lambda o: isinstance(o, Gf.TimeCode),
         lambda s, o: call_function(_Sdf.sdfLayerOffsetApply, s._js, o._js)),
        (lambda o: isinstance(o, Gf.Duration),
         lambda s, o: call_function(_Sdf.sdfLayerOffsetApply, s._js, o._js)),
        (is_real, lambda s, o: float(call_function(
            _Sdf.sdfLayerOffsetApply, s._js, float(o)))),
    ],
})


# ---- AssetPath (wrapAssetPath.cpp:96-130) ------------------------------------

def _repr_str(s):
    return repr(str(s))


class AssetPath(Wrapped):
    __slots__ = ()
    _properties = {'path': 'getAssetPath', 'authoredPath': 'getAuthoredPath',
                   'evaluatedPath': 'getEvaluatedPath',
                   'resolvedPath': 'getResolvedPath'}

    def __init__(self, *args, **kwargs):
        # boost.python tries the overloads last-registered first
        # (wrapAssetPath.cpp:100-105): (authoredPath, resolvedPath),
        # (authoredPath), (AssetPath), then MakeAssetPath's raw
        # keyword-only form, then ().
        if not args and not kwargs:
            self._js = construct(_Sdf.AssetPath)
            return
        try:
            a, r = bind('AssetPath', [('authoredPath', REQUIRED),
                                      ('resolvedPath', REQUIRED)],
                        args, dict(kwargs))
            self._js = construct(_Sdf.AssetPath, str(a), str(r))
            return
        except TypeError:
            pass
        try:
            (a,) = bind('AssetPath', [('authoredPath', REQUIRED)], args, dict(kwargs))
            if isinstance(a, AssetPath):
                self._js = construct(_Sdf.AssetPath, a._js)
            else:
                self._js = construct(_Sdf.AssetPath, str(a))
            return
        except TypeError:
            pass
        # MakeAssetPath (wrapAssetPath.cpp:62-92)
        if args:
            raise TypeError("Use keyword arguments 'authoredPath', "
                            "'evaluatedPath', and/or 'resolvedPath'")
        params = {}
        for k, v in kwargs.items():
            if k not in ('authoredPath', 'evaluatedPath', 'resolvedPath'):
                raise TypeError("Keyword arguments must be 'authoredPath', "
                                "'evaluatedPath', or 'resolvedPath'")
            params[k] = str(v)
        self._js = construct(_Sdf.AssetPath, to_js(
            params, dict_converter=js.Object.fromEntries))

    def __repr__(self):
        # _Repr (wrapAssetPath.cpp:28-44)
        s = 'Sdf.AssetPath(authoredPath=' + _repr_str(self.authoredPath)
        if self.evaluatedPath:
            s += ', evaluatedPath=' + _repr_str(self.evaluatedPath)
        if self.resolvedPath:
            s += ', resolvedPath=' + _repr_str(self.resolvedPath)
        return s + ')'

    def __str__(self):
        # TfStringify(SdfAssetPath): operator<< writes @path@.
        return '@' + self.path + '@'

    def __bool__(self):
        return bool(self.path)

    def __hash__(self):
        return hash((self.authoredPath, self.evaluatedPath, self.resolvedPath))


register(_Sdf.AssetPath, AssetPath)


def _asset_compare(s, o):
    if call_method(s._js, 'lessThan', o._js):
        return -1
    if call_method(o._js, 'lessThan', s._js):
        return 1
    return 0


comparisons(AssetPath, lambda o: isinstance(o, AssetPath), _asset_compare)
# == is SdfAssetPath::operator== (all three paths), not !(a<b) && !(b<a).
define_operators(AssetPath, {
    '__eq__': [(lambda o: isinstance(o, AssetPath),
                lambda s, o: call_method(s._js, 'equals', o._js))],
    '__ne__': [(lambda o: isinstance(o, AssetPath),
                lambda s, o: not call_method(s._js, 'equals', o._js))],
})


# ---- ValueTypeName (wrapValueTypeName.cpp) -----------------------------------

class ValueTypeName(object):
    """SdfValueTypeName; the core's is a plain record (valueTypeName.ts)."""
    __slots__ = ('_js',)

    @classmethod
    def _from_js(cls, value):
        self = cls.__new__(cls)
        self._js = value
        return self

    def __str__(self):
        return self._js.name

    def _as_core_argument(self):
        # The core's APIs take a value type as its name (e.g.
        # UsdShadeShader.createInput(name, typeName: string)).
        return str(self._js.name)

    def __repr__(self):
        return 'Sdf.ValueTypeName(%r)' % self._js.name

    def __eq__(self, other):
        if isinstance(other, str):
            return self._js.name == other
        if isinstance(other, ValueTypeName):
            return self._js.name == other._js.name
        return NotImplemented

    def __hash__(self):
        return hash(self._js.name)

    @property
    def isArray(self):
        return bool(self._js.isArray)

    @property
    def isScalar(self):
        return bool(self._js.isScalar)

    @property
    def role(self):
        return self._js.role

    @property
    def cppTypeName(self):
        return self._js.cppTypeName

    @property
    def arrayType(self):
        return ValueTypeName._from_js(self._js.arrayType)

    @property
    def scalarType(self):
        return ValueTypeName._from_js(self._js.scalarType)


class _ValueTypeNames(object):
    """Sdf.ValueTypeNames (wrapTypes.cpp): SdfValueTypeNames' members."""

    def __getattr__(self, name):
        value = getattr(_Sdf.ValueTypeNames, name, None)
        if value is None:
            raise AttributeError(name)
        return ValueTypeName._from_js(value)


ValueTypeNames = _ValueTypeNames()


# ---- Layer (wrapLayer.cpp) ---------------------------------------------------

class _SubLayerPathsProxy(object):
    """SdfSubLayerProxy (wrapLayer.cpp: subLayerPaths): a live list view
    writing through to the layer."""
    __slots__ = ('_layer',)

    def __init__(self, layer):
        self._layer = layer

    def _get(self):
        return list(call_method(self._layer, 'getSubLayerPaths'))

    def __len__(self):
        return len(self._get())

    def __iter__(self):
        return iter(self._get())

    def __getitem__(self, i):
        return self._get()[i]

    def __eq__(self, other):
        return self._get() == list(other)

    def __repr__(self):
        return repr(self._get())

    def append(self, path):
        call_method(self._layer, 'insertSubLayerPath', str(path), -1)

    def insert(self, index, path):
        call_method(self._layer, 'insertSubLayerPath', str(path), index)

    def remove(self, path):
        paths = self._get()
        call_method(self._layer, 'removeSubLayerPath', paths.index(path))

    def clear(self):
        call_method(self._layer, 'setSubLayerPaths', to_js([]))


class Layer(Wrapped):
    __slots__ = ()
    _properties = {'identifier': None, 'realPath': None, 'anonymous': 'isAnonymous',
                   'dirty': 'isDirty', 'defaultPrim': None}

    def __init__(self, *args):
        raise TypeError('Sdf.Layer: no constructor defined')

    @property
    def subLayerPaths(self):
        return _SubLayerPathsProxy(self._js)

    @subLayerPaths.setter
    def subLayerPaths(self, paths):
        call_method(self._js, 'setSubLayerPaths', to_js([str(p) for p in paths]))

    def __setattr__(self, name, value):
        if name == '_js' or isinstance(getattr(type(self), name, None), property):
            object.__setattr__(self, name, value)
        else:
            raise AttributeError("can't set attribute %r" % name)

    def __repr__(self):
        return "Sdf.Find(%r)" % self.identifier


register(_Sdf.Layer, Layer)
`,"/pxr-python/pxr/Sdr/_sdr.py":`"""_sdr: the forwarding module upstream's __init__.py for pxr.Sdr loads.
Nothing is written by hand yet: every name forwards mechanically."""
from pxr._bridge import forward_module, ts as _ts

forward_module(globals(), _ts.Sdr, ('Sdr',))
`,"/pxr-python/pxr/Tf/_tf.py":`"""_tf: the forwarding module upstream's pxr/base/tf/__init__.py loads.

Mirrors the names pxr/base/tf/wrapDiagnostic.cpp, wrapError.cpp and
wrapScopeDescription.cpp define that __init__.py itself uses.
"""
from pxr import _bridge
from pxr._bridge import ts as _ts

_Tf = _ts.Tf


# wrapError.cpp: Tf_PySetErrorExceptionClass.
def __SetErrorExceptionClass(cls):
    _bridge.set_error_exception_class(cls)


# wrapDiagnostic.cpp: _Warn/_Status/_RaiseCodingError/_RaiseRuntimeError/
# _Fatal(msg, moduleName, functionName, fileName, lineNo).
def _Warn(msg, *codeInfo):
    _Tf.TF_WARN(msg)


def _Status(msg, *codeInfo):
    _Tf.TF_STATUS(msg)


def _RaiseCodingError(msg, *codeInfo):
    _Tf.TF_CODING_ERROR(msg)


def _RaiseRuntimeError(msg, *codeInfo):
    _Tf.TF_RUNTIME_ERROR(msg)


def _Fatal(msg, *codeInfo):
    _bridge.call_function(_Tf.TF_FATAL_ERROR, msg)


def RepostErrors(exc):
    """wrapError.cpp _RepostErrors: put an ErrorException's errors back on
    the error list; True when there were any."""
    errors = getattr(exc, 'args', ())
    for e in errors:
        _Tf.TF_RUNTIME_ERROR(str(e))
    return bool(errors)


class _ScopeDescription(object):
    """wrapScopeDescription.cpp: a context manager over TfScopeDescription."""

    def __init__(self, description):
        self._description = description
        self._js = None

    def __enter__(self):
        self._js = _bridge.construct(_Tf.TfScopeDescription, self._description)
        return self

    def __exit__(self, *exc):
        if self._js is not None:
            _bridge.call_method(self._js, 'dispose')
            self._js = None
        return False

    def SetDescription(self, description):
        self._description = description
`,"/pxr-python/pxr/Usd/_usd.py":`"""_usd: the forwarding module upstream's pxr/usd/usd/__init__.py loads.

Stage (wrapStage.cpp), Prim (wrapPrim.cpp) and TimeCode (wrapTimeCode.cpp),
as far as the ported tests use them.
"""
from pxr._bridge import (Wrapped, register, call_method, call_function,
                         get_property, construct, wrap, is_real, comparisons,
                         auto_class, ts as _ts)
from pxr import Sdf

_Usd = _ts.Usd


class _UsdWrapped(Wrapped):
    """typescript-usd's Usd core takes prim and property paths as strings and
    scene-description type names as their token strings."""
    __slots__ = ()

    @staticmethod
    def _convert_arg(a):
        if isinstance(a, Sdf.Path):
            return a.pathString
        if isinstance(a, Sdf.ValueTypeName):
            return str(a)
        if isinstance(a, TimeCode):
            return a._js
        return a


# ---- TimeCode (wrapTimeCode.cpp) ---------------------------------------------

class TimeCode(Wrapped):
    __slots__ = ()

    def __init__(self, value=0.0):
        if isinstance(value, TimeCode):
            self._js = value._js
        else:
            self._js = construct(_Usd.TimeCode, float(value))

    @staticmethod
    def EarliestTime():
        return call_method(_Usd.TimeCode, 'EarliestTime')

    @staticmethod
    def Default():
        return call_method(_Usd.TimeCode, 'Default')

    def GetValue(self):
        return float(call_method(self._js, 'GetValue'))

    def IsDefault(self):
        return call_method(self._js, 'isDefault')

    def __repr__(self):
        # wrapTimeCode.cpp:38-57 __repr__, TF_PY_REPR_PREFIX 'Usd.'.
        tail = '.Default()'
        if not call_method(self._js, 'isDefault'):
            value = float(call_method(self._js, 'GetValue'))
            earliest = call_method(self._js, 'isEarliestTime')
            if call_method(self._js, 'isPreTime'):
                tail = ('.PreTime(Usd.TimeCode.EarliestTime().GetValue())'
                        if earliest else '.PreTime(%r)' % value)
            elif earliest:
                tail = '.EarliestTime()'
            else:
                tail = '()' if value == 0.0 else '(%r)' % value
        return 'Usd.TimeCode' + tail

    def __str__(self):
        # wrapTimeCode.cpp:33-36 _Str: TfStringify (timeCode.cpp:33-47).
        return call_function(_Usd.usdTimeCodeToStreamString, self._js)


def _time_compare(a, b):
    # timeCode.h:165-209: Default() equals Default() and is less than every
    # numeric time; a pre-time is less than the time it precedes.
    a_default = call_method(a._js, 'isDefault')
    b_default = call_method(b._js, 'isDefault')
    if a_default or b_default:
        return (b_default - a_default) * -1 if a_default != b_default else 0
    av, bv = a.GetValue(), b.GetValue()
    if av != bv:
        return -1 if av < bv else 1
    ap, bp = call_method(a._js, 'isPreTime'), call_method(b._js, 'isPreTime')
    return 0 if ap == bp else (-1 if ap else 1)


# wrapTimeCode.cpp:89-94 (self == self, ... self >= self).
comparisons(TimeCode, lambda o: isinstance(o, TimeCode), _time_compare)


def _time_hash(self):
    # wrapTimeCode.cpp:31 __hash__ over hash_value (timeCode.h:212-214):
    # (value, isPreTime); every Default() is equal, so they hash alike.
    if call_method(self._js, 'isDefault'):
        return hash('Usd.TimeCode.Default')
    return hash((self.GetValue(), bool(call_method(self._js, 'isPreTime'))))


TimeCode.__hash__ = _time_hash
register(_Usd.TimeCode, TimeCode)


# Scalar value types whose VtValue holds a C++ floating-point type, which
# boost.python returns as a Python float (sdf/types.h). The core keeps them
# as JavaScript numbers, which Pyodide hands to Python as an int when the
# number is whole (a value authored from TypeScript as \`set(5)\`).
_FLOAT_SCALARS = frozenset(('double', 'float', 'half', 'timecode'))


def _scalar_value(type_name, value):
    if (isinstance(value, int) and not isinstance(value, bool)
            and str(type_name) in _FLOAT_SCALARS):
        return float(value)
    return value


def time_arg(t):
    """A UsdTimeCode argument as the core's numeric time: the core's
    schema helpers take \`time?: number\`, with undefined for Default."""
    if t is None:
        return None
    if isinstance(t, TimeCode):
        t = t.GetValue()
    t = float(t)
    return None if t != t else t


def time_value(t):
    """A UsdTimeCode argument as the core takes it where it accepts
    \`number | UsdTimeCode\` (e.g. UsdGeomBBoxCache)."""
    if isinstance(t, TimeCode):
        return t._js
    return float(t)


# ---- Prim (wrapPrim.cpp) -----------------------------------------------------

class Prim(_UsdWrapped):
    """UsdPrim. An invalid prim (Usd.Prim(), or GetPrimAtPath of a missing
    path) holds no core prim: the core returns undefined instead."""
    __slots__ = ()

    def __init__(self):
        self._js = None

    @classmethod
    def _from_js(cls, js):
        self = cls.__new__(cls)
        self._js = js
        return self

    def IsValid(self):
        return self._js is not None and bool(call_method(self._js, 'isValid'))

    def __bool__(self):
        return self.IsValid()

    def GetPath(self):
        return Sdf.Path(self._js.path) if self._js is not None else Sdf.Path()

    def GetName(self):
        # UsdObject::GetName (object.h): the name of the prim's path; the
        # core's Prim has no name member of its own.
        return self.GetPath().name if self._js is not None else ''

    def GetTypeName(self):
        return self._js.typeName

    def GetStage(self):
        return call_method(self._js, 'getStage')

    def GetAttribute(self, attrName):
        return call_method(self._js, 'attr', str(attrName))

    def HasAttribute(self, attrName):
        return call_method(self._js, 'getAttr', str(attrName)) is not None

    def __eq__(self, other):
        if not isinstance(other, Prim):
            return NotImplemented
        if self._js is None or other._js is None:
            return self._js is None and other._js is None
        return self._js.path == other._js.path and _ts.same(
            call_method(self._js, 'getStage')._js,
            call_method(other._js, 'getStage')._js)

    def __ne__(self, other):
        r = self.__eq__(other)
        return r if r is NotImplemented else not r

    def __hash__(self):
        return hash(self._js.path if self._js is not None else '')

    def __repr__(self):
        if not self.IsValid():
            return 'invalid null prim'
        return 'Usd.Prim(<%s>)' % self._js.path

    def __getattr__(self, name):
        if object.__getattribute__(self, '_js') is None and not name.startswith('__'):
            def invalid(*args, **kwargs):
                from pxr._bridge import _error_exception_class
                raise _error_exception_class(
                    'Used null prim')
            return invalid
        return Wrapped.__getattr__(self, name)


register(_Usd.Prim, Prim)


class _Property(_UsdWrapped):
    """UsdProperty: equal when they name the same property of the same
    stage (UsdObject::operator==, object.h)."""
    __slots__ = ()

    # The core's properties spell UsdObject::GetPath by rule 1 (getPath);
    # its prims use a \`path\` getter (prim.ts) — a naming exception.
    def GetPath(self):
        return Sdf.Path(self._js.getPath())

    def GetName(self):
        return self._js.name

    def __eq__(self, other):
        if not isinstance(other, _Property) or type(self) is not type(other):
            return NotImplemented
        return self._js.getPath() == other._js.getPath() and _ts.same(
            self._js.getStage(), other._js.getStage())

    def __hash__(self):
        return hash(self._js.getPath())

    def __repr__(self):
        return 'Usd.%s(<%s>)' % (type(self).__name__, self._js.getPath())


class Attribute(_Property):
    __slots__ = ()

    # wrapAttribute.cpp: Get(time=Default), Set(value, time=Default).
    def Get(self, time=None):
        t = time_arg(time)
        if t is None:
            value = call_method(self._js, 'getValue')
        else:
            # UsdAttribute::Get(value, time) (attribute.h): the core's
            # get(time) resolves time samples, splines and value clips.
            value = call_method(self._js, 'get', t)
        return _scalar_value(self._js.typeName, value)

    def Set(self, value, time=None):
        t = time_arg(time)
        if t is None:
            call_method(self._js, 'set', value)
        else:
            call_method(self._js, 'setTimeSample', t, value)
        return True

    def GetTimeSamples(self):
        return [float(t) for t in call_method(self._js, 'getTimeSampleKeys')]

    def GetNumTimeSamples(self):
        return len(self.GetTimeSamples())

    def GetTypeName(self):
        return Sdf.ValueTypeName._from_js(
            _ts.callFunction(_ts.Sdf.findValueTypeName, self._js.typeName)[1])

    def IsValid(self):
        return bool(call_method(self._js, 'isValid'))

    def __bool__(self):
        return self.IsValid()


class Relationship(_Property):
    __slots__ = ()


register(_Usd.Attribute, Attribute)
register(_Usd.Rel, Relationship)
StageCache = auto_class('StageCache', _Usd.StageCache, base=_UsdWrapped)


def prim_result(js):
    """A UsdPrim return value: invalid when the core returns undefined."""
    return js if isinstance(js, Prim) else Prim._from_js(None)


# ---- Stage (wrapStage.cpp) ---------------------------------------------------

class Stage(_UsdWrapped):
    """UsdStage. typescript-usd composes a stage's layer edits (sublayers,
    references, payloads that load layers) asynchronously, settled by
    \`await stage.flushChanges()\` (packages/usd/AGENTS.md, "Interim APIs");
    upstream's change processing is synchronous (stage.cpp
    _HandleLayersDidChange). So every call through a Stage first awaits
    flushChanges, and Python sees the stage as composed after each edit."""
    __slots__ = ()

    def _flush(self):
        call_method(self._js, 'flushChanges')

    def __getattr__(self, name):
        attr = _UsdWrapped.__getattr__(self, name)
        if callable(attr):
            def flushed(*args, **kwargs):
                self._flush()
                return attr(*args, **kwargs)
            return flushed
        return attr

    @staticmethod
    def Open(filePath, load=None):
        # UsdStage.open returns a Promise: its asset reads go through Ar
        # asynchronously. wrap() awaits it with pyodide.ffi.run_sync.
        if hasattr(filePath, '_js'):
            filePath = filePath._js
        return call_method(_Usd.Stage, 'open', filePath)

    @staticmethod
    def CreateInMemory(identifier=None):
        return call_method(_Usd.Stage, 'createNew')

    # The time range and rates (stage.cpp:10086-10230): Set* author the
    # stage metadata (SetMetadata); Get* read the core's resolved values,
    # whose fallbacks are those of sdf/schema.cpp (start/end 0, 24 fps).
    def GetStartTimeCode(self):
        v = self._js.startTimeCode
        return 0.0 if v is None else float(v)

    def GetEndTimeCode(self):
        v = self._js.endTimeCode
        return 0.0 if v is None else float(v)

    def SetStartTimeCode(self, startTime):
        call_method(self._js, 'setMetadata', 'startTimeCode', float(startTime))

    def SetEndTimeCode(self, endTime):
        call_method(self._js, 'setMetadata', 'endTimeCode', float(endTime))

    def HasAuthoredTimeCodeRange(self):
        return self._js.startTimeCode is not None and self._js.endTimeCode is not None

    def GetTimeCodesPerSecond(self):
        return float(self._js.timeCodesPerSecond)

    def SetTimeCodesPerSecond(self, timeCodesPerSecond):
        call_method(self._js, 'setMetadata', 'timeCodesPerSecond', float(timeCodesPerSecond))

    def GetFramesPerSecond(self):
        return float(self._js.framesPerSecond)

    def SetFramesPerSecond(self, framesPerSecond):
        call_method(self._js, 'setMetadata', 'framesPerSecond', float(framesPerSecond))

    def GetPrimAtPath(self, path):
        self._flush()
        return prim_result(call_method(self._js, 'getPrim', str(path)))

    def DefinePrim(self, path, typeName=''):
        self._flush()
        return prim_result(call_method(self._js, 'definePrim', str(path),
                                       typeName or None))

    def GetDefaultPrim(self):
        self._flush()
        return prim_result(call_method(self._js, 'getDefaultPrim'))

    def GetPseudoRoot(self):
        return self.GetPrimAtPath('/')

    def Traverse(self, predicate=None):
        # wrapStage.cpp:450-454; UsdStage::Traverse is UsdPrimRange::Stage
        # (stage.cpp:4183-4193; call_method wraps it as a Python iterable of Usd.Prim): a range of prims. (The core's
        # stage.traverse() yields prim paths.)
        self._flush()
        if predicate is None:
            return call_method(_Usd.PrimRange, 'stage', self._js)
        return call_method(_Usd.PrimRange, 'stage', self._js, predicate)

    def TraverseAll(self):
        # UsdStage::TraverseAll (stage.cpp:4196-4199).
        self._flush()
        return call_method(_Usd.PrimRange, 'stage', self._js,
                           get_property(_Usd, 'PrimAllPrimsPredicate'))

    def GetObjectAtPath(self, path):
        self._flush()
        r = call_method(self._js, 'getObjectAtPath', str(path))
        return r if r is not None else Prim._from_js(None)


register(_Usd.Stage, Stage)
`,"/pxr-python/pxr/UsdGeom/_usdGeom.py":`"""_usdGeom: the forwarding module upstream's pxr/usd/usdGeom/__init__.py
loads.

Schema classes forward through pxr._schema (generated Get/Create<Name>Attr
from the schema registry). typescript-usd's UsdGeom keeps several
computations as static helpers over (stage, path) or (prim) rather than
instance methods (pxr/usd/usdGeom/src/imageable.ts, pointBased.ts), so
those forward by hand.
"""
from pyodide.ffi import to_js

from pxr._bridge import (Wrapped, register, call_method, call_function, forward_module,
                         construct, wrap, unwrap, ts as _ts)
from pxr import _bridge
from pxr._schema import SchemaBase
from pxr.Usd import _usd

_UsdGeom = _ts.UsdGeom


class Tokens(object):
    """UsdGeomTokens (pxr/usd/usdGeom/tokens.h), as Python str (TfToken
    converts to str). Core gap: typescript-usd/usdGeom exports no tokens
    object, so the values used here are written out from tokens.h."""
    default_ = 'default'
    render = 'render'
    proxy = 'proxy'
    guide = 'guide'
    inherited = 'inherited'
    invisible = 'invisible'
    visible = 'visible'
    points = 'points'
    x = 'X'
    y = 'Y'
    z = 'Z'
    perspective = 'perspective'
    orthographic = 'orthographic'
    origin = 'origin'
    bounds = 'bounds'
    cards = 'cards'
    cross = 'cross'
    box = 'box'
    fromTexture = 'fromTexture'


# Every other token, from the core's UsdGeomTokens (usdGeom/src/tokens.ts),
# under its tokens.h name.
for _k in _UsdGeom.Tokens.object_keys():
    if not hasattr(Tokens, str(_k)):
        setattr(Tokens, str(_k), str(getattr(_UsdGeom.Tokens, str(_k))))
del _k


# ---- metrics.h ---------------------------------------------------------------

def GetStageUpAxis(stage):
    return call_function(_UsdGeom.getStageUpAxis, stage)


def SetStageUpAxis(stage, axis):
    return call_function(_UsdGeom.setStageUpAxis, stage, str(axis))


def GetStageMetersPerUnit(stage):
    return call_function(_UsdGeom.getStageMetersPerUnit, stage)


def SetStageMetersPerUnit(stage, metersPerUnit):
    return call_function(_UsdGeom.setStageMetersPerUnit, stage, float(metersPerUnit))


# ---- Schemas -----------------------------------------------------------------

class _Schema(SchemaBase):
    __slots__ = ()


class Imageable(_Schema):
    __slots__ = ()
    _jsclass = _UsdGeom.Imageable
    _schemaName = 'Imageable'

    def ComputeVisibility(self, time=None):
        self._require_valid()
        return call_method(_UsdGeom.Imageable, 'computeVisibility',
                           self._js.stage, self._js.path,
                           _usd.time_arg(time))

    def MakeVisible(self, time=None):
        self._require_valid()
        return call_method(self._js, 'makeVisible')

    def MakeInvisible(self, time=None):
        self._require_valid()
        return call_method(self._js, 'makeInvisible')


register(_UsdGeom.Imageable, Imageable)


# ---- XformOp (wrapXformOp.cpp) -----------------------------------------------

class _Enum(int):
    """A TfEnum value as Python sees it: an int with the enum's name, shown
    under the class that wraps it (TfPyWrapEnum)."""
    def __new__(cls, value, name, scope='UsdGeom.XformOp'):
        self = int.__new__(cls, value)
        self._name = name
        self._scope = scope
        return self

    @property
    def name(self):
        return self._name

    def _typed(self):
        # The XformOp.Type value with this number.
        return getattr(XformOp, 'Type' + _OP_TYPES[int(self)])

    def __repr__(self):
        return self._scope + '.' + self._name

    __str__ = __repr__


# xformOp.h:110-140 (Type) and 149-153 (Precision), in declaration order.
_OP_TYPES = ['Invalid', 'TranslateX', 'TranslateY', 'TranslateZ', 'Translate',
             'ScaleX', 'ScaleY', 'ScaleZ', 'Scale', 'RotateX', 'RotateY',
             'RotateZ', 'RotateXYZ', 'RotateXZY', 'RotateYXZ', 'RotateYZX',
             'RotateZXY', 'RotateZYX', 'Orient', 'Transform']
_PRECISIONS = ['Double', 'Float', 'Half']
_PRECISION_OF_TYPE = {'double': 'Double', 'float': 'Float', 'half': 'Half',
                      'double3': 'Double', 'float3': 'Float', 'half3': 'Half',
                      'quatd': 'Double', 'quatf': 'Float', 'quath': 'Half',
                      'matrix4d': 'Double'}


class XformOp(Wrapped):
    """UsdGeomXformOp (wrapXformOp.cpp) over the core's XformOp
    (usdGeom/src/xformOp.ts). As upstream's __getattribute__ does, a name
    the op does not define is looked up on its attribute."""
    __slots__ = ()

    for _i, _n in enumerate(_OP_TYPES):
        locals()['Type' + _n] = _Enum(_i, 'Type' + _n)
    for _i, _n in enumerate(_PRECISIONS):
        locals()['Precision' + _n] = _Enum(_i, 'Precision' + _n)
    del _i, _n

    def __init__(self, attr=None, isInverseOp=False):
        js_attr = attr._js if attr is not None else None
        self._js = construct(_UsdGeom.XformOp, js_attr, bool(isInverseOp))

    @classmethod
    def _from_core(cls, op):
        return cls._from_js(op)

    @classmethod
    def _from_attr(cls, attr, inverse=False):
        return cls(attr, inverse)

    def GetAttr(self):
        return wrap(self._js.getAttr())

    def IsInverseOp(self):
        return bool(self._js.isInverseOp())

    def IsDefined(self):
        return bool(self._js.isDefined())

    def GetName(self):
        return str(self._js.getName())

    def GetBaseName(self):
        return str(self._js.getBaseName())

    def GetNamespace(self):
        return str(self._js.getNamespace())

    def SplitName(self):
        return [str(p) for p in self._js.splitName()]

    def GetTypeName(self):
        return self.GetAttr().GetTypeName()

    def GetOpName(self):
        return str(self._js.getOpName())

    def GetOpType(self):
        return getattr(XformOp, 'Type' + _OP_TYPES[int(self._js.getOpType())])

    def GetPrecision(self):
        return getattr(XformOp, 'Precision' + _PRECISIONS[int(self._js.getPrecision())])

    def Get(self, time=None):
        if time is None:
            return self.GetAttr().Get()
        return self.GetAttr().Get(time)

    def Set(self, value, time=None):
        return bool(call_method(self._js, 'set', value, _usd.time_arg(time)))

    def GetTimeSamples(self):
        return [float(t) for t in call_method(self._js, 'getTimeSamples')]

    def GetTimeSamplesInInterval(self, interval):
        return [float(t) for t in call_method(self._js, 'getTimeSamplesInInterval', interval)]

    def GetNumTimeSamples(self):
        return int(call_method(self._js, 'getNumTimeSamples'))

    def GetOpTransform(self, time=None):
        return call_method(self._js, 'getOpTransform', _usd.time_arg(time))

    def MightBeTimeVarying(self):
        return bool(call_method(self._js, 'mightBeTimeVarying'))

    @staticmethod
    def GetOpTypeToken(opType):
        return str(call_method(_UsdGeom.XformOp, 'getOpTypeToken', int(opType)))

    @staticmethod
    def GetOpTypeEnum(opTypeToken):
        return getattr(XformOp, 'Type' + _OP_TYPES[int(call_method(
            _UsdGeom.XformOp, 'getOpTypeEnum', str(opTypeToken)))])

    def __bool__(self):
        # operator bool: IsDefined (xformOp.h).
        return self.IsDefined()

    def __eq__(self, other):
        if isinstance(other, XformOp):
            return bool(call_method(self._js, 'equals', other._js))
        return NotImplemented

    def __ne__(self, other):
        r = self.__eq__(other)
        return r if r is NotImplemented else not r

    __hash__ = None

    def __getattr__(self, name):
        if name.startswith('_'):
            raise AttributeError(name)
        return getattr(self.GetAttr(), name)

    def __repr__(self):
        attr = self._js.getAttr()
        if attr is None:
            return 'UsdGeom.XformOp()'
        return 'UsdGeom.XformOp(Usd.Prim(<%s>).GetAttribute(%r), %r)' % (
            attr.primPath, str(attr.name), self.IsInverseOp())


register(_UsdGeom.XformOp, XformOp)


# xformable.h: the default precision of each Add<Op>Op.
_DEFAULT_PRECISION = {'Translate': 'Double', 'TranslateX': 'Double',
                      'TranslateY': 'Double', 'TranslateZ': 'Double',
                      'Transform': 'Double'}


def _add_op(op):
    core = 'add%sOp' % op

    def add(self, precision=None, opSuffix='', isInverseOp=False):
        # UsdGeomXformable::Add<Op>Op (xformable.h:511-801): the core's
        # add<Op>Op takes the same arguments and returns a UsdGeomXformOp.
        self._require_prim()
        args = [] if precision is None else [int(precision)]
        if opSuffix or isInverseOp:
            if precision is None:
                default = getattr(XformOp, 'Precision' + _DEFAULT_PRECISION.get(op, 'Float'))
                args = [int(default)]
            args += [str(opSuffix), bool(isInverseOp)]
        return XformOp._from_core(_bridge._check(_ts.callMethod(self._js, core, *args)))
    add.__name__ = 'Add%sOp' % op
    return add


class Xformable(Imageable):
    __slots__ = ()
    _jsclass = _UsdGeom.Xformable
    _schemaName = 'Xformable'

    def GetOrderedXformOps(self):
        # UsdGeomXformable::GetOrderedXformOps (wrapXformable.cpp
        # _GetOrderedXformOps): the ops, without resetsXformStack.
        self._require_prim()
        return [XformOp._from_js(op) for op in self._js.getOrderedXformOps()]

    def SetXformOpOrder(self, orderedXformOps, resetXformStack=False):
        self._require_prim()
        return bool(call_method(self._js, 'setXformOpOrder',
                                to_js([op._js for op in orderedXformOps]), bool(resetXformStack)))

    def GetLocalTransformation(self, *args, **kwargs):
        """GetLocalTransformation(time=Default) or (ops, time=Default)
        (wrapXformable.cpp _GetLocalTransformation1/2)."""
        self._require_prim()
        args = list(args)
        ops = kwargs.pop('ops', None)
        if ops is None and args and isinstance(args[0], (list, tuple)):
            ops = args.pop(0)
        time = kwargs.pop('time', args[0] if args else None)
        if ops is not None:
            return call_method(_UsdGeom.Xformable, 'getLocalTransformation',
                               to_js([op._js for op in ops]), _usd.time_arg(time))
        return call_method(self._js, 'getLocalTransformation', _usd.time_arg(time))

    def GetXformOp(self, opType, opSuffix='', isInverseOp=False):
        self._require_prim()
        return XformOp._from_js(call_method(self._js, 'getXformOp', int(opType), str(opSuffix), bool(isInverseOp))._js)


def _get_op(op):
    core = 'get%sOp' % op

    def get(self, opSuffix='', isInverseOp=False):
        self._require_prim()
        return XformOp._from_js(_bridge._check(_ts.callMethod(self._js, core, str(opSuffix), bool(isInverseOp))))
    get.__name__ = 'Get%sOp' % op
    return get


for _op in _OP_TYPES[1:]:
    setattr(Xformable, 'Add%sOp' % _op, _add_op(_op))
    setattr(Xformable, 'Get%sOp' % _op, _get_op(_op))
del _op

register(_UsdGeom.Xformable, Xformable)


class Xform(Xformable):
    __slots__ = ()
    _jsclass = _UsdGeom.Xform
    _schemaName = 'Xform'


register(_UsdGeom.Xform, Xform)


class Camera(Xformable):
    __slots__ = ()
    _jsclass = _UsdGeom.Camera
    _schemaName = 'Camera'

    def GetCamera(self, time=None):
        self._require_valid()
        return call_method(_UsdGeom.Camera, 'getCamera', self._js.prim,
                           _usd.time_arg(time))


register(_UsdGeom.Camera, Camera)


class Points(Imageable):
    __slots__ = ()
    _jsclass = _UsdGeom.Points
    _schemaName = 'Points'

    @staticmethod
    def Get(stage, path):
        return Points(stage.GetPrimAtPath(path))

    def GetPointCount(self, timeCode=None):
        # UsdGeomPointBased::GetPointCount (pointBased.h): a coding error on
        # an invalid schema object, as every Get<Name>Attr is.
        self._require_valid()
        return call_method(_UsdGeom.Points, 'getPointCount', self._js.prim,
                           _usd.time_arg(timeCode))


register(_UsdGeom.Points, Points)


class ModelAPI(SchemaBase):
    __slots__ = ()
    _jsclass = _UsdGeom.ModelAPI
    _schemaName = 'GeomModelAPI'


register(_UsdGeom.ModelAPI, ModelAPI)


# ---- BBoxCache (wrapBBoxCache.cpp) -------------------------------------------

class BBoxCache(Wrapped):
    __slots__ = ()

    def __init__(self, time, includedPurposes, useExtentsHint=False,
                 ignoreVisibility=False):
        self._js = construct(_UsdGeom.BBoxCache, _time(time),
                             to_js([str(p) for p in includedPurposes]),
                             bool(useExtentsHint), bool(ignoreVisibility))


register(_UsdGeom.BBoxCache, BBoxCache)

# ---- XformCommonAPI (wrapXformCommonAPI.cpp) ---------------------------------

def _vec3(value):
    """A GfVec3 argument as the core's [x, y, z] (gf/src/rotation.ts Vec3)."""
    return to_js([float(x) for x in value])


# xformCommonAPI.h:113-121 RotationOrder and 128-136 OpFlags.
_ROTATION_ORDERS = ['XYZ', 'XZY', 'YXZ', 'YZX', 'ZXY', 'ZYX']
_OP_FLAGS = [('OpNone', 0), ('OpTranslate', 1), ('OpPivot', 2), ('OpRotate', 4),
             ('OpScale', 8)]


def _time(time):
    # A UsdTimeCode argument (default: UsdTimeCode::Default()) as the core's.
    return None if time is None else _usd.time_value(time)


def _rotation_order(order):
    """A RotationOrder argument as the core's ('XYZ', ...)."""
    if isinstance(order, int) and 0 <= int(order) < len(_ROTATION_ORDERS):
        return _ROTATION_ORDERS[int(order)]
    raise _bridge._error_exception_class('Invalid rotation order <%r>.' % (order,))


def _rotation_order_enum(core):
    return getattr(XformCommonAPI, 'RotationOrder' + str(core))


class XformCommonAPI(SchemaBase):
    """UsdGeomXformCommonAPI. Vectors are Gf vectors in Python and
    [x, y, z] arrays in the core; RotationOrder is an enum here and the
    order's name ('XYZ') in the core."""
    __slots__ = ()
    _jsclass = _UsdGeom.XformCommonAPI
    _schemaName = 'XformCommonAPI'

    for _i, _n in enumerate(_ROTATION_ORDERS):
        locals()['RotationOrder' + _n] = _Enum(_i, 'RotationOrder' + _n, 'UsdGeom.XformCommonAPI')
    for _n, _v in _OP_FLAGS:
        locals()[_n] = _Enum(_v, _n, 'UsdGeom.XformCommonAPI')
    del _i, _n, _v

    def __bool__(self):
        # operator bool: _IsCompatible (xformCommonAPI.cpp:141-154).
        return self._js_prim() is not None and bool(call_method(self._js, 'isValid'))

    def __repr__(self):
        return 'UsdGeom.XformCommonAPI(%r)' % (self.GetPrim(),)

    def SetXformVectors(self, translation, rotation, scale, pivot, rotationOrder, time):
        return bool(call_method(self._js, 'setXformVectors', _vec3(translation),
                                _vec3(rotation), _vec3(scale), _vec3(pivot),
                                _rotation_order(rotationOrder), _time(time)))

    def _vectors(self, method, time):
        from pxr import Gf
        result = call_method(self._js, method, _time(time))
        if not result:
            return ()
        t, r, s, p, order = list(result)
        return (Gf.Vec3d(*list(t)), Gf.Vec3f(*list(r)), Gf.Vec3f(*list(s)),
                Gf.Vec3f(*list(p)), _rotation_order_enum(order))

    def GetXformVectors(self, time):
        """(translation, rotation, scale, pivot, rotationOrder) at the time,
        or () when the prim's ops are not compatible."""
        return self._vectors('getXformVectors', time)

    def GetXformVectorsByAccumulation(self, time):
        return self._vectors('getXformVectorsByAccumulation', time)

    def SetTranslate(self, translation, time=None):
        return bool(call_method(self._js, 'setTranslate', _vec3(translation), _time(time)))

    def SetPivot(self, pivot, time=None):
        return bool(call_method(self._js, 'setPivot', _vec3(pivot), _time(time)))

    def SetRotate(self, rotation, rotationOrder=0, time=None):
        return bool(call_method(self._js, 'setRotate', _vec3(rotation),
                                _rotation_order(rotationOrder), _time(time)))

    def SetScale(self, scale, time=None):
        return bool(call_method(self._js, 'setScale', _vec3(scale), _time(time)))

    def GetResetXformStack(self):
        return bool(call_method(self._js, 'getResetXformStack'))

    def SetResetXformStack(self, resetXformStack):
        return bool(call_method(self._js, 'setResetXformStack', bool(resetXformStack)))

    def CreateXformOps(self, *args, **kwargs):
        """CreateXformOps(rotationOrder, op1..op4) or CreateXformOps(op1..op4):
        (translateOp, pivotOp, rotateOp, scaleOp, inversePivotOp)."""
        args = list(args)
        if 'rotationOrder' in kwargs:
            args.insert(0, kwargs.pop('rotationOrder'))
        args += [kwargs.pop('op%d' % i) for i in range(1, 5) if 'op%d' % i in kwargs]
        if kwargs:
            raise TypeError('CreateXformOps() got unexpected arguments %r' % list(kwargs))
        core = []
        for i, a in enumerate(args):
            if i == 0 and isinstance(a, _Enum) and a._name.startswith('RotationOrder'):
                core.append(_rotation_order(a))
            else:
                core.append(int(a))
        ops = call_method(self._js, 'createXformOps', *core)
        return tuple(XformOp._from_core(getattr(ops, n)) for n in
                     ('translateOp', 'pivotOp', 'rotateOp', 'scaleOp', 'inversePivotOp'))

    @staticmethod
    def GetRotationTransform(rotation, rotationOrder):
        return call_method(_UsdGeom.XformCommonAPI, 'getRotationTransform',
                           _vec3(rotation), _rotation_order(rotationOrder))

    @staticmethod
    def ConvertRotationOrderToOpType(rotationOrder):
        return _Enum(int(call_method(_UsdGeom.XformCommonAPI, 'convertRotationOrderToOpType',
                                     _rotation_order(rotationOrder))), '', 'UsdGeom.XformOp')._typed()

    @staticmethod
    def ConvertOpTypeToRotationOrder(opType):
        return _rotation_order_enum(call_method(_UsdGeom.XformCommonAPI,
                                                'convertOpTypeToRotationOrder', int(opType)))

    @staticmethod
    def CanConvertOpTypeToRotationOrder(opType):
        return bool(call_method(_UsdGeom.XformCommonAPI,
                                'canConvertOpTypeToRotationOrder', int(opType)))


register(_UsdGeom.XformCommonAPI, XformCommonAPI)


# ---- XformCache (wrapXformCache.cpp) -----------------------------------------

def _matrix4d(m):
    """The core's Matrix4 (16 numbers, row-major, gf/src/matrix.ts) as a
    Gf.Matrix4d."""
    from pxr import Gf
    return Gf.Matrix4d(*[float(x) for x in m])


class XformCache(Wrapped):
    """UsdGeomXformCache. Its transforms are Gf.Matrix4d here and the
    core's Matrix4 arrays there."""
    __slots__ = ()

    def __init__(self, time=None):
        t = _usd.time_arg(time)
        self._js = construct(_UsdGeom.XformCache) if t is None else construct(_UsdGeom.XformCache, t)

    def GetLocalToWorldTransform(self, prim):
        return _matrix4d(call_method(self._js, 'getLocalToWorldTransform', prim))

    def GetParentToWorldTransform(self, prim):
        return _matrix4d(call_method(self._js, 'getParentToWorldTransform', prim))

    def GetLocalTransformation(self, prim):
        """(transform, resetsXformStack), as wrapXformCache.cpp returns."""
        r = call_method(self._js, 'getLocalTransformation', prim)
        return (_matrix4d(r.matrix), bool(r.resetsXformStack))

    def ComputeRelativeTransform(self, prim, ancestor):
        """(transform, resetXformStack) of prim relative to ancestor."""
        r = call_method(self._js, 'computeRelativeTransform', prim, ancestor)
        return (_matrix4d(r.matrix), bool(r.resetXformStack))

    def GetTime(self):
        t = call_method(self._js, 'getTime')
        return _usd.TimeCode() if t is None else _usd.TimeCode(t)

    def SetTime(self, time):
        call_method(self._js, 'setTime', _usd.time_arg(time))

    def Clear(self):
        call_method(self._js, 'clear')

    def Swap(self, other):
        call_method(self._js, 'swap', other._js)

    def TransformMightBeTimeVarying(self, prim):
        return bool(call_method(self._js, 'transformMightBeTimeVarying', prim))

    def GetResetXformStack(self, prim):
        return bool(call_method(self._js, 'getResetXformStack', prim))


register(_UsdGeom.XformCache, XformCache)

forward_module(globals(), _UsdGeom, ('UsdGeom',))
`,"/pxr-python/pxr/UsdLux/_usdLux.py":`"""_usdLux: the forwarding module upstream's pxr/usd/usdLux/__init__.py
loads. Light schema classes forward through pxr._schema; everything else
mechanically."""
from pxr._bridge import register, forward_module, ts as _ts
from pxr.UsdGeom._usdGeom import Xformable

_UsdLux = _ts.UsdLux


class DomeLight(Xformable):
    __slots__ = ()
    _jsclass = _UsdLux.DomeLight
    _schemaName = 'DomeLight'


register(_UsdLux.DomeLight, DomeLight)

forward_module(globals(), _UsdLux, ('UsdLux',))
`,"/pxr-python/pxr/UsdMedia/_usdMedia.py":`"""_usdMedia: the forwarding module upstream's pxr/usd/usdMedia/__init__.py
loads. AssetPreviewsAPI (wrapAssetPreviewsAPI.cpp); everything else
forwards mechanically."""
from pxr._bridge import (Wrapped, register, construct, call_method, unwrap,
                         forward_module, ts as _ts)
from pxr._schema import SchemaBase

_UsdMedia = _ts.UsdMedia


class AssetPreviewsAPI(SchemaBase):
    __slots__ = ()
    _jsclass = _UsdMedia.AssetPreviewsAPI
    _schemaName = 'AssetPreviewsAPI'

    class Thumbnails(Wrapped):
        """UsdMediaAssetPreviewsAPI::Thumbnails (wrapAssetPreviewsAPI.cpp:
        init<SdfAssetPath>((arg("defaultImage")=SdfAssetPath())) and the
        defaultImage read/write member)."""
        __slots__ = ()

        def __init__(self, defaultImage=None):
            args = [unwrap(defaultImage)] if defaultImage is not None else []
            self._js = construct(_UsdMedia.AssetPreviewsAPI.Thumbnails, *args)

        @property
        def defaultImage(self):
            from pxr._bridge import wrap
            return wrap(self._js.defaultImage)

        @defaultImage.setter
        def defaultImage(self, value):
            self._js.defaultImage = unwrap(value)

    def GetDefaultThumbnails(self):
        r = call_method(self._js, 'getDefaultThumbnails')
        return r


register(_UsdMedia.AssetPreviewsAPI, AssetPreviewsAPI)
register(_UsdMedia.AssetPreviewsAPI.Thumbnails, AssetPreviewsAPI.Thumbnails)

forward_module(globals(), _UsdMedia, ('UsdMedia',))
`,"/pxr-python/pxr/UsdShade/_usdShade.py":`"""_usdShade: the forwarding module upstream's __init__.py for pxr.UsdShade loads.

Input and Output carry wrapInput.cpp / wrapOutput.cpp's ConnectToSource
overloads; the core's ShadeInput/ShadeOutput.connectToSource takes one
source (an input, an output, a ConnectionSourceInfo or a path). Everything
else forwards mechanically.
"""
from pxr._bridge import (Wrapped, register, call_method, construct, wrap,
                         forward_module, ts as _ts)
from pxr import _bridge
from pxr._schema import SchemaBase

_UsdShade = _ts.UsdShade


class _AttributeType(int):
    def __new__(cls, value, name):
        self = int.__new__(cls, value)
        self._name = name
        return self

    def __repr__(self):
        return 'UsdShade.AttributeType.' + self._name


class AttributeType(object):
    """UsdShadeAttributeType (types.h:22-26)."""
    Invalid = _AttributeType(0, 'Invalid')
    Input = _AttributeType(1, 'Input')
    Output = _AttributeType(2, 'Output')


_SOURCE_TYPES = {1: 'input', 2: 'output'}


def _source_args(args, kwargs):
    """ConnectToSource's arguments as the core's single source."""
    args = list(args)
    source = kwargs.pop('source', None)
    if source is None:
        for key in ('sourcePath', 'input', 'output'):
            if key in kwargs:
                source = kwargs.pop(key)
                break
    if source is None and args:
        source = args.pop(0)
    source_name = kwargs.pop('sourceName', args.pop(0) if args else None)
    kwargs.pop('mod', None)
    if source_name is None:
        if isinstance(source, Wrapped):
            return source._js
        return str(source)
    # ConnectToSource(source, sourceName, sourceType=Output, typeName=None):
    # a ConnectionSourceInfo over the source's ConnectableAPI.
    source_type = kwargs.pop('sourceType', args.pop(0) if args else AttributeType.Output)
    type_name = kwargs.pop('typeName', args.pop(0) if args else None)
    prim = source.GetPrim() if hasattr(source, 'GetPrim') else source
    api = construct(_UsdShade.ConnectableAPI, prim._js)
    return construct(_UsdShade.ConnectionSourceInfo, api, str(source_name),
                     _SOURCE_TYPES.get(int(source_type), 'invalid'),
                     str(type_name) if type_name else '')


class _Connectable(Wrapped):
    __slots__ = ()

    def ConnectToSource(self, *args, **kwargs):
        return bool(call_method(self._js, 'connectToSource', _source_args(args, kwargs)))

    def __bool__(self):
        attr = self._js.attr
        return attr is not None and bool(attr.isValid())


class Input(_Connectable):
    """UsdShadeInput (wrapInput.cpp)."""
    __slots__ = ()


class Output(_Connectable):
    """UsdShadeOutput (wrapOutput.cpp)."""
    __slots__ = ()


class MaterialBindingAPI(SchemaBase):
    """UsdShadeMaterialBindingAPI (wrapMaterialBindingAPI.cpp). The binding
    resolution is the core's static computeBoundMaterial(stage, path,
    purpose), which returns the winning material and binding paths."""
    __slots__ = ()
    _jsclass = _UsdShade.MaterialBindingAPI
    _schemaName = 'MaterialBindingAPI'

    def ComputeBoundMaterial(self, materialPurpose='', supportLegacyBindings=True):
        """(material, bindingRel): the resolved material, or an invalid
        Material and Relationship (wrapMaterialBindingAPI.cpp:128-136)."""
        prim = self.GetPrim()
        stage = prim.GetStage()
        found = call_method(_UsdShade.MaterialBindingAPI, 'computeBoundMaterial',
                            stage, str(prim.GetPath()), str(materialPurpose))
        Material = globals()['__getattr__']('Material')
        if found is None:
            # Upstream returns an invalid Material and Relationship; here the
            # relationship is None (also false).
            return (Material(), None)
        material = Material(stage.GetPrimAtPath(str(found.materialPath)))
        owner, name = str(found.bindingRelPath).rsplit('.', 1)
        return (material, call_method(stage.GetPrimAtPath(owner)._js, 'rel', name))

    @staticmethod
    def ComputeBoundMaterials(prims, materialPurpose='', supportLegacyBindings=True):
        found = [MaterialBindingAPI(p).ComputeBoundMaterial(materialPurpose) for p in prims]
        return ([m for m, _ in found], [r for _, r in found])


register(_UsdShade.ShadeInput, Input)
register(_UsdShade.ShadeOutput, Output)
register(_UsdShade.MaterialBindingAPI, MaterialBindingAPI)

forward_module(globals(), _UsdShade, ('UsdShade',))
`,"/pxr-python/pxr/UsdUI/_usdUI.py":`"""_usdUI: the forwarding module upstream's __init__.py for pxr.UsdUI loads.
Nothing is written by hand yet: every name forwards mechanically."""
from pxr._bridge import forward_module, ts as _ts

forward_module(globals(), _ts.UsdUI, ('UsdUI',))
`,"/pxr-python/pxr/UsdUtils/_usdUtils.py":`"""_usdUtils: the forwarding module upstream's pxr/usd/usdUtils/__init__.py
loads. Functions forward mechanically to typescript-usd/usdUtils's
UsdUtils<Name> exports (wrapAuthoring.cpp, wrapUsdzPackage.cpp,
wrapDependencies.cpp, ...); the few whose Python signature differs are
written by hand."""
from pxr._bridge import call_function, forward_module, ts as _ts

_UsdUtils = _ts.UsdUtils


# wrapAuthoring.cpp: (source, destination, skipSublayers=False,
# bakeUnauthoredFallbacks=False).
def CopyLayerMetadata(source, destination, skipSublayers=False,
                      bakeUnauthoredFallbacks=False):
    return call_function(_UsdUtils.UsdUtilsCopyLayerMetadata, source,
                         destination, bool(skipSublayers),
                         bool(bakeUnauthoredFallbacks))


# wrapUsdzPackage.cpp: (assetPath, usdzFilePath, firstLayerName='',
# editLayersInPlace=False). The core returns a Promise; it is awaited.
def CreateNewUsdzPackage(assetPath, usdzFilePath, firstLayerName='',
                         editLayersInPlace=False):
    return bool(call_function(_UsdUtils.UsdUtilsCreateNewUsdzPackage,
                              assetPath, str(usdzFilePath),
                              str(firstLayerName), bool(editLayersInPlace)))


forward_module(globals(), _UsdUtils, ('UsdUtils',))
`,"/pxr-python/pxr/Vt/_vt.py":`"""_vt: the forwarding module upstream's pxr/base/vt/__init__.py loads.

Only what upstream's pxr/usd/sdf/__init__.py imports so far.
"""


class TimeCodeArray(list):
    """Vt.TimeCodeArray (wrapArrayTimeCode.cpp); not yet forwarded."""


class TokenArray(list):
    """Vt.TokenArray (wrapArrayToken.cpp): token[] values are Python lists
    of str in this layer, so the array is a list of str."""

    def __init__(self, values=()):
        list.__init__(self, [str(v) for v in values])
`,"/pxr-python/pxr/__init__.py":`"""The pxr package over typescript-usd.

Upstream installs each library as lib/python/pxr/<Lib>/ holding the library's
own __init__.py (e.g. pxr/usd/sdf/__init__.py) beside its compiled module
_<lib>.so, built from the library's wrap*.cpp files.  Here the compiled
module is replaced by a forwarding module, python/pxr/<Lib>/_<lib>.py, over
typescript-usd's core (python/bridge.ts), and each library's __init__.py is
upstream's, read unchanged from the OpenUSD source tree: the finder below
imports pxr.<Lib> from <OpenUSD>/pxr/<area>/<lib>/__init__.py with
python/pxr/<Lib> as the package's search path, so its
\`Tf.PreparePythonModule()\` imports the forwarding module as \`._<lib>\`.
"""
import importlib.abc
import importlib.util
import os
import sys

import _tsusd

_HERE = os.path.dirname(os.path.abspath(__file__))
_SRC = os.path.join(_tsusd.openusdSrc, 'pxr')
_AREAS = ('base', 'usd', 'imaging', 'usdImaging', 'exec')


def _upstream_init(lib):
    name = lib[0].lower() + lib[1:]
    for area in _AREAS:
        init = os.path.join(_SRC, area, name, '__init__.py')
        if os.path.isfile(init):
            return init
    return None


class _UpstreamLibraryFinder(importlib.abc.MetaPathFinder):
    def find_spec(self, fullname, path=None, target=None):
        parts = fullname.split('.')
        if len(parts) != 2 or parts[0] != 'pxr':
            return None
        local = os.path.join(_HERE, parts[1])
        init = _upstream_init(parts[1])
        if init is None or not os.path.isdir(local):
            return None
        # The library's own Python submodules (e.g. usdUtils/usdzUtils.py)
        # are installed beside its __init__.py upstream: search there after
        # the forwarding module's directory.
        return importlib.util.spec_from_file_location(
            fullname, init,
            submodule_search_locations=[local, os.path.dirname(init)])


sys.meta_path.insert(0, _UpstreamLibraryFinder())
`,"/pxr-python/pxr/_bridge.py":`"""Forwarding machinery shared by the pxr modules.

Upstream, boost.python (pxr/external/boost/python) turns wrap*.cpp \`.def\`
declarations into Python classes over C++ objects.  Here every Python object
holds the typescript-usd core value it forwards to in \`_js\`, and calls go
through \`_tsusd\` (python/bridge.ts) under a TfErrorMark: errors posted by
the core become Tf.ErrorException, as TfPyConvertTfErrorsToPythonException
does (pxr/base/tf/pyError.cpp:31-60).
"""

import re
import js
import _tsusd as _ts
from pyodide.ffi import JsProxy, JsException, to_js, run_sync, jsnull

ts = _ts


# Tf.ErrorException, defined by upstream's pxr/base/tf/__init__.py and
# handed to the forwarding module through _tf.__SetErrorExceptionClass, as
# Tf_PySetErrorExceptionClass does (pxr/base/tf/pyErrorInternal.cpp).
_error_exception_class = RuntimeError


def set_error_exception_class(cls):
    global _error_exception_class
    _error_exception_class = cls


# ---- Naming -----------------------------------------------------------------

def camel_name(name):
    """The core's member name for an upstream one (scripts/rename/camelName.mjs,
    style-guide rule 1): lowercase first letter, leading acronym lowered."""
    m = re.match(r'^(_*)([A-Z]+)(.*)$', name, re.S)
    if not m:
        return name
    under, run, rest = m.groups()
    if len(run) == 1:
        return under + run.lower() + rest
    if re.match(r'^[a-z]', rest):
        if rest == 's' or re.match(r'^s[^a-z]', rest):
            return under + run.lower() + rest
        return under + run[:-1].lower() + run[-1] + rest
    return under + run.lower() + rest


# ---- Values across the boundary ---------------------------------------------

# Core constructor -> Python wrapper class, filled by register().
_classes = []


def register(js_class, py_class):
    _classes.append((js_class, py_class))
    py_class._jsclass = js_class
    return py_class


def _py_class_for(obj):
    ctor = _ts.ctorOf(obj)
    for js_class, py_class in _classes:
        if _ts.same(ctor, js_class):
            return py_class
    # A core schema class first met as a value (e.g. the ConnectableAPI a
    # method returns): its forwarding class, made as forward_module does.
    if _schema_class_factory is not None:
        try:
            made = _schema_class_factory(str(ctor.name), ctor, None)
        except Exception:
            made = None
        if made is not None:
            return made
    # A subclass of a registered class (e.g. a schema's prim): nearest base.
    for js_class, py_class in reversed(_classes):
        if _ts.isInstance(obj, js_class):
            return py_class
    return None


def wrap(value):
    """A core value as a Python value."""
    if value is jsnull:
        return None
    if not isinstance(value, JsProxy):
        return value
    kind = _ts.kindOf(value)
    if kind == 'array':
        return [wrap(v) for v in value]
    if kind == 'promise':
        return wrap(run_sync(value))
    if kind in ('object', 'iterable'):
        cls = _py_class_for(value)
        if cls is not None:
            return cls._from_js(value)
    if kind == 'iterable':
        # A core range or generator (e.g. SdfPath.getAncestorsRange):
        # upstream wraps these as Python iterables (TfPyIterator-style).
        return _Range(value)
    if kind == 'object':
        # An instance of a core class with no forwarding class: forward it
        # mechanically.
        return Opaque._from_js(value)
    return value


class _Range(object):
    """A core iterable (a range, a generator or a VtArray-like value) as a
    Python sequence: iterable, and for a value read once (e.g. an array
    attribute's value) also len(), indexing and == with any sequence, as
    upstream's VtArray wrappers compare (wrapArray.h)."""
    __slots__ = ('_js', '_items')

    def __init__(self, js):
        self._js = js
        self._items = None

    def _list(self):
        if self._items is None:
            self._items = [wrap(v) for v in _ts.arrayFrom(self._js)]
        return self._items

    def __iter__(self):
        if self._items is not None:
            return iter(self._items)
        return (wrap(v) for v in _ts.arrayFrom(self._js))

    def __len__(self):
        return len(self._list())

    def __getitem__(self, i):
        return self._list()[i]

    def __eq__(self, other):
        if isinstance(other, (list, tuple, _Range)):
            return self._list() == list(other)
        return NotImplemented

    def __ne__(self, other):
        r = self.__eq__(other)
        return r if r is NotImplemented else not r

    __hash__ = None

    def __repr__(self):
        return repr(self._list())


def unwrap(value):
    """A Python value as a core value."""
    # A value the core takes in another form (Sdf.ValueTypeName: the core's
    # public APIs take the type's name).
    as_core = getattr(type(value), '_as_core_argument', None)
    if as_core is not None:
        return as_core(value)
    js = getattr(value, '_js', None)
    if js is not None:
        return js
    if isinstance(value, (list, tuple)):
        return to_js([unwrap(v) for v in value])
    if isinstance(value, dict):
        return to_js({k: unwrap(v) for k, v in value.items()},
                     dict_converter=js.Object.fromEntries)
    return value


def _check(guarded):
    errors, value, thrown = guarded
    if errors is not None:
        raise _error_exception_class(*list(errors))
    return value


def call_method(obj, name, *args):
    return wrap(_check(_ts.callMethod(obj, name, *[unwrap(a) for a in args])))


def call_function(fn, *args):
    return wrap(_check(_ts.callFunction(fn, *[unwrap(a) for a in args])))


def construct(cls, *args):
    return _check(_ts.construct(cls, *[unwrap(a) for a in args]))


def get_property(obj, name):
    return wrap(_check(_ts.getProperty(obj, name)))


def has_member(obj, name):
    try:
        return _ts.kindOf(getattr(obj, name)) != 'undefined'
    except AttributeError:
        return False


# ---- Wrapped classes ---------------------------------------------------------

class _ForwardMeta(type):
    """Class-level forwarding: an upstream static method or constant
    \`Cls.Foo\` forwards to the core class's static \`foo\` (rule 1)."""

    def __getattr__(cls, name):
        if name.startswith('__') or name.startswith('_js'):
            raise AttributeError(name)
        js_class = cls.__dict__.get('_jsclass') or getattr(cls, '_jsclass', None)
        if js_class is not None:
            for core in (camel_name(name), name):
                if has_member(js_class, core):
                    member = getattr(js_class, core)
                    if _ts.kindOf(member) == 'function' and not _is_class(member):
                        return _StaticForward(cls, js_class, core)
                    return get_property(js_class, core)
        raise AttributeError("type object '%s' has no attribute '%s'"
                             % (cls.__name__, name))


def _is_class(fn):
    try:
        return _ts.kindOf(fn) == 'function' and str(fn.toString()).startswith('class')
    except Exception:
        return False


class Wrapped(object, metaclass=_ForwardMeta):
    """Base of every forwarding class.

    Unknown attribute names are forwarded mechanically: an upstream method
    name \`Foo\` calls the core's \`foo\` (rule 1), falling back to \`Foo\`.  Names
    listed in \`_properties\` are Python properties (wrap*.cpp add_property /
    add_static_property): the core member is read, and called if it is a
    zero-argument method.  Arguments pass through \`_convert_arg\`.
    """
    __slots__ = ('_js',)
    _properties = {}

    def __init__(self, *args):
        # A class with no hand-written constructor forwards to \`new\`.
        self._js = construct(type(self)._jsclass,
                             *[type(self)._convert_arg(a) for a in args])

    @classmethod
    def _from_js(cls, js):
        self = cls.__new__(cls)
        self._js = js
        return self

    @staticmethod
    def _convert_arg(a):
        return a

    def __getattr__(self, name):
        if name.startswith('__'):
            raise AttributeError(name)
        js = object.__getattribute__(self, '_js')
        cls = type(self)
        props = cls._properties
        if name in props:
            core = props[name] or camel_name(name)
            if _ts.kindOf(getattr(js, core)) == 'function':
                return call_method(js, core)
            return get_property(js, core)
        for core in (camel_name(name), name):
            if has_member(js, core):
                if _ts.kindOf(getattr(js, core)) == 'function':
                    return _BoundForward(js, core, cls._convert_arg)
                return get_property(js, core)
        raise AttributeError("'%s' object has no attribute '%s'"
                             % (cls.__name__, name))

    # Identity of the forwarded object, unless a class says otherwise.
    def __eq__(self, other):
        if not isinstance(other, Wrapped):
            return NotImplemented
        return _ts.same(self._js, other._js)

    def __ne__(self, other):
        r = self.__eq__(other)
        return r if r is NotImplemented else not r

    def __hash__(self):
        return _ts.objectId(self._js)

    def __bool__(self):
        js = object.__getattribute__(self, '_js')
        if has_member(js, 'isValid'):
            return bool(call_method(js, 'isValid'))
        return True


    # Core objects with a scoped lifetime (UsdEditContext, SdfChangeBlock,
    # TfErrorMark: [Symbol.dispose]) are Python context managers, as their
    # upstream wrappers are (e.g. wrapEditContext.cpp).
    def __enter__(self):
        return self

    def __exit__(self, *exc):
        js = object.__getattribute__(self, '_js')
        for name in ('close', 'dispose'):
            if has_member(js, name):
                call_method(js, name)
                break
        return False


class Opaque(Wrapped):
    """Any core object without a hand-written forwarding class."""
    __slots__ = ()


# Set by pxr._schema: builds the forwarding class of a core schema class
# (Get/Create<Name>Attr, Define, Get, Apply), or returns None for others.
_schema_class_factory = None


def auto_class(name, js_class, base=Wrapped, properties=None, module=None):
    """A forwarding class with no hand-written members: everything goes
    through the mechanical rules."""
    ns = {'__slots__': ()}
    if properties:
        ns['_properties'] = dict(properties)
    if module:
        ns['__module__'] = module
    cls = type(name, (base,), ns)
    register(js_class, cls)
    return cls


class _StaticForward(object):
    __slots__ = ('_cls', '_js', '_name')

    def __init__(self, cls, js, name):
        self._cls = cls
        self._js = js
        self._name = name

    def __call__(self, *args):
        return call_method(self._js, self._name,
                           *[self._cls._convert_arg(a) for a in args])


class _BoundForward(object):
    __slots__ = ('_obj', '_name', '_convert')

    def __init__(self, obj, name, convert=None):
        self._obj = obj
        self._name = name
        self._convert = convert or (lambda a: a)

    def __call__(self, *args):
        return call_method(self._obj, self._name,
                           *[self._convert(a) for a in args])


def is_real(x):
    return isinstance(x, (int, float)) and not isinstance(x, bool)


def define_operators(cls, table):
    """Python operator slots from boost.python \`.def(self OP T)\` overloads:
    each slot tries its overloads in declaration order and returns
    NotImplemented when none accepts the operand, so Python raises the
    TypeError upstream's tests expect."""
    def make(overloads):
        def slot(self, *args):
            for accepts, fn in overloads:
                if accepts(*args):
                    return fn(self, *args)
            return NotImplemented
        return slot
    for dunder, overloads in table.items():
        setattr(cls, dunder, make(overloads))


def comparisons(cls, accepts, compare):
    """==, !=, <, <=, >, >= from one three-way compare (the boost.python
    \`self OP self\` / \`self OP double()\` families)."""
    ops = {
        '__eq__': lambda c: c == 0, '__ne__': lambda c: c != 0,
        '__lt__': lambda c: c < 0, '__le__': lambda c: c <= 0,
        '__gt__': lambda c: c > 0, '__ge__': lambda c: c >= 0,
    }
    def make(test):
        return lambda self, other: test(compare(self, other))
    define_operators(cls, {k: [(accepts, make(t))] for k, t in ops.items()})


# ---- Signatures --------------------------------------------------------------

REQUIRED = object()


def bind(name, params, args, kwargs):
    """Python argument binding for one boost.python overload: \`params\` are
    (name, default) pairs from the .def's arg(...) list (REQUIRED when it has
    no default). Raises TypeError, as Boost.Python.ArgumentError does."""
    if len(args) > len(params):
        raise TypeError('%s() takes at most %d arguments (%d given)'
                        % (name, len(params), len(args)))
    values = list(args)
    for pname, default in params[len(args):]:
        if pname in kwargs:
            values.append(kwargs.pop(pname))
        elif default is REQUIRED:
            raise TypeError('%s() missing argument %r' % (name, pname))
        else:
            values.append(default)
    if kwargs:
        raise TypeError('%s() got unexpected keyword arguments %s'
                        % (name, ', '.join(kwargs)))
    return values


class AnnotatedBoolResult(object):
    """TfPyAnnotatedBoolResult (pxr/base/tf/pyAnnotatedBoolResult.h): a bool
    carrying an annotation, also unpackable as (value, annotation)."""
    __slots__ = ('_value', '_annotation', '_name')

    def __init__(self, value, annotation, name):
        self._value = bool(value)
        self._annotation = annotation
        self._name = name

    def __bool__(self):
        return self._value

    def __eq__(self, other):
        return self._value == other

    def __ne__(self, other):
        return self._value != other

    def __hash__(self):
        return hash(self._value)

    def __getitem__(self, i):
        return (self._value, self._annotation)[i]

    def __getattr__(self, name):
        if name == object.__getattribute__(self, '_name'):
            return object.__getattribute__(self, '_annotation')
        raise AttributeError(name)

    def __repr__(self):
        return '(%r, %r)' % (self._value, self._annotation)


# ---- Module-level forwarding --------------------------------------------------

def forward_module(namespace, js_module, prefixes=()):
    """Give a forwarding module a PEP 562 __getattr__ (PrepareModule copies
    it into the library's package, pxr/base/tf/__init__.py): an upstream
    name \`Foo\` not written by hand forwards to the core module's \`Foo\`,
    \`<prefix>Foo\` (e.g. UsdUtilsCopyLayerMetadata) or rule-1 \`foo\`. Classes
    become mechanical forwarding classes; functions are called under a
    TfErrorMark with their arguments unwrapped."""
    module_name = namespace.get('__name__')

    def __getattr__(name):
        if name.startswith('__'):
            raise AttributeError(name)
        for core in [name] + [p + name for p in prefixes] + [camel_name(name)]:
            if not has_member(js_module, core):
                continue
            member = getattr(js_module, core)
            if _ts.kindOf(member) == 'function':
                if _is_class(member):
                    for js_class, py_class in _classes:
                        if _ts.same(js_class, member):
                            value = py_class
                            break
                    else:
                        value = None
                        if _schema_class_factory is not None:
                            value = _schema_class_factory(name, member, module_name)
                        if value is None:
                            value = auto_class(name, member, module=module_name)
                else:
                    def value(*args, _fn=member):
                        return call_function(_fn, *args)
                    value.__name__ = name
            else:
                value = wrap(member)
            namespace[name] = value
            return value
        raise AttributeError("module %r has no attribute %r" % (module_name, name))

    namespace['__getattr__'] = __getattr__
`,"/pxr-python/pxr/_schema.py":`"""Forwarding for USD schema classes (UsdSchemaBase and the generated
schema classes of every domain library).

Upstream, usdGenSchema writes each schema's Get<Name>Attr/Create<Name>Attr
pair from schema.usda (e.g. pxr/usd/usdGeom/camera.cpp:216-232) and the
wrap<Schema>.cpp that exposes them. Here those methods are derived from the
schema's prim definition in typescript-usd's UsdSchemaRegistry, with the
names usdGenSchema gives them: the property name without an \`inputs:\`
prefix (UsdLux's convention), each \`:\`-separated part capitalized
(\`model:drawMode\` -> ModelDrawMode, \`inputs:texture:file\` -> TextureFile).
"""
import re

from pxr._bridge import (Wrapped, register, call_method, construct, wrap,
                         unwrap, ts as _ts)
from pxr import _bridge

_registry = _ts.UsdSchemaRegistry


def _accessor_name(prop):
    if prop.startswith('inputs:'):
        prop = prop[len('inputs:'):]
    return ''.join(p[:1].upper() + p[1:] for p in prop.split(':'))


_definitions = {}


def _properties_of(schema_name):
    """{AccessorName: propertyName} for the schema's attributes."""
    props = _definitions.get(schema_name)
    if props is None:
        reg = _registry.getInstance()
        prim_def = reg.findConcretePrimDefinition(schema_name)
        if not prim_def:
            prim_def = reg.findAppliedAPIPrimDefinition(schema_name)
        if not prim_def:
            prim_def = reg.findAbstractPrimDefinition(schema_name)
        props = {}
        if prim_def:
            for name in prim_def.getPropertyNames():
                attr_def = prim_def.getAttributeDefinition(name)
                if attr_def and attr_def.isValid():
                    props[_accessor_name(name)] = (
                        name, attr_def.getTypeNameToken(),
                        attr_def.getVariability())
        _definitions[schema_name] = props
    return props


class SchemaBase(Wrapped):
    """UsdSchemaBase (wrapSchemaBase.cpp) and the generated members of its
    subclasses. \`_jsclass\` is the core schema class; \`_schemaName\` its
    registered type name (the class name in schema.usda)."""
    __slots__ = ()
    _schemaName = None

    def __init__(self, prim=None):
        from pxr.Usd import _usd
        if isinstance(prim, SchemaBase):
            prim = prim.GetPrim()
        js_prim = prim._js if isinstance(prim, _usd.Prim) else None
        stage = js_prim.getStage() if js_prim is not None else None
        self._js = construct(type(self)._jsclass, js_prim, stage)

    # The core's schema classes hold their prim as \`prim\` (SchemaBase) or
    # \`_prim\` (classes not yet on SchemaBase).
    def _js_prim(self):
        js = self._js
        for name in ('prim', '_prim'):
            p = getattr(js, name, None)
            if p is not None:
                return p
        return None

    def GetPrim(self):
        from pxr.Usd import _usd
        return _usd.prim_result(wrap(self._js_prim()))

    def GetPath(self):
        return self.GetPrim().GetPath()

    def __bool__(self):
        p = self._js_prim()
        if p is None:
            return False
        if _bridge.has_member(self._js, 'isValid'):
            return bool(call_method(self._js, 'isValid'))
        return bool(call_method(p, 'isValid'))

    def _require_valid(self):
        if not self:
            raise _bridge._error_exception_class(
                'Invalid %s schema object' % type(self).__name__)

    def _require_prim(self):
        # The generated Get/Create<Name>Attr act on GetPrim() alone
        # (schemaBase.cpp:75-104): an applied API schema constructed on a
        # prim that does not have it applied (_IsCompatible false,
        # apiSchemaBase.cpp:115-135) still reads and authors attributes.
        p = self._js_prim()
        if p is None or not call_method(p, 'isValid'):
            raise _bridge._error_exception_class(
                'Invalid %s schema object' % type(self).__name__)

    # ---- Define / Get / Apply (generated static methods) ----

    @classmethod
    def Get(cls, stage, path):
        return cls(stage.GetPrimAtPath(path))

    @classmethod
    def Define(cls, stage, path):
        # UsdSchemaBase-derived Define (e.g. camera.cpp:46-58):
        # stage->DefinePrim(path, typeName).
        return cls(stage.DefinePrim(path, cls._schemaName))

    @classmethod
    def Apply(cls, prim):
        # Single-apply API Apply (e.g. modelAPI.cpp:77-84):
        # prim.ApplyAPI<Schema>(); the core's prim.addAppliedSchema.
        if _bridge.has_member(cls._jsclass, 'apply') and not _ts.same(
                cls._jsclass.apply, _ts.functionApply):
            return wrap(call_method(cls._jsclass, 'apply', prim._js))
        call_method(prim._js, 'addAppliedSchema', cls._schemaName)
        return cls(prim)

    @classmethod
    def CanApply(cls, prim):
        return bool(call_method(cls._jsclass, 'canApply', prim._js))

    # ---- Get<Name>Attr / Create<Name>Attr ----

    def __getattr__(self, name):
        m = re.match(r'^(Get|Create)(\\w+)Attr$', name)
        if m and not name.startswith('__'):
            props = _properties_of(type(self)._schemaName)
            spec = props.get(m.group(2))
            if spec is not None:
                if m.group(1) == 'Get':
                    return lambda: self._get_attr(spec[0])
                return lambda defaultValue=None, writeSparsely=False: \\
                    self._create_attr(spec, defaultValue, writeSparsely)
        return Wrapped.__getattr__(self, name)

    def _get_attr(self, prop):
        self._require_prim()
        return wrap(call_method(self._js_prim(), 'attr', prop))

    def _create_attr(self, spec, default, sparse):
        # UsdSchemaBase::_CreateAttr (schemaBase.cpp:75-104).
        self._require_prim()
        name, type_name, variability = spec
        value = unwrap(default) if default is not None else None
        if _bridge.has_member(self._js, '_createAttr'):
            return call_method(self._js, '_createAttr', name, type_name,
                               False, variability, value, bool(sparse))
        attr = call_method(self._js_prim(), 'createAttribute', name,
                           type_name, False, variability)
        if default is not None:
            attr.Set(default)
        return attr


def _registered_class(js_class):
    for js, py in _bridge._classes:
        if _ts.same(js, js_class):
            return py
    return None


def schema_class(name, js_class, module=None):
    """The forwarding class of a core schema class with no hand-written
    Python class (e.g. UsdGeom.Sphere, UsdGeom.Mesh, UsdLux.SphereLight):
    a SchemaBase subclass whose base is the forwarding class of the core
    class it extends, as wrap<Schema>.cpp's class_<Schema, bases<Base>>.
    None when js_class is not a schema class."""
    schema_name = _ts.schemaTypeName(js_class)
    if schema_name is None:
        return None
    base = None
    parent = _ts.superclassOf(js_class)
    while base is None and _ts.schemaTypeName(parent) is not None:
        base = _registered_class(parent)
        if base is None:
            base = schema_class(str(parent.name).lstrip('_'), parent, module)
        parent = _ts.superclassOf(parent)
    ns = {'__slots__': (), '_schemaName': str(schema_name)}
    if module:
        ns['__module__'] = module
    cls = type(name, (base or SchemaBase,), ns)
    register(js_class, cls)
    return cls


_bridge._schema_class_factory = schema_class
`,"/pxr-python/examples/generate_cards_api.py":`#!/usr/bin/env python3
"""API-only variant of usd-cards-generator's src/generate_cards.py (with its
camera/ and utils/ modules folded in, function by function).

Same card definitions, camera placement, aperture and clipping math, ModelAPI
card authoring and usdz wrapper as the original, but through USD APIs only:

- no subprocess: usdrecord is not run (no card image is rendered; the six
  camera prims are the output) and usdzip is replaced by
  UsdUtils.CreateNewUsdzPackage;
- no temporary files: the camera stage (cameras.usda in the original) and
  the usdz wrapper stage are built in memory.

The outputs are exported into --output-dir (without it, main() returns the
in-memory stages and nothing is written):
  cameras.usda           the camera stage (six cameras, sublayering the subject)
  <name>.usda            the subject root layer with the cards applied
                         (or <name>_Cards.usda, the wrapper, for a usdz input)
  <name>_Cards.usdz      with --create-usdz-result
"""

from pxr import Usd, UsdGeom, UsdLux, UsdUtils, Sdf, Gf
from collections import namedtuple
import argparse
import math
import os
import posixpath

# camera/globals.py
FOCAL_LENGTH = 50
APERTURE = 24
FOCUS_DISTANCE = 168.60936

Card = namedtuple('Card', ['name', 'horizontalIndex', 'verticalIndex', 'sign', 'rotations', 'translationIndex', 'parentPath'])
Rotation = namedtuple('Rotation', ['index', 'amount'])
BoundingBox = namedtuple('BoundingBox', ['width', 'height'])

cards = [
    Card('XPos', 2, 1, 1, [Rotation(0, 90), Rotation(1, 90)], 0, None),
    Card('XNeg', 2, 1, -1, [Rotation(0, 90), Rotation(1, 270)], 0, None),
    Card('YPos', 2, 0, 1, [Rotation(1, 180), Rotation(0, 270)], 1, None),
    Card('YNeg', 2, 0, -1, [Rotation(0, 90)], 1, None),
    Card('ZPos', 0, 1, 1, [], 2, None),
    Card('ZNeg', 0, 1, -1, [Rotation(2, 180), Rotation(1, 180)], 2, None)
]

CARDS_LAYER_SUFFIX_USDA = "_Cards.usda"
CARDS_LAYER_SUFFIX = "_Cards"
CARDS_FOLDER_NAME = "cards"
CAMERAS_FILENAME = "cameras.usda"
RENDER_PURPOSE_MAP = {
    "default": UsdGeom.Tokens.default_,
    "render": UsdGeom.Tokens.render,
    "proxy": UsdGeom.Tokens.proxy,
    "guide": UsdGeom.Tokens.guide
}


# ---- utils/arg_parser.py ----------------------------------------------------

def parse_args(argv=None):
    parser = argparse.ArgumentParser(description="API-only cards generator: builds the six card cameras and applies the cards without rendering.")
    parser.add_argument('usd_file', type=str,
                        help='The USD file you want to add cards to. If USDZ is input, a wrapper layer <name>_Cards.usda is created.')
    parser.add_argument('--output-dir', type=str,
                        help='Where the generated layers (and usdz) are exported. Without it nothing is written: main() returns the stages.')
    parser.add_argument('--dome-light', type=str,
                        help='The path to the dome light HDR image to use, if any')
    parser.add_argument('--create-usdz-result', action='store_true',
                        help='Packages the result as <name>_Cards.usdz with UsdUtils.CreateNewUsdzPackage')
    parser.add_argument('--output-extension', type=str, default='png',
                        help='The extension of the card image paths authored.')
    parser.add_argument('--verbose', action='store_true',
                        help='Prints out the steps as they happen')
    parser.add_argument('--apply-cards', action='store_true',
                        help='Authors the image paths as the cards of the given USD file.')
    parser.add_argument('--render-purposes', type=str, default='default',
                        help='A comma separated list of render purposes to include in the bounds. Valid values are: default, render, proxy, guide.')
    parser.add_argument('--image-width', type=int, default=2048,
                        help='The width of the images that would be generated. Default is 2048.')
    args = parser.parse_args(argv)
    args.is_usdz = ".usdz" in args.usd_file
    return args


# ---- camera/utils/distanceCalculator.py -------------------------------------

def get_distance_to_frame_subject(bounding_box, aperture, focal_length):
    distance_to_capture_horizontal = calculate_field_of_view_distance(aperture, bounding_box.width, focal_length)
    distance_to_capture_vertical = calculate_field_of_view_distance(aperture, bounding_box.height, focal_length)

    return max(distance_to_capture_horizontal, distance_to_capture_vertical)


def calculate_field_of_view_distance(sensor_size, object_size, focal_length):
    return calculate_camera_distance(object_size, calculate_field_of_view(sensor_size, focal_length))


def calculate_field_of_view(sensor_size, focal_length):
    # Focal length and sensor size should be in the same units (e.g., mm)
    field_of_view = 2 * math.atan(sensor_size / (2 * focal_length))
    return field_of_view


def calculate_camera_distance(subject_size, field_of_view):
    # Subject size and field of view should be in the same units (e.g., mm and degrees)
    distance = (subject_size / 2) / math.tan(field_of_view / 2)
    return distance


# ---- camera/cameraGenerator.py ----------------------------------------------

def create_camera_for_card(card, camera_stage, center_of_card_face, bounding_box, camera_view_axis_distance):
    camera_prim = create_camera_with_defaults(camera_stage, card.name)

    distance = get_distance_to_frame_subject(bounding_box, APERTURE, FOCAL_LENGTH)

    nearClip = distance / 10.0
    farClip = (( distance + camera_view_axis_distance ) / 10.0) * 2
    clippingPlanes = Gf.Vec2f(nearClip, farClip)
    camera_prim.GetClippingRangeAttr().Set(clippingPlanes)

    position_camera(camera_prim, card, center_of_card_face, distance)

    calculate_apertures(camera_prim, bounding_box, distance, card)

    rotate_camera(card, camera_prim)


def create_camera_with_defaults(camera_stage, name):
    camera_prim = UsdGeom.Camera.Define(camera_stage, '/CardGenerator/' + name)
    camera_prim.CreateFocalLengthAttr(FOCAL_LENGTH)
    camera_prim.CreateFocusDistanceAttr(FOCUS_DISTANCE)
    camera_prim.CreateFStopAttr(0)
    camera_prim.CreateHorizontalApertureOffsetAttr(0)
    camera_prim.CreateProjectionAttr("perspective")
    camera_prim.CreateVerticalApertureOffsetAttr(0)

    return camera_prim


def position_camera(camera_prim, card, center_of_card_face, distance):
    camera_translation = create_camera_translation(card, center_of_card_face, distance)
    apply_camera_translation(camera_prim, camera_translation)


def create_camera_translation(card, center_of_card_face, distance):
    return center_of_card_face + create_translate_vector(distance * card.sign, card.translationIndex)


def calculate_apertures(camera_prim, bounding_box, distance, card):
    flip_aperatures = False
    for rotation in card.rotations:
        if rotation.amount != 180:
            flip_aperatures = True
            break

    actual_horizontal_aperture = FOCAL_LENGTH * bounding_box.width / distance
    actual_vertical_aperture = FOCAL_LENGTH * bounding_box.height / distance

    if flip_aperatures:
        camera_prim.CreateHorizontalApertureAttr(actual_vertical_aperture)
        camera_prim.CreateVerticalApertureAttr(actual_horizontal_aperture)
    else:
        camera_prim.CreateHorizontalApertureAttr(actual_horizontal_aperture)
        camera_prim.CreateVerticalApertureAttr(actual_vertical_aperture)


def rotate_camera(card, camera_prim):
    for rotation in card.rotations:
        apply_camera_rotation(camera_prim, rotation.index, rotation.amount)


def create_translate_vector(distance, translationIndex):
    vector = Gf.Vec3d(0, 0, 0)
    vector[translationIndex] = distance / 10.0 # convert units from mm to cm
    return vector


def apply_camera_translation(camera_prim, camera_translation):
    xformRoot = UsdGeom.Xformable(camera_prim.GetPrim())
    translateOp = xformRoot.AddTranslateOp(UsdGeom.XformOp.PrecisionDouble)
    translateOp.Set(camera_translation)


def apply_camera_rotation(camera_prim, rotationDirection, rotationAmount):
    xformRoot = UsdGeom.Xformable(camera_prim.GetPrim())
    if rotationDirection == 0:
        rotateOp = xformRoot.AddRotateXOp()
        rotateOp.Set(rotationAmount)
    elif rotationDirection == 1:
        rotateOp = xformRoot.AddRotateYOp()
        rotateOp.Set(rotationAmount)
    else:
        rotateOp = xformRoot.AddRotateZOp()
        rotateOp.Set(rotationAmount)


# ---- camera/cameraManager.py ------------------------------------------------

def setup_cameras(subject_stage, file_to_sublayer, cards, dome_light, render_purposes):
    camera_stage = create_camera_stage()
    create_cameras(camera_stage, subject_stage, cards, render_purposes)
    sublayer_subject(camera_stage, file_to_sublayer)

    if dome_light:
        add_domelight(camera_stage, dome_light)

    return camera_stage


def create_camera_stage():
    stage = Usd.Stage.CreateInMemory()
    stage.SetMetadata('metersPerUnit', 0.01)

    return stage


def create_cameras(camera_stage, subject_stage, cards, render_purposes):
    render_purpose_tokens = convert_render_purposes_to_tokens(render_purposes)
    stage_bounding_box = get_bounding_box(subject_stage, render_purpose_tokens)
    min_bound = stage_bounding_box.GetMin()
    max_bound = stage_bounding_box.GetMax()
    subject_center = (min_bound + max_bound) / 2.0

    for card in cards:
        card_width = (max_bound[card.horizontalIndex] - min_bound[card.horizontalIndex]) * 10
        card_height = (max_bound[card.verticalIndex] - min_bound[card.verticalIndex]) * 10
        card_bounding_box = BoundingBox(card_width, card_height)

        faceTranslationValue = max_bound[card.translationIndex] if card.sign > 0 else min_bound[card.translationIndex]
        center_of_card_face = Gf.Vec3d(subject_center[0], subject_center[1], subject_center[2])
        center_of_card_face[card.translationIndex] = faceTranslationValue

        camera_view_axis_distance = card_height = (max_bound[card.translationIndex] - min_bound[card.translationIndex])

        create_camera_for_card(card, camera_stage, center_of_card_face, card_bounding_box, camera_view_axis_distance)


def convert_render_purposes_to_tokens(render_purposes):
    return [RENDER_PURPOSE_MAP[key] for key in render_purposes.split(',')]


def get_bounding_box(subject_stage, render_purpose_tokens):
    bboxCache = UsdGeom.BBoxCache(Usd.TimeCode(0.0), render_purpose_tokens)
    root = subject_stage.GetPseudoRoot()
    return bboxCache.ComputeWorldBound(root).GetBox()


def sublayer_subject(camera_stage, input_file):
    camera_stage.GetRootLayer().subLayerPaths = [input_file]


def add_domelight(camera_stage, dome_light):
    UsdLux.DomeLight.Define(camera_stage, '/CardGenerator/DomeLight')
    domeLight = UsdLux.DomeLight(camera_stage.GetPrimAtPath('/CardGenerator/DomeLight'))
    domeLight.CreateTextureFileAttr().Set(dome_light)
    domeLight.CreateTextureFormatAttr().Set("latlong")


# ---- camera/renderManger.py (image names only: nothing is rendered) --------

def create_image_filename(card_name, extension, parent_path):
    folder = posixpath.join(parent_path, CARDS_FOLDER_NAME) if CARDS_FOLDER_NAME else parent_path
    return posixpath.join(folder, card_name + "." + extension)


def card_image_names(cards, output_extension):
    return [create_image_filename(card.name, output_extension, card.parentPath) for card in cards]


# ---- generate_cards.py ------------------------------------------------------

def generate_card_images(file_to_sublayer, usd_file, subject_stage, dome_light, output_extension, verbose, apply_cards, render_purposes):

    if apply_cards:
        if verbose:
            print("Step 1: Applying cards default values...")
        apply_cards_defaults(subject_stage, verbose)

    if verbose:
        print("Step 2: Setting up the cameras...")

    camera_stage = setup_cameras(subject_stage, file_to_sublayer, cards, dome_light, render_purposes)

    parent = posixpath.dirname(usd_file.replace("\\\\", "/"))
    for i, card in enumerate(cards):
        cards[i] = card._replace(parentPath=parent)

    return camera_stage, card_image_names(cards, output_extension)


def apply_cards_defaults(subject_stage, verbose):
    subject_root_prim = subject_stage.GetDefaultPrim()
    subject_root_prim.SetMetadata("kind", "component")
    UsdGeom.ModelAPI.Apply(subject_root_prim)
    geom_model_api = UsdGeom.ModelAPI(subject_root_prim)
    geom_model_api.CreateModelApplyDrawModeAttr(False)
    geom_model_api.CreateModelCardGeometryAttr("box")
    geom_model_api.CreateModelDrawModeAttr("cards")
    geom_model_api.CreateModelDrawModeColorAttr((1, 0, 0))


def link_images_to_subject(subject_stage, images):
    subject_root_prim = subject_stage.GetDefaultPrim()

    geom_model_api = UsdGeom.ModelAPI(subject_root_prim)
    geom_model_api.CreateModelCardTextureXPosAttr(images[0])
    geom_model_api.CreateModelCardTextureXNegAttr(images[1])
    geom_model_api.CreateModelCardTextureYPosAttr(images[2])
    geom_model_api.CreateModelCardTextureYNegAttr(images[3])
    geom_model_api.CreateModelCardTextureZPosAttr(images[4])
    geom_model_api.CreateModelCardTextureZNegAttr(images[5])
    geom_model_api.CreateModelApplyDrawModeAttr(True)


def create_usdz_wrapper_stage(usdz_file):
    existing_stage = Usd.Stage.Open(usdz_file)
    new_stage = Usd.Stage.CreateInMemory()

    UsdUtils.CopyLayerMetadata(existing_stage.GetRootLayer(), new_stage.GetRootLayer())

    new_stage.GetRootLayer().subLayerPaths = [existing_stage.GetRootLayer().identifier]

    return new_stage


def main(argv=None):
    args = parse_args(argv)
    stem = os.path.splitext(os.path.basename(args.usd_file))[0]
    outputs = {}

    subject_stage = create_usdz_wrapper_stage(args.usd_file) if args.is_usdz else Usd.Stage.Open(args.usd_file)
    file_to_sublayer = subject_stage.GetRootLayer().identifier

    camera_stage, images = generate_card_images(file_to_sublayer, args.usd_file, subject_stage, args.dome_light, args.output_extension, args.verbose, args.apply_cards, args.render_purposes)

    if args.apply_cards:
        if args.verbose:
            print("Step 4: Linking cards to subject...")
        parent = posixpath.dirname(args.usd_file.replace("\\\\", "/"))
        stripped_image_paths = [image.replace(parent, "").lstrip('/') for image in images]
        link_images_to_subject(subject_stage, stripped_image_paths)

    if args.output_dir:
        cameras_path = os.path.join(args.output_dir, CAMERAS_FILENAME)
        camera_stage.GetRootLayer().Export(cameras_path)
        outputs['camera'] = cameras_path

        subject_name = stem + (CARDS_LAYER_SUFFIX_USDA if args.is_usdz else ".usda")
        subject_path = os.path.join(args.output_dir, subject_name)
        subject_stage.GetRootLayer().Export(subject_path)
        outputs['subject'] = subject_path

        if args.create_usdz_result:
            if args.verbose:
                print("Step 5: Zipping cards as usdz...")
            usdz_path = os.path.join(args.output_dir, stem + CARDS_LAYER_SUFFIX + ".usdz")
            # False when a dependency is missing; the authored image paths
            # always are (nothing is rendered), so the package holds the layers
            # and whatever assets do exist.
            outputs['usdzComplete'] = bool(UsdUtils.CreateNewUsdzPackage(Sdf.AssetPath(subject_path), usdz_path))
            outputs['usdz'] = usdz_path

    outputs['cameraPaths'] = ['/CardGenerator/' + card.name for card in cards]
    outputs['images'] = images
    for key, value in outputs.items():
        print("%s: %s" % (key, value))
    if not args.output_dir:
        outputs['cameraStage'] = camera_stage
        outputs['subjectStage'] = subject_stage
    return outputs


if __name__ == "__main__":
    main()
`,"/pxr-python/examples/generate_thumbnail_api.py":`#!/usr/bin/env python3
"""API-only variant of usd-thumbnail-generator's generate_thumbnail.py.

Same camera framing, bounding-box math, layers and AssetPreviewsAPI
authoring as generate_thumbnail.py, but through USD APIs only:

- no subprocess: usdrecord is not run (no image is rendered) and usdzip is
  replaced by UsdUtils.CreateNewUsdzPackage;
- no temporary files: the camera stage and the usdz wrapper stage are built
  in memory (Usd.Stage.CreateInMemory) and the subject's edits stay in its
  in-memory root layer.

The outputs are the generated layers, exported into --output-dir (without
it, main() returns the in-memory stages and nothing is written):
  default_thumbnail.usda      the camera stage (MainCamera, sublayering the subject)
  <name>.usda                 the subject root layer with the thumbnail applied
                              (or <name>_Thumbnail.usda, the wrapper, for a usdz input)
  <name>_Thumbnail.usdz       with --create-usdz-result
The thumbnail image path authored is the one generate_thumbnail.py would
render to (thumbnails/<name>.<ext>); the image itself is not produced.
"""

from pxr import Usd, UsdGeom, UsdMedia, Sdf, Gf, UsdUtils, UsdLux
import math
import os
import argparse
import posixpath


def parse_args(argv=None):
    parser = argparse.ArgumentParser(description="API-only thumbnail generator: builds the thumbnail camera and applies the thumbnail without rendering.")
    parser.add_argument('--usd-file', type=str, required=True,
                        help='The USD file you want to add a thumbnail to. If USDZ is input, a wrapper layer <name>_Thumbnail.usda is created.')
    parser.add_argument('--output-dir', type=str,
                        help='Where the generated layers (and usdz) are exported. Without it nothing is written: main() returns the stages.')
    parser.add_argument('--dome-light', type=str,
                        help='The path to the dome light HDR image to use, if any')
    parser.add_argument('--create-usdz-result', action='store_true',
                        help='Packages the result as <name>_Thumbnail.usdz with UsdUtils.CreateNewUsdzPackage')
    parser.add_argument('--width', type=int, default=2048,
                        help='The width of the image that would be generated. Default is 2048.')
    parser.add_argument('--height', type=int,
                        help='The height of the image that would be generated. If not specified, the image is square.')
    parser.add_argument('--output-extension', type=str, default='png',
                        help='The extension of the thumbnail image path authored.')
    parser.add_argument('--verbose', action='store_true',
                        help='Prints out the steps as they happen')
    parser.add_argument('--apply-thumbnail', action='store_true',
                        help='Authors the image path as the thumbnail of the given USD file.')
    parser.add_argument('--render-purposes', type=str, default='default',
                        help='A comma separated list of render purposes to include in the bounds. Valid values are: default, render, proxy, guide.')
    parser.add_argument('--camera', type=str,
                        help='The path to an existing camera prim to use instead of generating one')
    return parser.parse_args(argv)


THUMBNAIL_LAYER_SUFFIX_USDA = "_Thumbnail.usda"
THUMBNAIL_LAYER_SUFFIX = "_Thumbnail"
DEFAULT_THUMBNAIL_FILENAME = "default_thumbnail.usda"
DEFAULT_CAMERA_NAME = 'MainCamera'
THUMBNAIL_FOLDER_NAME = "thumbnails"
RENDER_PURPOSE_MAP = {
    "default": UsdGeom.Tokens.default_,
    "render": UsdGeom.Tokens.render,
    "proxy": UsdGeom.Tokens.proxy,
    "guide": UsdGeom.Tokens.guide
}


def generate_thumbnail(args, usd_file, render_purpose_tokens):
    """Returns (camera_stage or None, camera path, image path)."""
    if args.verbose:
        print("Step 1: Setting up the camera...")

    subject_stage = Usd.Stage.Open(usd_file)

    camera_stage = None if args.camera else create_file_to_snapshot(args, subject_stage, render_purpose_tokens)
    image_path = create_image_filename(usd_file, args.output_extension)
    camera_to_snapshot_from = args.camera if args.camera else DEFAULT_CAMERA_NAME

    if args.verbose:
        print("Step 2: (not rendered) the snapshot would be " + image_path)

    return camera_stage, camera_to_snapshot_from, image_path


def create_file_to_snapshot(args, subject_stage, render_purpose_tokens):
    up_axis = UsdGeom.GetStageUpAxis(subject_stage)
    is_z_up = up_axis == 'Z'

    camera_stage = create_camera(args, up_axis)
    move_camera(args, camera_stage, subject_stage, render_purpose_tokens, is_z_up)

    if args.dome_light:
        add_domelight(args, camera_stage, is_z_up)

    sublayer_subject(camera_stage, subject_stage.GetRootLayer().identifier)
    set_camera_stage_draw_mode(camera_stage, subject_stage)

    return camera_stage


def create_camera(args, up_axis):
    stage = Usd.Stage.CreateInMemory()

    stage.SetDefaultPrim(stage.DefinePrim('/ThumbnailGenerator', 'Xform'))
    stage.SetMetadata('metersPerUnit', 0.01)
    UsdGeom.SetStageUpAxis(stage, up_axis)

    camera = UsdGeom.Camera.Define(stage, '/ThumbnailGenerator/MainCamera')

    camera.CreateFocusDistanceAttr(168.60936)
    camera.CreateFStopAttr(0)
    camera.CreateHorizontalApertureAttr(24)
    camera.CreateHorizontalApertureOffsetAttr(0)
    camera.CreateProjectionAttr("perspective")
    camera.CreateVerticalApertureAttr(24)
    camera.CreateVerticalApertureOffsetAttr(0)

    if args.height:
        camera.CreateHorizontalApertureAttr(24 * args.width / args.height)

    return stage


def set_camera_stage_draw_mode(camera_stage, subject_stage):
    defaultPrim_path = subject_stage.GetDefaultPrim().GetPath()
    subject_defaultPrim = camera_stage.GetPrimAtPath(defaultPrim_path)
    geom_model_api = UsdGeom.ModelAPI(subject_defaultPrim)
    geom_model_api.CreateModelDrawModeAttr(UsdGeom.Tokens.default_)


def move_camera(args, camera_stage, subject_stage, render_purpose_tokens, is_z_up):
    camera_prim = UsdGeom.Camera.Get(camera_stage, '/ThumbnailGenerator/MainCamera')
    camera_translation = create_camera_translation_and_clipping(args, subject_stage, camera_prim, render_purpose_tokens, is_z_up)
    apply_camera_transforms(camera_prim, camera_translation, is_z_up)


def add_domelight(args, camera_stage, is_z_up):
    UsdLux.DomeLight.Define(camera_stage, '/ThumbnailGenerator/DomeLight')
    domeLight = UsdLux.DomeLight(camera_stage.GetPrimAtPath('/ThumbnailGenerator/DomeLight'))
    domeLight.CreateTextureFileAttr().Set(args.dome_light)
    domeLight.CreateTextureFormatAttr().Set("latlong")

    if (is_z_up):
        xformRoot = UsdGeom.Xformable(domeLight.GetPrim())
        xformRoot.AddRotateXOp().Set(90)


def create_camera_translation_and_clipping(args, subject_stage, camera_prim, render_purpose_tokens, is_z_up):
    bounding_box = get_bounding_box(subject_stage, render_purpose_tokens)
    min_bound = bounding_box.GetMin()
    max_bound = bounding_box.GetMax()

    subject_center = (min_bound + max_bound) / 2.0

    center_of_thumbnail_face = Gf.Vec3d(subject_center[0], min_bound[1], subject_center[2]) if is_z_up else Gf.Vec3d(subject_center[0], subject_center[1], max_bound[2])

    # Conversion from mm to cm
    distance = get_distance_to_camera(min_bound, max_bound, camera_prim, is_z_up)
    distanceInCm = distance / 10.0

    cameraPosition = center_of_thumbnail_face + get_camera_translation(distanceInCm, is_z_up)

    clipIndex = 1 if is_z_up else 2

    # We're extending the clipping planes in both directions to accommodate for different fields of view
    nearClip = (distanceInCm + min_bound[clipIndex]) * 0.5
    farClip = (distanceInCm + max_bound[clipIndex]) * 2
    nearClip = max(nearClip, 0.0000001)
    clippingPlanes = Gf.Vec2f(nearClip, farClip)
    if args.verbose:
        print("Calculating clipping planes... " + str(clippingPlanes))
    camera_prim.GetClippingRangeAttr().Set(clippingPlanes)

    return cameraPosition


def get_bounding_box(subject_stage, render_purpose_tokens):
    bboxCache = UsdGeom.BBoxCache(Usd.TimeCode(0.0), render_purpose_tokens)
    # Compute the bounding box for all geometry under the root
    root = subject_stage.GetPseudoRoot()
    return bboxCache.ComputeWorldBound(root).GetBox()


def get_distance_to_camera(min_bound, max_bound, camera_prim, is_z_up):
    focal_length = camera_prim.GetFocalLengthAttr().Get()
    horizontal_aperture = camera_prim.GetHorizontalApertureAttr().Get()
    vertical_aperture = camera_prim.GetVerticalApertureAttr().Get()

    verticalIndex = 2 if is_z_up else 1

    distance_to_capture_horizontal = calculate_field_of_view_distance(horizontal_aperture, (max_bound[0] - min_bound[0]) * 10, focal_length)
    distance_to_capture_vertical = calculate_field_of_view_distance(vertical_aperture, (max_bound[verticalIndex] - min_bound[verticalIndex]) * 10, focal_length)

    return max(distance_to_capture_horizontal, distance_to_capture_vertical)


def calculate_field_of_view_distance(sensor_size, object_size, focal_length):
    return calculate_camera_distance(object_size, calculate_field_of_view(focal_length, sensor_size))


def calculate_field_of_view(focal_length, sensor_size):
    # Focal length and sensor size should be in the same units (e.g., mm)
    field_of_view = 2 * math.atan(sensor_size / (2 * focal_length))
    return field_of_view


def calculate_camera_distance(subject_size, field_of_view):
    # Subject size and field of view should be in the same units (e.g., mm and degrees)
    distance = (subject_size / 2) / math.tan(field_of_view / 2)
    return distance


def get_camera_translation(distance, is_z_up):
    return Gf.Vec3d(0, -distance, 0) if is_z_up else Gf.Vec3d(0, 0, distance)


def apply_camera_transforms(camera_prim, camera_translation, is_z_up):
    xformRoot = UsdGeom.Xformable(camera_prim.GetPrim())
    translateOp = None
    # Go through each operation in the xformable schema
    for op in xformRoot.GetOrderedXformOps():
        # If the operation is a translate operation, we've found our operation
        if op.GetOpType() == UsdGeom.XformOp.TypeTranslate:
            translateOp = op
            break

    # If no translate operation exists, create one
    if translateOp is None:
        translateOp = xformRoot.AddTranslateOp(UsdGeom.XformOp.PrecisionDouble)

    if (is_z_up):
        xformRoot.AddRotateXOp().Set(90)

    translateOp.Set(camera_translation)


def sublayer_subject(camera_stage, input_file):
    camera_stage.GetRootLayer().subLayerPaths = [input_file]
    return camera_stage


def create_image_filename(input_path, extension):
    # The path generate_thumbnail.py renders to (thumbnails/<name>.<ext>
    # beside the input), computed as a string: no directory is created.
    parent, name = posixpath.split(input_path.replace("\\\\", "/"))
    stem = posixpath.splitext(name)[0]
    folder = posixpath.join(parent, THUMBNAIL_FOLDER_NAME) if THUMBNAIL_FOLDER_NAME else parent
    return posixpath.join(folder, stem + "." + extension)


def link_image_to_subject(subject_stage, image_name):
    subject_root_prim = subject_stage.GetDefaultPrim()
    mediaAPI = UsdMedia.AssetPreviewsAPI.Apply(subject_root_prim)
    thumbnails = UsdMedia.AssetPreviewsAPI.Thumbnails(defaultImage = Sdf.AssetPath(image_name))
    mediaAPI.SetDefaultThumbnails(thumbnails)


def create_usdz_wrapper_stage(usdz_file):
    existing_stage = Usd.Stage.Open(usdz_file)
    new_stage = Usd.Stage.CreateInMemory()

    UsdUtils.CopyLayerMetadata(existing_stage.GetRootLayer(), new_stage.GetRootLayer())

    new_stage.GetRootLayer().subLayerPaths = [existing_stage.GetRootLayer().identifier]
    return new_stage


def output_stem(usd_file):
    return os.path.splitext(os.path.basename(usd_file))[0]


def generate_single_thumbnail(args):
    usd_file = args.usd_file
    is_usdz = usd_file.endswith(".usdz")
    stem = output_stem(usd_file)
    outputs = {}

    purpose_tokens = [RENDER_PURPOSE_MAP[key] for key in args.render_purposes.split(',')]

    camera_stage, camera, image_name = generate_thumbnail(args, usd_file, purpose_tokens)
    if camera_stage is not None and args.output_dir:
        path = os.path.join(args.output_dir, DEFAULT_THUMBNAIL_FILENAME)
        camera_stage.GetRootLayer().Export(path)
        outputs['camera'] = path

    subject_stage = create_usdz_wrapper_stage(usd_file) if is_usdz and args.apply_thumbnail else Usd.Stage.Open(usd_file)

    if args.apply_thumbnail:
        if args.verbose:
            print("Step 3: Linking thumbnail to subject...")
        link_image_to_subject(subject_stage, image_name)

    if args.output_dir:
        subject_name = stem + (THUMBNAIL_LAYER_SUFFIX_USDA if is_usdz and args.apply_thumbnail else ".usda")
        subject_path = os.path.join(args.output_dir, subject_name)
        subject_stage.GetRootLayer().Export(subject_path)
        outputs['subject'] = subject_path

        if args.create_usdz_result:
            if args.verbose:
                print("Step 4: Creating usdz result...")
            usdz_path = os.path.join(args.output_dir, stem + THUMBNAIL_LAYER_SUFFIX + ".usdz")
            # False when a dependency is missing; the authored image paths
            # always are (nothing is rendered), so the package holds the layers
            # and whatever assets do exist.
            outputs['usdzComplete'] = bool(UsdUtils.CreateNewUsdzPackage(Sdf.AssetPath(subject_path), usdz_path))
            outputs['usdz'] = usdz_path

    outputs['cameraPath'] = '/ThumbnailGenerator/MainCamera' if camera_stage is not None else camera
    outputs['image'] = image_name
    for key, value in outputs.items():
        print("%s: %s" % (key, value))
    if not args.output_dir:
        outputs['cameraStage'] = camera_stage
        outputs['subjectStage'] = subject_stage
    return outputs


def main(argv=None):
    return generate_single_thumbnail(parse_args(argv))


if __name__ == "__main__":
    main()
`,"/openusd/pxr/base/gf/__init__.py":`#
# Copyright 2016 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.
#
"""
Graphics Foundation
This package defines classes for fundamental graphics types and operations.
"""

from pxr import Tf
Tf.PreparePythonModule()
del Tf
`,"/openusd/pxr/base/gf/gfGenCode.py":`#!/usr/bin/env python
#
# Copyright 2016 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.
#

##############################################################################
# Code generation script for the various flavors of GfVec, GfMatrix, GfRange,
# GfQuat, GfDualQuat classes.
#
# Run this script manually to update the source code that's checked in.  Run
# with --validate to compare what would be generated with the existing code.  If
# it differs, this script will print a diff and error out.
#

import os, sys, itertools
from argparse import ArgumentParser

from jinja2 import Environment, FileSystemLoader
from jinja2.exceptions import TemplateError, TemplateSyntaxError

# Write filePath if its content differs from \\p content.  If unchanged, print a
# message indicating that.  If filePath is not writable, print a diff.
def _WriteFile(filePath, content, verbose=True):
    import difflib
    # If file currently exists and content is unchanged, do nothing.
    existingContent = '\\n'
    content = (content + '\\n'
               if content and not content.endswith('\\n') else content)
    if os.path.exists(filePath):
        with open(filePath, 'r') as fp:
            existingContent = fp.read()
        if existingContent == content:
            if verbose:
                print('\\tunchanged %s' % filePath)
            return
    # Otherwise attempt to write to file.
    try:
        with open(filePath, 'w') as curfile:
            curfile.write(content)
            if verbose:
                print('\\t    wrote %s' % filePath)
    except IOError as ioe:
        print('\\t', ioe)
        print('Diff:')
        print('\\n'.join(difflib.unified_diff(existingContent.split('\\n'),
                                             content.split('\\n'))))

def IsFloatingPoint(t):
    return t in ['double', 'float', 'GfHalf']

def RankScalar(s):
    # Return a numeric rank for a scalar type.  We allow implicit conversions to
    # scalars of greater rank.
    return dict([(t, n) for n, t in
                 enumerate(['int', 'GfHalf', 'float', 'double'])])[s]

def AllowImplicitConversion(src, dst):
    # Somewhat questionably, we always allow ints to implicitly convert to
    # floating point types.
    return RankScalar(src) <= RankScalar(dst)

def Component(i):
    # Return the name of the i'th vector component, or the empty string if
    # there is no name for it.  Only vectors (dimension <= 4) name their
    # components; this is unused by the other templates.
    return 'xyzw'[i] if i < 4 else ''

def MakeListFn(defaultN):
    def List(fmt, sep=', ', num=None):
        num = num if num is not None else defaultN
        return sep.join([fmt % {'i': i, 'c': Component(i)} for i in range(num)])
    return List

def MakeMatrixFn(defaultN):
    def Matrix(fmt, sep=', ', indent=0, diagFmt=None, num=None):
        num = num if num is not None else defaultN
        diagFmt = diagFmt if diagFmt is not None else fmt

        def GetFmt(row, col):
            return diagFmt if row == col else fmt

        strs = [(sep.join([GetFmt(i,j) % {'i':i,'j':j} for j in range(num)])) \\
                    for i in range(num)]
        indentStr = (' ' * indent)
        lineSep = sep + ('\\n' + indentStr if '\\n' not in sep else '')
        result = lineSep.join(strs)
        return result
    return Matrix

def GenerateFromTemplates(env, templates, suffix, outputPath, verbose=True):
    for tmpl in templates:
        tmplName = tmpl % '.template'

        try:
            _WriteFile(os.path.join(outputPath, tmpl % suffix),
                env.get_template(tmplName).render(), verbose)
        except TemplateSyntaxError as err:
            print('Syntax Error: {0.name}:{0.lineno}: {0.message}'.format(err),
                  file=sys.stderr)
        except TemplateError as err:
            print('Template Error: {}: {}'.format(err, tmplName),
                  file=sys.stderr)

def ScalarSuffix(scl):
    if scl == 'GfHalf':
        return 'h'
    else:
        return scl[0]

def VecName(dim, scl):
    return 'GfVec%s%s' % (dim, ScalarSuffix(scl))

def Eps(scl):
    return '0.001' if scl == 'GfHalf' else 'GF_MIN_VECTOR_LENGTH'

def MakeSwizzles(dim):
    # Return the set of multi-component swizzles for a vector of dimension
    # 'dim': every permutation, without repeats, of length 2 through dim.  That
    # is 2, 12 and 60 names for dimensions 2, 3 and 4 respectively.
    #
    # Single-component swizzles are not included -- those are the vector's
    # named components ('x', 'y', ...), which are plain data members.
    #
    # Repeated components ('xx', 'yxy') are deliberately excluded.  Including
    # them would mean 336 names for a 4-dimensional vector rather than 60,
    # which measurably slows compilation and inflates debug information for
    # every translation unit that uses a vector.
    #
    # Each entry is a dict describing one swizzle:
    #   NAME    the swizzle, and the accessor's name, e.g. 'xzy'
    #   ARGS    the components in order, ready for a constructor call, 'x, z, y'
    #   RETDIM  the dimension of the result, e.g. 3
    #   IDXS    the component indexes, e.g. [0, 2, 1]
    ret = []
    for swizLen in range(2, dim+1):
        for p in itertools.permutations(range(dim), swizLen):
            ret.append(dict(NAME=''.join([Component(n) for n in p]),
                            ARGS=', '.join([Component(n) for n in p]),
                            RETDIM=len(p),
                            IDXS=list(p)))
    return ret

########################################################################
# GfVec
def GetVecSpecs():
    scalarTypes = ['double', 'float', 'GfHalf', 'int']
    dimensions = [2, 3, 4]
    vecSpecs = sorted(
        [dict(SCL=scl,
              DIM=dim,
              SUFFIX=str(dim) + ScalarSuffix(scl),
              VEC=VecName(dim, scl),
              EPS=Eps(scl),
              LIST=MakeListFn(dim),
              VECNAME=VecName,
              SCALAR_SUFFIX=ScalarSuffix,
              SCALARS=scalarTypes,
              SWIZZLES=MakeSwizzles(dim))
         for scl, dim in itertools.product(scalarTypes, dimensions)],
        key=lambda d: RankScalar(d['SCL']))

    return dict(templates=['vec%s.h', 'vec%s.cpp', 'wrapVec%s.cpp'],
                specs=vecSpecs)

########################################################################
# GfRange
def GetRangeSpecs():
    def RngName(dim, scl):
        return 'GfRange%s%s' % (dim, ScalarSuffix(scl))

    def MinMaxType(dim, scl):
        return scl if dim == 1 else VecName(dim, scl)

    def MinMaxParm(dim, scl):
        t = MinMaxType(dim, scl)
        return t + ' ' if dim == 1 else 'const %s &' % t

    scalarTypes = ['double', 'float']
    dimensions = [1, 2, 3]
    rngSpecs = sorted(
        [dict(SCL=scl,
              MINMAX=MinMaxType(dim, scl),
              MINMAXPARM=MinMaxParm(dim, scl),
              DIM=dim,
              SUFFIX=str(dim) + ScalarSuffix(scl),
              RNG=RngName(dim, scl),
              RNGNAME=RngName,
              SCALARS=scalarTypes,
              LIST=MakeListFn(dim))
         for scl, dim in itertools.product(scalarTypes, dimensions)],
        key=lambda d: RankScalar(d['SCL']))

    return dict(templates=['range%s.h', 'range%s.cpp', 'wrapRange%s.cpp'],
                specs=rngSpecs)
    
########################################################################
# GfQuat
def GetQuatSpecs():
    def QuatName(scl):
        return 'GfQuat%s' % ScalarSuffix(scl)

    scalarTypes = ['double', 'float', 'GfHalf']
    quatSpecs = sorted(
        [dict(SCL=scl,
              SUFFIX=ScalarSuffix(scl),
              QUAT=QuatName(scl),
              QUATNAME=QuatName,
              SCALAR_SUFFIX=ScalarSuffix,
              SCALARS=scalarTypes,
              LIST=MakeListFn(4))
         for scl in scalarTypes],
        key=lambda d: RankScalar(d['SCL']))

    return dict(templates=['quat%s.h', 'quat%s.cpp', 'wrapQuat%s.cpp'],
                specs=quatSpecs)

########################################################################
# GfDualQuat
def GetDualQuatSpecs():
    def QuatName(scl):
        return 'GfQuat%s' % ScalarSuffix(scl)
    def DualQuatName(scl):
        return 'GfDualQuat%s' % ScalarSuffix(scl)

    scalarTypes = ['double', 'float', 'GfHalf']
    dualQuatSpecs = sorted(
        [dict(SCL=scl,
              SUFFIX=ScalarSuffix(scl),
              QUAT=QuatName(scl),
              QUATNAME=QuatName,
              DUALQUAT=DualQuatName(scl),
              DUALQUATNAME=DualQuatName,
              SCALAR_SUFFIX=ScalarSuffix,
              SCALARS=scalarTypes,
              LIST=MakeListFn(4))
         for scl in scalarTypes],
        key=lambda d: RankScalar(d['SCL']))

    return dict(templates=['dualQuat%s.h', 'dualQuat%s.cpp', 'wrapDualQuat%s.cpp'],
                specs=dualQuatSpecs)

########################################################################
# GfMatrix
def GetMatrixSpecs(dim):
    def MatrixName(dim, scl):
        return 'GfMatrix%s%s' % (dim, ScalarSuffix(scl))

    scalarTypes = ['double', 'float']
    dimensions = [dim]

    matrixSpecs = sorted(
        [dict(SCL=scl,
              DIM=i,
              FILESUFFIX=ScalarSuffix(scl),
              SUFFIX=str(i) + ScalarSuffix(scl),
              MAT=MatrixName(i, scl),
              LIST=MakeListFn(i),
              MATRIX=MakeMatrixFn(i),
              MATNAME=MatrixName,
              SCALARS=scalarTypes)
         for scl, i in itertools.product(scalarTypes, dimensions)],
        key=lambda d: RankScalar(d['SCL']))

    return dict(templates=['matrix%s%%s.h' % dim,
                           'matrix%s%%s.cpp' % dim,
                           'wrapMatrix%s%%s.cpp' % dim ], specs=matrixSpecs)

def GetMatrix2Specs():
    return GetMatrixSpecs(dim = 2)

def GetMatrix3Specs():
    return GetMatrixSpecs(dim = 3)

def GetMatrix4Specs():
    return GetMatrixSpecs(dim = 4)

# Check that each file in dstDir matches the corresponding file in srcDir.
def ValidateFiles(srcDir, dstDir):
    import difflib
    missing = []
    diffs = []
    for dstFile in [os.path.join(dstDir, f) for f in os.listdir(dstDir)
                    if os.path.isfile(os.path.join(dstDir, f))]:
        srcFile = os.path.join(srcDir, os.path.basename(dstFile))
        if not os.path.isfile(srcFile):
            missing.append(srcFile)
            continue
        dstContent, srcContent = open(dstFile).read(), open(srcFile).read()
        if dstContent != srcContent:
            diff = '\\n'.join(difflib.unified_diff(
                srcContent.split('\\n'),
                dstContent.split('\\n'),
                'Source ' + os.path.basename(srcFile),
                'Generated ' + os.path.basename(dstFile)))
            diffs.append(diff)
            continue

    if missing or diffs:
        msg = []
        if missing:
            msg.append('*** Missing Generated Files: ' + ', '.join(missing))
        if diffs:
            msg.append('*** Differing Generated Files:\\n' + '\\n'.join(diffs))
        raise RuntimeError('\\n' + '\\n'.join(msg))

if __name__ == '__main__':
    ap = ArgumentParser(
        description='Generate source code for GfVec, GfRange, GfQuat, GfDualQuat.')
    ap.add_argument('--validate', action='store_true')
    ap.add_argument('--dstDir', default=os.curdir)
    ap.add_argument('--srcDir', default=os.curdir)
    args = ap.parse_args()

    stdEnv = dict(UPPER=str.upper, LOWER=str.lower,
                  ALLOW_IMPLICIT_CONVERSION=AllowImplicitConversion,
                  IS_FLOATING_POINT=IsFloatingPoint)

    if args.validate:
        # Make a temporary directory for results.
        import tempfile
        args.dstDir = tempfile.mkdtemp()

    try:
        for s in [GetVecSpecs(), GetRangeSpecs(),
                  GetQuatSpecs(), GetDualQuatSpecs(),
                  GetMatrix2Specs(), GetMatrix3Specs(), GetMatrix4Specs()]:
            env = Environment(loader=FileSystemLoader(args.srcDir),
                              trim_blocks=True)
            env.globals.update(**stdEnv)
            templates, specs = s['templates'], s['specs']
            for spec in specs:
                env.globals.update(**spec)
                GenerateFromTemplates(
                    env, templates, spec.get('FILESUFFIX', spec['SUFFIX']),
                    args.dstDir, verbose=not args.validate)

        if args.validate:
            ValidateFiles(args.srcDir, args.dstDir)

    finally:
        # Remove the temporary directory.
        if args.validate:
            import shutil
            shutil.rmtree(args.dstDir)

`,"/openusd/pxr/usd/sdf/__init__.py":`#
# Copyright 2016 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.
#
from pxr import Tf
Tf.PreparePythonModule()
del Tf

from pxr.Gf import TimeCode
from pxr.Vt import TimeCodeArray

def Find(layerFileName, scenePath=None):
    '''Find(layerFileName, scenePath) -> object

layerFileName: string
scenePath: Path

If given a single string argument, returns the layer with 
the given filename.  If given two arguments (a string and a Path), finds 
the layer with the given filename and returns the scene object 
within it at the given path.'''
    layer = Layer.Find(layerFileName)
    if (scenePath is None): return layer
    return layer.GetObjectAtPath(scenePath)


# Test utilities
def _PathElemsToPrefixes(absolute, elements, numPrefixes=0):

    prefixes = []

    string = "/" if absolute else ""
        
    lastElemWasDotDot = False
    didFirst = False

    for elem in elements:
        if elem == Path.parentPathElement:
            # dotdot
            if didFirst:
                string = string + "/"
            else:
                didFirst = True
            string = string + elem
            prefixes.append(Path(string))
            lastElemWasDotDot = True
        elif elem[0] == ".":
            # property
            if lastElemWasDotDot:
                string = string + "/"
            string = string + elem
            prefixes.append(Path(string))
            lastElemWasDotDot = False
        elif elem[0] == "[":
            # rel attr or sub-attr indices, don't care which
            string = string + elem
            prefixes.append(Path(string))
            lastElemWasDotDot = False
        else:
            if didFirst:
                string = string + "/"
            else:
                didFirst = True
            string = string + elem
            prefixes.append(Path(string))
            lastElemWasDotDot = False

    if not string:
        return []
    
    return prefixes if numPrefixes == 0 else prefixes[-numPrefixes:]
`,"/openusd/pxr/usd/sdr/__init__.py":`#
# Copyright 2018 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.
#

"""Python bindings for libSdr"""

from pxr import Tf
Tf.PreparePythonModule()
del Tf
`,"/openusd/pxr/usd/sdr/shaderParserTestUtils.py":`#!/pxrpythonsubst
#
# Copyright 2018 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.

"""
Common utilities that shader-based parser plugins can use in their tests.

This is mostly focused on dealing with OSL and Args files. This may need to be
expanded/generalized to accommodate other types in the future.
"""

from __future__ import print_function

from pxr import Sdr
from pxr.Sdf import ValueTypeNames as SdfTypes
from pxr import Tf


def IsNodeOSL(node):
    """
    Determines if the given node has an OSL source type.
    """

    return node.GetSourceType() == "OSL"

# XXX Maybe rename this to GetSdfType (as opposed to the Sdr type)
def GetType(property):
    """
    Given a property (SdrShaderProperty), return the SdfValueTypeName type.
    """
    sdfTypeIndicator = property.GetTypeAsSdfType()
    sdfValueTypeName = sdfTypeIndicator.GetSdfType()
    tfType = sdfValueTypeName.type

    return tfType

def TestBasicProperties(node):
    """
    Test the correctness of the properties on the specified node (only the
    non-shading-specific aspects).
    """

    isOSL = IsNodeOSL(node)

    # Data that varies between OSL/Args
    # --------------------------------------------------------------------------
    metadata = {
        "widget": "number",
        "label": "inputA label",
        "page": "inputs1",
        "open" : "1",
        "help": "inputA help message",
        "uncategorized": "1"
    }

    if not isOSL:
        metadata["name"] = "inputA"
        metadata["default"] = "0.0"
        metadata["type"] = "float"
        del metadata["open"]
    # --------------------------------------------------------------------------


    properties = {
        "inputA": node.GetShaderInput("inputA"),
        "inputB": node.GetShaderInput("inputB"),
        "inputC": node.GetShaderInput("inputC"),
        "inputD": node.GetShaderInput("inputD"),
        "inputF2": node.GetShaderInput("inputF2"),
        "inputStrArray": node.GetShaderInput("inputStrArray"),
        "inputArrayWithTuples": node.GetShaderInput("inputArrayWithTuples"),
        "resultF": node.GetShaderOutput("resultF"),
        "resultI": node.GetShaderOutput("resultI"),
    }

    assert properties["inputA"].GetName() == "inputA"
    assert properties["inputA"].GetType() == "float"
    assert properties["inputA"].GetDefaultValue() == 0.0
    assert not properties["inputA"].IsOutput()
    assert not properties["inputA"].IsArray()
    assert not properties["inputA"].IsDynamicArray()
    assert properties["inputA"].GetArraySize() == 0
    assert properties["inputA"].GetTupleSize() == 0
    assert properties["inputA"].GetInfoString() == "inputA (type: 'float'); input"
    assert properties["inputA"].IsConnectable()
    assert properties["inputA"].CanConnectTo(properties["resultF"])
    assert not properties["inputA"].CanConnectTo(properties["resultI"])
    assert properties["inputA"].GetMetadata() == metadata

    # --------------------------------------------------------------------------
    # Check some array variations
    # --------------------------------------------------------------------------

    assert properties["inputD"].IsDynamicArray()
    assert properties["inputD"].GetArraySize() == 1 if isOSL else -1
    assert properties["inputD"].GetTupleSize() == 0
    assert properties["inputD"].IsArray()
    assert list(properties["inputD"].GetDefaultValue()) == [1]

    assert not properties["inputF2"].IsDynamicArray()
    assert properties["inputF2"].GetArraySize() == 2
    assert properties["inputD"].GetTupleSize() == 0
    assert properties["inputF2"].IsArray()
    assert not properties["inputF2"].IsConnectable()
    assert list(properties["inputF2"].GetDefaultValue()) == [1.0, 2.0]

    assert properties["inputStrArray"].GetArraySize() == 4
    assert properties["inputStrArray"].GetTupleSize() == 0
    assert list(properties["inputStrArray"].GetDefaultValue()) == \\
        ["test", "string", "array", "values"]

    assert properties["inputArrayWithTuples"].GetArraySize() == 8
    assert properties["inputArrayWithTuples"].GetTupleSize() == 2
    assert properties["inputArrayWithTuples"].IsArray()

def TestShadingProperties(node):
    """
    Test the correctness of the properties on the specified node (only the
    shading-specific aspects).
    """

    isOSL = IsNodeOSL(node)

    properties = {
        "inputA": node.GetShaderInput("inputA"),
        "inputB": node.GetShaderInput("inputB"),
        "inputC": node.GetShaderInput("inputC"),
        "inputD": node.GetShaderInput("inputD"),
        "inputF2": node.GetShaderInput("inputF2"),
        "inputF3": node.GetShaderInput("inputF3"),
        "inputF4": node.GetShaderInput("inputF4"),
        "inputF5": node.GetShaderInput("inputF5"),
        "inputInterp": node.GetShaderInput("inputInterp"),
        "inputOptions": node.GetShaderInput("inputOptions"),
        "inputPoint": node.GetShaderInput("inputPoint"),
        "inputNormal": node.GetShaderInput("inputNormal"),
        "inputStruct": node.GetShaderInput("inputStruct"),
        "inputAssetIdentifier": node.GetShaderInput("inputAssetIdentifier"),
        "resultF": node.GetShaderOutput("resultF"),
        "resultF2": node.GetShaderOutput("resultF2"),
        "resultF3": node.GetShaderOutput("resultF3"),
        "resultI": node.GetShaderOutput("resultI"),
        "vstruct1": node.GetShaderOutput("vstruct1"),
        "vstruct1_bump": node.GetShaderOutput("vstruct1_bump"),
        "outputPoint": node.GetShaderOutput("outputPoint"),
        "outputNormal": node.GetShaderOutput("outputNormal"),
        "outputColor": node.GetShaderOutput("outputColor"),
        "outputVector": node.GetShaderOutput("outputVector"),
    }

    hints = { "uncategorized": "1", "open": "1" } if isOSL else \\
            { "uncategorized": "1", }

    assert properties["inputA"].GetLabel() == "inputA label"
    assert properties["inputA"].GetHelp() == "inputA help message"
    assert properties["inputA"].GetPage() == "inputs1"
    assert properties["inputA"].GetWidget() == "number"
    assert properties["inputA"].GetHints() == hints
    assert properties["inputA"].GetOptions() == []
    assert properties["inputA"].GetVStructMemberOf() == ""
    assert properties["inputA"].GetVStructMemberName() == ""
    assert not properties["inputA"].IsVStructMember()
    assert not properties["inputA"].IsVStruct()
    assert properties["inputA"].IsConnectable()
    assert properties["inputA"].GetValidConnectionTypes() == []
    assert properties["inputA"].CanConnectTo(properties["resultF"])
    assert not properties["inputA"].CanConnectTo(properties["resultI"])

    # --------------------------------------------------------------------------
    # Check correct options parsing
    # --------------------------------------------------------------------------
    assert set(properties["inputOptions"].GetOptions()) == {
        ("opt1", "opt1val"),
        ("opt2", "opt2val")
    }

    assert set(properties["inputInterp"].GetOptions()) == {
        ("linear", ""),
        ("catmull-rom", ""),
        ("bspline", ""),
        ("constant", ""),
    }

    # --------------------------------------------------------------------------
    # Check cross-type connection allowances
    # --------------------------------------------------------------------------
    assert properties["inputPoint"].CanConnectTo(properties["outputNormal"])
    assert properties["inputNormal"].CanConnectTo(properties["outputPoint"])
    assert properties["inputNormal"].CanConnectTo(properties["outputColor"])
    assert properties["inputNormal"].CanConnectTo(properties["outputVector"])
    assert properties["inputNormal"].CanConnectTo(properties["resultF3"])
    assert properties["inputF2"].CanConnectTo(properties["resultF2"])
    assert properties["inputD"].CanConnectTo(properties["resultI"])
    assert not properties["inputNormal"].CanConnectTo(properties["resultF2"])
    assert not properties["inputF4"].CanConnectTo(properties["resultF2"])
    assert not properties["inputF2"].CanConnectTo(properties["resultF3"])

    # --------------------------------------------------------------------------
    # Check clean and unclean mappings to Sdf types
    # --------------------------------------------------------------------------
    expected_mappings = {"inputB": (SdfTypes.Int, "int"),
                         "inputF2": (SdfTypes.Float2,
                                     Sdr.PropertyTypes.Float),
                         "inputF3": (SdfTypes.Float3,
                                     Sdr.PropertyTypes.Float),
                         "inputF4": (SdfTypes.Float4,
                                     Sdr.PropertyTypes.Float),
                         "inputF5": (SdfTypes.FloatArray,
                                     Sdr.PropertyTypes.Float),
                         "inputStruct": (SdfTypes.Token,
                                         Sdr.PropertyTypes.Struct)}
    
    for prop, expected in expected_mappings.items():
        indicator = properties[prop].GetTypeAsSdfType()
        assert indicator.GetSdfType() == expected[0]
        assert indicator.GetSdrType() == expected[1]

    # --------------------------------------------------------------------------
    # Ensure asset identifiers are detected correctly
    # --------------------------------------------------------------------------
    assert properties["inputAssetIdentifier"].IsAssetIdentifier()
    assert not properties["inputOptions"].IsAssetIdentifier()
    indicator = properties["inputAssetIdentifier"].GetTypeAsSdfType()
    assert indicator.GetSdfType() == SdfTypes.Asset
    assert indicator.GetSdrType() == Sdr.PropertyTypes.String

    # Nested pages and VStructs are only possible in args files
    if not isOSL:
        # ----------------------------------------------------------------------
        # Check nested page correctness
        # ----------------------------------------------------------------------
        assert properties["vstruct1"].GetPage() == "VStructs:Nested"
        assert properties["vstruct1_bump"].GetPage() == "VStructs:Nested:More"

        # ----------------------------------------------------------------------
        # Check VStruct correctness
        # ----------------------------------------------------------------------
        assert properties["vstruct1"].IsVStruct()
        assert properties["vstruct1"].GetVStructMemberOf() == ""
        assert properties["vstruct1"].GetVStructMemberName() == ""
        assert not properties["vstruct1"].IsVStructMember()

        assert not properties["vstruct1_bump"].IsVStruct()
        assert properties["vstruct1_bump"].GetVStructMemberOf() == "vstruct1"
        assert properties["vstruct1_bump"].GetVStructMemberName() == "bump"
        assert properties["vstruct1_bump"].IsVStructMember()


def TestBasicNode(node, nodeSourceType, nodeDefinitionURI, nodeImplementationURI):
    """
    Test basic, non-shader-specific correctness on the specified node.
    """

    # Implementation notes:
    # ---
    # The source type needs to be passed manually in order to ensure the utils
    # do not have a dependency on the plugin (where the source type resides).
    # The URIs are manually specified because the utils cannot know ahead of
    # time where the node originated.

    isOSL = IsNodeOSL(node)
    nodeContext = "OSL" if isOSL else "pattern"

    # Data that varies between OSL/Args
    # --------------------------------------------------------------------------
    nodeName = "TestNodeOSL" if isOSL else "TestNodeARGS"
    numOutputs = 8 if isOSL else 10
    outputNames = {
        "resultF", "resultF2", "resultF3", "resultI", "outputPoint",
        "outputNormal", "outputColor", "outputVector"
    }
    metadata = {
        "category": "testing",
        "departments": "testDept",
        "help": "This is the test node",
        "label": "TestNodeLabel",
        "primvars": "primvar1|primvar2|primvar3|$primvarNamingProperty|"
                    "$invalidPrimvarNamingProperty",
        "uncategorizedMetadata": "uncategorized"
    }

    if not isOSL:
        metadata.pop("category")
        metadata.pop("label")
        metadata.pop("uncategorizedMetadata")

        outputNames.add("vstruct1")
        outputNames.add("vstruct1_bump")
    # --------------------------------------------------------------------------

    nodeInputs = {propertyName: node.GetShaderInput(propertyName)
                  for propertyName in node.GetShaderInputNames()}

    nodeOutputs = {propertyName: node.GetShaderOutput(propertyName)
                   for propertyName in node.GetShaderOutputNames()}

    assert node.GetName() == nodeName
    assert node.GetContext() == nodeContext
    assert node.GetSourceType() == nodeSourceType
    assert node.GetFunction() == ""
    assert node.GetResolvedDefinitionURI() == nodeDefinitionURI
    assert node.GetResolvedImplementationURI() == nodeImplementationURI
    assert node.IsValid()
    assert len(nodeInputs) == 18
    assert len(nodeOutputs) == numOutputs
    assert nodeInputs["inputA"] is not None
    assert nodeInputs["inputB"] is not None
    assert nodeInputs["inputC"] is not None
    assert nodeInputs["inputD"] is not None
    assert nodeInputs["inputF2"] is not None
    assert nodeInputs["inputF3"] is not None
    assert nodeInputs["inputF4"] is not None
    assert nodeInputs["inputF5"] is not None
    assert nodeInputs["inputInterp"] is not None
    assert nodeInputs["inputOptions"] is not None
    assert nodeInputs["inputPoint"] is not None
    assert nodeInputs["inputNormal"] is not None
    assert nodeInputs["inputArrayWithTuples"] is not None
    assert nodeOutputs["resultF2"] is not None
    assert nodeOutputs["resultI"] is not None
    assert nodeOutputs["outputPoint"] is not None
    assert nodeOutputs["outputNormal"] is not None
    assert nodeOutputs["outputColor"] is not None
    assert nodeOutputs["outputVector"] is not None
    print(set(node.GetShaderInputNames()))
    assert set(node.GetShaderInputNames()) == {
        "inputA", "inputB", "inputC", "inputD", "inputF2", "inputF3", "inputF4",
        "inputF5", "inputInterp", "inputOptions", "inputPoint", "inputNormal",
        "inputStruct", "inputAssetIdentifier", "primvarNamingProperty",
        "invalidPrimvarNamingProperty", "inputStrArray", "inputArrayWithTuples"
    }
    assert set(node.GetShaderOutputNames()) == outputNames

    # There may be additional metadata passed in via the SdrShaderNodeDiscoveryResult.
    # So, ensure that the bits we expect to see are there instead of doing 
    # an equality check.
    nodeMetadata = node.GetMetadata()
    for i,j in metadata.items():
        assert i in nodeMetadata
        assert nodeMetadata[i] == metadata[i]

    # Test basic property correctness
    TestBasicProperties(node)


def TestShaderSpecificNode(node):
    """
    Test shader-specific correctness on the specified node.
    """

    isOSL = IsNodeOSL(node)

    # Data that varies between OSL/Args
    # --------------------------------------------------------------------------
    numOutputs = 8 if isOSL else 10
    label = "TestNodeLabel" if isOSL else ""
    category = "testing" if isOSL else ""
    vstructNames = [] if isOSL else ["vstruct1"]
    pages = {"", "inputs1", "inputs2", "results"} if isOSL else \\
            {"", "inputs1", "inputs2", "results", "VStructs:Nested",
                "VStructs:Nested:More"}
    openPages = {"inputs1", "results"} if isOSL else \\
                {"inputs1", "VStructs", "VStructs:Nested"}
    # --------------------------------------------------------------------------

    shaderInputs = {propertyName: node.GetShaderInput(propertyName)
                    for propertyName in node.GetShaderInputNames()}

    shaderOutputs = {propertyName: node.GetShaderOutput(propertyName)
                     for propertyName in node.GetShaderOutputNames()}

    assert len(shaderInputs) == 18
    assert len(shaderOutputs) == numOutputs
    assert shaderInputs["inputA"] is not None
    assert shaderInputs["inputB"] is not None
    assert shaderInputs["inputC"] is not None
    assert shaderInputs["inputD"] is not None
    assert shaderInputs["inputF2"] is not None
    assert shaderInputs["inputF3"] is not None
    assert shaderInputs["inputF4"] is not None
    assert shaderInputs["inputF5"] is not None
    assert shaderInputs["inputInterp"] is not None
    assert shaderInputs["inputOptions"] is not None
    assert shaderInputs["inputPoint"] is not None
    assert shaderInputs["inputNormal"] is not None
    assert shaderInputs["inputArrayWithTuples"] is not None
    assert shaderOutputs["resultF"] is not None
    assert shaderOutputs["resultF2"] is not None
    assert shaderOutputs["resultF3"] is not None
    assert shaderOutputs["resultI"] is not None
    assert shaderOutputs["outputPoint"] is not None
    assert shaderOutputs["outputNormal"] is not None
    assert shaderOutputs["outputColor"] is not None
    assert shaderOutputs["outputVector"] is not None
    assert node.GetLabel() == label
    assert node.GetCategory() == category
    assert node.GetHelp() == "This is the test node"
    assert node.GetDepartments() == ["testDept"]
    assert set(node.GetPages()) == pages
    assert set(node.GetOpenPages()) == openPages
    assert set(node.GetPrimvars()) == {"primvar1", "primvar2", "primvar3"}
    assert set(node.GetAdditionalPrimvarProperties()) == {"primvarNamingProperty"}
    assert set(node.GetPropertyNamesForPage("results")) == {
        "resultF", "resultF2", "resultF3", "resultI"
    }
    assert set(node.GetPropertyNamesForPage("")) == {
        "outputPoint", "outputNormal", "outputColor", "outputVector"
    }
    assert set(node.GetPropertyNamesForPage("inputs1")) == {"inputA"}
    assert set(node.GetPropertyNamesForPage("inputs2")) == {
        "inputB", "inputC", "inputD", "inputF2", "inputF3", "inputF4", "inputF5",
        "inputInterp", "inputOptions", "inputPoint", "inputNormal",
        "inputStruct", "inputAssetIdentifier", "primvarNamingProperty",
        "invalidPrimvarNamingProperty", "inputStrArray", "inputArrayWithTuples"
    }
    assert node.GetAllVstructNames() == vstructNames

    # Test shading-specific property correctness
    TestShadingProperties(node)


def TestShaderPropertiesNode(node):
    """
    Tests property correctness on the specified shader node, which must be
    one of the following pre-defined nodes:
    * 'TestShaderPropertiesNodeOSL'
    * 'TestShaderPropertiesNodeARGS'
    * 'TestShaderPropertiesNodeUSD'
    These pre-defined nodes have a property of every type that Sdr supports.

    Property correctness is defined as:
    * The shader property has the expected SdrPropertyType
    * The shader property has the expected SdfValueTypeName
    * If the shader property has a default value, the default value's type
      matches the shader property's type
    """
    # This test should only be run on the following allowed node names
    # --------------------------------------------------------------------------
    allowedNodeNames = ["TestShaderPropertiesNodeOSL",
                        "TestShaderPropertiesNodeARGS",
                        "TestShaderPropertiesNodeUSD"]

    # If this assertion on the name fails, then this test was called with the
    # wrong node.
    assert node.GetName() in allowedNodeNames

    # If we have the correct node name, double check that the source type is
    # also correct
    if node.GetName() == "TestShaderPropertiesNodeOSL":
        assert node.GetSourceType() == "OSL"
    elif node.GetName() == "TestShaderPropertiesNodeARGS":
        assert node.GetSourceType() == "RmanCpp"
    elif node.GetName() == "TestShaderPropertiesNodeUSD":
        assert node.GetSourceType() == "glslfx"

    nodeInputs = {propertyName: node.GetShaderInput(propertyName)
                  for propertyName in node.GetShaderInputNames()}

    nodeOutputs = {propertyName: node.GetShaderOutput(propertyName)
                  for propertyName in node.GetShaderOutputNames()}

    # For each property, we test that:
    # * The property has the expected SdrPropertyType
    # * The property has the expected TfType (from SdfValueTypeName)
    # * The property's type and default value's type match

    property = nodeInputs["inputInt"]
    assert property.GetType() == Sdr.PropertyTypes.Int
    assert GetType(property) == Tf.Type.FindByName("int")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputString"]
    assert property.GetType() == Sdr.PropertyTypes.String
    assert GetType(property) == Tf.Type.FindByName("string")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputFloat"]
    assert property.GetType() == Sdr.PropertyTypes.Float
    assert GetType(property) == Tf.Type.FindByName("float")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputColor"]
    assert property.GetType() == Sdr.PropertyTypes.Color
    assert GetType(property) == Tf.Type.FindByName("GfVec3f")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputPoint"]
    assert property.GetType() == Sdr.PropertyTypes.Point
    assert GetType(property) == Tf.Type.FindByName("GfVec3f")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputNormal"]
    assert property.GetType() == Sdr.PropertyTypes.Normal
    assert GetType(property) == Tf.Type.FindByName("GfVec3f")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputVector"]
    assert property.GetType() == Sdr.PropertyTypes.Vector
    assert GetType(property) == Tf.Type.FindByName("GfVec3f")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputMatrix"]
    assert property.GetType() == Sdr.PropertyTypes.Matrix
    assert GetType(property) == Tf.Type.FindByName("GfMatrix4d")
    assert Sdr._ValidateProperty(node, property)

    if node.GetName() != "TestShaderPropertiesNodeUSD":
        # XXX Note that 'struct' and 'vstruct' types are currently unsupported
        # by the UsdShadeShaderDefParserPlugin, which parses shaders defined in
        # usd files. Please see UsdShadeShaderDefParserPlugin implementation for
        # details.
        property = nodeInputs["inputStruct"]
        assert property.GetType() == Sdr.PropertyTypes.Struct
        assert GetType(property) == Tf.Type.FindByName("TfToken")
        assert Sdr._ValidateProperty(node, property)

        property = nodeInputs["inputVstruct"]
        assert property.GetType() == Sdr.PropertyTypes.Vstruct
        assert GetType(property) == Tf.Type.FindByName("TfToken")
        assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputIntArray"]
    assert property.GetType() == Sdr.PropertyTypes.Int
    assert GetType(property) == Tf.Type.FindByName("VtArray<int>")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputStringArray"]
    assert property.GetType() == Sdr.PropertyTypes.String
    assert GetType(property) == Tf.Type.FindByName("VtArray<string>")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputFloatArray"]
    assert property.GetType() == Sdr.PropertyTypes.Float
    assert GetType(property) == Tf.Type.FindByName("VtArray<float>")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputColorArray"]
    assert property.GetType() == Sdr.PropertyTypes.Color
    assert GetType(property) ==  Tf.Type.FindByName("VtArray<GfVec3f>")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputPointArray"]
    assert property.GetType() == Sdr.PropertyTypes.Point
    assert GetType(property) == Tf.Type.FindByName("VtArray<GfVec3f>")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputNormalArray"]
    assert property.GetType() == Sdr.PropertyTypes.Normal
    assert GetType(property) == Tf.Type.FindByName("VtArray<GfVec3f>")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputVectorArray"]
    assert property.GetType() == Sdr.PropertyTypes.Vector
    assert GetType(property) == Tf.Type.FindByName("VtArray<GfVec3f>")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputMatrixArray"]
    assert property.GetType() == Sdr.PropertyTypes.Matrix
    assert GetType(property) == Tf.Type.FindByName("VtArray<GfMatrix4d>")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputFloat2"]
    assert property.GetType() == Sdr.PropertyTypes.Float
    assert GetType(property) == Tf.Type.FindByName("GfVec2f")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputFloat3"]
    assert property.GetType() == Sdr.PropertyTypes.Float
    assert GetType(property) == Tf.Type.FindByName("GfVec3f")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputFloat4"]
    assert property.GetType() == Sdr.PropertyTypes.Float
    assert GetType(property) == Tf.Type.FindByName("GfVec4f")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputAsset"]
    assert property.GetType() == Sdr.PropertyTypes.String
    assert GetType(property) == Tf.Type.FindByName("SdfAssetPath")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputAssetArray"]
    assert property.GetType() == Sdr.PropertyTypes.String
    assert GetType(property) == Tf.Type.FindByName("VtArray<SdfAssetPath>")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputColorRoleNone"]
    assert property.GetType() == Sdr.PropertyTypes.Float
    assert GetType(property) == Tf.Type.FindByName("GfVec3f")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputPointRoleNone"]
    assert property.GetType() == Sdr.PropertyTypes.Float
    assert GetType(property) == Tf.Type.FindByName("GfVec3f")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputNormalRoleNone"]
    assert property.GetType() == Sdr.PropertyTypes.Float
    assert GetType(property) == Tf.Type.FindByName("GfVec3f")
    assert Sdr._ValidateProperty(node, property)

    property = nodeInputs["inputVectorRoleNone"]
    assert property.GetType() == Sdr.PropertyTypes.Float
    assert GetType(property) == Tf.Type.FindByName("GfVec3f")
    assert Sdr._ValidateProperty(node, property)

    property = nodeOutputs["outputSurface"]
    assert property.GetType() == Sdr.PropertyTypes.Terminal
    assert GetType(property) == Tf.Type.FindByName("TfToken")
    assert Sdr._ValidateProperty(node, property)

    # Specific test of implementationName feature, we can skip type-tests
    property = nodeInputs["normal"]
    assert property.GetImplementationName() == "aliasedNormalInput"
    assert Sdr._ValidateProperty(node, property)

    if node.GetName() != "TestShaderPropertiesNodeOSL" and \\
        node.GetName() != "TestShaderPropertiesNodeARGS" :
        # We will parse color4 in MaterialX and UsdShade. Not currently
        # supported in OSL. rman Args also do not support / require color4 type.
        property = nodeInputs["inputColor4"]
        assert property.GetType() == Sdr.PropertyTypes.Color4
        assert GetType(property) == Tf.Type.FindByName("GfVec4f")
        assert Sdr._ValidateProperty(node, property)

        # oslc v1.11.14 does not allow arrays of structs as parameter.
        property = nodeInputs["inputColor4Array"]
        assert property.GetType() == Sdr.PropertyTypes.Color4
        assert GetType(property) ==  Tf.Type.FindByName("VtArray<GfVec4f>")
        assert Sdr._ValidateProperty(node, property)

        property = nodeInputs["inputColor4RoleNone"]
        assert property.GetType() == Sdr.PropertyTypes.Float
        assert GetType(property) == Tf.Type.FindByName("GfVec4f")
        assert Sdr._ValidateProperty(node, property)


`,"/openusd/pxr/base/tf/__init__.py":`#
# Copyright 2016 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.
#
"""
Tf -- Tools Foundation
"""

# Type to help handle DLL import paths on Windows with python interpreters v3.8
# and newer. These interpreters don't search for DLLs in the path anymore, you
# have to provide a path explicitly. This re-enables path searching for USD 
# dependency libraries
import platform, sys
if sys.version_info >= (3, 8) and platform.system() == "Windows":
    import contextlib

    @contextlib.contextmanager
    def WindowsImportWrapper():
        import os
        dirs = []
        import_paths = os.getenv('PXR_USD_WINDOWS_DLL_PATH')
        if import_paths is None:
            import_paths = os.getenv('PATH', '')
        # the underlying windows API call, AddDllDirectory, states that:
        #
        # > If AddDllDirectory is used to add more than one directory to the
        # > process DLL search path, the order in which those directories are
        # > searched is unspecified.
        #
        # https://learn.microsoft.com/en-us/windows/win32/api/libloaderapi/nf-libloaderapi-adddlldirectory
        #
        # However, in practice, it seems that the most-recently-added ones
        # take precedence - so, reverse the order of entries in PATH to give
        # it the same precedence
        #
        # Note that we have a test (testTfPyDllLink) to alert us if this
        # undefined behavior changes.
        for path in reversed(import_paths.split(os.pathsep)):
            # Calling add_dll_directory raises an exception if paths don't
            # exist, or if you pass in dot
            if os.path.exists(path) and path != '.':
                abs_path = os.path.abspath(path)
                dirs.append(os.add_dll_directory(abs_path))
        # This block guarantees we clear the dll directories if an exception
        # is raised in the with block.
        try:
            yield
        finally:
            for dll_dir in dirs:
                dll_dir.close()
        del os
    del contextlib
else:
    class WindowsImportWrapper(object):
        def __enter__(self):
            pass
        def __exit__(self, exc_type, ex_val, exc_tb):
            pass
del platform, sys


def PreparePythonModule(moduleName=None):
    """Prepare an extension module at import time.  This will import the
    Python module associated with the caller's module (e.g. '_tf' for 'pxr.Tf')
    or the module with the specified moduleName and copy its contents into
    the caller's local namespace.

    Generally, this should only be called by the __init__.py script for a module
    upon loading a boost python module (generally '_libName.so')."""
    import importlib
    import inspect
    frame = inspect.currentframe().f_back
    try:
        f_locals = frame.f_locals

        # If an explicit moduleName is not supplied, construct it from the
        # caller's module name, like "pxr.Tf", and our naming conventions,
        # which results in "_tf".
        if moduleName is None:
            moduleName = f_locals["__name__"].split(".")[-1]
            moduleName = "_" + moduleName[0].lower() + moduleName[1:]

        with WindowsImportWrapper():
            module = importlib.import_module(
                    "." + moduleName, f_locals["__name__"])

        PrepareModule(module, f_locals)
        try:
            del f_locals[moduleName]
        except KeyError:
            pass

        try:
            module = importlib.import_module(".__DOC", f_locals["__name__"])
            module.Execute(f_locals)
            try:
                del f_locals["__DOC"]
            except KeyError:
                pass
        except Exception:
            pass

    finally:
        del frame

def PrepareModule(module, result):
    """PrepareModule(module, result) -- Prepare an extension module at import
    time.  Generally, this should only be called by the __init__.py script for a
    module upon loading a boost python module (generally '_libName.so')."""
    # inject into result.
    ignore = frozenset(['__name__', '__package__', '__builtins__',
                        '__doc__', '__file__', '__path__'])
    newModuleName = result.get('__name__')

    for key, value in module.__dict__.items():
        if not key in ignore:
            result[key] = value

            # Lie about the module from which value came.
            if newModuleName and hasattr(value, '__module__'):
                try:
                    setattr(value, '__module__', newModuleName)
                except AttributeError as e:
                    # The __module__ attribute of Boost.Python.function
                    # objects is not writable, so we get this exception
                    # a lot.  Just ignore it.  We're really only concerned
                    # about the data objects like enum values and such.
                    #
                    pass

def GetCodeLocation(framesUp):
    """Returns a tuple (moduleName, functionName, fileName, lineNo).

    To trace the current location of python execution, use GetCodeLocation().
    By default, the information is returned at the current stack-frame; thus

        info = GetCodeLocation()

    will return information about the line that GetCodeLocation() was called 
    from. One can write:

        def genericDebugFacility():
            info = GetCodeLocation(1)
            # print out data


        def someCode():
            ...
            if bad:
                genericDebugFacility()

    and genericDebugFacility() will get information associated with its caller, 
    i.e. the function someCode()."""
    import sys
    f_back = sys._getframe(framesUp).f_back
    return (f_back.f_globals.get('__name__', '<unknown>'),
            f_back.f_code.co_name,
            f_back.f_code.co_filename,
            f_back.f_lineno)

PreparePythonModule()

# Need to provide an exception type that tf errors will show up as.
class ErrorException(RuntimeError):
    def __init__(self, *args):
        RuntimeError.__init__(self, *args)
        self.__TfException = True

    def __str__(self):
        return '\\n\\t' + '\\n\\t'.join([str(e) for e in self.args])
__SetErrorExceptionClass(ErrorException)

def Warn(msg, template=""):
    """Issue a warning via the TfDiagnostic system.

    At this time, template is ignored.
    """
    codeInfo = GetCodeLocation(framesUp=1)
    _Warn(msg, codeInfo[0], codeInfo[1], codeInfo[2], codeInfo[3])
    
def Status(msg, verbose=True):
    """Issues a status update to the Tf diagnostic system.

    If verbose is True (the default) then information about where in the code
    the status update was issued from is included.
    """
    if verbose:
        codeInfo = GetCodeLocation(framesUp=1)
        _Status(msg, codeInfo[0], codeInfo[1], codeInfo[2], codeInfo[3])
    else:
        _Status(msg)

def RaiseCodingError(msg):
    """Raise a coding error to the Tf Diagnostic system."""
    codeInfo = GetCodeLocation(framesUp=1)
    _RaiseCodingError(msg, codeInfo[0], codeInfo[1], codeInfo[2], codeInfo[3])

def RaiseRuntimeError(msg):
    """Raise a runtime error to the Tf Diagnostic system."""
    codeInfo = GetCodeLocation(framesUp=1)
    _RaiseRuntimeError(msg, codeInfo[0], codeInfo[1], codeInfo[2], codeInfo[3])

def Fatal(msg):
    """Raise a fatal error to the Tf Diagnostic system."""
    codeInfo = GetCodeLocation(framesUp=1)
    _Fatal(msg, codeInfo[0], codeInfo[1], codeInfo[2], codeInfo[3])


class NamedTemporaryFile(object):
    """A named temporary file which keeps the internal file handle closed. 
       A class which constructs a temporary file(that isn't open) on __enter__,
       provides its name as an attribute, and deletes it on __exit__. 
       
       Note: The constructor args for this object match those of 
       python's tempfile.mkstemp() function, and will have the same effect on
       the underlying file created."""

    def __init__(self, suffix='', prefix='', dir=None, text=False):
        # Note that we defer creation until the enter block to 
        # prevent users from unintentionally creating a bunch of
        # temp files that don't get cleaned up.
        self._args = (suffix,  prefix, dir, text)

    def __enter__(self):
        from tempfile import mkstemp
        from os import close
        
        fd, path = mkstemp(*self._args)
        close(fd) 

        # XXX: We currently only expose the name attribute
        # more can be added based on client needs in the future.
        self._name = path

        return self

    def __exit__(self, *args):
        import os
        os.remove(self.name)

    @property
    def name(self):
        """The path for the temporary file created.""" 
        return self._name

# Extend Tf.ScopeDescription using ContextDecorator so that it can also be
# used to decorate functions/methods.
import contextlib

class ScopeDescription(_ScopeDescription, contextlib.ContextDecorator):
    """This class lets us expose TfScopeDescription to python for use as a
    "context manager" object, for use with the 'with'-statement. For example:

        with Tf.ScopeDescription("Solving the halting problem"):
            # Code that solves the halting problem.

    It can also be used as a decorator for an entire function or method, for
    convenience:

        @Tf.ScopeDescription("Solving the halting problem");
        def SolveHaltingProblem():
            # Code that solves the halting problem.

    Note that the description passed to the decorator is an expression that is
    evaluated only once at declaration time. If a dynamic description is
    needed, use the with-statement pattern instead.
    """
    pass

class CatchAndRepostErrors(contextlib.ContextDecorator):
    """This context manager & decorator can be used to catch Tf.ErrorException
    and repost its held errors to the thread's Tf.Error list without raising a
    Python exception, halting unwinding.  For example, the following will raise
    a Tf.ErrorException containing the "test" Coding Error.  This will be
    caught by the CatchAndRepostErrors object, and the "test" Error will be
    re-posted to the thread's error list.  Then exception propagation will
    cease and ordinary control flow will continue.

        with Tf.CatchAndRepostErrors():
            Tf.RaiseCodingError('test')

    This can be useful to sidestep SIP's virtual function bindings from
    blocking exceptions, retaining Tf.Errors so they can propagate to callers.
    Here, the \`paintGL()\` virtual override can capture any Tf.ErrorExceptions
    raised during its execution, and by reposting the errors to the Tf.Error
    list, callers can observe them later.

        @Tf.CatchAndRepostErrors():
        def paintGL(self):
            self._renderer.Render()
    """

    def __enter__(self):
        return self

    def __exit__(self, excType, excValue, tb):
        return (RepostErrors(excValue)
                if isinstance(excValue, ErrorException)
                else False)

del contextlib
`,"/openusd/pxr/usd/usd/__init__.py":`#
# Copyright 2016 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.
#
from pxr import Tf
Tf.PreparePythonModule()
del Tf
`,"/openusd/pxr/usd/usd/usdGenSchema.py":`#!/pxrpythonsubst
#
# Copyright 2016 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.
#
"""
This script generates C++ classes and supporting Python code for USD Schemata.
It is driven by a USD layer (schema.usda) that defines the schema classes.

This USD layer must meet the following preconditions in order for code to be
generated that will compile and work with USD Core successfully:
    
    * Must specify the libraryName as layer metadata.
    * Schema typenames must be unique across all libraries.
    * Property names should be camelCased valid identifiers. 
    * All other tokens should be valid identifiers. Any invalid token will be
      converted using TfMakeValidIdentifier. If useLiteralIdentifier is set to
      false, all tokens will be converted to camelCased (if not already) just
      like property names.
    * usd/schema.usda must exist in the LayerStack, not necessarily as a 
      direct subLayer.
"""

import dataclasses
import sys, os, re, inspect
import keyword
from argparse import ArgumentParser
from collections import namedtuple

from jinja2 import Environment, FileSystemLoader
from jinja2.exceptions import TemplateNotFound, TemplateSyntaxError

# Need to set the environment variable for disabling the schema registry's 
# loading of schema type prim definitions before importing any pxr libraries,
# otherwise this setting won't take. We disable this to make sure we don't try 
# to load generatedSchema.usda files (which usdGenSchema generates) during 
# schema generation. We expect poorly formed or incorrect generatedSchema.usda
# to issue coding errors and we don't want those errors to cause failures in 
# this utility which would be used to repair poorly formed or incorrect 
# generatedSchema files.
os.environ["USD_DISABLE_PRIM_DEFINITIONS_FOR_USDGENSCHEMA"] = "1"
from pxr import Plug, Sdf, Usd, Vt, Tf

# Object used for printing. This gives us a way to control output with regards 
# to program arguments such as --quiet.
class _Printer():
    def __init__(self, quiet=False):
        self._quiet = quiet

    def __PrintImpl(self, stream, *args):
        if len(args):
            print(*args, file=stream)
        else:
            print(file=stream)

    def __call__(self, *args):
        if not self._quiet:
            self.__PrintImpl(sys.stdout, *args)

    def Err(self, *args):
        self.__PrintImpl(sys.stderr, *args)

    def SetQuiet(self, quiet):
        self._quiet = quiet

Print = _Printer()

#------------------------------------------------------------------------------#
# Tokens                                                                       #
#------------------------------------------------------------------------------#

# Name of script, e.g. "usdGenSchema"
PROGRAM_NAME = os.path.splitext(os.path.basename(sys.argv[0]))[0]

# Custom-data key authored on an API schema class prim in the schema definition,
# to define the type of API schema.
API_SCHEMA_TYPE = "apiSchemaType"

# Possible values for customData["apiSchemaType"] on an API schema class prim.
NON_APPLIED = "nonApplied"
SINGLE_APPLY = "singleApply"
MULTIPLE_APPLY = "multipleApply"
API_SCHEMA_TYPE_TOKENS = [NON_APPLIED, SINGLE_APPLY, MULTIPLE_APPLY]

# Custom-data key authored on a multiple-apply API schema class prim in the 
# schema definition, to define prefix for properties created by the API schema. 
PROPERTY_NAMESPACE_PREFIX = "propertyNamespacePrefix"

# Custom-data key optionally authored on a single-apply API schema class prim 
# in the schema definition to define a list of typed schemas that the API 
# schema will be automatically applied to in the schema registry. 
API_AUTO_APPLY = "apiSchemaAutoApplyTo"
API_CAN_ONLY_APPLY = "apiSchemaCanOnlyApplyTo"
API_ALLOWED_INSTANCE_NAMES = "apiSchemaAllowedInstanceNames"
API_SCHEMA_INSTANCES = "apiSchemaInstances"

# Custom-data key authored on a concrete typed schema class prim in the schema
# definition, to define fallbacks for the type that can be saved in root layer
# metadata to provide fallback types to versions of Usd without the schema 
# class type.
FALLBACK_TYPES = "fallbackTypes"

# The instance name placeholder for multiple apply schema template properties.
# This has a special meaning if found in a schema.usda.
INSTANCE_NAME_PLACEHOLDER = \\
    Usd.SchemaRegistry.MakeMultipleApplyNameTemplate("", "")

# Custom metadata tokens for user doc
USERDOC_BRIEF = "userDocBrief"
USERDOC_FULL = "userDoc"
# Arbitrarily picked max length for userDocBrief -- if we end up having to use
# documentation metadata as a fallback, we truncate to this length.
MAX_LENGTH_FOR_USERDOCBRIEF = 500

#------------------------------------------------------------------------------#
# Parsed Objects                                                               #
#------------------------------------------------------------------------------#

def _SanitizeDoc(doc, leader):
    """Cleanup the doc string in several ways:
      * Convert None to empty string
      * Replace new line chars with doxygen comments
      * Strip leading white space per line
    """
    if doc is None:
        return ''
    
    return leader.join([line.lstrip() for line in doc.split('\\n')])

def _ConvertDictionaryForJSON(d):
    """Convert a dictionary from scene description into a Python
    dict suitable for JSON encoding."""

    result = dict()
    for k, v in d.items():
        # Vt.Array must be converted to a regular Python list.
        if hasattr(v, "_isVtArray"):
            result[k] = list(v)
        elif isinstance(v, dict):
            result[k] = _ConvertDictionaryForJSON(v)
        else:
            result[k] = v
    return result

def _ListOpToList(listOp):
    """Apply listOp to an empty list, yielding a list."""
    return listOp.ApplyOperations([]) if listOp else []

def _GetDefiningLayerAndPrim(stage, schemaName):
    """ Searches the stage LayerStack for a prim whose name is equal to
        schemaName.
    """
    # SchemaBase is not actually defined in the core schema file, but this
    # behavior causes the code generator to produce correct C++ inheritance.
    if schemaName == 'SchemaBase':
        return (stage.GetLayerStack()[-1], None)
    
    else:
        for layer in stage.GetLayerStack():
            for sdfPrim in layer.rootPrims:
                if sdfPrim.name == schemaName:
                    return (layer, sdfPrim)

    raise Exception("Could not find the defining layer for schema: %s" % schemaName)
                    

def _GetLibMetadata(layer):
    """ Return a dictionary of library-specific data found in layer."""
    
    globalPrim = layer.GetPrimAtPath('/GLOBAL')
    if not globalPrim:
        raise Exception("Code generation requires a \\"/GLOBAL\\" prim with "
            "customData to define at least libraryName. GLOBAL prim not found.")
    
    if not globalPrim.customData:
        raise Exception("customData is either empty or not defined on /GLOBAL "
            "prim. At least \\"libraryName\\" entries in customData are required "
            "for code generation.")
    
    # Return a copy of customData to avoid accessing an invalid map proxy during
    # template rendering.
    return dict(globalPrim.customData)


def _GetLibName(layer):
    """ Return the libraryName defined in layer."""
    
    libData = _GetLibMetadata(layer)
    if 'libraryName' not in libData:
        raise Exception("Code generation requires that \\"libraryName\\" be defined "
            "in customData on /GLOBAL prim.")

    return libData['libraryName']
    

def _GetLibPath(layer):
    """ Return the libraryPath defined in layer."""

    if _SkipCodeGenForLayer(layer):
        return ""

    libData = _GetLibMetadata(layer)
    if 'libraryPath' not in libData: 
        raise Exception("Code generation requires that \\"libraryPath\\" be "
            "defined in customData on /GLOBAL prim or the schema must be "
            "declared codeless, by specifying skipCodeGeneration=true. "
            "The format for libraryPath is \\"path/to/lib\\".")

    return libData['libraryPath']


def _GetLibPrefix(layer):
    """ Return the libraryPrefix defined in layer. If not defined, fall
    back to ProperCase(libraryName). Used to prefix all class names"""
    
    return _GetLibMetadata(layer).get('libraryPrefix', 
        _ProperCase(_GetLibName(layer)))


def _GetLibTokens(layer):
    """ Return dictionary of library-wide tokens defined in layer. """
    return _GetLibMetadata(layer).get('libraryTokens', {})
    

def _GetTokensPrefix(layer):
    """ Return the tokensPrefix defined in layer."""

    return _GetLibMetadata(layer).get('tokensPrefix', 
        _GetLibPrefix(layer))


def _GetUseExportAPI(layer):
    """ Return the useExportAPI defined in layer."""

    return _GetLibMetadata(layer).get('useExportAPI', True)

def _SkipCodeGenForLayer(layer):
    """ Return whether the layer specifies that code generation should 
    be skipped for its schemas."""

    # This can be called on sublayers which may not necessarily have lib 
    # metadata so we can ignore exceptions and return false.
    try:
        return _GetLibMetadata(layer).get('skipCodeGeneration', False)
    except:
        return False

def _UseLiteralIdentifierForLayer(layer):
    """ Return whether the layer specifies useLiteralIdentifier metadata and 
    sets it to false, and hence is opting out of using literal identifiers in
    the generated tokens structs to instead use the old style of forced
    camelCase identifiers."""
    return _GetLibMetadata(layer).get('useLiteralIdentifier', True)

def _SkipCodeGenForSchemaLib(stage):
    """ Return whether the stage has a layer that specifies that code generation
    should be skipped for its schemas and therefore for the the entire schema
    library."""

    for layer in stage.GetLayerStack():
        if _SkipCodeGenForLayer(layer):
            return True
    return False
    
def _UpperCase(aString):
    return aString.upper()


def _LowerCase(aString):
    return aString.lower()


def _ProperCase(aString):
    """Returns the given string (camelCase or ProperCase) in ProperCase,
        stripping out any non-alphanumeric characters.
    """
    if len(aString) > 1:
        return ''.join([s[0].upper() + s[1:] for s in re.split(r'\\W+', aString) \\
            if len(s) > 0])
    else:
        return aString.upper()


def _CamelCase(aString):
    """Returns the given string (camelCase or ProperCase) in camelCase,
        stripping out any non-alphanumeric characters.
    """
    if len(aString) > 1:
        pcase = _ProperCase(aString)
        return pcase[0].lower() + pcase[1:]
    else:
        return aString.lower()

    
Token = namedtuple('Token', ['id', 'value', 'desc'])

def _GetNameAndGeneratedSchemaPropNameForPropInfo(sdfPropName, classInfo):
    if classInfo.propertyNamespace:
        # A property namespace prefix will only exist for multiple apply API
        # schemas and is used to create the instanceable namespace prefix 
        # prepended to all its properties. We prepend this instanceable 
        # prefix to the raw name here.
        generatedSchemaPropName = \\
            Usd.SchemaRegistry.MakeMultipleApplyNameTemplate(
                classInfo.propertyNamespace.prefix, sdfPropName)
        # Since the property info's name is used to create the identifier 
        # used for tokens and such, we make it from the instanced property 
        # name with the instance name placeholder replaced with 
        # "_MultipleApplyTemplate_". This is so we don't end up with an
        # the implementation detail of "__INSTANCE_NAME__" in the identifier
        # itself.
        name = _CamelCase(
            Usd.SchemaRegistry.MakeMultipleApplyNameInstance(
                generatedSchemaPropName, "_MultipleApplyTemplate_"))
    else:
        generatedSchemaPropName = sdfPropName
        # For property names, camelCase all tokens irrespective of
        # useLiteralIdentifier, so that we are consistent in our attribute
        # naming when namespace prefix are provided and respect our coding
        # convention. (Example: namespacePrefix:attrName ->
        # namespacePrefixAttrName)
        name = _MakeValidToken(sdfPropName, False)
    return (name, generatedSchemaPropName)

class PropInfo(object):
    class CodeGen:
        """Specifies how code gen constructs get methods for a property
        
        - generated: Auto generate the full Public API
        - custom: Generate the header only. User responsible for implementation.
        
        See documentation on Generating Schemas for more information.
        """
        Generated = 'generated'
        Custom = 'custom'
        
    def __init__(self, sdfProp, classInfo):
        # Allow user to specify custom naming through customData metadata.
        self.customData = dict(sdfProp.customData)

        sdfPropName = sdfProp.name
        # If the property name in the layer exactly matches the multiple apply 
        # API schema instance name placeholder, it indicates the special intention
        # defining the "{nameSpacePrefix}:{instanceName}" property in the 
        # generatedSchema. This would be the equivalent of definining a property
        # with an empty base name in the source schema.usda, but since an empty
        # property name is not allowed, we treat this case as if it were an empty
        # property name for generation purposes.
        if sdfPropName == INSTANCE_NAME_PLACEHOLDER:
            sdfPropName = ""

        self.name, self.generatedSchemaPropName = \\
            _GetNameAndGeneratedSchemaPropNameForPropInfo(
                sdfPropName, classInfo)

        self.tokenId = _MakeValidTokenId(self.name)

        # Determine if this property will be an API schema override in the 
        # flattened stage.
        self.isAPISchemaOverride = self.customData.get(
            'apiSchemaOverride', False)

        # If the property is an API schema override, force the apiName to
        # empty so it isn't added to any of the C++ API
        if self.isAPISchemaOverride:
            self.apiName = ''
        else:
            self.apiName = self.customData.get(
                'apiName', _CamelCase(sdfPropName))
        self.apiGet = self.customData.get(
            'apiGetImplementation', self.CodeGen.Generated)
        if self.apiGet not in [self.CodeGen.Generated, self.CodeGen.Custom]:
            Print.Err("Token '%s' is not valid." % self.apiGet)
        self.doc = _SanitizeDoc(sdfProp.documentation, '\\n    /// ')
        # Keep around the property spec so that we can pull any other data we
        # may need from it.
        self._sdfPropSpec = sdfProp
        # Also keep a reference to the layer so that it doesn't close while 
        # we're still holding on to one of its property specs.
        self._layer = sdfProp.layer

    # Anything that isn't explicitly set as an attribute in the PropInfo, we can
    # fall back to grabbing directly from the SdfProperty spec if requested.
    def __getattr__(self, attr):
        return getattr(self._sdfPropSpec, attr)

class RelInfo(PropInfo):
    def __init__(self, sdfProp, classInfo):
        super(RelInfo, self).__init__(sdfProp, classInfo)

# Map an Sdf.ValueTypeName.XXX object to the 'XXX' token string -- we use this
# to go from sdf attribute types to their symbolic tokens, for example:
# Sdf.ValueTypeNames.UInt -> 'UInt'.
valueTypeNameToStr = dict(
    [(getattr(Sdf.ValueTypeNames, n), n)
     for n in dir(Sdf.ValueTypeNames)
     if isinstance(getattr(Sdf.ValueTypeNames, n), Sdf.ValueTypeName)])

def _GetSchemaDefException(msg, path):
    errorPrefix = ('Invalid schema definition at ' 
                   + '<' + str(path) + '>')
    errorSuffix = ('See '
                   'https://openusd.org/release/api/'
                   '_usd__page__generating_schemas.html '
                   'for more information.\\n')
    errorMsg = lambda s: errorPrefix + '\\n' + s + '\\n' + errorSuffix
    return Exception(errorMsg(msg))

class AttrInfo(PropInfo):
    def __init__(self, sdfProp, classInfo):
        super(AttrInfo, self).__init__(sdfProp, classInfo)
        self.allowedTokens = sdfProp.GetInfo('allowedTokens')
        
        self.variability = str(sdfProp.variability).replace('Sdf.', 'Sdf')
        self.fallback = sdfProp.default
        self.typeName = sdfProp.typeName

        if sdfProp.typeName not in valueTypeNameToStr:
            raise _GetSchemaDefException(
                        "Code generation requires that all attributes "
                        "have a known type "
                        "(<%s> has type '%s', which is not a member of "
                        "Sdf.ValueTypeNames.)"
                        % (sdfProp.path, sdfProp.typeName), sdfProp.path)
        else:
            self.usdType = "SdfValueTypeNames->%s" % (
                valueTypeNameToStr[sdfProp.typeName])

        self.details = [
            ('Declaration', '\`%s\`' % _GetAttrDeclaration(sdfProp)),
            ('C++ Type', self.typeName.cppTypeName),
            ('\\\\ref Usd_Datatypes "Usd Type"', self.usdType),
        ]

        if self.variability == "SdfVariabilityUniform":
            self.details.append(('\\\\ref SdfVariability "Variability"', self.variability))

        if self.allowedTokens:
            tokenListStr = ', '.join(
                [x if x else '""' for x in self.allowedTokens])
            self.details.append(('\\\\ref ' + \\
                _GetTokensPrefix(sdfProp.layer) + \\
                'Tokens "Allowed Values"', tokenListStr))


def _GetAttrDeclaration(attrSpec):
    anon = Sdf.Layer.CreateAnonymous()
    ps = Sdf.PrimSpec(anon, '_', Sdf.SpecifierDef)
    tmpAttr = Sdf.AttributeSpec(ps, attrSpec.name, attrSpec.typeName, attrSpec.variability)
    tmpAttr.default = attrSpec.default
    return tmpAttr.GetAsText().strip()


def _ExtractNames(sdfPrim, customData):
    usdPrimTypeName = sdfPrim.path.name
    className = customData.get('className', _ProperCase(usdPrimTypeName))
    cppClassName = _GetLibPrefix(sdfPrim.layer) + className
    baseFileName = customData.get('fileName', _CamelCase(className))
    
    return usdPrimTypeName, className, cppClassName, baseFileName

def _FindAllInherits(p):
    if p.GetMetadata('inheritPaths'):
        inherits = list(p.GetMetadata('inheritPaths').ApplyOperations([]))
    else:
        inherits = []
    for path in inherits:
        p2 = p.GetStage().GetPrimAtPath(path)
        if p2:
            inherits += _FindAllInherits(p2)
    return inherits

# Determines if a prim 'p' inherits from Typed
def _IsTyped(p):
    return Sdf.Path('/Typed') in set(_FindAllInherits(p))

# Determines if a prim 'p' inherits from schema prim that would be in the same
# schema family.
def _InheritsOwnFamily(p):
    allInheritedFamilies = [
        Usd.SchemaRegistry.ParseSchemaFamilyAndVersionFromIdentifier(path.name)[0] 
        for path in _FindAllInherits(p)]
    family, _ =  Usd.SchemaRegistry.ParseSchemaFamilyAndVersionFromIdentifier(
        p.GetPath().name)
    return family in allInheritedFamilies

@dataclasses.dataclass
class MultiApplyPropertyNamespace:
    prefix : str
    token : str

    @classmethod
    def Create(cls, prefix, useLiteralIdentifier):
        return cls(prefix, _MakeValidTokenId(prefix, useLiteralIdentifier)) \\
               if prefix else None


class ClassInfo(object):
    def __init__(self, usdPrim, sdfPrim, useLiteralIdentifier=False):
        # First validate proper class naming...
        if (sdfPrim.typeName != sdfPrim.path.name and
            sdfPrim.typeName != ''):
            raise _GetSchemaDefException(
                "Code generation requires that every instantiable "
                "class's name must match its declared type "
                "('%s' and '%s' do not match.)" % 
                (sdfPrim.typeName, sdfPrim.path.name), sdfPrim.path)
        
        # NOTE: usdPrim should ONLY be used for querying information regarding
        # the class's parent in order to avoid duplicating class members during
        # code generation.
        inherits = usdPrim.GetMetadata('inheritPaths') 
        inheritsList = _ListOpToList(inherits)

        # We do not allow multiple inheritance 
        numInherits = len(inheritsList)
        if numInherits > 1:
            raise _GetSchemaDefException(
                'Schemas can only inherit from one other schema '
                'at most. This schema inherits from %d (%s).' 
                 % (numInherits, ', '.join(map(str, inheritsList))), 
                 sdfPrim.path)

        # Allow user to specify custom naming through customData metadata.
        self.customData = dict(sdfPrim.customData)

        # For token identifiers
        self.useLiteralIdentifier = useLiteralIdentifier

        # For accumulation of AttrInfo objects
        self.attrs = {}
        self.rels = {}
        self.attrOrder = []
        self.relOrder = []
        self.propertyOrder = []
        self.apiSchemaOverridePropertyNames = []
        self.tokens = set()

        # Important names
        (self.usdPrimTypeName,
         self.className,
         self.cppClassName,
         self.baseFileName) = _ExtractNames(sdfPrim, self.customData)

        self.parentCppClassName = ''

        # We must also hold onto the authored prim name in schema.usda
        # for cases in which we must differentiate that from the authored
        # className in customdata. For example, UsdModelAPI vs UsdGeomModelAPI
        self.primName = sdfPrim.path.name

        # Class Parent's Info
        parentClass = inheritsList[0].name if inheritsList else 'SchemaBase'
        (parentLayer,
         parentPrim) = _GetDefiningLayerAndPrim(usdPrim.GetStage(), parentClass)
        self.parentLibPath = _GetLibPath(parentLayer)
        parentCustomData = {}
        if parentPrim is not None:
            parentCustomData = dict(parentPrim.customData)
            (parentUsdName, parentClassName,
             self.parentCppClassName, self.parentBaseFileName) = \\
             _ExtractNames(parentPrim, parentCustomData)
        # Only Typed and APISchemaBase are allowed to have no inherits, since 
        # these are the core base types for all the typed and API schemas 
        # respectively.
        elif self.cppClassName in ["UsdTyped", 'UsdAPISchemaBase']:
            self.parentCppClassName = "UsdSchemaBase"
            self.parentBaseFileName = "schemaBase"

        # Extra Class Metadata
        self.doc = _SanitizeDoc(sdfPrim.documentation, '\\n/// ')
        self.typeName = sdfPrim.typeName
        self.extraIncludes = self.customData.get('extraIncludes', None)

        # Built-in API schemas metadata.
        #
        # We get metadata which is the token list op directly authored for the 
        # schema class (does not include inherited API schemas from parent 
        # classes)
        self.apiSchemasMetadata = sdfPrim.GetInfo('apiSchemas')

        # We also get the full list of authored applied API schemas directly
        # from the USD prim. This will contain the API schemas authored in the
        # parent classes.
        self.allAppliedAPISchemas = \\
            usdPrim.GetPrimTypeInfo().GetAppliedAPISchemas()

        # If a type specifies applied API schemas as built-in it must specify
        # them as a prepend. I.e. schema types can only add additional applied
        # API schemas that will be stronger then any inherited built-in API
        # schemas from parent classes.
        if self.apiSchemasMetadata != Sdf.TokenListOp():
            if (self.apiSchemasMetadata.isExplicit or
                    self.apiSchemasMetadata.addedItems or
                    self.apiSchemasMetadata.deletedItems or
                    self.apiSchemasMetadata.explicitItems or
                    self.apiSchemasMetadata.orderedItems) :
                raise _GetSchemaDefException(
                    "The 'apiSchemas' metadata list operation is only allowed "
                    "to prepend API schemas.", sdfPrim.path)

        # Do not to inherit the type name of parent classes.
        if inherits:
            for path in inherits.GetAddedOrExplicitItems():
                parentPrim = parentLayer.GetPrimAtPath(path)
                if not parentPrim:
                    raise _GetSchemaDefException(
                        f"The inherited prim <{path}> is not valid",
                        sdfPrim.path)
                parentTypeName = parentPrim.typeName
                if parentTypeName == self.typeName:
                    self.typeName = ''

        self.isConcrete = bool(self.typeName)
        self.isTyped = _IsTyped(usdPrim)
        self.isTypedBase = self.cppClassName == 'UsdTyped'
        self.isAPISchemaBase = self.cppClassName == 'UsdAPISchemaBase'

        self.fallbackPrimTypes = self.customData.get(FALLBACK_TYPES)

        self.isApi = not self.isTyped and not self.isConcrete and \\
                not self.isAPISchemaBase and not self.isTypedBase
        self.apiSchemaType = self.customData.get(API_SCHEMA_TYPE, 
                SINGLE_APPLY if self.isApi else None)
        self.propertyNamespace = MultiApplyPropertyNamespace.Create(
            self.customData.get(PROPERTY_NAMESPACE_PREFIX),
            useLiteralIdentifier
        )
        self.apiAutoApply = self.customData.get(API_AUTO_APPLY)
        self.apiCanOnlyApply = self.customData.get(API_CAN_ONLY_APPLY)
        self.apiAllowedInstanceNames = self.customData.get(
            API_ALLOWED_INSTANCE_NAMES)
        self.apiSchemaInstances = self.customData.get(API_SCHEMA_INSTANCES)

        if _InheritsOwnFamily(usdPrim):
            raise _GetSchemaDefException(
                "Invalid inheritance: A schema cannot directly or indirectly "
                "inherit from another schema in the same schema family.",
                sdfPrim.path)

        if self.apiSchemaType != MULTIPLE_APPLY:
            if self.propertyNamespace:
                raise _GetSchemaDefException(
                    "%s should only be used as a customData field on "
                    "multiple-apply API schemas." % PROPERTY_NAMESPACE_PREFIX,
                    sdfPrim.path)

            if self.apiAllowedInstanceNames:
                raise _GetSchemaDefException(
                    "%s should only be used as a customData field on "
                    "multiple-apply API schemas." % API_ALLOWED_INSTANCE_NAMES,
                    sdfPrim.path)

            if self.apiSchemaInstances:
                raise _GetSchemaDefException(
                    "%s should only be used as a customData field on "
                    "multiple-apply API schemas." % API_SCHEMA_INSTANCES,
                    sdfPrim.path)

        if self.isApi and \\
           self.apiSchemaType not in API_SCHEMA_TYPE_TOKENS:
            raise _GetSchemaDefException(
                "CustomData 'apiSchemaType' is %s. It must be one of %s for an "
                "API schema." % (self.apiSchemaType, API_SCHEMA_TYPE_TOKENS),
                sdfPrim.path)

        if self.apiAutoApply and self.apiSchemaType != SINGLE_APPLY:
            raise _GetSchemaDefException("%s should only be used as a "
                "customData field on single-apply API schemas." % API_AUTO_APPLY,
                sdfPrim.path)

        self.isAppliedAPISchema = \\
            self.apiSchemaType in [SINGLE_APPLY, MULTIPLE_APPLY]
        self.isMultipleApply = self.apiSchemaType == MULTIPLE_APPLY

        if self.apiCanOnlyApply and not self.isAppliedAPISchema:
            raise _GetSchemaDefException("%s should only be used as a "
                "customData field on applied API schemas." % API_CAN_ONLY_APPLY,
                sdfPrim.path)
        if self.isApi:
            if not self.isAppliedAPISchema:
                self.schemaKind = "nonAppliedAPI";
            elif self.isMultipleApply:
                self.schemaKind = "multipleApplyAPI"
            else:
                self.schemaKind = "singleApplyAPI"
        elif self.isTyped and not self.isTypedBase:
            if self.isConcrete:
                self.schemaKind = "concreteTyped"
            else:
                self.schemaKind = "abstractTyped"
        else:
            self.schemaKind = "abstractBase"
        self.schemaKindEnumValue = "UsdSchemaKind::" + _ProperCase(self.schemaKind)

        if self.isConcrete and not self.isTyped:
            raise _GetSchemaDefException('Schema classes must either inherit '
                                'Typed(IsA), or neither inherit typed '
                                'nor provide a typename(API).',
                                sdfPrim.path)

        if not Usd.SchemaRegistry.IsAllowedSchemaIdentifier(sdfPrim.path.name) :
            raise _GetSchemaDefException(
                'Schema name is not an allowed schema identifier.', 
                sdfPrim.path)

        self.family, self.version = \\
            Usd.SchemaRegistry.ParseSchemaFamilyAndVersionFromIdentifier(
                sdfPrim.path.name)

        if self.isApi and sdfPrim.path.name != "APISchemaBase" and \\
            not self.family.endswith('API'):
            raise _GetSchemaDefException(
                'API schemas must be named with an API suffix.', 
                sdfPrim.path)
        
        if self.isTyped and self.family.endswith('API'):
            raise _GetSchemaDefException(
                'Typed schemas cannot be named with an API suffix.', 
                sdfPrim.path)

        if self.isApi and sdfPrim.path.name != "APISchemaBase" and \\
                self.parentCppClassName != "UsdAPISchemaBase":
            if self.isAppliedAPISchema: 
                raise _GetSchemaDefException(
                    "Applied API schemas must explicitly inherit directly "
                    "from APISchemaBase.", 
                    sdfPrim.path)
            elif parentCustomData.get(API_SCHEMA_TYPE) != NON_APPLIED:
                raise _GetSchemaDefException(
                    "Non-applied API schemas must inherit directly from "
                    "APISchemaBase or another non-applied API schema.", 
                    sdfPrim.path)

        if not self.isApi and self.isAppliedAPISchema:
            raise _GetSchemaDefException(
                'Non API schemas cannot have non-empty apiSchemaType value.', 
                sdfPrim.path)
        
        if self.fallbackPrimTypes and not self.isConcrete:
            raise _GetSchemaDefException(
                "fallbackPrimTypes can only be used as a customData field on "
                "concrete typed schema classes", sdfPrim.path)

    def GetHeaderFile(self):
        return self.baseFileName + '.h'

    def GetParentHeaderFile(self):
        return self.parentBaseFileName + '.h'

    def GetCppFile(self):
        return self.baseFileName + '.cpp'

    def GetWrapFile(self):
        return 'wrap' + self.className + '.cpp'


#------------------------------------------------------------------------------#
# USD PARSER                                                                   #
#------------------------------------------------------------------------------#

def _ValidateFields(spec):
    # The schema registry will ignore these fields if they are discovered 
    # in a generatedSchema.usda file, but we want to allow them in schema.usda.
    includeList = ["inheritPaths", "customData", "specifier"]

    invalidFields = [key for key in spec.ListInfoKeys()
        if Usd.SchemaRegistry.IsDisallowedField(key) and key not in includeList]
    if not invalidFields:
        return True

    for key in invalidFields:
        if key == Sdf.RelationshipSpec.TargetsKey:
            Print.Err("ERROR: Relationship targets on <%s> cannot be "
                      "specified in a schema." % spec.path)
        elif key == Sdf.AttributeSpec.ConnectionPathsKey:
            Print.Err("ERROR: Attribute connections on <%s> cannot be "
                      "specified in a schema." % spec.path)
        else:
            Print.Err("ERROR: Fallback values for '%s' on <%s> cannot be "
                      "specified in a schema." % (key, spec.path))
    return False

def GetClassInfo(classes, cppClassName):
    for c in classes:
        if c.cppClassName == cppClassName:
            return c
    return None

def _MakeMultipleApplySchemaNameTemplate(apiSchemaName):
    # Multiple apply API schemas are allowed to specify other built-in 
    # mulitple apply API schemas with or without a sub-instance name.
    # For example a multiple apply API schema named "MultiApplyAPI" can include
    # the metadata:
    #
    #     prepend apiSchemas = ["OtherMultiApplyAPI", "AnotherMultiApplyAPI:foo"]
    #
    # Since a multiple apply API schema is always applied with an instance name,
    # its built-in API schemas will also need to be applied using the same 
    # instance name. Thus, we convert the authored built-in API schema names 
    # into template names in the generatedSchema just like we do for property
    # names.
    #
    # This function would convert the example built-in API schema names above to
    #   "OtherMultiApplyAPI:__INSTANCE_NAME__" and 
    #   "AnotherMultiApplyAPI:__INSTANCE_NAME__:foo"
    # 
    # This templating allows the schema registry to determine that when 
    # MultiApplyAPI is applied with an instance name like "bar", that 
    # OtherMultiApplyAPI also needs to be applied with instance name "bar" and 
    # AnotherMultiApplyAPI needs to be applied with the instance name "bar:foo".
    typeName, instanceName = \\
        Usd.SchemaRegistry.GetTypeNameAndInstance(apiSchemaName)
    return Usd.SchemaRegistry.MakeMultipleApplyNameTemplate(
        typeName, instanceName) 

# Gets the full list of API schema property overrides for the schema prim. We
# use the USD prim because we need to know all override properties for the 
# flattened schema class, so this will include any overrides provided purely 
# through inheritance.
def _GetAPISchemaOverridePropertyNames(usdPrim, propertyNamespace):
    apiSchemaOverridePropertyNames = []

    for usdProp in usdPrim.GetProperties():
        # We grab the property stack which gives us the property spec for every
        # inherited schema class that defines this property.
        propStack = usdProp.GetPropertyStack(Usd.TimeCode.Default())
        
        # Skip if the first and strongest property spec does not define the 
        # property as an API schema override.
        if not propStack[0].customData.get('apiSchemaOverride', False):
            continue

        # If a property is set as an API schema override, we need to verify that
        # in every base class that also defines the property, the property is 
        # also set to be an API schema override.
        #
        # We do this because we need to ensure that if a base class defines a 
        # property as not being an API schema override property (it is a 
        # concrete property of the class) that no class that derives from it
        # is allowed to change that property into being an API schema override.
        # This is important since API schema overrides will only be added to a
        # schema's prim definition if an included API schema actually defines
        # the property. Changing a property from a base class into an API schema
        # override may have the effect of deleting that base class property from
        # the derived class if that property isn't defined in one of its
        # built-in API schemas. We don't want a to introduce a backdoor way of
        # deleting properties in derived classes.
        # 
        # Note that we do allow derived classes to convert an API schema 
        # override into a concrete defined property.
        for prop in propStack[1:]:
            # Check that each property spec for this property has 
            # 'apiSchemaOverride = true' in its customData
            if not prop.customData.get('apiSchemaOverride', False):
                raise _GetSchemaDefException(
                    "Invalid schema property definition encountered while "
                    "processing property %s.\\n"
                    "Property declarations in schema classes cannot set "
                    "'apiSchemaOverride=true' on properties which exist in their "
                    "inherited classes but are not already defined as API schemas "
                    "overrides." 
                    % usdProp.GetPath(), 
                     prop.path)

        propName = usdProp.GetName()
        # A property namespace prefix will be provides for multiple apply API 
        # schemas. If so, the property names need to be converted into their
        # template names to match the properties that will be in the 
        # generatedSchema.
        if propertyNamespace:
            propName = Usd.SchemaRegistry.MakeMultipleApplyNameTemplate(
                propertyNamespace.prefix, propName)

        # Add the property name to the list.
        apiSchemaOverridePropertyNames.append(propName)
           
    return apiSchemaOverridePropertyNames          

def _GenerateClassInfo(stage, sdfPrims, useLiteralIdentifier):
    classes = []
    classInfos = dict()
    hasInvalidFields = False

    # PARSE CLASSES
    for sdfPrim in sdfPrims:  
        if sdfPrim.specifier != Sdf.SpecifierClass:
            continue

        if not _ValidateFields(sdfPrim):
            hasInvalidFields = True

        usdPrim = stage.GetPrimAtPath(sdfPrim.path)
        classInfo = ClassInfo(usdPrim, sdfPrim, useLiteralIdentifier)

        # make sure that if we have a multiple-apply schema with a property
        # namespace prefix that the prim actually has some properties
        if classInfo.apiSchemaType == MULTIPLE_APPLY:
            if classInfo.propertyNamespace and \\
                len(sdfPrim.properties) == 0:
                    raise _GetSchemaDefException(
                        "Multiple-apply schemas that have the "
                        "propertyNamespacePrefix metadata fields must have at "
                        "least one property", sdfPrim.path)
            if not classInfo.propertyNamespace and \\
                not len(sdfPrim.properties) == 0:
                    raise _GetSchemaDefException(
                        "Multiple-apply schemas that do not"
                        "have a propertyNamespacePrefix metadata field must "
                        "have zero properties", sdfPrim.path)

            # Templatize all the included API schema names for this multiple
            # apply API (see _MakeMultipleApplySchemaNameTemplate for the
            # explanation as to why).
            classInfo.allAppliedAPISchemas = [
                _MakeMultipleApplySchemaNameTemplate(s) 
                for s in classInfo.allAppliedAPISchemas]
            classInfo.apiSchemasMetadata.prependedItems = [
                _MakeMultipleApplySchemaNameTemplate(s) 
                for s in classInfo.apiSchemasMetadata.prependedItems]

        classes.append(classInfo)
        classInfos[classInfo.usdPrimTypeName] = classInfo

        # Store property order 
        for propName in sdfPrim.propertyOrder:
            name, _ = _GetNameAndGeneratedSchemaPropNameForPropInfo(
                propName, classInfo)
            classInfo.propertyOrder.append(name)

        #
        # We don't want to use the composed property names here because we only
        # want the local properties declared directly on the class, which the
        # "properties" metadata field provides.
        #
        attrApiNames = []
        relApiNames = []
        for sdfProp in sdfPrim.properties:

            if not _ValidateFields(sdfProp):
                hasInvalidFields = True

            # Attribute
            if isinstance(sdfProp, Sdf.AttributeSpec):
                attrInfo = AttrInfo(sdfProp, classInfo)

                # Assert unique attribute names
                if (attrInfo.apiName != ''):
                    if attrInfo.name in classInfo.attrs:
                        raise Exception(
                            'Schema Attribute names must be unique, '
                            'irrespective of namespacing. '
                            'Duplicate name encountered: %s.%s' %
                            (classInfo.usdPrimTypeName, attrInfo.name))
                    elif attrInfo.apiName in attrApiNames:
                        raise Exception(
                            'Schema Attribute API names must be unique. '
                            'Duplicate apiName encountered: %s.%s' %
                            (classInfo.usdPrimTypeName, attrInfo.apiName))
                    else:
                        attrApiNames.append(attrInfo.apiName)
                classInfo.attrs[attrInfo.name] = attrInfo
                classInfo.attrOrder.append(attrInfo.name)

            # Relationship
            else:
                relInfo = RelInfo(sdfProp, classInfo)

                # Assert unique relationship names
                if (relInfo.apiName != ''):
                    if relInfo.name in classInfo.rels: 
                        raise Exception(
                            'Schema Relationship names must be unique, '
                            'irrespective of namespacing. '
                            'Duplicate name encountered: %s.%s' %
                            (classInfo.usdPrimTypeName, relInfo.name))
                    elif relInfo.apiName in relApiNames:
                        raise Exception(
                            'Schema Relationship API names must be unique. '
                            'Duplicate apiName encountered: %s.%s' %
                            (classInfo.usdPrimTypeName, relInfo.apiName))
                    else:
                        relApiNames.append(relInfo.apiName)
                classInfo.rels[relInfo.name] = relInfo
                classInfo.relOrder.append(relInfo.name)

        # Get all the API schema override properties declared for this class as
        # they need to appear in the generatedSchema. This includes any 
        # inherited override properties base class schemas. The properties are
        # also properly prefixed with the namespace template for multiple apply
        # schemas.
        classInfo.apiSchemaOverridePropertyNames = \\
            _GetAPISchemaOverridePropertyNames(
                usdPrim, classInfo.propertyNamespace)
        
        if hasInvalidFields:
            raise Exception('Invalid fields specified in schema.')
        
    return classes, classInfos
    
def ParseUsd(usdFilePath):
    sdfLayer = Sdf.Layer.FindOrOpen(usdFilePath)
    stage = Usd.Stage.Open(sdfLayer)
    allSchemas = []

    # Node that we do not want to auto promote the stage to use literal
    # identifier if all any of the layers (this or sublayers) defined it. But we
    # just care of the sdfLayer of the schema being generated, and hence only
    # query the presence of useLiteralIdentifier on the sdfLayer metadata.
    useLiteralIdentifier = _UseLiteralIdentifierForLayer(sdfLayer)
    classes, classInfos = _GenerateClassInfo(stage, sdfLayer.rootPrims, useLiteralIdentifier)

    # Compile list of all reflected API schemas for this module's schemas
    reflectedSchemas = []
    for sdfPrim in sdfLayer.rootPrims:
        if 'reflectedAPISchemas' in sdfPrim.customData:
            reflectedSchemas.extend(sdfPrim.customData['reflectedAPISchemas'])

    # Find the sdfPrim for each reflected schema
    for usdPrim in stage.TraverseAll():
        if usdPrim.GetName() in reflectedSchemas:
            allSchemas.append(usdPrim.GetPrimStack()[0])

    allSchemas.extend(sdfLayer.rootPrims)

    # Store information about reflected API schemas
    # for use in later code generation
    _, reflectedClassInfos = _GenerateClassInfo(stage, allSchemas, useLiteralIdentifier)
    reflectedClassInfos.update(classInfos)

    for classInfo in classes:
        # If this is an applied API schema that does not inherit from 
        # UsdAPISchemaBase directly, ensure that the parent class is also 
        # an applied API Schema.
        if classInfo.isApi and classInfo.parentCppClassName!='UsdAPISchemaBase':
            parentClassInfo = GetClassInfo(classes, classInfo.parentCppClassName)
            if parentClassInfo:
                if parentClassInfo.isAppliedAPISchema != \\
                        classInfo.isAppliedAPISchema:
                    raise Exception("API schema '%s' inherits from incompatible "
                        "base API schema '%s'. Both must be either applied API "
                        "schemas or non-applied API schemas." %
                        (classInfo.cppClassName, parentClassInfo.cppClassName))
                if parentClassInfo.isMultipleApply != \\
                        classInfo.isMultipleApply:
                    raise Exception("API schema '%s' inherits from incompatible "
                        "base API schema '%s'. Both must be either single-apply "
                        "or multiple-apply." % (classInfo.cppClassName,
                        parentClassInfo.cppClassName))
            else:
                parentClassTfType = Tf.Type.FindByName(
                        classInfo.parentCppClassName)
                if parentClassTfType and parentClassTfType != Tf.Type.Unknown:
                    if classInfo.isAppliedAPISchema != \\
                        Usd.SchemaRegistry().IsAppliedAPISchema(parentClassTfType):
                        raise Exception("API schema '%s' inherits from "
                            "incompatible base API schema '%s'. Both must be "
                            "either applied API schemas or non-applied API "
                            " schemas." % (classInfo.cppClassName,
                            parentClassInfo.cppClassName))
                    if classInfo.isMultipleApply != \\
                        Usd.SchemaRegistry().IsMultipleApplyAPISchema(
                                parentClassTfType):
                        raise Exception("API schema '%s' inherits from "
                        "incompatible base API schema '%s'. Both must be either" 
                        " single-apply or multiple-apply." % 
                        (classInfo.cppClassName,  parentClassInfo.cppClassName))
        
    return (_GetLibName(sdfLayer),
            _GetLibPath(sdfLayer),
            _GetLibPrefix(sdfLayer),
            _GetTokensPrefix(sdfLayer),
            _GetUseExportAPI(sdfLayer),
            _GetLibTokens(sdfLayer),
            _SkipCodeGenForSchemaLib(stage),
            classes, reflectedClassInfos)


#------------------------------------------------------------------------------#
# CODE GENERATOR                                                               #
#------------------------------------------------------------------------------#

def _WriteFile(filePath, content, validate):
    import difflib

    # If file currently exists and content is unchanged, do nothing.
    existingContent = '\\n'
    content = (content + '\\n'
               if content and not content.endswith('\\n') else content)
    if os.path.exists(filePath):
        with open(filePath, 'r') as fp:
            existingContent = fp.read()
        if existingContent == content:
            Print('\\tunchanged %s' % filePath)
            return

        # In validation mode, we just want to see if the code being generated
        # would differ from the code that currently exists without writing
        # anything out. So just generate a diff and bail out immediately.
        if validate:
            Print('Diff: ')
            Print('\\n'.join(difflib.unified_diff(
                                existingContent.split('\\n'),
                                content.split('\\n'))))
            Print.Err('Error: validation failed, diffs found. '
                      'Please rerun %s.' % PROGRAM_NAME)
            sys.exit(1)
    else:
        if validate:
            Print.Err('Error: validation failed, file %s does not exist. '
                      'Please rerun %s.' % 
                      (os.path.basename(filePath), PROGRAM_NAME))
            sys.exit(1)

    # Otherwise attempt to write to file.
    try:
        with open(filePath, 'w') as curfile:
            curfile.write(content)
            Print('\\t    wrote %s' % filePath)
    except IOError as ioe:
        Print.Err('\\t ', ioe)

def _ExtractCustomCode(filePath, default=None):
    defaultTxt = default if default else ''
    
    if not os.path.exists(filePath):
        return defaultTxt

    try:
        with open(filePath, 'r') as src:
            existing = src.read()
            parts = existing.split('// --(BEGIN CUSTOM CODE)--\\n')
            if len(parts) != 2 or not parts[1].strip():
                return defaultTxt
            return parts[1]
                
    except Exception as e:
        Print.Err(e)
        return defaultTxt

def _MakeValidToken(tokenId, useLiteralIdentifier):
    originalToken = tokenId
    # If token begins with a digit, then prefix it with an '_',
    # TfMakeValidIdentifier currently replaced the digit with an '_' for such
    # tokens.
    if tokenId[0].isdigit():
        tokenId = '_' + tokenId
    if not useLiteralIdentifier or ':' in tokenId:
        tokenId = _CamelCase(tokenId)
    # Note that at this point default behavior of using camelCase for all
    # identifier will result in a valid token, and hence a call to
    # MakeValidIdentifier will only be made for schema libraries using
    # useLiteralIdentifier and when a valid token was not provided, example
    # tokens with non-alphanumeric characters (excluding ':', as its
    # already covered above).
    if not Tf.IsValidIdentifier(tokenId):
        tokenId = Tf.MakeValidIdentifier(tokenId)
        Print('Updated token {0} to a valid identifier {1}'.format( \\
                originalToken, tokenId))
    return tokenId

def _MakeValidTokenId(tokenId, useLiteralIdentifier=False):

    cppReservedKeywords = [
        "alignas", "alignof", "and", "and_eq", "asm", "atomic_cancel",
        "atomic_commit", "atomic_noexcept", "auto", "bitand", "bitor", "bool",
        "break", "case", "catch", "char", "char8_t", "char16_t", "char32_t",
        "class", "compl", "concept", "const", "consteval", "constexpr",
        "constinit", "const_cast", "continue", "co_await", "co_return",
        "co_yield", "decltype", "default", "delete", "do", "double",
        "dynamic_cast", "else", "enum", "explicit", "export", "extern", "false",
        "float", "for", "friend", "goto", "if", "inline", "int", "long",
        "mutable", "namespace", "new", "noexcept", "not", "not_eq", "nullptr",
        "operator", "or", "or_eq", "private", "protected", "public", "reflexpr",
        "register", "reinterpret_cast", "requires", "return", "short", "signed",
        "sizeof", "static", "static_assert", "static_cast", "struct", "switch",
        "synchronized", "template", "this", "thread_local", "throw", "true",
        "try", "typedef", "typeid", "typename", "union", "unsigned", "using",
        "virtual", "void", "volatile", "wchar_t", "while", "xor", "xor_eq",
    ]
    pythonReservedKeywords = keyword.kwlist
    # If token is a reserved word in either language, append with underscore.
    # 'interface' is not a reserved word but is a macro on Windows when using
    # COM so we treat it as reserved.
    reserved = set(cppReservedKeywords + pythonReservedKeywords + [
        'interface',
    ])
    
    if not Tf.IsValidIdentifier(tokenId):
        tokenId = _MakeValidToken(tokenId, useLiteralIdentifier)
    elif not useLiteralIdentifier:
        # if not using literal identifier we always camelCase our valid
        # identifiers as per convention.
        tokenId = _CamelCase(tokenId)

    # After conversion to camelCase, check if the token is reserved.
    if tokenId in reserved:
        tokenId = tokenId + '_'

    return tokenId

def _AddToken(tokenDict, classTokenSet, tokenId, val, desc, 
              useLiteralIdentifier=False):
    """tokenId must be an identifier"""

    tokenId = _MakeValidTokenId(tokenId, useLiteralIdentifier)

    if tokenId in tokenDict:
        token = tokenDict[tokenId]

        # Assert one-to-one mapping of token.id -> token.value
        if token.value != val:
            raise Exception(
             'Token identifiers must map to exactly one token value. '
             'One-to-Many mapping encountered: %s maps to \\"%s\\" and \\"%s\\"'
             % (token.id, token.value, val))
        
        # Update Description
        tokenDict[tokenId] = token._replace(
            desc=token.desc + ', ' + desc)
    
    else:
        tokenDict[tokenId] = Token(tokenId, val, desc)

    if classTokenSet is not None:
        classTokenSet.add(tokenId)

def GatherTokens(classes, libName, libTokens, 
                 includeSchemaIdentifierTokens = False):
    tokenDict = {}
    schemaIdentifierTokensDict = {}

    # Add tokens from all classes to the token set
    for cls in classes:

        if includeSchemaIdentifierTokens:
            # Add the token for the class's schema identifier and family.
            # We keep these separate from the rest of the tokens while we 
            # gather so we can sort them to be at the end of the tokens list.
            if cls.version == 0:
                # For version 0, the identifier and family will be the same.
                _AddToken(schemaIdentifierTokensDict, None, 
                    cls.usdPrimTypeName, cls.usdPrimTypeName, 
                    'Schema identifier and family for {}'.format(cls.cppClassName), 
                    useLiteralIdentifier=True)
            else:
                _AddToken(schemaIdentifierTokensDict, None, 
                    cls.usdPrimTypeName, cls.usdPrimTypeName, 
                    'Schema identifier for {}'.format(cls.cppClassName), 
                    useLiteralIdentifier=True)
                _AddToken(schemaIdentifierTokensDict, None, 
                    cls.family, cls.family, 
                    'Schema family for {}'.format(cls.cppClassName), 
                    useLiteralIdentifier=True)

        # Add tokens from attributes to the token set
        #
        # We sort by name here to get a stable ordering when building up the
        # desc string below.
        for attr in sorted(cls.attrs.values(), key=lambda a: a.name.lower()):

            # Add Attribute Names to token set
            # For property names, camelCase all tokens irrespective of
            # useLiteralIdentifier, so that we are consistent in our attribute
            # naming when namespace prefix are provided and respect our coding
            # convention. (Example: namespacePrefix:attrName ->
            # namespacePrefixAttrName)
            _AddToken(tokenDict, cls.tokens, attr.name, 
                      attr.generatedSchemaPropName, cls.cppClassName)

            # Add fallback value (if token type) to token set
            addTokenForFallback = (
                attr.typeName == Sdf.ValueTypeNames.Token and attr.fallback)
            if addTokenForFallback:
                if attr.apiName != '':
                    desc = 'Fallback value for %s::Get%sAttr()' % \\
                           (cls.cppClassName, _ProperCase(attr.apiName))
                else:
                    desc = 'Fallback value for %s schema attribute %s' % \\
                           (cls.cppClassName, attr.generatedSchemaPropName)
                _AddToken(tokenDict, cls.tokens, attr.fallback,
                        attr.fallback, desc, cls.useLiteralIdentifier)
            
            # Add Allowed Tokens for this attribute to token set
            if attr.allowedTokens:
                for val in attr.allowedTokens:
                    # Skip the fallback value if its in the allowed tokens as 
                    # we don't need to also say that fallback value is a 
                    # "possible value".
                    if addTokenForFallback and val == attr.fallback:
                        continue

                    # Empty string is a valid allowedTokens member,
                    # but do not declare a named literal for it.
                    if val != '':
                        if attr.apiName != '':
                            desc = 'Possible value for %s::Get%sAttr()' % \\
                                   (cls.cppClassName, _ProperCase(attr.apiName))
                        else:
                            desc = 'Possible value for %s schema attribute %s' % \\
                                   (cls.cppClassName, attr.generatedSchemaPropName)
                        _AddToken(tokenDict, cls.tokens, val, val, desc, 
                                cls.useLiteralIdentifier)

        # As per already established convention following tokens follow literal
        # identifier pattern and not camelCased by default:
        #- relationship names
        #- schema tokens
        #- property namespace prefix tokens
        #- library tokens

        # Add tokens from relationships to the token set
        for rel in cls.rels.values():
            _AddToken(tokenDict, cls.tokens, rel.name, 
                      rel.generatedSchemaPropName, cls.cppClassName, True)
            
        # Add schema tokens to token set
        schemaTokens = cls.customData.get("schemaTokens", {})
        for token, tokenInfo in schemaTokens.items():
            _AddToken(tokenDict, cls.tokens, token, tokenInfo.get("value", token),
                      _SanitizeDoc(tokenInfo.get("doc", 
                          "Special token for the %s schema." % \\
                                  cls.cppClassName), ' '), True)

        # Add property namespace prefix token for multiple-apply API
        # schema to token set
        if cls.propertyNamespace:
            _AddToken(tokenDict, cls.tokens, cls.propertyNamespace.token,
                      cls.propertyNamespace.prefix,
                      "Property namespace prefix for the %s schema." \\
                              % cls.cppClassName, True)

    # Add library-wide tokens to token set
    for token, tokenInfo in libTokens.items():
        _AddToken(tokenDict, None, token, tokenInfo.get("value", token), 
                  _SanitizeDoc(tokenInfo.get("doc",
                      "Special token for the %s library." % libName), ' '), True)

    # It's possible for there to be overlap between the tokens we collected
    # for schema properties and the tokens representing the schema identifiers.
    # In this case, we want the schema identifier to take precedence so that
    # the token is sorted to show up with the rest of the schema identifiers.
    # Thus, if we find a token matching a schema identifier token, remove it
    # and add its description to the schema identifier token.
    for token, tokenInfo in schemaIdentifierTokensDict.items():
        poppedToken = tokenDict.pop(token, None)
        if poppedToken is not None:
            _AddToken(schemaIdentifierTokensDict, None, 
                poppedToken.id, poppedToken.value, poppedToken.desc, True)

    # Sort both lists of tokens lexicographically. This pair of keys will provide
    # a case insensitive primary key and a case sensitive secondary key. That
    # way we keep a stable sort for tokens that differ only in case.
    sortedTokens = sorted(
        tokenDict.values(), key=lambda token: (token.id.lower(), token.id))
    sortedSchemaIdentifierTokens = sorted(
        schemaIdentifierTokensDict.values(), key=lambda token: (token.id.lower(), token.id))

    # Return both sets of tokens concatenated, schema identifier tokens last.
    return sortedTokens + sortedSchemaIdentifierTokens

def GenerateCode(templatePath, codeGenPath, tokenData, classes, validate,
                 namespaceOpen, namespaceClose, namespaceUsing,
                 useExportAPI, env, headerTerminatorString, classInfos):
    #
    # Load Templates
    #
    Print('Loading Templates from {0}'.format(templatePath))
    try:
        apiTemplate = env.get_template('api.h')
        headerTemplate = env.get_template('schemaClass.h')
        sourceTemplate = env.get_template('schemaClass.cpp')
        wrapTemplate = env.get_template('wrapSchemaClass.cpp')
        tokensHTemplate = env.get_template('tokens.h')
        tokensCppTemplate = env.get_template('tokens.cpp')
        tokensWrapTemplate = env.get_template('wrapTokens.cpp')
    except TemplateNotFound as tnf:
        raise RuntimeError("Template not found: {0}".format(str(tnf)))
    except TemplateSyntaxError as tse:
        raise RuntimeError("Syntax error in template {0} at line {1}: {2}"
                           .format(tse.filename, tse.lineno, tse))

    if useExportAPI:
        Print('Writing API:')
        _WriteFile(os.path.join(codeGenPath, 'api.h'),
                   apiTemplate.render(),
                   validate)
    
    if tokenData:
        Print('Writing Schema Tokens:')
        # tokens.h
        _WriteFile(os.path.join(codeGenPath, 'tokens.h'),
                   tokensHTemplate.render(tokens=tokenData), validate)
        # tokens.cpp
        _WriteFile(os.path.join(codeGenPath, 'tokens.cpp'),
                   tokensCppTemplate.render(tokens=tokenData), validate)
        # wrapTokens.cpp
        _WriteFile(os.path.join(codeGenPath, 'wrapTokens.cpp'),
                   tokensWrapTemplate.render(tokens=tokenData), validate)

    #
    # Generate Schema Class Files
    #
    Print('Generating Classes:')

            
    for cls in classes:
        # Get whether there are any token valued attributes that will
        # be exposed in the C++ API.
        hasTokenAttrs = any(
            [(cls.attrs[attr].typeName == Sdf.ValueTypeNames.Token and
              cls.attrs[attr].apiName)
             for attr in cls.attrs])

        # header file
        clsHFilePath = os.path.join(codeGenPath, cls.GetHeaderFile())

        # Wrap headerTerminatorString with new lines if it is non-empty.
        headerTerminatorString = headerTerminatorString.strip()
        if headerTerminatorString:
            headerTerminatorString = '\\n%s\\n' % headerTerminatorString

        # Verify that the listed reflected API schemas are valid
        reflectedSchemas = []
        if 'reflectedAPISchemas' in cls.customData:
            # Get list of reflected API schemas
            requestedReflectedSchemas = cls.customData['reflectedAPISchemas']
            reflectedAttrNames = set()
            reflectedRelNames = set()

            # Ensure all of these schemas are also listed in appliedSchemas
            appliedSchemas = cls.allAppliedAPISchemas
            for schema in requestedReflectedSchemas:
                reflectedClsInfo = classInfos[schema]

                # Verify that all reflected schemas are single-apply API 
                # schemas, warn and skip if not.
                if reflectedClsInfo.schemaKind != "singleApplyAPI":
                    Print.Err("ERROR: reflectedAPISchemas can only be single-apply "
                              "API schemas.", reflectedClsInfo.className, 
                              "is not single-apply.")
                    continue

                # Ensure there are no repeated attribute names among the reflected schemas.
                duplicates = []
                for attrName in reflectedClsInfo.attrs:
                    if attrName in reflectedAttrNames:
                        duplicates.append(attrName)
                        Print.Err("ERROR: Cannot reflect attribute ", attrName, 
                                  "from built-in applied schema ", schema, 
                                  " as it conflicts with an attribute of the "
                                  " same name in another reflected schema.")
                    else:
                        reflectedAttrNames.add(attrName)
                
                if len(duplicates) > 0:
                    for duplicateAttr in duplicates:
                        del reflectedClsInfo.attrs[duplicateAttr]
                        reflectedClsInfo.attrOrder.remove(duplicateAttr)
                    classInfos[schema] = reflectedClsInfo

                # Ensure there are no repeated relationship names among the reflected schemas.
                duplicates = []
                for relName in reflectedClsInfo.rels:
                    if relName in reflectedRelNames:
                        duplicates.append(relName)
                        Print.Err("ERROR: Repeated relationship name ", relName, 
                                  "present in ", schema, ".")
                    else:
                        reflectedRelNames.add(relName)

                if len(duplicates) > 0:
                    for duplicateRel in duplicates:
                        del reflectedClsInfo.rels[duplicateRel]
                        reflectedClsInfo.relOrder.remove(duplicateRel)
                    classInfos[schema] = reflectedClsInfo

                if schema not in appliedSchemas:
                    raise _GetSchemaDefException(
                        "Schemas listed in reflectedAPISchemas must be applied "
                        "schemas. This schema is not present in the apiSchemas metadata field.", schema)
                if schema not in classInfos:
                    Print.Err("ERROR: Unable to find definition of", schema, ".")
                else:
                    reflectedSchemas.append(schema)            

        customCode = _ExtractCustomCode(clsHFilePath,
                default='};\\n\\n%s\\n%s' % (
                    namespaceClose, headerTerminatorString))

        _WriteFile(clsHFilePath,
                   headerTemplate.render(
                       cls=cls, hasTokenAttrs=hasTokenAttrs, appliedSchemas=reflectedSchemas, classes=classInfos) + customCode,
                   validate)
        

        # source file
        clsCppFilePath = os.path.join(codeGenPath, cls.GetCppFile())
        customCode = _ExtractCustomCode(clsCppFilePath)
        _WriteFile(clsCppFilePath, 
                   sourceTemplate.render(cls=cls, appliedSchemas=reflectedSchemas, classes=classInfos) + customCode,
                   validate)
        
        # wrap file
        clsWrapFilePath = os.path.join(codeGenPath, cls.GetWrapFile())

        if useExportAPI:
            customCode = _ExtractCustomCode(clsWrapFilePath, default=(
                                            '\\nnamespace {\\n'
                                            '\\nWRAP_CUSTOM {\\n}\\n'
                                            '\\n}'))
        else:
            customCode = _ExtractCustomCode(clsWrapFilePath, default='\\nWRAP_CUSTOM {\\n}\\n')

        _WriteFile(clsWrapFilePath,
                   wrapTemplate.render(cls=cls, appliedSchemas=reflectedSchemas, classes=classInfos) + customCode, validate)

# Updates the plugInfo class metadata clsDict with the API schema application
# metadata from the class
def _UpdatePlugInfoWithAPISchemaApplyInfo(clsDict, cls):

    if not cls.isAppliedAPISchema:
        return

    # List any auto apply to entries for the applied API schema.
    if cls.apiAutoApply:
        clsDict.update({API_AUTO_APPLY: list(cls.apiAutoApply)})

    # List any can only apply to entries for applied API schemas.
    if cls.apiCanOnlyApply:
        clsDict.update({API_CAN_ONLY_APPLY: list(cls.apiCanOnlyApply)})

    # List any allowed instance names for multiple apply schemas.
    if cls.apiAllowedInstanceNames:
        clsDict.update(
            {API_ALLOWED_INSTANCE_NAMES: list(cls.apiAllowedInstanceNames)})

    # Add any per instance name apply metadata in another dicitionary for 
    # multiple apply schemas.
    if cls.apiSchemaInstances:
        instancesDict = {}
        for k, v in cls.apiSchemaInstances.items():
            instance = {}
            # There can be canOnlyApplyTo metadata on a per isntance basis.
            if v.get(API_CAN_ONLY_APPLY):
                instance.update(
                    {API_CAN_ONLY_APPLY: list(v.get(API_CAN_ONLY_APPLY))})
            if instance:
                instancesDict.update({k : instance})
        if instancesDict:
            clsDict.update({API_SCHEMA_INSTANCES: instancesDict})

def GeneratePlugInfo(templatePath, codeGenPath, classes, validate, env,
        skipCodeGen):

    #
    # Load Templates
    #
    Print('Loading Templates from {0}'.format(templatePath))
    try:
        plugInfoTemplate = env.get_template('plugInfo.json')
    except TemplateNotFound as tnf:
        raise RuntimeError("Template not found: {0}".format(str(tnf)))
    except TemplateSyntaxError as tse:
        raise RuntimeError("Syntax error in template {0} at line {1}: {2}"
                           .format(tse.filename, tse.lineno, tse))

    #
    # Generate plugInfo.json.
    #
    if classes:
        import json
        # read existing plugInfo file, strip comments.
        plugInfoFile = os.path.join(codeGenPath, 'plugInfo.json')
        if os.path.isfile(plugInfoFile):
            with open(plugInfoFile, 'r') as fp:
                infoLines = fp.readlines()
            infoLines = [l for l in infoLines
                         if not l.strip().startswith('#')]
            # parse as json.
            try:
                info = json.loads(''.join(infoLines))
            except ValueError as ve:
                Print.Err('\\t', 'reading', plugInfoFile)
        else:
            # use plugInfo.json template as starting point for new files,
            try:
                info = json.loads(plugInfoTemplate.render())
            except ValueError as ve:
                Print.Err('\\t', ve, 'from template', plugInfoTemplate.filename)

        # pull the types dictionary.
        if 'Plugins' in info:
            for pluginData in info.get('Plugins', {}):
                # Plugin 'Type' should default to a "resource" type instead of a
                # "library" if no code gen happens for this schema domain.
                # Note that if any explicit cpp code is included for this schema
                # domain, the plugin 'Type' needs to be manually updated in the 
                # generated plugInfo.json to "library".
                if skipCodeGen:
                    pluginData["Type"] = "resource"

                if pluginData.get('Name') == env.globals['libraryName']:
                    types = (pluginData
                             .setdefault('Info', {})
                             .setdefault('Types', {}))
                    break
            else:
                Print.Err('\\t', 'Could not find plugin metadata section for',
                          env.globals['libraryName'])
        else:
            types = info.setdefault('Types', {})
        # remove auto-generated types. Use a list to make a copy of keys before
        # we mutate it.
        for tname in list(types.keys()):
            if types[tname].get('autoGenerated', False):
                del types[tname]
        # generate types entries.
        for cls in classes:
            clsDict = dict()
            # add extraPlugInfo first to ensure it doesn't stomp over
            # any items we add below.
            if 'extraPlugInfo' in cls.customData:
                clsDict.update(
                    _ConvertDictionaryForJSON(cls.customData['extraPlugInfo']))
            clsDict.update({'bases': [cls.parentCppClassName],
                            'autoGenerated': True })

            clsDict.update({"schemaKind": cls.schemaKind})

            # Add all the API schema apply info fields to to the plugInfo. 
            # This may include auto-apply, can-only-apply, and allowed names 
            # for multiple apply schemas.
            _UpdatePlugInfoWithAPISchemaApplyInfo(clsDict, cls)

            # Write out aliases for schemas where the cpp class name and 
            # prim type name do not match.
            if cls.usdPrimTypeName != cls.cppClassName:
                clsDict['alias'] = {'UsdSchemaBase': cls.usdPrimTypeName}

            # Write out schema identifier
            clsDict['schemaIdentifier'] = cls.usdPrimTypeName

            types[cls.cppClassName] = clsDict
        # write plugInfo file back out.
        content = ((
            "# Portions of this file auto-generated by %s.\\n"
            "# Edits will survive regeneration except for comments and\\n"
            "# changes to types with autoGenerated=true.\\n"
            % os.path.basename(os.path.splitext(sys.argv[0])[0])) + 
                   json.dumps(info, indent=4, sort_keys=True,
                              separators=(', ', ': ')))
        _WriteFile(plugInfoFile, content, validate)


def _MakeFlattenedRegistryLayer(filePath):
    # We flatten the schema classes to 'eliminate' composition when querying
    # the schema registry.
    stage = Usd.Stage.Open(filePath)

    # Certain qualities on builtin properties are not overridable in scene
    # description.  For example, builtin attributes' types always come from the
    # definition registry, never from scene description.  That's problematic in
    # this case where we're trying to *establish* the definition registry.
    # Since the classes in schema.usda use the real prim type names
    # (e.g. 'Mesh') Usd will pick up these built-in qualities from the existing
    # prim definition.  To side-step this, we temporarily override the prim type
    # names in the session layer so they do not pick up these special
    # nonoverridable qualities when we flatten.  Then after the fact we repair
    # all the type names.

    def mangle(typeName):
        return '__MANGLED_TO_AVOID_BUILTINS__' + typeName
    def demangle(typeName):
        return typeName.replace('__MANGLED_TO_AVOID_BUILTINS__', '')

    # Mangle the typeNames.
    with Usd.EditContext(stage, editTarget=stage.GetSessionLayer()):
        for cls in stage.GetPseudoRoot().GetAllChildren():
            if cls.GetTypeName():
                cls.SetTypeName(mangle(cls.GetTypeName()))

    flatLayer = stage.Flatten(addSourceFileComment=False)

    # Demangle the typeNames.
    for cls in flatLayer.rootPrims:
        if cls.typeName:
            cls.typeName = demangle(cls.typeName)

    # In order to prevent derived classes from inheriting base class
    # documentation metadata, we manually replace docs here
    for layer in stage.GetLayerStack():
        for cls in layer.rootPrims:
            flatCls = flatLayer.GetPrimAtPath(cls.path)
            if cls.HasInfo('documentation'):
                flatCls.SetInfo('documentation', cls.documentation)
            else:
                flatCls.ClearInfo('documentation')

    return flatLayer
    
def _RenamePropertiesWithInstanceablePrefix(usdPrim):
    # Properties of multiple apply API schemas must be prefixed with an 
    # instanceable property name so we rename the properties here. Since we 
    # can't move/rename properties through Usd APIs (yet), we copy the existing
    # properties using the prefixed name and delete the original properties 
    # after.

    # Store the original property names for deletion.
    originalPropNames = usdPrim.GetPropertyNames()
    if not originalPropNames:
        return

    # Multiple apply API schemas require a property namespace prefix that will
    # be prepended along with the instance name for all its properties.
    namespacePrefix = usdPrim.GetCustomDataByKey(PROPERTY_NAMESPACE_PREFIX)
    if not namespacePrefix:
        raise _GetSchemaDefException("propertyNamespacePrefix "
            "must exist as a metadata field on multiple-apply "
            "API schemas with properties", usdPrim.GetPath())

    # For each property create a copy with the prefixed instanceable property
    # name.
    for prop in usdPrim.GetProperties():
        if prop.GetName() == INSTANCE_NAME_PLACEHOLDER:
            newPropName = Usd.SchemaRegistry.MakeMultipleApplyNameTemplate(
                namespacePrefix, "")
        else:
            newPropName = Usd.SchemaRegistry.MakeMultipleApplyNameTemplate(
                namespacePrefix, prop.GetName())
        if usdPrim.HasProperty(newPropName):
            raise _GetSchemaDefException("Prefixed property name '%s' already "
                "exists as property base name in the schema." % newPropName, 
                usdPrim.GetPath())
        prop.FlattenTo(usdPrim, newPropName)

    # Remove all the original properties after they've all been copied.
    for name in originalPropNames:
        usdPrim.RemoveProperty(name)

def _GetUserDocForSchemaObj(obj, userDocSchemaObj):
    """
    Find brief user doc for a schema object, in either the specifically authored
    user doc info in userDocSchemaObj, or the schema obj itself.
    Returns brief user doc string (with leading and trailing whitespace 
    stripped) or None if no reasonable brief user doc found.
    """
    # Start by looking at userDocSchemaObj for USERDOC_BRIEF customData
    if (userDocSchemaObj is not None 
        and USERDOC_BRIEF in userDocSchemaObj.GetCustomData()):
        return userDocSchemaObj.GetCustomData().get(USERDOC_BRIEF).strip()
    elif USERDOC_BRIEF in obj.customData:
        # See if USERDOC_BRIEF exists on schema object's custom data
        return obj.customData.get(USERDOC_BRIEF).strip()
    elif obj.GetInfo('documentation'):
        # Try and use the first sentence of 'documentation' if no 
        # userDocBrief authored. Use a regex to deal with sentences with
        # "." file extensions. 
        sentenceExp = r'\\. |\\.\\n' # Look for ". " or ".\\n" as end of sentence
        workDoc = re.split(sentenceExp, obj.GetInfo('documentation'), 
            maxsplit=1)[0].strip()
        # Truncate very long sentences to MAX_LENGTH_FOR_USERDOCBRIEF chars
        if len(workDoc) > MAX_LENGTH_FOR_USERDOCBRIEF:
            workDoc = workDoc[:MAX_LENGTH_FOR_USERDOCBRIEF] + "..."
        else:
            # Append "." if needed (regex will omit it in match results)
            if len(workDoc) > 0 and not workDoc.endswith('.'):
                workDoc = workDoc + '.'
        return workDoc
    else:
        return None

def _UpdateUserDocForRegistry(filePath, flatLayer):
    """
    Find the best source for "brief" user doc for the schema and apply it
    This is only done for the schema registry, and not for codegen
    """
    briefDict = {}
    # Load <schema path>/userDoc/schemaUserDoc.usda if it exists
    userDocSchemaFile = os.path.join(os.path.dirname(os.path.abspath(filePath)),
     "userDoc", "schemaUserDoc.usda")
    userDocStage = None
    if (os.path.isfile(userDocSchemaFile) and os.access(userDocSchemaFile, os.R_OK)):
        userDocStage = Usd.Stage.Open(userDocSchemaFile)        
    # Walk through flattened schema stage and look for same-path classes in 
    # userDocStage if available, to get the appropriate brief user doc
    for cls in flatLayer.rootPrims:
        # Ignore GLOBAL 
        if cls.name == "GLOBAL":
            continue
        if userDocStage is not None:
            userDocCls = userDocStage.GetPrimAtPath(cls.path)
            if not userDocCls:
                userDocCls = None
        else:
            userDocCls = None
        briefUserDoc = _GetUserDocForSchemaObj(cls, userDocCls)
        if briefUserDoc is not None:
            briefDict[cls.path] = briefUserDoc
        # Look for property user doc
        for clsProp in cls.properties:
            if userDocCls is not None:
                userDocClsProp = userDocCls.GetPropertyAtPath(clsProp.path)
            else:
                userDocClsProp = None
            briefUserDoc = _GetUserDocForSchemaObj(clsProp, userDocClsProp)
            if briefUserDoc is not None:
                briefDict[clsProp.path] = briefUserDoc
    return briefDict

def GenerateRegistry(codeGenPath, filePath, classes, validate, env):

    # Get the flattened layer to work with.
    flatLayer = _MakeFlattenedRegistryLayer(filePath)

    # Delete GLOBAL prim and other schema prim customData so it doesn't pollute
    # the schema registry.  Also remove any definitions we included from
    # lower-level schema modules.  We hop back up to the UsdStage API to do
    # so because it is more convenient for these kinds of operations.
    flatStage = Usd.Stage.Open(flatLayer)

    # Gather schema class and property brief user doc if found.
    # Do this here, before we strip out customData.
    briefDict = _UpdateUserDocForRegistry(filePath, flatLayer)

    # Remove 'documentation' metadata (after we've gathered brief user
    # doc, in case we needed to substitute first sentence of documentation
    # metadata). We no longer propagate API docs to the schema registry. Note 
    # that 'documentation' is still used in the GenerateCode process.
    for cls in flatLayer.rootPrims:
        flatCls = flatLayer.GetPrimAtPath(cls.path)
        flatCls.ClearInfo('documentation')
        for clsProp in cls.properties:
            flatClsProp = flatCls.GetPropertyAtPath(clsProp.path)
            flatClsProp.ClearInfo('documentation')

    pathsToDelete = []
    primsToKeep = {cls.usdPrimTypeName : cls for cls in classes}
    if not flatStage.RemovePrim('/GLOBAL'):
        Print.Err("ERROR: Could not remove GLOBAL prim.")
    allFallbackSchemaPrimTypes = {}
    for p in flatStage.GetPseudoRoot().GetAllChildren():
        if p.GetName() not in primsToKeep:
            pathsToDelete.append(p.GetPath())
            continue

        # If this is an API schema, check if it's applied and record necessary
        # information.
        family, _ = Usd.SchemaRegistry.ParseSchemaFamilyAndVersionFromIdentifier(
            p.GetName())
        if family.endswith('API'):
            apiSchemaType = p.GetCustomDataByKey(API_SCHEMA_TYPE) or SINGLE_APPLY
            if apiSchemaType == MULTIPLE_APPLY:
                _RenamePropertiesWithInstanceablePrefix(p)

            # API schema classes must not have authored metadata except for 
            # these exceptions:
            #   'documentation' - This is allowed
            #   'customData' - This will be deleted below
            #   'specifier' - This is a required field and will always exist.
            # Any other metadata is an error.
            allowedAPIMetadata = [
                'specifier', 'customData', 'documentation']

            # API schemas are also allowed to specify 'apiSchemas' metadata to
            # include other API schemas.
            if apiSchemaType == SINGLE_APPLY or apiSchemaType == MULTIPLE_APPLY:
                allowedAPIMetadata.append('apiSchemas')

            # Allow 'propertyOrder'  and 'uiHints' for single-apply schemas only.
            if apiSchemaType == SINGLE_APPLY:
                allowedAPIMetadata.append('propertyOrder')
                allowedAPIMetadata.append('uiHints')

            invalidMetadata = [key for key in p.GetAllAuthoredMetadata().keys()
                               if key not in allowedAPIMetadata]
            if invalidMetadata:
                raise _GetSchemaDefException("Found invalid metadata fields "
                    "%s in API schema definition. API schemas of type %s "
                    "can only provide prim metadata fallbacks for %s" % (
                    str(invalidMetadata), apiSchemaType, str(allowedAPIMetadata)
                    ), 
                    p.GetPath())

        if p.HasAuthoredTypeName():
            fallbackTypes = p.GetCustomDataByKey(FALLBACK_TYPES)
            if fallbackTypes:
                allFallbackSchemaPrimTypes[p.GetName()] = \\
                    Vt.TokenArray(fallbackTypes)

        # Set the full list of the class's applied API apiSchemas as an explicit
        # list op in the apiSchemas metadata. Note that this API schemas list
        # will have been converted to template names if the class is a multiple
        # apply API schema.
        appliedAPISchemas = primsToKeep[p.GetName()].allAppliedAPISchemas
        if appliedAPISchemas:
            p.SetMetadata('apiSchemas',
                          Sdf.TokenListOp.CreateExplicit(appliedAPISchemas))

        p.ClearCustomData()

        # Properties may have customData indicating that they are an 
        # 'apiSchemaOverride'. We don't leave this data on the property in 
        # in the generatedSchema, but rather we already used it to collect the 
        # names of all API schema override properties for the schema class. 
        # We store this list of API schema override properties as custom data 
        # on the prim spec and delete the custom data on the property.
        for myproperty in p.GetAuthoredProperties():
            myproperty.ClearCustomData()

        apiSchemaOverridePropertyNames = sorted(
            primsToKeep[p.GetName()].apiSchemaOverridePropertyNames)
        if apiSchemaOverridePropertyNames:
            p.SetCustomDataByKey('apiSchemaOverridePropertyNames',
                                 Vt.TokenArray(apiSchemaOverridePropertyNames))

        # Set user doc brief strings in class and property customData if
        # authored, using the path-based dictionary we set in the call to 
        # _UpdateUserDocForRegistry above. Note that we need to do this after 
        # clearing other custom data.
        workPathStr = p.GetPath()
        if workPathStr in briefDict:
            p.SetCustomDataByKey(USERDOC_BRIEF, briefDict[workPathStr])
        for myproperty in p.GetAuthoredProperties():
            workPathStr = myproperty.GetPath()
            if Usd.SchemaRegistry.IsMultipleApplyNameTemplate(
                myproperty.GetName()):
                # myproperty property name has been updated with instance
                # information via _RenamePropertiesWithInstanceablePrefix
                # earlier, however we populated briefDict with the original 
                # property names from schema.usda/schemaUserDoc.usda. Resort
                # to looking up myproperty's primPath + baseName in briefDict.
                workPathStr = myproperty.GetPrimPath().AppendProperty(
                    myproperty.GetBaseName())
            if workPathStr in briefDict:
                myproperty.SetCustomDataByKey(USERDOC_BRIEF,
                 briefDict[workPathStr])

    for p in pathsToDelete:
        flatStage.RemovePrim(p)
        
    # Set layer's comment to indicate that the file is generated.
    flatLayer.comment = 'WARNING: THIS FILE IS GENERATED BY usdGenSchema. '\\
                        ' DO NOT EDIT.'

    if allFallbackSchemaPrimTypes:
        flatLayer.GetPrimAtPath('/').SetInfo(Usd.Tokens.fallbackPrimTypes, 
                                             allFallbackSchemaPrimTypes)

    #
    # Generate Schematics
    #
    Print('Generating Schematics:')
    layerSource = flatLayer.ExportToString()

    # Remove doxygen tags from schema registry docs.
    # ExportToString escapes '\\' again, so take that into account.
    layerSource = layerSource.replace(r'\\\\em ', '')
    layerSource = layerSource.replace(r'\\\\li', '-')
    layerSource = re.sub(r'\\\\+ref [^\\s]+ ', '', layerSource)
    layerSource = re.sub(r'\\\\+section [^\\s]+ ', '', layerSource)

    _WriteFile(os.path.join(codeGenPath, 'generatedSchema.usda'), layerSource,
               validate)

def processChildren(parent, parentToChildren, ret):
    # Add parent to list.
    ret.append(parent)

    # Add children and grandchildren.
    for child in parentToChildren.get(parent.baseFileName, []):
        processChildren(child, parentToChildren, ret)

def getTopoSortedSchemas(classes):
    classNames = [x.baseFileName for x in classes]
    parentToChildren = dict()

    # Identify schemas with no parents in the current file and
    # map parent schema classes to a list of their children.
    roots = []
    for cls in classes:
        if cls.parentBaseFileName not in classNames: 
            roots.append(cls)
        else:
            children = parentToChildren.get(cls.parentBaseFileName, [])
            children.append(cls)
            parentToChildren[cls.parentBaseFileName] = children

    # Add dependent schemas recursively.
    ret = []
    for root in roots:
        processChildren(root, parentToChildren, ret)

    return ret

def GenerateBuildHelpers(templatePath, codeGenPath, tokenData, classList, 
                         libName, tokensPrefix, validate, env):
    Print('Generating Build Helper Files:')

    #
    # Load Templates
    #
    Print('Loading Templates from {0}'.format(templatePath))
    try:
        moduleTemplate = env.get_template('generatedSchema.module.h')
        classesTemplate = env.get_template('generatedSchema.classes.txt')
    except TemplateNotFound as tnf:
        raise RuntimeError("Template not found: {0}".format(str(tnf)))
    except TemplateSyntaxError as tse:
        raise RuntimeError("Syntax error in template {0} at line {1}: {2}"
                           .format(tse.filename, tse.lineno, tse))

    classes = getTopoSortedSchemas(classList)

    # Write out public classes, resource files, and python module files
    baseFileNames = [classObj.baseFileName for classObj in classes]
    wrapFileNames = [classObj.GetWrapFile() for classObj in classes]
    if tokenData:
        baseFileNames.append("tokens")
        wrapFileNames.append("wrapTokens.cpp")
    wrapFileNames.append("module.cpp")
    
    classesFilePath = os.path.join(codeGenPath, 'generatedSchema.classes.txt')
    if not os.path.exists(classesFilePath):
        open(classesFilePath, 'w+')
    _WriteFile(classesFilePath, classesTemplate.render(
               publicClasses=sorted(baseFileNames), 
               pythonModules=sorted(wrapFileNames), 
               libName=libName), validate)

    # Write out generated module.cpp contents
    cppClassNames = [classObj.cppClassName for classObj in classes]
    cppClassNames.append(tokensPrefix + "Tokens")

    modulesFilePath = os.path.join(codeGenPath, 'generatedSchema.module.h')
    if not os.path.exists(modulesFilePath):
        open(modulesFilePath, 'w+')
    _WriteFile(modulesFilePath, 
               moduleTemplate.render(pythonModules=cppClassNames), validate)

def InitializeResolver():
    """Initialize the resolver so that search paths pointing to schema.usda
    files are resolved to the directories where those files are installed"""
    
    from pxr import Ar, Plug

    # Force the use of the ArDefaultResolver so we can take advantage
    # of its search path functionality.
    Ar.SetPreferredResolver('ArDefaultResolver')

    # Figure out where all the plugins that provide schemas are located
    # and add their resource directories to the search path prefix list.
    resourcePaths = set()
    pr = Plug.Registry()
    for t in pr.GetAllDerivedTypes('UsdSchemaBase'):
        plugin = pr.GetPluginForType(t)
        if plugin:
            resourcePaths.add(plugin.resourcePath)
    
    # The sorting shouldn't matter here, but we do it for consistency
    # across runs.
    Ar.DefaultResolver.SetDefaultSearchPath(sorted(list(resourcePaths)))

if __name__ == '__main__':
    #
    # Parse Command-line
    #
    parser = ArgumentParser(description='Generate C++ schema class code from a '
        'USD file.')
    parser.add_argument('schemaPath',
        nargs='?',
        type=str,
        default='./schema.usda',
        help='The source USD file where schema classes are defined. '
        '[Default: %(default)s]')
    parser.add_argument('codeGenPath',
        nargs='?',
        type=str,
        default='.',
        help='The target directory where the code should be generated. '
        '[Default: %(default)s]')
    parser.add_argument('-v', '--validate',
        action='store_true',
        help='Verify that the source files are unchanged.')
    parser.add_argument('-q', '--quiet',
        action='store_true',
        help='Do not output text during execution.')
    parser.add_argument('-n', '--namespace',
        nargs='+',
        type=str,
        help='Wrap code in this specified namespace. Multiple arguments '
             'will be interpreted as a nested namespace. The leftmost '
             'argument will be treated as the outermost namespace, with '
             'the rightmost argument as the innermost.')

    defaultTemplateDir = os.path.join(
        os.path.dirname(
            os.path.abspath(inspect.getfile(inspect.currentframe()))),
        'codegenTemplates')

    instTemplateDir = os.path.join(
        os.path.abspath(Plug.Registry().GetPluginWithName('usd').resourcePath),
        'codegenTemplates')

    parser.add_argument('-t', '--templates',
        dest='templatePath',
        type=str,
        help=('Directory containing schema class templates. '
              '[Default: first directory that exists from this list: {0}]'
              .format(os.pathsep.join([defaultTemplateDir, instTemplateDir]))))

    parser.add_argument('-hts', '--headerTerminatorString',
        dest='headerTerminatorString',
        type=str,
        default='#endif',
        help=('The string used to terminate generated C++ header files, '
              'after the custom code section. '
              '[Default: %(default)s]'))

    args = parser.parse_args()
    codeGenPath = os.path.abspath(args.codeGenPath)
    schemaPath = os.path.abspath(args.schemaPath)

    # Check for expected library files
    expectedFiles = ["__init__.py", "CMakeLists.txt", 'module.cpp']
    for file in expectedFiles:
        if not os.path.exists(os.path.join(codeGenPath, file)):
            Print('WARNING: File {0} is missing. Run usdInitSchema to set up ' 
                  'build necessities'.format(file))

    if args.templatePath:
        templatePath = os.path.abspath(args.templatePath)
    else:
        if os.path.isdir(defaultTemplateDir):
            templatePath = defaultTemplateDir
        else:
            templatePath = instTemplateDir

    if args.namespace:
        namespaceOpen  = ' '.join('namespace %s {' % n for n in args.namespace)
        namespaceClose = '}'*len(args.namespace)
        namespaceUsing = ('using namespace ' 
                          + '::'.join(n for n in args.namespace) + ';')
    else:
        namespaceOpen  = 'PXR_NAMESPACE_OPEN_SCOPE'
        namespaceClose = 'PXR_NAMESPACE_CLOSE_SCOPE'
        namespaceUsing = 'PXR_NAMESPACE_USING_DIRECTIVE'

    Print.SetQuiet(args.quiet)

    #
    # Error Checking
    #
    if not os.path.isfile(schemaPath):
        Print.Err('Usage Error: First positional argument must be a USD schema '
                  'file. Use usdInitSchema.py to generate a template.')
        parser.print_help()
        sys.exit(1)
    if args.templatePath and not os.path.isdir(templatePath):
        Print.Err('Usage Error: templatePath argument must be the path to the codegenTemplates.')
        parser.print_help()
        sys.exit(1)

    try:
        #
        # Initialize the asset resolver to resolve search paths
        #
        InitializeResolver()
        
        #
        # Gather Schema Class information
        #
        libName, \\
        libPath, \\
        libPrefix, \\
        tokensPrefix, \\
        useExportAPI, \\
        libTokens, \\
        skipCodeGen, \\
        classes, classInfos = ParseUsd(schemaPath)

        if args.validate:
            Print('Validation on, any diffs found will cause failure.')

        Print('Processing schema classes:')
        Print(', '.join(map(lambda self: self.usdPrimTypeName, classes)))

        #
        # Generate Code from Templates
        #
        if not os.path.isdir(codeGenPath):
            os.makedirs(codeGenPath)

        j2_env = Environment(loader=FileSystemLoader(templatePath),
                             trim_blocks=True)
        j2_env.globals.update(Camel=_CamelCase,
                              Proper=_ProperCase,
                              Upper=_UpperCase,
                              Lower=_LowerCase,
                              namespaceOpen=namespaceOpen,
                              namespaceClose=namespaceClose,
                              namespaceUsing=namespaceUsing,
                              libraryName=libName,
                              libraryPath=libPath,
                              libraryPrefix=libPrefix,
                              tokensPrefix=tokensPrefix,
                              useExportAPI=useExportAPI)

        # Generate code for schema libraries that aren't specified as codeless.
        if not skipCodeGen:
            # Gathered tokens are only used for code-full schemas.
            tokenData = GatherTokens(classInfos.values(), libName, libTokens,
                                     includeSchemaIdentifierTokens=True)
            GenerateCode(templatePath, codeGenPath, tokenData, classes, 
                         args.validate,
                         namespaceOpen, namespaceClose, namespaceUsing,
                         useExportAPI, j2_env, args.headerTerminatorString, classInfos)
            # Generate Build Helper Files
            GenerateBuildHelpers(templatePath, codeGenPath, tokenData, classes, 
                                 libName, tokensPrefix, args.validate, j2_env)

        # We always generate plugInfo and generateSchema.
        GeneratePlugInfo(templatePath, codeGenPath, classes, args.validate,
                         j2_env, skipCodeGen)
        GenerateRegistry(codeGenPath, schemaPath, classes, 
                         args.validate, j2_env)
    
    except Exception as e:
        Print.Err("ERROR:", str(e))
        sys.exit(1)
`,"/openusd/pxr/usd/usd/usdInitSchema.py":`#!/pxrpythonsubst
#
# Copyright 2025 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.
#
"""
This script helps set up build necessities for schema libraries. It will 
generate templates for the following files if they do not already exist:
 * CMakeLists.txt 
 * __init__.py
 * schema.usda
 * module.cpp
 * schemaUserDoc.usda

"""

import sys, os, inspect
from argparse import ArgumentParser

from jinja2 import Environment, FileSystemLoader
from jinja2.exceptions import TemplateNotFound, TemplateSyntaxError

from pxr import Plug
from pxr.Usd.usdGenSchema import _Printer, _WriteFile

Print = _Printer()

# Name of script, e.g. "usdInitSchema"
PROGRAM_NAME = os.path.splitext(os.path.basename(sys.argv[0]))[0]

def _WriteFileIfNotPresent(fileName, filePath, renderedTemplate, validate):
    if os.path.exists(filePath):
        Print("\\t{0} is already present, skipping generation.".format(fileName))
    else:
        _WriteFile(filePath, renderedTemplate, validate)    

if __name__ == '__main__':
    #
    # Parse Command-line
    #
    parser = ArgumentParser(description='Set up build necessities for schema classes. This will generate '
             'templates for the CMakeLists.txt, __init__.py, schema.usda, '
             'module.cpp, and a user doc if they do not already exist.')
    parser.add_argument('codeGenPath',
        type=str,
        help='The target directory where the code should be generated. '
        'Can be \\'.\\' for the current directory.')
    parser.add_argument('-v', '--validate',
        action='store_true',
        help='Verify that the source files are unchanged.')
    parser.add_argument('-q', '--quiet',
        action='store_true',
        help='Do not output text during execution.')
    parser.add_argument('libraryPath',
        type=str,
        help='The partial path with which to prefix \\'#include\\' statements of '
             'generated files for this module. For external (non-Pixar) '
             'plugins, we recommend setting libraryPath to ".", so that the '
             'headers inside src directory are included in the generated files.')
    parser.add_argument('pxrPrefix',
        nargs='?',
        type=str,
        default="",
        help='Prefix to the path from pxr to this library. For pxr/usd/usd, '
             'the prefix would be pxr/usd. Omit this argument for non-OpenUSD '
             'build systems.')
    parser.add_argument('--genModuleDeps',
        action='store_true',
        help='Generates a template for the moduleDeps.cpp. This template will '
             'need to be filled in and kept up to date with library '
             'dependencies if you are not using the OpenUSD build system.')

    defaultTemplateDir = os.path.join(
        os.path.dirname(
            os.path.abspath(inspect.getfile(inspect.currentframe()))),
        'codegenTemplates')

    instTemplateDir = os.path.join(
        os.path.abspath(Plug.Registry().GetPluginWithName('usd').resourcePath),
        'codegenTemplates')

    parser.add_argument('-t', '--templates',
        dest='templatePath',
        type=str,
        help=('Directory containing schema class templates. '
              '[Default: first directory that exists from this list: {0}]'
              .format(os.pathsep.join([defaultTemplateDir, instTemplateDir]))))

    args = parser.parse_args()
    codeGenPath = os.path.abspath(args.codeGenPath)
    libraryName = os.path.basename(codeGenPath)

    if args.templatePath:
        templatePath = os.path.abspath(args.templatePath)
    else:
        if os.path.isdir(defaultTemplateDir):
            templatePath = defaultTemplateDir
        else:
            templatePath = instTemplateDir

    Print.SetQuiet(args.quiet)

    env = Environment(loader=FileSystemLoader(templatePath),
                            trim_blocks=True)

    # File names
    initFileName = '__init__.py'
    moduleFileName = 'module.cpp'
    schemaFileName = 'schema.usda'
    schemaDocFileName = 'schemaUserDoc.usda'
    cmakeFileName = 'CMakeLists.txt'
    genModuleFileName = 'generatedSchema.module.h'
    genClassesFileName = 'generatedSchema.classes.txt'
    moduleDepsFileName = 'moduleDeps.cpp'

    # Load templates
    Print('Loading Templates from {0}'.format(templatePath))
    try:
        initTemplate = env.get_template(initFileName)
        moduleTemplate = env.get_template(moduleFileName)
        schemaTemplate = env.get_template(schemaFileName)
        schemaDocTemplate = env.get_template(schemaDocFileName)
        cmakeTemplate = env.get_template(cmakeFileName)
        genModuleTemplate = env.get_template(genModuleFileName)
        genClassesTemplate = env.get_template(genClassesFileName)
        if args.genModuleDeps:
            genModuleDepsTemplate = env.get_template(moduleDepsFileName)
    except TemplateNotFound as tnf:
        raise RuntimeError("Template not found: {0}".format(str(tnf)))
    except TemplateSyntaxError as tse:
        raise RuntimeError("Syntax error in template {0} at line {1}: {2}"
                        .format(tse.filename, tse.lineno, tse))

    # Create directories for the codegen and user docs
    if not os.path.exists(os.path.dirname(codeGenPath)):
        os.makedirs(os.path.dirname(codeGenPath))

    userDocFolderPath = os.path.join(codeGenPath, 'userDoc')
    if not os.path.exists(userDocFolderPath):
        os.makedirs(userDocFolderPath)

    # Generate an __init__.py if not present
    initPath = os.path.join(codeGenPath, initFileName)
    _WriteFileIfNotPresent(initFileName, initPath, initTemplate.render(), args.validate)

    # Generate a schema.usda if not present
    schemaPath = os.path.join(codeGenPath, schemaFileName)
    _WriteFileIfNotPresent(schemaFileName, schemaPath,
                           schemaTemplate.render(libraryName=libraryName, 
                                                libraryPath=args.libraryPath), args.validate)

    # Generate a schema doc if not present
    schemaDocPath = os.path.join(userDocFolderPath, schemaDocFileName)
    _WriteFileIfNotPresent(schemaDocFileName, schemaDocPath, 
                           schemaDocTemplate.render(), args.validate)

    # Generate a module.cpp if not present
    filePath = os.path.join(codeGenPath, moduleFileName)
    if os.path.exists(filePath):
        # Check whether the module.cpp includes the generated module file
        with open(filePath, 'r') as f:
            foundModuleCpp = False
            for line in f.readlines():
                if "#include \\"" + genModuleFileName + "\\"" in line.strip():
                    foundModuleCpp = True
            
            if not foundModuleCpp:
                Print("WARNING:", genModuleFileName, "not included in "
                    "module.cpp. This should be included to avoid "
                    "listing entries manually.")
    else:        
        _WriteFile(filePath, moduleTemplate.render(), args.validate)

    # Generate a moduleDeps.cpp if requested and not present
    if args.genModuleDeps:
        moduleDepsPath = os.path.join(codeGenPath, moduleDepsFileName)
        _WriteFileIfNotPresent(moduleDepsFileName, moduleDepsPath, 
                               genModuleDepsTemplate.render(), args.validate)

    # Generate empty files to be filled in by usdGenSchema after the schema.usda
    # is filled in
    _WriteFileIfNotPresent(genModuleFileName, os.path.join(codeGenPath, 
                genModuleFileName), genModuleTemplate.render(), args.validate)
    _WriteFileIfNotPresent(genClassesFileName, os.path.join(codeGenPath, 
                genClassesFileName), genClassesTemplate.render(), args.validate)

    # Check whether the CMakeLists.txt call to pxr_library includes the 
    # INCLUDE_SCHEMA_FILES flag
    cmakePath = os.path.join(codeGenPath, cmakeFileName)
    if os.path.exists(cmakePath):
        with open(cmakePath, 'r') as f:
            if "INCLUDE_SCHEMA_FILES" not in f.read():
                Print("WARNING: INCLUDE_SCHEMA_FLAGS not present in pxr_library "
                      "in ", cmakeFileName, ". Pass this flag to pxr_library to "
                      "have schema classes automatically built.")
    else:
        _WriteFile(cmakePath, cmakeTemplate.render(pxrPrefix=args.pxrPrefix, 
                    libraryName=libraryName), args.validate)
    
`,"/openusd/pxr/usd/usdGeom/__init__.py":`#
# Copyright 2016 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.
#
from pxr import Tf
Tf.PreparePythonModule()
del Tf
`,"/openusd/pxr/usd/usdLux/__init__.py":`#
# Copyright 2016 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.
#
from pxr import Tf
Tf.PreparePythonModule()
del Tf

`,"/openusd/pxr/usd/usdMedia/__init__.py":`#
# Copyright 2019 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.
#
from pxr import Tf
Tf.PreparePythonModule()
del Tf

`,"/openusd/pxr/usd/usdShade/__init__.py":`#
# Copyright 2016 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.
#
from pxr import Tf
Tf.PreparePythonModule()
del Tf
`,"/openusd/pxr/usd/usdUI/__init__.py":`#
# Copyright 2016 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.
#
from pxr import Tf
Tf.PreparePythonModule()
del Tf
`,"/openusd/pxr/usd/usdUtils/__init__.py":`#
# Copyright 2016 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.
#
from pxr import Tf
Tf.PreparePythonModule()
del Tf

from .updateSchemaWithSdrNode import UpdateSchemaWithSdrNode, \\
        SchemaDefiningKeys, SchemaDefiningMiscConstants, PropertyDefiningKeys
from .fixBrokenPixarSchemas import FixBrokenPixarSchemas
from .usdzUtils import (ExtractUsdzPackage, UsdzAssetIterator,
                        UsdzScanIterator, UsdzUpdateIterator)
`,"/openusd/pxr/usd/usdUtils/constantsGroup.py":`#
# Copyright 2017 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.
#

"""A module for creating groups of constants. This is similar to the enum
module, but enum is not available in Python 2's standard library.
"""
import sys
import types

class _MetaConstantsGroup(type):
    """A meta-class which handles the creation and behavior of ConstantsGroups.
    """

    def __new__(metacls, cls, bases, classdict):
        """Discover constants and create a new ConstantsGroup class."""

        # If this is just the base ConstantsGroup class, simply create it and do
        # not search for constants.
        if cls == "ConstantsGroup":
            return super(_MetaConstantsGroup, metacls).__new__(metacls, cls, bases, classdict)

        # Search through the class-level properties and convert them into
        # constants.
        allConstants = list()
        for key, value in classdict.items():
            if (key.startswith("_") or isinstance(value, classmethod) or
                    isinstance(value, staticmethod)):
                # Ignore variables which start with an underscore, and
                # static/class methods.
                pass
            else:
                # Found a new constant.
                allConstants.append(value)

                # If the constant is a function/lambda, ensure that it is not
                # converted into a method.
                if isinstance(value, types.FunctionType):
                    classdict[key] = staticmethod(value)

        # All constants discovered, now create the \`_all\` property.
        classdict["_all"] = tuple(allConstants)

        # Finally, create the new ConstantsGroup class.
        return super(_MetaConstantsGroup, metacls).__new__(metacls, cls, bases, classdict)

    def __setattr__(cls, name, value):
        """Prevent modification of properties after a group is created."""
        raise AttributeError("Constant groups cannot be modified.")

    def __delattr__(cls, name):
        """Prevent deletion of properties after a group is created."""
        raise AttributeError("Constant groups cannot be modified.")

    def __len__(self):
        """Get the number of constants in the group."""
        return len(self._all)

    def __contains__(self, value):
        """Check if a constant exists in the group."""
        return (value in self._all)

    def __iter__(self):
        """Iterate over each constant in the group."""
        return iter(self._all)

# We want to define a ConstantsGroup class that uses _MetaConstantsGroup
# as its metaclass.
class ConstantsGroup(object, metaclass=_MetaConstantsGroup):
    """The base constant group class, intended to be inherited by actual groups
    of constants.
    """
    def __new__(cls, *args, **kwargs):
        raise TypeError("ConstantsGroup objects cannot be created.")
`,"/openusd/pxr/usd/usdUtils/fixBrokenPixarSchemas.py":`#
# Copyright 2022 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.
#

class FixBrokenPixarSchemas(object):
    """
    A class which takes a usdLayer and clients can apply appropriate fixes
    defined as utility methods of this class, example FixupMaterialBindingAPI.

    Every Fixup method iterates on each prim in the layer and applies specific
    fixes.
    """
    def __init__(self, usdLayer):
        self._usdLayer = usdLayer
        self._skelBindingAPIProps = None
        # Keeps track if the Layer was updated by any of the Fixer method
        self._layerUpdated = False

    def _ApplyAPI(self, listOp, apiSchema):
        if listOp.isExplicit:
            items = listOp.explicitItems
            items.append(apiSchema)
            listOp.explicitItems = items
        else:
            items = listOp.prependedItems
            items.append(apiSchema)
            listOp.prependedItems = items
        return listOp

    def IsLayerUpdated(self):
        """
        Returns the update status of the usdLayer, an instance of 
        FixBrokenPixarSchemas is holding. Fixer methods will set 
        self._layerUpdated to True if any of the Fixer methods applies fixes to 
        the layer.
        """
        return self._layerUpdated

    def FixupCoordSysAPI(self):
        """
        Makes sure CoordSysAPI multiapply schema is applied and the instanced
        binding relationship is used, instead of old non-applied CoordSysAPI
        "coordSys:name" binding.
        """
        def _PrimSpecProvidesCoordSysAPI(path):
            from pxr import Sdf
            if not path.IsPrimPath():
                return
            primSpec = self._usdLayer.GetPrimAtPath(path)
            apiSchemas = primSpec.GetInfo("apiSchemas")
            # Collect all relationship which use of UsdShadeCoordSysAPI encoding
            relationshipToUpdate = []
            missingApiSchema = []
            for rel in primSpec.relationships:
                relName = rel.name
                # is the relationship old style coordSys binding
                if (relName.startswith("coordSys:") and \\
                        (not relName.endswith(":binding") or \\
                            relName.count(":") == 1)):
                    relationshipToUpdate.append(rel)
                # Since there was no prior codepath that could have left us in a
                # state where a "coordSys:<name>:binding" was added but no
                # UsdShadeCoordSysAPI is applied with the "<name>", following
                # finds and fixes missing application of UsdShadeCoordSysAPI 
                # but when new encoding relationship is present on the spec.
                if (relName.startswith("coordSys:") and \\
                    relName.endswith(":binding") and \\
                    relName.count(":") > 1):
                    instanceName = rel.name.split("coordSys:")[-1]. \\
                            split(":binding")[0]
                    coordSysAPIName = "CoordSysAPI:%s" %instanceName
                    if not apiSchemas.HasItem(coordSysAPIName):
                        missingApiSchema.append(coordSysAPIName)
                    

            if len(relationshipToUpdate) == 0 and len(missingApiSchema) == 0:
                return

            # Will definitely be doing some updating!
            self._layerUpdated = True

            # though it shouldn't matter for our fixup usage, but better to
            # follow best practice and make ALL changes in a change block.
            with Sdf.ChangeBlock():
                for rel in relationshipToUpdate:
                    instanceName = rel.name.split("coordSys:")[-1]
                    # Apply API
                    coordSysAPIName = "CoordSysAPI:%s" %instanceName
                    apiSchemas = self._ApplyAPI(apiSchemas, coordSysAPIName)
                    # New Rel
                    newRelPath = rel.path.ReplaceName(rel.name+":binding")
                    # CopySpec
                    Sdf.CopySpec(self._usdLayer, rel.path, 
                            self._usdLayer, newRelPath)
                    # Remove old rel
                    primSpec.RemoveProperty(rel)
                # Apply any missing UsdShadeCoordSysAPI api schema
                for missingAPI in missingApiSchema:
                    apiSchemas = self._ApplyAPI(apiSchemas, missingAPI)

                primSpec.SetInfo("apiSchemas", apiSchemas)

        self._usdLayer.Traverse("/", _PrimSpecProvidesCoordSysAPI)


    def FixupMaterialBindingAPI(self):
        """
        Makes sure MaterialBindingAPI is applied on the prim, which defines a
        material:binding property spec. Marks the layer updated if fixes are
        applied.
        """
        def _PrimSpecProvidesMaterialBinding(path):
            if not path.IsPrimPath():
                return
            primSpec = self._usdLayer.GetPrimAtPath(path)
            hasMaterialBindingRel = \\
                    any(prop.name.startswith("material:binding") \\
                        for prop in primSpec.properties)
            apiSchemas = primSpec.GetInfo("apiSchemas")
            hasMaterialBindingAPI = "MaterialBindingAPI" in \\
                    apiSchemas.GetAddedOrExplicitItems()
            if hasMaterialBindingRel and not hasMaterialBindingAPI:
                self._layerUpdated = True
                newApiSchemas = self._ApplyAPI(apiSchemas, "MaterialBindingAPI")
                primSpec.SetInfo("apiSchemas", newApiSchemas)

        self._usdLayer.Traverse("/", _PrimSpecProvidesMaterialBinding)
        

    def FixupSkelBindingAPI(self):
        """
        Makes sure SkelBindingAPI is applied on the prim, which defines
        appropriate UsdSkel properties which are imparted by SkelBindingAPI.
        Marks the layer as updated if fixes are applied.
        """

        def _PrimSpecProvidesSkelBindingProperties(path):
            if not path.IsPrimPath():
                return

            # get skelBindingAPI props if not already populated
            if not self._skelBindingAPIProps:
                from pxr import Usd, UsdSkel
                usdSchemaRegistry = Usd.SchemaRegistry()
                primDef = usdSchemaRegistry.BuildComposedPrimDefinition("",
                        ["SkelBindingAPI"])
                self._skelBindingAPIProps = primDef.GetPropertyNames()
        
            primSpec = self._usdLayer.GetPrimAtPath(path)
            primSpecProps = [prop.name for prop in primSpec.properties]
            apiSchemas = primSpec.GetInfo("apiSchemas")
            hasSkelBindingAPI = "SkelBindingAPI" in \\
                    apiSchemas.GetAddedOrExplicitItems()
            for skelProperty in self._skelBindingAPIProps:
                if (skelProperty in primSpecProps) and not hasSkelBindingAPI:
                    self._layerUpdated = True
                    newApiSchemas = self._ApplyAPI(apiSchemas, "SkelBindingAPI")
                    primSpec.SetInfo("apiSchemas", newApiSchemas)
                    return

        self._usdLayer.Traverse("/", _PrimSpecProvidesSkelBindingProperties)


    def FixupUpAxis(self):
        """
        Makes sure the layer specifies a upAxis metadata, and if not upAxis
        metadata is set to the default provided by UsdGeom. Marks the layer as 
        updated if fixes are applied.
        """
        from pxr import Usd, UsdGeom
        usdStage = Usd.Stage.Open(self._usdLayer)
        if not usdStage.HasAuthoredMetadata(UsdGeom.Tokens.upAxis):
            self._layerUpdated = True
            usdStage.SetMetadata(UsdGeom.Tokens.upAxis, 
                UsdGeom.GetFallbackUpAxis())


    def FixupRenderSettingsTerminalsAPI(self):
        """
        Makes sure that RenderSettings terminals targeting display filters,
        integrators, and sample filters are relationships instead of output
        connections. Marks the layer as updated if fixes are applied.
        """
        replaceAttrs = ["outputs:ri:displayFilters",
                        "outputs:ri:sampleFilters",
                        "outputs:ri:integrator"]

        def _RenderSettingsTerminalAPIUsesRelationships(path):
            if not path.IsPrimPath():
                return
        
            from pxr import Usd, Sdf
            primSpec = self._usdLayer.GetPrimAtPath(path)
            if primSpec.typeName != "RenderSettings":
                return

            registry = Usd.SchemaRegistry()
            primDef = registry.FindConcretePrimDefinition(primSpec.typeName)
            if "PxrRenderTerminalsAPI" not in primDef.GetAppliedAPISchemas():
                return

            for attr in primSpec.attributes:
                attrName = attr.name
                if attrName in replaceAttrs:
                    conns = attr.connectionPathList.GetAppliedItems()
                    if conns:
                        self._layerUpdated = True
                        relName = attrName.replace("outputs:", "")
                        relPath = primSpec.path.AppendProperty(relName)
                        rel = Sdf.CreateRelationshipInLayer(self._usdLayer,
                            relPath, Sdf.VariabilityUniform, attr.custom)
                        rel.targetPathList.ClearEditsAndMakeExplicit()
                        primPaths = [p.GetPrimPath() for p in conns]
                        rel.targetPathList.explicitItems = primPaths
                        primSpec.RemoveProperty(attr)

        self._usdLayer.Traverse("/", _RenderSettingsTerminalAPIUsesRelationships)


    def FixupCameraProjectionAPI(self):
        """
        Makes sure that PxrCameraProjectionAPI supplies a relationship for
        the ri:projection to be used with a projection plugin target, instead of
        an output connection. Marks the layer as updated if fixes are applied.
        """
        replaceAttr = "outputs:ri:projection"

        def _CameraProjectionAPIUsesRelationship(path):
            if not path.IsPrimPath():
                return

            from pxr import Usd, Sdf
            primSpec = self._usdLayer.GetPrimAtPath(path)
            # Since PxrCameraProjectionAPI is only applied to Camera prims,
            # early out if not a Camera prim.
            if primSpec.typeName != "Camera":
                return

            registry = Usd.SchemaRegistry()
            primDef = registry.FindConcretePrimDefinition(primSpec.typeName)
            if "PxrCameraProjectionAPI" not in primDef.GetAppliedAPISchemas():
                return

            if replaceAttr not in [attr.name for attr in primSpec.attributes]:
                return

            attr = primSpec.GetAttribute(replaceAttr)
            conns = attr.connectionPathList.GetAppliedItems()
            if not conns:
                return

            self._layerUpdated = True
            relName = replaceAttr.replace("outputs:", "")
            relPath = primSpec.path.AppendProperty(relName)
            rel = Sdf.CreateRelationshipInLayer(self._usdLayer,
                relPath, Sdf.VariabilityUniform, attr.custom)
            rel.targetPathList.ClearEditsAndMakeExplicit()
            primPaths = [p.GetPrimPath() for p in conns]
            rel.targetPathList.explicitItems = primPaths
            primSpec.RemoveProperty(attr)

`,"/openusd/pxr/usd/usdUtils/toolPaths.py":`#
# Copyright 2022 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.
#
import os
import platform
import subprocess
import sys
import shutil

# Characters that cmd.exe treats specially. A .cmd wrapper re-expands its
# arguments through the cmd.exe parser, so these characters can alter the
# command being run even when the arguments were passed as a list rather than
# as a shell string. See _ResolveUsdCommand for how this is avoided.
_CMD_METACHARACTERS = frozenset('&|<>^%()"\\r\\n')

def FindUsdBinary(name):
    """Returns the full path to the named executable if it can be found, or
    None if the executable cannot be located. This first searches in PATH, and
    if the executable is not found, it then searches in the parent directory
    of the current process, as identified by sys.argv[0].

    On Windows, this function searches for both name.EXE and name.CMD to
    ensure that CMD-wrapped executables are located if they exist.
    """

    # First search PATH
    binpath = shutil.which(name)
    if binpath:
        return binpath

    # Then look relative to the current executable
    binpath = shutil.which(name,
        path=os.path.abspath(os.path.dirname(sys.argv[0])))
    if binpath:
        return binpath

    if platform.system() == 'Windows':
        # shutil.which under Windows only returns *.EXE files so we need to
        # traverse the tool path.
        path = os.environ.get('PATH', '').split(os.pathsep)
        for base in [os.path.join(p, name) for p in path]:
            # We need to test for name.cmd first because on Windows, the USD
            # executables are wrapped due to lack of UNIX style shebang support.
            for binpath in [base + ext for ext in ('.cmd', '')]:
                if os.access(binpath, os.X_OK):
                    return binpath

    return None

def _GetScriptInterpreter(scriptPath):
    """For Windows only, shebang emulation: returns the interpreter named by
    scriptPath's '#!' line, or None if the file has no usable shebang. The USD
    build substitutes an absolute path to the Python that the tools were
    configured against, so preferring it over sys.executable keeps a spawned
    tool running against its own interpreter.
    """
    try:
        with open(scriptPath, 'r') as f:
            firstLine = f.readline(1024)
    except (IOError, OSError, UnicodeDecodeError):
        return None

    if not firstLine.startswith('#!'):
        return None

    interpreter = firstLine[2:].strip()
    if not interpreter:
        return None

    return interpreter if os.path.isfile(interpreter) else None

def _ResolveUsdCommand(name):
    """Returns the argv prefix used to run the named USD tool, or None if the
    tool cannot be located.

    On Windows, Python tools are installed alongside a generated '<name>.cmd'
    wrapper, because Windows will not execute a script via its '#!' line. That
    wrapper forwards its arguments with '%*', which makes cmd.exe re-parse them
    and reintroduces command injection even for arguments passed as a list. To
    avoid the wrapper, this prefers the script itself and invokes its
    interpreter directly.
    """
    binpath = FindUsdBinary(name)
    if not binpath:
        return None

    if (platform.system() != 'Windows' or
        os.path.splitext(binpath)[1].lower() != '.cmd'):
        return [binpath]

    # The generated .cmd wrapper runs the identically named extensionless script
    # beside it.
    scriptPath = os.path.splitext(binpath)[0]
    if os.path.isfile(scriptPath):
        interpreter = _GetScriptInterpreter(scriptPath) or sys.executable
        if interpreter:
            return [interpreter, scriptPath]

    # Falling back to the wrapper means arguments pass through cmd.exe, so the
    # caller must reject arguments that cmd.exe would interpret.
    sys.stderr.write(
        "Warning: Found only the '%s' wrapper for '%s' and not the script it "
        "runs. Arguments will be interpreted by cmd.exe; arguments containing "
        "cmd.exe special characters will be refused.\\n" % (binpath, name))
    return [binpath]

def RunUsdBinary(name, options=(), paths=(), wait=False, **kwargs):
    """Runs the named USD tool, building its argument list as

        <tool> <options> -- <paths>

    and returns the subprocess.Popen object, or the tool's exit status if wait
    is True. Raises RuntimeError if the tool cannot be found or cannot be run
    safely.

    Paths are passed after a '--' separator so that a path beginning with '-'
    is treated as an operand rather than as an option. Because no shell is
    involved, characters such as ';' and '&' are likewise never interpreted.
    This matters because paths may come from the content of an opened layer.
    Options are passed ahead of the separator and are expected to originate
    with the caller, not with layer content.

    Remaining keyword arguments are forwarded to subprocess.Popen.
    """
    command = _ResolveUsdCommand(name)
    if not command:
        raise RuntimeError(
            "Could not find '%s'. Expected it to be in PATH." % name)

    args = command + [str(o) for o in options]
    paths = [str(p) for p in paths]
    if paths:
        args += ['--'] + paths

    # If arguments will reach cmd.exe by way of a .cmd wrapper, refuse any that
    # it would interpret rather than attempting to quote them; cmd.exe quoting
    # rules do not permit this to be done reliably.
    if os.path.splitext(command[0])[1].lower() == '.cmd':
        for arg in args[1:]:
            if _CMD_METACHARACTERS.intersection(arg):
                raise RuntimeError(
                    "Refusing to run '%s' via its cmd.exe wrapper with the "
                    "argument '%s', which contains characters that cmd.exe "
                    "would interpret." % (name, arg))

    if wait:
        return subprocess.call(args, **kwargs)

    kwargs.setdefault('close_fds', True)
    return subprocess.Popen(args, **kwargs)
`,"/openusd/pxr/usd/usdUtils/updateSchemaWithSdrNode.py":`#!/pxrpythonsubst
#
# Copyright 2021 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.
#

from pxr import Tf, Sdf, Sdr, Usd, UsdShade, UsdUI, UsdUtils, Vt
from pxr.UsdUtils.constantsGroup import ConstantsGroup

class SchemaDefiningKeys(ConstantsGroup):
    API_SCHEMAS_FOR_ATTR_PRUNING = "apiSchemasForAttrPruning"
    API_SCHEMA_AUTO_APPLY_TO = "apiSchemaAutoApplyTo"
    API_SCHEMA_CAN_ONLY_APPLY_TO = "apiSchemaCanOnlyApplyTo"
    IS_USD_SHADE_CONTAINER = "isUsdShadeContainer"
    SCHEMA_PROPERTY_NS_PREFIX_OVERRIDE = "schemaPropertyNSPrefixOverride"
    PROVIDES_USD_SHADE_CONNECTABLE_API_BEHAVIOR = \\
            "providesUsdShadeConnectableAPIBehavior"
    REQUIRES_USD_SHADE_ENCAPSULATION = "requiresUsdShadeEncapsulation"
    SCHEMA_BASE = "schemaBase"
    SCHEMA_KIND = "schemaKind"
    SCHEMA_NAME = "schemaName"
    TF_TYPENAME_SUFFIX = "tfTypeNameSuffix"
    TYPED_SCHEMA_FOR_ATTR_PRUNING = "typedSchemaForAttrPruning"

class SchemaDefiningMiscConstants(ConstantsGroup):
    API_SCHEMA_BASE = "APISchemaBase"
    API_STRING = "API"
    NodeDefAPI = "NodeDefAPI"
    SINGLE_APPLY_SCHEMA = "singleApply"
    TYPED_SCHEMA = "Typed"
    USD_SOURCE_TYPE = "USD"

class PropertyDefiningKeys(ConstantsGroup):
    CONNECTABILITY = "connectability"
    INTERNAL_DISPLAY_GROUP = "Internal"
    NULL_VALUE = "null"
    PROPERTY_NS_PREFIX_OVERRIDE = "propertyNSPrefixOverride"
    SDF_VARIABILITY_UNIFORM_STRING = "Uniform"
    SHADER_ID = "shaderId"
    USD_SUPPRESS_PROPERTY = "usdSuppressProperty"
    USD_VARIABILITY = "usdVariability"
    WIDGET = "widget"
    MIN = "min"
    MAX = "max"
    SLIDER_MIN = "slidermin"
    SLIDER_MAX = "slidermax"
    STRICT_LIMITS = "strictLimits"

class UserDocConstants(ConstantsGroup):
    USERDOC_FULL = "userDoc"
    USERDOC_BRIEF = "userDocBrief"

def _IsNSPrefixConnectableAPICompliant(nsPrefix):
    return (nsPrefix == UsdShade.Tokens.inputs[:1] or \\
            nsPrefix == UsdShade.Tokens.outputs[:1])

def _CreateAttrSpecFromNodeAttribute(primSpec, prop, stage,
        primDefForAttrPruning, schemaPropertyNSPrefixOverride, isSdrInput=True):
    propMetadata = prop.GetMetadata()
    # Early out if the property should be suppressed from being translated to
    # propertySpec
    if ((PropertyDefiningKeys.USD_SUPPRESS_PROPERTY in propMetadata) and
            propMetadata[PropertyDefiningKeys.USD_SUPPRESS_PROPERTY] == "True"):
        return None

    propertyNSPrefixOverride = schemaPropertyNSPrefixOverride
    if PropertyDefiningKeys.PROPERTY_NS_PREFIX_OVERRIDE in propMetadata:
        propertyNSPrefixOverride = \\
            propMetadata[PropertyDefiningKeys.PROPERTY_NS_PREFIX_OVERRIDE]

    propName = prop.GetName()

    # Error out if trying to use an explicit propertyNSPrefixOverride on an
    # output attr
    if (not isSdrInput and propertyNSPrefixOverride is not None and \\
            propertyNSPrefixOverride != UsdShade.Tokens.outputs[:-1]):
        Tf.RaiseRuntimeError("Presence of (%s) output parameter contradicts " \\
            "the presence of propertyNSPrefixOverride (\\"%s\\"), as it is " \\
            "illegal for non-shader nodes to contain output parameters, or " \\
            "shader nodes' outputs to not have the \\"outputs\\" namespace " \\
            "prefix." %(propName, propertyNSPrefixOverride))

    attrType = prop.GetTypeAsSdfType().GetSdfType()
    
    if not Sdf.Path.IsValidNamespacedIdentifier(propName):
        Tf.RaiseRuntimeError("Property name (%s) for schema (%s) is an " \\
                "invalid namespace identifier." %(propName, primSpec.name))

    # if propertyNSPrefixOverride is provided and we are an output then already
    # thrown exception
    # Note that UsdShade inputs and outputs tokens contain the ":" delimiter, so
    # we need to strip this to be used with JoinIdentifier
    if propertyNSPrefixOverride is None:
        propertyNSPrefixOverride = UsdShade.Tokens.inputs[:-1] if isSdrInput \\
                else UsdShade.Tokens.outputs[:-1]

    # Apply propertyNSPrefixOverride
    propName = Sdf.Path.JoinIdentifier([propertyNSPrefixOverride, propName])

    # error and early out if duplicate property on primDefForAttrPruning exists
    # and has different types
    if primDefForAttrPruning:
        primDefAttr = primDefForAttrPruning.GetAttributeDefinition(propName)
        if primDefAttr:
            usdAttrType = primDefAttr.GetTypeName()
            if (usdAttrType != attrType):
                Tf.Warn("Generated schema's property type '%s', "
                        "differs usd schema's property type '%s', for "
                        "duplicated property '%s'" %(attrType, usdAttrType, 
                        propName))
            return propName

    # Copy over property parameters
    options = prop.GetOptions()
    if options and attrType == Sdf.ValueTypeNames.String:
        attrType = Sdf.ValueTypeNames.Token

    attrVariability = Sdf.VariabilityUniform \\
            if ((PropertyDefiningKeys.USD_VARIABILITY in propMetadata) and
                propMetadata[PropertyDefiningKeys.USD_VARIABILITY] == 
                    PropertyDefiningKeys.SDF_VARIABILITY_UNIFORM_STRING) \\
                            else Sdf.VariabilityVarying
    attrSpec = Sdf.AttributeSpec(primSpec, propName, attrType,
            attrVariability)

    # Look up attrSpec's UsdAttribute so we can use UsdUI to populate
    # hint values
    attr = stage.GetAttributeAtPath(attrSpec.path)
    if not attr:
        Tf.RaiseCodingError(
            "Failed to find composed attribute (%s) on " \\
            "schema (%s)" % (propName, primSpec.name))

    attrHints = UsdUI.AttributeHints(attr)
    if not attrHints:
        Tf.RaiseCodingError(
            "Failed to populate UI hints for attribute (%s) on " \\
            "schema (%s)" % (propName, primSpec.name))

    if PropertyDefiningKeys.WIDGET in prop.GetMetadata().keys():
        if (prop.GetMetadata()[PropertyDefiningKeys.WIDGET] == \\
          PropertyDefiningKeys.NULL_VALUE):
            attrHints.SetHidden(True)

    if prop.GetHelp():
        _SetSchemaUserDocFields(attrSpec, prop.GetHelp())
    elif prop.GetLabel(): # fallback documentation can be label
        _SetSchemaUserDocFields(attrSpec, prop.GetLabel())

    if prop.GetPage():
        attrHints.SetDisplayGroup(prop.GetPage())
    if prop.GetLabel():
        attrHints.SetDisplayName(prop.GetLabel())
    if prop.GetShownIf():
        attrHints.SetShownIf(prop.GetShownIf())

    _PopulateArraySizeConstraint(attr, prop)
    _PopulateLimits(attr, prop)
    _PopulateOptions(attrHints, attrSpec, prop, propName, attrType)

    attrSpec.default = prop.GetDefaultValueAsSdfType()

    # The input property should remain connectable (interfaceOnly)
    # even if sdrProperty marks the input as not connectable
    if propertyNSPrefixOverride == UsdShade.Tokens.inputs[:-1] and \\
            not prop.IsConnectable():
        attrSpec.SetInfo(PropertyDefiningKeys.CONNECTABILITY, 
                UsdShade.Tokens.interfaceOnly)

    return propName

def _SetSchemaUserDocFields(spec, doc):
    """
    Sets the user doc custom metadata fields in the generated schema for prim 
    and attribute specs. 
    """
    # Set the "brief" user doc, used for in-context help, e.g. in DCC tools.
    # We currently want the full content, so we don't shorten userDocBrief.
    spec.customData[UserDocConstants.USERDOC_BRIEF] = doc
    # Set the "long-form" user doc, used when generating HTML schema docs
    # (example: https://openusd.org/release/user_guides/schemas/index.html)
    spec.customData[UserDocConstants.USERDOC_FULL] = doc


def StringToBool(val):
    """Convert a string representation of truth to True or False.
    
    True values are 'y', 'yes', 't', 'true', 'on', and '1';
    False values are 'n', 'no', 'f', 'false', 'off', and '0'.
    
    Raises ValueError if \`val\` is anything else.
    """
    val = val.lower()
    if val in ('y', 'yes', 't', 'true', 'on', '1'):
        return True
    elif val in ('n', 'no', 'f', 'false', 'off', '0'):
        return False
    else:
        raise ValueError(f"Invalid truth value: {val}")

def _PopulateArraySizeConstraint(attr, sdrProp):
    if not sdrProp.IsArray():
        return

    # Sdr int and float arrays of size 2, 3, and 4 get turned into statically
    # shaped GfVec "tuples" in USD (e.g., int[3] in a shader becomes int3 in
    # USD). Since element count is built into these types, we never want to
    # write arraySizeConstraint for them.
    staticSizeTypes = [
        Sdf.ValueTypeNames.Int2,
        Sdf.ValueTypeNames.Int3,
        Sdf.ValueTypeNames.Int4,
        Sdf.ValueTypeNames.Float2,
        Sdf.ValueTypeNames.Float3,
        Sdf.ValueTypeNames.Float4,
    ]
    if sdrProp.GetTypeAsSdfType().GetSdfType() in staticSizeTypes:
        return

    # Determine whether a fixed arraySize is present. We want to avoid writing
    # arraySizeConstraint=0 since that's the fallback value.
    arraySize = sdrProp.GetArraySize()
    hasFixedArraySize = arraySize > 0 and not sdrProp.IsDynamicArray()

    tupleSize = sdrProp.GetTupleSize()

    # Translate arraySize and tupleSize values into the USD encoding:
    #   - arraySizeConstraint == 0 indicates the array is dynamic and its size
    #     is unrestricted
    #   - arraySizeConstraint > 0 indicates the exact, fixed size of the array
    #   - arraySizeConstraint < 0 indicates the array is dynamic, but
    #     \`N=abs(arraySizeConstraint)\` is the tuple-length
    if tupleSize > 0:
        attr.SetArraySizeConstraint(-tupleSize)

        # arraySizeConstraint is intentionally a single value to prevent
        # encoding inconsistent arraySize and tupleSize values. This means we
        # can't write both values, even if they *are* consistent with each
        # other (which would correspond to a fixed number of tuples).
        #
        # If both arraySize and tupleSize were specified, issue a warning, and
        # point out if they are inconsistent with each other.
        if hasFixedArraySize:
            consistentStr = 'inconsistent ' \\
                if arraySize % tupleSize != 0 else ''
            Tf.Warn("Ignoring %sarraySize (%d) specified with tupleSize (%d) "
                    "for attribute (%s) on schema (%s)" % \\
                    (consistentStr, arraySize, tupleSize, attr.GetName(),
                     attr.GetPrim().GetName()))
    elif hasFixedArraySize:
        attr.SetArraySizeConstraint(arraySize)

def _ParseLimitsValue(key, attr, sdrProp):
    # Parse and return the value at the given key in metadata, assuming the
    # same value type as sdrProp
    if v := sdrProp.GetMetadata().get(key):
        parsed, err = Sdr.MetadataHelpers.ParseSdfValue(v, sdrProp)
        if not err:
            return parsed
        else:
            Tf.Warn("Failed to parse %s value ('%s') for attribute %s " \\
                    "on schema %s: %s" % \\
                    (key, v, attr.GetName(), attr.GetPrim().GetName(), err))
    return None

def _SetLimits(limits, minimum, maximum):
    if minimum is not None:
        limits.SetMinimum(minimum)
    if maximum is not None:
        limits.SetMaximum(maximum)

def _PopulateLimits(attr, sdrProp):
    # Parse raw limits values out of metadata
    #
    # XXX In the future, SdrShaderProperty should provide a clean API for
    # accessing limits values that hides these parsing details and all the
    # hard vs soft logic below
    minimum = _ParseLimitsValue(PropertyDefiningKeys.MIN, attr, sdrProp)
    maximum = _ParseLimitsValue(PropertyDefiningKeys.MAX, attr, sdrProp)
    sliderMin = _ParseLimitsValue(PropertyDefiningKeys.SLIDER_MIN, attr, sdrProp)
    sliderMax = _ParseLimitsValue(PropertyDefiningKeys.SLIDER_MAX, attr, sdrProp)

    strict = None
    if v := sdrProp.GetMetadata().get(PropertyDefiningKeys.STRICT_LIMITS):
        try:
            strict = StringToBool(v)
        except:
            Tf.Warn("Failed to parse strictLimits value ('%s') for attribute " \\
                    "%s on schema %s" % \\
                    (v, attr.GetName(), attr.GetPrim().GetName()))

    # Now determine which values correspond to hard and soft limits.
    #
    # In general, the "regular" min and max keys become hard limits, and
    # slidermin/slidermax become soft limits. The strictLimits key can override
    # this behavior to make one or the other change destinations:
    #
    #  * strictLimits=True will cause slidermin/slidermax to become hard limits,
    #    but only if neither min nor max are set
    #  * strictLimits=False will cause min/max to become soft limits, regardless
    #    of whether slidermin/slidermax are set
    #
    # Values can be sparsely specified, e.g., slidermin can be specified
    # without a corresponding slidermax.
    sliderValsSpecified = sliderMin is not None or sliderMax is not None
    regularValsSpecified = minimum is not None or maximum is not None

    if sliderValsSpecified:
        if regularValsSpecified:
            if strict in (None, True):
                # No override, apply both sets of values as-is
                _SetLimits(attr.GetSoftLimits(), sliderMin, sliderMax)
                _SetLimits(attr.GetHardLimits(), minimum, maximum)
            else:
                # strictLimits explicitly false, clobber sliderMin/sliderMax
                # with min/max as soft limits
                _SetLimits(attr.GetSoftLimits(), minimum, maximum)
        elif strict in (None, False):
            # No override, sliderMin/sliderMax become soft limits
            _SetLimits(attr.GetSoftLimits(), sliderMin, sliderMax)
        else:
            # strictLimits explicitly true, promote sliderMin/sliderMax into
            # hard limits
            _SetLimits(attr.GetHardLimits(), sliderMin, sliderMax)
    elif regularValsSpecified:
        if strict in (None, True):
            # No override, min/max become hard limits
            _SetLimits(attr.GetHardLimits(), minimum, maximum)
        else:
            # strictLimits explicitly false, demote min/max into soft limits
            _SetLimits(attr.GetSoftLimits(), minimum, maximum)

def _ParseOptionValues(values, attrSpec, sdrProp, propName):
    result = []
    for v in values:
        parsedVal, err = Sdr.MetadataHelpers.ParseSdfValue(v, sdrProp)

        if not err:
            result.append(parsedVal)
        else:
            Tf.Warn("Failed to parse option value ('%s') for attribute (%s) " \\
                    "on schema (%s): %s" % \\
                    (v, propName, attrSpec.owner.name, err))
            return []

    return result

def _PopulateOptions(attrHints, attrSpec, sdrProp, propName, attrType):
    # Translate sdrProp's \`options\` field into either allowedTokens or
    # valueLabels
    #
    # Neither apply to asset params, which use the options hint to indicate
    # when a texture asset is expected.
    options = sdrProp.GetOptions()
    if not options or sdrProp.IsAssetIdentifier():
        return

    # \`options\` is a list of (name, value) tuples that represents either
    # allowedTokens or valueLabels. If both names and values are provided,
    # encode as valueLabels. If only one side is provided (and the attribute is
    # token-valued), author allowedTokens.
    #
    # To continue generating backwards-compatible schemas on a temporary basis,
    # if USD_POPULATE_LEGACY_ALLOWED_TOKENS is set we always populate
    # allowedTokens even if also populating valueLabels.
    names, vals = zip(*options)
    namesProvided = not all(len(n) == 0 for n in names)
    valsProvided = not all(len(v) == 0 for v in vals)

    isTokenValued = attrType == Sdf.ValueTypeNames.Token

    populateLabels = namesProvided and valsProvided
    populateTokens = isTokenValued and \\
        (not populateLabels or
         Tf.GetEnvSetting('USD_POPULATE_LEGACY_ALLOWED_TOKENS'))

    if populateLabels:
        # Write labels, using values that have been parsed to the appropriate
        # value type for the attribute (the elements of \`vals\` are all strings)
        parsedVals = _ParseOptionValues(vals, attrSpec, sdrProp, propName)
        if parsedVals:
            attrHints.SetValueLabels(
                dict(zip(names, parsedVals)))
            attrHints.SetValueLabelsOrder(names)
        else:
            Tf.Warn("Could not set valueLabels for attribute (%s) on " \\
                    "schema (%s)" % (propName, attrSpec.owner.name))

    if populateTokens:
        # Write allowedTokens. Usually only names are provided in this case,
        # but prefer the values if available.
        if valsProvided:
            attrSpec.allowedTokens = vals
        elif namesProvided:
            attrSpec.allowedTokens = names

    # Complain if allowed tokens were provided for a non-token-valued param
    if not isTokenValued and not populateLabels:
        Tf.Warn("Ignoring allowedTokens provided for non-token (%s) " \\
                "valued attribute (%s) on schema (%s): %s" \\
                % (attrType, propName, attrSpec.owner.name, options))

def UpdateSchemaWithSdrNode(schemaLayer, sdrNode, renderContext="",
        overrideIdentifier=""):
    """
    Updates the given schemaLayer with primSpec and propertySpecs from sdrNode
    metadata. 

    A renderContext can be provided which is used in determining the
    shaderId namespace, which follows the pattern: 
    "<renderContext>:<SdrShaderNodeContext>:shaderId". Note that we are using a
    node's context (SDR_NODE_CONTEXT_TOKENS) here to construct the shaderId
    namespace, so shader parsers should make sure to use appropriate
    SDR_NODE_CONTEXT_TOKENS in the node definitions.

    overrideIdentifier parameter is the identifier which should be used when 
    the identifier of the node being processed differs from the one Sdr will 
    discover at runtime, such as when this function is called on a node 
    constructed from an explicit asset path. This should only be used when 
    clients know the identifier being passed is the true identifier which sdr 
    Runtime will provide when querying using GetShaderNodeByIdentifierAndType, 
    etc.

    It consumes the following attributes (that manifest as Sdr 
    metadata) in addition to many of the standard Sdr metadata
    specified and parsed (via its parser plugin).

    Node Level Metadata:
        - "schemaName": Name of the new schema populated from the given sdrNode
          (Required)
        - "schemaKind": Specifies the UsdSchemaKind for the schema being
          populated from the sdrNode. (Note that this does not support
          multiple apply schema kinds).
        - "schemaBase": Base schema from which the new schema should inherit
          from. Note this defaults to "APISchemaBase" for an API schema or 
          "Typed" for a concrete scheme.
        - "apiSchemasForAttrPruning": A list of core API schemas which will be
          composed together and any shared shader property from this prim
          definition is pruned from the resultant schema. 
        - "typedSchemaForAttrPruning": A core typed schema which will be
          composed together with the apiSchemasForAttrPruning and any shared 
          shader property from this prim definition is pruned from the 
          resultant schema. If no typedSchemaForAttrPruning is provided then 
          only the apiSchemasForAttrPruning are composed to create a prim 
          definition. This will only be used when creating an APISchema.
        - "apiSchemaAutoApplyTo": The schemas to which the sdrNode populated 
          API schema will autoApply to.
        - "apiSchemaCanOnlyApplyTo": If specified, the API schema generated 
          from the sdrNode can only be validly applied to this set of schemas.
        - "providesUsdShadeConnectableAPIBehavior": Used to enable a 
          connectability behavior for an API schema.
        - "isUsdShadeContainer": Only used when
          providesUsdShadeConnectableAPIBehavior is set to true. Marks the
          connectable prim as a UsdShade container type.
        - "requiresUsdShadeEncapsulation": Only used when
          providesUsdShadeConnectableAPIBehavior is set to true. Configures the
          UsdShade encapsulation rules governing its connectableBehavior.
        - "tfTypeNameSuffix": Class name which will get registered with TfType 
          system. This gets appended to the domain name to register with TfType.
        - "schemaPropertyNSPrefixOverride": Node level metadata which can drive
          all node's properties namespace prefix. This can be useful for
          non connectable nodes which should not get UsdShade inputs and outputs
          namespace prefix.

    Property Level Metadata:
        - "usdVariability": Property level metadata which specifies a specific 
          sdrNodeProperty should have its USD variability set to Uniform or 
          Varying
        - "usdSuppressProperty": A property level metadata which determines if 
          the property should be suppressed from translation from args to 
          property spec.
        - "propertyNSPrefixOverride": Provides a way to override a property's
          namespace from the default (inputs:/outputs:) or from a node's
          schemaPropertyNSPrefixOverride metadata.

    Sdr Property Metadata to SdfPropertySpec Translations
        - A "null" value for Widget SdrShaderProperty metadata translates to
          'hidden' in the SdfPropertySpec's uiHints metadata dictionary.
        - SdrShaderProperty's Help metadata (Label metadata if Help metadata not
          provided) translates to the SdfPropertySpec's userDocBrief and userDoc
          custom metadata strings.  
        - SdrShaderProperty's Page metadata translates to 'displayGroup'
          in the SdfPropertySpec's uiHints metadata dictionary.
        - SdrShaderProperty's Label metadata translates to 'displayName'
          in the SdfPropertySpec's uiHints metadata dictionary.
        - SdrShaderProperty's Options translates to either 'allowedTokens'
          (when either labels or values are provided) or 'valueLabels' (when
          both labels and values are provided) in the SdfPropertySpec's uiHints
          metadata dictionary. For backwards compatibility, set
          USD_POPULATE_LEGACY_ALLOWED_TOKENS to write allowedTokens in addition
          to valueLabels for string- and token-valued attributes that provide
          both labels and values.
        - SdrShaderProperty's Default value translates to the SdfPropertySpec's
          Default value.
        - Connectable input properties translates to InterfaceOnly
          SdfPropertySpec's CONNECTABILITY.
    """

    import os

    # Early exit on invalid parameters
    if not schemaLayer:
        Tf.Warn("No Schema Layer provided")
        return
    if sdrNode is None:
        # This is a workaround to iterate through invalid sdrNodes (nodes not 
        # having any input or output properties). Currently these nodes return
        # false when queried for IsValid().
        # Refer: pxr/usd/ndr/node.h#140-149
        Tf.Warn("No valid sdrNode provided")
        return

    sdrNodeMetadata = sdrNode.GetMetadata()

    if SchemaDefiningKeys.SCHEMA_NAME not in sdrNodeMetadata:
        Tf.Warn("Sdr Node (%s) does not define a schema name metadata." \\
                %(sdrNode.GetName()))
        return
    schemaName = sdrNodeMetadata[SchemaDefiningKeys.SCHEMA_NAME]
    if not Tf.IsValidIdentifier(schemaName):
        Tf.RaiseRuntimeError("schemaName (%s) is an invalid identifier; "
                "Provide a valid USD identifier for schemaName, example (%s) "
                %(schemaName, Tf.MakeValidIdentifier(schemaName)))

    tfTypeNameSuffix = None
    if SchemaDefiningKeys.TF_TYPENAME_SUFFIX in sdrNodeMetadata:
        tfTypeNameSuffix = sdrNodeMetadata[SchemaDefiningKeys.TF_TYPENAME_SUFFIX]
        if not Tf.IsValidIdentifier(tfTypeNameSuffix):
            Tf.RaiseRuntimeError("tfTypeNameSuffix (%s) is an invalid " \\
                    "identifier" %(tfTypeNameSuffix))

    if SchemaDefiningKeys.SCHEMA_KIND not in sdrNodeMetadata:
        schemaKind = SchemaDefiningMiscConstants.TYPED_SCHEMA
    else:
        schemaKind = sdrNodeMetadata[SchemaDefiningKeys.SCHEMA_KIND]

    # Note: We are not working on dynamic multiple apply schemas right now.
    isAPI = schemaKind == SchemaDefiningMiscConstants.SINGLE_APPLY_SCHEMA
    isTyped = schemaKind == SchemaDefiningMiscConstants.TYPED_SCHEMA

    # Fix schemaName and warn if needed
    if isAPI and \\
        not schemaName.endswith(SchemaDefiningMiscConstants.API_STRING):
        Tf.Warn("node metadata implies the generated schema being created is "
        "an API schema, fixing schemaName to reflect that")
        schemaName = schemaName + SchemaDefiningMiscConstants.API_STRING

    if isAPI and tfTypeNameSuffix and \\
        not tfTypeNameSuffix.endswith(SchemaDefiningMiscConstants.API_STRING):
            Tf.Warn("node metadata implies the generated schema being created "
            "is an API schema, fixing tfTypeNameSuffix to reflect that")
            tfTypeNameSuffix = tfTypeNameSuffix + \\
                    SchemaDefiningMiscConstants.API_STRING

    if SchemaDefiningKeys.SCHEMA_BASE not in sdrNodeMetadata:
        Tf.Warn("No schemaBase specified in node metadata, defaulting to "
                "APISchemaBase for API schemas else Typed")
        schemaBase = SchemaDefiningMiscConstants.API_SCHEMA_BASE if isAPI \\
                else SchemaDefiningMiscConstants.TYPED_SCHEMA
    else:
        schemaBase = sdrNodeMetadata[SchemaDefiningKeys.SCHEMA_BASE]

    apiSchemaAutoApplyTo = None
    if SchemaDefiningKeys.API_SCHEMA_AUTO_APPLY_TO in sdrNodeMetadata:
        apiSchemaAutoApplyTo = \\
            sdrNodeMetadata[SchemaDefiningKeys.API_SCHEMA_AUTO_APPLY_TO] \\
                .split('|')

    apiSchemaCanOnlyApplyTo = None
    if SchemaDefiningKeys.API_SCHEMA_CAN_ONLY_APPLY_TO in sdrNodeMetadata:
        apiSchemaCanOnlyApplyTo = \\
            sdrNodeMetadata[SchemaDefiningKeys.API_SCHEMA_CAN_ONLY_APPLY_TO] \\
                .split('|')

    providesUsdShadeConnectableAPIBehavior = False
    if SchemaDefiningKeys.PROVIDES_USD_SHADE_CONNECTABLE_API_BEHAVIOR in \\
            sdrNodeMetadata:
        providesUsdShadeConnectableAPIBehavior = \\
            StringToBool(sdrNodeMetadata[SchemaDefiningKeys. \\
                PROVIDES_USD_SHADE_CONNECTABLE_API_BEHAVIOR])

    apiSchemasForAttrPruning = None
    if SchemaDefiningKeys.API_SCHEMAS_FOR_ATTR_PRUNING in sdrNodeMetadata:
        apiSchemasForAttrPruning = \\
            sdrNodeMetadata[SchemaDefiningKeys.API_SCHEMAS_FOR_ATTR_PRUNING] \\
                .split('|')

    typedSchemaForAttrPruning = ""
    if isAPI and \\
            SchemaDefiningKeys.TYPED_SCHEMA_FOR_ATTR_PRUNING in sdrNodeMetadata:
        typedSchemaForAttrPruning = \\
            sdrNodeMetadata[SchemaDefiningKeys.TYPED_SCHEMA_FOR_ATTR_PRUNING]

    schemaPropertyNSPrefixOverride = None
    if SchemaDefiningKeys.SCHEMA_PROPERTY_NS_PREFIX_OVERRIDE in sdrNodeMetadata:
        schemaPropertyNSPrefixOverride = \\
            sdrNodeMetadata[ \\
                SchemaDefiningKeys.SCHEMA_PROPERTY_NS_PREFIX_OVERRIDE]

    usdSchemaReg = Usd.SchemaRegistry()

    # determine if the node being processed provides UsdShade-Connectability, 
    # this helps in determining what namespace to use and also to report error 
    # if a non-connectable node has outputs properties, which is malformed.
    # - Does the node derive from a schemaBase which provides connectable
    # behavior. Warn if schemaPropertyNSPrefixOverride is also specified, as 
    # these metadata won't be used.
    # - If no schemaBase then we default to UsdShade connectable node's 
    # inputs:/outputs: namespace prefix, unless schemaPropertyNSPrefixOverride 
    # is provided. 
    # - We also report an error if schemaPropertyNSPrefixOverride is provided 
    # and an output property is found on the node being processed.
    schemaBaseProvidesConnectability = UsdShade.ConnectableAPI. \\
            HasConnectableAPI(usdSchemaReg.GetTypeFromName(schemaBase))

    emitSdrOutput = True
    for outputName in sdrNode.GetShaderOutputNames():
        if PropertyDefiningKeys.USD_SUPPRESS_PROPERTY in \\
                sdrNode.GetShaderOutput(outputName).GetMetadata():
            emitSdrOutput = False
            break;

    if (emitSdrOutput and \\
        len(sdrNode.GetShaderOutputNames()) > 0 and \\
        schemaPropertyNSPrefixOverride is not None and \\
        not _IsNSPrefixConnectableAPICompliant( \\
                schemaPropertyNSPrefixOverride)):
        Tf.RaiseRuntimeError("Presence of (%s) output parameters contradicts " \\
            "the presence of schemaPropertyNSPrefixOverride (\\"%s\\"), as it " \\
            "is illegal for non-connectable nodes to contain output " \\
            "parameters, or shader nodes' outputs to not have the \\"outputs\\"" \\
            "namespace prefix." %(len(sdrNode.GetShaderOutputNames()), \\
            schemaPropertyNSPrefixOverride))

    if (schemaBaseProvidesConnectability and \\
            schemaPropertyNSPrefixOverride is not None and \\
            not _IsNSPrefixConnectableAPICompliant( \\
                schemaPropertyNSPrefixOverride)):
        Tf.Warn("Node %s provides UsdShade-Connectability as it derives from " \\
                "%s, schemaPropertyNSPrefixOverride \\"%s\\" will not be used." \\
                %(schemaName, schemaBase, schemaPropertyNSPrefixOverride))
        # set schemaPropertyNSPrefixOverride to "inputs", assuming default 
        # UsdShade Connectability namespace prefix
        schemaPropertyNSPrefixOverride = "inputs"

    primSpec = schemaLayer.GetPrimAtPath(schemaName)

    if (primSpec):
        # if primSpec already exist, remove entirely and recreate using the 
        # parsed sdr node
        if primSpec.nameParent:
            del primSpec.nameParent.nameChildren[primSpec.name]
        else:
            del primSpec.nameRoot.nameChildren[primSpec.name]

    primSpec = Sdf.PrimSpec(schemaLayer, schemaName, Sdf.SpecifierClass,
            "" if isAPI else schemaName)
    
    primSpec.inheritPathList.explicitItems = ["/" + schemaBase]

    primSpecCustomData = {}
    if isAPI:
        primSpecCustomData["apiSchemaType"] = schemaKind 
    if tfTypeNameSuffix:
        # Defines this classname for TfType system
        # can help avoid duplicate prefix with domain and className
        # Tf type system will automatically pick schemaName as tfTypeName if
        # this is not set!
        primSpecCustomData["className"] = tfTypeNameSuffix

    if apiSchemaAutoApplyTo:
        primSpecCustomData['apiSchemaAutoApplyTo'] = \\
            Vt.TokenArray(apiSchemaAutoApplyTo)
    if apiSchemaCanOnlyApplyTo:
        primSpecCustomData['apiSchemaCanOnlyApplyTo'] = \\
            Vt.TokenArray(apiSchemaCanOnlyApplyTo)

    if providesUsdShadeConnectableAPIBehavior:
        extraPlugInfo = {
            SchemaDefiningKeys.PROVIDES_USD_SHADE_CONNECTABLE_API_BEHAVIOR \\
                    : True
        }
        for propKey in [SchemaDefiningKeys.IS_USD_SHADE_CONTAINER, \\
                SchemaDefiningKeys.REQUIRES_USD_SHADE_ENCAPSULATION]:
            if propKey in sdrNodeMetadata:
                # Since we want to assign the types for these to bool and
                # because in python boolean type is a subset of int, we need to
                # do following instead of assign the propValue directly.
                propValue = StringToBool(sdrNodeMetadata[propKey])
                extraPlugInfo[propKey] = bool(propValue)

        primSpecCustomData['extraPlugInfo'] = extraPlugInfo

    primSpec.customData = primSpecCustomData

    doc = sdrNode.GetHelp()
    if doc != "":
        _SetSchemaUserDocFields(primSpec, doc)

    # Open schemaLayer on a stage so we can use the UsdUI hints API. We'll get
    # missing sublayer warnings for the base schemas since we're not configured
    # to resolve them, but these shouldn't matter since we only care about
    # authoring to schemaLayer. Suppress the warnings with a diagnostic
    # delegate.
    delegate = UsdUtils.CoalescingDiagnosticDelegate()
    stage = Usd.Stage.Open(schemaLayer)
    del delegate

    if not stage:
        Tf.RaiseCodingError(
            "Failed to open schema layer '%s' on a stage" \\
            % schemaLayer.identifier)

    # Populate open-by-default display groups
    nodePrim = stage.GetPrimAtPath(primSpec.path)
    if not nodePrim:
        Tf.RaiseCodingError(
            "Failed to find composed node prim '%s'" % primSpec.name)

    primHints = UsdUI.PrimHints(nodePrim)
    for page in sdrNode.GetOpenPages():
        primHints.SetDisplayGroupExpanded(page, True)

    # gather properties from a prim definition generated by composing apiSchemas
    # provided by apiSchemasForAttrPruning metadata.
    primDefForAttrPruning = None
    if apiSchemasForAttrPruning:
        primDefForAttrPruning = usdSchemaReg.BuildComposedPrimDefinition(
                typedSchemaForAttrPruning, apiSchemasForAttrPruning)
    else:
        primDefForAttrPruning = \\
            usdSchemaReg.FindConcretePrimDefinition(typedSchemaForAttrPruning)

    # We want the property order on the output schema to match the param order
    # from the source shader. SdrShaderNode should give the params to us in this
    # order, so remember it as we go.
    propOrder = []

    # \`shownIf\` expressions refer to shader params by their Sdr names. But as
    # we create attribute specs for each param, we modify their namespaces (see
    # _CreateAttrSpecFromNodeAttribute()).
    #
    # Track such changes so we can fix up shownIf expressions once the final
    # names are all known.
    attrsWithShownIf = []
    attrRenames = {}

    # Track "legacy" allowedTokens opinions (see note in _PopulateOptions()
    # above), so we can emit a warning below. Clients should move to consuming
    # valueLabels in these cases.
    attrsWithLegacyAllowedTokens = set()

    def _recordAttrInfo(attrName, sdrProp):
        # Property order
        propOrder.append(attrName)
        attrRenames[sdrProp.GetName()] = attrName

        # shownIf
        attr = stage.GetAttributeAtPath(
            primSpec.path.AppendProperty(attrName))
        attrHints = UsdUI.AttributeHints(attr)

        if not attrHints:
            return

        if attrHints.GetShownIf():
            attrsWithShownIf.append(attr)

        # Legacy allowedTokens
        attrSpec = primSpec.attributes.get(attrName)

        if not attrSpec:
            return

        if attrSpec.allowedTokens and attrHints.GetValueLabels():
            attrsWithLegacyAllowedTokens.add(attrName)

    # Create attrSpecs from input parameters
    for propName in sdrNode.GetShaderInputNames():
        sdrProp = sdrNode.GetShaderInput(propName)
        attrName = _CreateAttrSpecFromNodeAttribute(
                primSpec, sdrProp, stage,
                primDefForAttrPruning, schemaPropertyNSPrefixOverride)
        if attrName:
            _recordAttrInfo(attrName, sdrProp)

    # Create attrSpecs from output parameters
    # Note that we always want outputs: namespace prefix for output attributes.
    for propName in sdrNode.GetShaderOutputNames():
        sdrProp = sdrNode.GetShaderOutput(propName)
        attrName = _CreateAttrSpecFromNodeAttribute(
                primSpec, sdrProp, stage,
                primDefForAttrPruning, UsdShade.Tokens.outputs[:-1], False)
        if attrName:
            _recordAttrInfo(attrName, sdrProp)

    # Fix up both param-level and node-level shownIf expressions with the
    # final attribtue names, and write them
    for attr in attrsWithShownIf:
        attrHints = UsdUI.AttributeHints(attr)
        if attrHints:
            # XXX: Should be using Sdf.BooleanExpression.RenameVariables()
            # directly here, but it hasn't been wrapped yet
            attrHints.SetShownIf(
                UsdUtils._BooleanExpressionRenameVariables(
                    attrHints.GetShownIf(), attrRenames))

    pagesShownIf = sdrNode.GetPagesShownIf()
    for page, expr in pagesShownIf.items():
        # XXX: Ditto above
        pagesShownIf[page] = \\
            UsdUtils._BooleanExpressionRenameVariables(expr, attrRenames)

    if pagesShownIf:
        primHints.SetDisplayGroupsShownIf(pagesShownIf)

    if attrsWithLegacyAllowedTokens:
        Tf.Warn("%s: Wrote both valueLabels and allowedTokens for %d "
                "attribute(s)" % \\
                (sdrNode.GetName(), len(attrsWithLegacyAllowedTokens)))

    # Forward the source param order for typed and single-apply. Multiple-apply
    # schemas cannot specify propertyOrder.
    if (isTyped or isAPI) and propOrder:
        primSpec.propertyOrder = propOrder

    # Create token shaderId attrSpec -- only for shader nodes
    if (schemaBaseProvidesConnectability or \\
            schemaPropertyNSPrefixOverride is None or \\
            _IsNSPrefixConnectableAPICompliant(schemaPropertyNSPrefixOverride)):
        # We must add shaderId for all shaderNodes with the same identifier
        # across all shadingSystem, so that we get appropriate
        # renderContext:shadingSystem:shaderId attribute.
        sdrRegistry = Sdr.Registry()
        shaderNodesForShaderIdAttrs = [
            node for node in sdrRegistry.GetShaderNodesByIdentifier(
                sdrNode.GetIdentifier())]
        shaderIdAttrNames = set()
        for node in shaderNodesForShaderIdAttrs:

            shaderIdAttrNames.add(Sdf.Path.JoinIdentifier( \\
                    [renderContext, node.GetContext(), 
                        PropertyDefiningKeys.SHADER_ID]))
        
        for shaderIdAttrName in shaderIdAttrNames:
            shaderIdAttrSpec = Sdf.AttributeSpec(primSpec, shaderIdAttrName,
                    Sdf.ValueTypeNames.Token, Sdf.VariabilityUniform)

            # Since users shouldn't need to be aware of shaderId attribute, we 
            # put this in "Internal" displayGroup.
            shaderIdAttrSpec.displayGroup = \\
                    PropertyDefiningKeys.INTERNAL_DISPLAY_GROUP

            # We are iterating on sdrNodes which are guaranteed to be registered
            # with sdrRegistry and it only makes sense to add shaderId for these
            # shader nodes, so directly get the identifier from the node itself.
            shaderIdAttrSpec.default = sdrNode.GetIdentifier()

    # Extra attrSpec
    schemaBasePrimDefinition = \\
        Usd.SchemaRegistry().FindConcretePrimDefinition(schemaBase)
    if schemaBasePrimDefinition and \\
        SchemaDefiningMiscConstants.NodeDefAPI in \\
        schemaBasePrimDefinition.GetAppliedAPISchemas():
            infoIdAttrSpec = Sdf.AttributeSpec(primSpec, \\
                    UsdShade.Tokens.infoId, Sdf.ValueTypeNames.Token, \\
                    Sdf.VariabilityUniform)

            # Use the identifier if explicitly provided (the node may have been
            # constructed from an explicit asset path, in which case its own
            # identifier is synthesized and will not resolve at runtime), else
            # use sdrNode's registered identifier.
            infoIdAttrSpec.default = overrideIdentifier if overrideIdentifier \\
                    else sdrNode.GetIdentifier()

    schemaLayer.Save()
`,"/openusd/pxr/usd/usdUtils/usdzUtils.py":`#
# Copyright 2022 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.
#

import mmap
import os
import shutil
import sys
import tempfile
import zipfile

def _Print(msg):
    print(msg)

def _Err(msg):
    sys.stderr.write(msg + '\\n')

def _AllowedUsdzExtensions():
    return [".usdz"]

def _AllowedUsdExtensions():
    return [".usd", ".usda", ".usdc"]


def ExtractUsdzPackage(usdzFile, extractDir, verbose=False, force=False):
    """Extract a .usdz package usdzFile to extractDir.

    Entries are written at their archive-relative paths verbatim.  Nested .usdz
    files are left as-is inside the extract dir; callers that need to walk their
    contents should use UsdzScanIterator or UsdzUpdateIterator, both of which
    handle nesting natively.

    Returns True on success, False on any error.

    """
    if not usdzFile.endswith('.usdz'):
        if verbose:
            _Print("'%s' does not have .usdz extension" % usdzFile)
        return False

    if not os.path.exists(usdzFile):
        if verbose:
            _Print("usdz file '%s' does not exist." % usdzFile)
        return False

    if not extractDir:
        if verbose:
            _Print("No extract dir specified")
        return False

    absExtractDir = os.path.abspath(extractDir)

    if os.path.exists(absExtractDir) and not os.path.isdir(absExtractDir):
        if verbose:
            _Print("Extract path '%s' exists and is not a directory." %
                   extractDir)
        return False

    if force and os.path.isdir(absExtractDir):
        shutil.rmtree(absExtractDir)

    if os.path.isdir(absExtractDir):
        if verbose:
            _Print("Extract Dir: '%s' already exists." % extractDir)
        return False

    parent = os.path.dirname(absExtractDir) or '.'
    tmpExtractPath = tempfile.mkdtemp(dir=parent)
    try:
        with zipfile.ZipFile(usdzFile) as usdzArchive:
            if verbose:
                _Print("Extracting usdz file '%s' to '%s'" %
                       (usdzFile, absExtractDir))
            usdzArchive.extractall(tmpExtractPath)
        os.rename(tmpExtractPath, absExtractDir)
        return True
    except Exception as e:
        _Err("Failed to extract usdz '%s': %s" % (usdzFile, e))
        shutil.rmtree(tmpExtractPath, ignore_errors=True)
        return False

class UsdzScanIterator:
    """Read-only iterator over the entries of a .usdz package.

    Within context, yields (arcname, memoryview) pairs for each file entry.
    Nested .usdz packages are recursed into transparently; arcnames inside
    nested packages use '/' to join boundaries (e.g. 'inner.usdz/foo.usdc').

    The memoryview is a zero-copy slice over an mmap of the outermost package
    file.  It is invalid after __exit__; to retain bytes past the context, copy
    explicitly via bytes(view) or view.tobytes().

    The zip directory itself is parsed via Sdf.ZipFile (we read offsets from it
    but slice bytes out of our own mmap, so GetFile's bytes-copying path is
    never taken).  Nested .usdz packages are spilled to a temp file just long
    enough to call Sdf.ZipFile.Open on them; the bytes we yield are still slices
    of the outer mmap.

    """

    def __init__(self, usdzPath, *, recurse=True, verbose=False):
        self._path = usdzPath
        self._recurse = recurse
        self._verbose = verbose
        self._fd = None
        self._mmap = None
        self._views = []
        self._tmpFiles = []

    def __enter__(self):
        self._fd = open(self._path, 'rb')
        try:
            size = os.fstat(self._fd.fileno()).st_size
            if size == 0:
                raise ValueError("'%s' is empty" % self._path)
            self._mmap = mmap.mmap(
                self._fd.fileno(), 0, access=mmap.ACCESS_READ)
        except Exception:
            self._fd.close()
            self._fd = None
            raise
        return self

    def __exit__(self, excType, excVal, excTB):
        for v in self._views:
            try:
                v.release()
            except Exception:
                pass
        self._views = []
        for tmp in self._tmpFiles:
            try:
                os.unlink(tmp)
            except OSError:
                pass
        self._tmpFiles = []
        if self._mmap is not None:
            self._mmap.close()
            self._mmap = None
        if self._fd is not None:
            self._fd.close()
            self._fd = None

    def __iter__(self):
        if self._mmap is None:
            raise RuntimeError("UsdzScanIterator used outside of its context")
        from pxr import Sdf
        zipFile = Sdf.ZipFile.Open(self._path)
        if zipFile is None:
            raise ValueError("Sdf.ZipFile.Open failed for '%s'" % self._path)
        yield from self._Walk(zipFile, 0, "")

    def _Walk(self, zipFile, baseOffset, prefix):
        for name in zipFile.GetFileNames():
            if name.endswith('/'):
                continue
            info = zipFile.GetFileInfo(name)
            if info is None:
                continue
            if info.encrypted:
                if self._verbose:
                    _Print("Skipping encrypted entry: %s" % name)
                continue
            if info.compressionMethod != 0:
                if self._verbose:
                    _Print("Skipping non-stored entry (method %d): %s"
                           % (info.compressionMethod, name))
                continue
            dataAbs = baseOffset + info.dataOffset
            full = prefix + name
            if self._recurse and name.lower().endswith('.usdz'):
                if self._verbose:
                    _Print("Recursing into nested usdz: %s" % full)
                yield from self._WalkNested(dataAbs, info.size, full)
            else:
                view = memoryview(self._mmap)[dataAbs:dataAbs + info.size]
                self._views.append(view)
                yield (full, view)

    def _WalkNested(self, dataAbs, size, arcname):
        from pxr import Sdf
        tmpFd, tmpPath = tempfile.mkstemp(
            suffix='.usdz', prefix='.usdzScan.%d.' % os.getpid())
        try:
            os.write(tmpFd, bytes(self._mmap[dataAbs:dataAbs + size]))
        finally:
            os.close(tmpFd)
        self._tmpFiles.append(tmpPath)
        nested = Sdf.ZipFile.Open(tmpPath)
        if nested is None:
            if self._verbose:
                _Print("Could not open nested usdz: %s" % arcname)
            return
        yield from self._Walk(nested, dataAbs, arcname + '/')


class UsdzUpdateIterator:
    """Extract a .usdz package on enter; on clean exit, atomically rewrite the
    package (optionally to a different output path) from the (possibly modified)
    extracted contents.

    Atomic rewrite: pack to a sibling temp file (see naming below),
    optionally chmod/chown to match the original, then os.replace() into
    place.  The original is left untouched on any failure along the way.

    Attribute preservation is opt-in per axis via preserveMode, preserveGroup,
    and preserveOwner.  They are independent because they need different
    privileges: chmod needs only ownership of the temp (which we always have),
    setting the group needs membership in the original's group, and setting the
    owner effectively needs root.  A caller that wants the rewrite to inherit
    the running user's identity while keeping the original's permissions asks
    for mode and group but not owner.

    If the with-block raises, the rewrite is skipped entirely.

    Temp-file naming:
        extract dir:    .usdzExtract[.<tag>].<pid>.<random>/
        rewrite temp:   <output>[.<tag>].<pid>.tmp.usdz
    The optional 'tag' argument lets callers (e.g. a campaign script)
    inject a distinctive marker so abandoned temps from a crash can be
    identified unambiguously by name.  Tag should be a simple identifier
    (letters/digits/dashes/underscores); callers are responsible for not
    passing path separators or bracket characters.

    Platform notes:
    - The preserve* flags are POSIX-only and rejected on Windows; os.chown is
      not available and os.chmod only honors the read-only bit there, so
      there's no meaningful permission/ownership to copy.
    - On Windows, os.replace fails if another process holds the destination open
      (sharing violation).  Callers that need to tolerate that should retry
      around the with-block.

    """

    def __init__(self, usdzPath, *, outputPath=None, preserveMode=False,
                 preserveGroup=False, preserveOwner=False,
                 parentDir=None, tag=None, verbose=False):
        if (preserveMode or preserveGroup or preserveOwner) \\
                and os.name == 'nt':
            raise ValueError("preserveMode, preserveGroup and preserveOwner "
                             "are not supported on Windows")
        self._inputPath = os.path.abspath(usdzPath)
        self._outputPath = (os.path.abspath(outputPath) if outputPath
                            else self._inputPath)
        self._preserveMode = preserveMode
        self._preserveGroup = preserveGroup
        self._preserveOwner = preserveOwner
        self._parentDir = parentDir
        self._tag = tag
        self._verbose = verbose
        self._extractDir = None

    def _TaggedInfix(self):
        """'.<tag>.' if tagged, else '.'.  Used in temp-name construction."""
        return f".{self._tag}." if self._tag else "."

    def __enter__(self):
        # Both branches use mkdtemp so two same-stem nested packages
        # (e.g. dirA/nested.usdz and dirB/nested.usdz inside the same outer) get
        # distinct extract dirs.  Previously the parentDir branch derived the
        # extract dir name from the input file's stem; that was safe only under
        # strictly sequential iteration.
        prefix = '.usdzExtract%s%d.' % (self._TaggedInfix(), os.getpid())
        if self._parentDir is not None:
            parent = self._parentDir
        else:
            parent = os.path.dirname(self._outputPath) or '.'
        self._extractDir = tempfile.mkdtemp(prefix=prefix, dir=parent)

        if not ExtractUsdzPackage(self._inputPath, self._extractDir,
                                  verbose=self._verbose, force=True):
            raise RuntimeError(
                "Failed to extract usdz package '%s' to '%s'"
                % (self._inputPath, self._extractDir))
        return self

    def __exit__(self, excType, excVal, excTB):
        try:
            if excType is not None:
                if self._verbose:
                    _Print("UsdzUpdateIterator: skipping rewrite due "
                           "to exception (%s)" % excType.__name__)
                return

            if not self._extractDir or not os.path.isdir(self._extractDir):
                return

            preserveAny = (self._preserveMode or self._preserveGroup
                           or self._preserveOwner)
            origStat = None
            if preserveAny and os.path.exists(self._inputPath):
                origStat = os.stat(self._inputPath)

            tmpPath = "%s%s%d.tmp.usdz" % (
                self._outputPath, self._TaggedInfix(), os.getpid())

            self._WritePackage(tmpPath)

            if origStat is not None:
                try:
                    # chown first: on some platforms it clears setuid/setgid,
                    # so the mode has to be applied after it, not before.
                    if self._preserveGroup or self._preserveOwner:
                        os.chown(
                            tmpPath,
                            origStat.st_uid if self._preserveOwner else -1,
                            origStat.st_gid if self._preserveGroup else -1)
                    if self._preserveMode:
                        os.chmod(tmpPath, origStat.st_mode & 0o7777)
                except OSError:
                    try:
                        os.unlink(tmpPath)
                    except OSError:
                        pass
                    raise

            os.replace(tmpPath, self._outputPath)
        finally:
            if self._extractDir and os.path.isdir(self._extractDir):
                shutil.rmtree(self._extractDir, ignore_errors=True)

    def _WritePackage(self, outPath):
        from pxr import Sdf, Tf
        with Sdf.ZipFileWriter.CreateNew(outPath) as usdzWriter:
            for absPath, arcname in self.Entries():
                if self._verbose:
                    _Print('.. adding: %s' % arcname)
                try:
                    usdzWriter.AddFile(absPath, arcname)
                except Tf.ErrorException:
                    _Err("Failed to add file '%s' (as '%s') to package. "
                         "Discarding." % (absPath, arcname))
                    raise

    def Entries(self):
        """Yield (absPath, arcname) for every regular file under the extract
        dir.  Flat: nested .usdz packages appear as a single file entry, not
        their contents.  Arcnames use '/' separators."""
        if not self._extractDir or not os.path.isdir(self._extractDir):
            return
        for root, _dirs, files in os.walk(self._extractDir):
            for f in files:
                absPath = os.path.join(root, f)
                rel = os.path.relpath(absPath, self._extractDir)
                arcname = rel.replace(os.sep, '/')
                yield absPath, arcname

    def UsdAssets(self):
        """Yield absolute paths to all usd/usda/usdc/usdz assets under the
        extract dir.  Nested .usdz packages are recursed into via a fresh
        nested iterator."""
        allowed = _AllowedUsdzExtensions() + _AllowedUsdExtensions()
        for absPath, arcname in list(self.Entries()):
            ext = os.path.splitext(arcname)[1]
            if ext not in allowed:
                continue
            if ext in _AllowedUsdzExtensions():
                if self._verbose:
                    _Print("Iterating nested usdz asset: %s" % arcname)
                with UsdzUpdateIterator(absPath,
                                        parentDir=self._extractDir,
                                        verbose=self._verbose) as nested:
                    yield from nested.UsdAssets()
            else:
                if self._verbose:
                    _Print("Iterating usd asset: %s" % arcname)
                yield absPath

    def AllAssets(self):
        """Yield absolute paths to every asset under the extract dir, recursing
        transparently into nested .usdz packages."""
        for absPath, arcname in list(self.Entries()):
            ext = os.path.splitext(arcname)[1]
            if ext in _AllowedUsdzExtensions():
                if self._verbose:
                    _Print("Iterating nested usdz asset: %s" % arcname)
                with UsdzUpdateIterator(absPath,
                                        parentDir=self._extractDir,
                                        verbose=self._verbose) as nested:
                    yield from nested.AllAssets()
            else:
                if self._verbose:
                    _Print("Iterating usd asset: %s" % arcname)
                yield absPath


class UsdzAssetIterator(UsdzUpdateIterator):
    """Deprecated: use UsdzUpdateIterator for new code.

    Thin compatibility shim preserving the legacy positional signature
    UsdzAssetIterator(usdzFile, verbose, parentDir=None).  Behaves like
    UsdzUpdateIterator with outputPath=usdzFile and no attribute preservation.
    """
    def __init__(self, usdzFile, verbose, parentDir=None):
        super().__init__(usdzFile,
                         outputPath=None,
                         parentDir=parentDir,
                         verbose=verbose)
`,"/openusd/pxr/base/vt/__init__.py":`#
# Copyright 2016 Pixar
#
# Licensed under the terms set forth in the LICENSE.txt file available at
# https://openusd.org/license.
#
"""Vt Value Types library

This package defines classes for creating objects that behave like value
types.  It contains facilities for creating simple copy-on-write
implicitly shared types.
"""

from pxr import Tf
Tf.PreparePythonModule()
del Tf

# For ease-of-use, put each XXXArrayFromBuffer method on its corresponding array
# wrapper class, also alias it as 'FromNumpy' for compatibility.
def _CopyArrayFromBufferFuncs(moduleContents):
    funcs = dict([(key, val) for (key, val) in moduleContents.items()
                  if key.endswith('FromBuffer')])
    classes = dict([(key, val) for (key, val) in moduleContents.items()
                    if key.endswith('Array') and isinstance(val, type)])

    for funcName, func in funcs.items():
        className = funcName[:-len('FromBuffer')]
        cls = classes.get(className)
        if cls:
            setattr(cls, 'FromBuffer', staticmethod(func))
            setattr(cls, 'FromNumpy', staticmethod(func))

_CopyArrayFromBufferFuncs(dict(vars()))
del _CopyArrayFromBufferFuncs
`},W="/pxr-python",X="/openusd",H="/pxr-python/examples";export{M as createPxrInteractive,H as examplesDir,z as files,V as jspiSupported,B as loadPxrPythonInBrowser,X as openusdSrc,W as pythonDir};

const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./_virtual_pxr-python-BULcGHPT.js","./usd-core-DUbHzUpd.js"])))=>i.map(i=>d[i]);
var d=Object.defineProperty;var r=(s,e)=>d(s,"name",{value:e,configurable:!0});import{j4 as l}from"./usd-core-DUbHzUpd.js";import{v as p}from"./app-root-BCR8JKkC.js";import{peerVariables as c}from"./shared-variables-HKwVnz-4.js";import{usdviewApiDocs as u}from"./usdview-api-BWlr5Frl.js";let n;function h(){return n??=(async()=>{const s=await l(()=>import("./_virtual_pxr-python-BULcGHPT.js"),__vite__mapDeps([0,1]),import.meta.url);if(!s.jspiSupported())throw new Error("Python needs JavaScript Promise Integration (WebAssembly.Suspending), which this browser does not provide.");const e=new URL("pxr-pyodide/",p()).href,t=new URL("pyodide.mjs",e).href,{loadPyodide:o}=await import(t),a=await s.loadPxrPythonInBrowser({loadPyodide:o,indexURL:e,files:s.files,pythonDir:s.pythonDir,openusdSrc:s.openusdSrc});return{py:s,pxr:a,pyodide:a.pyodide}})(),n.catch(()=>{n=void 0}),n}r(h,"loadPagePython");const m=`
import os, importlib, pxr
from pxr import _bridge
# Each library directory of the package (python/pxr/<Lib>/, whose
# __init__.py is upstream's, found by pxr/__init__.py's finder).
for _name in sorted(os.listdir(pxr.__path__[0])):
    if not _name.startswith('_') and os.path.isdir(os.path.join(pxr.__path__[0], _name)):
        try:
            globals()[_name] = importlib.import_module('pxr.' + _name)
        except Exception:
            pass

# usdviewApi.py:14-246 UsdviewApi's public names; dir() lists those the
# viewer's port provides (members forward by rule 1: PrintStatus -> printStatus).
_USDVIEW_API_NAMES = (
    'dataModel', 'stage', 'frame', 'prim', 'validationErrors',
    'selectedValidationErrors', 'selectedPoint', 'selectedPrims',
    'selectedPaths', 'selectedInstances', 'spec', 'layer', 'cameraPrim',
    'currentGfCamera', 'viewportSize', 'configDir', 'stageIdentifier',
    'qMainWindow', 'viewerMode', 'property', 'ComputeModelsFromSelection',
    'ComputeSelectedPrimsOfType', 'UpdateGUI', 'PrintStatus', 'GetSettings',
    'ClearPrimSelection', 'AddPrimToSelection', 'GrabWindowShot',
    'GrabViewportShot', 'UpdateViewport', 'SetViewportRenderer',
    'GetViewportRendererNames', 'GetViewportCurrentRendererId')

class UsdviewApi(_bridge.Opaque):
    """This class is an interface that provides access to Usdview context for
    Usdview plugins and other clients. It abstracts away the implementation of
    Usdview so that the core can change without affecting clients.
    """
    __slots__ = ()

    def __dir__(self):
        # Membership only (Reflect.has): dir() reads no property.
        from js import Reflect
        return sorted(n for n in _USDVIEW_API_NAMES
                      if Reflect.has(self._js, _bridge.camel_name(n))
                      or Reflect.has(self._js, n))


class UsdviewDataModel(_bridge.Opaque):
    """rootDataModel.py RootDataModel / appController's data model: the
    stage, the current frame and the selection the viewer considers."""
    __slots__ = ()

    @property
    def currentFrame(self):
        """Get a Usd.TimeCode object which represents the current frame being
        considered in Usdview."""
        return _bridge.get_property(self._js, 'currentFrame')

    @currentFrame.setter
    def currentFrame(self, value):
        """Set the current frame to a new Usd.TimeCode object."""
        # rootDataModel.py:152-162: a Usd.TimeCode, else ValueError.
        from pxr import Usd as _Usd
        if not isinstance(value, _Usd.TimeCode):
            raise ValueError("Expected Usd.TimeCode, got: {}".format(value))
        self._js.currentFrame = value._js


def _usdviewApiMember(name, doc):
    """usdviewApi.py's properties (lower-case names) and methods, with their
    docstrings, forwarding to the port's member of the rule-1 name; only
    viewerMode has a setter (usdviewApi.py:146-156)."""
    core = _bridge.camel_name(name)
    if name == 'dataModel':
        def fget(self):
            return UsdviewDataModel._from_js(self._js.dataModel)
        return property(fget, None, doc=doc)
    if name[:1].islower():
        def fget(self):
            return _bridge.get_property(self._js, core)
        fset = None
        if name == 'viewerMode':
            def fset(self, value):
                self._js.viewerMode = bool(value)
        return property(fget, fset, doc=doc)
    def method(self, *args):
        return _bridge.call_method(self._js, core, *args)
    method.__name__ = name
    method.__qualname__ = 'UsdviewApi.' + name
    method.__doc__ = doc
    return method


_docs = _usdviewApiDocs.to_py()
for _name in _USDVIEW_API_NAMES:
    _doc = _docs.get(_bridge.camel_name(_name))
    if _doc is not None:
        setattr(UsdviewApi, _name, _usdviewApiMember(_name, _doc))

usdviewApi = UsdviewApi._from_js(_usdviewApiJs)
del _usdviewApiJs, _usdviewApiDocs, _docs, _doc, _name

# ---- Variables shared with the TypeScript console (src/shared-variables.ts)
# A web addition: 'ts' reads and writes the TypeScript console's variables;
# the TypeScript console's 'py' reads and writes these, through _share_get,
# _share_set and _share_names. Library objects cross as the core's objects
# (a Python wrapper's _js), lists and dicts as arrays and objects, and
# functions as callables that convert their arguments and results.
from pyodide.ffi import JsProxy as _JsProxy, to_js as _to_js, create_proxy as _create_proxy, run_sync as _run_sync


def _share_out(value):
    """A Python value as the TypeScript console sees it."""
    import js
    if value is None or isinstance(value, (bool, int, float, str, _JsProxy)):
        return value
    if (getattr(type(value), '_as_core_argument', None) is not None
            or getattr(value, '_js', None) is not None):
        return _bridge.unwrap(value)
    if isinstance(value, (list, tuple)):
        return _to_js([_share_out(v) for v in value])
    if isinstance(value, dict):
        return _to_js({str(k): _share_out(v) for k, v in value.items()},
                      dict_converter=js.Object.fromEntries)
    if callable(value) and not isinstance(value, type):
        def call(*args):
            return _share_out(value(*[_share_in(a) for a in args]))
        return _create_proxy(call)
    return value


def _share_in(value):
    """A TypeScript value as Python sees it."""
    import inspect
    if inspect.isawaitable(value):
        # A Promise (an async function's result), as Pyodide hands it over.
        return _share_in(_run_sync(value))
    if not isinstance(value, _JsProxy):
        return value
    kind = _bridge.ts.kindOf(value)
    if kind == 'array':
        return [_share_in(v) for v in value]
    if kind == 'record':
        return {str(e[0]): _share_in(e[1]) for e in value.object_entries()}
    if kind == 'promise':
        return _share_in(_run_sync(value))
    if kind == 'function' and not _bridge._is_class(value):
        def call(*args):
            return _share_in(value(*[_share_out(a) for a in args]))
        call.__name__ = str(getattr(value, 'name', '') or 'function')
        return call
    return _bridge.wrap(value)


class _TypeScriptVariables(object):
    """The TypeScript console's variables: ts.name reads one, ts.name = value
    sets it."""
    __slots__ = ()

    def __getattr__(self, name):
        if name.startswith('__'):
            raise AttributeError(name)
        if not _tsPeerJs.has(name):
            raise AttributeError('the TypeScript console has no variable %r' % name)
        return _share_in(_tsPeerJs.get(name))

    def __setattr__(self, name, value):
        _tsPeerJs.set(name, _share_out(value))

    def __dir__(self):
        try:
            return sorted(str(n) for n in _tsPeerJs.names())
        except Exception:
            return []

    def __repr__(self):
        try:
            return '<TypeScript variables: %s>' % ', '.join(self.__dir__())
        except Exception:
            return '<TypeScript variables>'


ts = _TypeScriptVariables()
_share_scope = globals()


def _share_names():
    return _to_js([n for n in _share_scope if n not in _share_seeded and not n.startswith('_')])


def _share_has(name):
    return name in _share_scope


def _share_get(name):
    return _share_out(_share_scope[name])


def _share_set(name, value):
    _share_scope[name] = _share_in(value)


_share_seeded = set(globals()) | {'_share_seeded'}
`;class f{static{r(this,"PythonInterpreter")}constructor(e){this._session=e,this.ps1=e.ps1,this.ps2=e.ps2,this.banner=e.banner;const t=e.locals;this.locals=new Proxy({},{get:r((a,i)=>typeof i=="string"&&t.has(i)?t.get(i):void 0,"get"),has:r((a,i)=>typeof i=="string"&&t.has(i),"has"),ownKeys:r(()=>[...t.keys()],"ownKeys"),getOwnPropertyDescriptor:r((a,i)=>typeof i=="string"&&t.has(i)?{configurable:!0,enumerable:!0,value:t.get(i)}:void 0,"getOwnPropertyDescriptor")});const o=r(a=>t.get(a),"fn");this.shared={names:r(()=>[...o("_share_names")()],"names"),has:r(a=>!!o("_share_has")(a),"has"),get:r(a=>o("_share_get")(a),"get"),set:r((a,i)=>{o("_share_set")(a,i)},"set")}}title="Python Interpreter";ps1;ps2;banner;locals;shared;sharedHint="Use `ts.name` to read or set the TypeScript Interpreter's variable `name`.";async runSource(e,t){const{more:o,output:a}=await this._session.runSource(e);for(const[i,_]of a)t.write(i,_);return o}complete(e){return this._session.complete(e)}}async function v(s,e){s.locals.set("_usdviewApiJs",e.usdviewApi),s.locals.set("_usdviewApiDocs",u);const t=r(()=>c(e.peers,"typescript"),"peer");return s.locals.set("_tsPeerJs",{names:r(()=>t().names(),"names"),has:r(o=>t().has(o),"has"),get:r(o=>t().get(o),"get"),set:r((o,a)=>t().set(o,a),"set")}),await s.exec(m),new f(s)}r(v,"seededPythonInterpreter");async function S(s){const{py:e,pyodide:t}=await h();return v(e.createPxrInteractive(t),s)}r(S,"createPythonInterpreter");export{f as PythonInterpreter,S as createPythonInterpreter,h as loadPagePython,v as seededPythonInterpreter};

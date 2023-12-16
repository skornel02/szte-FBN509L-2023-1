import './chunks/astro_dRriVe4-.mjs';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at ".concat(i));
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at ".concat(j));
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at ".concat(i));
            if (!pattern)
                throw new TypeError("Missing pattern at ".concat(i));
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function () {
        var result = "";
        var value;
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
        }
        return path;
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    })
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"","routes":[{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.wIVB2qqK.js"}],"styles":[{"type":"external","src":"/_astro/index.oxVdi2Ud.css"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.wIVB2qqK.js"}],"styles":[{"type":"external","src":"/_astro/index.oxVdi2Ud.css"},{"type":"inline","content":"main[data-astro-cid-cnyrgiru]{max-width:1024px}embed[data-astro-cid-cnyrgiru]{border:none;width:100%;height:90vh}\n"}],"routeData":{"route":"/jegyzokonyv00","type":"page","pattern":"^\\/jegyzokonyv00\\/?$","segments":[[{"content":"jegyzokonyv00","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/jegyzokonyv00.astro","pathname":"/jegyzokonyv00","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.wIVB2qqK.js"}],"styles":[{"type":"external","src":"/_astro/index.oxVdi2Ud.css"},{"type":"inline","content":"main[data-astro-cid-ijju74um]{max-width:1024px}embed[data-astro-cid-ijju74um]{border:none;width:100%;height:90vh}\n"}],"routeData":{"route":"/jegyzokonyv01","type":"page","pattern":"^\\/jegyzokonyv01\\/?$","segments":[[{"content":"jegyzokonyv01","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/jegyzokonyv01.astro","pathname":"/jegyzokonyv01","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.wIVB2qqK.js"}],"styles":[{"type":"external","src":"/_astro/index.oxVdi2Ud.css"},{"type":"inline","content":"main[data-astro-cid-ej55c435]{max-width:1024px}embed[data-astro-cid-ej55c435]{border:none;width:100%;height:90vh}\n"}],"routeData":{"route":"/jegyzokonyv02","type":"page","pattern":"^\\/jegyzokonyv02\\/?$","segments":[[{"content":"jegyzokonyv02","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/jegyzokonyv02.astro","pathname":"/jegyzokonyv02","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.wIVB2qqK.js"}],"styles":[{"type":"external","src":"/_astro/index.oxVdi2Ud.css"},{"type":"inline","content":"main[data-astro-cid-f7merhp7]{max-width:1024px}embed[data-astro-cid-f7merhp7]{border:none;width:100%;height:90vh}\n"}],"routeData":{"route":"/jegyzokonyv03","type":"page","pattern":"^\\/jegyzokonyv03\\/?$","segments":[[{"content":"jegyzokonyv03","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/jegyzokonyv03.astro","pathname":"/jegyzokonyv03","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.wIVB2qqK.js"}],"styles":[{"type":"external","src":"/_astro/index.oxVdi2Ud.css"},{"type":"inline","content":"main[data-astro-cid-xvy6ybwb]{max-width:1024px}embed[data-astro-cid-xvy6ybwb]{border:none;width:100%;height:90vh}\n"}],"routeData":{"route":"/jegyzokonyv04","type":"page","pattern":"^\\/jegyzokonyv04\\/?$","segments":[[{"content":"jegyzokonyv04","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/jegyzokonyv04.astro","pathname":"/jegyzokonyv04","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.wIVB2qqK.js"}],"styles":[{"type":"external","src":"/_astro/index.oxVdi2Ud.css"},{"type":"inline","content":"main[data-astro-cid-tyhwwtcr]{max-width:1024px}embed[data-astro-cid-tyhwwtcr]{border:none;width:100%;height:90vh}\n"}],"routeData":{"route":"/jegyzokonyv05","type":"page","pattern":"^\\/jegyzokonyv05\\/?$","segments":[[{"content":"jegyzokonyv05","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/jegyzokonyv05.astro","pathname":"/jegyzokonyv05","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.wIVB2qqK.js"}],"styles":[{"type":"external","src":"/_astro/index.oxVdi2Ud.css"},{"type":"inline","content":"main[data-astro-cid-l5w6fl3d]{max-width:1024px}embed[data-astro-cid-l5w6fl3d]{border:none;width:100%;height:90vh}\n"}],"routeData":{"route":"/jegyzokonyv06","type":"page","pattern":"^\\/jegyzokonyv06\\/?$","segments":[[{"content":"jegyzokonyv06","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/jegyzokonyv06.astro","pathname":"/jegyzokonyv06","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.wIVB2qqK.js"}],"styles":[{"type":"external","src":"/_astro/index.oxVdi2Ud.css"},{"type":"inline","content":"main[data-astro-cid-ibaklbj7]{max-width:1024px}embed[data-astro-cid-ibaklbj7]{border:none;width:100%;height:90vh}\n"}],"routeData":{"route":"/jegyzokonyv08","type":"page","pattern":"^\\/jegyzokonyv08\\/?$","segments":[[{"content":"jegyzokonyv08","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/jegyzokonyv08.astro","pathname":"/jegyzokonyv08","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.wIVB2qqK.js"}],"styles":[{"type":"external","src":"/_astro/index.oxVdi2Ud.css"},{"type":"inline","content":"main[data-astro-cid-gjoueo5s]{max-width:1024px}embed[data-astro-cid-gjoueo5s]{border:none;width:100%;height:90vh}\n"}],"routeData":{"route":"/jegyzokonyv09","type":"page","pattern":"^\\/jegyzokonyv09\\/?$","segments":[[{"content":"jegyzokonyv09","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/jegyzokonyv09.astro","pathname":"/jegyzokonyv09","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.wIVB2qqK.js"}],"styles":[{"type":"external","src":"/_astro/index.oxVdi2Ud.css"},{"type":"inline","content":"main[data-astro-cid-ajzm4xsb]{max-width:1024px}embed[data-astro-cid-ajzm4xsb]{border:none;width:100%;height:90vh}\n"}],"routeData":{"route":"/jegyzokonyv11","type":"page","pattern":"^\\/jegyzokonyv11\\/?$","segments":[[{"content":"jegyzokonyv11","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/jegyzokonyv11.astro","pathname":"/jegyzokonyv11","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.wIVB2qqK.js"}],"styles":[{"type":"external","src":"/_astro/index.oxVdi2Ud.css"},{"type":"inline","content":"main[data-astro-cid-kdeybbgp]{max-width:1024px}embed[data-astro-cid-kdeybbgp]{border:none;width:100%;height:90vh}\n"}],"routeData":{"route":"/jegyzokonyv12","type":"page","pattern":"^\\/jegyzokonyv12\\/?$","segments":[[{"content":"jegyzokonyv12","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/jegyzokonyv12.astro","pathname":"/jegyzokonyv12","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/runner/work/szte-FBN509L-2023-1/szte-FBN509L-2023-1/website/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/runner/work/szte-FBN509L-2023-1/szte-FBN509L-2023-1/website/src/pages/jegyzokonyv00.astro",{"propagation":"none","containsHead":true}],["/home/runner/work/szte-FBN509L-2023-1/szte-FBN509L-2023-1/website/src/pages/jegyzokonyv01.astro",{"propagation":"none","containsHead":true}],["/home/runner/work/szte-FBN509L-2023-1/szte-FBN509L-2023-1/website/src/pages/jegyzokonyv02.astro",{"propagation":"none","containsHead":true}],["/home/runner/work/szte-FBN509L-2023-1/szte-FBN509L-2023-1/website/src/pages/jegyzokonyv03.astro",{"propagation":"none","containsHead":true}],["/home/runner/work/szte-FBN509L-2023-1/szte-FBN509L-2023-1/website/src/pages/jegyzokonyv04.astro",{"propagation":"none","containsHead":true}],["/home/runner/work/szte-FBN509L-2023-1/szte-FBN509L-2023-1/website/src/pages/jegyzokonyv05.astro",{"propagation":"none","containsHead":true}],["/home/runner/work/szte-FBN509L-2023-1/szte-FBN509L-2023-1/website/src/pages/jegyzokonyv06.astro",{"propagation":"none","containsHead":true}],["/home/runner/work/szte-FBN509L-2023-1/szte-FBN509L-2023-1/website/src/pages/jegyzokonyv08.astro",{"propagation":"none","containsHead":true}],["/home/runner/work/szte-FBN509L-2023-1/szte-FBN509L-2023-1/website/src/pages/jegyzokonyv09.astro",{"propagation":"none","containsHead":true}],["/home/runner/work/szte-FBN509L-2023-1/szte-FBN509L-2023-1/website/src/pages/jegyzokonyv11.astro",{"propagation":"none","containsHead":true}],["/home/runner/work/szte-FBN509L-2023-1/szte-FBN509L-2023-1/website/src/pages/jegyzokonyv12.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,s)=>{let n=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),n();break}});for(let e of s.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/jegyzokonyv00@_@astro":"pages/jegyzokonyv00.astro.mjs","\u0000@astro-page:src/pages/jegyzokonyv01@_@astro":"pages/jegyzokonyv01.astro.mjs","\u0000@astro-page:src/pages/jegyzokonyv02@_@astro":"pages/jegyzokonyv02.astro.mjs","\u0000@astro-page:src/pages/jegyzokonyv03@_@astro":"pages/jegyzokonyv03.astro.mjs","\u0000@astro-page:src/pages/jegyzokonyv04@_@astro":"pages/jegyzokonyv04.astro.mjs","\u0000@astro-page:src/pages/jegyzokonyv05@_@astro":"pages/jegyzokonyv05.astro.mjs","\u0000@astro-page:src/pages/jegyzokonyv06@_@astro":"pages/jegyzokonyv06.astro.mjs","\u0000@astro-page:src/pages/jegyzokonyv08@_@astro":"pages/jegyzokonyv08.astro.mjs","\u0000@astro-page:src/pages/jegyzokonyv09@_@astro":"pages/jegyzokonyv09.astro.mjs","\u0000@astro-page:src/pages/jegyzokonyv11@_@astro":"pages/jegyzokonyv11.astro.mjs","\u0000@astro-page:src/pages/jegyzokonyv12@_@astro":"pages/jegyzokonyv12.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","/src/pages/jegyzokonyv00.astro":"chunks/pages/jegyzokonyv00_lSHYYcy_.mjs","/src/pages/jegyzokonyv01.astro":"chunks/pages/jegyzokonyv01_anKLErKW.mjs","/src/pages/jegyzokonyv02.astro":"chunks/pages/jegyzokonyv02_w-W4vMjy.mjs","/src/pages/jegyzokonyv03.astro":"chunks/pages/jegyzokonyv03_LkM7_PU3.mjs","/src/pages/jegyzokonyv04.astro":"chunks/pages/jegyzokonyv04_JnJdtnUV.mjs","/src/pages/jegyzokonyv05.astro":"chunks/pages/jegyzokonyv05_Z5LA2-N3.mjs","/src/pages/jegyzokonyv06.astro":"chunks/pages/jegyzokonyv06_lN3Cr70q.mjs","/src/pages/jegyzokonyv08.astro":"chunks/pages/jegyzokonyv08_b0ZcKvBS.mjs","/src/pages/jegyzokonyv09.astro":"chunks/pages/jegyzokonyv09_n9S4VM4g.mjs","/src/pages/jegyzokonyv11.astro":"chunks/pages/jegyzokonyv11_SDsWNuRe.mjs","/src/pages/jegyzokonyv12.astro":"chunks/pages/jegyzokonyv12_k_Q-JbH2.mjs","\u0000@astrojs-manifest":"manifest_CnvWIWYy.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.wIVB2qqK.js","astro:scripts/before-hydration.js":""},"assets":[]});

export { manifest };

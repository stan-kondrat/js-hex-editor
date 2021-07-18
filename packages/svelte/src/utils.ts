export function enumKeys<O extends object, K extends keyof O = keyof O>(
  obj: O
): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}

export function ab2str(buf: ArrayBuffer): string {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

export function str2ab(str: string): ArrayBuffer {
  var buf = new ArrayBuffer(str.length * 2);
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export function getBaseLog(x: number, y: number) {
  return Math.log(y) / Math.log(x);
}

export function numDigits(x, base = 10) {
  return Math.max(Math.floor(getBaseLog(base, Math.abs(x))), 0) + 1;
}

export function* iter_range(begin, end, step) {
  step = step ? step : 1;
  if (typeof end === "undefined") {
    end = begin > 0 ? begin : 0;
    begin = begin < 0 ? begin : 0;
  }
  if (begin == end) {
    return;
  }
  if (begin > end) {
    step = step * -1;
  }
  for (let x = begin; x < end; x += step) {
    yield x;
  }
}

export function range(begin, end, step) {
  return Array.from(iter_range(begin, end, step));
}

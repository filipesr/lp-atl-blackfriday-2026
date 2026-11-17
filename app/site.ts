// O mesmo deploy atende os dois domínios: .br é o site BR, o resto (inclusive localhost) o PY.
// Para testar localmente: ?site=br ou ?site=py. Só chamar no cliente (usa window).
export type Site = "br" | "py";

export function currentSite(): Site {
  const forced = new URLSearchParams(window.location.search).get("site");
  if (forced === "br" || forced === "py") return forced;
  return window.location.hostname.endsWith(".br") ? "br" : "py";
}

export const storeUrl: Record<Site, string> = {
  br: "https://atlanticoshop.com.br",
  py: "https://atlanticoshop.com.py",
};
